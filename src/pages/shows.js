import React, {useState, useEffect} from 'react'
import { Flex, useColorModePreference as mode, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ShowsSidebar } from '../components/sidebars'
import { ReviewFormModal } from '../components/modals'
import { useNavigate, useParams } from 'react-router'
import { removeBadEmails, REVIEW_TYPE, isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { ExpiredTokenModal } from '../components/modals'

import { useFightStore, useStateStore } from '../stores'
import { useScorecardStore } from '../stores/scorecards'

const Shows = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const { user, tokenConfig } = useStateStore();
    const { fetchFights, fetchFightSummary, fightSummary, fights, selectedFight } = useFightStore();
    const { createGroupScorecard } = useScorecardStore();
    const { email, sub, username } = user;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modals, setModals] = useState({
        expiredTokenModal: false
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
        const fights = fetchFights();
    },[])
    // this could be handled by above.
    useEffect(() => {
        if(selectedFight.fightId){
            fetchFightSummary(selectedFight.fightId);
        }
    }, [selectedFight]);

    useEffect(() => {
        if(fightSummary.fight.fightId){
            const getSelectedFightReviews = async () => {
                const url = process.env.REACT_APP_API + `/reviews/${reviewType.toLowerCase()}/${fightSummary.fight.fightId}`;
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
    },[fightSummary])

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
            showId: fightSummary.show.showId,
            fightId: fightSummary.show.fightId,
            reviewType: Date.now() > fightSummary.show.showTime ? REVIEW_TYPE.REVIEW : REVIEW_TYPE.PREDICTION
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
                const url = process.env.REACT_APP_API + `/reviews/user/${reviewType.toLowerCase()}/${fightSummary.show.fightId}`;
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
        // this can be pushed down to zustand.
        const tempMembersArr = members.concat(email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];

        const scorecardObj = {
            admin: email, // necessary to create a groupScorecard, membersArr.
            fighterIds: [fightSummary.fighters[0].fighterId, fightSummary.fighters[1].fighterId],
            fightId: fightSummary.fight.fightId,
            groupScorecardName: fightSummary.fight.fightQuickTitle,
            members: dedupedEmails,
            ownerId: sub,
            rounds: fightSummary.fight.rounds,
            showId: fightSummary.show.showId,
        };
        const created = await createGroupScorecard(scorecardObj);
        console.log('created: ', created);
        if(created){
            toast({ 
                title: 'Group Created!',
                duration: 5000,
                status: 'success',
                isClosable: true
            })
        }
        setIsSubmitting(false);        
    };
    const { members } = groupScorecard;
    // console.log('fightSummary: ', fightSummary)
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
                setFightReviewForm={setFightReviewForm}
                fightReviewForm={fightReviewForm}
            />
           
        </Flex>
    )
}
export default Shows