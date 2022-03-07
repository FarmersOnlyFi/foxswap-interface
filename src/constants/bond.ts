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
    autostakeActive: boolean
    fee: number
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
      bondAddress: '0x05E7D92286a21cdc563495FF46627E483cc583bA',
      autostakeActive: true,
      fee: 1
    },
    {
      name: 'fox_one_lp',
      isLpBond: true,
      isWethBond: true,
      displayName: 'FOX-ONE LP',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/WONE'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'FOX'),
      bondAddress: '0xf69aB095e94a4F95dfBd6cBd0c2B352985D1843a',
      autostakeActive: true,
      fee: 10
    },
    {
      name: 'ust_rvrs_lp',
      isLpBond: true,
      isWethBond: false,
      displayName: 'RVRS-UST LP',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'UST/RVRS'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'RVRS'),
      bondAddress: '0xB2D1f6f7927f38DCf8F0482ede99845F625E6473',
      autostakeActive: false,
      fee: 333
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
      bondAddress: '0x42b769209eC38286b858Ae2d919Cd111b12975FE',
      autostakeActive: false,
      fee: 333
    }
  ]
}
