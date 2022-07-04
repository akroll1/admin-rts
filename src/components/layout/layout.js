import React from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box } from '@chakra-ui/react'
import { isLoggedIn } from '../../utils'

export const Layout = props => {
        const { children, isLoggedIn, setIsLoggedIn } = props;
    return (
        <>  
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box as="main">{children}</Box>
            <Footer />
        </>
    )
}


