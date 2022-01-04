import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, JSBI, Percent, Token, WETH } from '@foxswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, portis, walletconnect, walletlink } from '../connectors'

import getTokenWithDefault from '../utils/getTokenWithDefault'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000001'
export const BONDING_ADDRESS = '0x0000000000000000000000000000000000000001'
export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'
export const SOCKS_TESTNET_ADDRESS = '0x65770b5283117639760beA3F867b69b3697a91dd'

export const ROUTER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0x4A92aA1D58F1C9AB755Cb6cE1E8669344f39eA0D',
  [ChainId.HARMONY_TESTNET]: '0x3b8D93D0CBEaeB3D00FeFC1FaCf1399333626DFF'
}

export const GOVERNANCE_TOKEN: { [chainId in ChainId]: Token } = {
  [ChainId.HARMONY_MAINNET]: new Token(
    ChainId.HARMONY_MAINNET,
    '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
    18,
    'FOX',
    'FOX Token'
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    '0x106B7F900B6feF3cAeD9d76428067F6377489Fda',
    18,
    'FOX',
    'FOX Token'
  )
}

export const MASTER_BREEDER: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0x15e04418d328c39ba747690f6dae9bbf548cd358',
  [ChainId.HARMONY_TESTNET]: '0xead17730a4a8E115A615D1A328B62f1947B2d8D5'
}

export const PIT_BREEDER: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0x9D28bE93bC69e5E29072E54E48354ab1180c6B98',
  [ChainId.HARMONY_TESTNET]: '0x15e04418d328c39bA747690F6DaE9Bbf548CD358'
}

export const PIT: { [chainId in ChainId]: Token } = {
  [ChainId.HARMONY_MAINNET]: new Token(
    ChainId.HARMONY_MAINNET,
    '0xb6514fE45a4A11Bfd6aD5d6F2eFF745a98207288',
    18,
    'xFOX',
    'FoxDen'
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    '0xc984643a4c06aA0c0e779a80DC9168F1D41c4088',
    18,
    'xFOX',
    'FoxDen'
  )
}

export const PIT_SETTINGS: { [chainId in ChainId]: Record<string, string> } = {
  [ChainId.HARMONY_MAINNET]: { name: 'Den', path: '/den' },
  [ChainId.HARMONY_TESTNET]: { name: 'Den', path: '/den' }
}

export const WEB_INTERFACES: { [chainId in ChainId]: string[] } = {
  [ChainId.HARMONY_MAINNET]: ['swap.farmersonly.fi', 'foxswap.one', 'foxswap.fi'],
  [ChainId.HARMONY_TESTNET]: ['swap.farmersonly.fi', 'foxswap.one', 'foxswap.fi']
}

export { PRELOADED_PROPOSALS } from './proposals'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 2
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

export const FALLBACK_GAS_LIMIT = BigNumber.from(6721900)

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {}

const WETH_ONLY: ChainTokenList = {
  [ChainId.HARMONY_MAINNET]: [WETH[ChainId.HARMONY_MAINNET]],
  [ChainId.HARMONY_TESTNET]: [WETH[ChainId.HARMONY_TESTNET]]
}

export const WONE = WETH_ONLY[ChainId.HARMONY_MAINNET]
export const FOX = getTokenWithDefault(ChainId.HARMONY_MAINNET, 'FOX')
export const UST = getTokenWithDefault(ChainId.HARMONY_MAINNET, 'UST')
export const ETH = getTokenWithDefault(ChainId.HARMONY_MAINNET, '1ETH')
export const MIS = getTokenWithDefault(ChainId.HARMONY_MAINNET, 'MIS')
export const USDC = getTokenWithDefault(ChainId.HARMONY_MAINNET, '1USDC')

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.HARMONY_MAINNET]: [WETH[ChainId.HARMONY_MAINNET], FOX, UST, ETH, MIS, USDC],
  [ChainId.HARMONY_TESTNET]: [
    WETH[ChainId.HARMONY_TESTNET],
    getTokenWithDefault(ChainId.HARMONY_TESTNET, 'FOX'),
    getTokenWithDefault(ChainId.HARMONY_TESTNET, 'UST')
  ]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.HARMONY_MAINNET]: [WETH[ChainId.HARMONY_MAINNET], FOX, UST, MIS],
  [ChainId.HARMONY_TESTNET]: [
    WETH[ChainId.HARMONY_TESTNET],
    getTokenWithDefault(ChainId.HARMONY_TESTNET, 'FOX'),
    getTokenWithDefault(ChainId.HARMONY_TESTNET, 'UST')
  ]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HARMONY_MAINNET]: [FOX, ...WETH_ONLY[ChainId.HARMONY_MAINNET], UST, ETH, MIS, USDC],
  [ChainId.HARMONY_TESTNET]: [
    WETH[ChainId.HARMONY_TESTNET],
    getTokenWithDefault(ChainId.HARMONY_TESTNET, 'FOX'),
    getTokenWithDefault(ChainId.HARMONY_TESTNET, 'UST')
  ]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.HARMONY_MAINNET]: [[USDC, WETH[ChainId.HARMONY_MAINNET]]],
  [ChainId.HARMONY_TESTNET]: [
    [WETH[ChainId.HARMONY_TESTNET], getTokenWithDefault(ChainId.HARMONY_TESTNET, 'FOX')],
    [WETH[ChainId.HARMONY_TESTNET], getTokenWithDefault(ChainId.HARMONY_TESTNET, 'UST')]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]
