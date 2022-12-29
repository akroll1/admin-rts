import { useState } from 'react'
import { 
    Collapse, 
    Flex, 
    useToast 
} from '@chakra-ui/react'
import { ScoringSidebarNavItem } from './scoring-sidebar/scoring-sidebar-nav-item'
import { ScorecardsNavGroup } from './scorecards-sidebar-components/scorecards-boards/scorecards-nav-group'
import { 
    FaGavel,
    FaLock, 
    FaLockOpen, 
    FaRegClock, 
    FaRegMoneyBillAlt, 
    FaTv 
} from 'react-icons/fa'
import { IoScaleOutline } from 'react-icons/io5'
import { MdOnlinePrediction } from 'react-icons/md'
import { SidebarsDividerWithText } from '../../chakra'
import { parseEpoch, transformedWeightclass } from '../../utils'
import { useGlobalStore } from '../../stores'
import { FighterSelectionSwipe } from '../forms/my-panels-form-els/fighter-selection-swipe'

export const ScoringSidebarLeft = ({ 
    tabs,
}) => {
    const {
        activeGroupScorecard,
        availableGuestJudges,
        setModals,
        scoringTransformedPrediction,
    } = useGlobalStore()
    
    const navGroups = {
        officialJudges: false,
        predictions: false,
        props: false
    };
    
    const [activeNavGroups, setActiveNavGroups] = useState(navGroups);

    const { weightclass } = activeGroupScorecard?.fight ? activeGroupScorecard.fight : '';
    const { network, showTime } = activeGroupScorecard?.show ? activeGroupScorecard.show : '';
    const isLocked = Date.now() > showTime

    const handleHideShow = id => {
        setActiveNavGroups({ ...activeNavGroups, [id]: !activeNavGroups[id] })

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
            flex={["1 0 30%"]} 
            position="relative" 
            alignItems={["flex-start", "center"]} 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            p="1" 
            bg={tabs.info ? "inherit" : "fsl-sidebar-bg"}
            color={tabs.info ? "#dadada" : "#c8c8c8"}
            fontSize="sm"
            minH={tabs.info ? "75vh" : ""}
            border={tabs.all ? "1px solid #252525" : 'none'}
        >
            { tabs.info && 
                <SidebarsDividerWithText 
                    fontSize="3xl" 
                    mt="2"
                    mx="1"
                    mb="2"
                    label={`Fight Info`} 
                />
            }
            <Flex
                display={tabs.info ? 'flex' : 'none'}
                flexDir="row"
                w="100%"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
            >
                { activeGroupScorecard?.fighters?.length > 0 && activeGroupScorecard.fighters.map( (fighter, _i) => (
                    <FighterSelectionSwipe 
                        key={_i}
                        fighter={fighter} 
                        handleFighterSelect={null} 
                        isScoringSidebar={true}
                        selectedFighter={{}}
                    /> 
                ))}
            </Flex>
            <Flex 
                flexDir="column"
                h={"auto"}
                flex="1" 
                overflowY="scroll" 
                w="100%"
            >
                { tabs.all && 
                    <SidebarsDividerWithText 
                        fontSize="xl" 
                        mt="2"
                        mx="1"
                        mb="0"
                        label={`Fight Info`} 
                    />
                }

                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="fight"
                    label={''}
                    active={true}
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
                    id="officialJudges"
                    label="FightSync Judges"
                    active={activeNavGroups.officialJudges}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            in={activeNavGroups.officialJudges} 
                            animateOpacity
                        >
                            <ScoringSidebarNavItem 
                                onclickOption={handleOpenGuestJudgeModal}
                                icon={<FaGavel />} 
                                label="FSL Judges"
                            />
                        </Collapse>
                    </Flex>
                </ScorecardsNavGroup>
                <ScorecardsNavGroup
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="predictions"
                    label="Predictions"
                    active={activeNavGroups.predictions}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            w="100%"
                            in={activeNavGroups.predictions} 
                            animateOpacity
                        >
                            <ScoringSidebarNavItem 
                                id="prediction"
                                icon={isLocked ? <FaLock /> : <FaLockOpen />} 
                                onclickOption={handlePredictionModalToggle}
                                label={ scoringTransformedPrediction ? scoringTransformedPrediction : 'Not Set' }
                            /> 
                            <ScoringSidebarNavItem 
                                id="fslPrediction"
                                button="button" 
                                icon={<MdOnlinePrediction size="1.1rem" />} 
                                label="FSL- "
                            /> 
                        </Collapse>
                    </Flex>
                </ScorecardsNavGroup>
                <ScorecardsNavGroup 
                    handleHideShow={handleHideShow} 
                    tabs={tabs} 
                    id="props"
                    label="Props"
                    active={activeNavGroups.props}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            in={activeNavGroups.props} 
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