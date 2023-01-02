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
        chatScore,
        collateTableData,
        fetchBettingProps,
        fetchGroupScorecardSummary,
        fetchPanelProps,
        isSubmitting,
        lastScoredRound,
        modals,
        setTabs,
        tabs,
        totalRounds,
    } = useGlobalStore();

    const windowWidth = useWindowResize();

    useEffect(() => {
        fetchGroupScorecardSummary(fightId, groupScorecardId)
        // fetchPanelProps()
    },[])

    useEffect(() => {
        // get window width size for scoring tabs.
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
                mb={["2","2","4"]}
                display={tabs[TabsEnum.CHAT] || tabs[TabsEnum.TABLE] ? 'flex' : 'none'}
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
                display={windowWidth < 768 ? tabs[TabsEnum.TABLE] ? 'none' : 'flex' : 'flex'} 
                w="100%" 
                h="auto"
                maxH="70vh"
                mb="4"
            >

                <ScoringSidebarLeft />
                { isSubmitting 
                    ?
                        <Stack 
                            w="100%"
                            p="1"
                            borderRadius="3px"
                        >
                            <Skeleton height='20%' />
                            <Skeleton height='50%' />
                            <Skeleton height='30%' />
                        </Stack> 
                    :
                        <ScoringMain />
                }
                <ChatSidebar />
            </Flex>
            <ScoringTable />
            <ScoringTabs />
        </Flex>
    )

}
export default Scoring