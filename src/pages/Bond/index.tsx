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
// import { toV2LiquidityToken } from '../../state/user/hooks'
// import { useMultipleContractSingleData } from '../../state/multicall/hooks'
// import useBlockchain from '../../hooks/useBlockchain'
// import { abi as IUniswapV2PairABI } from '@foxswap/core/build/IUniswapV2Pair.json'
// import { Interface } from '@ethersproject/abi'
// import { ZERO_ADDRESS } from '../../constants'
// import {wrappedCurrency} from "../../utils/wrappedCurrency";
import { useBondInfo } from '../../state/stake/hooks'
// import { useBondingContract } from '../../hooks/useContract'

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
  // const { account, chainId } = useActiveWeb3React()
  // const blockchain = useBlockchain()

  const [showBondingModal, setShowBondingModal] = useState(false)
  // const [showInput, setShowInput] = useState(false)
  // const [typedValue, setTypedValue] = useState('')
  const bonds = useBondInfo()
  const bond = bonds[0]
  console.log('bond data:', bonds)

  // const data = useBondingContract()
  const isActive = true

  return (
    <PageWrapper gap="lg">
      <>
        <BondingModal
          isOpen={showBondingModal}
          bondTokenName={'FOX/UST'}
          onDismiss={() => setShowBondingModal(false)}
          bondingToken={bond.userBondTokenAmount.token}
          userLiquidityUnstaked={bond.userBondTokenAmount}
        />
      </>
      {!isActive ? (
        <MintCard>
          <Text fontWeight={200} fontSize={33} textAlign={'center'}>
            Coming Soon
          </Text>
        </MintCard>
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
                    5 Days
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
        </>
      )}
    </PageWrapper>
  )
}
