import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'

export const MyScorecards = () => {
  const [modals, setModals] = useState({
      expiredTokenModal: false
  });


  const {
    fetchUserScorecards,
    userScorecards,
  } = useScorecardStore();

    useEffect(() => {
      if(userScorecards.length < 1){
        fetchUserScorecards()
      }
    },[userScorecards])
    console.log('userScorecards: ', userScorecards)
    return (
        <Flex flexDir="column" p="4">
            <ExpiredTokenModal 
                modals={modals}
                setModals={setModals}
            />
            <Heading textAlign="center">Scorecards</Heading>
            <MyScorecardsTable scorecards={userScorecards} />
        </Flex>
    )
}
export default MyScorecards