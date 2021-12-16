# React Native Boilerplate for Wallet Crypto Wallet Connect

This project is using:

- [create-react-native-dapp](cawfree/create-react-native-dapp) to bootstrap the project.
- [WalletConnect v1 react-native integration](https://docs.walletconnect.com/1.0/quick-start/dapps/react-native) for authenthication (we use a slightly modiefied version, located in `./src/WalletConnect` to allow to modify the `enable` function of Moralis).
- [react-moralis](https://github.com/MoralisWeb3/react-moralis) for react hooks

Check the corresponding docs for additional information and help.

## Getting started

#### Setup

- Install the expo CLI globally: `npm i -g expo-cli`
- Make sure you've logged into expo-cli.
- Copy this repo
- `cd` into the project
- install dependencies via `yarn install`

#### Start

- Web: `yarn web`
- IOS: `yarn ios`
- Android: `yarn android`

#### Instruction
- Now Metamask linking and trasaction done by QR Model in iOS device
- If you wants to use deeplinking in iOS then comment frontend > Provider.tsx > line no 58
