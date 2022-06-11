import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { parseEpoch } from '../../utils/utils'
import { ShowsCountdownTimer } from '../timers'

export const ShowsMetadata = ({ displayTime, selectedShow, selectedShowFight }) => {
    const { fightQuickTitle } = selectedShowFight
    const { promoter, location, showTime } = selectedShow;
    return (
        <Flex 
            as="section" 
            w="100%"
            borderRadius="5px" 
            bg="transparent" 
            p="2" 
            flexDir="column" 
            alignItems="center" 
            justifyContent="center"
            textAlign="center"
        >
            <Heading letterSpacing="1px" as="h2" size="xl">{ fightQuickTitle }</Heading>
            <Heading mt="1" p="1" letterSpacing="1px" as="h3" size="md">{ parseEpoch(showTime) }</Heading>
            <Heading p="1" letterSpacing="1px" as="h3" size="sm">{ promoter }</Heading>
            <Heading mb="0" p="1" letterSpacing="1px" as="h3" size="sm">{ location }</Heading>
            { displayTime && <ShowsCountdownTimer showTime={showTime} /> }

        </Flex>
    )
}