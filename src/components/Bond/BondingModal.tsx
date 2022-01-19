import React, { useState, useCallback } from 'react'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import { Text } from 'rebass'
import styled from 'styled-components'
import { RowBetween } from '../Row'
// import { Box } from 'rebass/styled-components'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonConfirmed, ButtonError } from '../Button'
import ProgressCircles from '../ProgressSteps'
import CurrencyInputPanel from '../CurrencyInputPanel'
import { TokenAmount, Token } from '@foxswap/sdk'
import { useActiveWeb3React } from '../../hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useDerivedStakeInfo } from '../../state/stake/hooks'
//import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { LoadingView, SubmittedView } from '../ModalViews'
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
  bondTokenName: string
  onDismiss: () => void
  bondingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
}

export default function BondingModal({
  isOpen,
  bondTokenName,
  onDismiss,
  bondingToken,
  userLiquidityUnstaked
}: BondingModalProps) {
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
              summary: `Bond ${bondTokenName}`
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
    <ModalWrapper>
      <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={180}>
        {!attempting && !hash && !failed && (
          <ContentWrapper gap="lg">
            <RowBetween>
              <TYPE.mediumHeader>Bond {bondTokenName}</TYPE.mediumHeader>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>

            <CurrencyInputPanel
              value={typedValue}
              onUserInput={onUserInput}
              onMax={handleMax}
              showMaxButton={!atMaxAmount}
              currency={bondingToken}
              label={''}
              disableCurrencySelect={true}
              customBalanceText={'Available to Bond: '}
              id="bond-liquidity-token"
            />

            <RowBetween>
              <ButtonConfirmed
                mr="0.5rem"
                onClick={onAttemptToApprove}
                confirmed={approval === ApprovalState.APPROVED}
                disabled={approval !== ApprovalState.NOT_APPROVED}
              >
                Approve
              </ButtonConfirmed>
              <ButtonError
                disabled={!!error || approval !== ApprovalState.APPROVED}
                error={!!error && !!parsedAmount}
                onClick={onBond}
              >
                {error ?? 'Deposit'}
              </ButtonError>
            </RowBetween>
            <DataCard>
              <RowBetween>
                {/*Your Balance*/}
                {/*0 LP*/}
                {/*You Will Get*/}
                {/*0 WAGMI*/}
                {/*Max You Can Buy*/}
                {/*299.0535 WAGMI*/}
                {/*ROI*/}
                {/*10.36%*/}
                {/*Debt Ratio*/}
                {/*42.61%*/}
                {/*Vesting Term*/}
                {/*5 days*/}
                {/*Minimum purchase*/}
                {/*0.01 WAGMI*/}
                <p>test</p>
                <p>1</p>
              </RowBetween>
              <RowBetween>
                <Text>Balance</Text>
                <Text>0 LP</Text>
              </RowBetween>
              <RowBetween>
                <Text>You Will Get:</Text>
                <Text>0 FOX</Text>
              </RowBetween>
              <RowBetween>
                <Text>Max Purchase Volume</Text>
                <Text>0 LP</Text>
              </RowBetween>
              <RowBetween>
                <Text>Minimum Purchase Volume</Text>
                <Text>0 LP</Text>
              </RowBetween>
              <RowBetween>
                <Text>Debt Ratio*</Text>
                <Text>0 LP</Text>
              </RowBetween>

              <RowBetween>
                <Text>Vesting Term*</Text>
                <Text>5 Days</Text>
              </RowBetween>
              <RowBetween>
                <Text>Min</Text>
                <Text>0 LP</Text>
              </RowBetween>
            </DataCard>
            <ProgressCircles steps={[approval === ApprovalState.APPROVED]} disabled={true} />
          </ContentWrapper>
        )}
        {attempting && !hash && !failed && (
          <LoadingView onDismiss={wrappedOnDismiss}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader>
                Depositing {bondToken?.symbol} to {pitSettings?.name}
              </TYPE.largeHeader>
              <TYPE.body fontSize={20}>
                {parsedAmount?.toSignificant(4)} {bondToken?.symbol}
              </TYPE.body>
            </AutoColumn>
          </LoadingView>
        )}
        {attempting && hash && !failed && (
          <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
              <TYPE.body fontSize={20}>
                Deposited {parsedAmount?.toSignificant(4)} {bondToken?.symbol}
              </TYPE.body>
            </AutoColumn>
          </SubmittedView>
        )}
        {!attempting && !hash && failed && (
          <ContentWrapper gap="sm">
            <RowBetween>
              <TYPE.mediumHeader>
                <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                  ⚠️
                </span>
                Error!
              </TYPE.mediumHeader>
              <CloseIcon onClick={wrappedOnDismiss} />
            </RowBetween>
            <TYPE.subHeader style={{ textAlign: 'center' }}>
              Your transaction couldn&apos;t be submitted.
              <br />
              You may have to increase your Gas Price (GWEI) settings!
            </TYPE.subHeader>
          </ContentWrapper>
        )}
      </Modal>
    </ModalWrapper>
  )
}
