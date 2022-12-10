import Logo from './logo'
import Sound from './sound'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Text
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoTwitter, IoLogoDiscord } from 'react-icons/io5'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink href={href} passHref scroll={false}>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = (props) => {
  const { path, wallet } = props

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem
            target="_blank"
            href="https://discord.gg/FAVuXNY3kA"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoDiscord />
            Discord
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://twitter.com/Degen_Hounds"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoTwitter />
            Twitter
          </LinkItem>
          <LinkItem
            target="_blank"
            href="https://opensea.io/"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            Opensea
          </LinkItem>

          <LinkItem
            target="_blank"
            href="https://poly.degenhounds.com/"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            MATIC PLAY
          </LinkItem>

          <Text>
            {wallet.length > 0 ? (
              String(wallet).substring(0, 6) +
              "..." +
              String(wallet).substring(38)
            ) : ''}
          </Text>
        </Stack>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Sound />
        </div>
        <Box flex={1} align="right">
          {/* <Sound /> */}
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem
                  as={Link}
                  href="https://discord.gg/FAVuXNY3kA"
                >
                  Discord
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://twitter.com/Degen_Hounds"
                >
                  Twitter
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://opensea.io/"
                >
                  Opensea
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://poly.degenhounds.com/"
                >
                  MATIC PLAY
                </MenuItem>

                <MenuItem
                  as={Link}
                  href="https://www.craftz.dog/"
                >
                  Source
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
