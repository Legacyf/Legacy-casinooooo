import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router, wallet }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Degen Hound Races" />
        <meta name="author" content="Degen Hounds" />
        <meta name="author" content="Degen Hounds" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Degen Hounds" />
        <meta name="og:title" content="Degen Hounds" />
        <meta property="og:type" content="website" />
        <title>Degen Hounds</title>
      </Head>

      <NavBar path={router.asPath} wallet={wallet}/>

      <Container maxW="container.md" pt={14}>

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
