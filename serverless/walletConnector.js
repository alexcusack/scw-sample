import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import FormAndQRComponent from './FormComponent'

const APP_NAME = 'Bodega'
const APP_LOGO_URL = 'https://www.creativefabrica.com/wp-content/uploads/2022/04/17/Pizza-Logo-Design-Graphics-29132095-1-1-580x387.jpg'
const DEFAULT_ETH_JSONRPC_URL = "https://sepolia.base.org/"
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
  const amountInWei = (amount * 1e6).toString(); // USDC has 6 decimals

  const txParams = {
    from: sender,
    to: usdcContractAddress, // USDC contract address
    value: '0x0',
    data: '0xa9059cbb' + 
          recipient.substring(2).padStart(64, '0') + 
          parseInt(amountInWei).toString(16).padStart(64, '0'),
    gas: '0x7d3c' // Gas limit, you might need to adjust this
  };

  console.log(txParams)
  try {
    const txHash = await Provider.request({
      method: 'eth_sendTransaction',
      params: [txParams]
    });

    console.log('Transaction successful', txHash);
  } catch (error) {
    console.error('Transaction failed', error);
  }
}
