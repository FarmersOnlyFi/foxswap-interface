import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { DataCard, CardSection } from '../../components/earn/styled'
import React from 'react'
import { RowBetween, AutoRow } from '../../components/Row'
// import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { Text } from 'rebass'
// import { ArrowWrapper } from '../../components/swap/styleds'
// import { MintButton } from '../../components/Button'
import { ChainId, Token } from '@foxswap/sdk'
// import { MintButton } from '../../components/Button'
// import { ArrowWrapper } from '../../components/swap/styleds'
import CurrencyLogo from '../../components/CurrencyLogo'
import { ButtonMint } from '../../components/Button'

// import {Field} from "../../state/swap/actions";

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

export const FixedHeightRow = styled(RowBetween)`
  height: 36px;
`

// const StyledBottomCard = styled(DataCard)<{ dim: any }>`
//   background: ${({ theme }) => theme.bg3};
//   opacity: ${({ dim }) => (dim ? 0.4 : 1)};
//   margin-top: -40px;
//   padding: 0 1.25rem 1rem 1.25rem;
//   padding-top: 32px;
//   z-index: 1;
// `

export default function Bond() {
  // const [showInput, setShowInput] = useState(false)
  // const [typedValue, setTypedValue] = useState('')
  const currency = new Token(
    ChainId.HARMONY_MAINNET,
    '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
    18,
    'FOX',
    'FOX Token'
  )

  // const onUserInput = useCallback((typedValue: string) => {
  //   setTypedValue(typedValue)
  // }, [])
  return (
    <PageWrapper>
      <DataCard>
        <CardSection>
          <AutoRow gap="10px" justify="space-between">
            <CurrencyLogo currency={currency} size={'24px'} />
            <AutoColumn gap="4px">
              <Text fontWeight={700} fontSize={11}>
                Token
              </Text>
              <Text fontWeight={300} fontSize={20}>
                UST/WONE
              </Text>
            </AutoColumn>
            <AutoColumn>
              <Text fontWeight={700} fontSize={11}>
                Price
              </Text>
              <Text fontWeight={300} fontSize={20}>
                $19.21
              </Text>
              <RowBetween />
            </AutoColumn>
            <AutoColumn>
              <Text fontWeight={700} fontSize={11} textAlign="left">
                ROI
              </Text>
              <Text fontWeight={300} fontSize={20}>
                -4.78%
              </Text>
            </AutoColumn>
            <AutoColumn>
              <Text fontWeight={700} fontSize={11} textAlign="left">
                Duration
              </Text>
              <Text fontWeight={300} fontSize={20}>
                5 Days
              </Text>
            </AutoColumn>
            <AutoColumn>
              <Text fontWeight={700} fontSize={11} textAlign="left">
                Purchased
              </Text>
              <Text fontWeight={300} fontSize={20}>
                $3,000,000
              </Text>
            </AutoColumn>
            <AutoRow justify="center">
              <ButtonMint>
                <span>Mint</span>
                {/*{showInput ? (*/}
                {/*  <ArrowUp size={16} onClick={() => setShowInput(!showInput)} />*/}
                {/*) : (*/}
                {/*  <ArrowDown size={16} onClick={() => setShowInput(!showInput)} />*/}
                {/*)}*/}
              </ButtonMint>
            </AutoRow>
          </AutoRow>
          {/*{showInput && (*/}
          {/*  <DataCard style={{ background: 'transparent' }}>*/}
          {/*    <AutoRow>*/}
          {/*      <AutoColumn style={{ width: '70%', padding: '1.5rem', marginTop: '20px' }}>*/}
          {/*        <CurrencyInputPanel*/}
          {/*          value={typedValue}*/}
          {/*          onUserInput={onUserInput}*/}
          {/*          showMaxButton={false}*/}
          {/*          currency={currency}*/}
          {/*          label={''}*/}
          {/*          disableCurrencySelect={true}*/}
          {/*          id="bond-form"*/}
          {/*        />*/}
          {/*      </AutoColumn>*/}
          {/*      <AutoColumn justify="flex-end">*/}
          {/*        <MintButton onClick={() => console.log('hit')} disabled={false}>*/}
          {/*          Mint*/}
          {/*        </MintButton>*/}
          {/*      </AutoColumn>*/}
          {/*    </AutoRow>*/}
          {/*  </DataCard>*/}
          {/*)}*/}
        </CardSection>
      </DataCard>
    </PageWrapper>
  )
}
