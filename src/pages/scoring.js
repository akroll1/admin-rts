import { useEffect, useState } from 'react'
import { 
    Flex, 
    Heading,
} from '@chakra-ui/react'
import { ScoringTable } from '../components/tables'
import { 
    AddGuestJudgeModal, 
    AddMemberModal, 
    MoneylineModal, 
    PredictionModal 
} from '../components/modals'
import { ChatSidebar, ScoringSidebarLeft } from '../components/sidebars'
import { ScoringMain, ScoringTabs } from '../components/scoring/scoring-main'
import { TabsEnum, useGlobalStore } from '../stores'
import { useWindowResize } from '../hooks'
import { useParams } from 'react-router'

const Scoring = props => {

    let { fightId, groupScorecardId } = useParams()
    const { 
        activeGroupScorecard,
        fetchGroupScorecardSummary,
        lastScoredRound,
        setTabs,
        setToast,
        tabs,
        totalRounds,
    } = useGlobalStore();

    const windowWidth = useWindowResize();

    useEffect(() => {
        fetchGroupScorecardSummary(fightId, groupScorecardId)
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
            p={["1", "2", "2", "4"]}
            bg="transparent"
            position="relative"
            maxW="100%"
            boxSizing='border-box'
            overflow="hidden"
        >       
            <Heading
                size={["md", "md", "md", "lg"]}
                mb={["0","2","2"]}
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
                display={tabs[TabsEnum.TABLE] ? 'none' : 'flex'} 
                flexWrap="wrap"
                w="100%" 
                maxW="100%"
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