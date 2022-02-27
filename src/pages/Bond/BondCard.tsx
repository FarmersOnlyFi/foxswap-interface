import React, { useState } from 'react'
import { useBondInfo } from '../../state/stake/hooks'
import { Card, Divider } from 'antd'
import { generateContentMap, HeaderContent } from './TabContent'

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
  const [activeTabKey, setActiveTabKey]: any = useState('mint')
  const contentList: any = generateContentMap(bond)
  const onTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  return (
    <>
      <HeaderContent bond={bond} />
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
                flexDirection: 'row',
                borderRadius: '8px'
              }}
            >
              <TabCard bond={bond} />
            </Card>
          )
        })}
    </>
  )
}
