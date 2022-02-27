import { JSBI } from '@foxswap/sdk'
import { Avatar, Col, Row, Skeleton, Statistic } from 'antd'
import React, { useCallback, useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { useBondingContract } from '../../hooks/useContract'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { calculateGasMargin } from '../../utils'
import { TransactionResponse } from '@ethersproject/providers'
import { ButtonConfirmed, ButtonError, ButtonPrimary } from '../../components/Button'
import { CustomLightSpinner } from '../../theme'
import Circle from '../../assets/images/blue-loader.svg'
import { useDerivedStakeInfo } from '../../state/stake/hooks'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import FoxLogo from '../../assets/svg/foxswap/foxswap-circle_05.svg'
import USTLogo from '../../assets/svg/foxswap/ust.png'

const GWEI_DENOM7 = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(7))
const { Countdown } = Statistic

export const RedeemContent: React.FC<any> = ({ bond }) => {
  const { account } = useActiveWeb3React()
  const bondContract = useBondingContract(bond.bondAddress)
  const deadline = Date.now() + bond.userBondMaturationSecondsRemaining * 1000

  const addTransaction = useTransactionAdder()

  async function onClaim(autostake: boolean) {
    if (bondContract && deadline && account) {
      const estimatedGas = await bondContract.estimateGas.redeem(account, autostake)
      await bondContract
        .redeem(account, autostake, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Redeem ${bond.rewardToken?.symbol} from ${bond.displayName} bond`
          })
        })
        .catch((error: any) => {
          if (error?.code === -32603) {
            console.error(error)
          }
        })
    }
  }

  return (
    <>
      <Row gutter={24} justify={'space-around'} style={{ fontSize: '14px' }}>
        <Col className="gutter-row" span={6}>
          <Statistic
            title="Pending"
            suffix={bond.userBondPendingPayout.token.symbol}
            value={bond.userInfo.payout.toSignificant(4)}
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Statistic
            title="Claimable"
            suffix={bond.userBondPendingPayout.token.symbol}
            value={bond.userBondPendingPayout.toSignificant(3)}
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
        <Col className="gutter-row" span={6}>
          <Countdown
            title="Until Fully Vested"
            value={deadline}
            format="Dd HH:mm:ss"
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
      </Row>
      <Row gutter={24} style={{ fontSize: '14px' }} justify={'space-around'}>
        <Col className="gutter-row" span={12}>
          <ButtonPrimary padding="8px" marginTop="18px" onClick={() => onClaim(false)}>
            Claim
          </ButtonPrimary>
        </Col>
        {bond.autostakeActive && (
          <Col className="gutter-row" span={12}>
            <ButtonPrimary padding="8px" marginTop="18px" onClick={() => onClaim(true)}>
              Claim & AutoStake
            </ButtonPrimary>
          </Col>
        )}
      </Row>
    </>
  )
}

export const MintContent: React.FC<any> = ({ bond }: any) => {
  const { account, library } = useActiveWeb3React()
  const bondContract = useBondingContract(bond.bondAddress)
  const [typedValue, setTypedValue] = useState('')
  const deadline = Date.now() + bond.userBondMaturationSecondsRemaining * 1000
  const { parsedAmount, error } = useDerivedStakeInfo(
    typedValue,
    bond.userBondTokenAmount.token,
    bond.userBondTokenAmount
  )
  const [approval, approveCallback] = useApproveCallback(parsedAmount, bond.bondAddress)
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const onUserInput = useCallback(
    (value: string) => {
      setTypedValue(value)
    },
    [typedValue]
  )

  const maxPossibleBuy = bond.tokenAvailableAmount.multiply(bond.trueBondPrice)
  const maxAmountInput = maxAmountSpend(
    bond.userBondTokenAmount.greaterThan(maxPossibleBuy) ? maxPossibleBuy : bond.userBondTokenAmount
  )
  const atMaxAmount = Boolean(maxAmountInput && typedValue === maxAmountInput.toSignificant(18))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toSignificant(18))
  }, [maxAmountInput, onUserInput])

  async function onAttemptToApprove() {
    if (!bondContract || !library || !deadline) throw new Error('missing dependencies')
    if (!parsedAmount) throw new Error('missing liquidity amount')

    return approveCallback()
  }

  const symbol = bond.tokenAvailableAmount.token.symbol
  const lpValue = (Number(typedValue) * Number(bond.valOfOneLpToken.toSignificant(8))).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  const purchaseAmount = (Number(typedValue) / Number(bond.trueBondPrice.toSignificant(8))).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  })

  const priceWithSlippage = bond.trueBondPrice
    .multiply(GWEI_DENOM7)
    .multiply(11)
    .divide(10)
    .toFixed(0)

  async function onBond() {
    setAttempting(true)
    if (bondContract && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
        const estimatedGas = await bondContract.estimateGas.deposit(formattedAmount, priceWithSlippage, account)
        await bondContract
          .deposit(formattedAmount, priceWithSlippage, account, {
            gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Bond ${bond.displayName} for ${bond.rewardToken?.symbol}`
            })
            setAttempting(false)
          })
          .catch((error: any) => {
            setAttempting(false)
            if (error?.code === -32603) {
              console.error(error?.code)
            }
            console.log(error)
          })
      } else {
        setAttempting(false)
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  return (
    <>
      <Row gutter={18} justify={'space-around'}>
        <Col span={6}>
          <Statistic
            title="Projected Earnings"
            suffix={symbol}
            value={purchaseAmount}
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Tokens Available"
            suffix={symbol}
            value={bond.tokenAvailableAmount.toSignificant(4)}
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
        <Col span={6}>
          <Statistic title="LP Value" prefix="$" value={lpValue} valueStyle={{ fontSize: '18px' }} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '18px' }} justify={'space-between'}>
        <Col span={16} style={{ alignSelf: 'center' }}>
          <CurrencyInputPanel
            value={typedValue}
            onUserInput={onUserInput}
            onMax={handleMax}
            showMaxButton={!atMaxAmount}
            currency={bond.totalBondedAmount.token}
            label={''}
            disableCurrencySelect={true}
            id={'bond-token-panel'}
          />
        </Col>
        <Col span={8} style={{ alignSelf: 'center' }}>
          {approval === ApprovalState.NOT_APPROVED ? (
            <ButtonConfirmed
              padding="8px"
              onClick={onAttemptToApprove}
              confirmed={false}
              disabled={approval !== ApprovalState.NOT_APPROVED}
            >
              Approve
            </ButtonConfirmed>
          ) : (
            <ButtonError
              padding="8px"
              disabled={!!error || approval !== ApprovalState.APPROVED}
              error={!!error && !!parsedAmount}
              onClick={onBond}
            >
              {attempting ? <CustomLightSpinner src={Circle} alt="loader" size={'20px'} /> : error ?? 'Bond'}
            </ButtonError>
          )}
        </Col>
      </Row>
    </>
  )
}

export const generateContentMap = (bond: any) => {
  return {
    mint: <MintContent bond={bond} />,
    redeem: <RedeemContent bond={bond} />
  }
}

export const HeaderContent: React.FC<any> = ({ bond }: any) => {
  const duration = bond.terms.vestingTerm / 60 / 60 / 24

  return (
    <>
      <Row gutter={24} justify={'space-around'}>
        <Col className="gutter-row" span={4}>
          <Avatar.Group maxCount={2}>
            <Avatar src={FoxLogo} size={50} />
            <Avatar src={USTLogo} size={50} />
          </Avatar.Group>
        </Col>
        <Col className="gutter-row" span={4}>
          {bond.price ? (
            <Statistic
              title="Price"
              prefix="$"
              value={bond.price.toFixed(2)}
              precision={2}
              valueStyle={{ fontSize: '18px' }}
            />
          ) : (
            <Skeleton />
          )}
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic
            title="Discount"
            suffix="%"
            value={bond.bondDiscount.toSignificant(3)}
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="ROI" suffix="%" value={bond.roi.toSignificant(3)} valueStyle={{ fontSize: '18px' }} />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic
            title="Purchased"
            prefix="$"
            value={bond.totalBondedAmount.multiply(bond.valOfOneLpToken).toFixed(2)}
            valueStyle={{ fontSize: '18px' }}
          />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="Vesting Term" value={`${duration} Days`} valueStyle={{ fontSize: '18px' }} />
        </Col>
      </Row>
    </>
  )
}
