import * as React from 'react'
import { Flex, Menu, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text, useColorModeValue } from '@chakra-ui/react'
import { AccountSwitcherButton } from './account-switcher-button'
import { useUserScorecardsStore } from '../../../stores'
import { useNavigate, Navigate } from 'react-router'

export const AccountSwitcher = () => {
  const navigate = useNavigate();
  const scorecards = useUserScorecardsStore( state => state.userScorecards);
  console.log('scorecards: ', scorecards)
  const { groupScorecardId, label } = scorecards?.length > 0 ? scorecards : '';
  return (
    <Menu>
      <AccountSwitcherButton mb="2" groupScorecardId={groupScorecardId} label={label} />
      <MenuList shadow="lg" py="4" color={useColorModeValue('gray.600', 'gray.200')} px="3">
        <Text fontWeight="medium" mb="2">
          All Scorecards
        </Text>
        <MenuOptionGroup defaultValue="chakra-ui">
          { scorecards?.length > 0 && scorecards?.map( (scorecard, i) => {
            return (
              <MenuItemOption onClick={() => navigate(`/scoring/${scorecard.groupScorecardId}`)} as="button" key={i} value="chakra-ui" fontWeight="semibold" rounded="md">
                {scorecard.label}
              </MenuItemOption>
            )
          })}
        </MenuOptionGroup>
        {/* <MenuDivider />
        <MenuItem rounded="md">Workspace settings</MenuItem>
        <MenuItem rounded="md">Add an account</MenuItem>
        <MenuDivider /> */}
        {/* <MenuItem rounded="md">My Dashboard</MenuItem> */}
      </MenuList>
    </Menu>
  )
}