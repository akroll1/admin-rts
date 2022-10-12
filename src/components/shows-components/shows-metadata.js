import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { parseEpoch } from '../../utils/utils'

export const FightMetadata = ({ fightSummary }) => {
    const { location, promoter, showTime } = fightSummary?.show?.location ? fightSummary.show : '';
    const fightQuickTitle = fightSummary?.fight?.fightQuickTitle ? fightSummary.fight.fightQuickTitle : '';
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
            <Heading letterSpacing="1px" as="h2" size="xl">{ fightQuickTitle ? fightQuickTitle : ''}</Heading>
            <Heading fontWeight="normal" as="h3" size="sm">{ showTime ? parseEpoch(showTime) : ''}</Heading>
            <Heading mt="1" fontWeight="normal" letterSpacing="1px" as="h3" size="xs">{ location ? location : ''}</Heading>
            <Heading p="1" letterSpacing="1px" as="h3" size="md">{ promoter ? promoter  : ''}</Heading>
        </Flex>
    )
}