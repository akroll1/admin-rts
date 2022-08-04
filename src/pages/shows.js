import React, {useState, useEffect} from 'react'
import { Flex, useColorModePreference as mode, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ShowsSidebar } from '../components/sidebars'
import { ReviewFormModal } from '../components/modals'
import { useNavigate, useParams } from 'react-router'
import { removeBadEmails, REVIEW_TYPE, isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { ExpiredTokenModal } from '../components/modals'

import { stateStore } from '../stores'

const Shows = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const { user, tokenConfig } = stateStore.getState();
    const { email, sub, username } = user;
    const [modals, setModals] = useState({
        expiredTokenModal: false
    });
    const baseUrl = process.env.REACT_APP_SHOWS;
    const [shows, setShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState({
        show: {
            fightQuickTitle: '',
            location: '',
            promoter: '', 
            network: '',
            fighters: []
        },
        fighters: []
    });
    const [selectedShowFight, setSelectedShowFight] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [predictionsAndReviews, setPredictionsAndReviews] = useState([]); 
    const [reviewType, setReviewType] = useState('PREDICTION');
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
        // if(id && sub){ 
        //     const getShow = id => {
        //         const url = baseUrl + `/${id}`;
        //         axios.get(url, tokenConfig)
        //             .then( res => {
        //                 setSelectedShow(res.data[0])
        //             })
        //             .catch( err => console.log(err))
        //     }
        //     getShow(id);
        // }
        if(sub){
            const getAllShows = () => {
                return axios.get(baseUrl, tokenConfig)
                    .then(res => {
                        if(res.data.includes('Token expired')){
                            return setModals({ ...modals, expiredTokenModal: true });
                        }
                        console.log('res.data: ', res.data)
                        setShows(res.data);
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
        const [selected] = shows.filter( show => show.show.showId === id)
        setReviewType(reviewType);
        setSelectedShow(selected);
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
            showId: selectedShow.show.showId,
            fightId: selectedShow.show.fightId,
            reviewType: Date.now() > selectedShow.show.showTime ? REVIEW_TYPE.REVIEW : REVIEW_TYPE.PREDICTION
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
        if(selectedShow.show.showId){
            const getSelectedShowReviews = async () => {
                const url = process.env.REACT_APP_REVIEWS + `/${reviewType.toLowerCase()}/${selectedShow.show.fightId}`;
                return axios.get(url, tokenConfig)
                    .then( res => {
                        // console.log('res: ', res)
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
                const url = process.env.REACT_APP_REVIEWS + `/user/${reviewType.toLowerCase()}/${selectedShow.show.fightId}`;
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

    const handleCreateGroupScorecard = async () => {
        const url = process.env.REACT_APP_GROUP_SCORECARDS;

        const tempMembersArr = members.concat(email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];

        const scorecardObj = {
            admin: email, // necessary to create a groupScorecard, membersArr.
            fighterIds: [selectedShow.fighters[0].fighterId, selectedShow.fighters[1].fighterId],
            fightId: selectedShow.show.fightId,
            groupScorecardName: selectedShow.show.fightQuickTitle,
            members: dedupedEmails,
            ownerId: sub,
            rounds: selectedShow.show.rounds,// here
            showId: selectedShow.show.showId,
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
            <ExpiredTokenModal modals={modals} setModals={setModals} />
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
            />  
            <ShowsMain 
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