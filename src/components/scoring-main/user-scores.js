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

    useEffect(() => {
        if(userScorecard?.scores?.length > 0){
            const roundToAdd = userScorecard.scores[0]
            const tempScores = userScorecard.scores.concat(roundToAdd)
            setScores(tempScores)
        }
    },[userScorecard])

    const clearSelectedFighter = () => {
        setSelectedFighter('')
    }

    return (
        <Flex
            w="100%"
            p="2"
            maxW="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
        >
            { scores.length > 0 && scores.map( (roundObj, _i) => {
                // console.log('roundObj: ', roundObj)
                const score0 = roundObj[activeGroupScorecard.fighters[0].fighterId]
                const score1 = roundObj[activeGroupScorecard.fighters[1].fighterId]
                const RenderLastRow = (score, fighterId) => {

                    if(evenRound){
                        return (
                            <Flex
                                w="100%"
                                alignItems="center"
                                justifyContent="space-between"  
                                borderBottom="3px solid transparent"                              
                            >
                                <ChevronLeftIcon
                                    onClick={handleAdjustScore}
                                    id="decrement"
                                    cursor="pointer"
                                    p="2"
                                    fontSize="3.5rem"
                                    color="gray.700"
                                />
                                <Heading
                                    w="100%"
                                    as="h3"
                                    size="xl"
                                >
                                    {10}
                                </Heading>
                                <ChevronRightIcon
                                    onClick={handleAdjustScore}
                                    id="increment"
                                    cursor="pointer"
                                    p="2"
                                    fontSize="3.5rem"
                                    color="gray.700"
                                />
                            </Flex>
                        )
                    }

                    if(!selectedFighter.fighterId){
                        return (
                            <Flex
                                w="100%"
                                alignItems="center"
                                justifyContent="space-between"  
                                borderBottom="3px solid transparent"                              
                            >
                                <ChevronLeftIcon
                                    onClick={handleAdjustScore}
                                    id="decrement"
                                    cursor="pointer"
                                    p="2"
                                    fontSize="3.5rem"
                                    color="gray.700"
                                />
                                <Heading
                                    w="100%"
                                    as="h3"
                                    size="xl"
                                    color="whiteAlpha.300"
                                >
                                    {'10'}
                                </Heading>
                                <ChevronRightIcon
                                    onClick={handleAdjustScore}
                                    id="increment"
                                    cursor="pointer"
                                    p="2"
                                    fontSize="3.5rem"
                                    color="gray.700"
                                />
                            </Flex>
                        )
                    }

                    if(selectedFighter.fighterId !== fighterId){
                        return (
                            <Flex
                                w="100%"
                                alignItems="center"
                                justifyContent="space-between"                             
                            >
                                <ChevronLeftIcon
                                    onClick={handleAdjustScore}
                                    id="decrement"
                                    cursor="pointer"
                                    p="2"
                                    fontSize="3.5rem"
                                    color="gray.500"
                                />
                                <Heading
                                    as="h3"
                                    size="xl"
                                    color={!notSelectedScore == score ? 'whiteAlpha.800' : "yellow.400"}
                                >
                                    {!selectedFighter ? `10` : selectedFighter.fighterId === fighterId ? `10` : notSelectedScore}
                                </Heading>
                                <ChevronRightIcon
                                    onClick={handleAdjustScore}
                                    id="increment"
                                    cursor="pointer"
                                    p="2"
                                    fontSize="3.5rem"
                                    color="gray.500"
                                />
                            </Flex>
                        )
                    }
                    // if selectedFighter.fighterId === fighterId, below.
                    return (
                        <Flex
                            w="100%"
                            alignItems="center"
                            justifyContent="space-between"
                            // borderBottom="2px solid red"                              
                        >
                             <ChevronLeftIcon
                                id="decrement"
                                cursor="pointer"
                                p="2"
                                fontSize="3.5rem"
                                color="transparent"
                            />
                            <Heading
                                w="100%"
                                as="h3"
                                size="xl"
                            >
                                {10}
                            </Heading>
                            <ChevronRightIcon
                                id="increment"
                                cursor="pointer"
                                p="2"
                                fontSize="3.5rem"
                                color="transparent"
                            />

                        </Flex>
                    )

                }
                return (
                    <Flex
                        key={_i}
                        alignItems="center"
                        justifyContent="center"
                        flexDir="row"
                        w="100%"
                        p="2px"
                        borderBottom="1px solid #202020"
                    >
                        <Flex
                            flex="1 0450%"
                            m="auto"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Heading
                                color={score0 > score1 ? 'yellow.400' : 'whiteAlpha.800'}
                                as="h3"
                                size="lg"
                            >
                                {(_i+1) === scores.length ? RenderLastRow(score0, activeGroupScorecard.fighters[0].fighterId) : score0}
                            </Heading>
                        </Flex>
                        <Flex
                            flex="1 0 20%"
                        >
                            { _i+1 == scores.length 
                                ? 
                                    <Heading 
                                        as="h4" 
                                        size="lg"
                                        color={selectedFighter ? "red.500" : 'red.900'}
                                        m="auto"
                                        cursor="pointer"
                                        _hover={{color: 'red.600'}}
                                        onClick={clearSelectedFighter}
                                    >
                                        {<RepeatIcon />}
                                    </Heading>
                                :  
                                    <Heading
                                        color={_i+1 == scores.length ? 'red.500' : "gray.400"}
                                        as="h3"
                                        size={_i+1 === scores.length ? "md" : "sm"}
                                        alignItems="center"
                                        justifyContent="center"
                                        mx="auto"
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
                            <Heading
                                as="h3"
                                size="lg"
                                color={score1 > score0 ? 'yellow.400' : 'whiteAlpha.800'}
                            >

                                {(_i+1) === scores.length ? RenderLastRow(score1, activeGroupScorecard.fighters[1].fighterId) : score1}         
                            </Heading>
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )
}