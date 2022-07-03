import React from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box } from '@chakra-ui/react'

export const Layout = ({ children }) => (
    <>  
        <Navbar />
        <Box as="main">
            {children}
        </Box>
        <Footer />
    </>
)


