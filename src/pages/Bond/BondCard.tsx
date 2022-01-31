import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'antd'
import { useBondInfo } from '../../state/stake/hooks'

/* Tab 1: Mint
 * Your Balance, You will get, Max you can buy, ROI, Debt Ratio, Vesting Term, Minimum Purchase
 *
 * Tab 2: Redeem
 * Pending Rewards, Claimable Rewards, Time until fully vested, ROI, Debt Ration, Vesting Term
 * */

// interface BondCardStatInfo {
//
// }

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

const gridStyle: any = {
  width: '25%',
  textAlign: 'center'
}

// const contentListNoTitle: any = {
//   mint: (
//     <>
//       <Row gutter={[16, 24]}>
//         <Col className="gutter-row" span={24}>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//         </Col>
//       </Row>
//       <Row>
//         <Col className="gutter-row" span={24}>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//         </Col>
//       </Row>
//     </>
//   ),
//   redeem: (
//     <>
//       <Row gutter={[16, 24]}>
//         <Col className="gutter-row" span={24}>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//         </Col>
//       </Row>
//       <Row>
//         <Col className="gutter-row" span={24}>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//           <Card.Grid style={gridStyle}>Content</Card.Grid>
//         </Col>
//       </Row>
//     </>
//   )
// }

function CardItem({ displayName, price, roi, terms }: any): JSX.Element {
  return (
    <>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={24}>
          <Card.Grid style={gridStyle}>{displayName}</Card.Grid>
          <Card.Grid style={gridStyle}>{price?.toFixed(2)}</Card.Grid>
          <Card.Grid style={gridStyle}>{roi?.toFixed(2)}</Card.Grid>
          <Card.Grid style={gridStyle}>{terms.vestingTerm}</Card.Grid>
          <Card.Grid style={gridStyle}>
            <Button type="primary">Primary Button</Button>
          </Card.Grid>
        </Col>
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
        style={{ width: '100%', background: '#121212', color: 'white' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        tabBarExtraContent={<a href="#">More</a>}
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
              />
            )
          })}
        )
      </Card>
    </>
  )
}
