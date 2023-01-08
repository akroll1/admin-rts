import * as React from 'react'
import { Link, useColorModeValue as mode } from '@chakra-ui/react'
import { NavLink as RLink } from 'react-router-dom'

export const DesktopNavLink = React.forwardRef((props, ref) => {
  const { active, href, ...rest } = props;

  return (
    <Link
      as={RLink}
      to={href}
      ref={ref}
      display="inline-block"
      px="4"
      py="6"
      isExternal={false}
      fontWeight="semibold"
      aria-current={active ? 'page' : undefined}
      color={mode('#fafafa', '#dadada')}
      transition="all 0.2s"
      {...rest}
      _hover={{
        color: 'white', 
      }}
      _active={{
        color: 'white',
        boxShadow: 'none !important'
      }}
      _activeLink={{
        boxShadow: 'none !important',
        color: 'white',
        fontWeight: 'bold',
      }}
      {...rest}
    />
    )
  })
  DesktopNavLink.displayName = 'DesktopNavLink'
  
export const MobileNavLink = props => {

  const { active, closeMain, href, link, onToggle, ...rest } = props
  const close = () => {
    onToggle()
    closeMain()
  }

  return (
    <Link
      as={RLink}
      to={href}
      aria-current={active ? 'page' : undefined}
      w="full"
      display="flex"
      alignItems="center"
      height="14"
      fontWeight="semibold"
      borderBottomWidth="1px"
      onClick={onToggle}
      {...rest}
    />
  )
}