import { useEffect, createRef } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { PasswordField } from './password-field'
import { Card } from '../../chakra'

export const ForcedPasswordChange = ({ 
    formState,
    isForgotPassword,
    handleForcePWChange, 
    handleFormChange, 
    password, 
    username
}) => {
    const inputRef3 = createRef();
    useEffect(() => {
        inputRef3.current.focus();
    },[]);
    return (
        <Box>
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Create New Password
            </Heading>
            <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center" />
            <Card>
                <Stack spacing="6">
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input 
                            value={username} 
                            name="username" 
                            type="text" 
                            onChange={isForgotPassword ? handleFormChange : null}
                        />
                    </FormControl>
                    <PasswordField 
                        ref={inputRef3}
                        formState={formState}
                        handleFormChange={handleFormChange}
                        password={password} 
                    />
                    <Button 
                        id="forced_password_button" 
                        as="a" 
                        onClick={handleForcePWChange} 
                        type="button" 
                        colorScheme="solid" 
                        size="lg" 
                        fontSize="md"
                    >
                        Submit New Password
                    </Button>
                </Stack>
            </Card>
        </Box>
    )
}
