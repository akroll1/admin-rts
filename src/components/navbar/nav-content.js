import { Box, Button, Flex, HStack, useDisclosure } from '@chakra-ui/react'
import { NavLink } from './nav-link'
import { NavMenu } from './nav-menu'
import { ToggleButton, Submenu } from '../../chakra'
import { links } from './navbar_data'
import { ProfileButton } from './profile-button'
import { useNavigate } from 'react-router'

const MobileNavContext = props => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex 
        align="center" 
        justify="space-between" 
        className="nav-content__mobile" 
        {...props}
      >
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map((link, i) => 
          link.children ? (
            <Submenu.Mobile key={i} link={link} />
          ) : (
            <NavLink.Mobile key={i} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          ),
        )}
          <ProfileButton />
      </NavMenu>
    </>
  )
}

const DesktopNavContent = props => {
  const navigate = useNavigate();

  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Button
        colorScheme="solid"
        _hover={{ 
          background: 'transparent',
          color: 'white'  
        }} 
        _focus={{ 
          boxShadow: 'none !important',
          color: 'white'
        }}
        color="#c8c8c8" 
        onClick={() => navigate('/')} 
        background="transparent"
        to="/"
      >
        FightSync
      </Button>
      <HStack as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="200px" justify="space-between">
        <ProfileButton />
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}