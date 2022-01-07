import React, { useCallback, useState } from 'react'
import { TokenAmount } from '@foxswap/sdk'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router-dom'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard } from '../../components/earn/styled'
import { ButtonPrimary } from '../../components/Button'
import StakingModal from '../../components/Pit/StakingModal'
import ModifiedUnstakingModal from '../../components/Pit/ModifiedUnstakingModal'
import ClaimModal from '../../components/Pit/ClaimModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { CountUp } from 'use-count-up'

import { BlueCard } from '../../components/Card'

import usePrevious from '../../hooks/usePrevious'

import { PIT, PIT_SETTINGS } from '../../constants'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import { PIT_INTERFACE } from '../../constants/abis/pit'
import useGovernanceToken from 'hooks/useGovernanceToken'
// import useTotalCombinedTVL from '../../hooks/useTotalCombinedTVL'
import usePitRatio from '../../hooks/usePitRatio'
import useXFoxApy from '../../hooks/usexFoxApy'
import { useSingleCallResult } from '../../state/multicall/hooks'
import { usePitContract } from '../../hooks/useContract'
import useWithdrawalFeeTimer from '../../hooks/useWithdrawalFeeTimer'
import WithdrawFeeTimer from '../../components/Pit/WithdrawFeeTimer'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

/*const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`*/

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

/*const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `};
`*/

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

/*const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`*/

/*const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  overflow: hidden;
`*/

const CustomCard = styled(DataCard)`
  background: ${({ theme }) => theme.primary1};
  overflow: hidden;
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
  const withdrawalFeePeriod = '7200' // 2 hours
  const pit = chainId ? PIT[chainId] : undefined
  const pitContract = usePitContract()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  const userInfo = useSingleCallResult(pitContract, 'userInfo', [account ? account : 0])
  const pitBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, pit, 'balanceOf', PIT_INTERFACE)
  const govTokenPitTokenRatio = usePitRatio()
  const apy = useXFoxApy()
  const adjustedPitBalance = govTokenPitTokenRatio ? pitBalance?.multiply(govTokenPitTokenRatio) : undefined

  const userLiquidityStaked = pitBalance
  const userLiquidityUnstaked = govTokenBalance
  const lastDepositedTime = userInfo.result?.lastDepositedTime

  const { secondsRemaining, hasUnstakingFee } = useWithdrawalFeeTimer(
    parseInt(lastDepositedTime, 10),
    parseInt(withdrawalFeePeriod, 10)
  )
  const shouldShowTimer = account && lastDepositedTime && hasUnstakingFee

  // toggle for staking modal and unstaking modal
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
            <CardSection>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>
                    {pitSettings?.name}: DEX fee sharing + Auto-compounding Vault
                  </TYPE.white>
                </RowBetween>
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <DataRow style={{ marginBottom: '0rem' }}>
                    <TYPE.white fontSize={25}>APY Daily</TYPE.white>
                    <TYPE.white fontSize={25}>APY Yearly</TYPE.white>
                  </DataRow>
                </RowBetween>
                <RowBetween>
                  <DataRow style={{ marginBottom: '0rem' }}>
                    <TYPE.white fontSize={20}>{apy.apyDay?.toFixed(3)}%</TYPE.white>
                    <TYPE.white fontSize={20}>{apy.apy?.toPrecision(4)}%</TYPE.white>
                  </DataRow>
                </RowBetween>

                {shouldShowTimer && (
                  <RowBetween>
                    <DataRow style={{ marginBottom: '0rem' }}>
                      <TYPE.white fontSize={15}>0.2% unstaking fee until:</TYPE.white>
                      <WithdrawFeeTimer secondsRemaining={secondsRemaining} />
                    </DataRow>
                  </RowBetween>
                )}
                <RowBetween>
                  <DataRow style={{ marginBottom: '0rem' }}>
                    <TYPE.white fontSize={15}>0.2% unstaking fee until:</TYPE.white>
                    <WithdrawFeeTimer secondsRemaining={secondsRemaining} />
                  </DataRow>
                </RowBetween>
                <RowBetween>
                  <TYPE.white fontSize={10}>
                    **TODO Remove timer if no deposits. Currently Displaying fee for debugging
                  </TYPE.white>
                </RowBetween>
                <br />
              </AutoColumn>
            </CardSection>
          </CustomCard>
          <StyledBottomCard dim={false}>
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>
                    Your x{govToken?.symbol} Balance
                    {govTokenPitTokenRatio && (
                      <TYPE.italic display="inline" marginLeft="0.25em">
                        (1 x{govToken?.symbol} = {govTokenPitTokenRatio.toSignificant(4)} {govToken?.symbol})
                      </TYPE.italic>
                    )}
                  </TYPE.black>
                </div>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
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

        {account && (!adjustedPitBalance || adjustedPitBalance?.equalTo('0')) && (
          <TYPE.main>
            You have {govTokenBalance?.toFixed(2, { groupSeparator: ',' })} {govToken?.symbol} tokens available to
            Stake.
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

        <BlueCard>
          <AutoColumn gap="10px">
            <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
                💡
              </span>
              <b>Important:</b> Your {govToken?.symbol} rewards will only be visible
              <br />
              after you withdraw your x{govToken?.symbol} tokens from the pool.
              <br />
              <br />
              xFOX has a 0.2% unstaking fee if withdrawn within 2h
              <br />
              All fees are distributed to xFOX holders
            </TYPE.main>
          </AutoColumn>
        </BlueCard>
      </TopSection>
    </PageWrapper>
  )
}
