import React from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { FighterSlider } from '../fighter-slider'

export const ScoringMain = ({ 
    tableData,
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
            m={['auto', 'auto']} 
            flex="1 0 50%" 
            flexDir="column" 
            w="100%"
        >
            <Heading textAlign="center">{currentRound ? `Round ${currentRound}` : ''}</Heading> 
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
                mx="auto" 
                my="4"
                w={["90%","40%"]}>
                    Submit Scores
            </Button>
        </Flex>  
    )
}