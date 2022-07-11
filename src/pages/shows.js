import React, {useState, useEffect} from 'react'
import { Flex, useColorModePreference as mode, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ShowsSidebar } from '../components/sidebars'
import { ReviewFormModal } from '../components/modals'
import { useNavigate, useParams } from 'react-router'
import { removeBadEmails, REVIEW_TYPE, isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { stateStore } from '../stores'

const Shows = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const { user, tokenConfig } = stateStore.getState();
    const { email, sub, username } = user;

    const baseUrl = process.env.REACT_APP_SHOWS;
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState({});
    const [selectedShowFight, setSelectedShowFight] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [predictionsAndReviews, setPredictionsAndReviews] = useState([]); 
    const [reviewType, setReviewType] = useState('PREDICTION');
    const [fighters, setFighters] = useState([]);
    const [emailValue, setEmailValue] = useState('');
    const [groupScorecard, setGroupScorecard] = useState({
        admin: email, // human readable form.
        fightId: '',
        fighterIds: [], // for scorecards creation.
        groupScorecardName: '',
        members: [email],
        ownerId: sub,
        rounds: 0, // for scorecards creation.
        showId: '',
        username, // for email invites && scorecards username.
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
                axios.get(url, tokenConfig)
                    .then( res => {
                        setSelectedShow(res.data[0])
                    })
                    .catch( err => console.log(err))
            }
            getShow(id);
        }
        if(sub){
            const getAllShows = () => {
                return axios.get(baseUrl, tokenConfig)
                    .then(res => {
                        // console.log('res, 86: ', res)
                        
                        setShows(res.data);
                        setSelectedShow(res.data[0]);
                        // need this for fightQuickTitle.
                        setSelectedShowFight(res.data[0].fight);
                    })
                    .catch(err => console.log(err));
            }
            getAllShows();
        }
    },[id, sub])
    const handleEmailSubmit = e => {
        e.preventDefault();
        if(isValidEmail(emailValue)){
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
        },200);
    }
    // 1. Submit the user review.
    const handleReviewFormSubmit = (showReviewForm, verbType) => {
        let url = verbType === 'POST' 
            ? process.env.REACT_APP_REVIEWS 
            : process.env.REACT_APP_REVIEWS + `/${showReviewForm.reviewId}`;
        const obj = {
            ...showReviewForm,
            owner: sub,
            username,
            showId: selectedShow.showId,
            fightId: selectedShow.fightIds[0],
            reviewType: Date.now() > selectedShow.showTime ? REVIEW_TYPE.REVIEW : REVIEW_TYPE.PREDICTION
        };
        const reviewObj = Object.assign({}, obj);
        return axios[verbType === 'POST' ? 'post' : 'put'](url, reviewObj, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    const filtered = predictionsAndReviews[reviewType].filter( review => review.owner !== reviewObj.owner);

                    const temp = filtered.concat(reviewObj);
                    setPredictionsAndReviews({ ...predictionsAndReviews, [reviewType]: temp })

                    return toast({ 
                        title: 'Review Submitted!',
                        duration: 5000,
                        status: 'success',
                        isClosable: true
                    })
                }
            }).catch(err => console.log(err))
            .finally(() => handleReviewFormClose());
    };

   
    /**
     * 1. on selectedShow, get all the show Reviews
     */
    useEffect(() => {
        if(selectedShow.showId){
            const getSelectedShowReviews = async () => {
                const url = process.env.REACT_APP_REVIEWS + `/${reviewType.toLowerCase()}/${selectedShow.fightIds[0]}`;
                return axios.get(url, tokenConfig)
                    .then( res => {
                        console.log('res: ', res)
                        const reviewsArr = [];
                        const predictionsArr = [];
                        let reviewsObj = {
                            [REVIEW_TYPE.PREDICTION]: predictionsArr, 
                            [REVIEW_TYPE.REVIEW]: reviewsArr
                        };
                        if(res.data?.length === 0){
                            return setPredictionsAndReviews(reviewsObj);
                        }
                        const reviews = res.data?.length > 0 && res.data?.map( review => {
                            const { reviewType } = review;
                            if(reviewType === REVIEW_TYPE.REVIEW){
                                reviewsArr.push(review);
                            }
                            if(reviewType === REVIEW_TYPE.PREDICTION){
                                predictionsArr.push(review);
                            }
                        });
                        setPredictionsAndReviews(reviewsObj);
                    }).catch(err => console.log(err))
            } 
            getSelectedShowReviews();
        }
    },[selectedShow])
    /**
     * 1. Check if a user has already submitted a review for this. 
     * ** THIS CAN BE TWO OBJECTS, PREDICTION AND REVIEW! **
     * **  **
    */
    useEffect(() => {
        if(showReviewForm){
            const getReview = async () => {
                const url = process.env.REACT_APP_REVIEWS + `/user/${reviewType.toLowerCase()}/${selectedShow.fightIds[0]}`;
                return axios.get(url, tokenConfig)
                    .then(res => {
                        if(res.data.reviewId){
                            setReviewForm(res.data);
                        }
                    })
                    .catch(err => console.log(err));
            }
            getReview();
        }
    },[showReviewForm]);
    // on selectedShow && selectedShow.showId, get the fighters.
    useEffect(() => {
        if(selectedShow.showId){
            const { fighterIds } = selectedShow.fight;
            const getFighters = async fighterIds => {
                const fighters = await Promise.all(fighterIds.map( async fighterId => {
                    const url = process.env.REACT_APP_FIGHTERS + `/${fighterId}`;
                    return await axios.get(url, tokenConfig)
                        .then( res => res.data)
                        .catch( err => console.log(err));
                }))
                return setFighters(fighters);
            };
            getFighters(fighterIds);
        }
    }, [selectedShow])

    const handleCreateGroupScorecard = async () => {
        const url = process.env.REACT_APP_GROUP_SCORECARDS;

        const tempMembersArr = members.concat(email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];

        const scorecardObj = {
            admin: email, // necessary to create a groupScorecard, membersArr.
            fighterIds: selectedShow.fight.fighterIds,
            fightId: selectedShow.fightIds[0],
            groupScorecardName: selectedShow.fight.fightQuickTitle,
            members: dedupedEmails,
            ownerId: sub,
            rounds: selectedShow.fight.rounds,
            showId: selectedShow.showId,
            username
        };

        /////////////////////////////////////////////
        // checking for a previous groupScorecard
        return axios.post(url, scorecardObj, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    const { groupScorecardId } = res.data;
                    // this is fine, group scorecards is just under development.
                    return navigate(`/dashboard/scorecards`);
                }
            })
            .catch(err => console.log(err));
    };
    // console.log('selectedShow: ' , selectedShow);
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
                showReviewForm={showReviewForm}
                setShowReviewForm={setShowReviewForm}
                selectedShow={selectedShow}
                reviewType={reviewType}
                handleEmailSubmit={handleEmailSubmit}
                deleteMember={deleteMember}
                members={members}
                emailValue={emailValue}
                handleFormChange={handleFormChange}
                handleCreateGroupScorecard={handleCreateGroupScorecard}
            />
           
        </Flex>
    )
}
export default Shows