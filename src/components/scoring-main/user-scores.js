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
        if(activeGroupScorecard?.fighters?.length > 0 && userScorecard?.scores?.length > 0){
            const roundToAdd = userScorecard.scores[0]
            const tempScores = userScorecard.scores.concat(roundToAdd)
            setScores(tempScores)
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
            { scores.length > 0 && scores.map( (roundObj, _i) => {
                
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

                const renderData = currentFighterId => {

                    let fighterData = {
                        score1,
                        score2,
                        score1Color: score1 >= score2 ? 'whiteAlpha.800' : 'yellow.300',
                        score2Color: score2 >= score1 ? 'whiteAlpha.800' : 'yellow.300',
                    }

                    if(lastRow){

                        const setLastRow = currentFighterId => {
                            if(!selectedFighterId){
                                return "10"
                            }
                            if(selectedFighterId == currentFighterId){
                                return "10";
                            } 
                            return notSelectedScore;    
                        } 
                        const score = setLastRow(currentFighterId)
                        const setColors = currentFighterId => {
                            if(!selectedFighterId){
                                return 'gray.300'
                            }
                            return score >= 10 ? 'whiteAlpha.700' : 'yellow.300'
                        }

                        Object.assign(fighterData, {
                            score1: score,
                            score2: score,
                            score1Color: setColors(currentFighterId),
                            score2Color: setColors(currentFighterId),
                        })
                        return fighterData
                    }

                    return fighterData
                }

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
                                    color={evenRound  || !selectedFighterId || selectedFighterId === fighter1Id ? "#303030" :  "gray.500"}
                                />
                            }
                            <Heading
                                textAlign="center"
                                color={renderData(fighter1Id).score1Color}
                                as="h3"
                                w="100%"
                                size={lastRow ? "xl" : "lg"}
                            >
                                {renderData(fighter1Id).score1}
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
                                        // alignItems="center"
                                        // justifyContent="center"
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
                                color={renderData(fighter2Id).score2Color}
                            >

                                {renderData(fighter2Id).score2}
                            </Heading>
                            { lastRow && 
                                <ChevronRightIcon
                                    onClick={e => handleAdjustScore(e, fighter2Id)}
                                    id="increment"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3rem"
                                    color={evenRound  || !selectedFighterId || selectedFighterId === fighter2Id ? "#303030" : "gray.500"}
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
