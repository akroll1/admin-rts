import * as React from 'react'
import { Menu, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text, useColorModeValue } from '@chakra-ui/react'
  import { AccountSwitcherButton } from './account-switcher-button'
  
  export const AccountSwitcher = ({ fighterA, fighterB, fightResult, scorecardName, groupScorecardId  }) => {
    return (
      <Menu>
        <AccountSwitcherButton fightResult={fightResult} fighterA={fighterA} fighterB={fighterB}  scorecardName={scorecardName} groupScorecardId={groupScorecardId} />
        <MenuList shadow="lg" py="4" color={useColorModeValue('gray.600', 'gray.200')} px="3">
          <Text fontWeight="medium" mb="2">
            My Scorecards
          </Text>
          <MenuOptionGroup defaultValue="chakra-ui">
            <MenuItemOption value="chakra-ui" fontWeight="semibold" rounded="md">
                {scorecardName}
            </MenuItemOption>
            <MenuItemOption value="careerlyft" fontWeight="semibold" rounded="md">
                Another Scorecard
            </MenuItemOption>
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