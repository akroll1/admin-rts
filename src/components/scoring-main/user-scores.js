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
    handleFighterSelect,
}) => {

    const { 
        userScorecard,
    } = useGlobalStore()
    
    const { fighter1Id, fighter2Id, selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};

    return (
        <Flex
            id="user_scores"
            w="100%"
            maxW="100%"
            px="4"
            flexDir="column"
            alignItems="center"
            justifyContent="flex-start"
            boxSizing="border-box"
            h="auto"
            maxH="60%"
            overflow="scroll"
        >
            { userScorecard?.scores?.map( (roundObj, _i) => {

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
                                ? 'gray.500' : 'whiteAlpha.800' 
                            : selectedFighterId
                                ? 'yellow.500' : 'yellow.400',
                        score2Color: score2 >= score1 
                            ? selectedFighterId
                                ? 'gray.500' : 'whiteAlpha.800' 
                            : selectedFighterId 
                                ? 'yellow.500' : 'yellow.400',                   
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
                        boxSizing="border-box"
                        key={_i}
                        alignItems="center"
                        justifyContent="center"
                        flexDir="row"
                        w="100%"
                        borderTop={lastRow ? "1px solid #303030" : "1px solid #202020"}
                        borderBottom={lastRow ? "1px solid #303030" : "1px solid transparent"}
                        _hover={{
                            bg: "#151515",
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
                                size="lg"
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
                            { lastRow
                                ? 
                                    <Heading 
                                        as="h3" 
                                        size={["lg", "md"]}
                                        color={selectedFighterId ? "red.500" : 'red.900'}
                                        cursor="pointer"
                                        _hover={{color: 'red.600'}}
                                        onClick={() => handleFighterSelect(null)}
                                        alignSelf="center"
                                    >
                                        {<RepeatIcon />}
                                    </Heading>
                                :  
                                    <Heading
                                        color={lastRow ? 'red.500' : "gray.400"}
                                        as="h3"
                                        size={"sm"}
                                        alignItems="center"
                                        justifyContent="center"
                                        // borderY="1px solid #303030"
                                        p="1"
                                    >
                                        {_i+1}
                                    </Heading>
                            }
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
                                size="lg"
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
