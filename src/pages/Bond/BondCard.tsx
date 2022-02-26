import React, { useCallback, useState } from 'react'
import { Avatar, Card, Col, Divider, Row, Skeleton, Statistic } from 'antd'
import { useBondInfo, useDerivedStakeInfo } from '../../state/stake/hooks'
import FoxLogo from 'assets/svg/foxswap/foxswap-circle_05.svg'
import USTLogo from 'assets/svg/foxswap/ust.png'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { ButtonConfirmed, ButtonError, ButtonPrimary } from '../../components/Button'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { calculateGasMargin } from '../../utils'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useBondingContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks'
import { JSBI } from '@foxswap/sdk'
import { CustomLightSpinner } from '../../theme'
import Circle from '../../assets/images/blue-loader.svg'
import OutsideClickHandler from 'react-outside-click-handler'

const GWEI_DENOM7 = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(7))
/* Tab 1: Mint
 * Your Balance, You will get, Max you can buy, ROI, Debt Ratio, Vesting Term, Minimum Purchase
 *
 * Tab 2: Redeem
 * Pending Rewards, Claimable Rewards, Time until fully vested, ROI, Debt Ration, Vesting Term
 * */

const tabListNoTitle: any = [
  {
    key: 'mint',
    tab: 'Mint'
  },
  {
    key: 'redeem',
    tab: 'Redeem'
  }
]

function CardItem({ bond }: any) {
  const { library, account } = useActiveWeb3React()
  const [activeTabKey, setActiveTabKey]: any = useState('mint')

  const duration = bond.terms.vestingTerm / 60 / 60 / 24
  const [typedValue, setTypedValue] = useState('')
  const [tokensToBuy, setTokensToBuy] = useState('')
  const [valueOfLp, setValueOfLp] = useState('')

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const [failed, setFailed] = useState<boolean>(false)

  const onTabChange = (key: any) => {
    setActiveTabKey(key)
  }

  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  const maxPossibleBuy = bond.tokenAvailableAmount.multiply(bond.trueBondPrice)
  const maxAmountInput = maxAmountSpend(
    bond.userBondTokenAmount.greaterThan(maxPossibleBuy) ? maxPossibleBuy : bond.userBondTokenAmount
  )
  const atMaxAmount = Boolean(maxAmountInput && typedValue === maxAmountInput.toSignificant(18))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toSignificant(18))
  }, [maxAmountInput, onUserInput])

  const { Countdown } = Statistic
  const deadline = Date.now() + bond.userBondMaturationSecondsRemaining * 1000

  const bondContract = useBondingContract(bond.bondAddress)
  const { parsedAmount, error } = useDerivedStakeInfo(
    typedValue,
    bond.userBondTokenAmount.token,
    bond.userBondTokenAmount
  )
  const [approval, approveCallback] = useApproveCallback(parsedAmount, bond.bondAddress)

  async function onAttemptToApprove() {
    console.log(hash, failed)
    if (!bondContract || !library || !deadline) throw new Error('missing dependencies')
    if (!parsedAmount) throw new Error('missing liquidity amount')

    return approveCallback()
  }

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
            setHash(response.hash)
            setAttempting(false)
          })
          .catch((error: any) => {
            setAttempting(false)
            if (error?.code === -32603) {
              setFailed(true)
            }
            console.log(error)
          })
      } else {
        setAttempting(false)
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  async function onClaim(autostake: boolean) {
    setAttempting(true)
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
          setHash(response.hash)
          setAttempting(false)
        })
        .catch((error: any) => {
          setAttempting(false)
          if (error?.code === -32603) {
            setFailed(true)
          }
          console.log(error)
        })
    }
  }

  const calculateEarnings = useCallback(() => {
    try {
      const amtToBuy = Number(typedValue) / Number(bond.trueBondPrice.toSignificant(8))
      setTokensToBuy(amtToBuy.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 }))
      const lpVal = Number(typedValue) * Number(bond.valOfOneLpToken.toSignificant(8))
      setValueOfLp(lpVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    } catch (err) {
      console.error('onUserInput', err)
      setTokensToBuy('')
    }
  }, [])

  function RedeemContent() {
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
        <Row gutter={24} style={{ fontSize: '14px' }}>
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

  const MintContent: any = () => {
    return (
      <>
        <Row gutter={24} justify={'space-between'}>
          <Col span={8}>
            <Statistic
              title="You will get"
              suffix={bond.userBondPendingPayout.token.symbol}
              value={tokensToBuy}
              valueStyle={{ fontSize: '18px' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Tokens Available" // TODO - show "Sold Out" if this is 0
              suffix={bond.tokenAvailableAmount.token.symbol}
              value={bond.tokenAvailableAmount.toSignificant(4)}
              valueStyle={{ fontSize: '18px' }}
            />
          </Col>
          <Col span={8}>
            <Statistic title="Value of LP" prefix="$" value={valueOfLp} valueStyle={{ fontSize: '18px' }} />
          </Col>
        </Row>
        <Divider />
        <Row gutter={24}>
          <Col span={16} style={{ alignSelf: 'center' }}>
            <OutsideClickHandler onOutsideClick={calculateEarnings}>
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
            </OutsideClickHandler>
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

  const HeaderContent: any = () => {
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

  const contentList: any = {
    mint: <MintContent />,
    redeem: <RedeemContent />
  }

  return (
    <>
      <HeaderContent />
      <Divider />
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<a href="#">Contract</a>}
        onTabChange={key => {
          onTabChange(key)
        }}
      >
        {contentList[activeTabKey]}
      </Card>
    </>
  )
}

export default function BondCard() {
  const bonds = useBondInfo()

  return (
    <>
      {bonds &&
        bonds.map(bond => {
          return (
            <Card
              key={bond.displayName}
              style={{ width: '100%', background: '#121212', color: 'white', flexDirection: 'row' }}
            >
              <CardItem bond={bond} />
            </Card>
          )
        })}
    </>
  )
}
