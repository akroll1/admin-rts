
import { useEffect, useState } from 'react'
import { Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { FaUsers } from 'react-icons/fa'
import { GiBoxingRing } from 'react-icons/gi'
import { ChatIcon } from '@chakra-ui/icons'
import { HiOutlinePencil } from 'react-icons/hi'

export const ScoringTabs = ({ 
    setTabs,
    tabs
}) => {
    const [activeTab, setActiveTab] = useState('scoring')
 
    const resetTabs = {
        info: false,
        scoring: false, 
        table: false,
        chat: false,
        analytics: false,
        all: false
    }
    const tab_data = [
        {
            label: 'Info',
            value: 'info',
            icon: GiBoxingRing
        },
        {
            label: 'Scoring',
            value: 'scoring',
            icon: HiOutlinePencil
        },
        {
            label: 'Chat',
            value: 'chat',
            icon: ChatIcon
        },
        // {
        //     label: 'Analytics',
        //     value: 'analytics',
        //     icon: TiChartLineOutline
        // },
        {
            label: 'Group',
            value: 'table',
            icon: FaUsers
        },
    ];

    const handleTabClick = e => {
        const { id } = e.currentTarget;
        setActiveTab(id)
        setTabs({ ...resetTabs, [id]: true })
    }

    return (
        <Flex 
            id="scoring_tabs"
            display={tabs.all ? "none" : "flex"} 
            as="section" 
            bg="#121212" 
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
                        border="3px solid #171717" 
                        alignItems="center" 
                        justifyContent="center" 
                        flex="1 0 20%"
                        maxW="25%"
                        onClick={handleTabClick}
                    >
                        <VStack>
                            <Icon 
                                as={tab.icon} 
                                color={tab.value === activeTab ? '#C01616' : 'white'}
                            />
                            <Text 
                                color={tab.value === activeTab ? '#C01616' : 'white'}
                                fontSize={["xs", "md"]} 
                                textAlign="center"
                            >
                                {tab.label}
                            </Text>
                        </VStack>
                    </Flex>
                )
            })}
        </Flex>
    )
}