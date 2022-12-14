import { useState } from 'react'
import { 
    Collapse, 
    Flex, 
    useToast 
} from '@chakra-ui/react'
import { ScoringSidebarNavItem } from './scoring-sidebar/scoring-sidebar-nav-item'
import { ScorecardsNavGroup } from './scorecards-sidebar-components/scorecards-boards/scorecards-nav-group'
import { ScoringSidebarFightersFaceoff } from './scoring-sidebar/scoring-sidebar-fighter-faceoff'
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
import { useScorecardStore, useStateStore } from '../../stores'

export const ScoringSidebarLeft = ({ 
    tabs,
}) => {
    const {
        activeGroupScorecard,
        setModals,
        scoringTransformedPrediction,
        user
    } = useScorecardStore()
    
    const { 
        availableGuestJudges 
    } = useStateStore()
    
    const [activeNavGroupItem, setActiveNavGroupItem] = useState('officialJudges')

    const toast = useToast()
    const { weightclass } = activeGroupScorecard?.fight ? activeGroupScorecard.fight : '';
    const { network, showTime } = activeGroupScorecard?.show ? activeGroupScorecard.show : '';
    const isLocked = Date.now() > showTime

    const handleHideShow = id => {
        if(id === activeNavGroupItem){
            setActiveNavGroupItem('')
            return
        }
        setActiveNavGroupItem(id)
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
            alignItems={["flex-start", "center"]} 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            p="1" 
            bg={tabs.info ? "inherit" : "fsl-sidebar-bg"}
            color={tabs.info ? "#dadada" : "#c8c8c8"}
            fontSize="sm"
            minH={tabs.info ? "75vh" : "100%"}
            border={tabs.all ? "1px solid #252525" : 'none'}
        >
            <SidebarsDividerWithText 
                fontSize="xl" 
                py="2"
                mx="1"
                label="Fight Info" 
            />
            <ScoringSidebarFightersFaceoff 
                tabs={tabs}
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
                    label={activeGroupScorecard?.fight?.fightQuickTitle}
                    active={activeNavGroupItem === 'fight'}
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
                    active={activeNavGroupItem === 'officialJudges'}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            in={activeNavGroupItem === 'officialJudges'} 
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
                    id="prediction"
                    label="Predictions"
                    active={activeNavGroupItem ==='prediction'}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            w="100%"
                            in={activeNavGroupItem === 'prediction'} 
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
                    active={activeNavGroupItem === 'props'}
                >
                    <Flex 
                        w="100%"
                        flexDir="column"
                    >
                        <Collapse 
                            in={activeNavGroupItem === 'props'} 
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