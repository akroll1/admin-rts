import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { useScorecardStore } from '../../../stores';

export const TableActions = () => {
  const { 
    seasonsOptions,
  } = useScorecardStore()

  return (
    <Flex 
      direction={{base: 'column', md: 'row'}} 
      justify="space-between"
    >
      <FormControl
        id="search"
        m={["2"]}
        maxW={["80%", "35%"]}
        display={["none", "flex"]}
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
      <Select  
        m={["2"]}
        maxW={["80%", "35%"]}
        rounded="base" 
        size="sm" 
        placeholder="Season"
        _hover={ {cursor: 'pointer' }}
        _focus={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
        _active={{ boxShadow: '0 0 0 1px #aaaaaaa', border: '1px solid #aaaaaaa' }}
      >
        {
          seasonsOptions?.length && seasonsOptions.map( option => <option key={option.value} value={option.value} label={option.label} />)
        }
      </Select>
    </Flex>
  )
}