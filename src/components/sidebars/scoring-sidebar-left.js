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

    return (
        <Flex 
            display={tabs.info || tabs.all ? 'flex' : 'none'}
            id="scoring_sidebar_left" 
            w="100%" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            position="relative" 
            alignItems="center" 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            p="2" 
            bg={tabs.info ? "inherit" : "fsl-sidebar-bg"}
            color={tabs.info ? "#dadada" : "#c8c8c8"}
            fontSize="sm"
            minH={tabs.info ? "75vh" : "100%"}
        >
            <AccountSwitcher />
            <Stack 
                h={"auto"}
                w="full" 
                spacing="2" 
                flex="1" 
                overflowY="scroll" 
                pt="8" 
                p="2"
            >
                <NavGroup tabs={tabs} label="Prediction">
                    <NavItem 
                        id="prediction"
                        icon={isLocked ? <FaLock /> : <FaLockOpen />} 
                        handlePredictionModalToggle={handlePredictionModalToggle}
                        label={<Button 
                            color="fsl-text"
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _focus={{bg:'transparent'}} 
                            _hover="transparent" 
                            variant="ghost" 
                            size="xs" 
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
                            color="fsl-text"
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
               
                <NavGroup tabs={tabs} label="Show">
                    <NavItem icon={<FaTv />} color="fsl-text" label={ network } />
                    <NavItem icon={<FaMapMarkerAlt />} color="fsl-text" label={ location } />
                    <NavItem icon={<FaRegClock />} label={ parseEpoch(showTime) } />
                </NavGroup>

                <NavGroup tabs={tabs} label="Fight">
                    <NavItem icon={<BiChevronRightCircle />} label={ rounds ? rounds + ' Rounds' : '' } />
                    <NavItem icon={<IoScaleOutline />} color="fsl-text" label={ transformedWeightclass(weightclass) } />
                    <NavItem 
                        icon={<FaRegMoneyBillAlt />} 
                        label={<Button 
                            color="fsl-text"                             
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
                
                <NavGroup tabs={tabs} active={true} label="Official Judges">
                    { availableGuestJudges?.length > 0 && availableGuestJudges.map( (judge, i) => <NavItem color="fsl-text" id={judge.guestJudgeId} icon={<BiUserCircle />} label={`${capFirstLetters(judge.firstName)} ${capFirstLetters(judge.lastName)}`}  key={judge.guestJudgeId} />) }
                    <NavItem 
                        icon={<FaPlusCircle />} 
                        label={<Button 
                            color="fsl-text" 
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

                <NavGroup tabs={tabs} label="Group Members">
                    {/* { usernameAndUserId.length > 0 && usernameAndUserId.map( ({ username, ownerId }, i) => {
                        const isAdmin = adminUsername.toLowerCase() == username ? true : false;

                        return <NavItem href={`/scorecards/search/${ownerId}`} icon={isAdmin ? <FaUserCog /> : <BiUser />} label={username} key={i} />
                    })} */}
                
                <NavItem color="fsl-text" 
                    icon={<BiPlusCircle />} 
                    label={<Button 
                        color="fsl-text" 
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
                <NavGroup tabs={tabs} label="Support">
                    <NavItem subtle icon={<BiCog />} label="Settings" />
                    <NavItem subtle icon={<BiBuoy />} label="Help & Support" />
                </NavGroup>
            </Stack>
        </Flex>
    )
}