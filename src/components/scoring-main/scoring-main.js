import React, { useState, useEffect } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { FighterSlider } from '../fighter-slider'

export const ScoringMain = ({ 
    totalRounds,
    fightComplete,
    fighterData,
    submitRoundScores, 
    sliderScores, 
    setSliderScores,
    isSubmitting,
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [round, setRound] = useState(null)
    useEffect(() => {
        if(fightComplete || sliderScores.round + 1 > totalRounds){
            setIsDisabled(true)
            return setRound(totalRounds);
        }
        return sliderScores.round === totalRounds ? setRound(totalRounds) : setRound(sliderScores.round + 1);

    }, [sliderScores])

    return (
        <Flex 
            id="scoring-main"
            p="4" 
            m={['auto', 'auto', 'unset']} 
            marginTop="1rem"
            flex={["1 0 40%", "1 0 40%", "1 0 40%", "1 0 50%"]}
            flexDir="column" 
            w="100%"
        >
            <Heading 
                textAlign="center"
                minH="3rem"
                verticalAlign="middle"
            >
                    {`Round ${ round ? round : '' }`}
            </Heading> 
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
                disabled={isSubmitting || isDisabled } 
                variant="outline" 
                colorScheme="red" 
                mx="auto" 
                my="4"
                w={["90%","40%"]}
            >
                { isDisabled ? `Fight Complete` : `Submit Scores` }
            </Button>
        </Flex>  
    )
}