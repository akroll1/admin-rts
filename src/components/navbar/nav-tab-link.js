import { Link, Tab, useColorModeValue as mode } from '@chakra-ui/react'
import { Link as RRLink } from 'react-router-dom'

export const NavTabLink = props => {
  console.log('props: ', props)
  return (
    <Tab
      _selected={{ color: mode('blue.600', 'blue.200') }}
      _focus={{ shadow: 'none' }}
      justifyContent="flex-start"
      px={{ base: 4, md: 6 }}
    >
      <Link
        as={RRLink}
        display="block"
        fontWeight="medium"
        lineHeight="1.25rem"
        color="inherit"
        _hover={{ color: mode('blue.600', 'blue.200') }}
        _activeLink={{
          // color: mode('blue.600', 'blue.200'),
          color: mode('white', 'white'),
        }}
        {...props}
      />
    </Tab>
  )
}