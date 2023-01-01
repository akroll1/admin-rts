import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { useGlobalStore } from "../../stores"
import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    RepeatIcon,
    ViewIcon 
} from '@chakra-ui/icons'

export const UserScores = ({
    evenRound,
    handleAdjustScore,
    notSelectedScore,
    selectedFighter,
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
        }
    },[selectedFighter])

    const clearSelectedFighter = () => {
        setSelectedFighter({})
    }
    console.log('notSelectedScore: ', notSelectedScore)

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
                const score1 = roundObj[fighter1Id];
                const score2 = roundObj[fighter2Id];

                const renderData = () => {
                    
                    const evenRoundScore = score1 === score2;

                    let fighterData = {
                        score1,
                        score2,
                        score1Color: evenRoundScore ? 'whiteAlpha.700' : score1 > score2 ? 'whiteAlpha.800' : 'yellow.300',
                        score2Color: evenRoundScore ? 'whiteAlpha.700' : score2 > score1 ? 'whiteAlpha.800' : 'yellow.300',
                        iconLeft: 'transparent',
                        iconRight: 'transparent',
                    }

                    if(lastRow && selectedFighterId){

                        const getLastRowScore = selectedFighterId => {
                            if(selectedFighterId === fighter1Id){
                                if(score1 >= score2){
                                    return '10'
                                }
                                return notSelectedScore
                            }
                            if(selectedFighterId === fighter2Id){
                                if(score2 >= score1){
                                    return '10'
                                }
                                return notSelectedScore
                            }
                        }
                        const scoreA = getLastRowScore(selectedFighterId);
                        const scoreB = getLastRowScore(selectedFighterId);

                        Object.assign(fighterData,{
                            score1: scoreA >= scoreB ? "10" : notSelectedScore,
                            score2: scoreB >= scoreA ? "10" : notSelectedScore,
                            score1Color: scoreA >= scoreB ? 'whiteAlpha.800' : 'yellow.300',
                            score2Color: scoreB >= scoreA ? 'whiteAlpha.800' : 'yellow.300'
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
                        w="100%"
                        borderBottom="1px solid #202020"
                    >
                        <Flex
                            w="100%"
                            flex="1 0 40%"
                            m="auto"
                            alignItems="center"
                            justifyContent="center"
                        >
                            { lastRow &&
                                <ChevronLeftIcon
                                    onClick={handleAdjustScore}
                                    id="decrement"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3.5rem"
                                    color="gray.500"
                                />
                            }
                            <Heading
                                m="auto"
                                color={lastRow ? "whiteAlpha.800" : renderData().score1Color}
                                as="h3"
                                size={lastRow ? "xl" : "lg"}
                            >
                                {renderData(fighter1Id).score1}
                            </Heading>
                            { lastRow && 
                                <ChevronRightIcon
                                    onClick={handleAdjustScore}
                                    id="increment"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3.5rem"
                                    color="gray.500"
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
                                        as="h4" 
                                        size="lg"
                                        color={selectedFighter ? "red.500" : 'red.900'}
                                        cursor="pointer"
                                        _hover={{color: 'red.600'}}
                                        onClick={clearSelectedFighter}
                                        m="auto"
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
                            w="100%"
                        >
                            { lastRow &&
                                <ChevronLeftIcon
                                    onClick={handleAdjustScore}
                                    id="decrement"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3.5rem"
                                    color="gray.500"
                                />
                            }
                            <Heading
                                as="h3"
                                size={lastRow ? "xl" : "lg"}
                                color={lastRow ? "whiteAlpha.800" : renderData().score2Color}
                                m="auto"
                            >

                                {renderData(fighter2Id).score2}
                            </Heading>
                            { lastRow && 
                                <ChevronRightIcon
                                    onClick={handleAdjustScore}
                                    id="increment"
                                    cursor="pointer"
                                    px="2"
                                    fontSize="3.5rem"
                                    color="gray.500"
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
