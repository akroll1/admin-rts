import { useState } from 'react'
import { 
    Collapse, 
    Flex, 
    Skeleton,
    Text,
} from '@chakra-ui/react'
import { ScoringSidebarNavItem } from './scoring-sidebar-components/scoring-sidebar-nav-item'
import { ScorecardsNavGroup } from './scorecards-sidebar-components/scorecards-boards/scorecards-nav-group'
import { 
    FaGavel,
    FaLock, 
    FaLockOpen, 
    FaRegClock, 
    FaRegMoneyBillAlt, 
    FaTrophy,
    FaTv 
} from 'react-icons/fa'
import { IoScaleOutline } from 'react-icons/io5'
import { MdOnlinePrediction } from 'react-icons/md'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { BellIcon } from '@chakra-ui/icons'
import { parseEpoch, transformedWeightclass } from '../../utils'
import { ScoringSidebarSkeletons } from './scoring-sidebar-components'

import { 
    ModalsEnum, 
    resetScoringSidebarNavGroups,
    ScoringSidebarNavGroupsEnum, 
    TabsEnum, 
    useGlobalStore,
} from '../../stores'
import { ScoringFightersFaceoff } from '../scoring'

export const ScoringSidebarLeft = () => {
    const {
        activeGroupScorecard,
        availableGuestJudges,
        isLoading,
        setModals,
        scoringTransformedPrediction,
        tabs,
    } = useGlobalStore()
    
    const [activeNavGroups, setActiveNavGroups] = useState({ ...resetScoringSidebarNavGroups, [ScoringSidebarNavGroupsEnum.FIGHT]: true });

    const { isTitleFight, totalRounds, weightclass } = activeGroupScorecard?.fight ? activeGroupScorecard.fight : '';
    const { network, showTime } = activeGroupScorecard?.show ? activeGroupScorecard.show : '';
    const isLocked = Date.now() > showTime

    const transformNetwork = networkValue => {
        if(networkValue === 'SHOWTIMEPPV') return 'Showtime PPV'
        return networkValue
    }

    const handleHideShow = id => {
        setActiveNavGroups(prev => ({ ...activeNavGroups, [id]: !prev[id] }) ) 
    }

    const handleOpenGuestJudgeModal = () => {
        setModals(ModalsEnum.GUEST_JUDGE_MODAL, true)
    }

    const handleMoneylineModal = () => {
        setModals(ModalsEnum.MONEYLINE_MODAL, true)
    }

    const handlePredictionModalToggle = () => {
        if(isLocked){
            return alert('Predictions are locked.')
        }
        setModals(ModalsEnum.PREDICTION_MODAL, true);
    };

    return (
        <Flex 
            display={tabs[TabsEnum.INFO] || tabs[TabsEnum.ALL] ? 'flex' : 'none'}
            id="scoring_sidebar_left" 
            // maxW={["100%","30%"]}
            flex={["1 0 25%"]} 
            position="relative" 
            alignItems={["flex-start", "center"]} 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            pb="4"
            p={["0", "4"]}
            fontSize="sm"
            boxSizing="border-box"
            overflowX="none"
            minH={tabs[TabsEnum.INFO] ? "75vh" : ""}
            bg={tabs[TabsEnum.INFO] ? "inherit" : "fsl-sidebar-bg"}
            color={tabs[TabsEnum.INFO] ? "#dadada" : "#c8c8c8"}
        >
            <ScoringFightersFaceoff isSidebar={true} />
            <Flex 
                flexDir="column"
                h={"auto"}
                flex="1" 
                overflowY="scroll" 
                w="100%"
                p={["2", "4"]}
                pt="0"
            >
                { isLoading
                    ? 
                        <ScoringSidebarSkeletons />
                    :
                        <>
                            <ScorecardsNavGroup
                                handleHideShow={handleHideShow} 
                                active={activeNavGroups[ScoringSidebarNavGroupsEnum.FIGHT]}
                                id={ScoringSidebarNavGroupsEnum.FIGHT}
                                label={activeGroupScorecard?.fight?.fightQuickTitle ? activeGroupScorecard?.fight?.fightQuickTitle : ''}
                            >
                                <Flex 
                                    w="100%"
                                    flexDir="column"
                                >
                                    <Collapse 
                                        w="100%"
                                        in={activeNavGroups.FIGHT} 
                                        animateOpacity
                                    >
                                        <ScoringSidebarNavItem 
                                            id="network"
                                            icon={<FaTv />} 
                                            label={ network ? transformNetwork(network) : '' }
                                        /> 
                                        <ScoringSidebarNavItem 
                                            id="time"
                                            icon={<FaRegClock />} 
                                            label={ showTime ? parseEpoch(showTime) : '' }
                                        /> 
                                        <ScoringSidebarNavItem 
                                            id="weightclass"
                                            icon={<IoScaleOutline />} 
                                            label={ weightclass ? transformedWeightclass(weightclass) : '' }
                                        /> 
                                        <ScoringSidebarNavItem 
                                            id="totalRounds"
                                            icon={<BellIcon />} 
                                            label={ totalRounds ? `${totalRounds} Rounds` : `12 Rounds` }
                                        /> 
                                        <ScoringSidebarNavItem 
                                            id="totalRounds"
                                            icon={<FaTrophy />} 
                                            label={ isTitleFight ? `Title- YES` : `Title- NO` }
                                        /> 
                                    </Collapse>
                                </Flex>
                            </ScorecardsNavGroup>

                                    <ScorecardsNavGroup
                                        handleHideShow={handleHideShow} 
                                        id={ScoringSidebarNavGroupsEnum.PREDICTIONS}
                                        label="Predictions"
                                        active={activeNavGroups[ScoringSidebarNavGroupsEnum.PREDICTIONS]}
                                    >
                                        <Flex 
                                            w="100%"
                                            flexDir="column"
                                        >
                                            <Collapse 
                                                w="100%"
                                                in={activeNavGroups.PREDICTIONS} 
                                                animateOpacity
                                            >
                                                <ScoringSidebarNavItem 
                                                    id="userPrediction"
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
                                                <ScoringSidebarNavItem 
                                                    id="moneyline"
                                                    onclickOption={handleMoneylineModal}
                                                    icon={<FaRegMoneyBillAlt />} 
                                                    label="Moneyline"
                                                />
                                            </Collapse>
                                        </Flex>
                                    </ScorecardsNavGroup>

                                    <ScorecardsNavGroup 
                                        handleHideShow={handleHideShow} 
                                        id={ScoringSidebarNavGroupsEnum.PANELISTS}
                                        label="Panelists"
                                        active={activeNavGroups[ScoringSidebarNavGroupsEnum.PANELISTS]}
                                    >
                                        <Flex 
                                            w="100%"
                                            flexDir="column"
                                        >
                                            <Collapse 
                                                in={activeNavGroups[ScoringSidebarNavGroupsEnum.PANELISTS]} 
                                                animateOpacity
                                            >
                                                <ScoringSidebarNavItem 
                                                    onclickOption={handleOpenGuestJudgeModal}
                                                    icon={<FaGavel />} 
                                                    label="Panelist Name"
                                                />
                                            </Collapse>
                                        </Flex>
                                    </ScorecardsNavGroup>
                                    <Flex
                                        mt="2"
                                        p="2"
                                        pt="0"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        color="gray.300"
                                        cursor="pointer"
                                        userSelect="none"
                                        rounded="md"
                                        transition="all 0.1s"
                                        _hover={{
                                            color: 'white',
                                        }}
                                        _active={{
                                            bg: 'gray.600',
                                        }}
                                    >
                                        <FaRegQuestionCircle />
                                        <Text
                                            ml="2"
                                        >
                                            Help Center
                                        </Text>
                                    </Flex>

                            </>
                }

            </Flex>
        </Flex>
    )
}