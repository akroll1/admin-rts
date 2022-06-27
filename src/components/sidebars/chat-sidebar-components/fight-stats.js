import React, { useEffect, useState } from 'react'
import { Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { useStatsStore } from '../../../stores'
import { capFirstLetters } from '../../../utils'

export const FightStats = (props) => {
    const { label, value, ...boxProps } = props;
    const stats = useStatsStore( store => store.stats);
    const [fighters, setFighters] = useState(null);
    
    useEffect(() => {
        if(stats?.length > 0){
            setFighters(stats[0].fighters);
        }
    }, [stats])
    
    
    const [fighter1, fighter2] = fighters ? fighters : '';

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
                {capFirstLetters(fighter1)}
            </Text>
            <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
            77&#37;	
            </Heading>
        </Stack>
        <Stack>
            <Text m="auto" fontSize="sm" color="muted">
                {capFirstLetters(fighter2)}
            </Text>
            <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
            23&#37;	
            </Heading>
        </Stack>
    </Flex>
  )
}