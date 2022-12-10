import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import { AppWrapper } from '../context/state';

import { useState, useEffect } from 'react';
import useSound from 'use-sound';

// import clickSound from '../sound/click.mp3';

import Web3 from 'web3'
import "../styles/main.css";

const MAIN_CHAIN_ID = 1;
const web3 = new Web3(Web3.givenProvider);
// const web3Provider = new Web3.providers.HttpProvider("https://rpc.ankr.com/eth");
// const web3 = new Web3(web3Provider);

const contractAddress = '0xee033852496e2810a04F2327b4c21D70516F40e1';
const contract_abi = [{ "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "bet", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "randomSeed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "winAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "randomResult", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "Result", "type": "event" }, { "inputs": [], "name": "MAX_DEPOSIT_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MIN_DEPOSIT_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "addManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminWallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "changeAdminWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seed", "type": "uint256" }], "name": "game", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "gameId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "games", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seed", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "winAmount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address payable", "name": "player", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "initManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "managers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "removeManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const contract = new web3.eth.Contract(contract_abi, contractAddress);

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);
  const [games, setGames] = useState([]);
  const [clickSoundPlay] = useSound('/sound/button.mp3');

  useEffect(() => {
    async function init() {
      await getCurrentWalletConnected();
      addWalletListener();
    }
    init();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          let balance = await web3.eth.getBalance(accounts[0]);
          balance = (Math.round(web3.utils.fromWei(balance) * 1000) / 1000).toFixed(3);
          setBalance(balance);
        } else {
          setWallet("");
          setBalance(0);
        }
      });

      window.ethereum.on("chainChanged", async (_chainId) => {
        if (_chainId != MAIN_CHAIN_ID) {
          setWallet("");
          setBalance(0);
        }
      });
    } else {
      setWallet("");
      setBalance(0);
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId"
      });

      if (chainId != MAIN_CHAIN_ID) {
        alert("Please switch to Ethereum network!");
        setWallet("");
        setBalance(0);
        return;
      }

      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(addressArray[0]);
        let balance = await web3.eth.getBalance(addressArray[0]);
        balance = (Math.round(web3.utils.fromWei(balance) * 1000) / 1000).toFixed(3);
        setBalance(balance);
      } catch (err) {
        setWallet("");
        setBalance(0);
      }
    } else {
      setWallet("");
      setBalance(0);
    }
  };

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId"
        });

        if (chainId != MAIN_CHAIN_ID) {
          setWallet("");
          setBalance(0);
          return;
        }

        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          setWallet(addressArray[0]);
          let balance = await web3.eth.getBalance(addressArray[0]);
          balance = (Math.round(web3.utils.fromWei(balance) * 1000) / 1000).toFixed(3);
          setBalance(balance);
        } else {
          setWallet("");
          setBalance(0);
        }
      } catch (err) {
        setWallet("");
        setBalance(0);
      }
    } else {
      setWallet("");
      setBalance(0);
    }
  };

  return (
    <AppWrapper>
      <Chakra cookies={pageProps.cookies}>
        <Fonts />
        <Layout router={router} wallet={wallet}>
          <AnimatePresence
            exitBeforeEnter
            initial={true}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0 })
              }
            }}
          >
            <Component
              {...pageProps}
              key={router.route}
              wallet={wallet}
              connectWallet={connectWallet}
              web3={web3}
              contract={contract}
              contractAddress={contractAddress}
              balance={balance}
              setBalance={setBalance}
              games={games}
              setGames={setGames}
              contract={contract}
              clickSoundPlay={clickSoundPlay}
            />
          </AnimatePresence>
        </Layout>
      </Chakra>
    </AppWrapper>
  )
}

export default Website
