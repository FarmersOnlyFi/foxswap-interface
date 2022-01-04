import { useMemo } from 'react'
import { Fraction } from '@foxswap/sdk'

import usePitToken from './usePitToken'
import { useTokenBalance } from '../state/wallet/hooks'
import useGovernanceToken from 'hooks/useGovernanceToken'
import { useTotalSupply } from '../data/TotalSupply'
import { usePitContract } from './useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

export default function usePitRatio(): Fraction | undefined {
  const govToken = useGovernanceToken()
  const pit = usePitToken()
  const pitContract = usePitContract()
  const pitTotalSupply = useTotalSupply(pit)
  const pitGovTokenBalance = useTokenBalance(pit?.address, govToken)
  const pitGovBalance = useSingleCallResult(pitContract, 'balanceOfThis')?.result?.[0]

  return useMemo(() => {
    return pitGovBalance && pitTotalSupply
      ? new Fraction(pitGovBalance)?.divide(pitTotalSupply?.raw.toString())
      : undefined
  }, [govToken, pit, pitTotalSupply, pitGovTokenBalance])
}
