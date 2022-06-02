import React, { useEffect, createRef } from 'react'
import { chakra, Button, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { PasswordField } from './password-field'

export const SignUpForm = ({ resendVerificationCode, handleConfirmCode, waitingForCode, handleSignUp, handleFormChange, formData }) => {
  const inputRef = createRef();
  const { username, email, password, code } = formData;

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  return (
    <chakra.form onSubmit={e => e.preventDefault()}>
      {waitingForCode
      ? <Stack spacing="6">
          <FormControl id="code">
            <FormLabel>Code</FormLabel>
            <Input onChange={handleFormChange} value={code} name="code" type="text" required />
          </FormControl>
          <Button _hover={{cursor: 'pointer'}} as="a" onClick={handleConfirmCode} type="button" colorScheme="blue" size="lg" fontSize="md">
            Verify Code
          </Button>
          <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Text as="span">Didn&apos;t receive a code?</Text>
            <Text onClick={resendVerificationCode} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Resend code!</Text>
          </Text>
        </Stack>
      : <Stack spacing="6">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input ref={inputRef} onChange={handleFormChange} value={username} name="username" type="text" required />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input onChange={handleFormChange} value={email} name="email" type="email" autoComplete="email" required />
          </FormControl>
          <PasswordField password={password} handleFormChange={handleFormChange} />
          <Button _hover={{cursor: 'pointer'}} as="a" onClick={handleSignUp} type="button" colorScheme="blue" size="lg" fontSize="md">
            Sign-Up
          </Button>
        </Stack>
      }
    </chakra.form>
  )
}
