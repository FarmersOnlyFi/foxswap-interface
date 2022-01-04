import { ChainId, Token } from '@foxswap/sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'
import getTokenWithDefault from '../utils/getTokenWithDefault'

export const BONDS: {
  [chainId in ChainId]?: {
    name: string
    isLpBond?: boolean
    displayName: string
    bondToken: [Token, Token] | Token
    rewardToken: Token | undefined
    bondAddress: string
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [],
  [ChainId.HARMONY_TESTNET]: [
    {
      name: 'fox_ust_lp',
      isLpBond: true,
      displayName: 'FOX-UST LP',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'FOX/UST'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_TESTNET, 'FOX'),
      bondAddress: '0x42b769209eC38286b858Ae2d919Cd111b12975FE'
    }
  ]
}
