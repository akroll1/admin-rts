import { useState } from 'react'
import { 
    Collapse,
    Flex,
} from '@chakra-ui/react'
import { 
    ScorecardsNavGroup, 
    ScorecardsNavItem 
} from './scorecards-sidebar-components/index'
import { REVIEW_TYPE } from '../../utils'
import { SidebarsDividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'
import { 
    ArrowUpDownIcon,
    InfoOutlineIcon,
    NotAllowedIcon, 
    TimeIcon 
} from '@chakra-ui/icons'

export const ScorecardsPageSidebar = () => { 
    const { 
        seasons,
        selectedFightSummary, 
        selectedSeason,
        setSelectedFightSummary,
        setSelectedSeason,
    } = useScorecardStore()
    
    const [activeNavGroupItem, setActiveNavGroupItem] = useState('1')

    const selectFight = e => {
        const { id } = e.currentTarget;
        const [selected] = selectedSeason.fightSummaries.filter( summary => summary.fight.fightId === id);
        setSelectedFightSummary(selected)
    }

    const handleHideShow = id => {
        setActiveNavGroupItem(id)
        const [selectedSeason] = seasons.filter( season => season.season.seasonId === id)
        setSelectedSeason(selectedSeason.season.seasonId)
    }

    const getLeftIcon = fightStatus => {
        if(fightStatus === 'COMPLETE') return <InfoOutlineIcon />;
        if(fightStatus === 'PENDING') return <TimeIcon />
        if(fightStatus === 'CANCELED') return <NotAllowedIcon color="#d98585" />
    }

    const handleSelectFight = id => {
        const [selected] = selectedSeason?.fightSummaries?.filter( summary => summary.fight.fightId === id)
        setSelectedFightSummary(selected)
    }

    return (
        <Flex 
            ml="2"
            id="scorecards_sidebar" 
            as="aside"
            w="100%" 
            // minH={["40vsh", "50vh", "60vh"]} 
            maxH={['50%']}
            height="auto" 
            overflowY="scroll" 
            position="relative" 
            alignItems="center" 
            justifyContent="flex-start"
            borderRadius="lg"
            direction="column" 
            p="2" 
            color="white" 
            fontSize="sm"
            bg="fsl-sidebar-bg" 
            border="1px solid #383838"
        >
             <ArrowUpDownIcon 
                position="absolute"
                top="3"
                left="1"
                fontSize="0.9rem"
                color="gray"
                _hover={{
                    cursor: 'pointer'
                }}
            />
            <SidebarsDividerWithText 
                fontSize="xl" 
                label="Seasons" 
                my="2"
            />
            <Flex
                w="100%"
                flexDir="column"
                alignItems="flex-start"
            >
                { seasons?.length > 0 && seasons.map( summary => {
                    const { fightSummaries, season } = summary;
                    const { seasonId, seasonName } = season;
                    const active = activeNavGroupItem === seasonId;
                    return (
                        <ScorecardsNavGroup 
                            handleHideShow={handleHideShow}
                            key={seasonId}
                            id={seasonId}
                            label={seasonName}
                            active={active}
                        >   
                            <Collapse 
                                in={active} 
                                animateOpacity
                            >
                                <Flex
                                    flexDir="column"
                                    w="100%"
                                    p="2"
                                >
                                { fightSummaries.length && fightSummaries.map( summary => {
                                    const { fightId, fightQuickTitle, fightStatus, isTitleFight } = summary.fight;
                                    const active = fightId === selectedFightSummary?.fight?.fightId;
                                    const icon = getLeftIcon(fightStatus);
                                    return (
                                        <ScorecardsNavItem 
                                            handleSelectFight={handleSelectFight}
                                            id={fightId}
                                            active={active}
                                            name={REVIEW_TYPE.PREDICTION} 
                                            fightId={fightId} 
                                            selectFight={selectFight} 
                                            icon={icon}
                                            isTitleFight={isTitleFight}
                                            label={fightQuickTitle} 
                                            key={fightId} 
                                            isPlaying
                                        />
                                    )
                                })}
                                </Flex>
                            </Collapse>
                        </ScorecardsNavGroup>
                    )
                })}
            </Flex>
        </Flex>
    )
}


