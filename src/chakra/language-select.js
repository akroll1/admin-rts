import React from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

export const LanguageSelect = (props) => (
  <FormControl id="language">
    <FormLabel>Display Language</FormLabel>
    <Select maxW="2xs" {...props}>
      <option>English</option>
      <option>Spanish</option>
      <option>Chinese</option>
    </Select>
  </FormControl>
)