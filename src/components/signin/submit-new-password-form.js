import React, { useEffect, createRef } from 'react'
import { chakra, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { PasswordField } from './password-field'
import { Card } from '../../chakra'
import { FormHeading } from './form-heading'

export const SubmitNewPasswordForm = ({ 
  form,
  formState,
  handleFormChange,
  handleSubmitNewPassword,
  handleResendConfirmationCode,
  setFormState,
}) => {
  const inputRef = createRef();

  useEffect(() => {
    inputRef.current.focus();
  },[]);

    return (
        <>
            <FormHeading
                buttonLabel="Sign-in here!"
                headingLabel="Create New Password"
                label="Already have an account?"
                setFormState={setFormState}
                renderForm="isSignin"
            />
            <Heading mb="12" textAlign="center" size="xl" fontWeight="extrabold">
                Create New Password
            </Heading>    
            <Card>
                <chakra.form onSubmit={e => e.preventDefault()}>
                    <Stack spacing="6">
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input 
                                ref={inputRef}
                                onChange={handleFormChange} 
                                value={form.username} 
                                name="username" 
                                type="text" 
                                required 
                            />
                        </FormControl>
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
                        <PasswordField 
                            formState={formState}
                            handleFormChange={handleFormChange} 
                            password={form.password}
                            setFormState={setFormState}
                        />
                        <Button 
                            id="request_new_pw_button"
                            as="a" 
                            onClick={handleSubmitNewPassword} 
                            type="button" 
                            colorScheme="solid" 
                            size="lg" 
                            fontSize="md"
                        >
                            Submit New Password
                        </Button>
                        <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <Text as="span">Didn&apos;t receive a code?</Text>
                        <Text onClick={handleResendConfirmationCode} _hover={{cursor: 'pointer'}} style={{marginLeft: '0.5rem', color: '#90cdf4'}}>Resend code!</Text>
                        </Text>
                    </Stack>
                </chakra.form>
            </Card>
        </>
    )
}
