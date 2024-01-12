import React,  { createRef, useEffect } from 'react'
import { Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { Card } from '../../chakra'

export const WaitingForCodeForm = ({
    form, 
    handleConfirmCode,
    handleFormChange,
    handleResendConfirmationCode
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
                        colorScheme="solid" 
                        size="lg" 
                        fontSize="md"
                    >
                        Verify Code
                    </Button>
                    <Text mt="4" mb="8" align="center" textAlign="center" maxW="md" fontWeight="medium" display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <Text as="span">Didn&apos;t receive a code?</Text>
                        <Button 
                            onClick={handleResendConfirmationCode} 
                            variant="link"
                            textDecor="underline"
                            color="blue.300"
                            ml="2"
                            _hover={{
                                color: 'blue.400'
                            }}
                        >
                            Resend code!
                        </Button>
                    </Text>
                </Stack>
            </Card>
        </>
    )
}