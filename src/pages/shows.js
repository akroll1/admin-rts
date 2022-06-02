import React, {useState, useEffect} from 'react'
import { Divider, Flex, useColorModePreference as mode, useToast } from '@chakra-ui/react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useParams } from 'react-router'
import { ShowCard } from '../components/tables/shows-page-show-card'
import { ShowsSidebar } from '../components/sidebars'
import { capFirstLetters } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { validateEmail, removeBadEmails } from './helpers'
import { v4 as uuidv4 } from 'uuid'
import { ShowsCountdownTimer } from '../components/timers'
import { ReviewForm } from '../components/forms'
import { ShowReviews } from '../components/shows-components'
import { ShowsCreateGroupScorecard, ShowsMetadata, ShowStoryline } from '../components/shows-components'

const Shows = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const username = sessionStorage.getItem('username');
    const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
    let accessToken, idToken, decodedAccessToken, decodedIdToken, sub, idTokenConfig, accessTokenConfig, tokenIsGood;
    if(username && localStorageString){
        accessToken = localStorage.getItem(localStorageString + '.accessToken');
        idToken = localStorage.getItem(localStorageString + '.idToken');
        decodedAccessToken = jwt_decode(accessToken);
        decodedIdToken = jwt_decode(idToken);
        sub = decodedIdToken.sub;
        idTokenConfig = {
            headers: { Authorization: `Bearer ${idToken}` }
        };        
        accessTokenConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
        tokenIsGood = Date.now() < (decodedIdToken.exp * 1000) ? true : false;

    } else { 
        navigate('/signin', {page: '/scoring'});
    }
    const baseUrl = process.env.REACT_APP_SHOWS;
        
    const [shows, setShows] = useState([]);
    const [showTheReviewForm, setShowTheReviewForm] = useState(false);
    const [userReview, setUserReview] = useState({});
    const [showReviews, setShowReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState({})
    const [selectedShow, setSelectedShow] = useState({
        showId: '',
        fights: [],
        showName: '',
        location: '',
        network: '',
        promoter: '',
        showStoryLine: '',
        showTime: '',
        isFeaturedShow: true,
        contactInfo: {},
        firstName: '',
        lastName: '',
        ringname: '',
        fighters: []
    });
    const [selectedShowMainEvent, setSelectedShowMainEvent] = useState({});
    const [fighters, setFighters] = useState([]);
    const [emailValue, setEmailValue] = useState('');
    const [groupScorecard, setGroupScorecard] = useState({
        admin: decodedIdToken?.sub ? decodedIdToken.email : '',
        featuredShowId: '',
        fightDateTime: '',
        fighterA: '',
        fighterB: '',
        fighterAId: '',
        fighterBId: '',
        fighterStatus: 'pro',
        fightId: '',
        fightResult: null,
        groupScorecardId:  uuidv4(),
        groupScorecardName: '',
        groupScorecardNotes: '',
        location: '',
        members: decodedIdToken?.sub ? [decodedIdToken.email] : [],
        ownerDisplayName: decodedIdToken?.sub ? decodedIdToken['cognito:username'] : '',
        ownerId: decodedIdToken?.sub ? decodedIdToken.sub : '', 
        showId: '',
        totalRounds: 0,
        weightclass: '',
    })

    useEffect(() => {
        if(id){ 
            const getShow = id => {
                const url = baseUrl + `/${id}`;
                axios.get(url, accessTokenConfig)
                    .then( res => {
                        setSelectedShow(res.data[0])
                        return parseShowData(res.data)
                    })
                    .catch( err => console.log(err))
            }
            getShow(id);
        }
        if(tokenIsGood){
            const getAllShows = () => {
                return axios.get(baseUrl, accessTokenConfig)
                    .then(res => {
                        setShows(res.data)
                        parseShowData(res.data[0])
                    })
                    .catch(err => console.log(err));
            }
            getAllShows();
        }
    },[tokenIsGood, id])
    
    useEffect(() => {
        // this checks for if a user has written a previous review of the fight...
        const getReview = async () => {
            const url = process.env.REACT_APP_REVIEWS + `user/${selectedShow.fights[0].fightId}`;
            return axios.get(url, accessTokenConfig)
            .then(res => {
                setUserReview(res.data)
            })
            .catch(err => console.log(err))
        }
        if(showTheReviewForm){
            getReview();
        } else {
            setUserReview(null);
            setShowTheReviewForm(false);
        }

    },[showTheReviewForm]);

    function parseShowData(show) {
        const isMainEvent = show.fights.filter( fight => fight.isMainEvent);
        console.log('isMainEvent: ',isMainEvent)
        const { fighters } = isMainEvent[0];
        setFighters(isMainEvent[0].fighters);
        setSelectedShowMainEvent(isMainEvent[0]);
        setSelectedShow({...show, isMainEvent, fighters });
    }
    const handleEmailSubmit = e => {
        e.preventDefault();
        if(validateEmail(emailValue)){
            const { members } = groupScorecard;
            const tempMembers = members.concat(emailValue);
            setGroupScorecard({...groupScorecard, members: tempMembers});
            setEmailValue('');
        } else {
            alert('Not a valid email.')
        }
    }

    const deleteMember = e => {
        const { id } = e.currentTarget;
        const { members } = groupScorecard;
        const tempMembersArr = members.filter( member => member !== id)
        return setGroupScorecard({...groupScorecard, members: tempMembersArr});
    }

    const handleShowSelect = e => {
        const { id } = e.currentTarget;
        if(id === 'reminder' || id === 'historical') return
        const showSelected = shows.filter( show => show.showId === id)
        return parseShowData(showSelected[0]);
    };

    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
    };
  
    const handleReviewFormSubmit = showReviewForm => {
        showReviewForm.id = selectedShow.fights[0].fightId;
        showReviewForm.displayName = decodedIdToken['cognito:username'];
        showReviewForm.owner = decodedIdToken.sub;
        showReviewForm.showId = selectedShow.showId; 
        showReviewForm.reviewType = selectedShow.showTime > Date.now() ? 'PREFIGHT' : 'POSTFIGHT';
        if(!userReview){
            showReviewForm.createdAt = Date.now();
            showReviewForm.upvotes = 0;
            showReviewForm.downvotes = 0;
        }
        // console.log('showReviewForm, /shows 164: ', showReviewForm)
        const url = process.env.REACT_APP_REVIEWS;
        return axios.put(url, showReviewForm, accessTokenConfig)
            .then(res => {
                if(res.status === 200){
                    setUserReview(showReviewForm)
                    return toast({ 
                        title: 'Review Submitted!',
                        duration: 5000,
                        status: 'success',
                        isClosable: true
                    })
                }
            }).catch(err => console.log(err));
    };

    useEffect(() => {
        // this gets all reviews for a selected show...
        const getSelectedShowReviews = async () => {
            const url = process.env.REACT_APP_REVIEWS + `${selectedShow.fights[0].fightId}`;
            return axios.get(url, accessTokenConfig)
                .then(res => setShowReviews(res.data))
                .catch(err => console.log(err))
        } 
        if(selectedShow.fights.length > 0){
            getSelectedShowReviews();
        }
    },[selectedShow])

    const handleScorecardSubmit = () => {
        const url = process.env.REACT_APP_GROUP_SCORECARDS;
        const tempMembersArr = members.concat(decodedIdToken.email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];
        const { showId, showName, location, showTime } = selectedShow;
        const { fightId, weightclass, totalRounds } = selectedShowMainEvent;
        const scorecardObj = {
            groupScorecardId: uuidv4(),
            fightId,
            showId,
            admin: decodedAccessToken.sub,
            ownerId: decodedAccessToken.sub,
            ownerDisplayName: decodedAccessToken.username,
            groupScorecardName: showName,
            fighterA: fighters[0].firstName + ' ' + fighters[0].lastName,
            fighterB: fighters[1].firstName + ' ' + fighters[1].lastName,
            fighterAId: fighters[0].fighterId,
            fighterBId: fighters[1].fighterId,
            weightclass,
            totalRounds,
            members: dedupedEmails,
            fighterStatus: 'pro',
            location,
            fightDateTime: showTime,
            featuredShowId: showId,
            fightResult: null
        };
        console.log('scorecardObj: ',scorecardObj);

        return axios.post(url, scorecardObj, accessTokenConfig)
            .then(res => {
                if(res.status === 200){
                    const { groupScorecardId } = res.data;
                    return navigate(`/scoring/${groupScorecardId}`);
                }
            })
            .catch(err => console.log(err));
    };

    const fighterAName = fighters.length > 0 ? capFirstLetters(fighters[0].firstName + ' ' + fighters[0].lastName): '';
    const fighterBName = fighters.length > 0 ? capFirstLetters(fighters[1].firstName + ' ' + fighters[1].lastName): '';
    const { members } = groupScorecard;
    const { promoter, location, showStoryline, showTime } = selectedShow && selectedShow.promoter ? selectedShow : ''; 
    const { fightOdds } = selectedShowMainEvent.fightId ? selectedShowMainEvent : '';
    const transformedOdds = rawOdds => {
        const uppercase = rawOdds.split(',');
        const lowered = uppercase[0].charAt(0).toUpperCase() + uppercase[0].slice(1).toLowerCase() + ' ' + uppercase[1];
        return lowered;
    };
    const odds = fightOdds ? transformedOdds(fightOdds) : null;
    const displayTime = showTime > Date.now();
    console.log('selectedShow: ', selectedShow);
    // console.log('userReview: ',userReview);
    // console.log('showTheReviewForm: ', showTheReviewForm);
    console.log('showReviews: ', showReviews);
    return (
        <Flex w="100%" flexWrap="wrap" height="auto" flexDirection={["column",'column','row']} color="white" alignItems="flex-start" justifyContent="center" mb={6} pb={8}>    
            { showTheReviewForm && <ReviewForm userReview={userReview} handleReviewFormSubmit={handleReviewFormSubmit} showTheReviewForm={showTheReviewForm} setShowTheReviewForm={setShowTheReviewForm}/>}
            <Flex flex="1 0 23%" padding="3" width="100%" height="75%" overflow="scroll" position="relative">
                <ShowsSidebar showReviews={showReviews} shows={ shows } handleShowSelect={ handleShowSelect } />
            </Flex>            
            <Flex bg={mode('gray.900', 'white.500')} w="100%" flexDirection="column" boxSizing="border-box" flex="1 0 70%" mb={3} borderRadius="md">
                <ShowsMetadata
                    fighterAName={fighterAName} 
                    fighterBName={fighterBName}
                    promoter={promoter}
                    location={location}
                    showTime={showTime} 
                />
                
                <Flex mt="3" w="100%" flexDirection="column" justifyContent="space-between" alignItems="center">
                    <ShowCard fighters={fighters} showTime={showTime} />
                    { displayTime && <ShowsCountdownTimer showTime={showTime} /> }
                    { displayTime && <ShowStoryline showStoryline={showStoryline} fightOdds={fightOdds} odds={odds} /> }
                </Flex>
                {   !displayTime && <ShowReviews showReviews={showReviews} userReview={userReview} showTheReviewForm={showTheReviewForm} setShowTheReviewForm={setShowTheReviewForm} /> }
                <Divider />
                {   displayTime && <ShowsCreateGroupScorecard deleteMember={deleteMember} emailValue={emailValue} handleEmailSubmit={handleEmailSubmit} handleFormChange={handleFormChange} handleScorecardSubmit={handleScorecardSubmit} members={members} /> }
            </Flex>    
        </Flex>
    )
}
export default Shows