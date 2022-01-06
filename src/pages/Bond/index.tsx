import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import React, { useState } from 'react'
import BondingModal from '../../components/Bond/BondingModal'
import { Token, TokenAmount, ChainId } from '@foxswap/sdk'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { CardSection, DataCard } from '../../components/earn/styled'
import { AutoRow, RowBetween } from '../../components/Row'
import { Text } from 'rebass'
import { ButtonMint } from '../../components/Button'
// import { BONDS } from '../../constants/bond'
// import { useBondingContract } from '../../hooks/useContract'
// import {PIT} from "../../constants";

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
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
  const { account } = useActiveWeb3React()

  const [showBondingModal, setShowBondingModal] = useState(false)
  // const [showInput, setShowInput] = useState(false)
  // const [typedValue, setTypedValue] = useState('')

  const inputCurrency = new Token(
    ChainId.HARMONY_TESTNET,
    '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
    18,
    'FOX',
    'FOX Token'
  )

  const tokenBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, inputCurrency)
  // const data = useBondingContract()
  const isActive = false

  return (
    <PageWrapper gap="lg">
      <>
        <BondingModal
          isOpen={showBondingModal}
          onDismiss={() => setShowBondingModal(false)}
          bondingToken={inputCurrency}
          userLiquidityUnstaked={tokenBalance}
        />
      </>
      {!isActive ? (
        <MintCard>
          <Text fontWeight={200} fontSize={33} textAlign={'center'}>
            Coming Soon
          </Text>
        </MintCard>
      ) : (
        <MintCard>
          <CardSection>
            <AutoRow justify="space-between">
              <AutoColumn>
                <Text fontWeight={200} fontSize={11}>
                  Token
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  FOX/UST
                </Text>
              </AutoColumn>
              <AutoColumn>
                <Text fontWeight={200} fontSize={11}>
                  Price
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  $19.21
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
                  5 Dayss
                </Text>
              </AutoColumn>
              <AutoColumn>
                <Text fontWeight={200} fontSize={11} textAlign="left">
                  Purchased
                </Text>
                <Text fontWeight={300} fontSize={18}>
                  $3,000,000
                </Text>
              </AutoColumn>
              <AutoColumn>
                <MinterButton onClick={() => setShowBondingModal(true)}>Bond</MinterButton>
              </AutoColumn>
            </AutoRow>
          </CardSection>
        </MintCard>
      )}
    </PageWrapper>
  )
}
