import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { WagmiProvider } from 'wagmi';
import FormAndQRComponent from './FormComponent'
import Web3 from 'web3'

const APP_NAME = 'Guest Checkout'
const APP_LOGO_URL = 'https://www.creativefabrica.com/wp-content/uploads/2022/04/17/Pizza-Logo-Design-Graphics-29132095-1-1-580x387.jpg'
const DEFAULT_ETH_JSONRPC_URL = "https://seplia.base.org"
const DEFAULT_CHAIN_ID = 1
export const CoinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
}) 
export const Provider = CoinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)


export async function ConnectCoinbaseWallet() {
  return Provider.request({ method: 'eth_requestAccounts' })
}


