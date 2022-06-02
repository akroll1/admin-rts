import React from 'react'
import { Box, Select } from '@chakra-ui/react'

export const GuestScorers = ({ guestScorers, handleGuestScorerSelect }) => {
    console.log('guestScorers: ',guestScorers);
    return (
        <Box mt="1rem" w="50%">
            <Select onChange={handleGuestScorerSelect} m="auto" w="100%" mt="" placeholder="Add Guest Scorers">
                {guestScorers && guestScorers.length > 0 && guestScorers.map((guestScorer,i) => {
                    let { guestScorerId, firstName, lastName, displayName, scorecardId, prediction } = guestScorer;
                    return <option key={i} value={guestScorerId}>{firstName+ ' '+lastName}</option>
                })}
            </Select>
        </Box>
    )
} 