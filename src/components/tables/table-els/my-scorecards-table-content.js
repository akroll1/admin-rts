import React, { useState } from 'react'
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}

export const MyScorecardsTableContent = ({ 
  scorecards 
}) => {

  const navigate = useNavigate();
  return (
    <Flex overflow="scroll" w="100%">
      <Table my="8" border="1px solid rgba(255, 255, 255, 0.16)" fontSize="sm" size={['sm', 'md']}>
        <Thead bg={mode('gray.50', 'gray.800')}>
          <Tr>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Scorecard  
              </Th>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Prediction
              </Th>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Score
              </Th>
              <Th style={{textAlign:'center'}} whiteSpace="nowrap" scope="col">
                Link
              </Th>
          </Tr>
        </Thead>
        <Tbody>
          { scorecards?.length > 0 && scorecards.map((row, index) => {
            const { fightStatus, finalScore, groupScorecardId, label, prediction, rounds, scorecardId } = row;
            const transformedFightStatus = fightStatus.charAt(0).toUpperCase() + fightStatus.slice(1).toLowerCase();
            const renderScoreOrStatus = () => {
              if(fightStatus === `CANCELED`) return `Canceled`;
              if(fightStatus === `PENDING`) return `Upcoming`;
              if(finalScore) return finalScore;
              if(!finalScore && !prediction) return `No Prediction`; 
            }
            return (
              <Tr 
                border="none"
                key={index} 
                _hover={{
                  textAlign: "center",
                  cursor: 'pointer', 
                  bg: 'gray.700', 
                  color: '#fff', 
                  borderBottom: '2px solid #795858',
                  borderRadius: '5px'
                }} 
              >
                <Td onClick={() => navigate(`/scoring/${groupScorecardId}`)} textAlign="center" whiteSpace="nowrap">
                  { label }
                </Td>
                <Td onClick={() => navigate(`/scoring/${groupScorecardId}`)} textAlign="center" whiteSpace="nowrap">
                  { prediction }                      
                </Td>
                <Td onClick={() => navigate(`/scoring/${groupScorecardId}`)} textAlign="center" whiteSpace="nowrap">
                  { renderScoreOrStatus() }                      
                </Td>
                <Td onClick={() => navigate(`/scorecards/${scorecardId}`)} textAlign="center" whiteSpace="nowrap">
                  <ExternalLinkIcon /> 
                </Td>
              </Tr>
          )})}
        </Tbody>
      </Table>
    </Flex>
  )
}