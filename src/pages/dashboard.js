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
import { UserInfo } from '../chakra'
import { 
  MyAccountForm, 
  BlogPostForm,
  BroadcastForm, 
  CreatePanelForm,
  DistanceForm,
  DistancesAdminForm,
  FightForm, 
  FightersForm, 
  FightPropsForm,
  FightResolutionForm,
  PanelistForm,
  MyPanelsForm,
  PoundForm, 
  SeasonForm,
  ShowForm,
  SummaryForm
} from '../components/forms'
import { useParams } from 'react-router-dom'
import { useGlobalStore } from '../stores'
import { IoLogOutOutline } from 'react-icons/io5'

const Dashboard = () => {
  const { type } = useParams();
  const { 
    signOut,
    user, 
  } = useGlobalStore()

  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    // { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "ACCOUNT", label:"Account", type: 'User', icon: SettingsIcon, link: '/dashboard/account' },
  ]);

  useEffect(() => {
    if(user.isSuperAdmin && user.isPanelist){
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
    { value: "BLOG", label:"Blog Form", type: 'Blog Form', icon: FaEdit, link: '/dashboard/blog-form' },
    { value: "DISTANCE_FORM", label:"DISTANCE Form", type: 'Distance Form', icon: FaEdit, link: '/dashboard/distance' },
    { value: "DISTANCES_ADMIN_FORM", label:"Distances ADMIN Form", type: 'Distances Admin Form', icon: FaEdit, link: '/dashboard/distances-admin' },
    { value: "CREATE_PANEL", label:"Create Panel Form", type: 'Create Panel', icon: FaEdit, link: '/dashboard/create-panel' },
    { value: "FIGHT-FORM", label:"Fight Form", type: 'Fights', icon: FaEdit, link: '/dashboard/fight-form' },
    { value: "FIGHTERS", label:"Fighters Form", type: 'Fighters', icon: FaEdit, link: '/dashboard/fighters' },
    { value: "FIGHT-PROPS-FORM", label:"Fight Props", type: 'Fight Props', icon: FaEdit, link: '/dashboard/fight-props' },
    { value: "FIGHT-RESOLUTION", label:"Fight Resolution Form", type: 'Resolution', icon: FaEdit, link: '/dashboard/fight-resolution' },
    { value: "PANELIST", label:"Panelist Form", type: 'User', icon: FaUser, link: '/dashboard/panelist' },
    { value: "SHOW-FORM", label:"Show Form", type: 'Show Form', icon: FaEdit, link: '/dashboard/show-form' },
    { value: "SEASON-FORM", label:"Season Form", type: 'Season Form', icon: FaEdit, link: '/dashboard/season-form' },
    { value: "SUMMARY-FORM", label:"Summary Form", type: 'Summary Form', icon: FaEdit, link: '/dashboard/summary-form' },
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
                name={user?.username ? user.username : ''} 
                email={user?.email ? user.email : ''} 
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
        { form === 'DISTANCES_ADMIN_FORM' && <DistancesAdminForm /> }
        { form === 'FIGHTERS' && <FightersForm /> }
        { form === 'FIGHT-FORM' && <FightForm /> }
        { form === 'FIGHT-PROPS-FORM' && <FightPropsForm /> }
        { form === 'FIGHT-RESOLUTION' && <FightResolutionForm /> }
        { form === 'PANELS_MEMBER' && <MyPanelsForm /> }
        { form === 'PANELIST' && <PanelistForm /> }
        { form === 'POUNDFORM' && <PoundForm /> }
        { form === 'SHOW-FORM' && <ShowForm /> }
        { form === 'SEASON-FORM' && <SeasonForm /> }
        { form === 'SUMMARY-FORM' && <SummaryForm /> }
      </Box>
    </Flex>
  )
}
export default Dashboard