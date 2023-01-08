import { useEffect, createRef } from 'react'
import { 
  Box, 
  chakra, 
  Button, 
  Flex,
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  Stack, 
  Text 
} from '@chakra-ui/react'
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
  const inputRef2 = createRef();
  const { username, email, password, code } = form;

  useEffect(() => {
    inputRef2.current.focus();
  },[]);

  return (
    <Box>
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Create An Account
      </Heading>
      <Flex 
        flexDir="row"
        m="auto"
        w="100%"
        justifyContent="center"
        alignItems="center"
        mb="6"
      >
        <Text
          color="#cacaca"
        >Already have an account?</Text>
        <Text 
          onClick={() => setFormState({ ...formState, isSignin: true, isSignup: false })} 
          _hover={{
            cursor: 'pointer',
            color: 'white'
          }} 
          ml="2" 
          color="#fafafa"
        >
          Sign-In here!
        </Text>
      </Flex>

      <Card>
        <chakra.form onSubmit={e => e.preventDefault()}>
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
              password={password} 
              renderForgotPasswordForm={renderForgotPasswordForm}
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
        </chakra.form>
      </Card>
    </Box>  
  )
}
