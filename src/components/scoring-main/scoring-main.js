import React, { useState, useEffect } from 'react'
import { Button, Flex, Heading, useControllableState } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { FighterSwipe } from '../fighter-swipe'
import { ScoringMainFightStats } from './scoring-main-fight-stats'
import { useScorecardStore } from '../../stores'

export const ScoringMain = ({ 
    isSubmitting,
    tabs,
}) => {
    const [evenRound, setEvenRound] = useState(false)
    const [round, setRound] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedFighter, setSelectedFighter] = useState('');
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    
    const {
        currentRound,
        fight,
        fighters,
        fighterScores,
        submitRoundScores,
    } = useScorecardStore();

    const totalRounds = fight ? fight.rounds : 12;
    const fightComplete = round === totalRounds;
    
    useEffect(() => {
        console.log('fighterScores.round === currentRound: ', fighterScores.round === currentRound)
        if(fightComplete || fighterScores.round === currentRound){
            setIsDisabled(true)
            return setRound(totalRounds);
        }
        return fighterScores.round === totalRounds ? setRound(parseInt(totalRounds)) : setRound(parseInt(fighterScores.round));

    }, [fighterScores, currentRound])

    useEffect(() => {
        if(isSubmitting){ 
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        if(!selectedFighter && !isSubmitting) setIsDisabled(true)
        
    },[isSubmitting, selectedFighter]);

    const handleAdjustScore = e => {
        const { id } = e.currentTarget;
        if(id === 'increment'){
            if(notSelectedScore >= 10) return;
            setNotSelectedScore(prev => prev + 1)
        }
        if(id === 'decrement'){
            if(notSelectedScore <= 6) return;
            setNotSelectedScore(prev => prev -1)
        }
    }

    useEffect(() => {
        setEvenRound(false)
        if(notSelectedScore === 10){
            setEvenRound(true)
        } 
    },[notSelectedScore])
    const handleFighterSelect = id => {
        setSelectedFighter(id)
        setNotSelectedScore(9)

    }

    const submitScores = () => {
        const [fighter1, fighter2] = fighters;
        const notSelected = selectedFighter === fighter1.fighterId ? fighter2.fighterId : fighter1.fighterId;
        const { round, scorecardId } = fighterScores
        const update = {
            round,
            scorecardId,
            [notSelected]: notSelectedScore,
            [selectedFighter]: 10
        };
        submitRoundScores(update);
        setSelectedFighter('');
        setNotSelectedScore(9)
    }
    // console.log('fighters: ', fighters)
    // console.log('selectedFighter: ', selectedFighter)
    return (
        <Flex 
            id="scoring-main"
            display={tabs.scoring || tabs.all ? 'flex' : 'none'}
            p={["0", "2"]} 
            m="auto"
            flexDir="column" 
            justifyContent="flex-end"
            my="8"
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
                {`Round ${ currentRound }`}
            </Heading> 
            <Flex flexDir={["row"]} w={["100%", "80%"]} m="auto">
            {
                fighters.length > 0 && fighters.map( (fighter, i) => (
                    <FighterSwipe
                        fighter={fighter}
                        handleFighterSelect={handleFighterSelect}
                        selectedFighter={selectedFighter}
                        notSelectedScore={notSelectedScore}
                        evenRound={evenRound}
                        redCorner={fighters[0].fighterId === selectedFighter}
                        key={i}
                    />
                ))
            }
            </Flex>
            <Flex 
                minH="1rem"
                mb="4" 
                mt="2" 
                flexDir="column" 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
            >

                <Flex mt="8" minH="5rem" visibility={selectedFighter ? `visible` : `hidden`} w="100%" alignItems="center" justifyContent="center">
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
                    minH="3rem"
                    onClick={submitScores}
                    disabled={isDisabled} 
                    variant={isDisabled ? "outline" : "solid"} 
                    colorScheme="solid" 
                    mx="auto" 
                    mt="2"
                    w={["90%","50%"]}
                >
                    { isDisabled ? `Select Fighter` : `Submit Score` }
                </Button>
            </Flex>
        </Flex>  
    )
}