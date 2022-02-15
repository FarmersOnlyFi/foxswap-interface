import { ChainId, Token } from '@foxswap/sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'
import getTokenWithDefault from '../utils/getTokenWithDefault'

export const BONDS: {
  [chainId in ChainId]?: {
    name: string
    isLpBond: boolean
    isWethBond: boolean // bonds must be either stable or WETH
    displayName: string
    bondToken: [Token, Token] // | Token
    rewardToken: Token
    bondAddress: string
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      name: 'fox_ust_lp',
      isLpBond: true,
      isWethBond: false,
      displayName: 'FOX-UST LP',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/UST'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'FOX'),
      bondAddress: '0x5E0a1ea7fe6F1B2e051C4C1CE1CbE1feaEcCcFc2'
    }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      name: 'fox_ust_lp',
      isLpBond: true,
      isWethBond: false,
      displayName: 'FOX-UST LP',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'FOX/UST'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_TESTNET, 'FOX'),
      bondAddress: '0x42b769209eC38286b858Ae2d919Cd111b12975FE'
    }
  ]
}
