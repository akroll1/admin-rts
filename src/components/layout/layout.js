import React from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, calc, Flex } from '@chakra-ui/react'

export const Layout = ({ children }) => {
    return (
        <Flex flexDirection="column" position="relative">  
            <Navbar />
            <Box as="main">{children}</Box>
            <Footer />
        </Flex>
    )
}


