import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { parseEpoch } from '../../utils/utils'

export const ShowsMetadata = ({ fighterAName, fighterBName, promoter, location, showTime }) => {
    return (
        <Flex borderRadius="5px" bg="transparent" w="100%" p="5" flexDir="column" alignItems="center" justifyContent="center">
            <Heading letterSpacing="1px" as="h2" size="xl">{ fighterAName } vs { fighterBName }</Heading>
            <Heading mt="1" p="1" letterSpacing="1px" as="h3" size="md">{ parseEpoch(showTime) }</Heading>
            <Heading p="1" letterSpacing="1px" as="h3" size="sm">{ promoter }</Heading>
            <Heading mb="0" p="1" letterSpacing="1px" as="h3" size="sm">{ location }</Heading>
        </Flex>
    )
}