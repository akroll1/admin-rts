import React from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { FighterSlider } from '../fighter-slider'

export const ScoringMain = ({ 
    scoringComplete,
    fighterData,
    submitRoundScores, 
    scoredRounds, 
    sliderScores, 
    setSliderScores,
    isSubmitting
}) => {
    return (
        <Flex 
            id="scoring-main"
            p="4" 
            m={['auto', 'auto', 'unset']} 
            marginTop="1rem"
            flex="1 0 50%" 
            flexDir="column" 
            w="100%"
        >
            <Heading textAlign="center">{scoredRounds ? `Round ${scoringComplete ? scoredRounds : scoredRounds+1}` : ''}</Heading> 
            <Flex flexDir={["column", "row", "row"]} flex="1 0 40%">
            {
                fighterData.length > 0 && fighterData.map( (fighter,i) => (
                    <FighterSlider
                        key={i}
                        fighter={fighter}
                        sliderScores={sliderScores}
                        setSliderScores={setSliderScores}
                    />
                ))
            }
            </Flex>
            <Button
                onClick={submitRoundScores}
                disabled={isSubmitting || scoringComplete} 
                variant="outline" 
                colorScheme="red" 
                mx="auto" 
                my="4"
                w={["90%","40%"]}>
                    Submit Scores
            </Button>
        </Flex>  
    )
}