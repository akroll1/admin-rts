import React, {useEffect, useState} from 'react'
import { Avatar, Box, Button, Checkbox, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, VStack } from '@chakra-ui/react'
import { HiCloudUpload } from 'react-icons/hi'
import { FaGoogle } from 'react-icons/fa'
import { LanguageSelect,FieldGroup } from '../../chakra'
import axios from 'axios'

export const AccountSettingsForm = ({ user, idTokenConfig }) => {
  const [userProfile, setUserProfile] = useState({})

  useEffect(() => {
    if(user && user.sub){
      const url = process.env.REACT_APP_USERS + `/${user.sub}`;
      const fetchUser = async () => {
        return await axios.get(url, idTokenConfig)
          .then(res => {
            const { email, displayName, sub } = res.data;
            const obj = {
              ...userProfile,
              ...res.data
            }
            console.log('obj: ',obj)
            setUserProfile(obj);
          })
          .catch(err => console.log(err));
        }
        fetchUser();
    }
  },[user]);

  const handleFormInput = e => {
    const {id, value} = e.currentTarget;
    setUserProfile({...userProfile, [id]: value.trim()})
  }
  const updateUser = () => {
    const url = process.env.REACT_APP_USERS + `/${user.sub}`;
    axios.put(url, userProfile, idTokenConfig)
      .then(res => console.log('updated user'))
      .catch(err => console.log(err));
  }
  const handleCheckbox = () => {
    setUserProfile({...userProfile, isPublic: !isPublic});
  };
  const { email, firstName, lastName, displayName, bio, isPublic, boxCoins } = userProfile;

  return (
    <Box px={{ base: '4', md: '10' }} py="16" maxWidth="3xl" mx="auto">
      <form id="settings-form" onSubmit={(e) => {e.preventDefault()}}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Account Settings
          </Heading>
          <FieldGroup title="Personal Info">
            <VStack width="full" spacing="6">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input readOnly type="email" value={email} onChange={handleFormInput} />
              </FormControl>

              <FormControl id="displayName">
                <FormLabel>Display Name</FormLabel>
                <Input onChange={handleFormInput} type="text" maxLength={255} value={displayName} />
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
          <FieldGroup title="Profile Image">
            <Stack direction="row" spacing="6" align="center" width="full">
              <Avatar
                size="xl"
                name="Alyssa Mall"
                src="https://bit.ly/dan-abramov"
              />
              <Box>
                <HStack spacing="5">
                  <Button leftIcon={<HiCloudUpload />}>Change photo</Button>
                  <Button variant="ghost" colorScheme="red">
                    Delete
                  </Button>
                </HStack>
                <Text fontSize="sm" mt="3" color={useColorModeValue('gray.500', 'whiteAlpha.600')}>
                  .jpg, .gif, or .png. Max file size 700K.
                </Text>
              </Box>
            </Stack>
          </FieldGroup>
          <FieldGroup title="Language">
            <VStack width="full" spacing="6">
              <LanguageSelect />
            </VStack>
          </FieldGroup>
          <FieldGroup title="Public Profile">
            <Stack width="full" spacing="4">
              <Checkbox defaultChecked isChecked={isPublic} id="isPublic" onChange={() => handleCheckbox()}>Allow your account to be public.</Checkbox>
            </Stack>
          </FieldGroup>
          <FieldGroup title="Connect accounts">
            <HStack width="full">
              <Button variant="outline" leftIcon={<Box as={FaGoogle} color="red.400" />}>
                Google
              </Button>
            </HStack>
          </FieldGroup>
          <FieldGroup title="BoxCoins">
            <FormControl id="boxCoin">
              <FormLabel>Total</FormLabel>
              <Input w="33%" readOnly type="number" value={boxCoins} />
            </FormControl>
          </FieldGroup>
        </Stack>
        <FieldGroup mt="8">
          <HStack width="full">
            <Button onClick={updateUser} type="submit" colorScheme="blue">
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  )
}
