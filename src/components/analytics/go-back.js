import React from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'

export const GoBack = () => {
    const navigate = useNavigate();
    return (
        <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
            <Button onClick={() => navigate(-1)} bg="transparent" border="none" leftIcon={<ArrowBackIcon />}>
                Back to All Shows
            </Button>
        </Flex>
    )
}