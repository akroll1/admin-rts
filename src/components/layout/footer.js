import React from "react";
import { Divider, Box, Stack, StackDivider, useColorModeValue as mode } from '@chakra-ui/react'
import { Logo, Copyright, SocialMediaLinks, LinkGrid, SubscribeForm } from '../../chakra'

export const Footer = () => (
  <>
    <Box 
      as="footer" 
      role="contentinfo" 
      bg={mode('gray.800', 'white.500')} 
      mx="auto" 
      mt="1rem" 
      maxW="7xl" 
      py="4" 
      px={{ base: '4', md: '8' }}
    >
    {/* <Divider my="2" opacity={1} width="90%" m="auto" mb="1" mt="1" /> */}
    <Stack spacing="10" divider={<StackDivider />}>
    {/* <StackDivider /> */}
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '10', lg: '28' }}>
        <Box flex="1">
          <Logo />
        </Box>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '10', md: '20' }}>
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
  </>
)
