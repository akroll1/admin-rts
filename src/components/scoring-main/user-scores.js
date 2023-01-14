import { useEffect, useState } from 'react'
import {
    Flex, 
    Heading 
} from '@chakra-ui/react'
import { useGlobalStore } from "../../stores"
import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    RepeatIcon,
} from '@chakra-ui/icons'

export const UserScores = ({
    evenRound,
    fighterIds,
    handleAdjustScore,
}) => {

    const { 
        totalRounds,
        userScorecard,
    } = useGlobalStore()
    
    const [t, setT] = useState([])
    const { fighter1Id, fighter2Id, selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};

    // useEffect(() => {
    //     if(userScorecard?.scores?.length > 0){
    //         const scoredRounds = userScorecard.scores.length;
    //         const toFill = totalRounds - scoredRounds;
    //         if(toFill > 0){
    //             const t = [ ...new Array(toFill).fill('')].map( (el, _i) => {
    //                 const obj = {
    //                     round: scoredRounds + _i,
    //                     [fighter1Id]: '',
    //                     [fighter2Id]: ''
    //                 };
    //                 return obj
    //             })
    //             setT(userScorecard.scores.concat(t))
    //         }
    //     }
    // },[userScorecard])
    // console.log('t: ', t)
    return (
        <Flex
            bg="#151515"
            id="user_scores"
            w="100%"
            maxW="100%"
            flexDir="column"
            justifyContent="flex-start"
            boxSizing="border-box"
            h="auto"
            overflow="scroll"
            px="2"
            flex="1"
        >
            { userScorecard?.scores?.length > 0 && userScorecard.scores.map( (roundObj, _i) => {
            // { t.map( (roundObj, _i) => {

                let lastRow;
                const setScores = currentFighterId => {
                    if(!selectedFighterId){
                        return roundObj[currentFighterId]
                    }
                    if(currentFighterId == selectedFighterId){
                        return currentFighterId === fighter1Id 
                            ? roundObj[fighter1Id] 
                            : roundObj[fighter2Id];
                    }
                    
                    if(currentFighterId != selectedFighterId){
                        return currentFighterId === fighter2Id 
                            ? roundObj[fighter2Id] 
                            : roundObj[fighter1Id];
                    }
                }

                const score1 = setScores(fighter1Id)
                const score2 = setScores(fighter2Id)

                const renderData = () => {
                    
                    let fighterData = {
                        score1,
                        score2,
                        score1Color: score1 >= score2 
                            ? selectedFighterId
                                ? 'yellow.700' 
                                : 'yellow.400' 
                            : selectedFighterId
                                ? 'gray.500'
                                : 'gray.400',
                        score2Color: score2 >= score1 
                            ? selectedFighterId
                                ? 'yellow.700' 
                                : 'yellow.400'
                            : selectedFighterId
                                ? 'gray.500'
                                : 'gray.400' 
                    }
                    return fighterData
                }

                const fighter1Data = renderData(fighter1Id)
                const fighter2Data = renderData(fighter2Id)
                const fighter1ChevronColor = evenRound  
                        || !selectedFighterId 
                        || selectedFighterId === fighter1Id
                    ? "#303030" 
                    :  "gray.500";
                
                const fighter2ChevronColor = evenRound  
                        || !selectedFighterId 
                        || selectedFighterId === fighter2Id
                    ? "#303030" 
                    :  "gray.500";

                return (
                    <Flex
                        flex="1"
                        boxSizing="border-box"
                        key={_i}
                        alignItems="center"
                        justifyContent="center"
                        flexDir="row"
                        w="100%"
                        borderTop={lastRow ? "1px solid #303030" : "1px solid #202020"}
                        borderBottom={lastRow ? "1px solid #303030" : "1px solid transparent"}
                        _hover={{
                            bg: "#202020",
                            cursor: "pointer"
                        }}
                    >
                        <Flex
                            flex="1 0 40%"
                            alignItems="center"
                            justifyContent="center"
                        >
                            { lastRow &&
                                <ChevronLeftIcon
                                    onClick={e => handleAdjustScore(e, fighter1Id)}
                                    id="decrement"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3rem"
                                    color={fighter1ChevronColor}
                                />
                            }
                            <Heading
                                textAlign="center"
                                color={fighter1Data.score1Color}
                                as="h3"
                                w="100%"
                                size="md"
                            >
                                {fighter1Data.score1}
                            </Heading>
                            { lastRow && 
                                <ChevronRightIcon
                                    onClick={e => handleAdjustScore(e, fighter1Id)}
                                    id="increment"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3rem"
                                    color={evenRound || !selectedFighterId || selectedFighterId === fighter1Id ? "#303030" : "gray.500"}
                                />
                            }
                        </Flex>
                        <Flex
                            my={lastRow ? '4' : '0'}
                            flex="1 0 20%"
                            alignItems="center"
                            justifyContent="center"
                        >

                                    <Heading
                                        color={selectedFighterId ? "gray.600" : "gray.400"}
                                        as="h3"
                                        size={"sm"}
                                        alignItems="center"
                                        justifyContent="center"
                                        p="1"
                                    >
                                        {_i+1}
                                    </Heading>

                        </Flex>
                        <Flex
                            flex="1 0 40%"
                            alignItems="center"
                            justifyContent="center"
                        >
                            { lastRow && 
                                <ChevronLeftIcon
                                    onClick={e => handleAdjustScore(e, fighter2Id)}
                                    id="decrement"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3rem"
                                    color={evenRound || !selectedFighterId || selectedFighterId === fighter2Id ? "#303030" : "gray.500"}

                                />
                            }
                            <Heading
                                textAlign="center"
                                as="h3"
                                w="100%"
                                size="md"
                                color={fighter2Data.score2Color}
                            >

                                {fighter2Data.score2}
                            </Heading>
                            { lastRow && 
                                <ChevronRightIcon
                                    onClick={e => handleAdjustScore(e, fighter2Id)}
                                    id="increment"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3rem"
                                    color={fighter2ChevronColor}
                                />
                            }
                        </Flex>
                    </Flex>
                )})}
        </Flex>
    )
}
