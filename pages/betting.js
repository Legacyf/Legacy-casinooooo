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
import useSound from 'use-sound';

import { useEffect, useState } from 'react';
import Router from 'next/router';

import { useAppContext } from '../context/state';

const Betting = ({ wallet, web3, contract, contractAddress, balance, setBalance, clickSoundPlay }) => {
    const [hound, setHound] = useState('');
    const [betAmount, setBetAmount] = useState();
    const [loading, setLoading] = useState(0);
    const [verdict, setVerdict] = useState(0);
    const [raceUrl, setRaceUrl] = useState("");

    const [raceSoundPlay] = useSound('/sound/race_sound.mp3');
    const [winSoundPlay] = useSound('/sound/win_sound.mp3');
    const [loseSoundPlay] = useSound('/sound/lose_sound.mp3');

    const mycontext = useAppContext();

    useEffect(() => {
        if (wallet.length == 0) {
            return Router.push('/');
        }
    }, [wallet]);

    useEffect(() => {
        if (mycontext.isSound == false) return;
        if (loading == 2) {
            raceSoundPlay();
            setTimeout(() => {
                if (verdict == 0) {
                    loseSoundPlay();
                } else {
                    winSoundPlay();
                }
            }, 5000);
        }
    }, [loading])

    const onGreyClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setHound('grey');
    }

    const onOrangeClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setHound('orange');
    }

    const onBetAmountClicked = (amount) => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setBetAmount(amount);
    }

    const onBetClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        if (hound.length == 0) {
            return alert('PLEASE SELECT WHAT YOU LIKE.');
        }
        if (betAmount == undefined) {
            return alert('PLEASE SELECT BET AMOUNT.');
        }

        let randomSeed = Math.floor(Math.random() * Math.floor(1e9));
        let bet = (hound === 'grey' ? 0 : 1);
        let amount = web3.utils.toWei(betAmount.toString());

        //Send bet to the contract and wait for the verdict
        contract.methods.game(bet, randomSeed).send({ from: wallet, value: amount }).on('transactionHash', (hash) => {
            setLoading(1);
            // contract.events.Result({}, async (error, event) => {
            contract.once('Result', {}, async (error, event) => {
                const verdict = event.returnValues.winAmount;
                let index = Math.floor(Math.random() * 100) % 3 + 1;
                if (verdict === '0') {
                    // alert('SORRY, UNFORTUNATELY YOU LOST :(')
                    setVerdict(0);

                    if (hound === 'orange') {
                        let url = "/images/grey_win/grey_win_" + index + ".gif";
                        setRaceUrl(url)
                    } else {
                        let url = "/images/orange_win/orange_win_" + index + ".gif";
                        setRaceUrl(url)
                    }
                } else {
                    // alert('CONGRATULATIONS! YOU WIN! :)')
                    setVerdict(1);

                    if (hound === 'grey') {
                        let url = "/images/grey_win/grey_win_" + index + ".gif";
                        setRaceUrl(url)
                    } else {
                        let url = "/images/orange_win/orange_win_" + index + ".gif";
                        setRaceUrl(url)
                    }
                }

                //Prevent error when user logout, while waiting for the verdict
                if (wallet !== 'undefined' && wallet.length > 0) {
                    let balance = await web3.eth.getBalance(wallet);
                    balance = (Math.round(web3.utils.fromWei(balance) * 1000) / 1000).toFixed(3);
                    setBalance(balance);
                }
                setLoading(2);
            })
        }).on('error', (error) => {
            console.log('Error')
            setLoading(0);
        })
    }

    const onRetryClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setLoading(0);
    }

    const onQuitClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        Router.push('/');
    }

    return (
        <Layout>
            <Container>
                {
                    loading == 1 ? (
                        <div>
                            <div
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                            >
                                <img
                                    src="/images/orange_running.gif"
                                    width={250}
                                    height={250}
                                />
                            </div>
                            <Box display={{ md: 'flex' }}>
                                <Box
                                    flexGrow={1}
                                    textAlign="center"
                                >
                                    <p>Loading the track.. </p>
                                </Box>
                            </Box>
                            <hr />
                            <div
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                            >
                                <img
                                    src="/images/grey_running.gif"
                                    width={250}
                                    height={250}
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
                                Rooting on {hound} hound for {betAmount} eth
                            </Box>
                        </div>
                    ) : (loading == 0 ? (
                        <div>
                            <div
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                            >
                                <img
                                    src="/images/betting_hound.gif"
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
                                Wallet Balance : {balance} ETH
                            </Box>

                            <Box display={{ md: 'flex' }}>
                                <Box
                                    flexGrow={1}
                                    textAlign="center"
                                >
                                    <p>I LIKE </p>
                                </Box>
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme={hound === 'grey' ? 'pink' : 'teal'}
                                    onClick={onGreyClicked}
                                >
                                    GREY HOUND
                                    </Button>
                                <Button
                                    colorScheme={hound === 'orange' ? 'pink' : 'teal'}
                                    style={{ marginLeft: 8 }}
                                    onClick={onOrangeClicked}
                                >
                                    ORANGE HOUND
                                    </Button>
                            </Box>

                            <Box display={{ md: 'flex' }}>
                                <Box
                                    flexGrow={1}
                                    textAlign="center"
                                >
                                    <p>FOR</p>
                                </Box>
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme={betAmount == 0.005 ? 'pink' : 'teal'}
                                    onClick={() => onBetAmountClicked(0.005)}
                                >
                                    0.005 ETH
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 0.01 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(0.01)}
                                >
                                    0.01 ETH
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 0.02 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(0.02)}
                                >
                                    0.02 ETH
                                    </Button>
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme={betAmount == 0.03 ? 'pink' : 'teal'}
                                    onClick={() => onBetAmountClicked(0.03)}
                                >
                                    0.03 ETH
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 0.04 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(0.04)}
                                >
                                    0.04 ETH
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 0.05 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(0.05)}
                                >
                                    0.05 ETH
                                    </Button>
                            </Box>

                            <Box align="center" my={4}>
                                <hr />
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme="teal"
                                    onClick={onBetClicked}
                                >
                                    DOUBLE OR NOTHING
                                    </Button>
                            </Box>
                        </div>

                    ) : (
                            <div>
                                <Section delay={5}>
                                    <Box
                                        borderRadius="lg"
                                        mb={6}
                                        mt={20}
                                        p={3}
                                        textAlign="center"
                                        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                                        css={{ backdropFilter: 'blur(10px)' }}
                                    >
                                        {
                                            verdict ? (
                                                <span style={{ fontSize: 30 }}>Congratulations, you won!</span>
                                            ) : (
                                                    <span style={{ fontSize: 30 }}>Sorry, you lost!</span>
                                                )
                                        }
                                    </Box>
                                </Section>

                                <div
                                    style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                                >
                                    <img
                                        src={raceUrl}
                                        width={500}
                                        height={500}
                                    />
                                </div>

                                <Section delay={4.5}>
                                    <Box align="center" my={4}>
                                        <Button
                                            colorScheme='teal'
                                            onClick={onRetryClicked}
                                        >
                                            Retry
                                    </Button>
                                        <Button
                                            colorScheme='teal'
                                            style={{ marginLeft: 16 }}
                                            onClick={onQuitClicked}
                                        >
                                            Quit
                                    </Button>
                                    </Box>
                                </Section>
                            </div>
                        ))
                }

            </Container>
        </Layout>
    )
}

export default Betting;
export { getServerSideProps } from '../components/chakra'
