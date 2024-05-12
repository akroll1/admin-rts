import {
    Flex,
} from '@chakra-ui/react'

export const LayoutWrapper = ({
    children,
    id,
}) => {    
    return (
        <Flex 
            id="auth-layout"
            w="100%" 
            bg="#171717"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            position="relative"
            minH="100vh"
        >
            <Flex 
                flexDirection="column" 
                position="relative"
                maxW="1280px"
                w="100%"
                bg="#171717" 
                justifyContent="flex-start"
                alignItems="center"
            > 
                {children}
            </Flex>
        </Flex>
    )
}