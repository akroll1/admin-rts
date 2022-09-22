import React, { useState, useEffect } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, SimpleGrid, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { DividerWithText, Card, Logo } from '../../chakra'
import { SignUpForm } from './signup-form'
import { SignInForm } from './signin-form'
import { SubmitNewPasswordForm } from './submit-new-password-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { ForcedPasswordChange } from './forced-password-change'
import { Amplify, Auth } from 'aws-amplify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { stateStore } from '../../stores'

export const SignIn = props => {
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');
  const pw = searchParams.get('pw');
  const nonce = searchParams.get('nonce');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    user: {},
    username: '',
    email: '',
    password: '',
    code: ''
  });

  const [formState, setFormState] = useState({
      isSignin: true, 
      isSignup: false, 
      isForgotPassword: false, 
      isForcedPasswordChange: false, 
      isWaitingForCode: false,
      isWaitingForNewPasswordCode: false
  })

  const { setUser, setToken } = stateStore.getState();

  Amplify.configure({
    Auth: {
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    }
  })
  useEffect(() => {
    if(nonce && nonce === 'u49kei4'){
      setForm({ ...form, password: pw, username: name })
      handleSignIn(name, pw)
    }
  }, []);

  const handleFormChange = e => {
    const { id, value } = e.currentTarget;
    setForm({...form, [id]: value.trim() });
  };
  const handleSignIn = (username = form.username, password = form.password) => {
    setIsSubmitting(true);
    Auth.signIn({
      username,
      password
    })
    .then((user) => {
      const { attributes } = user;
      if(user?.challengeName === "NEW_PASSWORD_REQUIRED"){
        setFormState({ 
          isSignin: false, 
          isSignup: false, 
          isForgotPassword: false, 
          isForcedPasswordChange: false, 
          isWaitingForCode: true,
          isWaitingForNewPasswordCode: false
      })
        setForm({ ...form, password: '', user });
      } else {
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'] ? user.signInUserSession.accessToken.payload['cognito:groups'] : [];
        setUser({ ...attributes, username, isLoggedIn: true, groups });
        const token = user.signInUserSession.accessToken.jwtToken;
        setToken({headers: {
          Authorization: `Bearer ${token}`
        }})
        sessionStorage.setItem('isLoggedIn',true);
        return navigate('/scorecards', { username });
      }
    })
    .catch((err) => {
      console.log('handleSignin err: ', err);
      if(err == 'UserNotConfirmedException: User is not confirmed.'){
        alert('Please confirm your account.');
        setFormState({ 
          isSignin: false, 
          isSignup: false, 
          isForgotPassword: false, 
          isForcedPasswordChange: false, 
          isWaitingForCode: true,
          isWaitingForNewPasswordCode: false
      })
        return;
      }
      alert('Incorrect Username or Password')
    }).finally(() => setIsSubmitting(false));
  }
  const handleSignUp = e => {
    e.preventDefault();
    setIsSubmitting(true);
    const { email, password, username } = form;
    Auth.signUp({ username, password, attributes: { email } })
      .then( data => {
        setFormState({ 
          isSignin: false, 
          isSignup: false, 
          isForgotPassword: false, 
          isForcedPasswordChange: false, 
          isWaitingForCode: true,
          isWaitingForNewPasswordCode: false
      })
      })
      .catch((err) => {
        setIsSubmitting(false);
        if(err.message.includes('User already exists')){
          alert('User already exists!')
        }
      }).finally(() => setIsSubmitting(false))
  };
  const handleForcePWChange = () => {
    const { username, password, user, email } = form;
    Auth.completeNewPassword( user, password )
      .then( user => { 
        const { username, challengeParam: {  userAttributes } } = user;
        setUser({ 
          username, 
          ...userAttributes, 
          groups: [], 
          sub: user.signInUserSession.idToken.payload.sub 
        })
        const token = user.signInUserSession.accessToken.jwtToken;
        setToken({headers: {
          Authorization: `Bearer ${token}`
        }})
        sessionStorage.setItem('isLoggedIn',true);
        return navigate('/dashboard/scorecards', { user });
      }).catch( err => {
        console.log('err: ', err);
        if(Array.from(err).includes('InvalidPasswordException') > -1){
          alert('Password does not meet requirements.')
        }
      });
  }
  const handleConfirmCode = e => {
    e.preventDefault();
    const { code, username } = form;
    Auth.confirmSignUp(username, code)
      .then((data) => {
        // console.log(data);
        const { email, code } = data;
        if(data === 'SUCCESS'){
          handleSignIn();
        }
      })
      .catch(err => {
        console.log(err)
        alert('Invalid verification code provided, please try again.')
      });
  };

  const resendVerificationCode = () => {
    const { username } = form;
    Auth.resendSignUp(username)
      .then(res => {
        alert('New code sent.')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const renderForgotPasswordForm = () => {
    setFormState({ 
      isSignin: false, 
      isSignup: false, 
      isForgotPassword: true, 
      isForcedPasswordChange: false, 
      isWaitingForCode: false,
      isWaitingForNewPasswordCode: false
    })
  }
  const handleForgotPassword = e => {
    e.preventDefault();
    const { username } = form;
    setFormState({ 
      isSignin: false, 
      isSignup: false, 
      isForgotPassword: false, 
      isForcedPasswordChange: false, 
      isWaitingForCode: false,
      isWaitingForNewPasswordCode: true
    })
    Auth.forgotPassword( username )
      .then( res => res)
      .catch( err => console.log(err))
  }
  
  const handleSubmitNewPassword = e => {
    e.preventDefault();
    const { code, password, username } = form;
    Auth.forgotPasswordSubmit( username, code, password )
      .then( res => {
        console.log('res: ', res)
        if(res === 'SUCCESS'){
          handleSignIn(username, password);
        }
      })
      .catch( err => console.log('err: ', err));
  };

  console.log('formState: ', formState)
  console.log('form: ', form)
  return (
    <Box bg={useColorModeValue('gray.500', 'gray.800')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">

        { formState.isSignin &&
          <Box>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Sign in to your account
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Don&apos;t have an account?</Text>
              <Text onClick={() => setFormState({ ...formState, isSignin: false, isSignup: true })} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Sign-up now!</Text>
            </Text>
            <Card>
              <SignInForm 
                form={form} 
                formState={formState}
                handleForgotPassword={handleForgotPassword}
                handleFormChange={handleFormChange} 
                handleSignIn={handleSignIn} 
                isSubmitting={isSubmitting}
                renderForgotPasswordForm={renderForgotPasswordForm} 
              />
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
        }

        { formState.isSignup &&
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
              <SignUpForm 
                form={form} 
                formState={formState}
                handleConfirmCode={handleConfirmCode} 
                handleForgotPassword={handleForgotPassword}
                handleFormChange={handleFormChange} 
                handleSignUp={handleSignUp} 
                handleSignIn={handleSignIn} 
                isSubmitting={isSubmitting} 
                resendVerificationCode={resendVerificationCode} 
                renderForgotPasswordForm={renderForgotPasswordForm}
              />
            </Card>
          </Box>  
        }

        { formState.isForcedPasswordChange && 
          <Box>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Create New Password
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center" />
            <Card>
              <ForcedPasswordChange 
                formState={formState}
                handleForcePWChange={handleForcePWChange} 
                handleFormChange={handleFormChange} 
                isForgotPassword={formState.isForgotPassword}
                password={form.password} 
                username={form.username}
              /> 
            </Card>
          </Box>
        }

        { formState.isForgotPassword &&
          <Card>
            <ForgotPasswordForm
              form={form}
              formState={formState}
              handleForgotPassword={handleForgotPassword}
              handleFormChange={handleFormChange}
              setFormState={setFormState}
            />
          </Card>
        }

        { formState.isWaitingForCode && 
          <Stack spacing="6">
            <FormControl id="code">
              <FormLabel>Code</FormLabel>
              <Input 
                onChange={handleFormChange} 
                value={form.code} 
                name="code" 
                type="text" 
                required 
              />
            </FormControl>
            <Button 
              _hover={{cursor: 'pointer'}} 
              as="a" 
              onClick={handleConfirmCode} 
              type="button" 
              colorScheme="blue" 
              size="lg" 
              fontSize="md"
            >
              Verify Code
            </Button>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Didn&apos;t receive a code?</Text>
              <Text onClick={resendVerificationCode} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Resend code!</Text>
            </Text>
          </Stack>
        }

        { formState.isWaitingForNewPasswordCode && 
          <Card>
            <SubmitNewPasswordForm 
              form={form}
              formState={formState}
              handleFormChange={handleFormChange}
              handleSubmitNewPassword={handleSubmitNewPassword}
              renderForgotPasswordForm={renderForgotPasswordForm}
              resendVerificationCode={resendVerificationCode}
            />
          </Card>
        }
      </Box>
    </Box>
  )
}
