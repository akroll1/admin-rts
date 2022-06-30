import React, { useEffect, createRef } from 'react'
import { Button, chakra, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { PasswordField } from './password-field'

export const SignInForm = ({ 
  handleForgotPassword,
  isSubmitting, 
  form, 
  handleFormChange, 
  handleSignIn 
}) => {
  const inputRef = createRef();
  const { username, email } = form;
  
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
        <PasswordField 
          handleFormChange={handleFormChange} 
          handleForgotPassword={handleForgotPassword}  
        />
        <Button 
          isLoading={isSubmitting} 
          loadingText="Submitting" 
          id="signin_button" 
          _hover={{cursor: 'pointer'}} 
          as="a" 
          onClick={() => handleSignIn()} 
          type="button" 
          colorScheme="blue" 
          size="lg" 
          fontSize="md"
        >
          Sign-in
        </Button>
      </Stack>
    </chakra.form>
  )
}