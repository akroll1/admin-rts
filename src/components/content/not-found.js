import React from 'react'
import { Box, Link, Center, Heading } from "@chakra-ui/react"

export const NotFound = () => {
    return (
        <Box flexDirection="column" px={{base: '4', md: '10'}} p="8" py="16" m="12" ml="20" justifyContent="flex-start">
            <Center>
                <Heading px="4" mb="8" as="h1" size="4xl">404</Heading>
            </Center>
            <Center flexDirection="column">
                <Heading mb="12" as="h2" size="2xl">WTF?! This page does not exist.</Heading>
                <Heading mb="4" as="h3" size="sm">This might be our fault...</Heading>
                {/* <Heading mb="4" as="h3" size="md">But it could be your fault, too...</Heading>
                <Heading mb="4" as="h4" size="sm">But let's not point fingers here.</Heading> */}
                <Link fontSize="48" mt="1" px="4" mb="8" href="/">&#8592;&nbsp; Just take me home!</Link>
            </Center>
        </Box>
    )
}
