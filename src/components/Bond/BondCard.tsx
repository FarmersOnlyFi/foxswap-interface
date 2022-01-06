import { CardSection, DataCard } from '../earn/styled'
import { AutoRow, RowBetween } from '../Row'
import { AutoColumn } from '../Column'
import { Text } from 'rebass'
import { ButtonMint } from '../Button'
import React from 'react'
import styled from 'styled-components'

export const MinterButton = styled(ButtonMint)`
  height: 55%;
  align-self: center;
  width: 85px;
  border-radius: 12px;
  padding: 16px;
  margin: 5px;
`

export const MintCard = styled(DataCard)`
  background: ${({ theme }) => theme.bg1};
  border-radius: 10px;
  padding: 17px;
  box-shadow: ${({ theme }) => theme.bg1} 0 2px 8px 0;
`

export default function BondCard() {
  const isActive = false
  return (
    <>
      <MintCard>
        <Text fontWeight={200} fontSize={11}>
          Tokenssssss
        </Text>
      </MintCard>
      {isActive && (
        <MintCard>
          <CardSection>
            <AutoRow justify="space-between">
              <AutoColumn>
                <Text fontWeight={200} fontSize={11}>
                  Token
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  UST/WONE
                </Text>
              </AutoColumn>
              <AutoColumn>
                <Text fontWeight={200} fontSize={11}>
                  Prices
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  $19.212
                </Text>
                <RowBetween />
              </AutoColumn>
              <AutoColumn>
                <Text fontWeight={200} fontSize={11} textAlign="left">
                  ROI
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  -4.78%
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
                  Purchasedddddd
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  $3,000,000
                </Text>
              </AutoColumn>
              <AutoColumn>
                <MinterButton>Bond</MinterButton>
              </AutoColumn>
            </AutoRow>
          </CardSection>
        </MintCard>
      )}
    </>
  )
}
