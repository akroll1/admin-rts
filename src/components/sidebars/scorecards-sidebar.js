import { useEffect, useState } from 'react'
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


export const ScorecardsSidebar = () => { 
    const { 
        seasons,
        selectedFightSummary, 
        selectedSeason,
        setSelectedFightSummary,
    } = useScorecardStore()
    
    const [activeNavGroupItem, setActiveNavGroupItem] = useState({
        1: true
    })

    useEffect(() => {
        if(seasons.length > 0){
            const tabs = seasons.map( season => season.season.seasonId)
                .reduce( (acc, curr) => ({ [acc[curr]]: false }), {})
            Object.assign(tabs, activeNavGroupItem)
            setActiveNavGroupItem(tabs)
        }
    },[seasons])

    const selectFight = e => {
        const { id } = e.currentTarget;
        const [selected] = selectedSeason.fightSummaries.filter( summary => summary.fight.fightId === id);
        setSelectedFightSummary(selected)
    }

    const handleHideShow = id => {

            setActiveNavGroupItem(prev => ({ ...prev, [id]: !prev[id] }))
    }
    console.log('activeNavGroupItem: ', activeNavGroupItem)
    return (

        <Flex 
            id="scorecards_sidebar" 
            as="aside"
            flex="1 0 20%" 
            w="100%" 
            minH={["40vh", "50vh", "80vh"]} 
            maxH={["40vh", "40vh", "80vh"]}
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
            border="1px solid #252525"
        >
            <SidebarsDividerWithText 
                fontSize={'1.5rem'} 
                text="Seasons" 
                centered={[true, false]}
            />
            <Flex
                w="100%"
                flexDir="column"
                alignItems="flex-start"
            >
                { seasons?.length > 0 && seasons.map( summary => {
                    const { fightSummaries, season } = summary;
                    const { seasonId, seasonName } = season;
                    const active = activeNavGroupItem[seasonId];
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
                                    const { fightId, fightQuickTitle, isTitleFight } = summary.fight;
                                    const active = fightId === selectedFightSummary?.fight?.fightId;
                                    return (
                                        <ScorecardsNavItem 
                                            id={fightId}
                                            active={active}
                                            name={REVIEW_TYPE.PREDICTION} 
                                            fightId={fightId} 
                                            selectFight={selectFight} 
                                            // icon={isTitleFight && <IoFlashOutline background="gray" mt="-5px" />} 
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


