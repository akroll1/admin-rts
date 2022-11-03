import { useEffect, useState } from 'react'
import { Collapse, Flex } from '@chakra-ui/react'
import { ScorecardsBoard } from './scorecards-board'
import { ScorecardsNavGroup } from './scorecards-nav-group'
import { ScorecardsNavItem } from './scorecards-nav-item'
import { useScorecardStore } from '../../../../stores'
import { 
    InfoOutlineIcon,
    NotAllowedIcon, 
    TimeIcon 
} from '@chakra-ui/icons'

export const ScorecardsSeasonsBoard = () => {
    const { 
        seasons,
        selectedFightSummary, 
        selectedSeason,
        setSelectedFightSummary,
        setSelectedSeason,
    } = useScorecardStore()
    const [activeNavGroupItem, setActiveNavGroupItem] = useState()

    useEffect(() => {
        if(selectedSeason?.season?.seasonId){
            setActiveNavGroupItem(selectedSeason.season.seasonId)
            setSelectedFightSummary(selectedSeason.fightSummaries[0])
        }
    },[selectedSeason?.season])

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
        if(fightStatus === 'COMPLETE') return <InfoOutlineIcon color="gray.600" />;
        if(fightStatus === 'PENDING') return <TimeIcon color="gray.200" />
        if(fightStatus === 'CANCELED') return <NotAllowedIcon color="gray.600" />
    }

    const handleSelectFight = id => {
        const [selected] = selectedSeason?.fightSummaries?.filter( summary => summary.fight.fightId === id)
        setSelectedFightSummary(selected)
    }

    return (    
        <ScorecardsBoard
            label="Seasons"
        >
            <Flex
                w="100%"
                flexDir="column"
                alignItems="flex-start"
                overflow="scroll"
                minH={["40vh", "50vh", "60vh"]}
            >
                { seasons?.length > 0 && seasons.map( summary => {
                    const { fightSummaries, season } = summary;
                    const { seasonId, seasonName } = season;
                    const active = activeNavGroupItem === selectedSeason?.season?.seasonId;
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
                                w="100%"
                            >
                                <Flex
                                    flexDir="column"
                                    w="100%"
                                    p="2"
                                >
                                { fightSummaries.length > 0 && fightSummaries.map( summary => {
                                    const { fightId, fightQuickTitle, fightStatus, isTitleFight } = summary.fight;
                                    const active = fightId === selectedFightSummary?.fight?.fightId;
                                    const icon = getLeftIcon(fightStatus);
                                    return (
                                        <ScorecardsNavItem 
                                            handleSelectFight={handleSelectFight}
                                            id={fightId}
                                            active={active}
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
        </ScorecardsBoard>
    )
}