import { ChainId, JSBI, BLOCKCHAIN_SETTINGS } from '@foxswap/sdk'

export default function getBlocksPerYear(chainId: ChainId | undefined): JSBI {
  const blockchainSettings = chainId ? BLOCKCHAIN_SETTINGS[chainId] : undefined
  const blocksPerMinute = blockchainSettings ? JSBI.BigInt(30) : JSBI.BigInt(30)
  const blocksPerHour = JSBI.multiply(blocksPerMinute, JSBI.BigInt(60))
  const blocksPerDay = JSBI.multiply(blocksPerHour, JSBI.BigInt(24))
  const blocksPerYear = JSBI.multiply(blocksPerDay, JSBI.BigInt(365))

  return blocksPerYear
}
