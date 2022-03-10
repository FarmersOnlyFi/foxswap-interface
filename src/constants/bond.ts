import { ChainId, Token } from '@foxswap/sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'
import getTokenWithDefault from '../utils/getTokenWithDefault'

export const BONDS: {
  [chainId in ChainId]?: {
    name: string
    isWethBond: boolean // bonds must be either stable or WETH
    displayName: string
    bondToken: [Token, Token] | Token
    rewardToken: Token
    bondAddress: string
    autostakeActive: boolean
    fee: number
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      name: 'fox_ust_lp',
      isWethBond: false,
      displayName: 'FOX-UST Bond',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/UST'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'FOX'),
      bondAddress: '0xF3b9E8464C09DB4eE6abA0dA28F42fc1218F33f9',
      autostakeActive: true,
      fee: 1
    },
    {
      name: 'fox_one_lp',
      isWethBond: true,
      displayName: 'FOX-ONE Bond',
      bondToken: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/WONE'),
      rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'FOX'),
      bondAddress: '0x33EE9136940ca82255f9fC9bB4ebC5400c81b04C',
      autostakeActive: true,
      fee: 1
    }
    // {
    //   name: 'ust_rvrs_lp',
    //   isWethBond: false,
    //   displayName: 'RVRS-UST Bond',
    //   bondToken: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'UST/RVRS'),
    //   rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'RVRS'),
    //   bondAddress: '0xB2D1f6f7927f38DCf8F0482ede99845F625E6473',
    //   autostakeActive: false,
    //   fee: 333
    // },
    // {
    //   name: 'tranq_bond',
    //   isWethBond: false,
    //   displayName: 'TRANQ for Burn Vault',
    //   bondToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'TRANQ'),
    //   rewardToken: getTokenWithDefault(ChainId.HARMONY_MAINNET, 'FOX'),
    //   bondAddress: '0x8ceE35b5863807E7F36014fEe2182dFd13a75361',
    //   autostakeActive: true,
    //   fee: 0
    // }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      name: 'fox_ust_lp',
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
