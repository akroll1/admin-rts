import * as React from 'react'
import { Avatar, AvatarBadge, Box, Center, HStack, Stack, StackDivider, Text } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const PagePoundList = ({ officialPoundList }) => {
    // console.log('officialPoundList: ', officialPoundList)
    const avatarUrl = 'https://bit.ly/code-beast';
    return (
        <Center
            maxW="sm"
            mx="auto"
            py={{base: '4', md: '4' }}
        >
            <Box bg="bg-surface" py="4">
                <Stack spacing="4">
                    {officialPoundList.map( (fighter,i) => {
                        const { fighterId, firstName, lastName, ringname } = fighter;
                        return (

                            <Stack minH="3rem" key={fighterId} fontSize="sm" px="4" spacing="4" border="1px solid #795858" borderRadius="md">
                                <Stack direction="row" justify="space-between" spacing="4">
                                    <HStack spacing="3">
                                        <Avatar src={avatarUrl} boxSize="10">
                                            <AvatarBadge boxSize="4" bg="red.500" />
                                        </Avatar>
                                        <Box>
                                        <Text fontWeight="medium" color="emphasized">
                                            {capFirstLetters(firstName)} {capFirstLetters(lastName)}
                                        </Text>
                                        <Text fontSize="xs" color="muted">Last Week&#8211; </Text>
                                        </Box>
                                    </HStack>
                                    <Text fontSize="xl" color="muted">{i+1}&nbsp;&nbsp;</Text>
                                </Stack>
                                {/* <Text
                                    minW="100%"
                                    color="muted"
                                    sx={{
                                        '-webkit-box-orient': 'vertical',
                                        '-webkit-line-clamp': '2',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                    }}
                                >
                                    Reason boxer is at this place on the list and a blurb of where they are headed
                                </Text> */}
                            </Stack>
                    )})}
                </Stack>
            </Box>
        </Center>
    )
};

