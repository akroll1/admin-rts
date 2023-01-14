import {useEffect, useState} from 'react'
import { 
    Flex,
    Select,
    Stack 
} from '@chakra-ui/react'
import { NavGroup } from './shows-sidebar/nav-group'
import { UpcomingNavItem } from './shows-sidebar/nav-item'
import { REVIEW_TYPE } from '../../utils'
import { IoStarOutline } from "react-icons/io5";
import { 
    InfoOutlineIcon,
    NotAllowedIcon,
} from '@chakra-ui/icons'
import { SidebarsDividerWithText } from '../../chakra'
import { useGlobalStore } from '../../stores'
import { FightStatus } from '../../stores/models/enums'

export const ShowsSidebar = () => { 
    const { 
        fightsByStatus,
        seasonsOptions,
        selectedFightSummary, 
        setSelectedFightSummary,
        setSelectedSeasonSummary,
    } = useGlobalStore()
    
    const [canceled, setCanceled] = useState([])
    const [complete, setComplete] = useState([])
    const [pending, setPending] = useState([])

    useEffect(() => {
        if(fightsByStatus && (fightsByStatus[FightStatus.PENDING] || fightsByStatus[FightStatus.COMPLETE])){
            setPending(fightsByStatus[FightStatus.PENDING])
            setComplete(fightsByStatus[FightStatus.COMPLETE])
            setCanceled(fightsByStatus[FightStatus.CANCELED])
        }
    }, [fightsByStatus])

    // trying to sync up rotateFighters and here.

    // useEffect(() => {
    //     if(selectedFightSummary?.fight?.fightId){
    //         setSelectedFightSummary
    //     }
    // },[selectedFightSummary])

    const selectFight = e => {
        const { id } = e.currentTarget;
        setSelectedFightSummary(id)
    }

    const handleSeasonSelect = e => {
        const { value } = e.currentTarget;
        setSelectedSeasonSummary(value)
    }

    return (
        <Flex 
            id="shows_sidebar" 
            as="aside"
            flex="1 0 20%" 
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
                    { pending.length > 0 && pending.map( summary => {
                        const { fightId, fightQuickTitle, isTitleFight } = summary.fight;
                        const active = fightId === selectedFightSummary?.fight?.fightId;
                        return (
                            <UpcomingNavItem 
                                upcoming={true}
                                active={active}
                                name={REVIEW_TYPE.PREDICTION} 
                                fightId={fightId} 
                                selectFight={selectFight} 
                                label={fightQuickTitle} 
                                key={fightId} 
                                isPlaying
                            />
                        )
                    })}
                    { pending.length === 0 &&
                        <UpcomingNavItem 
                            active={false}
                            name={REVIEW_TYPE.COMPLETE} 
                            // selectFight={selectFight} 
                            fightId={'fightId'} 
                            label={`SEASON COMPLETE`} 
                            key={'fightId'} 
                            isTitleFight={true}
                        />
                    }
                </NavGroup>
                <NavGroup label="Recent">
                    { complete.length > 0 && complete.map( summary => {
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


