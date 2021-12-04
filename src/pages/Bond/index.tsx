import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import React from 'react'
import './bond.scss'
import Row, { RowBetween } from '../../components/Row'
import { CardNoise, CardSection, DataCard } from '../../components/earn/styled'
import { TYPE } from '../../theme'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`
const CustomCard = styled(DataCard)`
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    ${({ theme }) => theme.customCardGradientStart} 0%,
    ${({ theme }) => theme.customCardGradientEnd} 100%
  );
  overflow: hidden;
`

export default function Bond() {
  return (
    <PageWrapper>
      <Row>
        <CustomCard>
          <CardSection>
            <CardNoise />
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>FOX - DEX fee sharing</TYPE.white>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.white fontSize={14}>
                  Stake your xFOX tokens and earn 1/3rd of the generated trading fees.
                </TYPE.white>
              </RowBetween>
              <br />
            </AutoColumn>
          </CardSection>
        </CustomCard>
      </Row>
      <BondButton buttonText="Bond" />
    </PageWrapper>
  )
}

function BondButton(props: any) {
  return (
    <div className="container">
      <div className="center">
        <button className="btn">
          <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
            <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
          </svg>
          <span>{props.buttonText}</span>
        </button>
      </div>
    </div>
  )
}
