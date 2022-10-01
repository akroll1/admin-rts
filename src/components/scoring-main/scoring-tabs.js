import { Button, Flex, Heading, Icon, Stack, Text, VStack } from '@chakra-ui/react'
import { FaUsers } from 'react-icons/fa'
import { TiChartLineOutline } from 'react-icons/ti'
import { GiBoxingRing } from 'react-icons/gi'
import { ChatIcon, EditIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { HiOutlinePencil } from 'react-icons/hi'

export const ScoringTabs = ({ 
    setTabs 
}) => {
    const resetTabs = {
        sidebar: false,
        scoring: false, 
        table: false,
        chat: false,
        analytics: false
    }
    const tab_data = [
        {
            label: 'Info',
            value: 'sidebar',
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
        setTabs({ ...resetTabs, [id]: true })
    }

    return (
        <Flex 
            id="scoring_tabs"
            display={['flex','flex', 'none']} 
            as="section" 
            bg="blackAlpha.900" 
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
                        maxW="25%"
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