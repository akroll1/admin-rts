import React, { useState, useEffect } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { FighterSwipe } from '../fighter-swipe'
import { ScoringMainFightStats } from './scoring-main-fight-stats'

export const ScoringMain = ({ 
    fightComplete,
    fighterData,
    fighterScores,
    isSubmitting,
    submitRoundScores, 
    tabs,
    totalRounds,
}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedRoundWinner, setSelectedRoundWinner] = useState('');
    const [notWinnerScore, setNotWinnerScore] = useState(9);
    const [round, setRound] = useState(null)
    
    useEffect(() => {
        if(fightComplete || fighterScores.round + 1 > totalRounds){
            setIsDisabled(true)
            return setRound(totalRounds);
        }
        return fighterScores.round === totalRounds ? setRound(totalRounds) : setRound(fighterScores.round + 1);

    }, [fighterScores])

    useEffect(() => {
        if(isSubmitting){ 
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        if(!selectedRoundWinner && !isSubmitting) setIsDisabled(true)
        
    },[isSubmitting, selectedRoundWinner]);

    const handleAdjustScore = e => {
        const { id } = e.currentTarget;
        if(id === 'increment'){
            if(notWinnerScore >= 10) return;
            setNotWinnerScore(prev => prev + 1)
        }
        if(id === 'decrement'){
            if(notWinnerScore <= 6) return;
            setNotWinnerScore(prev => prev -1)
        }
    }
    const submitScores = () => {
        const [fighter1, fighter2] = fighterData;
        const roundLoser = selectedRoundWinner === fighter1.lastName ? fighter2.lastName : fighter1.lastName;
        const update = {
            [roundLoser]: notWinnerScore
        };
        submitRoundScores(update);
        setSelectedRoundWinner('');
        setNotWinnerScore(9)
    }

    return (
        <Flex 
            id="scoring-main"
            display={tabs.scoring ? 'flex' : 'none'}
            p={["0", "2"]} 
            m="auto"
            flexDir="column" 
            mt="0"
            w="100%"
        >
            <Heading 
                mt="4"
                mb="2"
                as="h2"
                size="xl"
                textAlign="center"
                minH="2rem"
                verticalAlign="middle"
            >
                {`Round ${ round ? round : '' }`}
            </Heading> 
            <Flex flexDir={["row"]} w={["100%", "80%"]} m="auto">
            {
                fighterData.length > 0 && fighterData.map( (fighter,i) => (
                    <FighterSwipe
                        setSelectedRoundWinner={setSelectedRoundWinner}
                        selectedRoundWinner={selectedRoundWinner}
                        notWinnerScore={notWinnerScore}
                        key={i}
                        fighter={fighter}
                    />
                ))
            }
            </Flex>
            <Flex 
                minH="1rem"
                mb="4" 
                mt="2" 
                flexDir="row" 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
            >
            { selectedRoundWinner
                ?
                    <Flex w="100%" alignItems="center" justifyContent="center">
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
                :
                    <ScoringMainFightStats />
            }
            </Flex>
            <Button
                minH="3rem"
                onClick={submitScores}
                disabled={isDisabled} 
                variant="outline" 
                colorScheme="red" 
                mx="auto" 
                mt="2"
                w={["90%","50%"]}
            >
                { isDisabled ? `Select Fighter` : `Submit Score` }
            </Button>
        </Flex>  
    )
}