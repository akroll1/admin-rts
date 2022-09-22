import React, { useEffect, createRef } from 'react'
import { Box, chakra, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { PasswordField } from './password-field'
import { Card } from '../../chakra'

export const SignUpForm = ({ 
  form,
  formState, 
  handleFormChange, 
  handleSignUp, 
  isSubmitting,
  renderForgotPasswordForm,
  setFormState
}) => {
  const inputRef = createRef();
  const { username, email, password, code } = form;

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  return (
    <Box>
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Create An Account
      </Heading>
      <Text 
        mt="4" 
        mb="8" 
        align="center" 
        textAlign="center" 
        maxW="md" 
        fontWeight="medium" 
        display="flex" 
        flexDirection={["column", "row" ]}
        alignItems="center" 
        justifyContent="center"
      >
        <Text as="span">Already have an account?</Text>
        <Text 
          onClick={() => setFormState({ ...formState, isSignup: false, isSignin: true })} 
          _hover={{cursor: 'pointer'}} 
          style={{marginLeft: '0.5rem', color: '#90cdf4'}}
        >
          Sign-In here!
        </Text>
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
      </Card>
    </Box>  
  )
}
