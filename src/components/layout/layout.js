import React from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, Flex, useColorModeValue as mode } from '@chakra-ui/react'

export const Layout = ({ children }) => {
    return (
        <Flex 
            minH="100vh" 
            bg="fsl-body-bg" 
            flexDirection="column" 
            position="relative"
        >  
            <Navbar />
            <Box as="main">{children}</Box>
            <Footer bg={mode('gray.800', 'fsl-body-bg')} />
        </Flex>
    )
}


