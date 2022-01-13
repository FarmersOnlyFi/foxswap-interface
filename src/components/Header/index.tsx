import { TokenAmount } from '@foxswap/sdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { Moon, Sun } from 'react-feather'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { MouseoverTooltip } from '../Tooltip'
import styled from 'styled-components'
import DarkLogo from 'assets/svg/foxswap/foxswap-thickwhite.svg'
import LightLogo from 'assets/svg/foxswap/foxswap-thickblack.svg'
import DarkIcon from 'assets/svg/foxswap/foxswap-circle_06.svg'
import LightIcon from 'assets/svg/foxswap/foxswap-circle_02.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useTokenBalance, useETHBalances } from '../../state/wallet/hooks'
import useGovernanceToken from '../../hooks/useGovernanceToken'
import usePitToken from '../../hooks/usePitToken'
import { CardNoise } from '../earn/styled'
import { ExternalLink, TYPE } from '../../theme'
import Menu from '../Menu'
import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import GovTokenBalanceContent from './GovTokenBalanceContent'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
// import { BASE_CURRENCY } from '../../connectors'
import { PIT_SETTINGS } from '../../constants'
import useAddTokenToMetamask from '../../hooks/useAddTokenToMetamask'
import usePitRatio from '../../hooks/usePitRatio'
import useBUSDPrice from '../../hooks/useBUSDPrice'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 1rem 0 1rem;
  z-index: 2;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};
  background: ${({ theme }) => theme.bg1};
  border-radius: 12px;
  margin: 30px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToLarge`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  ${({ theme }) => theme.mediaWidth.upToLarge`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
  padding: 0.68rem;
`

const LogoImage = styled('img')`
  width: 100px;
  height: 100px;
  padding: 0.75rem;
  cursor: pointer;
`

const LogoIcon = styled('img')`
  width: 40px;
  height: 40px;
  margin: 8px;
  cursor: pointer;
  box-shadow: 0 0 2px ${({ theme }) => theme.bg1};
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 50%;
  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => darken(0.05, theme.primary1)};
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    ${({ theme }) => theme.tokenButtonGradientStart} 0%,
    ${({ theme }) => theme.tokenButtonGradientEnd} 100%
  );
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  padding: .65rem;
  margin-left: 20px;
  border-radius: 15px;
  &:hover {
    color: ${({ theme }) => theme.primary1}
    // box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
  }

  &:focus {
    color: ${({ theme }) => darken(0.1, theme.primary1)}
  }
  
  &:active {
    color: ${({ theme }) => darken(0.1, theme.primary1)}
    transform: translateY(0.1rem)
  }
`

const TokenSelectionWrapper = styled.div`
  padding: 0.75rem;
`

const StyledRedirectLink = styled(ExternalLink)`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  padding: .65rem;
  margin-left: 20px;
  border-radius: 15px;
  font-weight: normal;
  &:hover {
    color: ${({ theme }) => theme.primary1}
    text-decoration: none;
  }

  &:focus {
    color: ${({ theme }) => darken(0.1, theme.primary1)}
    text-decoration: none;
  }

  &:active {
    color: ${({ theme }) => darken(0.1, theme.primary1)}
    transform: translateY(0.1rem);
    text-decoration: none;
  }
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)

  const govToken = useGovernanceToken()
  const pitToken = usePitToken()
  const pitRatio = usePitRatio()
  const govTokenPrice = useBUSDPrice(govToken)
  const addGov = useAddTokenToMetamask(govToken)
  const addPit = useAddTokenToMetamask(pitToken)
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const userFoxBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  const toggleClaimModal = useToggleSelfClaimModal()
  const availableClaim: boolean = useUserHasAvailableClaim(account)
  const showClaimPopup = useShowClaimPopup()

  return (
    <HeaderFrame>
      <ClaimModal />
      <HeaderRow gap={'lg'}>
        <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
          <GovTokenBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
        </Modal>
        {darkMode ? (
          <LogoImage src={DarkLogo} onClick={() => setShowUniBalanceModal(true)} alt="logo" />
        ) : (
          <LogoImage src={LightLogo} onClick={() => setShowUniBalanceModal(true)} alt="logo" />
        )}
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            {t('swap')}
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            {t('pool')}
          </StyledNavLink>
          <StyledNavLink id={`pit-nav-link`} to={`${pitSettings?.path}`}>
            {pitSettings?.name}
          </StyledNavLink>
          <StyledNavLink id={`bond-nav-link`} to={'/bond'}>
            {t('Bond')}
          </StyledNavLink>
          <StyledRedirectLink href={`https://app.farmersonly.fi/vaults`}>{t('Vaults')}</StyledRedirectLink>
          <StyledRedirectLink href={`https://app.farmersonly.fi/zap`}>{t('Zapper')}</StyledRedirectLink>
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <TokenSelectionWrapper>
            <HeaderElementWrap>
              <MouseoverTooltip text={`Add FOX ($${govTokenPrice?.toFixed(2)}) to MetaMask`}>
                <LogoIcon src={DarkIcon} onClick={addGov.addToken} alt="logo" />
              </MouseoverTooltip>
              <MouseoverTooltip text={`Add xFOX to MetaMask. (1 FOX = ${pitRatio?.toSignificant(4)} xFOX)`}>
                <LogoIcon src={LightIcon} onClick={addPit.addToken} alt="logo" />
              </MouseoverTooltip>
            </HeaderElementWrap>
          </TokenSelectionWrapper>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? (
                    <Dots>Claiming {govToken?.symbol}</Dots>
                  ) : (
                    `Claim ${govToken?.symbol}`
                  )}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userFoxBalance && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userFoxBalance?.toSignificant(4)} {govToken?.symbol} | {userEthBalance?.toSignificant(4)} ONE
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <StyledMenuButton onClick={() => toggleDarkMode()}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton>
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
