import React, {useEffect, useState} from 'react'
import { Flex, Heading, useControllableState, useForceUpdate, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import {  AddMemberModal, PredictionModal } from '../components/modals'
import { ScoringSidebar } from '../components/sidebars'
import { predictionIsLocked } from '../utils/utils'
import { useLocation, useNavigate } from 'react-router'
import { ChatSidebar } from '../components/sidebars'
import { Notification } from '../components/notifications'
import { FIGHT_SHOW_STATUS_CONSTANTS, capFirstLetters } from '../utils'
import { ScoringMain } from '../components/scoring-main'
import { userStore, useChatScorecardStore, statsStore } from '../stores'

const Scoring = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');
    //////////////////  SCORE STATE /////////////////////////
    const user = userStore( state => state.user);
    const tokenConfig = userStore( state => state.tokenConfig);
    const { sub, email, username } = user;
    const setStats = statsStore( state => state.setStats)
    const chatScorecardStore = useChatScorecardStore( state => state.chatScorecard);
    const [groupScorecard, setGroupScorecard] = useState({
        totalRounds: '', 
        fighterA: '', 
        fighterB: '', 
        scorecardName: '',
    });
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
    
    //////////////////  CHAT SIDEBAR   /////////////////////////
    const [updateCards, setUpdateCards] = useState(false);
    const [chatScorecard, setChatScorecard] = useState(null);
    const [roundResults, setRoundResults] = useState(null);
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
        if(user.sub && groupscorecard_id){

            // 1. Fetch Group Scorecard.
            const fetchGroupScorecard = async () => {
                const res = await axios.get(groupScorecardsUrl, tokenConfig);
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
                console.log('thisUserScorecard', thisUserScorecard)
                setUserScorecard(thisUserScorecard);
                setMyGuestScorerIds(thisUserScorecard.guestScorerIds);

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
                setSliderScores({ ...fighter1, ...fighter2, round, scorecardId: thisUserScorecard.scorecardId })
            }
            fetchGroupScorecard();
            
            // const sync = setInterval(() => {
            //     fetchGroupScorecard();
            //     if(sync) return;
            //     sync();
            // }, 30000);
        } 
    }, [user, groupscorecard_id]);
    // take in the new scores from the store and organize them
    // then set them to the new scorecards and do the things.
    useEffect(() => {
        if(scorecards?.length > 0){
            if(userScorecard.scorecardId === chatScorecardStore.scorecardId) return;
            let update = {};
            for(const [key, value] of Object.entries(chatScorecardStore)){
                if(key !== 'scorecardId'){
                    update = {
                        ...update,
                        [key]: value
                    }
                }
            }
            const [scorecardToUpdate] = scorecards.filter( ({ scorecardId }) => scorecardId === chatScorecardStore.scorecardId );
            const filtered = scorecards.filter( scorecard => scorecard.scorecardId !== chatScorecardStore.scorecardId)
            const temp = scorecardToUpdate.scores.concat(update);
            const newScores = {
                ...scorecardToUpdate,
                scores: temp
            }
            const updatedCards = [...filtered, newScores];
            setScorecards(updatedCards);
            setUpdateCards(prev => !prev)
        }
    },[chatScorecardStore])
    // destructure scores...
    useEffect(() => {
        // handle the scorecards...
        if(scorecards?.length > 0){
            const getTableData = () => {
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
            }
            getTableData();
        }
    },[scorecards, updateCards]);

    const submitRoundScores = () => {
        if(fightComplete) return;
        setIsSubmitting(true);
        const { scores, scorecardId } = userScorecard;
        const otherScorecards = scorecards.filter( scorecard => scorecard.scorecardId !== scorecardId)
        const tempScores = scores.concat(sliderScores);
        const tempScorecard = Object.assign({}, { ...userScorecard, scores: tempScores });
        const updatedScorecards = otherScorecards.concat(tempScorecard);

        const isFightComplete = sliderScores.round + 1 > totalRounds;
        setScoredRounds(sliderScores.round);

        setSliderScores({ ...sliderScores, round: sliderScores.round + 1, [fighterData[0].lastName]: 10, [fighterData[1].lastName]: 10 }); 
        setScorecards(updatedScorecards);
        setUserScorecard({ ...userScorecard, scores: tempScores });
        const url = process.env.REACT_APP_SCORECARDS + `/${scorecardId}`;
        return axios.put(url, sliderScores, tokenConfig)
            .then( res => {
                if(res.status === 200){
                    // UPDATES.
                    
                    setChatScorecard(sliderScores);
                    if(isFightComplete){
                        alert('FIGHT COMPLETE')
                        setFightComplete(true);
                        setScoredRounds(totalRounds)
                        setFightStatus(FIGHT_SHOW_STATUS_CONSTANTS.COMPLETED)
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
    const handleSubmitPrediction = value => {

        if(predictionIsLocked(showData.show.showTime)) {
            setPredictionLock(true);
            return alert('Predictions are now locked!');
        }
        const [fighter] = fighterData.filter( data => {
            const { fighterId, lastName } = data;
            const transformedPrediction = `${capFirstLetters(lastName)}, ${value.split(',')[1]}`; 
            return value.includes(fighterId) ? setPrediction(transformedPrediction) : setNeedsPrediction(true);
        });
        const url = process.env.REACT_APP_SCORECARDS + `/${userScorecard.scorecardId}`;
        return axios.patch(url, {prediction: value}, tokenConfig)
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
    
    const handleAddMemberSubmit = async email => {
        setIsSubmitting(true);
        console.log('email: ', email);
        return await axios.put(groupScorecardsUrl, { email }, tokenConfig)
            .then( res => console.log('res: ', res))
            .catch( err => console.log(err))
            .finally(() => setIsSubmitting(false))

    };

    const { finalScore } = userScorecard;
    const { rounds } = showData?.fight ? showData.fight : 0;
    // console.log('tableData: ', tableData)
    // console.log('chatScorecard: ', chatScorecard)
    // console.log('roundResults: ', roundResults);
    return (
        <Flex flexDir="column" position="relative">
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
            <Flex w={["100%","auto"]} position="fixed" top="1rem" right="0" flexDir="column" zIndex="10000">
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
                    setAddMemberModal={setAddMemberModal}
                    sub={sub}
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
                    fighterData={fighterData}
                    chatScorecard={chatScorecard}
                    tokenConfig={tokenConfig}
                    chatKey={chatKey}
                    username={username}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setNotificationTimeout={setNotificationTimeout}
                />
            </Flex>   
            <ScoringTable scoredRounds={scoredRounds} tableData={tableData} totalRounds={totalRounds} />
        </Flex>
    )
}
export default Scoring

const SliderHeading = ({ quickTitle }) => (
    <Heading textAlign="center" as="h2" size="lg">{quickTitle}</Heading>
)
