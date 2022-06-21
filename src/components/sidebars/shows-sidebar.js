import React, {useState} from 'react'
import { SearchField } from './fighters-sidebar-components/search-field'
import { Flex, Stack } from '@chakra-ui/react'
import { NavGroup } from './shows-sidebar/nav-group'
import { UpcomingNavItem } from './shows-sidebar/nav-item'
import { FaTicketAlt } from 'react-icons/fa'
import { REVIEW_TYPE } from '../../utils'
import { IoStarOutline, IoGameControllerOutline, IoFlashOutline, IoBookmarkOutline } from "react-icons/io5";
import { DividerWithText } from '../../chakra'

export const ShowsSidebar = ({ shows, handleShowSelect }) => { 
    const [searchedShows, setSearchedShows] = useState(shows); // why???
    const separateShowsByType = shows => {
        const upcoming = shows.filter( ({ showTime }) => showTime > Date.now()).reverse();
        const recent = shows.filter( ({ showTime }) => showTime < Date.now());
        return ({
            recent,
            upcoming
        });
    }
    const handleSearch = e => {
        const { value } = e.currentTarget;
        const regex = /^[a-z]+$/i;
        if(regex.test(value)){
            const searchedShows = shows.filter( show => {
                const { showName } = show;
                return showName.toLowerCase().includes(value.toLowerCase())
            })
            setSearchedShows(searchedShows)
        }
    }
    const selectShow = target => {
        const { name, id } = target;
        handleShowSelect(id, name);
    }
    const { recent, upcoming } = shows?.length > 0 ? separateShowsByType(shows) : [];
    const historicalShows = [
        'Ali vs Frazier I', 'Ali vs Foreman', 'Hagler vs Hearns'
    ];
    const fantasyFights = [
        'Floyd Mayweather vs Willie Pep', 'Mike Tyson vs Muhammad Ali'
    ];
    return (
        <Flex 
            id="scoring-sidebar" 
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
                    {upcoming?.length > 0 && upcoming.map( show => {
                        const { showId, fight: { fightQuickTitle, isTitleFight } } = show;
                        return <UpcomingNavItem 
                            name={REVIEW_TYPE.PREDICTION} 
                            showId={showId} 
                            selectShow={e => selectShow(e.currentTarget)} 
                            icon={isTitleFight && <IoFlashOutline mt="-5px" />} 
                            label={fightQuickTitle} 
                            key={showId} 
                            isPlaying
                        />
                    })}
                </NavGroup>
                <NavGroup label="Recent">
                    {recent?.length > 0 && recent.map( show => {
                        const { showId, fight: { fightQuickTitle } } = show;
                        return <UpcomingNavItem 
                            name={REVIEW_TYPE.REVIEW} 
                            icon={<IoStarOutline mt="-5px" /> } 
                            selectShow={e => selectShow(e.currentTarget)} 
                            showId={showId} 
                            label={fightQuickTitle} 
                            key={showId} 
                        />
                    })}
                </NavGroup>
                <NavGroup label="Historical">
                    {historicalShows && historicalShows.length > 0 && historicalShows.map( (show,i) => {
                        return <UpcomingNavItem 
                            name={REVIEW_TYPE.HISTORICAL} 
                            showId={'historical'} 
                            selectShow={e => selectShow(e.currentTarget)} 
                            icon={<IoBookmarkOutline mt="-5px" />} 
                            label={show} 
                            key={i}
                        />
                    })}
                </NavGroup>
                <NavGroup label="Fantasy">
                    {fantasyFights && fantasyFights.length > 0 && fantasyFights.map( (show,i) => {
                        return <UpcomingNavItem 
                            name={REVIEW_TYPE.FANTASY} 
                            showId={'historical'} 
                            selectShow={e => selectShow(e.currentTarget)} 
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


