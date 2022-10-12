import React, { useState } from 'react'
import { Flex ,Box, Container, Stack, Tab, TabList, Tabs } from '@chakra-ui/react'
import { AnalyticsSidebarRecentShows, AnalyticsSidebarSelectedShow } from './analytics-sidebars'

export const AnalyticsSidebar = ({
    allAnalyticsShows,
    selectedAnalyticsShow,
    setSelectedAnalyticsShow,
}) => {
    const [sidebar, setSidebar] = useState('all');
    const handleTabClick = e => {
        const { name } = e.currentTarget;
        setSidebar(name)
    }
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
                            <Tab 
                                flex="0 0 50%" 
                                borderRight="2px solid gray" 
                                _focus={sidebar === 'all' ? { borderBottom: '2px solid lightblue'} : ''} 
                                name="all" 
                                onClick={handleTabClick}
                            >
                                Recent Shows
                            </Tab>
                            <Tab 
                                flex="0 0 50%" 
                                _focus={sidebar === 'selected' ? { borderBottom: '2px solid lightblue'} : ''} 
                                name="selected" 
                                onClick={handleTabClick}
                            >
                                Show Info
                            </Tab>
                        </TabList>
                    </Tabs>
                </Stack>
            </Container>
            { sidebar === 'all' && 
                <AnalyticsSidebarRecentShows 
                    allAnalyticsShows={allAnalyticsShows}
                    setSelectedAnalyticsShow={setSelectedAnalyticsShow}
                    sidebar={sidebar} 
                />
            }
            { sidebar === 'selected' &&
                <AnalyticsSidebarSelectedShow 
                    allAnalyticsShows={allAnalyticsShows}
                    selectedAnalyticsShow={selectedAnalyticsShow}
                    sidebar={sidebar} 
                    setSelectedAnalyticsShow={setSelectedAnalyticsShow}
                />
            }
        </Flex>
    )
}