import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import React, { useState } from 'react'
import BondingModal from '../../components/Bond/BondingModal'
import { CardSection, DataCard } from '../../components/earn/styled'
import { AutoRow, RowBetween } from '../../components/Row'
import { Text } from 'rebass'
import { ButtonMint } from '../../components/Button'
import DarkIcon from '../../assets/svg/foxswap/foxswap-circle_06.svg'
import { darken } from 'polished'
import { useBondInfo } from '../../state/stake/hooks'
import WithdrawFeeTimer from '../../components/Pit/WithdrawFeeTimer'
import TabsCard from './BondCard'

const PageWrapper = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const LogoIcon = styled('img')`
  width: 30px;
  height: 30px;
  margin: 2px;
  cursor: pointer;
  box-shadow: 0 0 2px ${({ theme }) => theme.bg1};
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 50%;
  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => darken(0.05, theme.primary1)};
  }
`

export const MinterButton = styled(ButtonMint)`
  height: 55%;
  align-self: center;
  width: 85px;
  border-radius: 12px;
  padding: 16px;
  margin: 5px;
  font-size: 18px;
  font-weight: 500;
`

export const MintCard = styled(DataCard)`
  background: ${({ theme }) => theme.bg1};
  border-radius: 10px;
  padding: 17px;
  box-shadow: ${({ theme }) => theme.bg1} 0 2px 8px 0;
`

export default function Bond() {
  const [showBondingModal, setShowBondingModal] = useState(false)

  const bonds = useBondInfo()
  const bond = bonds[0]
  // console.log('bond data:', bonds)

  const isActive = false

  return (
    <PageWrapper gap="lg">
      <>
        <BondingModal isOpen={showBondingModal} bond={bond} onDismiss={() => setShowBondingModal(false)} />
      </>
      {!isActive ? (
        <TabsCard />
      ) : (
        <>
          <MintCard>
            <CardSection>
              <AutoRow justify="space-between">
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Earn
                  </Text>
                  <LogoIcon src={DarkIcon} alt="logo" />
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Bond
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {bond.displayName}
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Price
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    ${bond.price?.toSignificant(4)}
                  </Text>
                  <RowBetween />
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11} textAlign="left">
                    ROI
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {bond.roi?.toSignificant(4)}%
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11} textAlign="left">
                    Duration
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    5 Days
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11} textAlign="left">
                    Purchased
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    ${bond.totalBondedAmount?.toSignificant(4)}
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <MinterButton onClick={() => setShowBondingModal(true)}>Bond</MinterButton>
                </AutoColumn>
              </AutoRow>
              <AutoRow justify="space-between">
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Pending Rewards
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {bond.userInfo.payout?.toSignificant(4)} FOX
                  </Text>
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    Claimable Rewards
                  </Text>
                  <Text fontWeight={300} fontSize={18}>
                    {bond.userBondPendingPayout?.toSignificant(4)} FOX
                  </Text>
                  <RowBetween />
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11} textAlign="left">
                    Time until fully vested
                  </Text>
                  <WithdrawFeeTimer secondsRemaining={bond.userBondMaturationSecondsRemaining} />
                </AutoColumn>
                <AutoColumn>
                  <Text fontWeight={200} fontSize={11}>
                    TODO - Claim button
                  </Text>
                  <Text fontWeight={200} fontSize={11}>
                    TODO - Claim+AutoStake button
                  </Text>
                </AutoColumn>
              </AutoRow>
            </CardSection>
          </MintCard>
        </>
      )}
    </PageWrapper>
  )
}
