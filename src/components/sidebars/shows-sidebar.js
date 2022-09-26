import React, {useEffect, useState} from 'react'
import { SearchField } from './fighters-sidebar-components/search-field'
import { Flex, Stack } from '@chakra-ui/react'
import { NavGroup } from './shows-sidebar/nav-group'
import { UpcomingNavItem } from './shows-sidebar/nav-item'
import { REVIEW_TYPE } from '../../utils'
import { IoStarOutline, IoGameControllerOutline, IoFlashOutline, IoBookmarkOutline } from "react-icons/io5";
import { DividerWithText } from '../../chakra'

export const ShowsSidebar = ({ 
    fights, 
    getSelectedFightReview,
    selectedFight,
    setSelectedFight
}) => { 
    const [searchedFights, setSearchedFights] = useState(fights); 
    const [upcoming, setUpcoming] = useState([]);
    const [recent, setRecent] = useState([]);
    const [selectedFightId, setSelectedFightId] = useState('');
    useEffect(() => {
        if(fights.length > 0){
            const upcoming = fights.filter( fight => fight.fightStatus === 'PENDING').reverse();
            setUpcoming(upcoming);
            const recent = fights.filter( fight => fight.fightStatus === 'COMPLETE');
            setRecent(recent);
            if(upcoming.length > 0) setSelectedFight(upcoming[0]);
        }
    }, [fights])
    
    useEffect(() => {
        if(selectedFight?.fightId){
            setSelectedFightId(selectedFight.fightId)
        }
    },[selectedFight]);
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
        setSelectedFight(selected);
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
            flex="1 0 25%" 
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
            bg="gray.900" 
            color="white" 
            fontSize="sm"
        >
            <SearchField style={{width: '100%'}} handleSearch={handleSearch} />
            <DividerWithText text="Shows" />
            <Stack w="100%" spacing="4" flex="1" overflow="auto" pt="0">
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
                        return <UpcomingNavItem 
                            active={fight.fightId === selectedFight?.fightId}
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
                            // selectFight={selectFight} 
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
                            // selectFight={selectFight} 
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


