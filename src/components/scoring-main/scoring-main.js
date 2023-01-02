import { useState, useEffect } from 'react'
import { 
    Button,
    Flex,
} from '@chakra-ui/react'
import { FighterSwipe } from '../fighter-swipe'
import { FighterNamesHeading } from './fighter-name-heading'
import { TabsEnum, useGlobalStore } from '../../stores'
import { UserScores } from './user-scores'
import image from '../../image/boxing-background.png'

export const ScoringMain = () => {
    const [userScoringComplete, setUserScoringComplete] = useState(false);
    const [evenRound, setEvenRound] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedFighter, setSelectedFighter] = useState('');
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    
    const {
        activeGroupScorecard,
        fightComplete,
        fighterScores,
        isSubmitting,
        lastScoredRound,
        scoringComplete,
        setScoringComplete,
        submitRoundScores,
        tabs,
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

    const handleFighterSelect = fighter => {
        setSelectedFighter(fighter)
        setNotSelectedScore(9)
    }

    const submitScores = () => {
        const [fighter1, fighter2] = activeGroupScorecard?.fighters;
        const notSelected = selectedFighter.fighterId === fighter1.fighterId ? fighter2.fighterId : fighter1.fighterId;
        const { scorecardId } = fighterScores
        const roundScores = {
            round: lastScoredRound+ 1,
            scorecardId,
            [selectedFighter.fighterId]: 10,
            [notSelected]: notSelectedScore,
        };
        const scoringIsComplete = (lastScoredRound + 1)  > totalRounds;
        submitRoundScores(roundScores);
        setSelectedFighter('');
        setNotSelectedScore(9)
        setScoringComplete(scoringIsComplete)
    }

    
    return (
        <Flex 
            id="scoring_main"
            display={tabs[TabsEnum.SCORING] || tabs[TabsEnum.ALL] ? 'flex' : 'none'}
            p={["0", "0"]} 
            flex="1 0 37%"
            m="auto"
            mt="0"
            flexDir="column" 
            justifyContent="flex-start"
            w="100%"  
            position="relative"  
            minH={tabs[TabsEnum.INFO] ? "75vh" : "100%"}
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
                    ))}
                </Flex>
            </Flex>
            <Flex     
                flexDir={["row"]} 
                w={["100%"]} 
            >
                { activeGroupScorecard?.fighters?.length > 0 && activeGroupScorecard?.fighters.map( (fighter, _i) => (
                    <FighterNamesHeading
                        evenRound={evenRound}
                        fighter={fighter}
                        id={fighter.fighterId}
                        key={fighter.fighterId}
                        selectedFighter={selectedFighter}
                    />
                    
                ))}
            </Flex>
            <UserScores
                evenRound={evenRound}
                notSelectedScore={notSelectedScore}
                selectedFighter={selectedFighter}
                setNotSelectedScore={setNotSelectedScore}
                setSelectedFighter={setSelectedFighter}
            />
            <Button
                zIndex={1000}
                onClick={submitScores}
                disabled={isDisabled || fightComplete} 
                variant={isDisabled ? "outline" : "solid"} 
                colorScheme="solid" 
                mx="auto" 
                mt="4"
                fontSize="1.2rem"
                fontWeight="bold"
                // color={selectedFighter.fighterId ? "inherit" : "#FAFAFA"}
                w={["80%", "70%", "60%", "50%"]}
            >
                {isDisabled && fightComplete ? `Scoring Complete` : selectedFighter ? `Score Round ${userScorecard?.scores.length + 1}` : `Select Fighter` }
            </Button>
        </Flex> 
    )
}