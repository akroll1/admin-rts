import React, { useEffect, useState } from 'react'
import { Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { DividerWithText } from '../../../chakra'
import { capFirstLetters } from '../../../utils'
import { stateStore } from '../../../stores'

export const FightStats = (props) => {
    const { label, tabs, value, ...boxProps } = props;
    const { stats } = stateStore.getState();

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
    // console.log('totalObj: ', totalObj)
    const getPercentages = totalObj => {
        const fighter1Percentage = Math.floor(Number.parseFloat(totalObj[fighter1] / (totalObj['total'] - totalObj['even']).toFixed(2)) *100);
        const fighter2Percentage = Math.floor(Number.parseFloat(totalObj[fighter2] / (totalObj['total'] - totalObj['even']).toFixed(2)) * 100); 
        return ({
            fighter1Percentage,
            fighter2Percentage
        })    
    };
    
    const { fighter1Percentage, fighter2Percentage } = getPercentages(totalObj);
    
    return (
        <Flex
            display={window.innerWidth <= 768 && tabs.analytics ? 'flex' : window.innerWidth > 768 ? 'flex' : 'none'}
            flexDirection="column"
            px="2"
            bg="bg-surface"
            borderRadius="lg"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            {...boxProps}
            alignItems="center"
            justifyContent="space-evenly"
        >
            <DividerWithText text={`Group Results`} />
            <Flex w="100%" flexDirection="row" alignItems="center" justifyContent="space-evenly">

                <Stack alignItems="center" justifyContent="center">
                    <Text m="auto" fontSize="sm" color="muted">
                        {capFirstLetters(fighter1)}
                    </Text>
                    <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
                        {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                    </Heading>
                </Stack>
                <Stack alignItems="center" justifyContent="center">
                    <Text m="auto" fontSize="sm" color="muted">
                        {capFirstLetters(fighter2)}
                    </Text>
                    <Heading size={useBreakpointValue({base: 'sm', md: 'md'})}>
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                </Stack>

            </Flex>
        </Flex>
    )
}