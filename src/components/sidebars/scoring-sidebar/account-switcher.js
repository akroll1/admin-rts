import * as React from 'react'
import { Flex, Menu, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text, useColorModeValue } from '@chakra-ui/react'
import { AccountSwitcherButton } from './account-switcher-button'
import { useNavigate } from 'react-router'
import { useStateStore } from '../../../stores'

export const AccountSwitcher = () => {
  const navigate = useNavigate();
  const { userScorecards } = useStateStore.getState();
  return (
    <Menu>
      <AccountSwitcherButton mb="2" />
      <MenuList shadow="lg" py="4" color={useColorModeValue('gray.600', 'gray.200')} px="3">
        <Text fontWeight="medium" mb="2">
          All Scorecards
        </Text>
        <MenuOptionGroup defaultValue="chakra-ui">
          { userScorecards?.length > 0 && userScorecards?.map( (scorecard, i) => {
            return (
              <MenuItemOption onClick={() => navigate(`/scoring/${scorecard.groupScorecardId}`, {replace: true})} key={i} value="chakra-ui" fontWeight="semibold" rounded="md">
                {scorecard.label}
              </MenuItemOption>
            )
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}