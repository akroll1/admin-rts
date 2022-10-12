import React, {useEffect, useState} from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { AddGuestJudgeModal, AddMemberModal, ExpiredTokenModal, MoneylineModal, PredictionModal } from '../components/modals'
import { ScoringSidebarLeft, ScoringSidebarRight } from '../components/sidebars'
import { ScoringMain, ScoringTabs } from '../components/scoring-main'
import { useScorecardStore, useScoringStore } from '../stores'
import { useWindowResize } from '../hooks'

const Scoring = () => {

    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');
    //////////////////  SCORE STATE /////////////////////////
    const { 
        accessToken,
        chatScorecard,
        collateTableData,
        fetchGroupScorecard,
        fight,
        fightComplete,
        fighters,
        fighterScores,
        modals,
        setModals,
        tokenExpired,
    } = useScorecardStore();

    const { 
        fetchGuestJudgeScorecards,
        fetchPanelProps,
        panelProps,
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
    const [groupScorecard, setGroupScorecard] = useState({
        totalRounds: '', 
        fighterA: '', 
        fighterB: '', 
        scorecardName: '',
    });

    const [props, setProps] = useState(null);
    const groupScorecardsUrl = process.env.REACT_APP_API + `/group-scorecards/${groupscorecard_id}/summary`;

    useEffect(() => {
        if(modals.moneylineModal){
            fetchPanelProps()
        }
    }, [modals])

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
        fetchGroupScorecard(groupscorecard_id)
    },[])
    
    useEffect(() => {
        if(tokenExpired){
            setModals('expiredTokenModal', true)
        }
    },[tokenExpired])

    useEffect(() => {
        collateTableData()
    },[chatScorecard])

    useEffect(() => {
        if(fight?.guestJudgeIds?.length > 0){
            fetchGuestJudgeScorecards()
        }
    },[fight])


    const handleAddMemberSubmit = async email => {
        setIsSubmitting(true);
        const { admin, groupScorecardId, groupScorecardName, fightId } = groupScorecard;
        const fighterIds = fighters.map( ({ fighterId }) => fighterId);
        const update = {
            admin,
            fighterIds,
            fightId,
            groupScorecardId,
            groupScorecardName, // for email.
            members: [email], // for alignment of createMemberScorecards, server.
            rounds: fight.totalRounds,
            username: email
        }
        return await axios.put(groupScorecardsUrl, update, accessToken)
            .then( res => {
                setModals('addMemberModal', false);
                if(res.status === 200){
                    return toast({ 
                        title: `Email invite was sent to member.`,
                        duration: 5000,
                        status: 'success',
                        isClosable: true
                    })
                }
            }).catch( err => console.log(err))
            .finally(() => setIsSubmitting(false))
    };

    return (
        <Flex 
            id="scoring"
            w="100%" 
            flexDirection="column" 
            color="white" 
            alignItems="center" 
            justifyContent="center" 
            margin="auto" 
            p="4"
            bg="inherit"
        >         
            <Flex>
                
                <AddGuestJudgeModal 
                    fetchGuestJudgeScorecards={fetchGuestJudgeScorecards}
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
                mb="3rem"
                w="100%" 
                minH="60vh"  
                maxH="60vh"
            >
                <ScoringSidebarLeft
                    tabs={tabs}
                />
                <ScoringMain
                    fightComplete={fightComplete}
                    fighters={fighters}
                    fighterScores={fighterScores} 
                    isSubmitting={isSubmitting}
                    tabs={tabs}
                    totalRounds={fight?.totalRounds}
                />
                <ScoringSidebarRight
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