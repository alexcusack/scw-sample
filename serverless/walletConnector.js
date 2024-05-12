import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import FormAndQRComponent from './FormComponent'
import Web3 from 'web3';


const APP_NAME = 'Guest Checkout'
const APP_LOGO_URL = 'https://www.creativefabrica.com/wp-content/uploads/2022/04/17/Pizza-Logo-Design-Graphics-29132095-1-1-580x387.jpg'
const DEFAULT_ETH_JSONRPC_URL = "https://seplia.base.org"
const DEFAULT_CHAIN_ID = 84532
export const CoinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
  appChainIds: [DEFAULT_CHAIN_ID]
}) 
export const Provider = CoinbaseWallet.makeWeb3Provider(
  { options: 'smartWalletOnly' }
)

export async function ConnectCoinbaseWallet() {
  return Provider.request({ method: 'eth_requestAccounts' })
}


const usdcContractAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; // Base Sepolia
const usdcABI = [
  // Only the transfer function ABI
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "type": "function"
  }
];

export async function SendUSDC(sender, recipient, amount) {
  const web3 = new Web3(Provider);
  const usdcContract = new web3.eth.Contract(usdcABI, usdcContractAddress);
  const amountInWei = web3.utils.toWei(amount.toString(), 'mwei'); // USDC has 6 decimals

  try {
    const tx = await usdcContract.methods.transfer(recipient, amountInWei).send({
      from: sender
    });
    console.log('Transaction successful', tx);
  } catch (error) {
    console.error('Transaction failed', error);
  }
}
