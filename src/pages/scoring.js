import React, {useEffect, useState} from 'react'
import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { ScoringTable } from '../components/tables'
import { ScoringModal, ExpiredTokenModal, PredictionModal } from '../components/modals'
import { ScoringSidebar } from '../components/sidebars'
import { predictionIsLocked } from '../utils/utils';
import { useNavigate } from 'react-router-dom'
import { FighterSlider } from '../components/fighter-slider/fighter-slider'
import { ChatSidebar } from '../components/sidebars'
import { Notification } from '../components/notifications'
import { capFirstLetters } from '../utils'


const Scoring = props => {
    const navigate = useNavigate();
    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');
    const username = sessionStorage.getItem('username');
    const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
    let accessToken, idToken, decodedIdToken, sub, config, tokenIsGood;
    if(username && localStorageString){
        accessToken = localStorage.getItem(localStorageString + '.accessToken');
        idToken = localStorage.getItem(localStorageString + '.idToken');
        decodedIdToken = jwt_decode(idToken);
        sub = decodedIdToken.sub;
        config = {
            headers: { Authorization: `Bearer ${idToken}` }
        };        
        tokenIsGood = Date.now() < (decodedIdToken.exp * 1000) ? true : false;
    } else { 
        navigate('/signin', {page: '/scoring/' + groupscorecard_id});
    }

    //////////////////  SCORE STATE /////////////////////////

    const [groupScorecard, setGroupScorecard] = useState({
        totalRounds: '', 
        fighterA: '', 
        fighterB: '', 
        scorecardName: '',
    });
    const [scorecards, setScorecards] = useState(null);
    const [userScorecard, setUserScorecard] = useState({});
    const [userScores, setUserScores] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [sliderScores, setSliderScores] = useState({
        fighterA: 10,
        fighterB: 10
    });
    const [scoringModal, toggleScoringModal] = useState(false);
    const [dBCall, setDBCall] = useState(false);
    const [reason, setReason] = useState('EA');
    const [isAdmin, setIsAdmin] = useState(false);
    const [onlyShowToCurrentRound, setOnlyShowToCurrentRound] = useState(false);
    const [fightResult, setFightResult] = useState(null);
    const [chatKey, setChatKey] = useState(null);

    //////////////////  SIDEBAR /////////////////////////
    const [showGuestScorerIds, setShowGuestScorerIds] = useState(null);
    const [showGuestScorers, setShowGuestScorers] = useState(null);
    const [myGuestScorerIds, setMyGuestScorerIds] = useState(null);
    const [myGuestScorers, setMyGuestScorers] = useState(null)
    const [needsPrediction, setNeedsPrediction] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [predictionLock, setPredictionLock] = useState(true);
    const [guestScorersScorecards, setGuestScorersScorecards] = useState(null);

    const [show, setShow] = useState({});
    const [togglePredictionModal, setTogglePredictionModal] = useState(false);

    //////////////////  NOTIFICATIONS /////////////////////////
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([
        { notification: 'Thurman is on fire!', displayName: 'sarah'}, 
        { notification: 'Thurman will get KO\'d this round!', displayName: 'andrew1'}
    ]);
    
    //////////////////  URL'S /////////////////////////
    ////////////////////////////////////////////////////////////////
    const groupScorecardsUrl = process.env.REACT_APP_GROUP_SCORECARDS + `/${groupscorecard_id}`;
    const userScorecardUrl = process.env.REACT_APP_USER_SCORECARDS + `/${groupscorecard_id}`;
    const guestScorersUrl = process.env.REACT_APP_GUEST_SCORERS;

    useEffect(() => {
        if(tokenIsGood && groupscorecard_id){
            /**
             * 1. fetch groupScorecard.
             * 2. Check if admin === current user email
             *      -if so, set "isAdmin = true";
             * 3. Set groupScorecards, scorecards and show (if no show, then set to null).
             * 4. Get current user scorecard.
             * 5. Check for ownerId on scorecard- if none, fire off call to set it.
             * 6. Check for prediction- if none, set it.
             * 7. Find current round.
             * 8. Check if fight is complete.
             * 9. Get guest scorer ID's and set them in state.
             */

            // 1. Fetch Group Scorecard.
            const fetchGroupScorecard = async () => {
                const res = await axios.get(groupScorecardsUrl, config);
                // console.log('res: ', res.data);
                if(res.data.scorecards === 'No scorecard found.'){
                    alert('No Scorecard Found');
                    return;
                }
                // 2. Set groupScorecard and scorecards.
                setGroupScorecard(res.data.groupScorecard);
                setScorecards(res.data.scorecards);
                
                // 3. Get THIS USER'S scorecard.
                const [thisUserScorecard] = await res.data.scorecards.filter(scorecard => scorecard.member === decodedIdToken.email);
                // console.log('thisUserScorecard', thisUserScorecard)
                const needsOwnerId = !thisUserScorecard.ownerId || thisUserScorecard.ownerId !== sub || !thisUserScorecard.ownerDisplayName;
                // 4. If a featured show, set in state.
                if(res.data.show){
                    setShow(res.data.show);
                    setShowGuestScorerIds(res.data.show.guestScorerIds);
                } else {
                    setShow(null);
                }
                // 5. set user data in DB if not there already
                if(needsOwnerId){
                    axios.patch(userScorecardUrl, {ownerId: sub}, config);
                    thisUserScorecard.ownerId = sub;
                }
                // 6. Check if user is GROUP ADMIN
                if(res.data.groupScorecard.admin === decodedIdToken.email){
                    setIsAdmin(true);
                }                
                // 7. Check for CHAT KEY. if !chatKey, get it in useEffect.
                if(res.data.groupScorecard.chatKey){
                    setChatKey(res.data.groupScorecard.chatKey);
                }
                // 8. Set prediction, if necessary
                const needsPrediction = !thisUserScorecard.prediction && res.data.show?.showTime;
                if(needsPrediction){
                    setNeedsPrediction(true); 
                    setTogglePredictionModal(true);
                } else {
                    setPrediction(thisUserScorecard.prediction);
                }
                // 9. Find current round
                const getCurrentRound = thisUserScorecard.scores.filter(score => score.fighterAScore !== 0);
                const result = res.data.groupScorecard.fightResult ? setFightResult(res.data.groupScorecard.fightResult) : null;
                setCurrentRound((getCurrentRound.length) + 1);
                setUserScorecard(thisUserScorecard);
                setUserScores(thisUserScorecard.scores);
                setMyGuestScorerIds(thisUserScorecard.guestScorerIds)
            }
            fetchGroupScorecard();
        } 
    }, [tokenIsGood, dBCall, groupscorecard_id, onlyShowToCurrentRound]);

    // check if chatKey, get sig4 token.
    useEffect(() => {
        const { groupScorecardId, chatKey } = groupScorecard;
        // right now, everyone should have chatKey, created in groupScorecard.
        if( groupScorecardId && !chatKey ){
            const getChatKey = async () => {
                const url = process.env.REACT_APP_CHAT_ROOM_SERVICE + `/${groupScorecardId}`;
                return axios.put(url, {}, config)
                    .then( res => setChatKey(res.data.chatArnKey)).catch( err => console.log(err));
            } 
            getChatKey();
        }
        if(groupScorecardId && chatKey){

        }

    }, [groupScorecard]) 


    // const submitScores = async () => {
    //     // console.log('userScores 94: ',userScores);
    //     const scoresArr = userScores.map(score => {
    //         if(score.round === currentRound){
    //             score['reason'] = reason;
    //             // changed these to sliderScores...
    //             // score['fighterAScore'] = fighterASlider;
    //             // score['fighterBScore'] = fighterBSlider;
    //         }
    //         return score;
    //     })
    //     userScorecard.scores = scoresArr;
    //     await axios.put(userScorecardUrl, userScorecard, config)
    //         .then(res => {
    //             console.log('put res: ',res)
    //             if(res.status === 200){
    //                 console.log('200');
    //                 setSliderScores({fighter1: 10, fighter2: 10});
    //                 setReason('EA');
    //                 setDBCall(() => !dBCall);
    //                 setUserScorecard(res.data);
    //                 setUserScores(res.data.scores);
    //                 const getCurrentRound = res.data.scores.filter(score => score.fighterAScore !== 0);
    //                 setCurrentRound((getCurrentRound.length+1));
    //             }
    //         })
    //         .catch(err => console.log('put err: ',err));
    //         toggleScoringModal(!scoringModal);
    // };
    // when the groupsScorecard comes in, replace fighterA and B with their names...
    
    // get GUEST SCORER ID's.
    useEffect(() => {
        if(showGuestScorerIds && showGuestScorerIds.length > 0){
            const getShowGuestScorers = () => {
                return axios.post(guestScorersUrl, showGuestScorerIds, config)
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
                return axios.post(guestScorersUrl, myGuestScorerIds, config)
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
            return axios.patch(userScorecardUrl, { updatedGuestScorerArr }, config)
                .then(res => {
                    console.log('res: ',res);
                    if(res.status === 200){
                        setDBCall(!dBCall);
                    }
                })
                .catch(err => console.log(err))
        }
    }
    // scoring reason.
    const handleReasonClick = e => {
        let { id } = e.currentTarget;
        return setReason(id);
    }
    useEffect(() => {
        if(scorecards && scorecards.length > 0){
            function getScorecardTotals(scorecards){
                const newArr = [];
                for(let i = 0; i < scorecards.length; i++){
                    const card = scorecards[i];
                    const scores = card.scores;
                    let fighterATotal;
                    let fighterBTotal;
                    if(onlyShowToCurrentRound){
                        fighterATotal = scores.slice(0,(currentRound-1)).reduce((previousValue, currentValue) => {
                            return previousValue + currentValue.fighterAScore;
                        },0)
                        fighterBTotal = scores.slice(0,(currentRound-1)).reduce((previousValue, currentValue) => {
                            return previousValue + currentValue.fighterBScore;
                        },0)
                    } else {
                        fighterATotal = scores.reduce((previousValue, currentValue) => {
                            return previousValue + currentValue.fighterAScore;
                        },0)
                        fighterBTotal = scores.reduce((previousValue, currentValue) => {
                            return previousValue + currentValue.fighterBScore;
                        },0)

                    }
                        scorecards[i].fighterATotal = fighterATotal;
                        scorecards[i].fighterBTotal = fighterBTotal;
                        newArr.push(scorecards[i]);
                }
                return scorecards
            }
            getScorecardTotals(scorecards);
        }
    },[scorecards]);
    // submit fight prediction.
    const handleSubmitPrediction = value => {
        if(show?.showTime){
            if(predictionIsLocked(show?.showTime)) {
                setPredictionLock(true);
                return alert('Predictions are now locked!');
            }
            return axios.patch(userScorecardUrl, {prediction: value}, config)
            .then(res => {
                // console.log('res: ',res)
                if(res.data === 'Updated prediction'){
                    setPrediction(value);
                    setNeedsPrediction(false);
                    setPredictionLock(!predictionLock);
                    return toast({ 
                        title: 'Prediction Updated',
                        duration: 5000,
                        status: 'success',
                        isClosable: true
                    })
                }
            })
            .catch(err => console.log(err));
        }
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
        console.log('submitRoundScores, 340');
        console.log('userScorecard: ', userScorecard)
        const { scores } = userScorecard;
        const filtered = scores.filter( ({ round }) => round != currentRound);
        // have to keep the fighter scores in sync
        // because the score properties, in scorecards, are generic.
        const sliderScoresUpdate = () => {
            if(sliderScores[fighterA] === fighterA){
                const update = {
                    fighterAScore: sliderScores[fighterA],
                    fighterBScore: sliderScores[fighterB]
                }
                return (update)
            } else {
                console.log('fighters out of sync');
            }
        }
        console.log('sliderScoresUpdate: ', sliderScoresUpdate());

        const update = {
            reason: '',
            round: currentRound,
            ...sliderScoresUpdate()
        };
        console.log('filtered: ', filtered);
        console.log('update: ', update);
        /**
            1. Get sliders scores.
            2. Update scorecard.
            3. Update group scorecard.
            4. Update DB.
            5. Update chat.
         *  */ 


    };

    const { ownerDisplayName, finalScore } = userScorecard;
	const { weightclass, totalRounds, fighterA, fighterB, scorecardName } = groupScorecard;
    const { members } = groupScorecard;
    const { showName } = show && show.showName ? show : '';
    // console.log('chatKey: ', chatKey)
    // console.log('user: ',user);
    // console.log('group scorecard: ',groupScorecard)
    // console.log('userScorecard: ', userScorecard)
    return (
        <Flex flexDir="column" position="relative">
            <SliderHeading fighterA={fighterA} fighterB={fighterB} />
            <Flex position="fixed" right="0" top="2rem" flexDir="column" zIndex="1000">
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
            <Flex flex="1 0 20%" w="100%" minH={["40vh", "50vh", "80vh"]} maxH={["40vh","50vh","80vh"]} overflow="scroll">    
                    <ScoringSidebar 
                        show={show}
                        members={members}
                        showGuestScorers={showGuestScorers}
                        myGuestScorers={myGuestScorers}
                        prediction={prediction}
                        finalScore={finalScore}
                        groupScorecard={groupScorecard}
                        handleAddGuestScorer={handleAddGuestScorer}
                        setShowGuestScorers={setShowGuestScorers}
                        setTogglePredictionModal={setTogglePredictionModal}
                    />
                </Flex>
                <Flex p="1" m="1" mb="3rem" flex="1 0 50%" flexDir="column" w="100%">
                    <Heading textAlign="center">Round {currentRound}</Heading> 
                    <Flex flexDir={["column", "column", "row"]} flex="1 0 40%">
                    {
                        groupScorecard?.fighterA && [fighterA, fighterB].map( (fighter,i) => {
                            return (
                                <FighterSlider
                                    key={i}
                                    fighter={fighter}
                                    sliderScores={sliderScores}
                                    setSliderScores={setSliderScores}
                                    groupScorecard={groupScorecard} 
                                    toggleScoringModal={toggleScoringModal}
                                    scoringModal={scoringModal}
                                />
                            )
                        })
                    }
                </Flex>
                <Button
                    onClick={submitRoundScores} 
                    variant="outline" 
                    colorScheme="red" 
                    margin="auto" 
                    w={["90%","40%"]}>
                        Submit Round {currentRound} Scores
                    </Button>
                </Flex>  
                {/* <Flex >     */}
                    <ChatSidebar 
                        config={config}
                        chatKey={chatKey}
                        displayName={ownerDisplayName}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        setNotificationTimeout={setNotificationTimeout}
                    />
                {/* </Flex>   */}
            </Flex>   
            <ScoringTable fightResult={fightResult} prediction={prediction} fighterA={fighterA} fighterB={fighterB} totalRounds={totalRounds} currentRound={currentRound} scorecards={scorecards} />
        </Flex>
    )
}
export default Scoring

const SliderHeading = ({ fighterA, fighterB }) => (
    <Heading textAlign="center" as="h2" size="lg">{capFirstLetters(fighterA)} vs {capFirstLetters(fighterB)}</Heading>
)
{/* <ExpiredTokenModal openModal={!tokenIsGood} /> */}

// <PredictionModal 
// togglePredictionModal={togglePredictionModal}
// setTogglePredictionModal={setTogglePredictionModal}
// groupScorecard={groupScorecard} 
// handleSubmitPrediction={handleSubmitPrediction} 
// prediction={prediction}
// />
// <ScoringModal 
// reason={reason}
// currentRound={currentRound}
// scoringModal={scoringModal}
// toggleScoringModal={toggleScoringModal}
// fighterA={fighterA}
// fighterASlider={fighterASlider}
// fighterB={fighterB}
// fighterBSlider={fighterBSlider}
// handleReasonClick={handleReasonClick}
// submitScores={submitScores}
// />