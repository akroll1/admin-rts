import { useEffect, useState } from 'react'
import { Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import { useScorecardStore } from '../../../stores'

export const FightStats = (props) => {
    const { label, tabs, value, ...boxProps } = props;
    const { 
        stats
    } = useScorecardStore();

    const [fighters, setFighters] = useState(null);
    
    useEffect(() => {
        if(stats?.length > 0){
            setFighters(stats[0].fighters);
        }
    }, [stats])
    
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    const roundByRoundObj = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0
    };
    const getMappedScoresArr = stats.map( statObj => statObj.mappedScores)
        .map( roundObj => {
            
        });
    console.log('getMappedScoresArr: ' , getMappedScoresArr)



    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

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

    console.log('stats: ' , stats)

    return (
        <Flex
            display={tabs.all || tabs.table ? 'flex' : 'none'}
            flexDirection="column"
            px="2"
            bg="bg-surface"
            borderRadius="lg"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            {...boxProps}
            alignItems="center"
            justifyContent="space-evenly"
            w={["100%", "70%", "50%"]}
        >
            <Flex w="100%" flexDirection="row" alignItems="center" justifyContent="space-evenly">

                <Stack alignItems="center" justifyContent="center">
                    <Text m="auto" fontSize="lg" color="muted">
                        {capFirstLetters(fighter1)}
                    </Text>
                    <Heading size={useBreakpointValue({base: 'lg', md: 'xl'})}>
                        {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                    </Heading>
                </Stack>
                <Stack alignItems="center" justifyContent="center">
                    <Text m="auto" fontSize="lg" color="muted">
                        {capFirstLetters(fighter2)}
                    </Text>
                    <Heading size={useBreakpointValue({base: 'lg', md: 'xl'})}>
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                </Stack>

            </Flex>
        </Flex>
    )
}