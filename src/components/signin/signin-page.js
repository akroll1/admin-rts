import { useState, useEffect } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { SignUpForm } from './signup-form'
import { SignInForm } from './signin-form'
import { SubmitNewPasswordForm } from './submit-new-password-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { ForcedPasswordChange } from './forced-password-change'
import { WaitingForCodeForm } from './waiting-for-code-form'
import { useGlobalStore } from '../../stores'
import { signinResets } from './resets'

export const SignInPage = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    code: ''
  });

  const [formState, setFormState] = useState({
    ...signinResets
  })

  const { 
    authenticateUser,
    forgotPassword,
    isSubmitting,
  } = useGlobalStore();

  useEffect(() => {
    setFormState({ ...formState, isSignin: true })
  },[])

  const handleFormChange = e => {
    const { id, value } = e.currentTarget;
    setForm({...form, [id]: value.trim() });
  };
  
  const handleSignIn = () => {
    const { password, username} = form;
    authenticateUser(username, password)
  }
  const handleSignUp = e => {
    setFormState({ ...signinResets, isWaitingForCode: true })

  };
  const handleForcePWChange = () => {
    // stay on signin.
  }
  const handleConfirmCode = e => {
    console.log('confirm code')
  };

  const resendVerificationCode = () => {
    console.log('resend verification code')
  };

  const handleForgotPassword = e => {
    console.log('forgot password')
    // Do the forgot password things here.
    forgotPassword(form?.username)
    setFormState({ ...signinResets, isWaitingForCode: true })
  }
  const handleSubmitNewPassword = e => {
    console.log('submit new password')
  };
  
  return (
    <Box bg={useColorModeValue('gray.500', 'inherit')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">

        {formState.isSignin &&
          <SignInForm 
            form={form} 
            formState={formState}
            handleFormChange={handleFormChange} 
            handleSignIn={handleSignIn} 
            isSubmitting={isSubmitting}
            setFormState={setFormState}
          />
        }

        {formState.isForgotPassword &&
          <ForgotPasswordForm
            form={form}
            formState={formState}
            handleForgotPassword={handleForgotPassword}
            handleFormChange={handleFormChange}
            setFormState={setFormState}
          />
        }
        
        {formState.isSignup &&
          <SignUpForm 
            form={form} 
            formState={formState}
            handleFormChange={handleFormChange} 
            handleSignUp={handleSignUp} 
            isSubmitting={isSubmitting} 
            setFormState={setFormState}
          />
        }

        {formState.isWaitingForCode && 
          <WaitingForCodeForm
            form={form}
            handleConfirmCode={handleConfirmCode}
            handleFormChange={handleFormChange}
            resendVerificationCode={resendVerificationCode}
          />
        }

        {formState.isWaitingForNewPasswordCode && 
          <SubmitNewPasswordForm 
            form={form}
            formState={formState}
            handleFormChange={handleFormChange}
            handleSubmitNewPassword={handleSubmitNewPassword}
            resendVerificationCode={resendVerificationCode}
          />
        }
      </Box>
    </Box>
  )
}
