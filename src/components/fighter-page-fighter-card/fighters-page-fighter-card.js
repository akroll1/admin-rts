import React from 'react'
import { useHistory } from 'react-router'
import { Box, Button, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { CardWithAvatar } from './card-with-avatar'
import { FollowerCount } from './follower-count'
import { FighterInfoCard } from './fighter-info-card'

export const FightersPageFighterCard = ({ selectedFighter }) => {
    const history = useHistory();
    const { firstName, lastName, fighterId, ringname } = selectedFighter ? selectedFighter : {};
    return (
        <Box w="100%" bg={useColorModeValue('gray.100', 'gray.800')} px={{ base: '6', md: '8' }} py="3">
            <Box as="section" maxW={{ base: 'xs', md: '3xl' }} mx="auto">
            <SimpleGrid w="100%" columns={{ base: 1 }} spacing="3">
                <CardWithAvatar key={fighterId} avatarProps={{ lastName, firstName }}>
                <FighterInfoCard mt="3" ringname={ringname} lastName={lastName} firstName={firstName} bio={lastName} isVerified={true} />
                <FollowerCount my="3" count={306} />
                <Button onClick={() => history.push(`/fighters/${fighterId}`)} variant="outline" colorScheme="red" rounded="full" size="sm" width="full">
                    View Profile
                </Button>
                </CardWithAvatar>
            </SimpleGrid>
            </Box>
        </Box>
    )
}