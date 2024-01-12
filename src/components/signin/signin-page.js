import { useState, useEffect } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { SignUpForm } from './signup-form'
import { SignInForm } from './signin-form'
import { SubmitNewPasswordForm } from './submit-new-password-form'
import { ForgotPasswordForm } from './forgot-password-form'
import { ForcedPasswordChange } from './forced-password-change'
import { WaitingForCodeForm } from './waiting-for-code-form'
import { 
  isValidEmail, 
  signinPageResets,
  useGlobalStore 
} from '../../stores'

export const SignInPage = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    code: ''
  });

  const [formState, setFormState] = useState({
    ...signinPageResets
  })

  const { 
    authenticateUser,
    federateGoogleUser,
    forgotPassword,
    isSubmitting,
    resendConfirmationCode,
    signInErrors,
    signUpUser,
    verifyCode,
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
  const handleSignUpUser = e => {
    if(!isValidEmail(form.email)) {
      // need error messaging.
      console.log('invalid email')
      return;
    }
    if(!form?.username.length > 4 || !form?.username.length < 16 || !form?.username.match(/^[a-zA-Z0-9]+$/)) {
      // need error messaging.
      console.log('invalid username')
      return;
    }
    if(!form?.password.length > 7 || !form?.password.length < 17) {
      // need error messaging.
      console.log('invalid password')
      return;
    }
    signUpUser(form.email, form.password, form.username)
    setFormState({ ...signinPageResets, isWaitingForCode: true })

  };
  const handleForcePWChange = () => {
    // stay on signin.
  }
  const handleConfirmCode = e => {
    verifyCode(form.username, form.code)    
    console.log('confirm code')

  };

  const handleResendConfirmationCode = () => {
    // resendConfirmationCode(form.username)
    console.log('resend verification code')
    resendConfirmationCode('andrewg')
  };

  const handleForgotPassword = e => {
    console.log('forgot password')
    // Do the forgot password things here.
    forgotPassword(form?.username)
    setFormState({ ...signinPageResets, isWaitingForCode: true })
  }
  const handleSubmitNewPassword = e => {
    console.log('submit new password')
  };

  console.log('signinErrors: ', signInErrors)
  return (
    <Box bg={useColorModeValue('gray.500', 'inherit')} py="12" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">

        {formState.isSignin &&
          <SignInForm 
            form={form} 
            formState={formState}
            federateGoogleUser={federateGoogleUser}
            handleFormChange={handleFormChange} 
            handleSignIn={handleSignIn} 
            isSubmitting={isSubmitting}
            setFormState={setFormState}
            isError={signInErrors.USERNAME || signInErrors.PASSWORD}
          />
        }

        {formState.isSignup &&
          <SignUpForm 
            form={form} 
            formState={formState}
            handleFormChange={handleFormChange} 
            handleSignUpUser={handleSignUpUser} 
            isError={signInErrors.USERNAME || signInErrors.PASSWORD || signInErrors.EMAIL}
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

        {formState.isWaitingForCode && 
          <WaitingForCodeForm
            form={form}
            handleConfirmCode={handleConfirmCode}
            handleFormChange={handleFormChange}
            handleResendConfirmationCode={handleResendConfirmationCode}
          />
        }

        {formState.isWaitingForNewPasswordCode && 
          <SubmitNewPasswordForm 
            form={form}
            formState={formState}
            handleFormChange={handleFormChange}
            handleSubmitNewPassword={handleSubmitNewPassword}
            handleResendConfirmationCode={handleResendConfirmationCode}
          />
        }
      </Box>
    </Box>
  )
}
