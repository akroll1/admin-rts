import React from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react'
import { AccountSwitcher } from './scoring-sidebar/account-switcher'
import { NavGroup } from './scoring-sidebar/nav-group'
import { NavItem } from './scoring-sidebar/nav-item'
import { FaLock } from 'react-icons/fa'
export const AnalyticsSidebar = () => {

    return (
            <Flex 
            id="scoring-sidebar" 
            w="100%" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            minH={["22rem"]} 
            maxH={["35vh", "40vh", "60vh"]}
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
            <AccountSwitcher />
            <Stack w="full" spacing="4" flex="1" overflow="auto" pt="8" p="2">
                <NavGroup label="Prediction">
                    <NavItem 
                        id="prediction"
                        icon={<FaLock />} 
                        // handlePredictionToggle={handlePredictionToggle}

                        label={<Button 
                            // disabled={isLocked} 
                            button={'button'}
                            justifyContent="flex-start" 
                            textAlign="left" 
                            fontSize="md" 
                            w="100%" 
                            my="-2" 
                            _focus={{bg:'transparent'}} 
                            _hover="transparent" 
                            variant="ghost" 
                            size="sm" 
                            pl="0" 
                            m="0"
                        >
                            { 'Set Prediction' }
                        </Button>} 
                    /> 
                </NavGroup>
            </Stack>
        </Flex>
    )

}