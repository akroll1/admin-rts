import React, { useState } from 'react'
import { Flex ,Box, Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { AnalyticsSidebarAllShows, AnalyticsSidebarSelectedShow } from './analytics-sidebars'

export const AnalyticsSidebar = () => {
    const [sidebar, setSidebar] = useState('all');
    const handleTabClick = e => {
        const { name } = e.currentTarget;
        setSidebar(name)
    }
    console.log('sidebar: ', sidebar)
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
            alignItems="flex-start" 
            justifyContent="flex-start"
            borderRadius="lg"
            direction="column" 
            p="2" 
            bg="gray.900" 
            color="white" 
            fontSize="sm"
        >
            <Container py={{base: '4', md: '8'}}>
                <Stack spacing="16">
                    <Tabs variant="with-line">
                        <TabList w="100%">
                            <Tab flex="0 0 50%" borderRight="2px solid gray" _focus={sidebar === 'all' ? { borderBottom: '2px solid blue'} : ''} name="all" onClick={handleTabClick}>All Shows</Tab>
                            <Tab flex="0 0 50%" _focus={sidebar === 'selected' ? { borderBottom: '2px solid blue'} : ''} name="selected" onClick={handleTabClick}>Selected Show</Tab>
                        </TabList>
                    </Tabs>
                </Stack>
            </Container>
            <AnalyticsSidebarAllShows 
                sidebar={sidebar} 
            />
            <AnalyticsSidebarSelectedShow 
                sidebar={sidebar} 
            />
        </Flex>
    )
}