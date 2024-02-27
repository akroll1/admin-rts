import { useEffect, createRef } from 'react'
import { 
  Box, 
  Button, 
  FormControl, 
  FormErrorMessage,
  FormLabel,  
  Input, 
  SimpleGrid, 
  Stack, 
  VisuallyHidden 
} from '@chakra-ui/react'
import { Card, DividerWithText } from '../../chakra'
import { PasswordField } from './password-field'
import { FaFacebook } from 'react-icons/fa'
import { FaGoogle } from "react-icons/fa6";
import { FormHeading } from './form-heading'
import { useNavigate } from 'react-router'

export const SignInForm = ({ 
  federateGoogleUser,
  form,
  formState, 
  handleFormChange, 
  handleSignIn, 
  isSubmitting,
  setFormState,
  isError,
}) => {
  
  const navigate = useNavigate(); 

  const inputRef = createRef();
  
  useEffect(() => {
    inputRef.current.focus();
  },[]);  

  const handleHostedUI = () => {
    window.location.href = 'https://fsl-admins.auth.us-east-1.amazoncognito.com/authorize?response_type=token&client_id=4ue3ppcjpdrqtpgj29mnb659ev&redirect_uri=http://localhost:8090/auth';
  }
  
  return (
    <Box>
      <FormHeading
        buttonLabel="Sign-up now!"
        headingLabel="Sign in to your account"
        label="Don&apos;t have an account?"
        setFormState={setFormState}
        renderForm="isSignup"
      />
      <Card>
        <Stack spacing="6">
          <FormControl id="username" isInvalid={isError}>
            <FormLabel>Username</FormLabel>
            <Input 
              ref={inputRef} 
              onChange={handleFormChange} 
              value={form?.username} 
              name="username" 
              type="text" 
              required 
            />
          </FormControl>
          <PasswordField 
            formState={formState}
            handleFormChange={handleFormChange} 
            setFormState={setFormState}
            isError={isError}
          />
          <Button 
            isLoading={isSubmitting}
            loadingText="...Submitting" 
            id="signin_button" 
            onClick={handleHostedUI} 
            type="button" 
            colorScheme="solid" 
            size="lg" 
            fontSize="md"
          >
            Sign-in
          </Button>
        </Stack>
        <DividerWithText mt="6">or continue with</DividerWithText>
        <SimpleGrid mt="6" columns={2} spacing="3">
          <Button disabled color="currentColor" variant="outline">
            <VisuallyHidden>Login with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button 
            color="currentColor" 
            variant="outline"
            onClick={() => federateGoogleUser()}
          >
            <VisuallyHidden>Login with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  )
}