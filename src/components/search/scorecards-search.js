import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react'

export const ScorecardsSearch = ({ handleSearch, value }) => {
  return (
    <InputGroup w="50%" m="auto">
      <InputLeftElement pointerEvents="none">
        <SearchIcon opacity={0.82} />
      </InputLeftElement>
      <Input
        w="100%"
        value={value}
        onChange={handleSearch}
        placeholder="Search"
        bg="whiteAlpha.400"
        border={0}
        focusBorderColor="whiteAlpha.800"
        _placeholder={{
          color: 'whiteAlpha.600',
        }}
      />
    </InputGroup>
  )
}