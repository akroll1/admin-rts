import React from 'react'
import { Box, Flex, Text, useColorModeValue as mode} from '@chakra-ui/react'
import { capFirstLetters } from '../../../utils'

export const ScoringTableInfo = ({ 
  fighters,
  finalScore,
  prediction,
  username, 
}) => {
  const usernameCheck = username => {
    if(username?.includes('@')){
      return username.slice(0, username.indexOf('@'))
    } 
    return username; 
  }

  
  // console.log('fighters: ', fighters)
  // console.log('prediction: ', prediction)
  // console.log('username: ', username)
  
  const predictionWinner = prediction ? prediction.split('-')[0] : `No Prediction`;
  const predictionHow = prediction ? prediction.split('-')[1] : ``;
  return (
    <Flex 
      mt="0" 
      p="1" 
      pt="0" 
      flexDirection="column" 
      alignItems="flex-start" 
      justifyContent="flex-start"
      minW="10rem"
    >
      <Flex 
        flexDirection="row"
        className='username' 
        p="1" 
        m="0" 
        mt="1"
        minW="100%" 
        fontSize="sm"  
        color="white" 
        fontWeight="bold"
        // textAlign="center"
        justifyContent="space-between"
        alignItems="center"
      >
          <Text>{`${usernameCheck(username)}`}</Text>
          <Text color="fsl-text">{`${finalScore ? "Score: " + finalScore : ""}`}</Text> 
      </Flex>
      { fighters?.length > 0 && fighters.map( (fighter, i) => {
        const isPredicted = predictionWinner === fighters[i];  
        return (
          <Flex 
            className='fighterNames'
            justifyContent='space-between'
            fontSize="sm" 
            p="1" 
            m="0"
            mb={i === 0 ? 1 : 0} 
            minW="100%" 
            background={i === 0 ? "fsl-red" : "fsl-scoring-blue"}
            color="white"
            fontWeight="normal"
            border={isPredicted ? '1px solid white' : ''}
          >
            <Text>{`${capFirstLetters(fighter)}`}</Text> 
            <Text>{`${isPredicted ? predictionHow : ''}`}</Text>
          </Flex>
        )
      })}  
    </Flex>
  )
}
