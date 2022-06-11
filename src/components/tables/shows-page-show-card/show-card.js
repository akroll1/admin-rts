import React from 'react'
import { useNavigate } from 'react-router'
import { Button, Flex } from '@chakra-ui/react'
import { CardWithAvatar } from './card-with-avatar'
import { FollowerCount } from './follower-count'
import { FighterInfoCard } from './fighter-info-card'
import axios from 'axios'
export const ShowCard = ({ fighters }) => {
    const navigate = useNavigate();
    return (
        <Flex 
            position="relative"
            boxSizing="border-box" 
            w={{base:'100%', md:'80%', lg:'100%'}} 
            maxWidth="100%" 
            p="1rem" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="space-between"
        >
            <Flex flexDir="row" flexWrap="wrap" w="100%" justifyContent="space-evenly">
                {fighters?.length > 0 && fighters.map( (fighter,i) => {
                    const { fighterId, firstName, lastName, ringname} = fighter;
                    return (
                        <CardWithAvatar key={fighterId} avatarProps={{ lastName, firstName }}>
                            <FighterInfoCard mt="3" ringname={ringname} lastName={lastName} firstName={firstName} bio={lastName} isVerified={true} />
                            <FollowerCount my="3" count={Math.random().toFixed(3)*1000} />
                            <Button onClick={() => navigate(`/fighters/${fighterId}`)} variant="outline" colorScheme="red" rounded="full" size="sm" width="full">
                                View Profile
                            </Button>
                        </CardWithAvatar>
                    )
                })}
            </Flex>
        </Flex>
    )
}