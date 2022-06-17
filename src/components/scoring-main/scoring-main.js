import React from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { FighterSlider } from '../fighter-slider'

export const ScoringMain = ({ 
    fighterData,
    submitRoundScores, 
    scoringModal, 
    toggleScoringModal, 
    currentRound, 
    sliderScores, 
    setSliderScores, 
    groupScorecard 
}) => {
    return (
        <Flex 
            id="scoring-main"
            p="4" 
            m="2" 
            flex="1 0 50%" 
            flexDir="column" 
            w="100%"
        >
            <Heading textAlign="center">Round {currentRound}</Heading> 
            <Flex flexDir={["column", "row", "row"]} flex="1 0 40%">
            {
                fighterData.length > 0 && fighterData.map( (fighter,i) => (
                    <FighterSlider
                        key={i}
                        fighter={fighter}
                        sliderScores={sliderScores}
                        setSliderScores={setSliderScores}
                        groupScorecard={groupScorecard} 
                        toggleScoringModal={toggleScoringModal}
                        scoringModal={scoringModal}
                    />
                ))
            }
            </Flex>
            <Button
                onClick={submitRoundScores} 
                variant="outline" 
                colorScheme="red" 
                margin="auto" 
                w={["90%","40%"]}>
                    Submit Scores
            </Button>
        </Flex>  
    )
}