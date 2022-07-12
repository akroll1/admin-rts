import React from 'react'
import { Flex, useColorModeValue as mode} from '@chakra-ui/react'

export const AnalyticsMain = () => {
    
    
    return (
        <Flex 
            as="section"
            id="analytics_main"
            p="4"
            pb="1"
            flex="1 0 65%" 
            bg={mode('gray.900', 'white.500')} 
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            boxSizing="border-box" 
        >
            
        </Flex>
    )
}