import {useState, useEffect } from 'react'
import { 
  Box, 
  Divider, 
  Flex, 
  Link, 
  Spacer, 
  Stack 
} from '@chakra-ui/react'
import { 
  FaEdit, 
  FaRegBell, 
} from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { IoLogOutOutline } from 'react-icons/io5'
import { UserInfo } from '../chakra'
import { 
  DistanceForm,
  DistanceMetasForm,
  FightersForm, 
  FightResolutionForm,
  JabsForm,
} from '../components/forms'
import { useParams } from 'react-router-dom'
import { useGlobalStore } from '../stores'

export const Forms = () => {
  const { type } = useParams();

  const { 
    signOutUser,
    user, 
  } = useGlobalStore()

  // console.log('user', user)
  
  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase())

  const handleFormSelect = e => {
    setForm(e.currentTarget.id);
    setActive(e.currentTarget.id);
  };

  const formLinks = [
    // { value: "BROADCAST", label:"Broadcast Form", type: 'Broadcast', icon: FaEdit, link: '/forms/broadcast' },
    { value: "DISTANCE_FORM", label:"Distance Form", type: 'Distance Form', icon: FaEdit, link: '/forms/distance' },
    { value: "DISTANCE_METAS_FORM", label:"Distance Metas Form", type: 'Distance Metas Form', icon: FaEdit, link: '/forms/distance-metas' },
    { value: "FIGHTERS", label:"Fighters ", type: 'Fighters', icon: FaEdit, link: '/forms/fighters' },
    { value: "JABS", label:"Jabs ", type: 'Jabs', icon: FaEdit, link: '/forms/jabs' },
    { value: "RESOLUTIONS", label:"Resolution Form", type: 'Resolution', icon: FaEdit, lisnk: '/forms/resolutions' },
  ];

  const userFormLinks = () => {
    return formLinks.map((option,i) => {
      const { value, label, icon, link } = option;
      return (
        <NavLinkDashboard   
          key={i}
          link={link} 
          id={value} 
          onClick={handleFormSelect} 
          label={label} 
          icon={icon} 
          active={active === value ? true : false} 
        />)
    })
  }
  
  return (
    <Flex 
      height="auto" 
      width={{ base: 'full'}} 
      direction="row" 
      color="white" 
      flexWrap="wrap" 
      p={["3","6","8","10"]}
    >
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Link  
              as="button" 
              to="/forms/distances" 
              p="2"
              pl="0"
              w="100%" 
              transition="background 0.1s" 
              rounded="xl" 
              _hover={{ bg: 'whiteAlpha.200' }} 
              whiteSpace="nowrap"
              textAlign="left"
            >
              <UserInfo 
                setForm={setForm} 
                setActive={setActive} 
                name={user?.username} 
                email={user?.email} 
              />
            </Link>
          </Box>
        </Stack>
        <Divider borderColor="whiteAlpha.400" />
        <Stack spacing={6} mt={6}>
          <Stack
            maxH="30vh"
            overflowY="scroll"
          >
            {userFormLinks()}
          </Stack>
          <Divider borderColor="whiteAlpha.400" />
          <Stack>
            <NavLinkDashboard   
              link="#" 
              label="Notifications" 
              icon={FaRegBell} 
            />
            <NavLinkDashboard 
              onClick={signOutUser}
              link="#" 
              label="Logout" 
              icon={IoLogOutOutline} 
            />
          </Stack>
        <Spacer />
        </Stack>
      </Box>
      <Box 
        overflow='scroll' 
        flex="1 0 75%" 
        spacing={8} 
        mb={8} 
        bg="blackAlpha.500" 
        borderRadius="md" 
        mt={0}
      >
        {/* { form === 'BROADCAST' && <BroadcastForm /> } */}
        { form === 'DISTANCE_FORM' && <DistanceForm /> }
        { form === 'DISTANCE_METAS_FORM' && <DistanceMetasForm /> }
        { form === 'FIGHTERS' && <FightersForm /> }
        { form === 'JABS' && <JabsForm /> }
        { form === 'RESOLUTIONS' && <FightResolutionForm /> }
      </Box>
    </Flex>
  )
}