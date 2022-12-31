import {useState, useEffect} from 'react'
import { Flex } from '@chakra-ui/react'
import { ShowsSidebar } from '../components/sidebars'
import { isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { 
    CreateGroupModal,
    ReviewFormModal 
} from '../components/modals'
import { SpinnerMain } from '../components/spinner'
import { useGlobalStore } from '../stores'
import { useNavigate } from 'react-router'

const Shows = () => {

    const navigate = useNavigate()
    const { 
        createGroupScorecard,
        fetchSeasonSummary,
        isSubmitting,
        putUserFightReview,
        selectedFightSummary, 
        setToast,
        user,
        userFightReview,
    } = useGlobalStore();
    const { username } = user;
    const email = user?.attributes?.email ? user.attributes.email : ''
    const sub = user?.attributes?.sub ? user.attributes.sub : ''

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
    const [isError, setIsError] = useState(false)
    const [isAdminError, setIsAdminError] = useState(false)

    useEffect(() => {
        fetchSeasonSummary('active')
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

        await putUserFightReview(putObj);
    }

    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
    };

    const resetInput = () => {
        setEmailValue('')
        setIsAdminError(false)
        setIsError(false)
    }

    const handleEmailSubmit = e => {
        e.preventDefault();
        // limit to 5 invites for now.
        const isValid = isValidEmail(emailValue);
        if(!emailValue){
            setIsError(true)
            return
        }
        if(isValid){
            if(emailValue === user.email){
                setIsError(true)
                setIsAdminError(true)
                return
            }
            const tempInvites = invites.concat(emailValue);
            const dedupedEmails = [...new Set(tempInvites)];    
            if(dedupedEmails.length >= 5){
                alert('Group is limited to 5 members.')
                return
            } 
            setInvites(dedupedEmails)
            setEmailValue('');
            setIsError(false)
            setIsAdminError(false)
            setToast({
                title: `${emailValue} added to Group!`,
                duration: 5000,
                status: 'info',
                isClosable: true
            })
        } else {
            setIsError(true)
            return
        }
    }

    const deleteInvite = e => {
        const { id } = e.currentTarget;
        const removedEmail = invites.filter( email => email !== id)
        setInvites(removedEmail)
    }

    const handleCreateSeasonScorecard = async createGroupOptions => {

        const scorecardObj = {
            displayName: createGroupOptions.displayName,
            groupScorecardName: createGroupOptions.groupScorecardName,
            groupScorecardNotes: createGroupOptions.groupScorecardNotes,
            groupScorecardType: createGroupOptions.groupScorecardType,
            invites: invites.slice(1),
            sub,
            targetId: createGroupOptions.targetId
        }
        createGroupScorecard(scorecardObj);  
        // need logic to add another member, if members < 5.   

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
            <ReviewFormModal />
            <CreateGroupModal 
                displayNameModal={displayNameModal}
                handleCreateSeasonScorecard={handleCreateSeasonScorecard}
                setDisplayNameModal={setDisplayNameModal}
                username={username}
            />
                {isSubmitting && !selectedFightSummary?.fight?.fightId
                    ?
                        <SpinnerMain />
                    :
                        <>
                            <ShowsSidebar />  
                            <ShowsMain 
                                deleteInvite={deleteInvite}
                                emailValue={emailValue}
                                handleEmailSubmit={handleEmailSubmit}
                                handleFormChange={handleFormChange}
                                isError={isError}
                                isAdminError={isAdminError}
                                invites={invites}
                                resetInput={resetInput}
                                setDisplayNameModal={setDisplayNameModal}
                                username={username}
                            />
                        </>
                }   
        </Flex>
    )
}
export default Shows