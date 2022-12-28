import { useState, useEffect } from 'react'
import { 
    Button,
    Flex,
    Heading
} from '@chakra-ui/react'
import { FighterSwipe } from '../fighter-swipe'
import { UserScorecard } from './user-scorecard'
import { useGlobalStore } from '../../stores'
import image from '../../image/boxing-background.png'

export const ScoringMain = ({ 
    isSubmitting,
    tabs,
}) => {
    const [userScoringComplete, setUserScoringComplete] = useState(false);
    const [evenRound, setEvenRound] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedFighter, setSelectedFighter] = useState('');
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    
    const {
        activeGroupScorecard,
        fightComplete,
        fighterScores,
        lastScoredRound,
        scoringComplete,
        setScoringComplete,
        submitRoundScores,
        totalRounds,
        userScorecard,
    } = useGlobalStore();

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

    const handleFighterSelect = id => {
        setSelectedFighter(id)
        setNotSelectedScore(9)
    }

    const submitScores = () => {
        const [fighter1, fighter2] = activeGroupScorecard?.fighters;
        const notSelected = selectedFighter === fighter1.fighterId ? fighter2.fighterId : fighter1.fighterId;
        const { scorecardId } = fighterScores
        const roundScores = {
            round: lastScoredRound+ 1,
            scorecardId,
            [notSelected]: notSelectedScore,
            [selectedFighter]: 10
        };
        const scoringIsComplete = (lastScoredRound + 1)  > totalRounds;
        submitRoundScores(roundScores);
        setSelectedFighter('');
        setNotSelectedScore(9)
        setScoringComplete(scoringIsComplete)
    }

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

    console.log('userScorecard: ', userScorecard)
    const { fighters } = activeGroupScorecard?.fighters ? activeGroupScorecard.fighters : [];
    return (
        <Flex 
            id="scoring_main"
            display={tabs.scoring || tabs.all ? 'flex' : 'none'}
            p={["0", "0"]} 
            flex="1 0 50%"
            m="auto"
            mt="0"
            flexDir="column" 
            justifyContent="flex-start"
            w="100%"  
            position="relative"  
            minH={tabs.info ? "75vh" : "100%"}
        >
            <Flex     
                flexDir={["column"]} 
                w={["100%"]} 
                position="relative"
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
                <Flex
                    id="fighter_swipe"
                    flexDir="row"
                    w="100%"
                    textAlign="center"
                    alignItems="flex-end"
                    justifyContent="space-around"
                >
                    { activeGroupScorecard?.fighters?.length > 0 && activeGroupScorecard?.fighters.map( (fighter, _i) => (
                            <FighterSwipe
                                evenRound={evenRound}
                                fighter={fighter}
                                handleFighterSelect={handleFighterSelect}
                                key={_i}
                                notSelectedScore={notSelectedScore}
                                redCorner={activeGroupScorecard?.fighters[0]?.fighterId === selectedFighter}
                                scoringComplete={userScoringComplete}
                                selectedFighter={selectedFighter}
                            />
                        ))
                    }
                </Flex>
            </Flex>
            <Flex     
                flexDir={["row"]} 
                w={["100%"]} 
            >
                { activeGroupScorecard?.fighters?.length > 0 && activeGroupScorecard?.fighters.map( (fighter, _i) => (
                    <UserScorecard
                        fighter={fighter}
                        id={fighter.fighterId}
                        key={fighter.fighterId}
                        selectedFighter={selectedFighter}
                    />
                    
                ))}
            </Flex>
            <Flex
                w="100%"
                p="4"
                pt="0"
                maxW="100%"
                m="auto"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
            >
                { userScorecard?.scores.length > 0 && userScorecard.scores.map( (roundObj, _i) => {
                    // console.log('roundObj: ', roundObj)
                    const score0 = roundObj[activeGroupScorecard.fighters[0].fighterId]
                    const score1 = roundObj[activeGroupScorecard.fighters[1].fighterId]

                    return (
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDir="row"
                            w="100%"
                            // py="1"
                            p="1"
                            pt="0"
                            borderBottom="1px solid #202020"
                        >
                            <Flex
                                flex="1 0 50%"
                                m="auto"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Heading
                                    color={score0 > score1 ? 'yellow.300' : 'whiteAlpha.800'}
                                    as="h3"
                                    size="lg"
                                >

                                    {score0}
                                </Heading>
                            </Flex>
                            <Flex
                                flex="1 0 10%"
                            >
                                <Heading
                                    color="gray.400"
                                    as="h3"
                                    size="sm"
                                    alignItems="center"
                                    justifyContent="center"
                                    m="auto"
                                >

                                    {_i+1}
                                </Heading>
                            </Flex>
                            <Flex
                                flex="1 0 45%"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Heading
                                    as="h3"
                                    size="lg"
                                    color={score1 > score0 ? 'yellow.300' : 'whiteAlpha.800'}
                                >

                                    {score1}
                                </Heading>
                            </Flex>
                            { _i === 0}
                        </Flex>
                    )
                    })
                }

            </Flex>
            <Button
                zIndex={100}
                onClick={submitScores}
                // disabled={isDisabled || fightComplete} 
                // variant={isDisabled ? "outline" : "solid"} 
                colorScheme="solid" 
                mx="auto" 
                mt="8"
                minH="3rem"
                fontSize="1.3rem"
                fontWeight="bold"
                w={["80%","70%"]}
            >
                { isDisabled && fightComplete ? `Scoring Complete` : `Round ${userScorecard?.scores.length + 1}` }
            </Button>
        </Flex> 
    )
}