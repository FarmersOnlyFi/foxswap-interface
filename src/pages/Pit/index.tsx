import React, { useCallback, useState } from 'react'
import { TokenAmount } from '@foxswap/sdk'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'
import { AutoRow, RowBetween } from '../../components/Row'
import { DataCard, CardSection } from '../../components/earn/styled'
import { ButtonPrimary } from '../../components/Button'
import StakingModal from '../../components/Pit/StakingModal'
import ModifiedUnstakingModal from '../../components/Pit/ModifiedUnstakingModal'
import ClaimModal from '../../components/Pit/ClaimModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { CountUp } from 'use-count-up'
import usePrevious from '../../hooks/usePrevious'
import { PIT, PIT_SETTINGS, ZERO_ADDRESS } from '../../constants'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import { PIT_INTERFACE } from '../../constants/abis/pit'
import useGovernanceToken from 'hooks/useGovernanceToken'
import usePitRatio from '../../hooks/usePitRatio'
import useXFoxApy from '../../hooks/usexFoxApy'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { usePitContract } from '../../hooks/useContract'
import useWithdrawalFeeTimer from '../../hooks/useWithdrawalFeeTimer'
import WithdrawFeeTimer from '../../components/Pit/WithdrawFeeTimer'
import { Text } from 'rebass'
import { MouseoverTooltip } from '../../components/Tooltip'
import useBUSDPrice from '../../hooks/useBUSDPrice'

const PageWrapper = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

const CustomCard = styled(DataCard)`
  background: linear-gradient(60deg, #bb86fc 0%, #6200ee 100%);
  overflow: hidden;
  padding: 0.5rem;
  margin-bottom: 25px;
`

const DurationText = styled(Text)`
  color: green;
  background-color: lightgreen;
  border-radius: 8px;
  text-align: center;
  font-size: 15px;
  width: 75%;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export default function Pit({
  match: {
    params: { currencyIdA, currencyIdB }
  }
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account, chainId } = useActiveWeb3React()

  const govToken = useGovernanceToken()
  const govTokenBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )
  const govTokenPrice = useBUSDPrice(govToken)

  const big18 = 1000000000000000000
  const withdrawalFeePeriod = '7200' // 2 hours
  const pit = chainId ? PIT[chainId] : undefined
  const pitContract = usePitContract()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  const pitBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, pit, 'balanceOf', PIT_INTERFACE)
  const pitTokenBalance = useSingleCallResult(pitContract, 'balanceOfThis')?.result?.[0]
  const userInfo = useSingleCallResult(pitContract, 'userInfo', [account ? account : ZERO_ADDRESS])
  const govTokenPitTokenRatio = usePitRatio()
  const apy = useXFoxApy()

  const adjustedPitBalance = govTokenPitTokenRatio ? pitBalance?.multiply(govTokenPitTokenRatio) : undefined
  const pitTVL = (parseFloat(pitTokenBalance) * (govTokenPrice ? parseFloat(govTokenPrice?.raw.toFixed(3)) : 1)) / big18
  const userLiquidityStaked = pitBalance
  const userLiquidityUnstaked = govTokenBalance
  const lastDepositedTime = userInfo.result?.lastDepositedTime

  const { secondsRemaining } = useWithdrawalFeeTimer(parseInt(lastDepositedTime, 10), parseInt(withdrawalFeePeriod, 10))

  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  const countUpAmount = pitBalance?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  const toggleWalletModal = useWalletModalToggle()

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true)
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal])

  return (
    <PageWrapper gap="lg" justify="center">
      {govToken && (
        <>
          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingToken={govToken}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <ModifiedUnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            userLiquidityStaked={userLiquidityStaked}
            stakingToken={govToken}
          />
          <ClaimModal isOpen={showClaimModal} onDismiss={() => setShowClaimModal(false)} />
        </>
      )}

      <TopSection gap="lg" justify="center">
        <BottomSection gap="lg" justify="center">
          <CustomCard>
            <CardSection gap="md">
              <AutoRow>
                <Text>DEX Fee Sharing Vault</Text>
              </AutoRow>
              <AutoRow justify="space-between">
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    TVL
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    ${pitTVL.toFixed(2)}
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Ratio
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {govTokenPitTokenRatio ? govTokenPitTokenRatio.toFixed(5) : '1.00000'}
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Daily
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {apy.apyDay?.toFixed(3)}%
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Yearly
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {apy.apy?.toPrecision(4)}%
                  </Text>
                  <RowBetween />
                </AutoColumn>
                <AutoColumn>
                  <MouseoverTooltip
                    text={
                      'xFOX has a 0.2% unstaking fee if withdrawn within 2h. All fees are distributed to xFOX holders.'
                    }
                  >
                    <Text fontWeight={200} fontSize={11}>
                      Withdrawal Fee Duration
                    </Text>
                  </MouseoverTooltip>
                  {secondsRemaining ? (
                    <WithdrawFeeTimer secondsRemaining={secondsRemaining} />
                  ) : (
                    <DurationText>Unlocked</DurationText>
                  )}
                  <RowBetween />
                </AutoColumn>
              </AutoRow>
            </CardSection>
          </CustomCard>
          <StyledBottomCard dim={false}>
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>x{govToken?.symbol} Balance</TYPE.black>
                  {account && (!adjustedPitBalance || adjustedPitBalance?.equalTo('0')) && (
                    <TYPE.italic>
                      You have {govTokenBalance?.toFixed(2, { groupSeparator: ',' })} {govToken?.symbol} tokens
                      available to Stake.
                    </TYPE.italic>
                  )}
                </div>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                </TYPE.largeHeader>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>

        {account && adjustedPitBalance && adjustedPitBalance?.greaterThan('0') && (
          <TYPE.main>
            You have {adjustedPitBalance?.toFixed(2, { groupSeparator: ',' })} {govToken?.symbol} tokens staked in
            the&nbsp;{pitSettings?.name}.
          </TYPE.main>
        )}

        {account && (
          <DataRow style={{ marginBottom: '0rem' }}>
            <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={handleDepositClick}>
              Deposit
            </ButtonPrimary>

            <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={() => setShowClaimModal(true)}>
              Claim
            </ButtonPrimary>

            <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={() => setShowUnstakingModal(true)}>
              Withdraw
            </ButtonPrimary>
          </DataRow>
        )}
      </TopSection>
    </PageWrapper>
  )
}
