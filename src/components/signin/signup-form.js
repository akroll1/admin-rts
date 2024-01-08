import { useEffect, createRef } from 'react'
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
} from '@chakra-ui/react'
import { PasswordField } from './password-field'
import { Card } from '../../chakra'
import { FormHeading } from './form-heading'

export const SignUpForm = ({ 
  form,
  formState, 
  handleFormChange, 
  handleSignUp, 
  isSubmitting,
  handleRenderForgotPWForm,
  setFormState
}) => {
  const inputRef2 = createRef();
  const { username, email, password, code } = form;

  useEffect(() => {
    inputRef2.current.focus();
  },[]);

  return (
    <Box>
      <FormHeading
        buttonLabel="Sign-in here!"
        headingLabel="Create an account"
        label="Already have an account?"
        setFormState={setFormState}
        renderForm="isSignin"
      />

      <Card>
        <Stack spacing="6">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input 
              ref={inputRef2} 
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
            handleRenderForgotPWForm={handleRenderForgotPWForm}
            password={password} 
            setFormState={setFormState}
          />
          <Button 
            id="signup_button" 
            isLoading={isSubmitting}
            loadingText="Submitting..."
            onClick={handleSignUp} 
            type="button" 
            colorScheme="solid" 
            size="lg" 
            fontSize="md"
            // disabled={true}
          >
            Sign-Up
          </Button>
        </Stack>
      </Card>
    </Box>  
  )
}
