import { TokenAmount, Blockchain } from '@foxswap/sdk'
import React from 'react'
//import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import getTokenLogo from '../../utils/getTokenLogo'
import { useGovTokenSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
//import { useMerkleDistributorContract } from '../../hooks/useContract'
//import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
// import { useTotalLockedGovTokensEarned, useTotalUnlockedGovTokensEarned } from '../../state/stake/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { TYPE, UniTokenAnimated } from '../../theme'
//import { computeUniCirculation } from '../../utils/computeUniCirculation'
import useBUSDPrice from '../../hooks/useBUSDPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardSection, DataCard } from '../earn/styled'
import useGovernanceToken from '../../hooks/useGovernanceToken'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import { MouseoverTooltip } from '../Tooltip'
import useBlockchain from '../../hooks/useBlockchain'
import usePitRatio from '../../hooks/usePitRatio'
import usePitToken from '../../hooks/usePitToken'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  //background: radial-gradient(76.02% 75.41% at 1.84% 0%, //${({ theme }) => theme.bg1} 90%, #6200ee 10%);
  background: radial-gradient(circle, rgba(66,0,159,1) 0%, rgba(33,36,41,1) 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function GovTokenBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account } = useActiveWeb3React()
  const govToken = useGovernanceToken()
  const xgovToken = usePitToken()
  const blockchain = useBlockchain()
  const govTokenBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )
  const xGovTokenRatio = usePitRatio()
  const xGovTokenBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    xgovToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )
  const totalSupply: TokenAmount | undefined = useGovTokenSupply()
  const govTokenPrice = useBUSDPrice(govToken)
  const circulatingMarketCap = govTokenPrice ? totalSupply?.multiply(govTokenPrice.raw) : undefined
  const totalMarketCap = govTokenPrice ? totalSupply?.multiply(govTokenPrice.raw) : undefined
  const govStaked = xGovTokenRatio ? xGovTokenBalance?.multiply(xGovTokenRatio) : xGovTokenBalance
  let total = govTokenBalance
  if (govStaked instanceof TokenAmount) {
    total = govTokenBalance?.add(govStaked)
  }

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your {govToken?.symbol} Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="80px" src={getTokenLogo()} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  <MouseoverTooltip
                    text={
                      govTokenPrice && total
                        ? `USD: $${total.multiply(govTokenPrice?.raw).toSignificant(6, { groupSeparator: ',' })}`
                        : ''
                    }
                  >
                    {total?.toFixed(2, { groupSeparator: ',' })}
                  </MouseoverTooltip>
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">FOX Balance:</TYPE.white>
                  <TYPE.white color="white">
                    <MouseoverTooltip
                      text={
                        govTokenPrice && govTokenBalance && govTokenBalance.greaterThan('0')
                          ? `USD: $${govTokenBalance
                              .multiply(govTokenPrice?.raw)
                              .toSignificant(6, { groupSeparator: ',' })}`
                          : ''
                      }
                    >
                      {govTokenBalance?.toFixed(2, { groupSeparator: ',' })}
                    </MouseoverTooltip>
                  </TYPE.white>
                </RowBetween>

                <RowBetween>
                  <TYPE.white color="white">xFOX Balance:</TYPE.white>
                  <TYPE.white color="white">
                    <MouseoverTooltip
                      text={
                        govTokenPrice && xGovTokenBalance && xGovTokenRatio
                          ? `USD: $${xGovTokenBalance
                              .multiply(govTokenPrice?.raw)
                              .multiply(xGovTokenRatio)
                              .toSignificant(6, { groupSeparator: ',' })}`
                          : ''
                      }
                    >
                      {xGovTokenBalance?.toFixed(2, { groupSeparator: ',' })}
                    </MouseoverTooltip>
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">{govToken?.symbol} total supply:</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
          </AutoColumn>
        </CardSection>
        {blockchain === Blockchain.HARMONY && govTokenPrice && circulatingMarketCap && totalMarketCap && (
          <>
            <Break />
            <CardSection gap="sm">
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">{govToken?.symbol} price:</TYPE.white>
                  <TYPE.white color="white">${govTokenPrice?.toFixed(4) ?? '-'}</TYPE.white>
                </RowBetween>
                {totalMarketCap && (
                  <RowBetween>
                    <TYPE.white color="white">{govToken?.symbol} total market cap:</TYPE.white>
                    <TYPE.white color="white">${totalMarketCap?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
                  </RowBetween>
                )}
              </AutoColumn>
            </CardSection>
          </>
        )}
      </ModalUpper>
    </ContentWrapper>
  )
}
