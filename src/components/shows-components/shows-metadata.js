import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { parseEpoch } from '../../utils/utils'

export const ShowsMetadata = ({ selectedShow }) => {
    const { show: { fightQuickTitle, location, promoter, showTime }} = selectedShow;
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
            <Heading fontWeight="normal" as="h3" size="sm">{ parseEpoch(showTime) }</Heading>
            <Heading mt="1" fontWeight="normal" letterSpacing="1px" as="h3" size="xs">{ location }</Heading>
            <Heading p="1" letterSpacing="1px" as="h3" size="md">{ promoter }</Heading>
        </Flex>
    )
}