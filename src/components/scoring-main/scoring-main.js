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
    const [fighterIds, setFighterIds] = useState(null);
    const [notSelectedScore, setNotSelectedScore] = useState(9);
    const {
        fighterScores,
        fighters,
        lastScoredRound,
        setScoringComplete,
        submitRoundScores,
        tabs,
        totalRounds,
    } = useGlobalStore();

    useEffect(() => {
        setEvenRound(false)
        if(notSelectedScore === 10){
            setEvenRound(true)
        } 
    },[notSelectedScore])

    useEffect(() => {
        if(fighters?.length === 2){
            setFighterIds({
                fighter1Id: fighters[0].fighterId,
                fighter2Id: fighters[1].fighterId,
                selectedFighterId: null
            })
        }
    },[fighters])

    const handleFighterSelect = fighterId => {
        setFighterIds({ 
            ...fighterIds, 
            selectedFighterId: fighterId
        })
        setNotSelectedScore(9)
    }

    const submitScores = () => {
        const notSelected = fighterIds.selectedFighterId !== fighterIds.fighter1Id ? fighterIds.fighter1Id : fighterIds.fighter2Id;
        const { scorecardId } = fighterScores
        const roundScores = {
            round: lastScoredRound+ 1,
            scorecardId,
            [fighterIds.selectedFighterId]: 10,
            [notSelected]: notSelectedScore,
        };
        const scoringIsComplete = (lastScoredRound + 1)  > totalRounds;
        submitRoundScores(roundScores);
        setFighterIds({ 
            ...fighterIds, 
            selectedFighterId: null
        });
        setNotSelectedScore(9)
        setScoringComplete(scoringIsComplete)
    }

    const handleAdjustScore = (e,fighterId) => {
        const { id } = e.currentTarget;
        if(!fighterIds.selectedFighterId || fighterId == fighterIds.selectedFighterId || notSelectedScore == 10) return
        if(id === 'increment'){
            if(notSelectedScore >= 10) return;
            setNotSelectedScore(prev => prev + 1)
        }
        if(id === 'decrement'){
            if(notSelectedScore <= 6) return;
            setNotSelectedScore(prev => prev -1)
        }
    }

    return (
        <Flex 
            id="scoring_main"
            display={tabs[TabsEnum.SCORING] || tabs[TabsEnum.ALL] ? 'flex' : 'none'}
            maxW={["100%", "100%","40%", "40%"]}
            flexDir="column" 
            justifyContent="flex-start"
            alignItems="center"
            w="100%"  
            position="relative"  
            boxSizing="border-box"
            minH="80vh"
        >
            <FightStats 
                fighterIds={fighterIds}
            />
            <UserScores
                evenRound={evenRound}
                fighterIds={fighterIds}
                handleAdjustScore={handleAdjustScore}
                notSelectedScore={notSelectedScore}
                setNotSelectedScore={setNotSelectedScore}
                handleFighterSelect={handleFighterSelect}
            />
            <ScoringButtons
                evenRound={evenRound}
                fighterIds={fighterIds}
                handleAdjustScore={handleAdjustScore}
                notSelectedScore={notSelectedScore}
                handleFighterSelect={handleFighterSelect}
                submitScores={submitScores}
            />
        </Flex>
    )
}