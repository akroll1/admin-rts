import React from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { FighterSlider } from '../fighter-slider'

export const ScoringMain = ({ submitRoundScores, scoringModal, toggleScoringModal, currentRound, sliderScores, setSliderScores, groupScorecard }) => {
    const { fighterA, fighterB } = groupScorecard?.fighterA ? groupScorecard : '';
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
            <Flex flexDir={["column", "column", "row"]} flex="1 0 40%">
            {
                groupScorecard?.fighterA && [fighterA, fighterB].map( (fighter,i) => {
                    return (
                        <FighterSlider
                            key={i}
                            fighter={fighter}
                            sliderScores={sliderScores}
                            setSliderScores={setSliderScores}
                            groupScorecard={groupScorecard} 
                            toggleScoringModal={toggleScoringModal}
                            scoringModal={scoringModal}
                        />
                    )
                })
            }
            </Flex>
            <Button
                onClick={submitRoundScores} 
                variant="outline" 
                colorScheme="red" 
                margin="auto" 
                w={["90%","40%"]}>
                    Submit Round {currentRound} Scores
            </Button>
        </Flex>  
    )
}