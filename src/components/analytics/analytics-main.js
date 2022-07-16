import React from 'react'
import { Flex, Heading, useColorModeValue as mode} from '@chakra-ui/react'
import { StatsHeader } from '../analytics'
import { AnalyticsGuestJudgeTable } from '../tables/analytics-guest-judge-table'

export const AnalyticsMain = ({ showData }) => {
    const { fight: { fightQuickTitle }} = showData;
        
    return (
        <Flex 
            flexDirection="column"
            position="relative"
            w="100%"
            as="section"
            id="analytics_main"
            p="4"
            pb="1"
            flex="1 0 65%" 
            bg={mode('gray.900', 'white.500')} 
            boxSizing="border-box" 
        >
            <Heading textAlign="center" as="h1" size="lg">{fightQuickTitle}</Heading>
            <StatsHeader />
            <AnalyticsGuestJudgeTable guestJudges={showData.guestJudges} />
        </Flex>
    )
}