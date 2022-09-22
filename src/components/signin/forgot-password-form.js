import React, { useEffect, createRef } from 'react'
import { Button, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react'
import { PasswordField } from './password-field'
import { Card } from '../../chakra'

export const ForgotPasswordForm = ({ 
    handleForgotPassword,
    handleFormChange, 
    username
}) => {
    const inputRef = createRef();
    useEffect(() => {
        inputRef.current.focus();
    },[]);
    
    const handleForgotPasswordClick = e => {
        if(e.key === 'Enter'){
            document.getElementById('forgot_password_button').click();
        }
    }
    return (
        <>
            <Heading mb="12" textAlign="center" size="xl" fontWeight="extrabold">
                Change Password
            </Heading>
            <Card>
                <Stack spacing="6">
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input 
                            ref={inputRef}
                            value={username} 
                            name="username" 
                            type="text" 
                            onChange={handleFormChange}
                            onKeyDown={handleForgotPasswordClick}
                        />
                    </FormControl>
                    <Button 
                        id="forgot_password_button" 
                        _hover={{cursor: 'pointer'}} 
                        as="a" 
                        onClick={handleForgotPassword} 
                        type="button" 
                        colorScheme="blue" 
                        size="lg" 
                        fontSize="md"
                    >
                        Request Code
                    </Button>
                </Stack>
            </Card>
        </>
    )
}
