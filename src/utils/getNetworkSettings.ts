import { ChainId, BLOCKCHAIN_SETTINGS } from '@foxswap/sdk'

export default function getNetworkSettings(chainId: ChainId, rpcUrls?: string[]): Record<string, any> {
  const settings = BLOCKCHAIN_SETTINGS[chainId]

  return {
    chainId: settings.hexChainId(),
    chainName: settings.name,
    nativeCurrency: {
      name: settings.currency?.name,
      symbol: settings.currency?.symbol,
      decimals: settings.currency?.decimals
    },
    rpcUrls: rpcUrls ? rpcUrls : settings.rpcURLs,
    blockExplorerUrls: [settings.explorerURL]
  }
}
