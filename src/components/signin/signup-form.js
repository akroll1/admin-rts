import React, { useEffect, createRef } from 'react'
import { chakra, Button, FormControl, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { PasswordField } from './password-field'

export const SignUpForm = ({ 
  form,
  formState, 
  handleForgotPassword,
  handleFormChange, 
  handleSignUp, 
  isSubmitting,
  renderForgotPasswordForm
}) => {
  const inputRef = createRef();
  const { username, email, password, code } = form;

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  return (
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
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input 
            onChange={handleFormChange} 
            value={email} name="email" 
            type="email" 
            autoComplete="email" 
            required 
          />
        </FormControl>
        <PasswordField 
          formState={formState}
          handleFormChange={handleFormChange} 
          password={password} 
          renderForgotPasswordForm={renderForgotPasswordForm}
        />
        <Button 
          id="signup_button" 
          isLoading={isSubmitting}
          loadingText="Submitting..."
          _hover={{cursor: 'pointer'}} 
          onClick={handleSignUp} 
          type="button" 
          colorScheme="blue" 
          size="lg" 
          fontSize="md"
        >
          Sign-Up
        </Button>
      </Stack>
    </chakra.form>
  )
}
