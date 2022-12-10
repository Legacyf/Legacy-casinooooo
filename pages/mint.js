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
    Input,
    useColorModeValue,
    chakra,
    InputGroup
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'

import { useEffect, useState } from 'react';
import Router from 'next/router';

import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider);


const dhContractAddr = '0x4c6B663f5Cde91E008014BC3Ea7FfDB48c39fAe4';
const dh_contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_PER_TX_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINT_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_from","type":"uint16"},{"internalType":"uint16","name":"_to","type":"uint16"}],"name":"addAvailableTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAddress","type":"address"}],"name":"addWhiteAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWhiteAddressList","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintNFT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"removeWhiteAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setOnlyWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"whiteAddressList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const dh_contract = new web3.eth.Contract(dh_contract_abi, dhContractAddr);

const Mint = ({ wallet, balance, setBalance }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const [mintPrice, setMintPrice] = useState(0);
    const [totalMinted, setTotalMinted] = useState(0);

    useEffect(() => {
        if (wallet.length == 0) {
            return Router.push('/');
        }
    }, [wallet]);

    useEffect(() => {
        async function init() {
            if (wallet.length == 0) {
                return Router.push('/');
            }
            let minted = await dh_contract.methods.tokensMinted().call();
            setTotalMinted(minted);
            let price = await dh_contract.methods.MINT_PRICE().call();
            console.log(price);
            console.log(web3.utils.fromWei(price));
            setMintPrice(web3.utils.fromWei(price));
        }

        init();
    }, [])

const onMintClicked = async () => {
let gasLimit = 285000;
let totalGasLimit = String(gasLimit * mintAmount);
if (mintAmount > 20) {
return alert("Mint amount can't exceed 20");
}
await dh_contract.methods.mintNFT(mintAmount).send({
gasLimit: String(totalGasLimit),
from: wallet,
to: dhContractAddr,
value: web3.utils.toWei((mintPrice * mintAmount).toString()),
});
let minted = await dh_contract.methods.tokensMinted().call();
setTotalMinted(minted);
}
    

    return (
        <Layout>
            <Container>
                <div>
                    <div
                        style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                    >
                        <img
                            src="/images/mint_page.gif"
                            width={300}
                            height={300}
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
                        Supply: 555
                    </Box>

                    <InputGroup style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <Button
                            colorScheme="teal"
                            style={{ fontSize: 25 }}
                            onClick={() => { setMintAmount(mintAmount + 1) }}
                        >
                            +
                        </Button>

                        <Input style={{ width: 70, marginLeft: 8, textAlign: 'center' }} value={mintAmount} readOnly />

                        <Button
                            colorScheme="teal"
                            style={{ fontSize: 25, marginLeft: 8 }}
                            onClick={() => { setMintAmount(mintAmount > 1 ? mintAmount - 1 : mintAmount) }}
                        >
                            -
                        </Button>
                    </InputGroup>

                    <Box display={{ md: 'flex' }}>
                        <Box
                            flexGrow={1}
                            textAlign="center"
                        >
                            <p>{1000 * mintAmount * mintPrice / 1000} ETH</p>
                        </Box>
                    </Box>

                    <Box align="center" my={4}>
                        <hr />
                    </Box>

                    <Box align="center" my={4}>
                        <Button
                            colorScheme="teal"
                            onClick={onMintClicked}
                        >
                            MINT
                        </Button>
                    </Box>

                    <Section delay={0.1}>
                        <Heading as="h3" variant="section-title">
                            Degen Hound NFT
                        </Heading>
                        <Paragraph>
                            Purchasing a Degen Hound NFT will grant you exclusive equity within
                            the business & earn passive income for every transaction in the game.
                        </Paragraph>
                    </Section>
                </div>

            </Container>
        </Layout>
    )
}

export default Mint;
export { getServerSideProps } from '../components/chakra'
