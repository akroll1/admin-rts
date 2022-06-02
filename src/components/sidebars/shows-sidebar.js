import React, {useState} from 'react'
import { SearchField } from './fighters-sidebar-components/search-field'
import { Flex, Stack } from '@chakra-ui/react'
import { NavGroup } from './shows-sidebar/nav-group'
import { UpcomingNavItem } from './shows-sidebar/nav-item'
import { FaTicketAlt } from 'react-icons/fa'


export const ShowsSidebar = ({ shows, handleShowSelect }) => {
    const [searchedShows, setSearchedShows] = useState(shows);
    const separateShowsByTime = shows => {
        const upcoming = shows.filter( ({showTime}) => showTime > Date.now()).reverse();
        const recent = shows.filter( ({showTime}) => showTime < Date.now());
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
    const { recent, upcoming } = shows?.length > 0 ? separateShowsByTime(shows) : [];
    const historicalShows = [
        'Ali vs Frazier I', 'Ali vs Foreman', 'Hagler vs Hearns'
    ];
    return (
        <Flex w="100%" borderRadius="5px" flexDir="column" bg="gray.900" color="white" fontSize="sm" h="auto" maxH="80%" id="scoring-sidebar" alignItems="flex-start" justifyContent="center">
            <SearchField style={{width: '100%'}} handleSearch={handleSearch} />
            <Stack w="100%" spacing="4" flex="1" overflow="auto" pt="8">
                <NavGroup label="Upcoming Shows">
                    {upcoming?.length > 0 && upcoming.map( show => {
                        const { showId, showName } = show;
                        return <UpcomingNavItem showId={showId} handleShowSelect={handleShowSelect} icon={<FaTicketAlt />} label={showName} key={showId} />
                    })}
                </NavGroup>
                <NavGroup label="Recent Shows">
                    {recent?.length > 0 && recent.map( show => {
                        const { showId, showName } = show;
                        return <UpcomingNavItem icon={<FaTicketAlt /> } handleShowSelect={handleShowSelect} showId={showId} label={showName} key={showId} />
                    })}
                </NavGroup>
                <NavGroup label="Historical Fights">
                    {historicalShows && historicalShows.length > 0 && historicalShows.map( (show,i) => {
                        return <UpcomingNavItem showId={'historical'} handleShowSelect={handleShowSelect} icon={<FaTicketAlt />} label={show} key={i} />
                    })}
                </NavGroup>
            </Stack>
        </Flex>
    )
}