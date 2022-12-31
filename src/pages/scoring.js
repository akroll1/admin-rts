import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
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

    const [notification, setNotification] = useState(true)

    const [tabs, setTabs] = useState({
        info: false,
        scoring: true, 
        table: false,
        chat: false,
        analytics: false
    });
    const windowWidth = useWindowResize();

    useEffect(() => {
        fetchGroupScorecardSummary(fightId, groupScorecardId)
        // fetchPanelProps()
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

    const postNotification = () => {
        setNotification(true)

    }
    
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
            position="relative"
            maxW="100%"
            boxSizing='border-box'
        >       
            <Heading
                tabs={tabs} 
                centered={tabs.all ? true : false}
                mb={["2","2","4"]}
            >
                {`Round ${lastScoredRound >= totalRounds ? totalRounds : lastScoredRound + 1}`}
            </Heading>
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
                maxH="70vh"
            >

                <ScoringSidebarLeft
                    tabs={tabs}
                />
                <ScoringMain
                    fightComplete={fightComplete}
                    fighters={activeGroupScorecard?.fighters}
                    fighterScores={fighterScores} 
                    postNotification={postNotification}
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