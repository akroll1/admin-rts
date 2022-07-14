import React from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, calc, Flex } from '@chakra-ui/react'

export const Layout = props => {
        const { children, isLoggedIn, setIsLoggedIn } = props;
    return (
        <Flex flexDirection="column" position="relative">  
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box h="90vh" as="main">{children}</Box>
            <Footer />
        </Flex>
    )
}


