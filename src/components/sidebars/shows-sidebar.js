import {useEffect, useState} from 'react'
import { 
    Flex,
    Select,
    Stack 
} from '@chakra-ui/react'
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
import { 
    InfoOutlineIcon,
    NotAllowedIcon,
} from '@chakra-ui/icons'
import { SidebarsDividerWithText } from '../../chakra'
import { useScorecardStore } from '../../stores'

export const ShowsSidebar = ({
    setSeasonName
}) => { 
    const { 
        seasonsOptions,
        selectedFightSummary, 
        selectedSeason,
        setSelectedFightSummary,
        setSelectedSeason,
    } = useScorecardStore()
    
    const [canceled, setCanceled] = useState([])
    const [recent, setRecent] = useState([])
    const [upcoming, setUpcoming] = useState([])

    useEffect(() => {
        if(selectedSeason?.season?.seasonId){
            const { CANCELED, COMPLETE, PENDING } = filterFights(selectedSeason.fightSummaries)
            setCanceled(CANCELED)
            setRecent(COMPLETE)
            setUpcoming(PENDING)
            if(!PENDING.length && COMPLETE.length){
                setSelectedFightSummary(COMPLETE[0])
            }
            if(PENDING.length){
                setSelectedFightSummary(PENDING[0])
            }
        }
    }, [selectedSeason?.season?.seasonId])
    
    const selectFight = e => {
        const { id } = e.currentTarget;
        const [selected] = selectedSeason.fightSummaries.filter( summary => summary.fight.fightId === id);
        setSelectedFightSummary(selected)
    }

    const historicalShows = [
        'Ali vs Frazier I', 'Hagler vs Hearns'
    ];
    const fantasyFights = [
        'Floyd Mayweather vs Willie Pep', 'Mike Tyson vs Muhammad Ali'
    ];

    const handleSeasonSelect = e => {
        const { value } = e.currentTarget;
        const [selected] = seasonsOptions.filter( option => option.value === value)
        setSeasonName(selected.label)
        setSelectedSeason(value)
    }

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
                centered={[true, false]}
            />
            <Select 
                onChange={handleSeasonSelect}
                placeholder="Select a Season"
            >
                { seasonsOptions.map( option => <option key={option.value} id={option.value} value={option.value}>{option.label}</option>)}
            </Select>
            <Stack 
                w="100%" 
                spacing="4" 
                flex="1" 
                overflow="auto" 
                mt="4"
            >
                <NavGroup label="Upcoming">
                    { upcoming.length && upcoming.map( summary => {
                        const { fightId, fightQuickTitle, isTitleFight } = summary.fight;
                        const active = fightId === selectedFightSummary?.fight?.fightId;
                        return (
                            <UpcomingNavItem 
                                active={active}
                                name={REVIEW_TYPE.PREDICTION} 
                                fightId={fightId} 
                                selectFight={selectFight} 
                                icon={isTitleFight
                                    ?
                                        <IoStarOutline 
                                            background="gray" 
                                            mt="-5px" 
                                        />
                                    :
                                        <InfoOutlineIcon 
                                            mt="-5px" 
                                        />
                                } 
                                label={fightQuickTitle} 
                                key={fightId} 
                                isPlaying
                            />
                        )
                    })}
                </NavGroup>
                <NavGroup label="Recent">
                    {recent.length > 0 && recent.map( summary => {
                        const { fightId, fightQuickTitle, isTitleFight } = summary.fight;
                        const active = fightId === selectedFightSummary?.fight?.fightId;
                        return <UpcomingNavItem 
                            active={active}
                            name={REVIEW_TYPE.REVIEW} 
                            icon={<InfoOutlineIcon mt="-5px" /> } 
                            selectFight={selectFight} 
                            fightId={fightId} 
                            label={fightQuickTitle} 
                            key={fightId} 
                            isTitleFight={isTitleFight}
                        />
                    })}
                </NavGroup>
                { canceled.length > 0 && 
                    <NavGroup label="Canceled">
                        { canceled.length > 0 && canceled.map( summary => {
                            const { fightId, fightQuickTitle, isTitleFight } = summary.fight;
                            const active = fightId === selectedFightSummary?.fight?.fightId;                            
                            return (
                                <UpcomingNavItem 
                                    active={active}
                                    name={REVIEW_TYPE.CANCELED} 
                                    icon={<NotAllowedIcon mt="-5px" /> } 
                                    selectFight={selectFight} 
                                    fightId={fightId} 
                                    label={fightQuickTitle} 
                                    key={fightId} 
                                    isTitleFight={isTitleFight}
                                />
                            )
                        })}
                    </NavGroup>
                }
                {/* <NavGroup label="Historical">
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
                </NavGroup> */}
            </Stack>
        </Flex>
    )
}


