import React, {useEffect, useState} from 'react'
import { Flex, Heading, useControllableState, useForceUpdate, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { ScoringModal, ExpiredTokenModal, PredictionModal } from '../components/modals'
import { ScoringSidebar } from '../components/sidebars'
import { predictionIsLocked } from '../utils/utils'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { ChatSidebar } from '../components/sidebars'
import { Notification } from '../components/notifications'
import { FIGHT_SHOW_STATUS_CONSTANTS, capFirstLetters } from '../utils'
import { ScoringMain } from '../components/scoring-main'
import { useUserStore, useScorecardStore } from '../stores'

const Scoring = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');

    //////////////////  SCORE STATE /////////////////////////
    const user = useUserStore( store => store);
    const { sub, email, username } = user;
    const localStorageString = `CognitoIdentityServiceProvider.${process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID}.${username}`;
    const chatScorecardScore = useScorecardStore( store => store.scorecard);
    const accessToken = localStorage.getItem(`${localStorageString}.accessToken`);
    const accessTokenConfig = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };        
    const [groupScorecard, setGroupScorecard] = useState({
        totalRounds: '', 
        fighterA: '', 
        fighterB: '', 
        scorecardName: '',
    });
    const [scorecards, setScorecards] = useState(null);
    const [userScorecard, setUserScorecard] = useState({});
    const [tableData, setTableData] = useState([]);
    const [scoredRounds, setScoredRounds] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    const [sliderScores, setSliderScores] = useState({});
    const [onlyShowToCurrentRound, setOnlyShowToCurrentRound] = useState(false);
    const [chatKey, setChatKey] = useState(null);
    const [quickTitle, setQuickTitle] = useState('');
    const [fightStatus, setFightStatus] = useState(null);
    const [scoringComplete, setScoringComplete] = useState(false);
    //////////////////  SIDEBAR /////////////////////////
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

    //////////////////  CHAT /////////////////////////
    const [chatScorecard, setChatScorecard] = useState(null)
    //////////////////  NOTIFICATIONS /////////////////////////
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([]);
    
    //////////////////  URL'S /////////////////////////
    const groupScorecardsUrl = process.env.REACT_APP_GROUP_SCORECARDS + `/${groupscorecard_id}`;
    const guestScorersUrl = process.env.REACT_APP_GUEST_SCORERS;
    useEffect(() => {
        if(!sub){
            navigate('/signin', { replace: true}, {state:{ path: location.pathname}})
        } 
    },[sub]) 
    useEffect(() => {
        if(chatScorecardScore?.scorecardId && scorecards?.length > 0){
            const updatedScorecards = scorecards.map( scorecard => {
                if(scorecard.scorecardId === chatScorecardScore.scorecardId){
                    const { scores } = scorecard;
                    const tempScores = scores.concat(chatScorecardScore.update);
                    return ({
                        ...scorecard,
                        scores: tempScores
                    })
                }
                return scorecard;
            })
            setScorecards(updatedScorecards)
        }
    },[chatScorecardScore])
    useEffect(() => {
        if(user?.sub && groupscorecard_id){

            // 1. Fetch Group Scorecard.
            const fetchGroupScorecard = async () => {
                const { sub, email, username } = user;
                const res = await axios.get(groupScorecardsUrl, accessTokenConfig);
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

                // Get THIS USER'S scorecard.
                const [thisUserScorecard] = res.data.scorecards.filter( ({ ownerId }) => ownerId === email || ownerId === sub);
                console.log('thisUserScorecard', thisUserScorecard)
               
                // Set prediction, if necessary
                const needsPrediction = !thisUserScorecard.prediction
                if(needsPrediction){
                    setTimeout(() => {
                        setNeedsPrediction(true); 
                        setToggleModal(true);
                    },3000);
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
                // Find current round
                const getCurrentRound = thisUserScorecard => {
                    // -1 is for zero round.
                    const round = thisUserScorecard.scores.map( score => score.length).length -1;
                    if(round >= res.data.fight.rounds){
                        setScoringComplete(true);
                        setScoredRounds(res.data.fight.rounds);
                    } else {
                        setScoredRounds(round)
                    }
                    if(round <= 1) return setFightStatus(FIGHT_SHOW_STATUS_CONSTANTS.PENDING);
                    if(round >= res.data.fight.rounds) return setFightStatus(FIGHT_SHOW_STATUS_CONSTANTS.COMPLETED);
                    if(round > 0 || round <= res.data.fight.rounds + 1) return setFightStatus(FIGHT_SHOW_STATUS_CONSTANTS.ACTIVE);
                    return round;
                }
                getCurrentRound(thisUserScorecard);
                setTotalRounds(res.data.fight.rounds);

                setUserScorecard(thisUserScorecard);
                setMyGuestScorerIds(thisUserScorecard.guestScorerIds);
                const [fighter1, fighter2] = res.data.fighterData.map( ({ fighterId }) => {
                    return ({
                        [fighterId]: 10
                    })
                })
                setSliderScores({ ...fighter1, ...fighter2 })
            }
            fetchGroupScorecard();
            
            // const sync = setInterval(() => {
            //     fetchGroupScorecard();
            //     if(sync) return;
            //     sync();
            // }, 30000);
        } 
    }, [user, groupscorecard_id]);
    // destructure scores...
    useEffect(() => {
        // handle the scorecards...
        if(userScorecard.scorecardId){
            const destructureScorecards = () => {
                const s = scorecards.map( scorecard => {
                    let { ownerDisplayName, ownerId, prediction, scores } = scorecard;
                    const [fighter1, fighter2] = fighterData;
                    const fighter1Id = fighter1.fighterId;
                    const fighter2Id = fighter2.fighterId;
                    const displayName = ownerDisplayName ? ownerDisplayName : ownerId;
                    const sortRoundAscending = (a, b) => a.round - b.round;
                    let predictionResult;
                    
                    if(prediction){
                        const index = prediction.indexOf(',')
                        predictionResult = prediction.slice(index+1);
                        prediction = prediction.slice(0,index);
                    }

                    const totals = scores.reduce( (acc, curr) => {
                        if(!acc[fighter1.lastName]){
                            acc[fighter1.lastName] = 0;
                        }
                        acc[fighter1.lastName] += curr[fighter1Id]
                        
                        if(!acc[fighter2.lastName]){
                            acc[fighter2.lastName] = 0;
                        }
                        acc[fighter2.lastName] += curr[fighter2Id]
                        return acc
                    },{});

                    const mappedScores = scores.map( score => {
                        const { round } = score;
                        const f1name = fighter1.lastName;
                        const f2name = fighter2.lastName;
                        return ({
                            round,
                            [f1name]: score[fighter1Id],
                            [f2name]: score[fighter2Id]
                        })
                    }).filter( ({ round }) => round !== 0)
                    .sort(sortRoundAscending);
                   
                    return ({
                        mappedScores,
                        displayName,
                        totals,
                        fighters: [fighter1.lastName, fighter2.lastName],
                        prediction
                    })
                })
                setTableData(s);
            }
            destructureScorecards();
        }
    },[scorecards]);

    // get GUEST SCORER ID's.
    useEffect(() => {
        if(showGuestScorerIds && showGuestScorerIds.length > 0){
            const getShowGuestScorers = () => {
                return axios.post(guestScorersUrl, showGuestScorerIds, accessTokenConfig)
                    .then(res => setShowGuestScorers(res.data))
                    .catch(err => console.log(err))
            }
            getShowGuestScorers();
        }
    },[showGuestScorerIds]);
    // these can probably be combined???
    useEffect(() => {
        if(myGuestScorerIds && myGuestScorerIds.length > 0){
            const getMyGuestScorers = () => {
                return axios.post(guestScorersUrl, myGuestScorerIds, accessTokenConfig)
                    .then(res => setMyGuestScorers(res.data))
                    .catch(err => console.log(err))
            }
            getMyGuestScorers()
        }
    },[myGuestScorerIds]);
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
            return axios.patch(url, { updatedGuestScorerArr }, accessTokenConfig)
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
        return axios.patch(url, {prediction: value}, accessTokenConfig)
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
    const submitRoundScores = () => {
        if(scoringComplete) return;
        setIsSubmitting(true);
        const { scorecardId } = userScorecard;
        const update = {
            ...sliderScores,
            round: scoredRounds + 1
        };
        const url = process.env.REACT_APP_SCORECARDS + `/${scorecardId}`;
        let resetSliderScores = {};
        for(const [key] of Object.entries(sliderScores)){
            resetSliderScores = {
                ...resetSliderScores,
                [key]: 10
            }
        }
       
        return axios.put(url, update, accessTokenConfig)
            .then( res => {
                if(res.status === 200){
                    const { scores, scorecardId } = userScorecard;
                    const filtered = scorecards.filter( scorecard => scorecard.scorecardId !== scorecardId)
                    const tempScores = scores.concat(update);
                    const tempScorecard = Object.assign({}, {...userScorecard, scores: tempScores });
                    const newScorecards = filtered.concat(tempScorecard);
                    
                    setScorecards(newScorecards);
                    setUserScorecard({ ...userScorecard, scores: tempScores });
                    if(scoredRounds >= totalRounds){
                        setScoringComplete(true);
                        setScoredRounds(totalRounds)
                        setFightStatus(FIGHT_SHOW_STATUS_CONSTANTS.COMPLETED)
                    } else {
                        setScoredRounds(prev => prev+1);
                    }
                    setSliderScores(resetSliderScores);
                    // send scores in chat.
                    setChatScorecard({ update, scorecardId })
                }
            })
            .catch( err => console.log(err))
            .finally(() => setIsSubmitting(false));
    };
    const handleReRenderScorecards = updateScore => {
        const { scorecardId, update } = updateScore;
        if(scorecardId === userScorecard.scorecardId) return;
        const updatedScorecards = scorecards.map( scorecard => {
            if(scorecardId === scorecard.scorecardId){
                const temp = {
                    ...scorecard,
                    scores: scorecard.scores.concat(update)
                }
                return temp
            }
            return scorecard;
        });
        console.log('updatedScorecards: ', updatedScorecards);
        setScorecards(updatedScorecards)
    }

    const { ownerDisplayName, finalScore } = userScorecard;
    const { rounds } = showData?.fight ? showData.fight : 0;
    // console.log('group scorecard: ',groupScorecard)
    // console.log('userScorecard: ', userScorecard);
    // console.log('scorecards: ', scorecards);
    // console.log('totalRounds: ', totalRounds)
    // console.log('scoringComplete: ', scoringComplete);

    return (
        <Flex flexDir="column" position="relative">
            {/* <ExpiredTokenModal openModal={!tokenIsGood} /> */}
            <PredictionModal 
                rounds={rounds}
                setToggleModal={setToggleModal}
                toggleModal={toggleModal}
                fighterData={fighterData}
                handleSubmitPrediction={handleSubmitPrediction} 
            />
            <SliderHeading quickTitle={quickTitle} />
            <Flex w={["100%","auto"]} position="fixed" top="1rem" right="0" flexDir="column" zIndex="10000">
                {notifications.length > 0 && notifications.map( ({notification, displayName}) => {
                    return (
                        <Notification
                            key={notification}
                            id={notification}
                            handleCloseNotification={handleCloseNotification}
                            notification={notification} 
                            displayName={displayName}
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
                    scoringComplete={scoringComplete}
                    submitRoundScores={submitRoundScores}
                    scoredRounds={scoredRounds}
                    fighterData={fighterData}
                    sliderScores={sliderScores} 
                    setSliderScores={setSliderScores} 
                    isSubmitting={isSubmitting}
                    totalRounds={totalRounds}
                />
                <ChatSidebar 
                    handleReRenderScorecards={handleReRenderScorecards}
                    chatScorecard={chatScorecard}
                    fightStatus={fightStatus}
                    scoredRounds={scoredRounds} 
                    accessTokenConfig={accessTokenConfig}
                    chatKey={chatKey}
                    displayName={ownerDisplayName}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setNotificationTimeout={setNotificationTimeout}
                />
            </Flex>   
            <ScoringTable tableData={tableData} totalRounds={totalRounds} />
        </Flex>
    )
}
export default Scoring

const SliderHeading = ({ quickTitle }) => (
    <Heading textAlign="center" as="h2" size="lg">{quickTitle}</Heading>
)
