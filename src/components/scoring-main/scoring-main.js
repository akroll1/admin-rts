import { useState, useEffect } from 'react'
import { 
    Flex,
} from '@chakra-ui/react'
import { TabsEnum, useGlobalStore } from '../../stores'
import { UserScores } from './user-scores'
import { ScoringButtons } from './scoring-buttons'
import { FightStats } from '../sidebars/chat-sidebar-components'

export const ScoringMain = () => {
    const [evenRound, setEvenRound] = useState(false)
    const [selectedFighter, setSelectedFighter] = useState('');
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    
    const {
        activeGroupScorecard,
        fightComplete,
        fighterScores,
        isSubmitting,
        lastScoredRound,
        setScoringComplete,
        submitRoundScores,
        tabs,
        totalRounds,
        userScorecard,
    } = useGlobalStore();

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


    const clearSelectedFighter = () => {
        setSelectedFighter('')
        setNotSelectedScore('9')
    }

    const handleAdjustScore = (e,fighterId) => {
        const { id } = e.currentTarget;
        if(!selectedFighter?.fighterId || fighterId == selectedFighter?.fighterId || notSelectedScore == 10) return
        if(id === 'increment'){
            if(notSelectedScore >= 10) return;
            setNotSelectedScore(prev => prev + 1)
        }
        if(id === 'decrement'){
            if(notSelectedScore <= 6) return;
            setNotSelectedScore(prev => prev -1)
        }
    }

    const [fighter1, fighter2] = activeGroupScorecard?.fighters?.length === 2 ? activeGroupScorecard.fighters : [];
    console.log('selectedFighter: ', selectedFighter)
    return (
        <Flex 
            id="scoring_main"
            display={tabs[TabsEnum.SCORING] || tabs[TabsEnum.ALL] ? 'flex' : 'none'}
            maxW={["100%", "100%","40%", "40%"]}
            flexDir="column" 
            justifyContent="flex-start"
            w="100%"  
            position="relative"  
            boxSizing="border-box"
            maxH="70vh"
            mb="4rem"
        >
            {/* <Heading
                py="1"
                textAlign="center"
            >
                {lastScoredRound ? `Round ${lastScoredRound + 1}` : `Round`}
            </Heading> */}
            <FightStats 
                selectedFighterId={selectedFighter?.fighterId}
            />
            <UserScores
                evenRound={evenRound}
                notSelectedScore={notSelectedScore}
                selectedFighter={selectedFighter}
                setNotSelectedScore={setNotSelectedScore}
                submitScores={submitScores}
                handleAdjustScore={handleAdjustScore}
                setSelectedFighter={setSelectedFighter}
                clearSelectedFighter={clearSelectedFighter}
                fighter1Id={fighter1?.fighterId}
                fighter2Id={fighter2?.fighterId}
            />
            <ScoringButtons
                clearSelectedFighter={clearSelectedFighter}
                evenRound={evenRound}
                handleAdjustScore={handleAdjustScore}
                fighter1Id={fighter1?.fighterId}
                fighter2Id={fighter2?.fighterId}
                notSelectedScore={notSelectedScore}
                selectedFighter={selectedFighter}
                handleFighterSelect={handleFighterSelect}
                submitScores={submitScores}
            />
        </Flex>
    )
}