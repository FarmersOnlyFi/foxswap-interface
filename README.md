# FoxSwap Interface

[![Lint](https://github.com/Uniswap/uniswap-interface/workflows/Lint/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/Uniswap/uniswap-interface/workflows/Tests/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Uniswap -- a protocol for decentralized exchange of Ethereum tokens.

- Swap: [foxswap.one](https://foxswap.one)
- Main: [app.farmersonly.fi](https://app.farmersonly.fi)
- Docs: [docs.farmersonly.fi](https://docs.farmersonly.fi)
- Twitter: [@FarmersOnlyFi](https://twitter.com/FarmersOnlyFi)
- Reddit: [/r/farmersonlyfi](https://www.reddit.com/r/farmersonlyfi)
- Email: [vegan@farmersonly.fi](mailto:vegan@farmersonly.fi)
- Discord: [FarmersOnlyFi](https://discord.gg/9dB8NjRR9V)
- Whitepaper: [Link](https://docs.farmersonly.fi)

## Accessing the FoxSwap Interface

To access the FoxSwap Interface, use an IPFS gateway link from the
[latest release](https://github.com/FarmersOnlyFi/foxswap-interface/releases/latest), 
or visit [foxswap.one](https://app.farmersonly.fi).

## Listing a token

Please see the
[@foxswap/default-token-list](https://github.com/FarmersOnlyFi/default-token-list) 
repository.

### Install Dependencies

```bash
yarn
``` 

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Uniswap V2](https://uniswap.org/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `main` branch.** 
CI checks will run against all PRs.

