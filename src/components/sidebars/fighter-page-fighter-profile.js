import React from 'react'
import { Button, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { CardWithAvatar  } from './fighters-sidebar-components'
import { FollowerCount } from './fighters-sidebar-components'
import { FighterInfoCard } from './fighters-sidebar-components'
import { Stars } from '../stars'

export const FightersPageFighterProfile = ({ selectedFighter, handleViewProfile }) => {
    const { firstName, lastName, fighterId, ringname } = selectedFighter ? selectedFighter : {};
    return (
        <>
            <Flex alignItems="center" justifyContent="center" flex="1 0 30%" bg="gray.500" maxW={{ base: 'xs', md: '3xl' }} mx="auto" p="5" borderRadius="3px">
                <CardWithAvatar w="100%" key={fighterId} avatarProps={{ lastName, firstName }}>
                <FighterInfoCard mt="3" ringname={ringname} lastName={lastName} firstName={firstName} bio={lastName} isVerified={true} />
                <FollowerCount my="3" count={Math.random().toFixed(3)*1000}  />
                <Button variant="outline" colorScheme="red" rounded="full" size="sm" width="full">
                {/* <Button onClick={() => history.push(`/fighters/${fighterId}`)} variant="outline" colorScheme="red" rounded="full" size="sm" width="full"> */}
                    View Profile
                </Button>
                </CardWithAvatar>
            </Flex>
            <Flex flexDirection="column" flex="1 0 60%" alignItems="center" justifyContent="flex-start">
                <Heading mt="1rem" as="h3" size="md">Fan Ratings and Reviews</Heading>
                <p>chakra ecomm reviews go here</p>
                <Stars />
            </Flex>
        </>
    )
}