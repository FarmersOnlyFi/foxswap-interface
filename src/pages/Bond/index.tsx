import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import React from 'react'
// import BondingModal from '../../components/Bond/BondingModal'
import { DataCard } from '../../components/earn/styled'
// import { AutoRow, RowBetween } from '../../components/Row'
// import { Text } from 'rebass'
import { ButtonMint } from '../../components/Button'
// import DarkIcon from '../../assets/svg/foxswap/foxswap-circle_06.svg'
// import { darken } from 'polished'
// import { useBondInfo } from '../../state/stake/hooks'
// import WithdrawFeeTimer from '../../components/Pit/WithdrawFeeTimer'
import TabsCard from './BondCard'

const PageWrapper = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
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
  return (
    <PageWrapper gap="lg">
      <TabsCard />
    </PageWrapper>
  )
}
