import React, {useEffect, useState} from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ScoringTable } from '../components/tables'
import { ScoringModal, ExpiredTokenModal, PredictionModal } from '../components/modals'
import { ScoringSidebar } from '../components/sidebars'
import { predictionIsLocked } from '../utils/utils'
import { Navigate, useLocation } from 'react-router'
import { ChatSidebar } from '../components/sidebars'
import { Notification } from '../components/notifications'
import { capFirstLetters } from '../utils'
import { ScoringMain } from '../components/scoring-main'
import { useUserStore, useScoringStore } from '../stores'

const Scoring = () => {
    const location = useLocation();
    const toast = useToast();
    const groupscorecard_id = window.location.pathname.slice(9) ? window.location.pathname.slice(9) : sessionStorage.getItem('groupscorecard_id');

    //////////////////  SCORE STATE /////////////////////////
    const user = useUserStore( store => store);
    const { sub, email, username } = user;
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
    const [sliderScores, setSliderScores] = useState(null);
    const [scoringModal, toggleScoringModal] = useState(false);
    const [dBCall, setDBCall] = useState(false);
    const [onlyShowToCurrentRound, setOnlyShowToCurrentRound] = useState(false);
    const [fightResult, setFightResult] = useState(null);
    const [chatKey, setChatKey] = useState(null);
    const [quickTitle, setQuickTitle] = useState('');
    //////////////////  SIDEBAR /////////////////////////
    const [showGuestScorerIds, setShowGuestScorerIds] = useState(null);
    const [showGuestScorers, setShowGuestScorers] = useState(null);
    const [myGuestScorerIds, setMyGuestScorerIds] = useState(null);
    const [myGuestScorers, setMyGuestScorers] = useState(null)
    const [needsPrediction, setNeedsPrediction] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [predictionLock, setPredictionLock] = useState(true);
    const [guestScorersScorecards, setGuestScorersScorecards] = useState(null);

    const [showData, setShowData] = useState(null);
    const [fighterData, setFighterData] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);

    //////////////////  NOTIFICATIONS /////////////////////////
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([]);
    
    //////////////////  URL'S /////////////////////////
    const groupScorecardsUrl = process.env.REACT_APP_GROUP_SCORECARDS + `/${groupscorecard_id}`;
    const userScorecardUrl = process.env.REACT_APP_USER_SCORECARDS + `/${groupscorecard_id}`;
    const guestScorersUrl = process.env.REACT_APP_GUEST_SCORERS;
    
    //////////////////  TOKEN /////////////////////////
    let accessTokenConfig;
    const localStorageString = `CognitoIdentityServiceProvider.${process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID}.${username}`;
    if(username && localStorageString){
      const accessToken = localStorage.getItem(`${localStorageString}.accessToken`);
      accessTokenConfig = {
        headers: { Authorization: `Bearer ${accessToken}` }
      };        
      const tokenIsGood = Date.now() < (accessToken.exp * 1000) ? true : false;
      if(!tokenIsGood){
        <Navigate to="/signin" replace state={{ path: location.pathname }} />;
      } 
    }
    
    useEffect(() => {
        if(user?.sub && groupscorecard_id){
            /**
             * 1. fetch groupScorecard.
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
                const needsOwnerId = thisUserScorecard.ownerId === sub; 

                // Set user sub in DB, if not there already
                if(needsOwnerId){
                    axios.patch(userScorecardUrl, { ownerId: sub }, accessTokenConfig);
                    thisUserScorecard.ownerId = sub;
                }       
                // Set prediction, if necessary
                const needsPrediction = !thisUserScorecard.prediction
                if(needsPrediction){
                    setNeedsPrediction(true); 
                    setToggleModal(true);
                } else {
                    const setPredictionFighter = () => {
                        const { prediction } = thisUserScorecard;
                        const [fighter] = res.data.fighterData.filter( data => {
                            const { fighterId, lastName } = data;
                            const transformedPrediction = `${capFirstLetters(lastName)}, ${prediction.split(',')[1]}`; 
                            return prediction.includes(fighterId) ? setPrediction(transformedPrediction) : setNeedsPrediction(true);
                        });
                    }
                    setPredictionFighter();
                    setNeedsPrediction(false);
                }
                // Find current round
                const getCurrentRound = thisUserScorecard.scores.filter(score => score.fighterAScore !== 0);
                const result = res.data.groupScorecard.fightResult ? setFightResult(res.data.groupScorecard.fightResult) : null;
                setCurrentRound((getCurrentRound.length) + 1);
                setUserScorecard(thisUserScorecard);
                setUserScores(thisUserScorecard.scores);
                setMyGuestScorerIds(thisUserScorecard.guestScorerIds)
            }
            fetchGroupScorecard();
        } 
    }, [user, groupscorecard_id]);
    // handle setting scorecards
    useEffect(() => {
        if(userScorecard.fightId){

            const getCurrentRound = () => {
                const { scores, fighterIds } = userScorecard;
                console.log('fighterIds: ', fighterIds);
                const [ fighter1 ] = fighterIds;
                // console.log('fighter')
                return scores.filter( round => round[fighter1] > 0).length;
            }
            setCurrentRound( getCurrentRound() );
        }
            ////////////////////
            // function getScorecardTotals(scorecards){
                
                //     return scorecards
                // }
                // getScorecardTotals(scorecards);
    },[userScorecard]);
            
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
            return axios.patch(userScorecardUrl, { updatedGuestScorerArr }, accessTokenConfig)
                .then(res => {
                    console.log('res: ',res);
                    if(res.status === 200){
                        setDBCall(!dBCall);
                    }
                })
                .catch(err => console.log(err))
        }
    }

    // submit fight prediction.
    const handleSubmitPrediction = value => {
        console.log('value: ', value)
        if(predictionIsLocked(showData.show.showTime)) {
            setPredictionLock(true);
            return alert('Predictions are now locked!');
        }
        const [fighter] = fighterData.filter( data => {
            const { fighterId, lastName } = data;
            const transformedPrediction = `${capFirstLetters(lastName)}, ${value.split(',')[1]}`; 
            console.log('transformedPrediction: ', transformedPrediction);
            return value.includes(fighterId) ? setPrediction(transformedPrediction) : setNeedsPrediction(true);
        });
        return axios.patch(userScorecardUrl, {prediction: value}, accessTokenConfig)
        .then(res => {
            // console.log('res: ',res)
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
        // const url = process.env.REACT_APP_USER_SCORECARDS + `/${}` NEED A SCORECARD ID ON THERE!
        const url = 'url'
        const round = currentRound + 1;
        const { scores } = userScorecard;
        const filtered = scores.filter( ({ round }) => round != currentRound);
        const update = {
            ...sliderScores,
            round
        };
        return axios.put(url, update, accessTokenConfig)
            .then( res => console.log('res, 260: ', res))
            .catch( err => console.log(err))
            .finally(() => console.log('send scores in chat!'));

    };

    const { ownerDisplayName, finalScore } = userScorecard;
    const { rounds } = showData?.fight ? showData.fight : 0;
    // console.log('sliderScores: ', sliderScores)
    // console.log('group scorecard: ',groupScorecard)
    console.log('userScorecard: ', userScorecard);
    return (
        <Flex flexDir="column" position="relative">
            { needsPrediction && 
                <PredictionModal 
                    rounds={rounds}
                    setToggleModal={setToggleModal}
                    toggleModal={toggleModal}
                    fighterData={fighterData}
                    handleSubmitPrediction={handleSubmitPrediction} 
                    prediction={prediction}
                />
            }
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
                    fighterData={fighterData}
                    currentRound={currentRound}
                    scoringModal={scoringModal} 
                    toggleScoringModal={toggleScoringModal} 
                    currentRound={currentRound} 
                    sliderScores={sliderScores} 
                    setSliderScores={setSliderScores} 
                    groupScorecard={groupScorecard}
                    submitRoundScores={submitRoundScores}
                />
                <ChatSidebar 
                    accessTokenConfig={accessTokenConfig}
                    chatKey={chatKey}
                    displayName={ownerDisplayName}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    setNotificationTimeout={setNotificationTimeout}
                />
            </Flex>   
            {/* <ScoringTable fightResult={fightResult} prediction={prediction} fighterA={fighterA} fighterB={fighterB} totalRounds={totalRounds} currentRound={currentRound} scorecards={scorecards} /> */}
        </Flex>
    )
}
export default Scoring

const SliderHeading = ({ quickTitle }) => (
    <Heading textAlign="center" as="h2" size="lg">{quickTitle}</Heading>
)
{/* <ExpiredTokenModal openModal={!tokenIsGood} /> */}


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