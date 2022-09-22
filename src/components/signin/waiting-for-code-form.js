import React,  { createRef, useEffect } from 'react'
import { Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { Card } from '../../chakra'

export const WaitingForCode = ({
    form, 
    handleConfirmCode,
    handleFormChange,
    resendVerificationCode
}) => {
    const waitingForCodeRef = createRef();
    useEffect(() => {
        waitingForCodeRef.current.focus();
    },[])
    return (
        <>
        
            <Heading mb="12" textAlign="center" size="xl" fontWeight="extrabold">
                Check Your Email
            </Heading>  
            <Card>
                <Stack spacing="6">
                    <FormControl id="code">
                    <FormLabel>Code</FormLabel>
                    <Input 
                        ref={waitingForCodeRef}
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
            </Card>
        </>
    )
}