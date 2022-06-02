import React, { useState } from 'react';
import { Flex, FormControl, Switch, FormLabel } from '@chakra-ui/react'

export const SwitchesPanel = ({ switches, setSwitches }) => {

    return (
        <Flex flexDirection="column">
            <FormControl mt="3" display="flex" alignItems="center">
                <Switch mr="3" colorScheme="red" id="showInfoPanel" 
                onChange={() => {
                    switches.showInfoPanel = !switches.showInfoPanel;   
                    setSwitches({...switches})
                }} />
                <FormLabel htmlFor="showInfoPanel" mb="0">
                    Show Info Panel
                </FormLabel>
            </FormControl>
            <FormControl mt="3" display="flex" alignItems="center">
                <Switch mr="3" value={switches.onlyShowToCurrentRound ? true : false} onChange={() => {
                    switches.onlyShowToCurrentRound = !switches.onlyShowToCurrentRound;
                    setSwitches({...switches})
                }} colorScheme="red" id="showToCurrentRoundOnly" />
                <FormLabel htmlFor="showToCurrentRoundOnly" mb="0">
                    Show Scores to Your Current Round
                </FormLabel>
            </FormControl>
            <FormControl mt="3" display="flex" alignItems="center">
                <Switch mr="3" value={switches.showGuestScorers ? true : false} onChange={() => {
                    switches.showGuestScorers = !switches.showGuestScorers;
                    setSwitches({...switches})
                }} colorScheme="red" id="guestScorersSet" />
                <FormLabel htmlFor="guestScorersSet" mb="0">
                    Show Guest Scorers
                </FormLabel>
            </FormControl>
        </Flex>
    )
}
