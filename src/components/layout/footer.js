import React from "react";
import { Divider, Box, Stack, StackDivider, useColorModeValue as mode } from '@chakra-ui/react'
import { Logo, Copyright, SocialMediaLinks, LinkGrid, SubscribeForm } from '../../chakra'

export const Footer = () => (
  <Box 
    display={["none", "none", "flex"]}
    boxSizing="border-box"
    as="footer" 
    role="contentinfo" 
    bg={mode('gray.800', 'white.500')} 
    mx="auto" 
    mt="1rem" 
    maxW={["90%","100%"]} 
    py={["0","0","4"]} 
    px={{ base: '4', md: '6', lg:'8' }}
  >
    <Stack spacing="10" maxW="100%" divider={<StackDivider />}>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '10', lg: '28' }}>
        <Box flex="1">
        </Box>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '10', md: '15' }}>
          <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="1" />
          <SubscribeForm width={{ base: 'full', md: 'sm' }} />
        </Stack>
      </Stack>
      <Stack
        direction={{ base: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
)
