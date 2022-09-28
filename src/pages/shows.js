import React, {useState, useEffect} from 'react'
import { Flex, useColorModePreference as mode, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ShowsSidebar } from '../components/sidebars'
import { ReviewFormModal } from '../components/modals'
import { useNavigate, useParams } from 'react-router'
import { removeBadEmails, REVIEW_TYPE, isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { ExpiredTokenModal } from '../components/modals'

import { useFightStore, useReviewStore, useStateStore } from '../stores'
import { useScorecardStore } from '../stores/scorecards'

const Shows = props => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const { user } = useStateStore();
    const { email, sub, username } = user;
    const { fetchFights, fetchFightSummary, fightSummary, fights, selectedFight } = useFightStore();
    const { checkForUserReview, fetchReviewsByFight, putUserReview, selectedFightReviews, userReview } = useReviewStore();
    const { createGroupScorecard } = useScorecardStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modals, setModals] = useState({
        expiredTokenModal: false
    });
    const [fightReviewForm, setFightReviewForm] = useState(false);
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
        fetchFights();
    },[])

    useEffect(() => {
        if(selectedFight.fightId){
            fetchReviewsByFight(selectedFight.fightId);
            fetchFightSummary(selectedFight.fightId);
        }
    }, [selectedFight]);

    useEffect(() => {
        if(fightReviewForm){
            checkForUserReview(selectedFight.fightId);
        }
    },[fightReviewForm])

    useEffect(() => {
        if(userReview){
            setReviewForm(userReview)
        }
    },[userReview]);
    
    const handleReviewFormSubmit = async () => {
        const putObj = Object.assign(reviewForm, {
            ownerId: sub,
            showId: fightSummary.show.showId,
            fightId: fightSummary.fight.fightId,
            username
        });

        const success = await putUserReview(putObj);
        if(success){
            toast({ 
                title: 'Review Submitted!',
                duration: 5000,
                status: 'success',
                isClosable: true
            });
            handleReviewFormClose()
        }
    }

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

    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
    };
    // 1. Close review form.
    const handleReviewFormClose = () => {
        setReviewForm({
            reviewId: null,
            title: '',
            rating: 0,
            review: ''
        });
        setFightReviewForm(false);
    }

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

    console.log('reviewForm: ', reviewForm)

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
            />  
            <ShowsMain 
                deleteMember={deleteMember}
                emailValue={emailValue}
                handleCreateGroupScorecard={handleCreateGroupScorecard}
                handleEmailSubmit={handleEmailSubmit}
                handleFormChange={handleFormChange}
                isSubmitting={isSubmitting}
                members={members}
                setFightReviewForm={setFightReviewForm}
                fightReviewForm={fightReviewForm}
            />
           
        </Flex>
    )
}
export default Shows