import { useEffect } from 'react'
import { 
    Box, 
    useToast, 
} from '@chakra-ui/react'
import { Footer } from './footer'
import { 
    SignInModal,
} from '../modals'
import { useGlobalStore } from '../../stores/index'
import { Outlet } from 'react-router-dom'
import { LayoutWrapper } from './layout-wrapper'
import { Navbar } from './navbar'

export const UnAuthLayout = ({ children }) => {

    const toaster = useToast()

    const { 
        toast,
    } = useGlobalStore()
    
    useEffect(() => {
        if(toast?.title){
            toaster({
                title: toast.title,
                description: toast.description,
                status: toast.status,
            })
        }
    },[toast])

    return (
        <LayoutWrapper
            id="unauth_layout"
        >  
            <Navbar />
            <SignInModal />
            <Box 
                mx="auto"
                minW="100%"
                mt={["4rem"]}
                pt="2"
                as="main"
            >
                {/* { children } */}
                <Outlet />
            </Box>
            <Footer />
        </LayoutWrapper>
    )
}