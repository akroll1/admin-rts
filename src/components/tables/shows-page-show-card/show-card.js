import React from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Flex, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { CardWithAvatar } from './card-with-avatar'
import { FollowerCount } from './follower-count'
import { FighterInfoCard } from './fighter-info-card'

export const ShowCard = ({ fighters }) => {
    const navigate = useNavigate();
    return (
        <Flex boxSizing="border-box" w={{base:'100%', md:'80%', lg:'70%'}} maxWidth="100%" p="1rem" flexWrap="wrap" flexDirection="row" alignItems="center" justifyContent="space-between">
            {fighters.length > 0 && fighters.map( (fighter,i) => {
                const { fighterId, firstName, lastName, ringname} = fighter;
                return (
                    <Flex justifyContent="space-evenly" boxSizing="border-box" flex="1 0 30%" bg="gray.500" px={{ base: '6', md: '8' }} py="3" m="1rem" mt="1" borderRadius="3px" key={i}>
                        <CardWithAvatar maxWidth="100%" key={fighterId} avatarProps={{ lastName, firstName }}>
                            <FighterInfoCard mt="3" ringname={ringname} lastName={lastName} firstName={firstName} bio={lastName} isVerified={true} />
                            <FollowerCount my="3" count={Math.random().toFixed(3)*1000} />
                            <Button onClick={() => navigate(`/fighters/${fighterId}`)} variant="outline" colorScheme="red" rounded="full" size="sm" width="full">
                                View Profile
                            </Button>
                        </CardWithAvatar>
                    </Flex>
                )
            })}
        </Flex>
    )
}