import React, {useEffect, useState} from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { AddGuestJudgeModal, AddMemberModal, PredictionModal } from '../components/modals'
import { ScoringSidebar } from '../components/sidebars'
import { predictionIsLocked } from '../utils/utils'
import { useLocation, useNavigate } from 'react-router'
import { ChatSidebar } from '../components/sidebars'
import { Notification } from '../components/notifications'
import { capFirstLetters, FIGHT_SHOW_STATUS_CONSTANTS, triggerToast } from '../utils'
import { ScoringMain } from '../components/scoring-main'
import stateStore from '../state-store'
import { RiSideBarFill } from 'react-icons/ri'

const Scoring = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');
    //////////////////  SCORE STATE /////////////////////////
    // const stated = stateStore.getState();
    // console.log('stated: ', stated);
    const { chatScorecard, setChatScorecard, setStats, tokenConfig, user } = stateStore.getState();
    const { sub, email, username } = user;

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
    const [quickTitle, setQuickTitle] = useState('');
    const [fightStatus, setFightStatus] = useState(null);
    const [fightComplete, setFightComplete] = useState(false);
    //////////////////  SIDEBAR  /////////////////////////
    const [openAddGuestJudgeModal, setOpenAddGuestJudgeModal] = useState(false);
    const [showGuestScorerIds, setShowGuestScorerIds] = useState(null);
    const [showGuestScorers, setShowGuestScorers] = useState(null);
    const [myGuestScorerIds, setMyGuestScorerIds] = useState(null);
    const [myGuestScorers, setMyGuestScorers] = useState(null)
    const [needsPrediction, setNeedsPrediction] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [predictionLock, setPredictionLock] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showData, setShowData] = useState(null);
    const [fighterData, setFighterData] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [forceRender, setForceRender] = useState(false);

    //////////////////  NOTIFICATIONS /////////////////////////
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([]);
    //////////////////  ADD MEMBER MODAL /////////////////////////
    const [addMemberModal, setAddMemberModal] = useState(false);
    //////////////////  URL'S /////////////////////////
    const groupScorecardsUrl = process.env.REACT_APP_GROUP_SCORECARDS + `/${groupscorecard_id}`;

    useEffect(() => {
        if(!user.sub){
            navigate('/signin', { replace: true}, {state:{ path: location.pathname}})
        } 
    },[user.sub]) 

    useEffect(() => {

        // 1. Fetch Group Scorecard.
        const fetchGroupScorecard = async () => {
            const res = await axios.get(groupScorecardsUrl, tokenConfig)
                .then( res => res).catch( err => console.log(err));
            console.log('res: ', res.data);
            if(res.data === 'No scorecard found.'){
                alert('No Scorecard Found');
                return;
            }
            // 2. Set groupScorecard scorecards, showData, guestScorers, chatKey.
            setGroupScorecard(res.data.groupScorecard);
            setScorecards(res.data.scorecards);
            setShowData({
                show: res.data.show,
                fight: res.data.fight
            });
            setShowGuestScorerIds(res.data.show.guestScorerIds);
            setChatKey(res.data.groupScorecard.chatKey);
            setQuickTitle(res.data.fight.fightQuickTitle)
            setFighterData(res.data.fighterData);
            setTotalRounds(res.data.fight.rounds);

            // Get THIS USER'S scorecard.
            const [thisUserScorecard] = res.data.scorecards.filter( ({ ownerId }) => ownerId === email || ownerId === sub);
            console.log('thisUserScorecard', thisUserScorecard);
            if(!thisUserScorecard) return alert('No scorecard found.')
            setUserScorecard(thisUserScorecard);
            // Set prediction, if necessary
            //TODO:// check for if time expired, too.
            const needsPrediction = !thisUserScorecard.prediction
            if(needsPrediction){
                setTimeout(() => {
                    setNeedsPrediction(true); 
                    setToggleModal(true);
                },5000);
            } else {
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

    }, []);

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

    // get GUEST SCORER ID's.
    // useEffect(() => {
    //     if(showGuestScorerIds && showGuestScorerIds.length > 0){
    //         const getShowGuestScorers = () => {
    //             return axios.post(guestScorersUrl, showGuestScorerIds, tokenConfig)
    //                 .then(res => setShowGuestScorers(res.data))
    //                 .catch(err => console.log(err))
    //         }
    //         getShowGuestScorers();
    //     }
    // },[showGuestScorerIds]);
    // // these can probably be combined???
    // useEffect(() => {
    //     if(myGuestScorerIds && myGuestScorerIds.length > 0){
    //         const getMyGuestScorers = () => {
    //             return axios.post(guestScorersUrl, myGuestScorerIds, tokenConfig)
    //                 .then(res => setMyGuestScorers(res.data))
    //                 .catch(err => console.log(err))
    //         }
    //         getMyGuestScorers()
    //     }
    // },[myGuestScorerIds]);
    // add guest scorer.
    const handleAddGuestScorer = e => {
        const { id, value } = e.currentTarget;
        const { guestScorerIds } = userScorecard;
        // getGuestScorer checks to see if guestScorer is already in the guestScorers array...
        const isGuestScorerAlreadyInArray = guestScorerIds.filter(guestScorerId => guestScorerId === id);
        if(isGuestScorerAlreadyInArray.length > 0){
            alert('Guest Scorer already present.');
            return;
        } else {
            const updatedGuestScorerArr = guestScorerIds.concat(id);
            // console.log('updatedGuestScorerArr: ',updatedGuestScorerArr);
            const url = process.env.REACT_APP_SCORECARDS + `/${userScorecard.scorecardId}`;
            return axios.patch(url, { updatedGuestScorerArr }, tokenConfig)
                .then(res => {
                    console.log('res: ',res);
                    if(res.status === 200){
                        // add to current state.
                    }
                })
                .catch(err => console.log(err))
        }
    }
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
    useEffect(() => {
        if(notifications.length > 0){
            const timer = setTimeout(() => {
                const temp = notifications;
                temp.shift(temp.length -1)
                setNotifications(temp);
                setNotificationTimeout(prev => !prev);
            }, 3000)
            return () => clearTimeout(timer);
        }
    },[notificationTimeout])

    const handleCloseNotification = e => {
        const { id } = e.currentTarget;
        const temp = notifications
        const filtered = temp.filter( ({ notification }) => notification !== id);
        setNotifications(filtered)
    };
    const handleOpenAddMemberSubmitModal = async (email) => {
        if(userScorecard.ownerId !== groupScorecard.ownerId){
            return toast({ 
                title: `Only group admin can add members.`,
                duration: 5000,
                status: 'info',
                isClosable: true
            })
        }
        setAddMemberModal(true)
    }
    const handleAddMemberSubmit = async email => {
        setIsSubmitting(true);
        const { groupScorecardId, groupScorecardName, fightId } = groupScorecard;
        const fighterIds = fighterData.map( ({ fighterId }) => fighterId);
        const update = {
            email, 
            fighterIds,
            fightId,
            groupScorecardId,
            groupScorecardName,
            rounds: totalRounds,
            username: email
        }
        return await axios.put(groupScorecardsUrl, update, tokenConfig)
            .then( res => {
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

    const handleAddGuestJudge = async guestJudgeId => {
        console.log('guestJudgeId: ', guestJudgeId);
    }
    const { finalScore } = userScorecard;
    const { rounds } = showData?.fight ? showData.fight : 0;
    // console.log('tableData: ', tableData)
    // console.log('fighterData: ', fighterData)
    // console.log('chatScorecard: ', chatScorecard)
    // console.log('roundResults: ', roundResults);
    return (
        <Flex flexDir="column" position="relative">
            <AddGuestJudgeModal 
                handleAddGuestJudge={handleAddGuestJudge}
                isSubmitting={isSubmitting}
                openAddGuestJudgeModal={openAddGuestJudgeModal}
                setOpenAddGuestJudgeModal={setOpenAddGuestJudgeModal}
            />
            <AddMemberModal 
                handleAddMemberSubmit={handleAddMemberSubmit}
                isSubmitting={isSubmitting}
                addMemberModal={addMemberModal}
                setAddMemberModal={setAddMemberModal}
            />
            <PredictionModal 
                rounds={rounds}
                setToggleModal={setToggleModal}
                toggleModal={toggleModal}
                fighterData={fighterData}
                handleSubmitPrediction={handleSubmitPrediction} 
            />
            <SliderHeading quickTitle={quickTitle} />
            <Flex 
                w={["100%","auto"]} 
                position="fixed" 
                top="1rem" 
                right="0" 
                flexDir="column" 
                zIndex="10000"
            >
                {notifications.length > 0 && notifications.map( ({notification, username}) => {
                    return (
                        <Notification
                            key={notification}
                            id={notification}
                            handleCloseNotification={handleCloseNotification}
                            notification={notification} 
                            username={username}
                        /> 
                    )
                })}
            </Flex>    
            <Flex 
                w="100%" 
                height="auto" 
                maxW="100%" 
                direction={["column", "column", "row" ]} 
                color="white" 
                alignItems="flex-start" 
                justifyContent="center" 
                margin="auto" 
                px={6} 
                py={8
            }>    
                <ScoringSidebar 
                    handleOpenAddMemberSubmitModal={handleOpenAddMemberSubmitModal}
                    setOpenAddGuestJudgeModal={setOpenAddGuestJudgeModal}
                    showData={showData}
                    showGuestScorers={showGuestScorers}
                    myGuestScorers={myGuestScorers}
                    prediction={prediction}
                    finalScore={finalScore}
                    groupScorecard={groupScorecard}
                    handleAddGuestScorer={handleAddGuestScorer}
                    setShowGuestScorers={setShowGuestScorers}
                    setToggleModal={setToggleModal}
                />
                <ScoringMain
                    totalRounds={totalRounds}
                    fightComplete={fightComplete}
                    submitRoundScores={submitRoundScores}
                    fighterData={fighterData}
                    sliderScores={sliderScores} 
                    setSliderScores={setSliderScores} 
                    isSubmitting={isSubmitting}
                />
                <ChatSidebar 
                    setIncomingScore={setIncomingScore}
                    setForceRender={setForceRender}
                    chatScorecard={chatScorecard}
                    tokenConfig={tokenConfig}
                    chatKey={chatKey}
                    username={username}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setNotificationTimeout={setNotificationTimeout}
                />
            </Flex>   
            <ScoringTable username={username} tableData={tableData} scoredRounds={scoredRounds} totalRounds={totalRounds} />
        </Flex>
    )
}
export default Scoring

const SliderHeading = ({ quickTitle }) => (
    <Heading textAlign="center" as="h2" size="lg">{quickTitle}</Heading>
)
