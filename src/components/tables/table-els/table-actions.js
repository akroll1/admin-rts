import React from 'react'
import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, Select, Stack } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri'

export const TableActions = ({ options, create }) => {
  return (
    <Stack spacing="4" direction={{base: 'column', md: 'row'}} justify="space-between">
      <HStack>
        <FormControl minW={{md: '320px'}} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Search By Fighter</FormLabel>
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
          rounded="base" 
          size="sm" 
          placeholder="Status"
          _hover={{cursor: 'pointer'}}
        >
          {
            options && options.length > 0 && options.map( option => <option key={option.value} value={option.value} label={option.label} />)
          }
        </Select>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        {!create &&
          <Button iconSpacing="1" leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}>
            Export CSV
          </Button>
        }
      </ButtonGroup>
    </Stack>
  )
}