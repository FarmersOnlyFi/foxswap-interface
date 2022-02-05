import React, { useCallback, useState } from 'react'
import { Card, Col, Row, Skeleton, Statistic, Avatar, Button, Divider, Input, Typography } from 'antd'
import { useBondInfo } from '../../state/stake/hooks'
// import { useTokenBalance } from '../../state/wallet/hooks'
import FoxLogo from 'assets/svg/foxswap/foxswap-circle_05.svg'
import USTLogo from 'assets/svg/foxswap/ust.png'
// import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { usePair } from '../../data/Reserves'

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

function BondCurrencyInput({ bondTokens, userBalance, pendingPayout }: any): JSX.Element {
  const [, inputTokenPair] = usePair(bondTokens[0], bondTokens[1])
  const [typedValue, setTypedValue] = useState('')
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])
  console.log(typedValue, onUserInput, inputTokenPair, userBalance)
  return (
    <Input.Group>
      <Typography.Text type={'secondary'}>Balance: {userBalance}</Typography.Text>
      <Row>
        <Col>
          <Input defaultValue="0" type={'number'} />
        </Col>
        <Col>
          <Button type="primary">Submit</Button>
        </Col>
      </Row>
    </Input.Group>
  )
}

function CardItem({
  displayName,
  price,
  roi,
  terms,
  totalBonded,
  bondTokens,
  userBalance,
  pendingPayout
}: any): JSX.Element {
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
          <Statistic title="ROI" prefix="$" value={roi.toFixed(2)} />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic title="Purchased" prefix="$" value={totalBonded.toFixed(2)} />
        </Col>
        <Col className="gutter-row" span={4}>
          <Statistic.Countdown title="Vesting Term" value={0} />
        </Col>
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={24}>
          <BondCurrencyInput bondTokens={bondTokens} userBalance={userBalance} pendingPayout={pendingPayout} />
        </Col>
        {/*<Col className="gutter-row" span={4}>*/}
        {/*  <Button color={'#8B74BD'} type={'primary'} size={'large'} style={{ justifySelf: 'flex-end' }} block>*/}
        {/*    Mint*/}
        {/*  </Button>*/}
        {/*</Col>*/}
      </Row>
    </>
  )
}

export default function BondCard() {
  const [activeTabKey, setActiveTabKey]: any = useState('mint')
  const bonds = useBondInfo()

  const handleTabChange = (key: any) => {
    setActiveTabKey(key)
  }

  return (
    <>
      <Card
        bordered
        style={{ width: '100%', background: '#121212', color: 'white', flexDirection: 'row' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<a href="#">Contract</a>}
        onTabChange={(key: any) => handleTabChange(key)}
      >
        {bonds &&
          bonds.map(bond => {
            return (
              <CardItem
                key={bond.displayName}
                displayName={bond.displayName}
                roi={bond.roi}
                price={bond.price}
                terms={bond.terms}
                totalBonded={bond.totalBondedAmount}
                bondTokens={bond.bondToken}
              />
            )
          })}
      </Card>
    </>
  )
}
