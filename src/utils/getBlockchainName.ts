import { ChainId } from '@foxswap/sdk'

export default function getBlockchainName(chainId: ChainId | undefined): string {
  switch (chainId) {
    case ChainId.HARMONY_MAINNET:
    case ChainId.HARMONY_TESTNET:
      return 'Harmony'
    default:
      return 'Harmony'
  }
}
