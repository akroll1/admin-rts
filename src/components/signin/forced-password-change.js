import React, { useEffect, createRef } from 'react'
import { Button, chakra, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { PasswordField } from './password-field'

export const ForcedPasswordChange = ({ 
    handleForcePWChange, 
    handleFormChange, 
    password 
}) => {
    const inputRef = createRef();
    useEffect(() => {
        inputRef.current.focus();
    },[]);

    return (
        <Stack spacing="6">
            <PasswordField 
                ref={inputRef}
                password={password} 
                handleFormChange={handleFormChange}
            />
            <Button 
                id="signin_button" 
                _hover={{cursor: 'pointer'}} 
                as="a" 
                onClick={handleForcePWChange} 
                type="button" 
                colorScheme="blue" 
                size="lg" 
                fontSize="md"
            >
                Submit New Password
            </Button>
        </Stack>
    )
}
