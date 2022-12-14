import {useEffect, useState} from 'react'
import { 
    Flex, 
    useToast 
} from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { 
    AddGuestJudgeModal, 
    AddMemberModal, 
    ExpiredTokenModal, 
    MoneylineModal, 
    PredictionModal 
} from '../components/modals'
import { ChatSidebar, ScoringSidebarLeft } from '../components/sidebars'
import { ScoringMain, ScoringTabs } from '../components/scoring-main'
import { useScorecardStore, useScoringStore } from '../stores'
import { useWindowResize } from '../hooks'
import { useParams } from 'react-router'


const Scoring = props => {

    let { fightId, groupScorecardId } = useParams()
    const { 
        activeGroupScorecard,
        chatScore,
        collateTableData,
        fetchGroupScorecardSummary,
        fightComplete,
        fighterScores,
        modals,
    } = useScorecardStore();

    const { 
        fetchGuestJudgeScorecards,
        fetchPanelProps,
    } = useScoringStore();

    const [tabs, setTabs] = useState({
        info: false,
        scoring: true, 
        table: false,
        chat: false,
        analytics: false
    });
    const windowWidth = useWindowResize();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchGroupScorecardSummary(fightId, groupScorecardId)
    },[])

    useEffect(() => {
        // get window width size for scoring tabs.
        const getWindowWidth = () => {
            if(windowWidth >= 768){
                setTabs({
                    info: false,
                    scoring: false, 
                    table: false,
                    chat: false,
                    analytics: false,
                    all: true
                })
            } else {
                setTabs({
                    info: false,
                    scoring: true, 
                    table: false,
                    chat: false,
                    analytics: false,
                    all: false
                })
            }
        }
        getWindowWidth();
    },[windowWidth])

    useEffect(() => {
        if(modals.moneylineModal){
            fetchPanelProps()
        }
    }, [modals])

    useEffect(() => {
        if(chatScore?.scorecardId){
            collateTableData()
        }
    },[chatScore])

    return (
        <Flex 
            id="scoring"
            w="100%" 
            flexDirection="column" 
            color="white" 
            alignItems="center" 
            justifyContent="center" 
            margin="auto" 
            p="2"
            bg="transparent"
            maxW="100%"
            boxSizing='border-box'
        >         
            <Flex>
                
                <AddGuestJudgeModal 
                    fetchGuestJudgeScorecards={() => fetchGuestJudgeScorecards()}
                />
                <AddMemberModal />
                <ExpiredTokenModal />
                <MoneylineModal
                    props={props}
                />
                <PredictionModal />
            </Flex>
            <Flex 
                display={windowWidth < 768 ? tabs.table ? 'none' : 'flex' : 'flex'} 
                w="100%" 
                minH="70vh"  
            >
                <ScoringSidebarLeft
                    tabs={tabs}
                />
                <ScoringMain
                    fightComplete={fightComplete}
                    fighters={activeGroupScorecard?.fighters}
                    fighterScores={fighterScores} 
                    isSubmitting={isSubmitting}
                    tabs={tabs}
                    totalRounds={activeGroupScorecard?.fight?.totalRounds}
                />
                <ChatSidebar
                    tabs={tabs}
                />
            </Flex>
            <ScoringTable 
                tabs={tabs} 
            />

            <ScoringTabs 
                tabs={tabs} 
                setTabs={setTabs} 
            />
        </Flex>
    )

}
export default Scoring