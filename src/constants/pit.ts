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
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/EVO') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/OIL') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1BULL/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'XEN/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'OIL/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'EVO/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'GRAV/WONE') },
    // { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'USE/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'STARDUST/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/UST') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/1USDC') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/stONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ETH/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'UST/WONE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/MIS') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/JEWEL') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/RVRS') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/TRANQ') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/COINKX') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MIS/HVILLE') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ARB/MIS') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/LUMEN') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/LUMEN') },
    { tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'FOX/XYA') }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/BUSD')
    }
  ]
}
