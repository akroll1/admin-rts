import React, {useState} from 'react'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { BiChevronRightCircle, BiCog, BiBuoy, BiUserCircle, BiUser, BiEdit, BiStar, BiUserCheck, BiPlusCircle } from 'react-icons/bi'
import { AccountSwitcher } from './scoring-sidebar/account-switcher'
import { NavGroup } from './scoring-sidebar/nav-group'
import { NavItem } from './scoring-sidebar/nav-item'
import { FaLock, FaLockOpen, FaMapMarkerAlt, FaPlusCircle, FaRegClock, FaRegMoneyBillAlt, FaTrophy, FaTv, FaUserCog } from 'react-icons/fa'
import { capFirstLetters, parseEpoch, transformedWeightclass } from '../../utils'
import { IoScaleOutline } from 'react-icons/io5'
import { useScorecardStore, useStateStore } from '../../stores'
import { useNavigate } from 'react-router'

export const ScoringSidebarLeft = ({ 
    handleOpenAddMemberSubmitModal,
    modals, 
    setModals,
    tabs,
}) => {
    const navigate = useNavigate();
    const {
        fight,
        transformedPrediction,
        show,
        userScorecard,
    } = useScorecardStore();

    const adminUsername = 'ADMIN, fix this';
    const { availableGuestJudges } = useStateStore();
  
    const { odds, rounds, weightclass } = fight ? fight : '';
    const { finalScore } = userScorecard
    const { location, network, showTime } = show
    const isLocked = Date.now() > showTime

    const handlePredictionModalToggle = () => {
        if(isLocked){
            return alert('Predictions are locked.')
        }
        setModals({ ...modals, predictionModal: true });
    };
    const openMemberModal = () => {
        handleOpenAddMemberSubmitModal();
    }

    const gotToSearch = e => {
        console.log('e: ', e)
        const { id } = e.currentTarget;
        navigate(`/search/${id}`);
    }
    return (
        <Flex 
            display={tabs.sidebar ? 'flex' : 'none'}
            id="scoring_sidebar_left" 
            w="100%" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            position="relative" 
            alignItems="center" 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            p="2" 
            bg="gray.900" 
            color="white" 
            fontSize="sm"
            minH="100%"
        >
            <AccountSwitcher />
            <Stack 
                h="auto" 
                w="full" 
                spacing="4" 
                flex="1" 
                overflowY="scroll" 
                pt="8" 
                p="2"
            >
                <NavGroup label="Prediction">
                    <NavItem 
                        id="prediction"
                        icon={isLocked ? <FaLock /> : <FaLockOpen />} 
                        handlePredictionModalToggle={handlePredictionModalToggle}
                        label={<Button 
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _focus={{bg:'transparent'}} 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" 
                            pl="0" 
                            m="0"
                        >
                            { transformedPrediction ? transformedPrediction : 'Set Prediction' }
                        </Button>} 
                    /> 
                    <NavItem 
                        button="button" 
                        icon={<FaTrophy />} 
                        label={<Button 
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            _focus={{bg:'transparent', border: 'none'}} 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" 
                            pl="0"
                        >
                            Score&#58; {finalScore ? finalScore : `Not Official` }
                        </Button>} 
                    /> 
                </NavGroup>
               
                <NavGroup label="Show">
                    <NavItem icon={<FaTv />} label={ network } />
                    <NavItem icon={<FaMapMarkerAlt />} label={ location } />
                    <NavItem icon={<FaRegClock />} label={ parseEpoch(showTime) } />
                </NavGroup>

                <NavGroup label="Fight">
                    <NavItem icon={<BiChevronRightCircle />} label={ rounds ? rounds + ' Rounds' : '' } />
                    <NavItem icon={<IoScaleOutline />} label={ weightclass } />
                    <NavItem 
                        icon={<FaRegMoneyBillAlt />} 
                        label={<Button 
                            onClick={() => setModals( modals => ({ ...modals, moneylineModal: true }))}
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _hover={{background: 'transparent'}} 
                            variant="ghost" 
                            size="sm" 
                            pl="0" 
                            m="0"
                            _focus={{border: 'none'}}
                        >                    
                            { odds }
                        </Button>} 
                    />
                </NavGroup>
                
                <NavGroup active={true} label="Official Judges">
                    { availableGuestJudges?.length > 0 && availableGuestJudges.map( (judge, i) => <NavItem id={judge.guestJudgeId} icon={<BiUserCircle />} label={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`}  key={judge.guestJudgeId} />) }
                    <NavItem 
                        icon={<FaPlusCircle />} 
                        label={<Button 
                            onClick={() => setModals( modals => ({ ...modals, addGuestJudgeModal: true }))}
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" 
                            pl="0" 
                            m="0"
                            _focus={{border: 'none'}}
                        >                    
                            Add Guest Judge
                        </Button>} 
                    />
                </NavGroup>

                <NavGroup label="Group Members">
                    {/* { usernameAndUserId.length > 0 && usernameAndUserId.map( ({ username, ownerId }, i) => {
                        const isAdmin = adminUsername.toLowerCase() == username ? true : false;

                        return <NavItem href={`/scorecards/search/${ownerId}`} icon={isAdmin ? <FaUserCog /> : <BiUser />} label={username} key={i} />
                    })} */}
                
                <NavItem 
                    icon={<BiPlusCircle />} 
                    label={<Button 
                        onClick={openMemberModal}
                        _focus={{bg:'transparent', border: 'none'}} 
                        _hover="transparent" 
                        variant="ghost" 
                        size="sm" 
                        button={'button'}
                        justifyContent="flex-start" 
                        textAlign="left" 
                        fontSize="md" 
                        w="100%" 
                        my="-2"  
                        pl="0" 
                        m="0"
                    >
                        Add Group Member
                    </Button>} 
                />
                </NavGroup>
                <NavGroup label="Support">
                    <NavItem subtle icon={<BiCog />} label="Settings" />
                    <NavItem subtle icon={<BiBuoy />} label="Help & Support" />
                </NavGroup>
            </Stack>
        </Flex>
    )
}