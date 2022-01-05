import React, { useState, useCallback } from 'react'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Modal from '../../components/Modal'
import { AutoColumn } from '../../components/Column'
import { Text } from 'rebass'
import styled from 'styled-components'
// import { RowBetween } from '../../components/Row'
// import { Box } from 'rebass/styled-components'
// import { TYPE, CloseIcon } from '../../theme'
// import { ButtonConfirmed, ButtonError } from '../../components/Button'
// import ProgressCircles from '../../components/ProgressSteps'
// import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { Box, OutlinedInput, InputAdornment, Slide, FormControl } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { TokenAmount, Token } from '@foxswap/sdk'
import { useActiveWeb3React } from '../../hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useDerivedStakeInfo } from '../../state/stake/hooks'
//import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
// import { LoadingView, SubmittedView } from '../../components/ModalViews'
import { usePitContract } from '../../hooks/useContract'
import { calculateGasMargin } from '../../utils'
import { PIT_SETTINGS } from '../../constants'
// import { BONDS } from '../../constants/bond'
import useGovernanceToken from '../../hooks/useGovernanceToken'
import { DataCard } from 'components/earn/styled'

/*const HypotheticalRewardRate = styled.div<{ dim: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;

  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
`*/

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

const ModalWrapper = styled(DataCard)`
  width: 640px;
`

interface BondingModalProps {
  isOpen: boolean
  onDismiss: () => void
  bondingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
}

export default function BondPurchase({ isOpen, onDismiss, bondingToken, userLiquidityUnstaked }: BondingModalProps) {
  const { chainId, library } = useActiveWeb3React()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedStakeInfo(typedValue, bondingToken, userLiquidityUnstaked)

  const bondToken = useGovernanceToken()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const [failed, setFailed] = useState<boolean>(false)
  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    setFailed(false)
    onDismiss()
  }, [onDismiss])

  const pit = usePitContract()

  // approval data for stake
  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, pit?.address)

  async function onBond() {
    setAttempting(true)
    if (pit && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
        const estimatedGas = await pit.estimateGas.enter(formattedAmount)

        await pit
          .enter(formattedAmount, {
            gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Bond ${bondToken?.symbol}`
            })
            setHash(response.hash)
          })
          .catch((error: any) => {
            setAttempting(false)
            if (error?.code === -32603) {
              setFailed(true)
            }
            console.log(error)
          })
      } else {
        setAttempting(false)
        throw new Error('Attempting to bond without approval or a signature. Please contact support.')
      }
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  async function onAttemptToApprove() {
    if (!pit || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmount
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    return approveCallback()
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <FormControl className="bond-input-wrap" variant="outlined" color="primary" fullWidth>
          <OutlinedInput
            placeholder="Amount"
            type="number"
            value={typedValue}
            onChange={(e) => setTypedValue(e.target.value)}
            labelWidth={0}
            className="bond-input"
            endAdornment={
              <InputAdornment position="end">
                <div className="stake-input-btn" onClick={handleMax}>
                  <p>Max</p>
                </div>
              </InputAdornment>
            }
          />
        </FormControl>
        {hasAllowance() || useAvax ? (
          <div
            className="transaction-button bond-approve-btn"
            onClick={async () => {
              if (isPendingTxn(pendingTransactions, "bond_" + bond.name)) return;
              await onBond();
            }}
          >
            <p>{txnButtonText(pendingTransactions, "bond_" + bond.name, "Mint")}</p>
          </div>
        ) : (
          <div
            className="transaction-button bond-approve-btn"
            onClick={async () => {
              if (isPendingTxn(pendingTransactions, "approve_" + bond.name)) return;
              await onSeekApproval();
            }}
          >
            <p>{txnButtonText(pendingTransactions, "approve_" + bond.name, "Approve")}</p>
          </div>
        )}

        <div className="transaction-button bond-approve-btn" onClick={handleZapinOpen}>
          <p>Zap</p>
        </div>

        {!hasAllowance() && !useAvax && (
          <div className="help-text">
            <p className="help-text-desc">
              Note: The "Approve" transaction is only needed when minting for the first time; subsequent minting only requires you to perform the "Mint" transaction.
            </p>
          </div>
        )}
      </Box>

      <Slide direction="left" in={true} mountOnEnter unmountOnExit {...{ timeout: 533 }}>
        <Box className="bond-data">
          <div className="data-row">
            <p className="bond-balance-title">Your Balance</p>
            <p className="bond-balance-title">
              {isBondLoading ? (
                <Skeleton width="100px" />
              ) : (
                <>
                  {trim(useAvax ? bond.avaxBalance : bond.balance, 4)} {displayUnits}
                </>
              )}
            </p>
          </div>

          <div className="data-row">
            <p className="bond-balance-title">You Will Get</p>
            <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondQuote, 4)} TIME`}</p>
          </div>

          <div className={`data-row`}>
            <p className="bond-balance-title">Max You Can Buy</p>
            <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.maxBondPrice, 4)} TIME`}</p>
          </div>

          <div className="data-row">
            <p className="bond-balance-title">ROI</p>
            <p className="bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
          </div>

          <div className="data-row">
            <p className="bond-balance-title">Vesting Term</p>
            <p className="bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : vestingPeriod()}</p>
          </div>

          <div className="data-row">
            <p className="bond-balance-title">Minimum purchase</p>
            <p className="bond-balance-title">0.01 TIME</p>
          </div>
        </Box>
      </Slide>
      <Zapin open={zapinOpen} handleClose={handleZapinClose} bond={bond} />
    </Box>
  )
}
