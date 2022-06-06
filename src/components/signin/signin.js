import React, { useState, useEffect } from 'react'
import { Box, Button, Heading, SimpleGrid, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { DividerWithText, Card, Logo } from '../../chakra'
import { SignUpForm } from './signup-form'
import { SignInForm } from './signin-form'
import { Amplify, Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store'

export const SignIn = props => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    code: ''
  });
  const setUser = useUserStore( state => state.setUser);

  const handleFormChange = e => {
    const { id, value } = e.currentTarget;
    setFormData({...formData, [id]: value.trim() });
  };
  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      }
    })
  },[]);
  
  const handleSignUp = e => {
    e.preventDefault();
    setSubmitting(true);
    const { email, password, username } = formData;
    Auth.signUp({ username, password, attributes: { email } })
      .then((data) => {
        setWaitingForCode(true);
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
        if(err.message.includes('User already exists')){
          alert('User already exists!')
        }
      });
  };
  
  const handleConfirmCode = (e) => {
    e.preventDefault();
    const { email, code, username, password } = formData;
    Auth.confirmSignUp(username, code)
      .then((data) => {
        // console.log(data);
        const { email, code } = data;
        if(data === 'SUCCESS'){
          setWaitingForCode(false);
          setIsSignin(true);
          setFormData({...formData, email, username, password})
        } 
      })
      .catch(err => {
        console.log(err)
      });
  };

  const resendVerificationCode = () => {
    const { username } = formData;
    Auth.resendSignUp(username)
      .then(res => {
        alert('New code sent.')
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSignIn = e => {
    e.preventDefault();
    setSubmitting(true);
    const { username, password } = formData;
    Auth.signIn({
      username,
      password,
    })
    .then((user) => {
      const { attributes } = user;
      setUser({ ...attributes, username });
      sessionStorage.setItem('isLoggedIn',true);
      sessionStorage.setItem('username', username);
      return navigate('/dashboard/scorecards', { username });
    })
    .catch((err) => {
      console.log('handleSignin err: ', err);
      if(err == 'UserNotConfirmedException: User is not confirmed.'){
        alert('Please confirm your account.');
        setWaitingForCode(true);
        setIsSignin(false);
        return;
      }
      alert('Incorrect Username or Password')
    }).finally(() => setSubmitting(false));
  }

  return (
    <Box bg={useColorModeValue('gray.500', 'gray.800')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">
       {isSignin  
        ? <>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Don&apos;t have an account?</Text>
              <Text onClick={() => setIsSignin(false)} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Sign-up now!</Text>
            </Text>
          </>
        : <>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
              Create An Account
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
              <Text as="span">Already have an account?</Text>
              <Text onClick={() => setIsSignin(true)} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Sign-In here!</Text>
            </Text>
          </>  
        }
        <Card>
          {isSignin && <SignInForm submitting={submitting} handleSignIn={handleSignIn} handleFormChange={handleFormChange} formData={formData} />}
          {!isSignin && <SignUpForm submitting={submitting} resendVerificationCode={resendVerificationCode} handleConfirmCode={handleConfirmCode} waitingForCode={waitingForCode} handleSignUp={handleSignUp} setIsSignin={setIsSignin} handleSignIn={handleSignIn} handleFormChange={handleFormChange} formData={formData} />}
         {isSignin && <><DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={2} spacing="3">
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
          </SimpleGrid></>}
        </Card>
      </Box>
    </Box>
  )
}
