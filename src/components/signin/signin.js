import React, { useState, useEffect } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, SimpleGrid, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
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
        alert(err.message);
        setFormState({ 
          isSignin: false, 
          isSignup: false, 
          isForgotPassword: false, 
          isForcedPasswordChange: false, 
          isWaitingForCode: true,
          isWaitingForNewPasswordCode: false
        })
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
        if(err.code === 'InvalidPasswordException'){
          alert('Password Policy \n Minimum 8 Characters \n 1 Uppercase Letter \n 1 Lowercase letter \n 1 Number \n 1 Special character')
        }
        if(err.message.includes('User already exists')){
          alert(err.message)
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
        if(err.code === 'CodeMismatchException'){
          alert('Invalid verification code.')
        }
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
    setForm({ ...form, password: '' });
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
    setIsSubmitting(true)
    e.preventDefault();
    const { code, password, username } = form;
    Auth.forgotPasswordSubmit( username, code, password )
      .then( res => {
        if(res === 'SUCCESS'){
          handleSignIn(username, password);
        }
      })
      .catch( err => alert(err.message))
      .finally( () => setIsSubmitting(false))
  };

  console.log('formState: ', formState)
  console.log('form: ', form)
  return (
    <Box bg={useColorModeValue('gray.500', 'gray.800')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">

        { formState.isSignin &&
          <SignInForm 
            form={form} 
            formState={formState}
            handleFormChange={handleFormChange} 
            handleSignIn={handleSignIn} 
            isSubmitting={isSubmitting}
            renderForgotPasswordForm={renderForgotPasswordForm} 
            setFormState={setFormState}
          />
        }

        { formState.isSignup &&
          <SignUpForm 
            form={form} 
            formState={formState}
            handleFormChange={handleFormChange} 
            handleSignUp={handleSignUp} 
            isSubmitting={isSubmitting} 
            renderForgotPasswordForm={renderForgotPasswordForm}
            setFormState={setFormState}
          />
        }

        { formState.isForcedPasswordChange && 
          <ForcedPasswordChange 
            formState={formState}
            handleForcePWChange={handleForcePWChange} 
            handleFormChange={handleFormChange} 
            isForgotPassword={formState.isForgotPassword}
            password={form.password} 
            username={form.username}
          /> 
        }

        { formState.isForgotPassword &&
          <ForgotPasswordForm
            form={form}
            formState={formState}
            handleForgotPassword={handleForgotPassword}
            handleFormChange={handleFormChange}
            setFormState={setFormState}
          />
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
          <SubmitNewPasswordForm 
            form={form}
            formState={formState}
            handleFormChange={handleFormChange}
            handleSubmitNewPassword={handleSubmitNewPassword}
            renderForgotPasswordForm={renderForgotPasswordForm}
            resendVerificationCode={resendVerificationCode}
          />
        }
      </Box>
    </Box>
  )
}
