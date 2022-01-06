import React, { useState, useCallback } from 'react'
// import useTransactionDeadline from '../../hooks/useTransactionDeadline'
// import Modal from '../../components/Modal'
// import { AutoColumn } from '../../components/Column'
// import { Text } from 'rebass'
// import styled from 'styled-components'
// import { RowBetween } from '../../components/Row'
// import { Box } from 'rebass/styled-components'
// import { TYPE, CloseIcon } from '../../theme'
// import { ButtonConfirmed, ButtonError } from '../../components/Button'
// import ProgressCircles from '../../components/ProgressSteps'
// import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { Box, OutlinedInput, InputAdornment, FormControl } from '@material-ui/core'
// import { Skeleton } from "@material-ui/lab";
import { TokenAmount, Token } from '@foxswap/sdk'
// import { useActiveWeb3React } from '../../hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
// import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
// import { useDerivedStakeInfo } from '../../state/stake/hooks'
//import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
// import { TransactionResponse } from '@ethersproject/providers'
// import { useTransactionAdder } from '../../state/transactions/hooks'
// import { LoadingView, SubmittedView } from '../../components/ModalViews'
// import { usePitContract } from '../../hooks/useContract'
// import { calculateGasMargin } from '../../utils'
// import { PIT_SETTINGS } from '../../constants'
// import { BONDS } from '../../constants/bond'
// import useGovernanceToken from '../../hooks/useGovernanceToken'
// import { DataCard } from 'components/earn/styled'

/*const HypotheticalRewardRate = styled.div<{ dim: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;

  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
`*/

// const ContentWrapper = styled(AutoColumn)`
//   width: 100%;
//   padding: 1rem;
// `

// const ModalWrapper = styled(DataCard)`
//   width: 640px;
// `

interface BondingModalProps {
  isOpen: boolean
  onDismiss: () => void
  bondingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
}

export default function BondPurchase({ isOpen, onDismiss, bondingToken, userLiquidityUnstaked }: BondingModalProps) {
  // const { chainId, library } = useActiveWeb3React()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  // const { parsedAmount, error } = useDerivedStakeInfo(typedValue, bondingToken, userLiquidityUnstaked)

  // const bondToken = useGovernanceToken()
  // const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined

  // state for pending and submitted txn views
  // const addTransaction = useTransactionAdder()
  // const [attempting, setAttempting] = useState<boolean>(false)
  // const [hash, setHash] = useState<string | undefined>()
  // const [failed, setFailed] = useState<boolean>(false)
  // const wrappedOnDismiss = useCallback(() => {
  //   setHash(undefined)
  //   setAttempting(false)
  //   setFailed(false)
  //   onDismiss()
  // }, [onDismiss])

  // const pit = usePitContract()

  // approval data for stake
  // const deadline = useTransactionDeadline()
  // const [approval, approveCallback] = useApproveCallback(parsedAmount, pit?.address)

  // async function onBond() {
  //   setAttempting(true)
  //   if (pit && parsedAmount && deadline) {
  //     if (approval === ApprovalState.APPROVED) {
  //       const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
  //       const estimatedGas = await pit.estimateGas.enter(formattedAmount)
  //
  //       await pit
  //         .enter(formattedAmount, {
  //           gasLimit: calculateGasMargin(estimatedGas)
  //         })
  //         .then((response: TransactionResponse) => {
  //           addTransaction(response, {
  //             summary: `Bond ${bondToken?.symbol}`
  //           })
  //           setHash(response.hash)
  //         })
  //         .catch((error: any) => {
  //           setAttempting(false)
  //           if (error?.code === -32603) {
  //             setFailed(true)
  //           }
  //           console.log(error)
  //         })
  //     } else {
  //       setAttempting(false)
  //       throw new Error('Attempting to bond without approval or a signature. Please contact support.')
  //     }
  //   }
  // }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  // const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  // async function onAttemptToApprove() {
  //   if (!pit || !library || !deadline) throw new Error('missing dependencies')
  //   const liquidityAmount = parsedAmount
  //   if (!liquidityAmount) throw new Error('missing liquidity amount')
  //
  //   return approveCallback()
  // }

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <FormControl className="bond-input-wrap" variant="outlined" color="primary" fullWidth>
          <OutlinedInput
            placeholder="Amount"
            type="number"
            value={typedValue}
            onChange={e => setTypedValue(e.target.value)}
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
      </Box>
    </Box>
  )
}
