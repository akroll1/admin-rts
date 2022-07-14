import React from 'react';
import { Button, Flex, Stack } from '@chakra-ui/react'
import { AnalyticsSearchField } from '../analytics'
import { NavGroup } from './scoring-sidebar/nav-group'
import { NavItem } from './scoring-sidebar/nav-item'
import { FaMapMarkerAlt, FaRegClock, FaRegMoneyBillAlt, FaTv } from 'react-icons/fa'
import { BiChevronRightCircle, BiCog, BiBuoy } from 'react-icons/bi'
import { IoScaleOutline } from 'react-icons/io5'
import { getSidebarData } from '../../utils'
import { DividerWithText } from '../../chakra'
/**
 * THIS NEEDS TO SWITCH BETWEEN A LIST OF SHOWS 
 * AND THE SHOW STATS IF THERE IS A /:fightId PARAM.
 */
export const AnalyticsSidebar = ({ showData }) => {
    const handleSearch = () => {
        console.log('handleSearch')
    }
    const { fightQuickTitle, location, network, odds, rounds, showTime, weightclass } = showData?.fight ? getSidebarData(showData) : '';
    return (
        <Flex 
            id="analytics_sidebar" 
            as="aside"
            flex="1 0 25%" 
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
            bg="gray.900" 
            color="white" 
            fontSize="sm"
        >
            <AnalyticsSearchField style={{width: '100%'}} handleSearch={handleSearch} />
            <DividerWithText text={fightQuickTitle ? fightQuickTitle : 'Search'} />
            <Stack w="full" spacing="4" flex="1" overflow="auto" pt="8" p="2">               
                <NavGroup label="Show">
                    <NavItem icon={<FaTv />} label={ network } />
                    <NavItem icon={<FaMapMarkerAlt />} label={ location } />
                    <NavItem icon={<FaRegClock />} label={ showTime } />
                </NavGroup>

                <NavGroup label="Fight">
                    <NavItem icon={<BiChevronRightCircle />} label={ rounds ? rounds + ' Rounds' : '' } />
                    <NavItem icon={<IoScaleOutline />} label={ weightclass } />
                    <NavItem icon={<FaRegMoneyBillAlt />} label={ odds } /> 
                </NavGroup>

                <NavGroup label="Support">
                    <NavItem subtle icon={<BiCog />} label="Explanations" />
                    <NavItem subtle icon={<BiBuoy />} label="Help & Support" />
                </NavGroup>
            </Stack>
        </Flex>
    )

}