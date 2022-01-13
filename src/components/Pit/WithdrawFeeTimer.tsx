import React from 'react'
import { TYPE } from '../../theme'
import getTimePeriods from 'utils/getTimePeriods'

const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number | null }> = ({ secondsRemaining }) => {
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return (
    <TYPE.white fontSize={15}>
      {days && days}d : {hours && hours}h : {minutes && minutes}m
    </TYPE.white>
  )
}

export default WithdrawalFeeTimer
