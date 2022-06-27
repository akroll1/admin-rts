import * as React from 'react'
import { Box, Circle, Flex, HStack, Img, NavItem, Stack, useMenuButton } from '@chakra-ui/react'
import { HiSelector } from 'react-icons/hi'

export const AccountSwitcherButton = (props) => {
    const buttonProps = useMenuButton(props);
    const { groupScorecardId, label } = props;
    // const transformedFightResult = fightResult => {
    //     if(fightResult === 'pending') return <Circle m="3" size="3" bg="blue.400" />
    //     if(fightResult === 'active') return <Circle m="3" size="3" bg="blue.400" />
    //     if(fightResult === 'complete') return <Circle m="3" size="3" bg="blue.400" />
    // }
    return (
        <Flex
            as="button"
            {...buttonProps}
            w="full"
            display="flex"
            alignItems="center"
            rounded="lg"
            bg="gray.700"
            px="3"
            py="2"
            fontSize="sm"
            userSelect="none"
            cursor="pointer"
            outline="0"
            transition="all 0.2s"
            _active={{bg: 'gray.600'}} _focus={{shadow: 'outline'}}
        >
            <HStack flex="1" spacing="3">
                <Img w="8" h="8" rounded="md" objectFit="cover" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbiUyMHNpbWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100" alt="profile picture"
                />
                <Box textAlign="start">
                <Box isTruncated fontWeight="semibold">
                    {label}
                </Box>
                <Box fontSize="xs" color="gray.400">
                    Scorecards
                </Box>
                </Box>
            </HStack>
            <Stack>
            </Stack>
            <Box fontSize="lg" color="gray.400">
                <HiSelector />
            </Box>
        </Flex>
    )
}