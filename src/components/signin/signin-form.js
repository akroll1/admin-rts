import React, { useEffect, createRef } from 'react'
import { Box, Button, chakra, FormControl, FormLabel, Heading, Input, SimpleGrid, Stack, Text, VisuallyHidden } from '@chakra-ui/react'
import { Card, DividerWithText } from '../../chakra'
import { PasswordField } from './password-field'
import { FaFacebook, FaGoogle } from 'react-icons/fa'

export const SignInForm = ({ 
  form,
  formState, 
  handleFormChange, 
  handleSignIn, 
  isSubmitting,
  renderForgotPasswordForm,
  setFormState
}) => {
  const inputRef = createRef();
  const { username, email } = form;
  
  useEffect(() => {
    inputRef.current.focus();
  },[]);

  return (
    <Box>
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign in to your account
      </Heading>
      <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <Text as="span">Don&apos;t have an account?</Text>
        <Text onClick={() => setFormState({ ...formState, isSignin: false, isSignup: true })} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#FCFCFC'}}>Sign-up now!</Text>
      </Text>
      <Card>
        <chakra.form onSubmit={e => e.preventDefault()}>
          <Stack spacing="6">
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input 
                ref={inputRef} 
                onChange={handleFormChange} 
                value={username} 
                name="username" 
                type="text" 
                required 
              />
            </FormControl>
            <PasswordField 
              formState={formState}
              handleFormChange={handleFormChange} 
              renderForgotPasswordForm={renderForgotPasswordForm} 
            />
            <Button 
              isLoading={isSubmitting} 
              loadingText="Submitting" 
              id="signin_button" 
              // _hover={{cursor: 'pointer'}} 
              as="a" 
              onClick={handleSignIn} 
              type="button" 
              colorScheme="solid" 
              size="lg" 
              fontSize="md"
            >
              Sign-in
            </Button>
          </Stack>
        </chakra.form>
        <DividerWithText mt="6">or continue with</DividerWithText>
        <SimpleGrid mt="6" columns={2} spacing="3">
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button color="currentColor" variant="outline">
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  )
}