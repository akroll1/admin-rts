import {useState, useEffect } from 'react'
import { 
  Box, 
  Divider, 
  Flex, 
  Link, 
  Spacer, 
  Stack 
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { 
  FaEdit, 
  FaRegBell, 
  FaUser, 
  FaUserFriends 
} from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { IoLogOutOutline } from 'react-icons/io5'
import { UserInfo } from '../chakra'
import { 
  MyAccountForm, 
  BlogPostForm,
  BroadcastForm, 
  CreatePanelForm,
  DistanceForm,
  DistanceMetasForm,
  FightersForm, 
  FightResolutionForm,
  PoundListForm,
} from '../components/forms'
import { useParams } from 'react-router-dom'
import { useGlobalStore } from '../stores'

const Dashboard = () => {
  const { type } = useParams();
  const { 
    signOut,
    user, 
  } = useGlobalStore()

  // console.log('user', user)
  
  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    // { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "ACCOUNT", label:"Account", type: 'User', icon: SettingsIcon, link: '/dashboard/account' },
  ]);

  useEffect(() => {
    if(true){
    // if(user.isSuperAdmin && user.isPanelist){
      setFormLinks([...formLinks, ...panelistOptions, ...isSuperAdminFormOptions]);
      return;
    } else if(user.isPanelist){
      setFormLinks([...formLinks, ...panelistOptions]);
    } else if(user.isSuperAdmin){
      setFormLinks([...formLinks, ...isSuperAdminFormOptions]);
    }
  },[user])

  const handleFormSelect = e => {
    setForm(e.currentTarget.id);
    setActive(e.currentTarget.id);
  };

  const panelistOptions = [
    { value: "PANELS_MEMBER", label:"Panel Member", type: 'User', icon: FaUserFriends, link: '/dashboard/panels' },
  ];

  const isSuperAdminFormOptions = [
    { value: "BROADCAST", label:"Broadcast Form", type: 'Broadcast', icon: FaEdit, link: '/dashboard/broadcast' },
    { value: "DISTANCE_FORM", label:"Distance Form", type: 'Distance Form', icon: FaEdit, link: '/dashboard/distance' },
    { value: "DISTANCE_METAS_FORM", label:"Distance Metas Form", type: 'Distance Metas Form', icon: FaEdit, link: '/dashboard/distance-metas' },
    { value: "FIGHTERS", label:"Fighters ", type: 'Fighters', icon: FaEdit, link: '/dashboard/fighters' },
    { value: "P4P_LIST", label:"P4P List Form ", type: 'P4P', icon: FaEdit, link: '/dashboard/pound-list' },
    { value: "RESOLUTIONS", label:"Resolution Form", type: 'Resolution', icon: FaEdit, link: '/dashboard/resolutions' },
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
              to="/dashboard/account" 
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
              onClick={signOut}
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
        { form === 'ACCOUNT' && <MyAccountForm /> }
        { form === 'BLOG' && <BlogPostForm /> }
        { form === 'BROADCAST' && <BroadcastForm /> }
        { form === 'CREATE_PANEL' && <CreatePanelForm /> }
        { form === 'DISTANCE_FORM' && <DistanceForm /> }
        { form === 'DISTANCE_METAS_FORM' && <DistanceMetasForm /> }
        { form === 'FIGHTERS' && <FightersForm /> }
        { form === 'P4P_LIST' && <PoundListForm /> }
        { form === 'RESOLUTIONS' && <FightResolutionForm /> }
      </Box>
    </Flex>
  )
}
export default Dashboard