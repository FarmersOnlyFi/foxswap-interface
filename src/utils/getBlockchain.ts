import { Blockchain, ChainId } from '@foxswap/sdk'

export default function getBlockchain(chainId: ChainId | undefined): Blockchain {
  switch (chainId) {
    case ChainId.HARMONY_MAINNET:
      return Blockchain.HARMONY
    case ChainId.HARMONY_TESTNET:
      return Blockchain.HARMONY
    default:
      return Blockchain.HARMONY
  }
}
