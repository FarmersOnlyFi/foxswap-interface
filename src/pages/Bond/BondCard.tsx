import React, { useState } from 'react'
import { useBondInfo } from '../../state/stake/hooks'
import { Card, Col, Divider, Row, Typography } from 'antd'
import { generateContentMap, HeaderContent } from './TabContent'
import DoubleCurrencyLogo from '../../components/DoubleLogo'

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

export const TabCard: React.FC<any> = ({ bond }: any) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('mint')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const contentList: any = generateContentMap(bond)
  const onTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const handleExpanse = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <HeaderContent bond={bond} expandCard={handleExpanse} isOpen={isOpen} />
      {isOpen && (
        <>
          <Divider />
          <Card
            style={{ width: '100%', borderRadius: '8px' }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            tabBarExtraContent={
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://explorer.harmony.one/address/${bond.bondAddress}`}
              >
                Contract
              </a>
            }
            onTabChange={key => {
              onTabChange(key)
            }}
          >
            {contentList[activeTabKey]}
          </Card>
        </>
      )}
    </>
  )
}

function BondCardTitle(currency0: any, currency1: any, displayName: any) {
  return (
    <Row justify={'start'} gutter={16}>
      <Col span={3} style={{ alignSelf: 'top' }}>
        <DoubleCurrencyLogo size={35} currency0={currency0} currency1={currency1} />
      </Col>
      <Col className="gutter-row" span={3} style={{ alignSelf: 'flex-start' }}>
        <Typography.Text style={{ fontSize: '1.25rem' }}>{displayName.replace('LP', '')}</Typography.Text>
      </Col>
    </Row>
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
              style={{
                width: '100%',
                background: '#212429',
                color: 'white',
                borderRadius: '8px',
                justifySelf: 'space-around'
              }}
              title={BondCardTitle(bond.bondToken[0], bond.bondToken[1], bond.displayName)}
              headStyle={{
                background: 'linear-gradient(60deg, #bb86fc 0%, #6200ee 100%)',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <TabCard bond={bond} />
            </Card>
          )
        })}
    </>
  )
}
