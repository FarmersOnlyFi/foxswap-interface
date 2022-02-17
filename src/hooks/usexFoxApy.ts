import { Fraction, JSBI } from '@foxswap/sdk'
import { useActiveWeb3React } from '.'
import { useGovTokenContract, useMasterBreederContract } from './useContract'
import getBlocksPerYear from '../utils/getBlocksPerYear'
import { useSingleCallResult } from '../state/multicall/hooks'

export default function useXFoxApy() {
  const { chainId } = useActiveWeb3React()
  const masterBreederContract = useMasterBreederContract()
  const govTokenContract = useGovTokenContract()

  const blocksPerYear = getBlocksPerYear(chainId)
  const baseBlockRewards = new Fraction(BigInt(1), BigInt(20)) // 0.05 per block

  const poolRewardsPerBlock = useSingleCallResult(masterBreederContract, 'poolInfo', [0])
  const totalAllocPoints = useSingleCallResult(masterBreederContract, 'totalAllocPoint')
  const govTokenMasterchefBalance = useSingleCallResult(govTokenContract, 'balanceOf', [masterBreederContract?.address])

  const govTokenMasterchefBalanceResult = govTokenMasterchefBalance.result
    ? BigInt(govTokenMasterchefBalance.result)
    : BigInt(0)
  if (govTokenMasterchefBalanceResult < 0) {
    return { apyDay: 0, apy: 0 }
  }
  const nCompounds = 3000
  const poolShare =
    poolRewardsPerBlock.result &&
    totalAllocPoints.result &&
    new Fraction(BigInt(poolRewardsPerBlock.result?.allocPoint), BigInt(totalAllocPoints.result))
  const rewardsPerCoumpound =
    poolShare &&
    poolShare
      .multiply(baseBlockRewards)
      .multiply(blocksPerYear)
      .divide(BigInt(nCompounds))
      .multiply(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)))
  const aprDay =
    rewardsPerCoumpound &&
    govTokenMasterchefBalanceResult > 0 &&
    rewardsPerCoumpound.divide(govTokenMasterchefBalanceResult)

  const apyDay = aprDay ? (Number(aprDay?.add(JSBI.BigInt(1)).toFixed(10)) ** (nCompounds / 365) - 1) * 100 : 0
  const apy = aprDay ? (Number(aprDay?.add(JSBI.BigInt(1)).toFixed(10)) ** nCompounds - 1) * 100 : 0
  return { apyDay, apy }
}
