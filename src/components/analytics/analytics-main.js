import React from 'react'
import { Flex, useColorModeValue as mode} from '@chakra-ui/react'
import { StatsHeader } from '../analytics'


export const AnalyticsMain = () => {
        
    return (
        <Flex 
            position="relative"
            flexDirection="row"
            w="100%"
            as="section"
            id="analytics_main"
            p="4"
            pb="1"
            flex="1 0 65%" 
            bg={mode('gray.900', 'white.500')} 
            boxSizing="border-box" 
        >
            <StatsHeader />
        </Flex>
    )
}