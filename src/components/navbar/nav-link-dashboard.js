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
      transition="all 0.3s"
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      <HStack spacing={4}>
        <Icon as={icon} boxSize="20px" />
        <Text as="span">{label}</Text>
      </HStack>
    </RRLink>
  )
}