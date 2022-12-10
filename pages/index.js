import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'

import { useState, useEffect } from 'react';
import Router from 'next/router'
import Web3 from 'web3'

import { useAppContext } from '../context/state';

const MAIN_CHAIN_ID = 1;

const web3Provider = new Web3.providers.HttpProvider("https://eth-mainnet.public.blastapi.io	");
const web3_eth = new Web3(web3Provider);

const contractAddress1 = '0xee033852496e2810a04F2327b4c21D70516F40e1';
const contract_abi1 = [{ "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "bet", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "randomSeed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "winAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "randomResult", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "Result", "type": "event" }, { "inputs": [], "name": "MAX_DEPOSIT_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MIN_DEPOSIT_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "addManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminWallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "changeAdminWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seed", "type": "uint256" }], "name": "game", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "gameId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "games", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seed", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "winAmount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address payable", "name": "player", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "initManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "managers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "removeManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const bet_contract_eth = new web3_eth.eth.Contract(contract_abi1, contractAddress1);

const Home = ({ wallet, connectWallet, games, web3, setGames, contract, clickSoundPlay }) => {
  const mycontext = useAppContext();

  useEffect(() => {
    async function load() {
      if (window.ethereum) {
        // const chainId = await window.ethereum.request({
        //   method: "eth_chainId"
        // });
        // if (chainId != MAIN_CHAIN_ID) return;
        let lastGameId = await bet_contract_eth.methods.gameId().call();
        let len = Math.min(lastGameId, 8);
        let gameArray = [];
        for (let i = 0; i < len; i++) {
          let game = await bet_contract_eth.methods.games(lastGameId - i - 1).call();

          let currentTimeInSeconds = Math.floor(Date.now() / 1000);
          let duration = currentTimeInSeconds - game.time;
          if (duration < 60) {
            game.timeBar = duration.toString() + ' secs ago';
          } else {
            duration = Math.floor(duration / 60);
            if (duration < 60) {
              game.timeBar = duration.toString() + ' mins ago';
            } else {
              game.timeBar = 'hours ago';
            }
          }
          gameArray.push(game);
        }
        setGames(gameArray);
      }
    }

    load();
  }, []);

  const connectWalletClicked = () => {
    if (mycontext.isSound == true) {
      clickSoundPlay();
    }
    connectWallet();
  }

  const playClicked = () => {
    if (mycontext.isSound == true) {
      clickSoundPlay();
    }
    Router.push({
      pathname: '/betting',
    });

  }

  const mintClicked = () => {
    if (mycontext.isSound == true) {
      clickSoundPlay();
    }
    Router.push({
      pathname: '/mint'
    });
  }

  return (
    <Layout>
      <Container>
        {/* <Box
          className='degenhound'
          m="auto"
          at={['-20px', '-60px', '-120px']}
          mb={['-40px', '-140px', '-200px']}
          w={[280, 480, 640]}
          h={[280, 480, 640]}
          position='relative'
          align="center"

        >
          <Image
            src="/images/houndsmoking.gif"
            size="s"
            position="absolute"
            width={450}
            height={450}
          />

        </Box> */}

        <div
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img
            src="/images/houndsmoking1.gif"
            width={450}
            height={450}
          />
        </div>

        <Box
          borderRadius="lg"
          mb={6}
          p={3}
          textAlign="center"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
          Welcome to the Degen Hound Races!
      </Box>
        <Box align="center" my={4}>
          {
            wallet.length === 0 ? (
              <Button
                colorScheme="teal"
                onClick={connectWalletClicked}
              >
                Connect Wallet
            </Button>
            ) : (
                <div>
                  <Button
                    colorScheme="teal"
                    onClick={playClicked}
                  >
                    Play Now
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={mintClicked}
                    style={{ marginLeft: 8 }}
                  >
                    Mint Now
                  </Button>
                </div>
              )
          }
          <Paragraph style={{ marginTop: 15 }}>
            Connect wallet to Mint! {" "}
            <Link href="https://poly.degenhounds.com/" target="_blank">
              Click Here
              </Link>
            {" "} to mint in Polygon (MATIC). Polygon Game available to play, Eth game coming after mint!
          </Paragraph>
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box
            flexGrow={1}
            textAlign="center"
          >
    

            <div
              className={games.length == 0 ? "" : "raceHistory"}
              bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
              css={{ backdropFilter: 'blur(10px)' }}>
              {
                games.map((game, index) => {
                  let addr = (game.player.length > 0 ? (
                    "Wallet (" +
                    String(game.player).substring(38) +
                    ')'
                  ) : '');

                  let amount = web3.utils.fromWei(game.amount);
                  let result = (game.winAmount == '0' ? 'got rugged' : 'doubled');

                  return (
                    <div key={index}>
                      <div className="hisData">
                        <Image
                          src="/images/eth.png"
                          size="s"
                          position="absolute"
                          width={25}
                          height={30}
                        />
                        <span>{addr} sent {amount} and </span>
                        <span>&nbsp;{result}</span>
                      </div>
                      {/* <span>45secs ago</span> */}
                      <span>{game.timeBar}</span>
                    </div>
                    // <p key={index}>{addr} donated {amount} and {result}</p>
                  )
                })
              }
            </div>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            ABOUT US (MINT PASS ONLY)!
          </Heading>
          <Paragraph>
            Degen Hounds is a {" "}
            <Link href="https://etherscan.io/address/0xee033852496e2810a04F2327b4c21D70516F40e1" target="_blank">
              Smart Contract
        </Link>
            {" "}that allows users to play Double or Nothing
            with their Ethereum & Matic tokens. Odds are 50/50 with a 5% fee, 3% of which is distributed to DH NFT
            holders in MATIC. The remaining 2% is given to partners and reserve wallets to support the house balance.
            Degen Hounds is the first ever decentralised NFT Game on Ethereum & MATIC,
             with full transparency as the game contract code can be viewed and verifiable on-chain.
        </Paragraph>


        </Section>
      </Container>
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
