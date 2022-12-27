import { useEffect, useState } from 'react'
import { Flex, Heading, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'
import { useGlobalStore } from '../../../stores'
import { GiConsoleController } from 'react-icons/gi'

export const FightStats = props => {
    const { label, tabs, value, ...boxProps } = props;

    const { 
        activeGroupScorecard,
        stats
    } = useGlobalStore();

    const [fighters, setFighters] = useState(null);
    const totalRounds = activeGroupScorecard?.fight?.totalRounds ? activeGroupScorecard?.fight?.totalRounds : 12

    useEffect(() => {
        if(stats?.length > 0){
            console.log('STATS: ', stats)
            setFighters(stats[0].fighters);
            const obj = {
                [stats[0].fighters[0]]: 0,
                [stats[1].fighters[1]]: 0,
            };
            console.log('obj, 23: ', obj)
            // divide by total scorers...

            const getMappedScoresArr = stats?.map( (statObj, _i) => statObj.mappedScores)
                .map( score => {
                    return score.reduce( (acc, roundObj, _i) => {
                        const fighter1 = stats[0].fighters[0];


                        const fighter2 = stats[1].fighters[1];
        
                        if(roundObj.round == [_i+1]){

                            const temp = {
                                ['Round_'+roundObj.round]: {
                                    [fighter1]: acc[fighter1] += roundObj[fighter1],
                                    [fighter2]: acc[fighter2] += roundObj[fighter2],
                                }
                            }
                            // console.log('acc: ', acc)
                            return ({
                                ...temp,
                                ...acc,
                            })

                        }     
                    },obj)
                })
            console.log('getMappedScoresArr: ' , getMappedScoresArr)
        }
    }, [stats])


    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    const [fighter1, fighter2] = fighters ? fighters : '';
    let totalObj = {
        even: 0, 
        [fighter1]: 0, 
        [fighter2]: 0, 
        total: 0
    };
    const stubTrendObj = totalRounds => {
        if(!totalRounds) return
        return Object.keys([...Array(totalRounds)]).map( (round, _i) => ({ [_i+1]: 0 }))
    }
    const trendAcc = stubTrendObj(totalRounds)
    // console.log('trendAcc: ', trendAcc)

    const statisfied = stats?.length > 0 && stats.map( (userStats, _i) => {
        const { fighters, mappedScores } = userStats;
        const [fighter1, fighter2] = fighters;


        return mappedScores.reduce( (obj, scores, _i) => {

            ///////////////////////////////////////
            // console.log('OBJ 81: ', obj)
            // console.log('SCORES 82: ', scores)
            // console.log('trendAcc: ', trendAcc)
            // USE THE MAPPED SCORES ARRAY FOR THIS!!!
            const divisor = mappedScores.length;
            if(_i+1 === scores.round){
                // console.log('scores[fighter1]: ', scores[fighter1])
                if(scores[fighter1] > scores[fighter2]){
                    const t = trendAcc[_i+1]
                    // console.log("T: ",t)
                    trendAcc[_i+1] += t
                }
                if(scores[fighter2] > scores[fighter1]){
                    trendAcc[_i+1] -= 1
                }
                // if(scores[fighter1] === scores[fighter2]){
                //     trendAcc[_i+1] += 0
                // }
            }
            // USE THE MAPPED SCORES ARRAY FOR THIS!!!
            // console.log('trendAcc: ', trendAcc)
            ///////////////////////////////////////

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
            display={tabs.all || tabs.table ? 'flex' : 'none'}
            flexDirection="column"
            px="2"
            bg="bg-surface"
            borderRadius="lg"
            boxShadow={useColorModeValue('sm', 'sm-dark')}
            {...boxProps}
            alignItems="center"
            justifyContent="space-evenly"
            w={["100%"]}
        >
            <Flex 
                w="100%" 
                flexDirection={["row"]} 
                alignItems="center" 
                justifyContent="space-evenly"
            >
                <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"                
                >
                    <Heading 
                        m="auto" 
                        fontSize="md" 
                        color="muted"
                    >
                        {capFirstLetters(fighter1)}
                    </Heading>
                    <Heading size="md">
                        {fighter1Percentage ? fighter1Percentage : 0}&#37;	
                    </Heading>
                </Flex>
                <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"                
                >
                    <Heading 
                        m="auto" 
                        fontSize="md" 
                        color="muted"
                    >
                        {capFirstLetters(fighter2)}
                    </Heading>
                    <Heading size="md">
                        {fighter2Percentage ? fighter2Percentage : 0}&#37;	
                    </Heading>
                </Flex>
            </Flex>

            <Flex>
                <p>stats</p>
            </Flex>
        </Flex>
    )
}