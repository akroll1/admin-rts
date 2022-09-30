import React, {useEffect, useState} from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { AddGuestJudgeModal, AddMemberModal, ExpiredTokenModal, MoneylineModal, PredictionModal } from '../components/modals'
import { predictionIsLocked } from '../utils'
import { ScoringSidebarLeft, ScoringSidebarRight } from '../components/sidebars'
import { capFirstLetters, FIGHT_STATUS_CONSTANTS } from '../utils'
import { ScoringMain, ScoringTabs } from '../components/scoring-main'
import { useStateStore, useScorecardStore, useScoringStore } from '../stores'
import { useWindowResize } from '../hooks'

const Scoring = () => {

    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');
    //////////////////  SCORE STATE /////////////////////////
    const { 
        chatScorecard, 
        setChatScorecard, 
        setStats, 
        tokenConfig, 
        user 
    } = useStateStore();
    const { 
        activeGroupScorecard,
        fight,
        fightComplete,
        fighters,
        fighterScores,
        scorecards,
        scoredRounds,
        setFightComplete,
        setScoredRounds,
        setFighterScores,
        show,
        userScorecard,
        fetchGroupScorecard,
    } = useScorecardStore();
    const { 
        collateTableData,
        guestJudgeScorecards,
        fetchGuestJudgeScorecards,
        fetchPanelProps,
        panelProps,
        prediction,
        setPrediction
    } = useScoringStore();
    const { sub, email, username } = user;
    const [tabs, setTabs] = useState({
        sidebar: false,
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
    // const [fightComplete, setFightComplete] = useState(false);
    //////////////////  MODALS  /////////////////////////
    const [modals, setModals] = useState({
        addMemberModal: false,
        addGuestJudgeModal: false,
        expiredTokenModal: false,
        moneylineModal: false,
        predictionModal: false,
    })

    const [props, setProps] = useState(null);
    const [needsPrediction, setNeedsPrediction] = useState(false);
    const [usernameAndUserId, setUsernameAndUserId] = useState([]);
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
                    sidebar: true,
                    scoring: true, 
                    table: true,
                    chat: true,
                    analytics: true
                })
            } else {
                setTabs({
                    sidebar: false,
                    scoring: true, 
                    table: false,
                    chat: false,
                    analytics: false
                })
            }
        }
        getWindowWidth();
    },[windowWidth])

    useEffect(() => {
        fetchGroupScorecard(groupscorecard_id)
    },[])

    useEffect(() => {
        if(fight?.guestJudgeIds.length > 0){
            fetchGuestJudgeScorecards()
        }
    },[fight])

    useEffect(() => {
        collateTableData()
    },[scorecards])

    // const submitRoundScores = scoreUpdate => {
    //     if(fightComplete) return
    //     setIsSubmitting(true)
    //     const totalRounds = fight.totalRounds;
    //     const url = process.env.REACT_APP_SCORECARDS + `/${userScorecard.scorecardId}`
    //     let update = {};
    //     for(const [key, val] of Object.entries(fighterScores)){
    //         if(key !== 'scorecardId'){
    //             update[key] = val   
    //         }
    //     }
    //     update = {
    //         ...update,
    //         ...scoreUpdate
    //     };

    //     setChatScorecard(update);

    //     return axios.put(url, update, tokenConfig)
    //         .then( res => {
    //             if(res.status === 200){
    //                 // UPDATES.
    //                 setFighterScores({ ...fighterScores, round: fighterScores.round + 1, [fighters[0].lastName]: 10, [fighters[1].lastName]: 10 }); 
    //                 const fightIsComplete = fighterScores.round + 1 > totalRounds;
    //                 setScoredRounds(fightIsComplete ? totalRounds : fighterScores.round);
        
    //                 if(fightIsComplete){
    //                     setFightComplete(true);
    //                     setFightStatus(FIGHT_STATUS_CONSTANTS.COMPLETE)
    //                     alert('FIGHT COMPLETE')
    //                 }
    //             }
    //         })
    //         .catch( err => console.log(err))
    //         .finally(() => setIsSubmitting(false))
    // };
    // submit fight prediction.

    const handleOpenAddMemberSubmitModal = () => {
        if(userScorecard.ownerId !== groupScorecard.ownerId){
            return toast({ 
                title: `Only group admin can add members.`,
                duration: 5000,
                status: 'info',
                isClosable: true
            })
        }
        setModals({ ...modals, addMemberModal: true });
    }
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
        return await axios.put(groupScorecardsUrl, update, tokenConfig)
            .then( res => {
                setModals( modals => ({ ...modals, addMemberModal: false }));
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
        >         
            <Flex>
                
                <AddGuestJudgeModal 
                    modals={modals}
                    setModals={setModals} 
                    fetchGuestJudgeScorecards={fetchGuestJudgeScorecards}
                />
                <AddMemberModal 
                    modals={modals}
                    setModals={setModals} 
                    handleAddMemberSubmit={handleAddMemberSubmit}
                    isSubmitting={isSubmitting}
                />
                <ExpiredTokenModal 
                    modals={modals}
                    setModals={setModals} 
                />
                <MoneylineModal
                    modals={modals}
                    props={props}
                    setModals={setModals} 
                />
                <PredictionModal 
                    modals={modals}
                    setModals={setModals} 
                />
            </Flex>
            <Flex 
                display={windowWidth < 768 ? tabs.table ? 'none' : 'flex' : 'flex'} 
                mb="3rem"
                w="100%" 
                minH="60vh"  
                maxH="60vh"
            >
                <ScoringSidebarLeft
                    handleOpenAddMemberSubmitModal={handleOpenAddMemberSubmitModal}
                    modals={modals}
                    setModals={setModals}
                    tabs={tabs}
                    usernameAndUserId={usernameAndUserId}
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
                    // setIncomingScore={setIncomingScore}
                    chatScorecard={chatScorecard}
                    tokenConfig={tokenConfig}
                    username={username}

                />
            </Flex>
            <ScoringTable tabs={tabs} />

            <ScoringTabs tabs={tabs} setTabs={setTabs} />
        </Flex>
    )

}
export default Scoring