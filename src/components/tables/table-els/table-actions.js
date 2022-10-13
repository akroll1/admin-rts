import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

export const TableActions = () => {
  const options = [
    { 
      value: 'season1',
      label: 'Season 1'
    },
    { 
      value: 'season2',
      label: 'Season 2'
    },
    { 
      value: 'season3',
      label: 'Season 3'
    },
  ];
  return (
    <Flex 
      direction={{base: 'column', md: 'row'}} 
      justify="space-between"
    >
      <Select  
        maxW="35%"
        rounded="base" 
        size="sm" 
        placeholder="Season"
        _hover={ {cursor: 'pointer' }}
        _focus={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
        _active={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
      >
        {
          options && options.length > 0 && options.map( option => <option key={option.value} value={option.value} label={option.label} />)
        }
      </Select>
      <FormControl
        id="search"
        maxW="35%"
      >
        <InputGroup size="sm">
          <FormLabel srOnly>Search Scorecards</FormLabel>
          <InputLeftElement pointerEvents="none" color="gray.400">
            <BsSearch />
          </InputLeftElement>
          <Input 
            rounded="base" 
            type="search" 
            placeholder="Search..." 
          />
        </InputGroup>
      </FormControl>
    </Flex>
  )
}