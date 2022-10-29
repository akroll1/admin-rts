import { useEffect, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

export const ScoringButtons = ({
    handleAdjustScore,
    isDisabled,
    round,
    selectedFighter,
    submitScores,
    totalRounds,
}) => {

    return (
        <Flex 
            id="scoring_buttons"
            minH="1rem"
            mb="4" 
            mt="2" 
            flexDir="column" 
            w="100%" 
            alignItems="center" 
            justifyContent="center"
        >
            <Flex 
                zIndex={101}
                minH="2rem" 
                visibility={selectedFighter ? `visible` : `hidden`} 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
            >
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
            </Flex>
            <Button
                zIndex={100}
                minH="3rem"
                onClick={submitScores}
                disabled={isDisabled} 
                variant={isDisabled ? "outline" : "solid"} 
                colorScheme="solid" 
                mx="auto" 
                mt="4"
                w={["90%","50%"]}
            >
                { isDisabled && round >= totalRounds ? `Scoring Complete` : isDisabled ? `Select Fighter` : `Submit Score` }
            </Button>
        </Flex>
    )
}