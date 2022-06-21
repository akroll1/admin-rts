import React from 'react'
import { Button, chakra, HTMLChakraProps, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import {FooterHeading} from './footer-heading'

export const SubscribeForm = (props) => {
  return (
    <chakra.form {...props} onSubmit={(e) => e.preventDefault()} maxW="100%">
      <Stack spacing="2">
        <FooterHeading>Subscribe to our newsletter</FooterHeading>
        <Text>Get the <span style={{fontWeight: 'bold',color: '#FFF'}}>FightCloud newsletter</span> delivered directly to your inbox!</Text>
        <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
          <Input
            bg={useColorModeValue('white', 'inherit')}
            placeholder="Enter your email"
            type="email"
            required
            focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
            _placeholder={{
              opacity: 1,
              color: useColorModeValue('gray.500', 'whiteAlpha.700'),
            }}
          />
          <Button
            onClick={() => console.log('subscribe-form, line 24')}
            type="submit"
            colorScheme="blue"
            flexShrink={0}
            width={{ base: 'full', md: 'auto' }}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </chakra.form>
  )
}