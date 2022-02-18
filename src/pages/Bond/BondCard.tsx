import React, { useCallback, useState } from 'react'
import { Card, Col, Row, Skeleton, Statistic, Avatar, Divider } from 'antd'
import { useBondInfo } from '../../state/stake/hooks'
import FoxLogo from 'assets/svg/foxswap/foxswap-circle_05.svg'
import USTLogo from 'assets/svg/foxswap/ust.png'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { maxAmountSpend } from '../../utils/maxAmountSpend'

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

// function BondCurrencyInput({ bondTokens, userBalance, pendingPayout }: any): JSX.Element {
//
//   console.log(typedValue, onUserInput, inputTokenPair, userBalance)
//   return (
//     <Row gutter={24}>
//       <Col span={24}>
//         <CurrencyInputPanel
//           value={typedValue}
//           onUserInput={onUserInput}
//           onMax={handleMax}
//           showMaxButton={!atMaxAmount}
//           currency={inputTokenPair?.liquidityToken}
//           pair={inputTokenPair}
//           label={''}
//           id={'bond-token-panel'}
//         />
//       </Col>
//     </Row>
//     // <Input.Group>
//     //   <Typography.Text type={'secondary'}>Balance: {userBalance ? userBalance.toFixed(4) : '-'}</Typography.Text>
//     //   <Row>
//     //     <Col>
//     //       <InputNumber onChange={onUserInput} value={typedValue} size={'large'} />
//     //     </Col>
//     //     <Col>
//     //       <Button type={'primary'} size={'large'}>
//     //         Bond
//     //       </Button>
//     //     </Col>
//     //   </Row>
//     // </Input.Group>
//   )
// }

function CardItem({
  displayName,
  price,
  roi,
  terms,
  totalBonded,
  bondTokens,
  userBalance,
  pendingPayout,
  userBondMaturationSecondsRemaining,
  userBondPendingPayout,
  tokenAvailableAmount,
  payout,
  discount
}: any): JSX.Element {
  const duration = terms.vestingTerm / 60 / 60 / 24
  const [typedValue, setTypedValue] = useState('')
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  const maxAmountInput = maxAmountSpend(userBalance)
  const atMaxAmount = Boolean(maxAmountInput && userBalance?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  const { Countdown } = Statistic
  const deadline = Date.now() + userBondMaturationSecondsRemaining * 1000

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
          {price ? <Statistic title="Price" prefix="$" value={price.toFixed(2)} precision={2} /> : <Skeleton />}
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="Discount" suffix="%" value={discount.toSignificant(3)} />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="ROI" suffix="%" value={roi.toSignificant(3)} />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="Purchased" prefix="$" value={totalBonded.toFixed(2)} />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="Vesting Term" value={`${duration} Days`} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={12}>
          <CurrencyInputPanel
            value={typedValue}
            onUserInput={onUserInput}
            onMax={handleMax}
            showMaxButton={!atMaxAmount}
            currency={totalBonded.token}
            label={''}
            disableCurrencySelect={true}
            id={'bond-token-panel'}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Tokens Available to Buy" // TODO - show "Sold Out" if this is 0
            suffix={'FOX'} // TODO - this should be reward token name
            value={tokenAvailableAmount.toSignificant(3)}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={24} justify={'space-around'} style={{ fontSize: '24px' }}>
        UserInfo
      </Row>
      <Row gutter={24} justify={'space-around'} style={{ fontSize: '14px' }}>
        <Col className="gutter-row" span={6}>
          <Statistic title="Pending" suffix="FOX" value={payout.toSignificant(4)} valueStyle={{ fontSize: '18px' }} />
        </Col>
        <Col className="gutter-row" span={6}>
          <Statistic
            title="Claimable"
            suffix="FOX" // TODO - this should be reward token name
            value={userBondPendingPayout.toSignificant(3)}
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
    </>
  )
}

export default function BondCard() {
  const [activeTabKey, setActiveTabKey]: any = useState('mint')
  const bonds = useBondInfo()
  console.log('BondCard - bonds', bonds)

  const handleTabChange = (key: any) => {
    setActiveTabKey(key)
  }

  return (
    <>
      {bonds &&
        bonds.map(bond => {
          return (
            <Card
              key={bond.displayName}
              bordered
              style={{ width: '100%', background: '#121212', color: 'white', flexDirection: 'row' }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey}
              tabBarExtraContent={<a href="#">Contract</a>}
              onTabChange={(key: any) => handleTabChange(key)}
            >
              <CardItem
                displayName={bond.displayName}
                roi={bond.roi}
                price={bond.price}
                terms={bond.terms}
                totalBonded={bond.totalBondedAmount}
                bondTokens={bond.maxPayout?.currency}
                userBalance={bond.userBondTokenAmount}
                pendingPayout={bond.userBondPendingPayout}
                userBondMaturationSecondsRemaining={bond.userBondMaturationSecondsRemaining}
                userBondPendingPayout={bond.userBondPendingPayout}
                tokenAvailableAmount={bond.tokenAvailableAmount}
                payout={bond.userInfo.payout}
                discount={bond.bondDiscount}
              />
            </Card>
          )
        })}
    </>
  )
}
