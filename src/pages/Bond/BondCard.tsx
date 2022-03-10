import React, { useState } from 'react'
import { useBondInfo } from '../../state/stake/hooks'
import { Card, Col, Divider, Row, Typography } from 'antd'
import { generateContentMap, HeaderContent } from './TabContent'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { Token } from '@foxswap/sdk'
import CurrencyLogo from '../../components/CurrencyLogo'

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

function BondCardTitle(currency: any, displayName: any) {
  return (
    <Row justify={'start'} gutter={16}>
      <Col span={3} style={{ alignSelf: 'top' }}>
        {currency instanceof Token ? (
          <CurrencyLogo size={'35px'} currency={currency} />
        ) : (
          <DoubleCurrencyLogo size={35} currency0={currency[0]} currency1={currency[1]} />
        )}
      </Col>
      <Col className="gutter-row" span={3} style={{ alignSelf: 'flex-start' }}>
        <Typography.Text style={{ fontSize: '1.25rem' }}>{displayName}</Typography.Text>
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
              title={BondCardTitle(bond.bondToken, bond.displayName)}
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
