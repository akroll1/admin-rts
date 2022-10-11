import React from 'react'
import { HStack, Icon, Link, LinkProps, Text } from '@chakra-ui/react'
import { Link as RRLink } from 'react-router-dom'

export const NavLinkDashboard = props => {
  // console.log('props: ',props);
  const { icon, active, label, value, link, ...rest } = props
  return (
    <Link
      as={RRLink}
      to={link}
      display="block"
      py={2}
      px={3}
      borderRadius="md"
      transition="all 0.3s"
      fontWeight="medium"
      lineHeight="1.5rem"
      aria-current={active ? 'page' : undefined}
      color="whiteAlpha.900"
      _hover={{
        bg: 'blue.500',
        color: 'white',
      }}
      _activeLink={{
        bg: 'blue.700',
        color: 'white',
      }}
      {...rest}
    >
      <HStack spacing={4}>
        <Icon as={icon} boxSize="20px" />
        <Text as="span">{label}</Text>
      </HStack>
    </Link>
  )
}