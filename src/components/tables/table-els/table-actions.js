import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { useGlobalStore } from '../../../stores';

export const TableActions = () => {
  const { 
    seasonsOptions,
  } = useGlobalStore()

  return (
    <Flex 
      direction={{base: 'column', md: 'row'}} 
      justify="space-between"
    >
      <FormControl
        id="search"
        maxW={["80%", "35%"]}
        display={["none", "flex"]}
      >
        <InputGroup 
          size="sm"
        >
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