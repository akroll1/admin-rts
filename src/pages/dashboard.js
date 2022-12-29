import React, {useState, useEffect, useInsertionEffect} from 'react'
import { Box, Divider, Flex, Link, Spacer, Stack } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { FaListOl, FaEdit, FaRegBell, FaRegChartBar, FaRegQuestionCircle, FaUser, FaUserFriends } from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { UserInfo } from '../chakra'
import { CreateGroupScorecard } from './create-scorecard'
import { 
  MyAccountForm, 
  BlogPostForm,
  BroadcastForm, 
  CreatePanelForm,
  DiscussionsForm, 
  FightForm, 
  FightersForm, 
  FightResolutionForm,
  GuestJudgeForm, 
  PanelistForm,
  MyPanelsForm,
  PoundForm, 
  SeasonsForm,
  ShowForm 
} from '../components/forms'
import { MyPoundList } from '../components/lists'
import { useParams } from 'react-router-dom'
import { useGlobalStore } from '../stores'
import { IoLogOutOutline } from 'react-icons/io5'
import { signOut } from '../components/partials'

const Dashboard = () => {
  const { type } = useParams();
  const { 
    signOut,
    user, 
  } = useGlobalStore()
  const groups = user?.signInUserSession?.accessToken?.payload['cognito:groups'];

  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [isPanelist, setIsPanelist] = useState(false)

  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "ACCOUNT", label:"Account Settings", type: 'User', icon: SettingsIcon, link: '/dashboard/account' },
  ]);

  useEffect(() => {
    if(user?.username){
      const isSuperAdmin = groups.some( group => group.includes('rts-admins')) ? setIsSuperAdmin(true) : null;
      const isPanelist = groups.some( group => group.includes('panelist')) ? setIsPanelist(true) : null;
    }
  },[user])

  useEffect(() => {
    if(isSuperAdmin && isPanelist){
      setFormLinks([...formLinks, ...panelistOptions, ...isSuperAdminFormOptions]);
      return;
    } else if(isPanelist){
      setFormLinks([...formLinks, ...panelistOptions]);
    } else if(isSuperAdmin){
      setFormLinks([...formLinks, ...isSuperAdminFormOptions]);
    }
  },[isSuperAdmin, isPanelist])

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
    { value: "CREATE_PANEL", label:"Create Panel Form", type: 'Create Panel', icon: FaEdit, link: '/dashboard/create-panel' },
    { value: "DISCUSSIONS", label:"Discussions Form", type: 'Discussions', icon: FaEdit, link: '/dashboard/discussions' },
    { value: "FIGHT-FORM", label:"Fight Form", type: 'Fights', icon: FaEdit, link: '/dashboard/fight-form' },
    { value: "FIGHTERS", label:"Fighters Form", type: 'Fighters', icon: FaEdit, link: '/dashboard/fighters' },
    { value: "FIGHT-RESOLUTION", label:"Fight Resolution Form", type: 'Resolution', icon: FaEdit, link: '/dashboard/fight-resolution' },
    { value: "GUEST-JUDGES", label:"Guest Judges Form", type: 'Guest Judges', icon: FaEdit, link: '/dashboard/guest-judges' },
    { value: "PANELIST", label:"Panelist Form", type: 'User', icon: FaUser, link: '/dashboard/panelist' },
    { value: "POUNDFORM", label:"P4P Form", type: 'P4P Form', icon: FaEdit, link: '/dashboard/pound-form' },
    { value: "SEASON-FORM", label:"Season Form", type: 'Season Form', icon: FaEdit, link: '/dashboard/season' },
    { value: "SHOW-FORM", label:"Show Form", type: 'Show Form', icon: FaEdit, link: '/dashboard/show-form' },
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
      px={6} 
      py={8}
    >
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Link  
              as="button" 
              to="/dashboard/account" 
              p="4"
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
          <Stack>
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
              link="#" 
              label="Help Center" 
              icon={FaRegQuestionCircle} 
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
        { form === 'CREATE-SCORECARD' && <CreateGroupScorecard /> }
        { form === 'DISCUSSIONS' && <DiscussionsForm /> }
        { form === 'FIGHTERS' && <FightersForm /> }
        { form === 'FIGHT-FORM' && <FightForm /> }
        { form === 'FIGHT-RESOLUTION' && <FightResolutionForm /> }
        { form === 'GUEST-JUDGES' && <GuestJudgeForm /> }
        { form === 'PANELS_MEMBER' && <MyPanelsForm /> }
        { form === 'PANELIST' && <PanelistForm /> }
        { form === 'POUND' && <MyPoundList /> }
        { form === 'POUNDFORM' && <PoundForm /> }
        { form === 'SEASON-FORM' && <SeasonsForm /> }
        { form === 'SHOW-FORM' && <ShowForm /> }
      </Box>
    </Flex>
  )
}
export default Dashboard