import React, { useState } from 'react'
import { Button, chakra, HTMLChakraProps, Input, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { FooterHeading } from './footer-heading'
import { isValidEmail } from '../utils'

export const SubscribeForm = (props) => {
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [isError, setIsError] = useState(null)
  const [disableButton, setDisableButton] = useState(false)

  const subscribe = () => {
    setIsSubmitting(true)
    const isValid = isValidEmail(email);
    if(isValid){
      // check if already subscribed... somewhere.
      console.log('Submit email!');
      setDisableButton(true)

      toast({ 
        title: `Thanks for subscribing! ${'\n'} We just sent a verification link to your email.`,
        duration: 5000,
        status: 'success',
        isClosable: true
      })
    }
    if(!isValid){
      setIsError(true)
    }
    setIsSubmitting(false)
  }

  return (
    <chakra.form {...props} onSubmit={(e) => e.preventDefault()} maxW="100%">
      <Stack spacing="2">
        <FooterHeading>Subscribe to our newsletter</FooterHeading>
        <Text>Get the <span style={{fontWeight: 'bold',color: '#FFF'}}>FightSync newsletter</span> delivered directly to your inbox!</Text>
        <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
          <Input
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
            id="email"
            bg={useColorModeValue('white', 'inherit')}
            placeholder="Enter your email"
            type="email"
            required
            focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
            _placeholder={{
              opacity: 1,
              color: useColorModeValue('gray.500', 'whiteAlpha.700'),
            }}
            errorBorderColor='crimson'  
            onError={true}          
          />
          <Button
            disabled={disableButton}
            onClick={subscribe}
            type="submit"
            colorScheme="blue"
            flexShrink={0}
            width={{ base: 'full', md: 'auto' }}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </chakra.form>
  )
}