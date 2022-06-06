import React, {useState} from 'react'
import { Box, Button, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import { BiChevronRightCircle, BiUserCircle, BiUser, BiEdit, BiStar, BiUserCheck, BiPlusCircle } from 'react-icons/bi'
import { AccountSwitcher } from './scoring-sidebar/account-switcher'
import { NavGroup } from './scoring-sidebar/nav-group'
import { NavItem } from './scoring-sidebar/nav-item'
import { PredictionPopover } from '../../components/prediction-popover'
import { FaTv, FaRegMoneyBillAlt, FaMapMarkerAlt, FaRegClock, FaLock, FaLockOpen, FaPlusCircle, FaTrophy } from 'react-icons/fa'
import { parseEpoch, predictionIsLocked } from '../../utils/utils'
import { FaWeight } from 'react-icons/fa'
export const ScoringSidebar = ({ finalScore, setTogglePredictionModal, show, handleAddGuestScorer, members, showGuestScorers, myGuestScorers, prediction, groupScorecard }) => {
    // console.log('scoring sidebar, show: ',show)
    // console.log('myGuestScorers: ',myGuestScorers)
    const transformedOdds = show => {
        const rawOdds = show.fights.filter( fight => fight.isMainEvent).map( mainEvent => mainEvent.fightOdds);
        const uppercase = rawOdds[0].split(',');
        const lowered = uppercase[0].charAt(0).toUpperCase() + uppercase[0].slice(1).toLowerCase() + ' ' + uppercase[1];
        return lowered;
    };
    const odds = show && show.showId ? transformedOdds(show) : null;
    const [showGuests, setShowGuests] = useState(false);
    finalScore = parseInt(finalScore);
    const { showTime, location, promoter } = show ? show : '';
    const locked = predictionIsLocked(showTime);
    const { totalRounds, weightclass, fighterA, fighterB, fightResult, scorecardName, groupScorecardId, admin } = groupScorecard;
    const fightLocation = location || groupScorecard.location;
    const transformedPrediction = prediction ? prediction.split(',').join(' ') : '';
    const transformedWeightclass = weightclass ? weightclass.split(',')[0] + '- ' + weightclass.split(',')[1]: '';
    const handleLockedPrediction = () => {
        if(locked) return alert('Prediction is locked!');
        setTogglePredictionModal(true);
    }

    return (
        <Flex 
            id="scoring-sidebar" 
            flex="1 0 20%" 
            w="100%" 
            minH={["40vh", "50vh", "80vh"]} 
            maxH={["40vh","50vh","80vh"]}
            height="auto" 
            overflowY="scroll" 
            position="relative" 
            alignItems="center" 
            justifyContent="center"
            borderRadius="md"
            direction="column" 
            p="2" 
            bg="gray.900" 
            color="white" 
            fontSize="sm"
        >
            <AccountSwitcher fightResult={fightResult} fighterA={fighterA} fighterB={fighterB} scorecardName={scorecardName} groupScorecard={groupScorecardId} />
            <Stack w="full" spacing="6" flex="1" overflow="auto" pt="8" p="2">
                <NavGroup active={true} label="Official Judges">
                    { myGuestScorers && myGuestScorers.length > 0 && myGuestScorers.map( (guestScorer,i) => <NavItem id={guestScorer.guestScorerId} icon={<BiUserCircle />} label={guestScorer.displayName} key={guestScorer.guestScorerId} />) }
                    <NavItem subtle icon={<FaPlusCircle />} label={<Button disabled={!show} _focus={{bg:'transparent'}} _hover="transparent" variant="ghost" size="sm" onClick={() => setShowGuests(!showGuests)}>Add Judge</Button>} />
                    { showGuests && showGuestScorers && showGuestScorers.length > 0 && showGuestScorers.map( (guestScorer,i) => <NavItem id={guestScorer.guestScorerId} handleClick={handleAddGuestScorer} icon={<BiPlusCircle />} label={guestScorer.displayName} key={i} />)}
                </NavGroup>
                <NavGroup label="Show">
                    { promoter && <NavItem icon={<FaTv />} label={promoter} />}
                    { fightLocation && <NavItem icon={<FaMapMarkerAlt />} label={fightLocation} />}
                    { showTime && <NavItem icon={<FaRegClock />} label={parseEpoch(showTime)} />}
                </NavGroup>
                <NavGroup label="Fight">
                    <NavItem icon={<BiChevronRightCircle />} label={totalRounds + ' Rounds'} />
                    <NavItem icon={<FaWeight />} label={transformedWeightclass} />
                    { show && <NavItem icon={<FaRegMoneyBillAlt />} label={'Moneyline: ' + odds } /> }
                </NavGroup>
                <NavGroup label="Prediction">
                    { show && <NavItem icon={locked ? <FaLock /> : <FaLockOpen />} label={<Button disabled={locked} justifyContent="flex-start" textAlign="left" onClick={() => handleLockedPrediction()} w="100%" _focus={{bg:'transparent'}} _hover="transparent" variant="ghost" size="sm">{transformedPrediction}</Button>} key={prediction} /> }
                    { show && <NavItem icon={<FaTrophy />} label={<Button justifyContent="flex-start" textAlign="left" fontSize="lg" w="100%" _focus={{bg:'transparent'}} _hover="transparent" variant="ghost" size="sm">Score&#58; {finalScore}</Button>} /> }
                </NavGroup>
                <NavGroup label="Group Members">
                    {members && members.length > 0 && members.map( (member, i) => {
                            if(member === admin){ 
                                return <NavItem icon={<BiStar />} label={member} key={i} />
                            } else {
                                return <NavItem icon={<BiUser />} label={member} key={i} />
                            }
                        })
                    }
                    <NavItem subtle icon={<BiPlusCircle />} label={<Button _focus={{bg:'transparent'}} _hover="transparent" variant="ghost" size="sm" onClick={() => console.log('line 66, onClick')}>Add Group Member</Button>} />
                </NavGroup>
            </Stack>
            {/* <Box>
                <Stack spacing="1">
                    <NavItem subtle icon={<BiCog />} label="Settings" />
                    <NavItem subtle icon={<BiBuoy />} label="Help & Support" />
                </Stack>
            </Box> */}
        </Flex>
    )
}