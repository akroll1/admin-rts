import { HStack, Icon, Link, Text } from '@chakra-ui/react'
import { Link as RRLink } from 'react-router-dom'

export const NavLinkDashboard = props => {

  const { icon, active, label, value, link, ...rest } = props

  return (
    <RRLink
      to={link}
      display="block"
      py={2}
      px={3}
      // borderRadius="md"
      transition="all 0.2s"
      aria-current={active ? 'page' : undefined}
      {...rest}
      >
      <HStack 
        spacing={4}
        color="#cacaca"
        _hover={{
          color: '#fff',
          fontWeight: 'semibold'
        }}
        >
        <Icon 
          as={icon} 
          fontSize="lg"
        />
        <Text 
          _hover={{
            color: '#eaeaea',
            fontWeight: "semibold"
          }}
          color={active ? '#fafafa' : '#cacaca'}
          fontWeight={active ? 'semibold' : 'normal'}
          as="span"
          fontSize="lg"
        >
          {label}
        </Text>
      </HStack>
    </RRLink>
  )
}