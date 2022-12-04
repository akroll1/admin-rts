import { useEffect, useState } from 'react'
import { Collapse, Flex, useControllableState } from '@chakra-ui/react'
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
        seasonSummaries,
        selectedSeasonFightSummary, 
        selectedSeasonSummary,
        setSelectedSeasonFightSummary,
        setSelectedSeasonSummary,
    } = useScorecardStore()
    const [activeNavGroupItem, setActiveNavGroupItem] = useState(selectedSeasonSummary?.season?.seasonId)
    
    useEffect(() => {
        if(selectedSeasonSummary?.season?.seasonId){
            setActiveNavGroupItem(selectedSeasonSummary.season.seasonId)
        }
    }, [selectedSeasonSummary])

    const getLeftIcon = fightStatus => {
        if(fightStatus === 'COMPLETE') return <InfoOutlineIcon color="gray.600" />;
        if(fightStatus === 'PENDING') return <TimeIcon color="gray.200" />
        if(fightStatus === 'CANCELED') return <NotAllowedIcon color="gray.600" />
    }

    const handleSelectSeason = id => {
        setSelectedSeasonSummary(id)
    }

    const handleSelectFight = id => {
        setSelectedSeasonFightSummary(id)
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
                // minH={["40vh", "50vh", "60vh"]}
            >
                { seasonSummaries?.length > 0 && seasonSummaries?.map( seasonSummary => {
                    const { fightSummaries, season } = seasonSummary;
                    const { seasonId, seasonName } = season;
                    const active = activeNavGroupItem === seasonId;
                    return (
                        <ScorecardsNavGroup 
                            handleSelectSeason={handleSelectSeason}
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
                                    const active = fightId === selectedSeasonFightSummary?.fight?.fightId;
                                    const icon = getLeftIcon(fightStatus);
                                    return (
                                        <ScorecardsNavItem 
                                            handleSelectFight={handleSelectFight}
                                            id={fightId}
                                            active={active}
                                            fightId={fightId} 
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