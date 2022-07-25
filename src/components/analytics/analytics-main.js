import React, { useState, useEffect } from 'react'
import { Flex, Heading, useColorModeValue as mode} from '@chakra-ui/react'
import { StatsHeader } from '../analytics'
import { AnalyticsGuestJudgeTable } from '../tables/analytics-guest-judge-table'
import { stateStore } from '../../stores'

export const AnalyticsMain = () => {
    const selectedAnalyticsShow = stateStore( state => state.selectedAnalyticsShow )
    const { fight, guestJudges } = selectedAnalyticsShow?.fight ? selectedAnalyticsShow : '';
    const [judges, setGuestJudges] = useState([]);

    useEffect(() => {
        setGuestJudges(guestJudges)
    },[guestJudges]);
    
    return (
        <Flex 
            flexDirection="column"
            position="relative"
            w="100%"
            as="section"
            id="analytics_main"
            p="4"
            pb="1"
            flex="1 0 60%" 
            bg={mode('gray.900', 'white.500')} 
            boxSizing="border-box" 
        >
            <Heading textAlign="center" as="h1" size="lg">{ fight?.fightQuickTitle ? fight.fightQuickTitle : ''}</Heading>
            <StatsHeader />
            <AnalyticsGuestJudgeTable guestJudges={guestJudges} />
        </Flex>
    )
}