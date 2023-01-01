
import { useState } from 'react'
import { Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { FaUsers } from 'react-icons/fa'
import { GiBoxingRing } from 'react-icons/gi'
import { ChatIcon } from '@chakra-ui/icons'
import { HiOutlinePencil } from 'react-icons/hi'
import { TabsEnum, useGlobalStore } from '../../stores'

export const ScoringTabs = () => {
    
    const [activeTab, setActiveTab] = useState(TabsEnum.SCORING)
    
    const {
        setTabs,
        tabs,
    } = useGlobalStore()

    const tab_data = [
        {
            label: 'Info',
            value: TabsEnum.INFO,
            icon: GiBoxingRing
        },
        {
            label: 'Scoring',
            value: TabsEnum.SCORING,
            icon: HiOutlinePencil
        },
        {
            label: 'Chat',
            value: TabsEnum.CHAT,
            icon: ChatIcon
        },
        // {
        //     label: 'Analytics',
        //     value: 'analytics',
        //     icon: TiChartLineOutline
        // },
        {
            label: 'Group',
            value: TabsEnum.TABLE,
            icon: FaUsers
        },
    ];

    const handleTabClick = e => {
        const { id } = e.currentTarget;
        setActiveTab(id)
        setTabs(id)
    }

    return (
        <Flex 
            id="scoring_tabs"
            display={tabs[TabsEnum.ALL] ? "none" : "flex"} 
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
                                color={tab.value === activeTab ? '#e62b2b' : 'whiteAlpha.900'}
                            />
                            <Text 
                                color={tab.value === activeTab ? '#e62b2b' : 'whiteAlpha.900'}
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