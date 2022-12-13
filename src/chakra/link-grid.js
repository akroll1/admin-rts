import { Link, Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { FooterHeading } from './footer-heading'
import { NavLink as RRLink } from 'react-router-dom'

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="110px">
      <FooterHeading mb="4">Product</FooterHeading>
      <Stack>
        <Link as={RRLink} to='/about'>About</Link>
        <Link as={RRLink} to='#'>Fighters</Link>
        <Link as={RRLink} to='#'>API</Link>
      </Stack>
    </Box>
    <Box minW="110px">
      <FooterHeading mb="4">Legal</FooterHeading>
      <Stack>
        <Link as={RRLink} to='#'>Privacy</Link>
        <Link as={RRLink} to='#'>Terms</Link>
        <Link as={RRLink} to='#'>License</Link>
      </Stack>
    </Box>
  </SimpleGrid>
)
