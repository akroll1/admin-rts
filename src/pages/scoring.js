import { useEffect, useState } from 'react'
import { 
    Flex, 
    Heading,
    Skeleton,
    Stack
} from '@chakra-ui/react'
import { ScoringTable } from '../components/tables'
import { 
    AddGuestJudgeModal, 
    AddMemberModal, 
    MoneylineModal, 
    PredictionModal 
} from '../components/modals'
import { ChatSidebar, ScoringSidebarLeft } from '../components/sidebars'
import { ScoringMain, ScoringTabs } from '../components/scoring-main'
import { TabsEnum, useGlobalStore } from '../stores'
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
        lastScoredRound,
        modals,
        setTabs,
        setToast,
        tabs,
        totalRounds,
    } = useGlobalStore();

    const windowWidth = useWindowResize();

    useEffect(() => {
        fetchGroupScorecardSummary(fightId, groupScorecardId)
        // fetchPanelProps()
        // const fetchLatest = setInterval(() => {
        //     fetchGroupScorecardSummary(fightId, groupScorecardId)
        // },30000)
        // return () => clearTimeout(fetchLatest)
    },[])

    useEffect(() => {
        const getWindowWidth = () => {
            if(windowWidth >= 768){
                setTabs(TabsEnum.ALL)
            } else {
                setTabs(TabsEnum.SCORING)
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

    const handleRealTimeSwitchClick = () => {
        if(activeGroupScorecard?.groupScorecard?.chatKey){
            const toast = {
                title: 'Real-Time Updates Enabled',
                status: 'success',
                duration: 5000,
                isClosable: true,
            }
            setToast(toast)
        }
        if(!activeGroupScorecard?.groupScorecard?.chatKey){
            const toast = {
                title: 'Real-Time Updates Disabled',
                description: 'Please upgrade to allow real-time updates.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            }
            setToast(toast)
        }
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
            p={["1", "2", "4"]}
            pt={["2", "4", "8", "12"]}
            bg="transparent"
            position="relative"
            maxW="100%"
            boxSizing='border-box'
            overflow="hidden"
            flex="1"
        >       
            <Heading
                mb={["2","2","4"]}
                display={tabs[TabsEnum.CHAT] || tabs[TabsEnum.TABLE]  || tabs[TabsEnum.ALL] ? 'flex' : 'none'}
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
                boxSizing="border-box"
                display={windowWidth < 768 ? tabs[TabsEnum.TABLE] ? 'none' : 'flex' : 'flex'} 
                flexWrap="wrap"
                w="100%" 
                maxW="100%"
                maxH={["100vh", "60vh", "70vh"]}
                mb="4"
            >
                <ScoringSidebarLeft />
                <ScoringMain />
                <ChatSidebar />
            </Flex>
            <ScoringTable />
            <ScoringTabs />
        </Flex>
    )

}
export default Scoring