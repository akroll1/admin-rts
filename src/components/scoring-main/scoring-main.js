import { useState, useEffect } from 'react'
import { Button, Flex, Heading } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { FighterSwipe } from '../fighter-swipe'
import { useScorecardStore } from '../../stores'
import image from '../../image/boxing-background.png'

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
        currentRound,
        fighters,
        fighterScores,
        scoringComplete,
        setScoringComplete,
        submitRoundScores,
        totalRounds,
    } = useScorecardStore();
    
    useEffect(() => {
        setRound(parseInt(currentRound))
    },[currentRound])

    useEffect(() => {
        setUserScoringComplete(scoringComplete)
    },[scoringComplete])

    // useEffect(() => {
    //     if(userScoringComplete || fighterScores.round === currentRound){
    //         setIsDisabled(true)
    //         return setRound(totalRounds);
    //     }
    //     return round >= totalRounds ? setRound(parseInt(totalRounds)) : setRound(parseInt(fighterScores.round));

    // }, [fighterScores])

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
    // console.log('fighters: ', fighters)
    // console.log('selectedFighter: ', selectedFighter)
    // console.log('currentRound: ', currentRound)
    return (
        <Flex
        w="100%"
        h="100%"
        >
        <Flex 
            id="scoring-main"
            display={tabs.scoring || tabs.all ? 'flex' : 'none'}
            p={["0", "2"]} 
            m="auto"
            flexDir="column" 
            justifyContent="flex-end"
            w="100%"
            backgroundImage={`url(${image})`}  
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
                {`Round ${ round >= totalRounds ? totalRounds : round }`}
            </Heading> 
            <Flex            
                flexDir={["row"]} 
                w={["100%"]} 
                m="auto"
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
                    // mt="8" 
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
        </Flex> 
    )
}