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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modals, setModals] = useState({
        expiredTokenModal: false
    });
    const [fights, setFights] = useState([]);
    const [selectedFight, setSelectedFight] = useState(null);
    const [selectedFightSummary, setSelectedFightSummary] = useState({
        show: {
            location: '',
            network: '',
            promoter: '',
            showId: '' 
        },
        fight: {
            fightId: '',
            fightQuickTitle: '',
        },
        fighters: []
    });
    const [fightReviewForm, setFightReviewForm] = useState(false);
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

    useEffect(() => {
        const getFights = async () => {
            const url = process.env.REACT_APP_API + `/fights`;
            return axios.get(url, tokenConfig)
                .then(res => {
                    if(res.data.includes('Token expired')){
                        return setModals({ ...modals, expiredTokenModal: true });
                    }
                    setFights(res.data);
                })
                .catch(err => console.log(err));
        }
        getFights();
    },[])

    useEffect(() => {
        if(selectedFight){
            const getFightSummary = async () => {
                const url = process.env.REACT_APP_API + `/fights/${selectedFight.fightId}/summary`;
                return axios.get(url, tokenConfig)
                    .then( res => setSelectedFightSummary(res.data))
                    .catch( err => console.log(err))
            }
            getFightSummary();
        }
    }, [selectedFight]);

    useEffect(() => {
        if(selectedFightSummary.fight.fightId){
            const getSelectedFightReviews = async () => {
                const url = process.env.REACT_APP_API + `/reviews/${reviewType.toLowerCase()}/${selectedFightSummary.fight.fightId}`;
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
            getSelectedFightReviews();
        }
    },[selectedFightSummary])

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
    const getSelectedFightReview = (id, reviewType) => {
        if(reviewType === 'REMINDER' || reviewType === 'HISTORICAL') return;
        const [selected] = fights.filter( fight => fight.fightId === id)
        setReviewType(reviewType);
        setFightReviewForm(selected);
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
            setFightReviewForm(false);
        },200);
    }
    // 1. Submit the user review.
    const handleReviewFormSubmit = (fightReviewForm, verbType) => {
        let url = verbType === 'POST' 
            ? process.env.REACT_APP_API + `/reviews`
            : process.env.REACT_APP_API + `/reviews/${fightReviewForm.reviewId}`;
        const obj = {
            ...fightReviewForm,
            owner: sub,
            username,
            showId: selectedFightSummary.show.showId,
            fightId: selectedFightSummary.show.fightId,
            reviewType: Date.now() > selectedFightSummary.show.showTime ? REVIEW_TYPE.REVIEW : REVIEW_TYPE.PREDICTION
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
     * 1. Check if a user has already submitted a review for this. 
     * ** THIS CAN BE TWO OBJECTS, PREDICTION AND REVIEW! **
    */
    useEffect(() => {
        if(fightReviewForm){
            const getReview = async () => {
                const url = process.env.REACT_APP_API + `/reviews/user/${reviewType.toLowerCase()}/${selectedFightSummary.show.fightId}`;
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
    },[fightReviewForm]);

    const handleCreateGroupScorecard = async () => {
        setIsSubmitting(true);
        const url = process.env.REACT_APP_GROUP_SCORECARDS;

        const tempMembersArr = members.concat(email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];

        const scorecardObj = {
            admin: email, // necessary to create a groupScorecard, membersArr.
            fighterIds: [selectedFightSummary.fighters[0].fighterId, selectedFightSummary.fighters[1].fighterId],
            fightId: selectedFightSummary.show.fightId,
            groupScorecardName: selectedFightSummary.show.fightQuickTitle,
            members: dedupedEmails,
            ownerId: sub,
            rounds: selectedFightSummary.show.rounds,// here
            showId: selectedFightSummary.show.showId,
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
            }).catch(err => console.log(err))
            .finally(() => setIsSubmitting(false));
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
            <ExpiredTokenModal modals={modals} setModals={setModals} />
            { fightReviewForm && 
                <ReviewFormModal
                    reviewForm={reviewForm}
                    setReviewForm={setReviewForm}
                    handleReviewFormSubmit={handleReviewFormSubmit} 
                    handleReviewFormClose={handleReviewFormClose}
                />
            }

            <ShowsSidebar 
                fights={fights} 
                getSelectedFightReview={getSelectedFightReview} 
                selectedFight={selectedFight}
                setSelectedFight={setSelectedFight}
            />  
            <ShowsMain 
                deleteMember={deleteMember}
                emailValue={emailValue}
                handleCreateGroupScorecard={handleCreateGroupScorecard}
                handleEmailSubmit={handleEmailSubmit}
                handleFormChange={handleFormChange}
                isSubmitting={isSubmitting}
                members={members}
                predictionsAndReviews={predictionsAndReviews}
                reviewType={reviewType}
                selectedFightSummary={selectedFightSummary}
                setFightReviewForm={setFightReviewForm}
                fightReviewForm={fightReviewForm}
            />
           
        </Flex>
    )
}
export default Shows