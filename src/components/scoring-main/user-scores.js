import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useGlobalStore } from "../../stores"
import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    RepeatIcon,
} from '@chakra-ui/icons'
import { createImportSpecifier } from 'typescript'

export const UserScores = ({
    evenRound,
    notSelectedScore,
    selectedFighter,
    setNotSelectedScore,
    setSelectedFighter
}) => {

    const { 
        activeGroupScorecard,
        userScorecard,
    } = useGlobalStore()

    const [scores, setScores] = useState([])
    const [fighter1Id, setFighter1Id] = useState('')
    const [fighter2Id, setFighter2Id] = useState('')
    const [selectedFighterId, setSelectedFighterId] = useState('')

    useEffect(() => {
        if(activeGroupScorecard?.fighters?.length > 0){
            if(userScorecard?.scores?.length > 0){
                const roundToAdd = userScorecard.scores[0]
                const tempScores = userScorecard.scores.concat(roundToAdd)
                setScores(tempScores)
            }
            
            if(userScorecard?.scores?.length === 0){
                
                const [fighter1, fighter2] = activeGroupScorecard.fighters;
                const createScoreRow = {
                    [fighter1.fighterId]: 10,
                    [fighter2.fighterId]: 10,
                }
                setScores([createScoreRow])
            }
            setFighter1Id(activeGroupScorecard.fighters[0].fighterId);
            setFighter2Id(activeGroupScorecard.fighters[1].fighterId);
        }
    },[activeGroupScorecard, userScorecard])

    useEffect(() => {

        if(selectedFighter?.fighterId){
            setSelectedFighterId(selectedFighter.fighterId)
            return
        }
        setSelectedFighterId('')

    },[selectedFighter])

    const clearSelectedFighter = () => {
        setSelectedFighter('')
        setNotSelectedScore('9')
    }

    const handleAdjustScore = (e,fighterId) => {
        const { id } = e.currentTarget;
        if(!selectedFighterId || fighterId == selectedFighterId || notSelectedScore == 10) return
        if(id === 'increment'){
            if(notSelectedScore >= 10) return;
            setNotSelectedScore(prev => prev + 1)
        }
        if(id === 'decrement'){
            if(notSelectedScore <= 6) return;
            setNotSelectedScore(prev => prev -1)
        }
    }

    return (
        <Flex
            w="100%"
            p="1"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
        >

            { scores?.map( (roundObj, _i) => {

                const lastRow = (_i+1 ) === scores.length;
                const setScores = currentFighterId => {
                    if(currentFighterId == selectedFighterId){
                        return currentFighterId === fighter1Id ? roundObj[fighter1Id] : roundObj[fighter2Id]
                    }
                    if(currentFighterId != selectedFighterId){
                        return currentFighterId === fighter2Id ? roundObj[fighter2Id] : roundObj[fighter1Id]
                    }
                }

                const score1 = setScores(fighter1Id)
                const score2 = setScores(fighter2Id)
                
                const renderData = fighterId => {
                    const setColor = fighterId => {
                        if(!selectedFighterId){
                            if(score1 > score2){      
                                return !selectedFighterId ? 'whiteAlpha.300' : 'yellow.600';
                            }

                        }
                    }
                    let fighterData = {
                        score1,
                        score2,
                        score1Color: score1 >= score2 ? selectedFighter ? 'whiteAlpha.700' : 'whiteAlpha.800' : 'yellow.300',
                        score2Color: score2 >= score1 ? selectedFighter ? 'whiteAlpha.700' : 'whiteAlpha.800' : 'yellow.300',
                    }

                    if(lastRow){
                        const setLastRow = fighterId => {
                            if(!selectedFighterId){
                                return "10"
                            }
                            if(selectedFighterId == fighterId){
                                return "10";
                            } 
                            return notSelectedScore;    
                        } 
                        const score = setLastRow(fighterId)

                        const setLastRowColor = fighterId => {
                            if(!selectedFighterId) return 'whiteAlpha.600'
                            if(score == "10") return 'whiteAlpha.800'
                            return fighterId === selectedFighterId ? 'whiteAlpha.900' : 'gray.500'
                        }
                        const color = setLastRowColor(fighterId);

                        Object.assign(fighterData, {
                            score1: score,
                            score2: score,
                            score1Color: color,
                            score2Color: color,
                        })
                        return fighterData
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
                        key={_i}
                        alignItems="center"
                        justifyContent="center"
                        flexDir="row"
                        w={lastRow ? "100%" : "100%"}
                        m="auto"
                        borderBottom={lastRow ? "1px solid #555555" : "1px solid #202020"}
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
                                size={lastRow ? "xl" : "lg"}
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
                            flex="1 0 20%"
                            alignItems="center"
                            justifyContent="center"
                        >
                            { lastRow
                                ? 
                                    <Heading 
                                        as="h3" 
                                        size="xl"
                                        color={selectedFighter ? "red.500" : 'red.900'}
                                        cursor="pointer"
                                        _hover={{color: 'red.600'}}
                                        onClick={clearSelectedFighter}
                                    >
                                        {<RepeatIcon />}
                                    </Heading>
                                :  
                                    <Heading
                                        color={lastRow ? 'red.500' : "gray.400"}
                                        as="h3"
                                        size={lastRow ? "md" : "sm"}
                                        alignItems="center"
                                        justifyContent="center"
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
                                size={lastRow ? "xl" : "lg"}
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
                )
            })
        }
        </Flex>
    )
}
