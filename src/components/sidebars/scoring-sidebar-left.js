import { Collapse, Flex, Heading, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { ScorecardsNavGroup } from './scorecards-sidebar-components'
import { ScoringSidebarNavItem } from './scoring-sidebar/scoring-sidebar-nav-item'
import { 
    FaGavel,
    FaLock, 
    FaLockOpen, 
    FaMapMarkerAlt, 
    FaRegClock, 
    FaRegMoneyBillAlt, 
    FaTrophy, 
    FaTv 
} from 'react-icons/fa'
import { useScorecardStore, useStateStore } from '../../stores'
import { SidebarsDividerWithText } from '../../chakra'
import { IoScaleOutline } from 'react-icons/io5'
import { parseEpoch, transformedWeightclass } from '../../utils'

export const ScoringSidebarLeft = ({ 
    tabs,
}) => {
    const {
        fight,
        setModals,
        show,
        transformedPrediction,
        userScorecard,
    } = useScorecardStore()
    
    const { 
        availableGuestJudges 
    } = useStateStore()
    
    const [activeNavItem, setActiveNavItem] = useState('')
    const toast = useToast()
    const { finalScore = null } = userScorecard
    const { odds, rounds, weightclass } = fight ? fight : '';
    const { location, network, showTime } = show
    const isLocked = Date.now() > showTime
    const handlePredictionModalToggle = () => {
        if(isLocked){
            return alert('Predictions are locked.')
        }
        setModals('predictionModal', true);
    };
    const openMemberModal = () => {
        const isAdmin = false
        if(isAdmin){
            setModals('addMemberModal', true)
            return
        }
        toast({ 
            title: `Only group admin can add members.`,
            duration: 5000,
            status: 'info',
            isClosable: true
        })
    }

    const handleHideShow = id => {
        if(id === activeNavItem){
            setActiveNavItem('')
            return
        }
        setActiveNavItem(id)
    }

    return (
        <Flex 
            display={tabs.info || tabs.all ? 'flex' : 'none'}
            id="scoring_sidebar_left" 
            w="100%" 
            flex={["1 0 25%"]} 
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
            <SidebarsDividerWithText 
                fontSize={'1.5rem'} 
                text="Fight Info" 
                centered={tabs.all ? true : false}
            />
            <Flex 
                flexDir="column"
                h={"auto"}
                flex="1" 
                overflowY="scroll" 
                w="100%"
            >
                <Heading
                    mb="2"
                    pl="2"
                    _hover={{ color:'#fcfcfc'}}
                    fontSize="2xl"
                    color="#f0f0f0"
                    as="h3" 
                    size="md"
                >
                    {fight.fightQuickTitle}
                </Heading>

                <ScorecardsNavGroup
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="prediction"
                    label="Prediction"
                    active={activeNavItem === 'prediction'}
                >
                    <Collapse 
                        in={activeNavItem === 'prediction'} 
                        animateOpacity
                    >
                        <Flex
                            flexDir="column"
                            w="100%"
                            p="2"
                        >
                            <ScoringSidebarNavItem 
                                id="prediction"
                                icon={isLocked ? <FaLock /> : <FaLockOpen />} 
                                handlePredictionModalToggle={handlePredictionModalToggle}
                                label={ transformedPrediction ? transformedPrediction : 'Set Prediction' }
                            /> 
                            <ScoringSidebarNavItem 
                                id="moneyline"
                                button="button" 
                                icon={<FaTrophy />} 
                                label="FightSync"
                   
                            /> 
                        </Flex>
                    </Collapse>
                </ScorecardsNavGroup>
                
                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="judges"
                    label="Official Judges"
                    active={activeNavItem === 'judges'}
                >
                    <Collapse 
                        in={activeNavItem === 'judges'} 
                        animateOpacity
                    >
                        <Flex
                            flexDir="column"
                            w="100%"
                            p="2"
                        >
                        <ScoringSidebarNavItem 
                            icon={<FaGavel />} 
                            label="Official Judges"
                        />
                        </Flex>
                    </Collapse>
                </ScorecardsNavGroup>
                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="props"
                    label="Props"
                    active={activeNavItem === 'props'}
                >
                    <Collapse 
                        in={activeNavItem === 'props'} 
                        animateOpacity
                    >
                        <Flex
                            flexDir="column"
                            w="100%"
                            p="2"
                        >
                        <ScoringSidebarNavItem 
                            icon={<FaRegMoneyBillAlt />} 
                            label="Moneyline"
                        />
                        </Flex>
                    </Collapse>
                </ScorecardsNavGroup>
            </Flex>
        </Flex>
    )
}