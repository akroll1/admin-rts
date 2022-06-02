import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, HStack,useDisclosure } from '@chakra-ui/react'
import { NavLink } from './nav-link'
import { NavMenu } from './nav-menu'
import { ToggleButton, Submenu, Logo } from '../../chakra'
import { links } from './navbar_data'
import { Link as RRLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const MobileNavContext = props => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { isLoggedIn, setIsLoggedIn } = props;
  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    navigate('/');
  }
  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Box as="a" rel="home" mx="auto">
          <Logo h="24px" iconcolor="blue.400" />
        </Box>
        {/* <Box
          visibility={{
            base: 'hidden',
            sm: 'visible',
          }}
        >
          <Button as="a" colorScheme="blue">
            { isLoggedIn ? 'Sign Out' : 'Sign In' }
          </Button>
        </Box> */}
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
        {isLoggedIn &&
          <Button colorScheme={isLoggedIn ? "blue" : "blue"} w="full" size="lg" mt="5" onClick={() => signOut()}>
            Sign Out
          </Button>
        }
        {!isLoggedIn &&
          <Button as="a" colorScheme="blue" w="full" size="sm" mt="5" href="/signin">
            Sign In
          </Button>
        }
      </NavMenu>
    </>
  )
}

const DesktopNavContent = props => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = props;
  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    navigate('/');
  }    
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Box as="a" href="#" rel="home">
        <RRLink to="/">FightSync</RRLink>
      </Box>
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
        {/* <Box as="a" href="/signin" color={mode('blue.600', 'blue.300')} fontWeight="bold"> */}
        {isLoggedIn &&
          <Button colorScheme="blue" w="full" size="sm" m="auto" onClick={() => signOut()}>
            Sign Out
          </Button>
        }
        {!isLoggedIn &&
          <Button as="a" colorScheme="blue" w="full" size="sm" m="auto" href="/signin">
            Sign In
          </Button>
        }
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}