import { Button, Flex, Heading } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

export const ScoringButtons = ({
    handleAdjustScore,
    isDisabled,
    lastScoredRound,
    selectedFighter,
    submitScores,
    totalRounds,
}) => {
    const fightComplete = (lastScoredRound + 1) > totalRounds
    return (
        <Flex 
            id="scoring_buttons"
            minH="1.5rem"
            my="4"
            flexDir="column" 
            w="100%" 
            alignItems="center" 
        >
            <Flex 
                zIndex={101}
                minH="2rem" 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
                pointerEvents={selectedFighter ? 'auto' : 'none'}
            >
                { selectedFighter
                    ? 
                        <>
                            <AddIcon 
                                onClick={handleAdjustScore}
                                mr="2"
                                w="30%"
                                id="increment"           
                                h="1.7rem" 
                                p="1" 
                                border="1px solid gray" 
                            />
                            <MinusIcon 
                                onClick={handleAdjustScore}
                                ml="2"
                                w="30%"
                                id="decrement"             
                                h="1.7rem" 
                                p="1" 
                                border="1px solid gray" 
                            />
                        </>
                    :
                        <Heading as="h4" size="md">{`Select Round Winner`}</Heading>
                }
            </Flex>
            <Button
                zIndex={100}
                minH="3rem"
                onClick={submitScores}
                disabled={isDisabled || fightComplete} 
                variant={isDisabled ? "outline" : "solid"} 
                colorScheme="solid" 
                mx="auto" 
                mt="4"
                w={["90%","50%"]}
            >
                { isDisabled && fightComplete ? `Scoring Complete` : `Submit Score` }
            </Button>
        </Flex>
    )
}