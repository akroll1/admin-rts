import {useEffect, useState} from 'react'
import { SearchField } from './fighters-sidebar-components/search-field'
import { Flex, Stack } from '@chakra-ui/react'
import { NavGroup } from './shows-sidebar/nav-group'
import { UpcomingNavItem } from './shows-sidebar/nav-item'
import { REVIEW_TYPE } from '../../utils'
import { filterFights } from '../../stores/store-utils'

import { 
    IoStarOutline, 
    IoGameControllerOutline, 
    IoFlashOutline, 
    IoBookmarkOutline 
} from "react-icons/io5";
import { SidebarsDividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'

export const ShowsSidebar = () => { 
    const { 
        fetchFightSummary,
        fetchSelectedFightReviews,
        fights, 
        selectedFight, 
        setSelectedFight,
    } = useScorecardStore()

    const [searchedFights, setSearchedFights] = useState(fights)
    const [upcoming, setUpcoming] = useState([])
    const [recent, setRecent] = useState([])

    useEffect(() => {
        if(fights.length > 0){
            const { upcoming, recent } = filterFights(fights)
            setUpcoming(upcoming)
            setRecent(recent)
        }
    }, [fights])

    const handleSearch = e => {
        const { value } = e.currentTarget;
        const regex = /^[a-z]+$/i;
        if(regex.test(value)){
            const searchedFights = fights.filter( fight => fight.fightQuickTitle)
            setSearchedFights(searchedFights)
        }
    }
    const selectFight = e => {
        const { name, id } = e.currentTarget;
        const [selected] = fights.filter( fight => fight.fightId === id);
        setSelectedFight(selected.fightId);
    }
    const historicalShows = [
        'Ali vs Frazier I', 'Hagler vs Hearns'
    ];
    const fantasyFights = [
        'Floyd Mayweather vs Willie Pep', 'Mike Tyson vs Muhammad Ali'
    ];
    return (

        <Flex 
            id="shows_sidebar" 
            as="aside"
            flex="1 0 20%" 
            w="100%" 
            minH={["40vh", "50vh", "80vh"]} 
            maxH={["40vh","40vh","100%"]}
            height="auto" 
            overflowY="scroll" 
            position="relative" 
            alignItems="center" 
            justifyContent="center"
            borderRadius="lg"
            direction="column" 
            p="2" 
            bg="fsl-sidebar-bg" 
            color="white" 
            fontSize="sm"
            display={["none", "none", "flex"]}
        >
            <SidebarsDividerWithText 
                fontSize={'1.5rem'} 
                text="Shows" 
                // centered={tabs.all ? true : false}
                centered={[true, false]}
            />
            <SearchField 
                style={{width: '100%', margin: '0rem 1rem'}} 
                handleSearch={handleSearch} 
            />
            <Stack w="100%" spacing="4" flex="1" overflow="auto" mt="4">
                <NavGroup label="Upcoming">
                    { upcoming.length > 0 && upcoming.map( fight => {
                        const { fightId, fightQuickTitle, isTitleFight } = fight;
                        return <UpcomingNavItem 
                                    active={fightId === selectedFight?.fightId}
                                    name={REVIEW_TYPE.PREDICTION} 
                                    fightId={fight.fightId} 
                                    selectFight={selectFight} 
                                    icon={isTitleFight && <IoFlashOutline mt="-5px" />} 
                                    label={fightQuickTitle} 
                                    key={fight.fightId} 
                                    isPlaying
                                />
                    })}
                </NavGroup>
                <NavGroup label="Recent">
                    {recent.length > 0 && recent.map( fight => {
                        const active = fight.fightId === selectedFight?.fightId
                        return <UpcomingNavItem 
                            active={active}
                            name={REVIEW_TYPE.REVIEW} 
                            icon={<IoStarOutline mt="-5px" /> } 
                            selectFight={selectFight} 
                            fightId={fight.fightId} 
                            label={fight.fightQuickTitle} 
                            key={fight.fightId} 
                        />
                    })}
                </NavGroup>
                <NavGroup label="Historical">
                    {historicalShows && historicalShows.length > 0 && historicalShows.map( (fight,i) => {
                        return <UpcomingNavItem 
                            name={REVIEW_TYPE.HISTORICAL} 
                            showId={'historical'} 
                            icon={<IoBookmarkOutline mt="-5px" />} 
                            label={fight} 
                            key={i}
                        />
                    })}
                </NavGroup>
                <NavGroup label="Fantasy">
                    {fantasyFights && fantasyFights.length > 0 && fantasyFights.map( (show,i) => {
                        return <UpcomingNavItem 
                            name={REVIEW_TYPE.FANTASY} 
                            showId={'historical'} 
                            icon={<IoGameControllerOutline />} 
                            label={show} 
                            key={i} 
                        />
                    })}
                </NavGroup>
            </Stack>
        </Flex>
    )
}


