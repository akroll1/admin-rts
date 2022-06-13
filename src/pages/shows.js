import React, {useState, useEffect} from 'react'
import { Flex, useColorModePreference as mode, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ShowsSidebar } from '../components/sidebars'
import { v4 as uuidv4 } from 'uuid'
import { ReviewFormModal } from '../components/modals'
import { useUserStore } from '../stores'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router'
import { capFirstLetters, removeBadEmails, transformedOdds, validateEmail } from '../utils'
import { ShowsMain } from '../components/shows'

const Shows = props => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const toast = useToast();
    const user = useUserStore( user => user);
    const { email, sub, username } = user;
    let accessTokenConfig;
    const accessToken = localStorage.getItem('CognitoIdentityServiceProvider.' + process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username + '.accessToken');
    if(username && accessToken){
        accessTokenConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };        
    } else {
        <Navigate to="/signin" replace state={{ path: location.pathname }} />
    }
    const baseUrl = process.env.REACT_APP_SHOWS;
        
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState({});
    const [selectedShowFight, setSelectedShowFight] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showThePredictionForm, setShowThePredictionForm] = useState(false);
    const [userReview, setUserReview] = useState(null);
    const [predictionsAndReviews, setPredictionsAndReviews] = useState([]);
    const [reviewType, setReviewType] = useState('PREDICTION');
    const [selectedReview, setSelectedReview] = useState({})
    const [selectedShowMainEvent, setSelectedShowMainEvent] = useState({});
    const [fighters, setFighters] = useState([]);
    const [emailValue, setEmailValue] = useState('');
    const [groupScorecard, setGroupScorecard] = useState({
        admin: sub,
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
        members: [email],
        ownerDisplayName: username,
        ownerId: sub, 
        showId: '',
        totalRounds: 0,
        weightclass: '',
    });
    const [reviewForm, setReviewForm] = useState({
        reviewId: null,
        rating: 0,
        review: '',
        title: ''
    });
    /**
     * 1. Get the shows, all or if ID in params.
     * **/
    useEffect(() => {
        if(id && sub){ 
            const getShow = id => {
                const url = baseUrl + `/${id}`;
                axios.get(url, accessTokenConfig)
                    .then( res => {
                        setSelectedShow(res.data[0])
                    })
                    .catch( err => console.log(err))
            }
            getShow(id);
        }
        if(sub){
            const getAllShows = () => {
                return axios.get(baseUrl, accessTokenConfig)
                    .then(res => {
                        console.log('res, 86: ', res)
                        
                        setShows(res.data);
                        setSelectedShow(res.data[0]);
                    })
                    .catch(err => console.log(err));
            }
            getAllShows();
        }
    },[id, sub])
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
    // 1. handleShowSelect.
    const handleShowSelect = (id, reviewType) => {
        if(reviewType === 'REMINDER' || reviewType === 'HISTORICAL') return;

        const [selected] = shows.filter( show => show.showId === id)
        // console.log('selected: ', selected )
        setReviewType(reviewType);
        setSelectedShow(selected);
        setSelectedShowFight(selected.fight)
    };
        //groupscorecard form???
    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
    };
    // 1. Close review form.
    const handleReviewFormClose = () => {
        setTimeout(() => {
            setReviewForm({
                reviewId: null,
                title: '',
                rating: 0,
                review: ''
            });
            setShowReviewForm(false);
        },1000);
    }
    // 1. Submit the user review.
    const handleReviewFormSubmit = showReviewForm => {
        const url = process.env.REACT_APP_REVIEWS;
        const put = {
            owner: sub,
            displayName: username,
            showId: selectedShow.showId,
            reviewType: selectedShow.showTime > Date.now() ? 'REVIEW' : 'PREDICTION'
        };
        const putObj = Object.assign({}, showReviewForm, { ...put });
        console.log('putObj: ', putObj);
        return axios.put(url, putObj, accessTokenConfig)
            .then(res => {
                if(res.status === 200){
                    setUserReview(showReviewForm)
                    handleReviewFormClose();
                    return toast({ 
                        title: 'Review Submitted!',
                        duration: 5000,
                        status: 'success',
                        isClosable: true
                    })
                }
            }).catch(err => console.log(err));

    };
// 1. check if a user has already submitted a review for this. 
    useEffect(() => {
        if(showReviewForm){
            const getReview = async () => {
                const url = process.env.REACT_APP_REVIEWS + `user/${selectedShow.fightIds[0]}`;
                return axios.get(url, accessTokenConfig)
                .then(res => setUserReview(res.data))
                .catch(err => console.log(err));
            }
            getReview();
        }
    },[showReviewForm]);
    /**
     * 1. on selectedShow, get all the show Reviews
     */
    useEffect(() => {
        if(selectedShow.showId){
            const getSelectedShowReviews = async () => {
                const url = process.env.REACT_APP_REVIEWS + `${selectedShow.fightIds[0]}`;
                return await axios.get(url, accessTokenConfig)
                    .then(res => {
                        const reviewsArr = [];
                        const predictionsArr = [];
                        let reviewsObj = {
                            PREDICTION: predictionsArr, 
                            REVIEW: reviewsArr
                        };
                        if(res?.data?.length === 0){
                            return setPredictionsAndReviews(reviewsObj);
                        }
                        const [getReviews] = res?.data?.length > 0 && res?.data?.map( content => {
                            const { type } = content;
                            if(type === 'REVIEW'){
                                reviewsArr.push(content);
                            } else {
                                predictionsArr.push(content);
                            }
                            return ({ PREDICTION: predictionsArr, REVIEW: reviewsArr });
                        });
                        setPredictionsAndReviews(getReviews);
                    }).catch(err => console.log(err))
            } 
            getSelectedShowReviews();
        }
    },[selectedShow])

    // on selectedShow && selectedShow.showId, get the fighters.
    useEffect(() => {
        if(selectedShow.showId){
            const { fighterIds } = selectedShow.fight;
            console.log('fighterIds: ', fighterIds);
            const getFighters = async fighterIds => {
                const fighters = await Promise.all(fighterIds.map( async fighterId => {
                    const url = process.env.REACT_APP_FIGHTERS + `/${fighterId}`;
                    return axios.get(url, accessTokenConfig)
                        .then( res => res.data)
                        .catch( err => console.log(err));
                }))
                return setFighters(fighters);
            };
            getFighters(fighterIds);
        }
    }, [selectedShow])

    const handleScorecardSubmit = () => {
        const url = process.env.REACT_APP_GROUP_SCORECARDS;
        const tempMembersArr = members.concat(email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];
        const { showId, showName, location, showTime } = selectedShow;
        const { fightId, weightclass, totalRounds } = selectedShowMainEvent;
        const scorecardObj = {
            groupScorecardId: uuidv4(),
            fightId,
            showId,
            admin: sub,
            ownerId: sub,
            ownerDisplayName: username,
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
    
    const { members } = groupScorecard;
    return (
        <Flex 
            w="100%" 
            flexWrap="wrap" 
            height="auto" 
            flexDirection={["column",'column','row']} 
            color="white" 
            alignItems="flex-start" 
            justifyContent="center" 
            mb={6} 
            pb={8}
        >    
            { showReviewForm && 
                <ReviewFormModal 
                    reviewForm={reviewForm}
                    setReviewForm={setReviewForm}
                    handleReviewFormSubmit={handleReviewFormSubmit} 
                    handleReviewFormClose={handleReviewFormClose}
                />
            }

            <ShowsSidebar 
                shows={shows} 
                handleShowSelect={handleShowSelect} 
                selectedShowFight={selectedShowFight}
            />  
            <ShowsMain 
                fighters={fighters}
                selectedShowFight={selectedShowFight}
                predictionsAndReviews={predictionsAndReviews}
                userReview={userReview}
                showReviewForm={showReviewForm}
                setShowReviewForm={setShowReviewForm}
                selectedShow={selectedShow}
                reviewType={reviewType}
                handleEmailSubmit={handleEmailSubmit}
                deleteMember={deleteMember}
                members={members}
                emailValue={emailValue}
                handleFormChange={handleFormChange}
                handleScorecardSubmit={handleScorecardSubmit}
            />
           
        </Flex>
    )
}
export default Shows