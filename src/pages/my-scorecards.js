import React, { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { capFirstLetters } from '../utils'
import { useScorecardStore, useStateStore } from '../stores'

export const MyScorecards = () => {
  const [modals, setModals] = useState({
      expiredTokenModal: false
  });

  const { 
    user, 
    setUser, 
    setUserScorecards, 
    tokenConfig,
  } = useStateStore();

  const {
    fetchUserScorecards,
    updateUser,
    userScorecards,
  } = useScorecardStore();

    useEffect(() => {
      if(userScorecards.length === 0){
        fetchUserScorecards()
        updateUser()
      }
    },[])
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