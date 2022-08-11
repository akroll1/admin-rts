import React, { useEffect, useState } from 'react'
import { Divider, Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { DividerWithText } from '../../chakra'
import { capFirstLetters } from '../../utils'
import { stateStore } from '../../stores'

export const ScoringMainFightStats = (props) => {
    const { label, value, ...boxProps } = props;
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
        w={["100%", "80%"]}
            id="main_stats"
            flexDirection="column"
            px="2"
            bg="bg-surface"
            borderRadius="lg"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            {...boxProps}
            alignItems="center"
            justifyContent="space-evenly"
        >
            {/* <DividerWithText mt="0" mb="0" text={`Group Analytics`} /> */}
            <Flex 
                // bg="gray"
                w="100%" 
                m="auto"
                flexDirection="row" 
                alignItems="center" 
                justifyContent="space-around"
                my="1"
            >

                <Stack alignItems="center" justifyContent="center">
                    <Heading 
                        as="h2" 
                        mt="0" 
                        color="lightgray" 
                        size={useBreakpointValue({base: 'sm', md: 'sm'})}
                    >
                        {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                    </Heading>
                </Stack>
                <Stack alignItems="center" justifyContent="center">
                    <Heading 
                        as="h2"
                        mt="0" 
                        color="lightgray" 
                        size={useBreakpointValue({base: 'sm', md: 'sm'})}
                    >
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                </Stack>
            </Flex>
            {/* <Divider 
                w="90%" 
                m="auto" 
                my="1" 
            /> */}
        </Flex>
    )
}