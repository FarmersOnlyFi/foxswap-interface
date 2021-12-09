import { ChainId, Token } from '@foxswap/sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export const PIT_POOLS: {
  [chainId in ChainId]?: {
    pid: number
    tokens: [Token, Token]
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/WONE')
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/USDC')
    },
    {
      pid: 2,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'UST/ONE')
    }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/BUSD')
    }
  ]
}
