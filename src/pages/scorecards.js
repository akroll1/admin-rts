import { useEffect } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { ScorecardsPageTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'
import { ScorecardsPageSidebar } from '../components/sidebars'

import { ScorecardsPage2 } from '../components/scorecards'

export const ScorecardsPageOriginal = () => {

  const {
    fetchUserInvites,
    fetchUserScorecards,
    tokenExpired,
  } = useScorecardStore();

  useEffect(() => {
    fetchUserInvites()
    fetchUserScorecards()
  },[])

  useEffect(() => {
    if(tokenExpired){

    }
  },[tokenExpired])

  return (
    <Flex 
      w={["100%"]} 
      p="2"
      my={["2"]}
      flexWrap="wrap" 
      height="auto" 
      color="white" 
      alignItems="flex-start" 
      justifyContent="center" 
      bg="fsl-body-bg"
      boxSizing="border-box"
    >    
      {/* <ExpiredTokenModal /> */}
      <ScorecardsPage2 />
    </Flex>
   
  )
}
export default ScorecardsPage