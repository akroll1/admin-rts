import React, {useEffect, useState} from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { AddGuestJudgeModal, AddMemberModal, ExpiredTokenModal, MoneylineModal, PredictionModal } from '../components/modals'
import {  } from '../components/sidebars'
import { predictionIsLocked } from '../utils'
import { useLocation, useNavigate } from 'react-router'
import { ScoringSidebarLeft, ScoringSidebarRight } from '../components/sidebars'
import { capFirstLetters, FIGHT_SHOW_STATUS_CONSTANTS } from '../utils'
import { ScoringMain, ScoringTabs } from '../components/scoring-main'
import { stateStore } from '../stores'
import { useWindowResize } from '../hooks'

const Scoring = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');
    //////////////////  SCORE STATE /////////////////////////
    const { chatScorecard, myGuestJudges, setAvailableGuestJudges, setChatScorecard, setStats, tokenConfig, user } = stateStore.getState();
    const { sub, email, username } = user?.sub ? user : '';
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
    const [incomingScore, setIncomingScore] = useState({});
    const [scorecards, setScorecards] = useState(null);
    const [userScorecard, setUserScorecard] = useState({});
    const [tableData, setTableData] = useState([]);
    const [scoredRounds, setScoredRounds] = useState('');
    const [totalRounds, setTotalRounds] = useState(0);
    const [sliderScores, setSliderScores] = useState({});
    const [onlyShowToCurrentRound, setOnlyShowToCurrentRound] = useState(false);
    const [chatKey, setChatKey] = useState(null);
    const [fightStatus, setFightStatus] = useState(null);
    const [fightComplete, setFightComplete] = useState(false);
    //////////////////  MODALS  /////////////////////////
    const [modals, setModals] = useState({
        addMemberModal: false,
        addGuestJudgeModal: false,
        expiredTokenModal: false,
        moneylineModal: false,
        predictionModal: false,
    })
    //////////////////  SIDEBAR  /////////////////////////
    const [needsPrediction, setNeedsPrediction] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [predictionLock, setPredictionLock] = useState(true);
    const [showData, setShowData] = useState(null);
    const [fighterData, setFighterData] = useState([]);

    //////////////////  URL'S /////////////////////////
    const groupScorecardsUrl = process.env.REACT_APP_GROUP_SCORECARDS + `/${groupscorecard_id}`;

    useEffect(() => {
        if(!user?.sub){
            navigate('/signin', { replace: true}, {state:{ path: location.pathname}})
        } 
    },[user]) 
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
        // 1. Fetch Group Scorecard.
        const fetchGroupScorecard = async () => {
            const res = await axios.get(groupScorecardsUrl, tokenConfig)
                .then( res => res).catch( err => console.log(err));
            console.log('res.data: ', res.data);
            if(typeof res.data === 'string' && res.data.includes('Token expired')){
                console.log('Token is expired.')
                return setModals( modals => ({ ...modals, expiredTokenModal: true }))
            }
            if(res.data === 'No scorecard found.'){
                alert('No Scorecard Found');
                return;
            }
            // 2. Set groupScorecard scorecards, showData, guestScorers, chatKey.
            setGroupScorecard(res.data.groupScorecard);
            setFighterData(res.data.fighterData);
            setScorecards(res.data.scorecards);
            setShowData({
                show: res.data.show,
                fight: res.data.fight
            });
            
            // Get THIS USER'S scorecard.
            const [thisUserScorecard] = res.data.scorecards?.filter( ({ ownerId }) => ownerId === email || ownerId === sub);
            console.log('thisUserScorecard', thisUserScorecard);
            if(!thisUserScorecard) return alert('No scorecard found.')
            setUserScorecard(thisUserScorecard);
            // predictions.
            const needsPrediction = !thisUserScorecard.prediction && (res.data.show.showTime > Date.now());
            if(needsPrediction){
                setTimeout(() => {
                    setNeedsPrediction(true); 
                    setModals( modals => ({ ...modals, predictionModal: true })) 
                },5000);
            }
            if(thisUserScorecard.prediction){
                const transformPredictionData = () => {
                    const { prediction } = thisUserScorecard;
                    const [fighter] = res.data.fighterData.filter( data => {
                        const { fighterId, lastName } = data;
                        const transformedPrediction = `${capFirstLetters(lastName)}, ${prediction.split(',')[1]}`; 
                        if(prediction.includes(fighterId)){
                            return setPrediction(transformedPrediction);
                        }
                    });
                }
                transformPredictionData();
            }
            
            setAvailableGuestJudges(res.data.guestJudges?.length > 0 ? res.data.guestJudges : []);
            setChatKey(res.data.groupScorecard.chatKey);
            setTotalRounds(res.data.fight.rounds);

            const findScoredRounds = thisUserScorecard => {
                const scored = thisUserScorecard.scores.length;
                if(scored + 1 > res.data.fight.rounds){
                    setFightComplete(true);
                    return res.data.fight.rounds
                }
                return scored;
            }
            const round = findScoredRounds(thisUserScorecard);
            setScoredRounds(round);
            const [fighter1, fighter2] = res.data.fighterData.map( ({ lastName }) => {
                return ({
                    [lastName]: 10
                })
            })
            setSliderScores({ ...fighter1, ...fighter2, round, scorecardId: thisUserScorecard.scorecardId });
        }
        fetchGroupScorecard();
        
        // const sync = setInterval(() => {
        //     fetchGroupScorecard();
        //     if(sync) return;
        //     sync();
        // }, 30000);

    },[]);

    useEffect(() => {
        if(scorecards?.length > 0){
            const getTableData = scorecards => {
                const s = scorecards.map( scorecard => {
                    let { username, prediction, scores } = scorecard;
                    const [fighter1, fighter2] = fighterData;
                    const sortRoundAscending = (a, b) => a.round - b.round;
                    if(prediction){
                        const index = prediction.indexOf(',');
                        prediction = prediction.slice(0, index) === fighter1.fighterId ? `${fighter1.lastName},${prediction.slice(index+1)}` : `${fighter2.lastName},${prediction.slice(index+1)}`;
                    }

                    const totals = scores.reduce( (acc, curr) => {
                        if(curr[fighter1.lastName]){
                            acc[fighter1.lastName] += curr[fighter1.lastName];
                        }
                        if(curr[fighter2.lastName]){
                            acc[fighter2.lastName] += curr[fighter2.lastName];
                        }
                        return acc;
                    },{
                        [fighter1.lastName]: 0,
                        [fighter2.lastName]: 0
                    });
                    const mappedScores = scores.map( score => {
                        const { round } = score;
                        const f1name = fighter1.lastName;
                        const f2name = fighter2.lastName;
                        return ({
                            round,
                            [f1name]: score[fighter1.lastName] ? score[fighter1.lastName] : 0,
                            [f2name]: score[fighter2.lastName] ? score[fighter2.lastName] : 0
                        })
                    })
                    .sort(sortRoundAscending);
                   
                    return ({
                        mappedScores,
                        username,
                        totals,
                        fighters: [fighter1.lastName, fighter2.lastName],
                        prediction
                    })
                })
                setTableData(s);
                setStats(s)
            }; 
            if(incomingScore.scorecardId){     
                let [scorecard] = scorecards.filter( scorecard => scorecard.scorecardId === incomingScore.scorecardId);
                const otherScorecards = scorecards.filter( scorecard => scorecard.scorecardId !== incomingScore.scorecardId) 
                const tempScores = scorecard.scores.concat(incomingScore);
                scorecard.scores = tempScores;
                setUserScorecard({ ...userScorecard, scores: tempScores });
                const updatedScorecards = [...otherScorecards, scorecard];
                getTableData(updatedScorecards)
            }
            if(!incomingScore.scorecardId){
                getTableData(scorecards)
            }
        }
    },[scorecards, incomingScore])

    const submitRoundScores = () => {
        if(fightComplete) return; 
        setIsSubmitting(true);
        const submittedScores = Object.assign(Object.create({}),sliderScores);
        setChatScorecard(submittedScores);
        
        const url = process.env.REACT_APP_SCORECARDS + `/${userScorecard.scorecardId}`;
        return axios.put(url, submittedScores, tokenConfig)
            .then( res => {
                if(res.status === 200){
                    // UPDATES.
                    setSliderScores({ ...sliderScores, round: sliderScores.round + 1, [fighterData[0].lastName]: 10, [fighterData[1].lastName]: 10 }); 
                    const isFightComplete = sliderScores.round + 1 > totalRounds;
                    setScoredRounds(isFightComplete ? totalRounds : sliderScores.round);
        
                    if(isFightComplete){
                        setFightComplete(true);
                        setFightStatus(FIGHT_SHOW_STATUS_CONSTANTS.COMPLETED)
                        alert('FIGHT COMPLETE')
                    }
                }
            })
            .catch( err => console.log(err))
            .finally(() => setIsSubmitting(false));
    };
    // submit fight prediction.
    const handleSubmitPrediction = prediction => {
        if(predictionIsLocked(showData.show.showTime)) {
            setPredictionLock(true);
            return alert('Predictions are now locked!');
        }
        const [fighter] = fighterData.filter( data => {
            const { fighterId, lastName } = data;
            const transformedPrediction = `${capFirstLetters(lastName)}, ${prediction.split(',')[1]}`; 
            return prediction.includes(fighterId) ? setPrediction(transformedPrediction) : setNeedsPrediction(true);
        });
        const url = process.env.REACT_APP_SCORECARDS + `/${userScorecard.scorecardId}`;
        return axios.patch(url, {prediction: prediction}, tokenConfig)
            .then(res => {
                if(res.data === 'Updated prediction'){
                    setNeedsPrediction(false);
                    setPredictionLock(!predictionLock);
                    return toast({ 
                        title: 'Prediction Updated',
                        duration: 3000,
                        status: 'success',
                        isClosable: true
                    })
                }
            })
            .catch(err => console.log(err));
    };
    // useEffect for removing notifications.

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
        const fighterIds = fighterData.map( ({ fighterId }) => fighterId);
        const update = {
            admin,
            fighterIds,
            fightId,
            groupScorecardId,
            groupScorecardName, // for email.
            members: [email], // for alignment of createMemberScorecards, server.
            rounds: totalRounds,
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
    // this method can also be used in the initial useEffect to get the guest judges.
    const fetchGuestJudgeScorecards = async guestJudgeIds => {
        const getJudges = await guestJudgeIds.length > 0 && guestJudgeIds.map( async id => {
            const url = process.env.REACT_APP_SCORECARDS + `/${id}/${showData.fight.fightId}`;
            return axios(url, tokenConfig)
                .then( res => res.data )
                .catch( err => console.log(err));
        });
        const judgeScorecards = await Promise.all(getJudges);
        console.log('judgeScorecards: ', judgeScorecards);
        // no! I have to filter here.
        // setScorecards(prev => ([ ...prev, ...judgeScorecards ]))
    }
    const { finalScore } = userScorecard;
    const { rounds } = showData?.fight ? showData.fight : 0;
    // console.log('tableData: ', tableData)
    // console.log('fighterData: ', fighterData)
    // console.log('chatScorecard: ', chatScorecard)
    // console.log('roundResults: ', roundResults);
    // console.log('modals: ', modals)
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
            <SliderHeading mb="5rem" fightQuickTitle={showData?.fight?.fightQuickTitle ? showData.fight.fightQuickTitle : ''} />
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
                    setModals={setModals} 
                />
                <PredictionModal 
                    modals={modals}
                    setModals={setModals} 
                    rounds={rounds}
                    fighterData={fighterData}
                    handleSubmitPrediction={handleSubmitPrediction} 
                />
            </Flex>
            <Flex display={windowWidth < 768 ? tabs.table ? 'none' : 'flex' : 'flex'} w="100%" minH="60vh"  maxH="60vh">
                <ScoringSidebarLeft
                    modals={modals}
                    setModals={setModals}
                    tabs={tabs}
                    finalScore={finalScore}
                    groupScorecard={groupScorecard}
                    prediction={prediction}
                    showData={showData}
                    handleOpenAddMemberSubmitModal={handleOpenAddMemberSubmitModal}
                />
                <ScoringMain
                    tabs={tabs}
                    totalRounds={totalRounds}
                    fightComplete={fightComplete}
                    submitRoundScores={submitRoundScores}
                    fighterData={fighterData}
                    sliderScores={sliderScores} 
                    setSliderScores={setSliderScores} 
                    isSubmitting={isSubmitting}
                />
                <ScoringSidebarRight
                    tabs={tabs}
                    setIncomingScore={setIncomingScore}
                    chatScorecard={chatScorecard}
                    tokenConfig={tokenConfig}
                    chatKey={chatKey}
                    username={username}

                />
            </Flex>
            <ScoringTable 
                tabs={tabs} 
                username={username} 
                tableData={tableData} 
                scoredRounds={scoredRounds} 
                totalRounds={totalRounds} 
            />

            <ScoringTabs tabs={tabs} setTabs={setTabs} />
        </Flex>
    )

}
export default Scoring

const SliderHeading = ({ fightQuickTitle }) => (
    <Heading textAlign="center" as="h2" size="lg">{fightQuickTitle}</Heading>
)
