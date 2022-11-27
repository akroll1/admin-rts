import {useState, useEffect} from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import { ShowsSidebar } from '../components/sidebars'
import { isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { 
    CreateGroupModal,
    ExpiredTokenModal, 
    ReviewFormModal 
} from '../components/modals'
import { useScorecardStore } from '../stores'
import { useNavigate } from 'react-router'

const Shows = () => {
    const toast = useToast();
    const navigate = useNavigate()
    const { 
        createGroupScorecard,
        fetchSeasonSummaries,
        putUserFightReview,
        selectedFightSummary, 
        selectedSeasonSummary,
        setModals,
        setTokenExpired,
        tokenExpired,
        user,
        userFightReview,
     } = useScorecardStore();
    const { email, sub, username } = user;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fightReviewForm, setFightReviewForm] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [groupScorecard, setGroupScorecard] = useState({
        fightId: '',
        fighterIds: [], // for scorecards creation.
        groupScorecardName: '',
        ownerId: sub,
        rounds: 12, // for scorecards creation.
        showId: '',
    });
    const [displayNameModal, setDisplayNameModal] = useState(false)
    const [invites, setInvites] = useState([email])
    const [reviewForm, setReviewForm] = useState({
        reviewId: null,
        rating: 0,
        review: '',
        title: ''
    });

    useEffect(() => {
        if(tokenExpired){
            setTokenExpired(true)
            setModals('expiredTokenModal', true)
        }
    },[tokenExpired])

    useEffect(() => {
        fetchSeasonSummaries()
    },[])

    useEffect(() => {
        if(userFightReview){
            setReviewForm(userFightReview)
        }
    },[userFightReview]);
    
    const handleReviewFormSubmit = async () => {
        const putObj = Object.assign(reviewForm, {
            ownerId: sub,
            showId: selectedFightSummary.show.showId,
            fightId: selectedFightSummary.fight.fightId,
            username
        });

        const success = await putUserFightReview(putObj);
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

    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
    };

    const handleReviewFormClose = () => {
        setReviewForm({
            reviewId: null,
            title: '',
            rating: 0,
            review: ''
        });
        setFightReviewForm(false);
    }

    const handleEmailSubmit = e => {
        e.preventDefault();
        // limit to 5 invites for now.
        const isValid = isValidEmail(emailValue);
        if(!emailValue) return;
        if(isValid){
            const tempInvites = invites.concat(emailValue);
            const dedupedEmails = [...new Set(tempInvites)];    
            if(dedupedEmails.length >= 5){
                alert('Group is limited to 5 members.')
                return
            } 
            setInvites(dedupedEmails)
            setEmailValue('');
            toast({
                title: `Added ${emailValue} to Group!`,
                duration: 5000,
                status: 'success',
                isClosable: true
            })
        } else {
            alert('Not a valid email.')
        }
    }

    const deleteInvite = e => {
        const { id } = e.currentTarget;
        const removedEmail = invites.filter( email => email !== id)
        setInvites(removedEmail)
    }

    const handleCreateSeasonScorecard = async createGroupOptions => {

        setIsSubmitting(true);
        const scorecardObj = {
            displayName: createGroupOptions.displayName,
            groupScorecardName: createGroupOptions.groupScorecardName,
            groupScorecardNotes: createGroupOptions.groupScorecardNotes,
            groupScorecardType: createGroupOptions.groupScorecardType,
            invites: invites.slice(1),
            sub,
            targetId: createGroupOptions.targetId
        }
        const created = await createGroupScorecard(scorecardObj);
        if(created){
            toast({ 
                title: 'Group Created!',
                duration: 5000,
                status: 'success',
                isClosable: true
            })
            setTimeout(() => {
                navigate('/scorecards')
            },3000)
        }
        setIsSubmitting(false);        
    };

    return (
        <Flex 
            w={["100%"]} 
            m="auto"
            flexWrap="wrap" 
            height="auto" 
            flexDirection={["column",'column','row']} 
            color="white" 
            alignItems="flex-start" 
            justifyContent="center" 
        >    
            <CreateGroupModal 
                displayNameModal={displayNameModal}
                handleCreateSeasonScorecard={handleCreateSeasonScorecard}
                setDisplayNameModal={setDisplayNameModal}
                username={username}
            />
            <ExpiredTokenModal />

            { fightReviewForm && 
                <ReviewFormModal
                    reviewForm={reviewForm}
                    setReviewForm={setReviewForm}
                    handleReviewFormSubmit={handleReviewFormSubmit}
                    handleReviewFormClose={handleReviewFormClose}
                />
            }

            <ShowsSidebar />  
            
            <ShowsMain 
                deleteInvite={deleteInvite}
                emailValue={emailValue}
                fightReviewForm={fightReviewForm}
                handleEmailSubmit={handleEmailSubmit}
                handleFormChange={handleFormChange}
                isSubmitting={isSubmitting}
                invites={invites}
                setDisplayNameModal={setDisplayNameModal}
                setFightReviewForm={setFightReviewForm}
                username={username}
            />
           
        </Flex>
    )
}
export default Shows