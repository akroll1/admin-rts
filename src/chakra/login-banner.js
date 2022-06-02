import React from 'react'
import { BellIcon } from '@chakra-ui/icons'
import { Box, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { LoginBannerLink } from './login-banner-link'

export const LoginBanner = () => (
  <Box as="section" pt="8" pb="12">
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      justifyContent="center"
      alignItems="center"
      py="3"
      px={{ base: '3', md: '6', lg: '8' }} 
      color="white" 
      bg={useColorModeValue('blue.600', 'blue.400')}>
      <HStack spacing="3">
        <Icon as={BellIcon} fontSize="2xl" h="10" />
        <Text fontWeight="medium" marginEnd="2">
           Please login to score this fight.
        </Text>
      </HStack>
      <LoginBannerLink
        w={{ base: 'full', sm: 'auto' }} flexShrink={0}>
        Login
      </LoginBannerLink>
    </Stack>
  </Box>
)