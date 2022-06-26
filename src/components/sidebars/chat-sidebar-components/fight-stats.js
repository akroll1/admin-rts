import * as React from 'react'
import { Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'

export const FightStats = (props) => {
  const { label, value, ...boxProps } = props;
  return (
    <Flex
        px="2"
        bg="bg-surface"
        borderRadius="lg"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        {...boxProps}
        alignItems="center"
        justifyContent="space-evenly"
        my="-2"
    >
        <Stack>
            <Text m="auto" fontSize="sm" color="muted">
                Bivol
            </Text>
            <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
            77&#37;	
            </Heading>
        </Stack>
        <Stack>
            <Text m="auto" fontSize="sm" color="muted">
                Canelo
            </Text>
            <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
            23&#37;	
            </Heading>
        </Stack>
    </Flex>
  )
}