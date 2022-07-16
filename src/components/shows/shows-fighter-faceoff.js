import React from 'react'
import { Avatar, Flex } from '@chakra-ui/react'
import { FighterInfoCard } from '../tables/shows-page-show-card/fighter-info-card'
import { ShowsCountdownTimer } from '../timers'

export const ShowsFighterFaceoff = ({ fighters, showTime }) => {
  return (
    <>
      <Flex
        id="fighters_faceoff"
        as="section"
        w="100%"
        mx="auto"
        my="1"
        justifyContent="space-between"
        direction={["column", "row"]}
        alignItems="center"
        px="auto"
        py="1"
        position="relative"
        bg="transparent"
        shadow={{ md: 'base' }}
        maxW={["100%", "90%", "80%"]}
      >
        { fighters?.length > 0 && fighters?.map( fighter => {
          // console.log('fighter: ', fighter)
          const { firstName, lastName, ringname } = fighter;
          return (
            <Flex 
              key={lastName}
              flexDir="column"
              mx="auto"
              px="auto"
              my="1"
              flex="1 0 45%" 
              alignItems="center" 
              justifyContent="center"
            >
              <Avatar size="lg" />
              <FighterInfoCard 
                ringname={ringname ?? ''} 
                lastName={lastName} 
                firstName={firstName} 
              />
            </Flex>
          )})
        }
      </Flex>
      { showTime > Date.now() && <ShowsCountdownTimer showTime={showTime} /> }
    </>
  )
}