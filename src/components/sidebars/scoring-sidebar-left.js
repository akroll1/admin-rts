import { 
    useEffect, 
    useState 
} from 'react'
import { Collapse, Flex, Heading, useToast } from '@chakra-ui/react'
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
import { MdOnlinePrediction } from 'react-icons/md'
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
    
    const [activeNavGroupItem, setActiveNavGroupItem] = useState({
        fight: true,
        prediction: false,
        officialJudges: false,
        props: false
    })

    const toast = useToast()
    const { finalScore = null } = userScorecard
    const { rounds, weightclass } = fight ? fight : '';
    const { location, network, showTime } = show
    const isLocked = Date.now() > showTime

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
        if(id === 'fight') return
        setActiveNavGroupItem(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const handleOpenGuestJudgeModal = () => {
        setModals('addGuestJudgeModal', true)
    }

    const handleMoneylineModal = () => {
        setModals('moneylineModal', true)
    }

    const handlePredictionModalToggle = () => {
        if(isLocked){
            return alert('Predictions are locked.')
        }
        setModals('predictionModal', true);
    };

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
            p="1" 
            bg={tabs.info ? "inherit" : "'fsl-scoring-sidebar-bg'"}
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
                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="fight"
                    label={fight.fightQuickTitle}
                    active={activeNavGroupItem['fight']}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <ScoringSidebarNavItem 
                            id="weightclass"
                            icon={<IoScaleOutline />} 
                            label={ weightclass ? transformedWeightclass(weightclass) : '' }
                        /> 
                        <ScoringSidebarNavItem 
                            id="network"
                            icon={<FaTv />} 
                            label={ network ? network : '' }
                        /> 
                        <ScoringSidebarNavItem 
                            id="time"
                            icon={<FaRegClock />} 
                            label={ showTime ? parseEpoch(showTime) : '' }
                        /> 
                    </Flex>
                </ScorecardsNavGroup>
                <ScorecardsNavGroup
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="prediction"
                    label="Prediction"
                    active={activeNavGroupItem['prediction']}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            w="100%"
                            in={activeNavGroupItem['prediction']} 
                            animateOpacity
                        >
                            <ScoringSidebarNavItem 
                                id="prediction"
                                icon={isLocked ? <FaLock /> : <FaLockOpen />} 
                                onclickOption={handlePredictionModalToggle}
                                label={ transformedPrediction ? transformedPrediction : 'Set Prediction' }
                            /> 
                            <ScoringSidebarNavItem 
                                id="fslPrediction"
                                button="button" 
                                icon={<MdOnlinePrediction size="1.1rem" />} 
                                label="FSL Predictions- "
                            /> 
                        </Collapse>
                    </Flex>
                </ScorecardsNavGroup>
                
                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="officialJudges"
                    label="Official Judges"
                    active={activeNavGroupItem['officialJudges']}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            in={activeNavGroupItem['officialJudges']} 
                            animateOpacity
                        >
                            <ScoringSidebarNavItem 
                                onclickOption={handleOpenGuestJudgeModal}
                                icon={<FaGavel />} 
                                label="Official Judges"
                            />
                        </Collapse>
                    </Flex>
                </ScorecardsNavGroup>
                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="props"
                    label="Props"
                    active={activeNavGroupItem['props']}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            in={activeNavGroupItem['props']} 
                            animateOpacity
                        >
                            <ScoringSidebarNavItem 
                                onclickOption={handleMoneylineModal}
                                icon={<FaRegMoneyBillAlt />} 
                                label="Moneyline"
                            />
                        </Collapse>
                    </Flex>
                </ScorecardsNavGroup>
            </Flex>
        </Flex>
    )
}