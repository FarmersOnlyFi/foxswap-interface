import { ChainId } from '@foxswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0xFE4980f62D708c2A84D3929859Ea226340759320',
  [ChainId.HARMONY_TESTNET]: '0xbcd3451992B923531615293Cb2b2c38ba8DE9529'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
