import {
    Flex,
} from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'   

export const SharedOutlet = () => {
    return (
        <Flex 
            flexDirection="column" 
            position="relative"
            maxW="1200px"
            w="100%"
            bg="#171717" 
            mx="auto"
        >  
            <Outlet />
        </Flex>
    )
}