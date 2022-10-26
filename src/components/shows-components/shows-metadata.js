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
            <Flex
                w={["100%", "100%"]}
                alignItems="center"
                justifyContent="center"
            >
                <Heading color="#bababa" fontWeight="normal" as="h3" size="md">{ showTime ? parseEpoch(showTime) : ''}</Heading>
                <Heading color="#dadada" minW="5%" fontWeight="normal" as="h3" size="sm">&#64;</Heading>
                <Heading color="#bababa" fontWeight="normal" as="h3" size="md">{ location ? location : ''}</Heading>
            </Flex>
            <Heading 
                p="1" 
                letterSpacing="1px" 
                as="h3" 
                size="lg"
                color="#fafafa"
            >
                { promoter ? promoter  : ''}
            </Heading>
        </Flex>
    )
}