import React from 'react'
import { Link, Box, SimpleGrid, Stack } from '@chakra-ui/react'
import {FooterHeading} from './footer-heading'

export const LinkGrid = (props) => (
  <SimpleGrid columns={2} {...props}>
    <Box minW="130px">
      <FooterHeading mb="4">Product</FooterHeading>
      <Stack>
        <Link href='/about'>About</Link>
        <Link href='#'>API</Link>
        <Link href='#'>Use Cases</Link>
      </Stack>
    </Box>
    <Box minW="130px">
      <FooterHeading mb="4">Legal</FooterHeading>
      <Stack>
        <Link href='#'>Privacy</Link>
        <Link href='#'>Terms</Link>
        <Link href='#'>License</Link>
      </Stack>
    </Box>
  </SimpleGrid>
)
