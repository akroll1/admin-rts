import { useEffect, useState } from 'react'
import { 
  Avatar, 
  Box, 
  Button, 
  Checkbox, 
  FormControl, 
  FormHelperText, 
  FormLabel, 
  Heading, 
  HStack, 
  Input, 
  Stack, 
  StackDivider, 
  Text, 
  Textarea, 
  useColorModeValue as mode, 
  useToast, 
  VStack 
} from '@chakra-ui/react'
import { HiCloudUpload } from 'react-icons/hi'
import { FaGoogle } from 'react-icons/fa'
import { LanguageSelect, FieldGroup } from '../../chakra'
import { useScorecardStore } from '../../stores'

export const MyAccountForm = () => {
  const { 
    dbUser,
    fetchDBUser,
    updateDBUser
  } = useScorecardStore()

  const [userProfile, setUserProfile] = useState(dbUser)

  useEffect(() => {
    fetchDBUser()
  },[])
  
  const handleFormInput = e => {
    const {id, value} = e.currentTarget;
    setUserProfile({...userProfile, [id]: value})
  }

  // const update = {
  //   firstName,
  //   lastName,
  //   bio
  // };
  // updateDBUser(userProfile) 

  const handleCheckbox = () => {
    setUserProfile({...userProfile, isPublic: !isPublic});
  };

  const { email, firstName, lastName, username, bio, isPublic, boxCoins } = userProfile;
  // console.log('userProfile: ', userProfile);
  return (
    <Box px={{ base: '4', md: '10' }} py="16" maxWidth="3xl" mx="auto">
      <form id="settings-form" onSubmit={e => e.preventDefault()}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Account Settings
          </Heading>
          <FieldGroup title="FightCoins">
            <FormControl id="boxCoins">
              <FormLabel>Total</FormLabel>
              <Input w="25%" readOnly type="number" value={boxCoins} />
            </FormControl>
          </FieldGroup>
          <FieldGroup title="Personal Info">
            <VStack width="full" spacing="6">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input readOnly type="email" value={email} />
              </FormControl>

              <FormControl id="username">
                <FormLabel>User Name</FormLabel>
                <Input readOnly type="text" maxLength={255} value={username} />
              </FormControl>

              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input onChange={handleFormInput} type="text" maxLength={255} value={firstName} />
              </FormControl>
              
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input onChange={handleFormInput} type="text" maxLength={255} value={lastName} />
              </FormControl>
  
              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea value={bio} onChange={handleFormInput} rows={5} />
                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Public Profile">
            <Stack width="full" spacing="4">
              <Checkbox defaultChecked isChecked={isPublic} id="isPublic" onChange={handleCheckbox}>Allow your account to be public.</Checkbox>
            </Stack>
          </FieldGroup>
          <FieldGroup title="Language">
            <VStack width="full" spacing="6">
              <LanguageSelect />
            </VStack>
          </FieldGroup>
          <FieldGroup title="Connect accounts">
            <HStack width="full">
              <Button size="md" variant="outline" leftIcon={<Box as={FaGoogle} color="red.400" />}>
                Google
              </Button>
            </HStack>
          </FieldGroup>
          <FieldGroup title="Profile Image">
            <Stack direction="row" spacing="6" align="center" width="full">
              <Avatar
                size="xl"
                name="Dan Abramov"
                src="https://bit.ly/dan-abramov"
              />
              <Box>
                <HStack spacing="5">
                  <Button size="md" leftIcon={<HiCloudUpload />}>Change photo</Button>
                  <Button size="md" variant="outline" colorScheme="solid">
                    Delete
                  </Button>
                </HStack>
                <Text fontSize="sm" mt="3" color={mode('gray.500', 'whiteAlpha.600')}>
                  .jpg, .gif, or .png. Max file size 700K.
                </Text>
              </Box>
            </Stack>
          </FieldGroup>
        </Stack>
        <FieldGroup mt="8">
          <HStack width="full">
            <Button 

              onClick={updateDBUser} 
              type="submit" 
              colorScheme="solid"
            >
              Save Changes
            </Button>
            <Button 
              variant="outline"
            >
              Cancel
            </Button>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  )
}
