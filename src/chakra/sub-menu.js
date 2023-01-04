import { useNavMenu } from './use-nav-menu'
import { Box, Collapse, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import { NavLink, NavMenu } from '../components/navbar'
import { SubmenuItem as DesktopMenuItem } from './sub-menu-item'

const DesktopSubmenu = ({ link }) => {
  const { isOpen, getMenuProps, getTriggerProps } = useNavMenu()

  return (
    <>
      <NavLink.Desktop
        display="flex"
        alignItems="center"
        as="button"
        type="button"
        px="4"
        fontWeight="semibold"
        {...getTriggerProps()}
      >
        <Box
          _hover={{ 
            color: 'white',
         }}
        >
          {link.label}
        </Box>
        <Box marginStart="2" as={FaChevronDown} fontSize="xs" />
      </NavLink.Desktop>

      <NavMenu 
        animate={isOpen ? 'open' : 'closed'}
        {...getMenuProps()} 
      >
        <Box 
          maxW="7xl" 
          mx="auto" 
          px="8"
        >
          <SimpleGrid spacing="10" columns={2}>
            {link.children?.map( (item, _i) => (
              <DesktopMenuItem 
                key={_i} 
                title={item.label} 
                href={item.href} 
                icon={item.icon}
              >
                {item.description}
              </DesktopMenuItem>
            ))}
          </SimpleGrid>
        </Box>
      </NavMenu>
    </>
  )
}

const MobileSubMenu = ({ closeMain, link }) => {
  
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <NavLink.Mobile
        as="button"
        textAlign="start"
        type="button"
        cursor="pointer"
        onClick={onToggle}
        paddingEnd="4"
        _active={{ border: '1px solid red'}}
        _hover={{ background: 'inherit' }}
      >
        <Box flex="1">{link.label}</Box>
        <Box as={FaChevronDown} transform={`rotate(${isOpen ? '180deg' : '0deg'})`} />
      </NavLink.Mobile>
      <Collapse in={isOpen}>
        <Box pl="5">
          {link.children?.map( (item, _i) => (
            <NavLink.Mobile   
              key={_i} 
              href={item.href}
              onToggle={onToggle}
              isOpen={isOpen}
              closeMain={closeMain}
            >
              {item.label} 
            </NavLink.Mobile>
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export const Submenu = {
  Mobile: MobileSubMenu,
  Desktop: DesktopSubmenu,
}