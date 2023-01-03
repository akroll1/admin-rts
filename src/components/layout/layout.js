import { useEffect, useState } from 'react'
import { 
    Box, 
    Flex, 
    useColorModeValue as mode,
    useToast,
} from '@chakra-ui/react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { ExpiredTokenModal } from '../modals'
import { useGlobalStore } from '../../stores'
import { GlobalNotification } from '../global-notification.js'

export const Layout = ({ children }) => {
    
    const toaster = useToast()
    const { 
        toast 
    } = useGlobalStore()
    
    useEffect(() => {
        if(toast.title){
            toaster(toast)
        }
    },[toast])

    return (
        <Flex 
            minH="100vh" 
            bg="fsl-body-bg" 
            flexDirection="column" 
            position="relative"
        >  
            <Navbar />
            <ExpiredTokenModal />
            <GlobalNotification />
            <Box 
                mt="2rem"
                pt="4"
                minW="100%" 
                as="main"
            >
                {children}
            </Box>
            <Footer bg={mode('gray.800', 'fsl-body-bg')} />
        </Flex>
    )
}


