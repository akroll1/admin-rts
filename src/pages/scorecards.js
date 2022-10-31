import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { ScorecardsPageTable } from '../components/tables'
import { ExpiredTokenModal } from '../components/modals'
import { useScorecardStore } from '../stores'
import { ScorecardsPageSidebar } from '../components/sidebars'

export const ScorecardsPage = () => {

  const {
    fetchAllSeasons,
    fetchUserScorecards,
    userScorecards,
  } = useScorecardStore();

  useEffect(() => {
    fetchUserScorecards()
    fetchAllSeasons()
  },[])

  return (
    <Flex 
      w={["100%"]} 
      p="2"
      my={["2", "4"]}
      flexWrap="wrap" 
      height="auto" 
      flexDirection={["column", "row"]} 
      color="white" 
      alignItems="flex-start" 
      justifyContent="center" 
      bg="fsl-body-bg"
      boxSizing="border-box"
    >    
      <ExpiredTokenModal />
       
      <ScorecardsPageSidebar />
      <ScorecardsPageTable scorecards={userScorecards} />
    </Flex>
  )
}
export default ScorecardsPage