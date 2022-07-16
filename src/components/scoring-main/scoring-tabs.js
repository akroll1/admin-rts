import { Button, Flex, Heading, Icon, Stack, Text, VStack } from '@chakra-ui/react'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { TiChartBarOutline, TiChartLineOutline, TiMessages, TiNews } from 'react-icons/ti'
import { GiBoxingRing } from 'react-icons/gi'
import { ChatIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons'

export const ScoringTabs = ({ tabs, setTabs }) => {
    const resetTabs = {
        sidebar: false,
        scoring: false, 
        table: false,
        chat: false,
        analytics: false
    }
    const tab_data = [
        {
            label: 'Sidebar',
            value: 'sidebar',
            icon: InfoOutlineIcon
        },
        {
            label: 'Scoring',
            value: 'scoring',
            icon: GiBoxingRing
        },
        {
            label: 'Chat',
            value: 'chat',
            icon: ChatIcon
        },
        {
            label: 'Analytics',
            value: 'analytics',
            icon: TiChartLineOutline
        },
        {
            label: 'Table',
            value: 'table',
            icon: TiNews
        },
    ];

    const handleTabClick = e => {
        const { id } = e.currentTarget;
        setTabs({ ...resetTabs, [id]: true })
    }

    return (
        <Flex 
            id="scoring_tabs"
            display={['flex','flex', 'none']} 
            as="section" 
            bg="gray.600" 
            flexDirection="row" 
            w="100%"
            position="fixed"
            bottom="0"
        >
            { tab_data.map( tab => {
                return (
                    <Flex 
                        key={tab.value}
                        id={tab.value}
                        p="4" 
                        border="2px solid gray" 
                        alignItems="center" 
                        justifyContent="center" 
                        flex="1 0 20%"
                        maxW="20%"
                        onClick={handleTabClick}
                    >
                        <VStack>
                            <Icon as={tab.icon} />
                            <Text fontSize={["xs", "md"]} textAlign="center">{tab.label}</Text>
                        </VStack>
                    </Flex>
                )
            })}
        </Flex>
    )
}