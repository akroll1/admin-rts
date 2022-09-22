import React, { useEffect, createRef } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { PasswordField } from './password-field'

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
                Submit
            </Button>
        </Stack>
    )
}
