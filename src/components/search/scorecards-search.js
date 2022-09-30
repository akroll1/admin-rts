import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const ScorecardsSearch = ({ 
  handleAutocompleteClick,
  handleUserSearch,
  search,
  searchResults,
}) => {

  const optionsStyles = {
    zIndex: '1000',
    cursor: 'pointer',
    background: 'gray',
    borderRadius: '5px',
    border: '1px solid white',
  }

  return (
    <Flex flexDir="column" w="50%" m="auto">   
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon opacity={0.82} />
        </InputLeftElement>
        <Input
          w="100%"
          value={search}
          onChange={handleUserSearch}
          placeholder="Username"
          bg="whiteAlpha.400"
          border={0}
          focusBorderColor="whiteAlpha.800"
          _placeholder={{
            color: 'whiteAlpha.600',
          }}
          />
      </InputGroup>
      {/* <Select> */}
        { searchResults.length > 0 && searchResults.map( ({ sub, username }) => {
          return (
            <option 
              onClick={handleAutocompleteClick} 
              style={optionsStyles} 
              id={sub} 
              value={username}
              key={sub}
            >
              {`${username}`}
            </option> 
          )
        })}
      {/* </Select> */}
    </Flex>
  )
}