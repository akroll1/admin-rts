import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { ScoringTable } from '../components/tables'
import { 
    AddGuestJudgeModal, 
    AddMemberModal, 
    MoneylineModal, 
    PredictionModal 
} from '../components/modals'
import { ChatSidebar, ScoringSidebarLeft } from '../components/sidebars'
import { ScoringMain, ScoringTabs } from '../components/scoring-main'
import { useGlobalStore } from '../stores'
import { useWindowResize } from '../hooks'
import { useParams } from 'react-router'
import { ScoringDividerWithText } from '../components/tables/table-els/scoring-divider-with-text'


const Scoring = props => {

    let { fightId, groupScorecardId } = useParams()
    const { 
        activeGroupScorecard,
        chatScore,
        collateTableData,
        fetchBettingProps,
        fetchGroupScorecardSummary,
        fetchPanelProps,
        fightComplete,
        fighterScores,
        lastScoredRound,
        modals,
        totalRounds,
    } = useGlobalStore();

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
        fetchPanelProps()
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
            fetchBettingProps()
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
        >       <ScoringDividerWithText 
                    text={`Round ${lastScoredRound >= totalRounds ? totalRounds : lastScoredRound + 1}`}
                    tabs={tabs} 
                    centered={tabs.all ? true : false}
                />
                <AddGuestJudgeModal />
                <AddMemberModal />
                <MoneylineModal
                    props={props}
                />
                <PredictionModal />
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