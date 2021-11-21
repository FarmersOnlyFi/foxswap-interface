import { Blockchain } from '@foxswap/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.HARMONY:
      return 'FoxSwap'
    case Blockchain.ETHEREUM:
      return 'FoxSwap'
    default:
      return 'FoxSwap'
  }
}
