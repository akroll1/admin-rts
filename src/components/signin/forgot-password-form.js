import { useEffect, createRef } from 'react'
import { 
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
    Heading, 
    Input, 
    Stack,
    Text,
} from '@chakra-ui/react'
import { PasswordField } from './password-field'
import { Card } from '../../chakra'
import { FormHeading } from './form-heading'

export const ForgotPasswordForm = ({ 
    handleForgotPassword,
    handleFormChange, 
    setFormState,
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
            <FormHeading
                buttonLabel="Sign-up now!"
                headingLabel="Request Recovery Code"
                label="Don't have an account?"
                setFormState={setFormState}
                renderForm="isSignup"
            />
       
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
                        as="a" 
                        onClick={handleForgotPassword} 
                        type="button" 
                        colorScheme="solid" 
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
