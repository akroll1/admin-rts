import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'

export const MyScorecards = () => {

  const {
    fetchUserScorecards,
    userScorecards,
  } = useScorecardStore();

    useEffect(() => {
      fetchUserScorecards()
    },[])
    // console.log('userScorecards: ', userScorecards)
    return (
        <Flex 
          w={["100%", "80%", "60%"]}
          m="auto"
          flexDir="column" 
          p="4"
        >
            <ExpiredTokenModal />
            <Heading textAlign="center">Scorecards</Heading>
            <MyScorecardsTable scorecards={userScorecards} />
        </Flex>
    )
}
export default MyScorecards