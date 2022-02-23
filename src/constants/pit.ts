import { ChainId, Token } from '@foxswap/sdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export const PIT_POOLS: {
  [chainId in ChainId]?: {
    pid?: number
    tokens: [Token, Token]
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/UST') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/1USDC') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/stONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ETH/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'UST/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/MIS') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/JEWEL') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/RVRS') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/RAVAX') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/TRANQ') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/COINKX') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MIS/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/XYA') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ARB/MIS') }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/BUSD')
    }
  ]
}
