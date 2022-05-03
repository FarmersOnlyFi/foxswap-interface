import { Web3Provider } from '@ethersproject/providers'
import { Blockchain } from '@foxswap/sdk'
import { BLOCKCHAIN } from '../connectors'

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  switch (BLOCKCHAIN) {
    case Blockchain.BINANCE_SMART_CHAIN:
      library.pollingInterval = 1000
      break
    case Blockchain.HARMONY:
      library.pollingInterval = 200
      break
    default:
      library.pollingInterval = 200
      break
  }
  return library
}
