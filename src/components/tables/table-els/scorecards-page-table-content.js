import { useEffect, useState } from 'react'
import { 
  Table, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  useColorModeValue as mode 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useScorecardStore } from '../../../stores'

const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}

export const ScorecardsPageTableContent = () => {
  
  const {
    userScorecards,
    selectedSeasonSummary
  } = useScorecardStore() 

  const navigate = useNavigate()

  // useEffect(() => {
  //   if(userScorecards?.length && selectedSeasonSummary?.fightSummaries.length){
      
  //   }
  // },[userScorecards, selectedSeasonSummary])

  return (
    <Table 
      variant="simple" 
      border="1px solid rgba(255, 255, 255, 0.16)" 
      fontSize="sm" 
      size={['sm', 'md']}
      overflow="scroll"
      m="auto"
      bg="#151515"
    >
      <Thead bg={mode('gray.50', '#262626')}>
        <Tr>
            <Th whiteSpace="nowrap" scope="col">
              Scorecard  
            </Th>
            <Th whiteSpace="nowrap" scope="col">
              Prediction
            </Th>
            <Th whiteSpace="nowrap" scope="col">
              Score
            </Th>
            <Th whiteSpace="nowrap" scope="col"textAlign="center">
              See Scorecard
            </Th>
        </Tr>
      </Thead>
      <Tbody>
        { userScorecards && userScorecards?.length > 0 && userScorecards?.map((row, index) => {
          const { fightStatus, finalScore, groupScorecardId, prediction } = row;
          // const transformedFightStatus = fightStatus.charAt(0).toUpperCase() + fightStatus.slice(1).toLowerCase();
          const renderScoreOrStatus = () => {
            if(fightStatus === `CANCELED`) return `Canceled`;
            if(fightStatus === `PENDING`) return `Upcoming`;
            if(finalScore) return finalScore;
            if(!finalScore && !prediction) return `No Prediction`; 
          }
          return (
            <Tr 
              border="1px solid #ffffff29"
              key={index} 
              _hover={{
                textAlign: "left",
                cursor: 'pointer', 
                bg: '#535353', 
                color: '#fff', 
                borderBottom: '2px solid #262626',
                borderRadius: '5px'
              }} 
            >
              <Td 
                onClick={() => console.log('setSelectedFightSummary')} 
                whiteSpace="nowrap"
              >
                { 'label was here' }
              </Td>
              <Td 
                onClick={() => console.log('setSelectedFightSummary')} 
                whiteSpace="nowrap"
              >
                { prediction ? prediction : `No Prediction`}                      
              </Td>
              <Td 
                onClick={() => console.log('setSelectedFightSummary')} 
                whiteSpace="nowrap"
              >
                { renderScoreOrStatus() }                      
              </Td>
              <Td 
                onClick={() => navigate(`/scorecards/${groupScorecardId}`)} 
                textAlign="center" 
                whiteSpace="nowrap"
              >
                <ExternalLinkIcon /> 
              </Td>
            </Tr>
        )})}
      </Tbody>
    </Table>
  )
}