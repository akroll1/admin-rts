import React, { useEffect, useState } from 'react'
import { Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { statsStore } from '../../../stores'
import { capFirstLetters } from '../../../utils'

export const FightStats = (props) => {
    const { label, value, ...boxProps } = props;
    const stats = statsStore( state => state.stats);

    const [fighters, setFighters] = useState(null);
    
    useEffect(() => {
        if(stats?.length > 0){
            setFighters(stats[0].fighters);
        }
    }, [stats])
    
    const [fighter1, fighter2] = fighters ? fighters : '';
    let totalObj = {
        even: 0, 
        [fighter1]: 0, 
        [fighter2]: 0, 
        total: 0
    };
    const statisfied = stats?.length > 0 && stats.map( userStats => {
        const { fighters, mappedScores } = userStats;
        const [fighter1, fighter2] = fighters;
       
        return mappedScores.reduce( (obj, scores) => {
            if(scores[fighter1] > scores[fighter2]){
                totalObj[fighter1] += 1;
            } 
            if(scores[fighter2] > scores[fighter1]){
                totalObj[fighter2] += 1;
            }  
            if(scores[fighter1] === scores[fighter2]){
                totalObj['even'] += 1;
            }
            totalObj['total'] += 1;
            return ({
                ...obj,
                total: mappedScores.length
            })
        },{[fighter1]: 0, [fighter2]: 0, even: 0});
    });
    const fighter1Percentage = Math.floor(Number.parseFloat(totalObj[fighter1] / totalObj['total']).toFixed(2) * 100);
    const fighter2Percentage = Math.floor(Number.parseFloat(totalObj[fighter2] / totalObj['total']).toFixed(2) * 100); 
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
                    {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                </Heading>
            </Stack>
            <Stack>
                <Text m="auto" fontSize="sm" color="muted">
                    {capFirstLetters(fighter2)}
                </Text>
                <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
                    {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                </Heading>
            </Stack>
        </Flex>
    )
}