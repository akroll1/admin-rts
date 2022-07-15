import React, { useState, useEffect } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { FighterSlider } from '../fighter-slider'

export const ScoringMain = ({ 
    fightComplete,
    fighterData,
    isSubmitting,
    setSliderScores,
    sliderScores, 
    submitRoundScores, 
    tabs,
    totalRounds,
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
            display={tabs.scoring ? 'flex' : 'none'}
            id="scoring-main"
            p={["0", "2"]} 
            m={['auto', 'auto', 'unset']} 
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
                minH="2.5rem"
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