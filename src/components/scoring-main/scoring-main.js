import { useState, useEffect } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { FighterSwipe } from '../fighter-swipe'
import { useScorecardStore } from '../../stores'
import image from '../../image/boxing-background.png'
import '../../stylesheets/background-image.css'

export const ScoringMain = ({ 
    isSubmitting,
    tabs,
}) => {
    const [userScoringComplete, setUserScoringComplete] = useState(false);
    const [evenRound, setEvenRound] = useState(false)
    const [round, setRound] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedFighter, setSelectedFighter] = useState('');
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    
    const {
        fighters,
        fighterScores,
        scoringComplete,
        setScoringComplete,
        submitRoundScores,
        totalRounds,
    } = useScorecardStore();

    useEffect(() => {
        setUserScoringComplete(scoringComplete)
    },[scoringComplete])

    useEffect(() => {
        if(isSubmitting){ 
            setIsDisabled(true);
        } else {
            setIsDisabled(false)
        }
        if(!selectedFighter && !isSubmitting) setIsDisabled(true)
        
    },[isSubmitting, selectedFighter]);

    useEffect(() => {
        setEvenRound(false)
        if(notSelectedScore === 10){
            setEvenRound(true)
        } 
    },[notSelectedScore])

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

    const handleFighterSelect = id => {
        setSelectedFighter(id)
        setNotSelectedScore(9)
    }

    const submitScores = () => {
        const [fighter1, fighter2] = fighters;
        const notSelected = selectedFighter === fighter1.fighterId ? fighter2.fighterId : fighter1.fighterId;
        const { scorecardId } = fighterScores
        const update = {
            round,
            scorecardId,
            [notSelected]: notSelectedScore,
            [selectedFighter]: 10
        };
        const scoringIsComplete = (round+1)  > totalRounds;
        submitRoundScores(update);
        setSelectedFighter('');
        setNotSelectedScore(9)
        setScoringComplete(scoringIsComplete)
    }

    return (
        <Flex 
            id="scoring_main"
            display={tabs.scoring || tabs.all ? 'flex' : 'none'}
            p={["0", "2"]} 
            m="auto"
            mt="0"
            flexDir="column" 
            justifyContent="flex-end"
            w="100%"  
            position="relative"  
        >
            <Flex     
                back       
                flexDir={["row"]} 
                w={["100%"]} 
                m="auto"
                _before={{
                    content: "''",
                    background: `url(${image})`,
                    opacity: "0.3",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    position: "absolute",
                    zIndex: "1"
                }}
            >
            {
                fighters.length > 0 && fighters.map( (fighter, i) => (
                    <FighterSwipe
                        evenRound={evenRound}
                        fighter={fighter}
                        handleFighterSelect={handleFighterSelect}
                        key={i}
                        notSelectedScore={notSelectedScore}
                        redCorner={fighters[0].fighterId === selectedFighter}
                        scoringComplete={userScoringComplete}
                        selectedFighter={selectedFighter}
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
        </Flex> 
    )
}