import React from 'react'
import { Box, Link, Center, Heading } from "@chakra-ui/react"

export const NotFound = () => {
    return (
        <Box 
            flexDirection="column" 
            px={['4',]} 
            p="4" 
            py="8" 
            mt="8"
            mx="auto" 
            justifyContent="flex-start"
        >
            <Center>
                <Heading 
                    px="4" 
                    mb="8" 
                    as="h1" 
                    size="4xl"
                >
                    404
                </Heading>
            </Center>
            <Center flexDirection="column">
                <Heading px="4" mx="auto" mb="8" as="h2" size="2xl">WTF?! This page does not exist.</Heading>
                <Heading mb="4" as="h3" size="sm">This might be our fault...</Heading>
                {/* <Heading mb="4" as="h3" size="md">But it could be your fault, too...</Heading>
                <Heading mb="4" as="h4" size="sm">But let's not point fingers here.</Heading> */}
                <Link m="auto" fontSize="48" mt="1" px="4" mb="8" href="/">&#8592;&nbsp; Just take me home!</Link>
            </Center>
        </Box>
    )
}
