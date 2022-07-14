import React, {useState, useEffect, useInsertionEffect} from 'react'
import { Box, Divider, Flex, Spacer, Stack } from '@chakra-ui/react'
import { FaListOl, FaEdit, FaRegBell, FaRegChartBar, FaRegQuestionCircle, FaUser } from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { UserInfo } from '../chakra'
import { MyScorecards } from './my-scorecards'
import { CreateGroupScorecard } from './create-scorecard'
import { MyAccountForm, BroadcastForm, DiscussionsForm, FightForm, FightersForm, GuestJudgeForm, PoundForm, ShowForm } from '../components/forms'
import { MyPoundList } from '../components/lists'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { capFirstLetters } from '../utils'
import { stateStore } from '../stores'

const Dashboard = props => {
  const { type, showId } = useParams();
  const { user, setUser, setUserScorecards, tokenConfig } = stateStore( state => state);
  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    { value: "SCORECARDS", label:"Scorecards", type: 'Scorecard', icon: FaEdit, link: '/dashboard/scorecards' },
    { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "ACCOUNT", label:"Account Settings", type: 'User', icon: FaUser, link: '/dashboard/account' },
    // { value: "CREATE-SCORECARD", label:"Create Scorecard", type: 'Create-Scorecard', icon: FaRegBell, link: '/dashboard/create-scorecard' },
    // { value: "UPCOMING-FIGHTS", label:"My Fight Schedule", type: 'Fight-Schedule', icon: FaRegChartBar, link: '/dashboard/schedule' },
  ]);
  const [scorecards, setScorecards] = useState(null);

  useEffect(() => {
    const setAuth = () => {
      const isSuperAdmin = user.groups[0] === 'rts-admins';
      if(isSuperAdmin){
        setUser({ ...user, isSuperAdmin })
        setFormLinks([...formLinks, ...isSuperAdminFormOptions]);
      } 
    }
    setAuth()
  },[])
  // getScorecards && check if user exists.
  useEffect(() => {
    if(tokenConfig?.headers){
      const getUserScorecards = async () => {
        const url = process.env.REACT_APP_SCORECARDS + (`/${user.sub}-${user.email}`);
        return axios.get(url, tokenConfig)
          .then(res => {
            if(res.data?.length > 0 ) setUserScorecards(res.data)
            // console.log('res: ',res);
            const data = res.data?.map(obj => {
              const { fighterData, scorecard } = obj;
              const { groupScorecardId, ownerId, rounds, scorecardId, scores } = scorecard;
              if(ownerId.includes('@')){
                const patchUrl = process.env.REACT_APP_SCORECARDS + `/${scorecardId}`;
                const setOwnerId = axios.patch(patchUrl, { ownerId: user.sub, username: user.username }, tokenConfig)
                  .then( res => console.log('PATCH: ', res)).catch( err => console.log(err));
              }
              const [fighter1, fighter2] = fighterData.map( ({ lastName }) => lastName);
              const setPrediction = prediction => {
                  if(prediction){
                      const [prediction] = fighterData.filter( fighter => fighter.fighterId === scorecard.prediction.slice(0,36));
                      return `${capFirstLetters(prediction.lastName)} ${scorecard.prediction.slice(37)}`;
                  }
                      return 'Prediction Not Set'
              }
              const prediction = setPrediction(scorecard.prediction);
              const label = `${capFirstLetters(fighter1)} vs ${capFirstLetters(fighter2)}`;
              const isComplete = scores.length >= rounds;
              return ({
                  prediction,
                  label,
                  groupScorecardId,
                  isComplete
              })
            });
            // put scorecard info in for scorecards switcher.
            if(res.data.length > 0){
              setScorecards(data)
              setUserScorecards(data)
            }
          }).catch(err => console.log(err))
        }
        getUserScorecards();


        // put user data into DB.
        const updateUser = async () => {
          const url = process.env.REACT_APP_USERS + `/${user.sub}`;
          return await axios.put(url, { username: user.username, email: user.email } , tokenConfig)
            .then( res => setUser({ ...user, ...res.data })).catch( err => console.log(err));
        }
        updateUser();
    }
  },[tokenConfig])

  const handleFormSelect = e => {
    setForm(e.currentTarget.id);
    setActive(e.currentTarget.id);
  };

  const isSuperAdminFormOptions = [
    { value: "BROADCAST", label:"Broadcast Form", type: 'Broadcast', icon: FaEdit, link: '/dashboard/broadcast' },
    { value: "DISCUSSIONS", label:"Discussions Form", type: 'Discussions', icon: FaEdit, link: '/dashboard/discussions' },
    { value: "FIGHT-FORM", label:"Fight Form", type: 'Fights', icon: FaEdit, link: '/dashboard/fight-form' },
    { value: "FIGHTERS", label:"Fighters Form", type: 'Fighters', icon: FaEdit, link: '/dashboard/fighters' },
    { value: "GUEST-JUDGES", label:"Guest Judges Form", type: 'Guest Judges', icon: FaEdit, link: '/dashboard/guest-judges' },
    { value: "POUNDFORM", label:"P4P Form", type: 'P4P Form', icon: FaEdit, link: '/dashboard/pound-form' },
    { value: "SHOW-FORM", label:"Show Form", type: 'Show Form', icon: FaEdit, link: '/dashboard/show-form' },
  ];

  const userFormLinks = () => {
    return formLinks.map((option,i) => {
      const { value, label, icon, link } = option;
      return (
        <NavLinkDashboard   
          subtle={true} 
          link={link} 
          id={value} 
          key={value} 
          onClick={handleFormSelect} 
          label={label} 
          icon={icon} 
          isActive={active === value ? true : false} 
        />)
    })
  }
  return (
    <Flex height="auto" width={{ base: 'full'}} direction="row" color="white" flexWrap="wrap" px={6} py={8}>
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Box as="a" href="#" p="3" display="block" transition="background 0.1s" rounded="xl" _hover={{ bg: 'whiteAlpha.200' }} whiteSpace="nowrap">
              <UserInfo setForm={setForm} setActive={setActive} name={user?.username ? user.username : ''} email={user?.email ? user.email : ''} />
            </Box>
          </Box>
        </Stack>
        <Divider borderColor="whiteAlpha.400" />
        <Stack spacing={6} mt={6}>
          <Stack>
            {userFormLinks()}
          </Stack>
          <Divider borderColor="whiteAlpha.400" />
          <Stack>
            <NavLinkDashboard link="#" label="Notifications" icon={FaRegBell} />
            <NavLinkDashboard link="#" label="Help Center" icon={FaRegQuestionCircle} />
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
        { form === 'SCORECARDS' && <MyScorecards scorecards={scorecards} handleFormSelect={handleFormSelect} /> }
        { form === 'POUND' && <MyPoundList tokenConfig={tokenConfig} user={user} /> }
        { form === 'ACCOUNT' && <MyAccountForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'CREATE-SCORECARD' && <CreateGroupScorecard showId={showId ? showId : ''} tokenConfig={tokenConfig} /> }
        { form === 'POUNDFORM' && <PoundForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'SHOW-FORM' && <ShowForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'FIGHTERS' && <FightersForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'DISCUSSIONS' && <DiscussionsForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'GUEST-JUDGES' && <GuestJudgeForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'BROADCAST' && <BroadcastForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'FIGHT-FORM' && <FightForm tokenConfig={tokenConfig} user={user} /> }
      </Box>
    </Flex>
  )
}
export default Dashboard