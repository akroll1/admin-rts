import React, { useState } from 'react'
import { Flex, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'

const badgeEnum = {
  completed: 'green',
  active: 'orange',
  // declined: 'red',
}

export const MyScorecardsTableContent = ({ scorecards }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [hasCopied, onCopy] = useState(value);

  const handleCopy = e => {
    const { id } = e.currentTarget;
    setValue(id);
    const link = `${window.location.origin}/scorecards/${id}`
    onCopy(value)
    navigator.clipboard.writeText(link)
  }
  
  return (
    <Flex overflow="scroll" w="100%">
      <Table my="8" borderWidth="1px" fontSize="sm" size={['sm', 'md']}>
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
              if(finalScore) return finalScore;
              if(!finalScore){
                return fightStatus === `CANCELED` ? `Canceled` : `Upcoming`;
              }
            }
            return (
              <Tr 
                key={index} 
                _hover={{
                  textAlign: "center",
                  cursor: 'pointer', 
                  bg: 'gray.700', 
                  color: '#fff', 
                  borderX: '1px solid #795858',
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
                <Td value={value} onClick={handleCopy} id={`${scorecardId}`} textAlign="center" whiteSpace="nowrap">
                  { hasCopied && `${scorecardId}` === value ? `Copied!` : <CopyIcon /> }
                </Td>
              </Tr>
          )})}
        </Tbody>
      </Table>
    </Flex>
  )
}