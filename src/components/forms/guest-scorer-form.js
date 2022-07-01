import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'

export const GuestScorerForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const guestScorerUrl = process.env.REACT_APP_GUEST_SCORERS;
    const [guestScorer, setGuestScorer] = useState({
        bio: '',
        displayName: '',
        firstName: '',
        guestScorerId: uuidv4(),
        img: '',
        lastName: '',
        link: '',
    });

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setGuestScorer({...guestScorer, [id]: value });
    }
    const submitGuestScorer = () => {
        const guestScorerPutUrl = guestScorerUrl + `/${guestScorer.guestScorerId}`;
        return axios.put(guestScorerPutUrl, guestScorer, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    toast({ title: 'Guest Scorer PUT good.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,})
                }})
            .catch(err => console.log(err))
    }
    // const deleteDiscussion = e => {
    //     const { id } = e.currentTarget;
    //     const newDiscussionsList = discussions.filter( discussion => discussion.discussionId !== id);
    //     setDiscussions(newDiscussionsList);
    // }
    // const selectDiscussion = e => {
    //     const { id } = e.currentTarget;
    //     const selected = discussions.filter( discussion => discussion.discussionId ===  id);
    //     setDiscussion({...selected[0]});
    // };
    // useEffect(() => {
    //     console.log('discussion: ',discussion);
    //     console.log('discussions: ',discussions);
    // },[discussion, discussions])
    const { bio, displayName, firstName, lastName, img, link, tagline } = guestScorer;
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <form id="discussions-form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Guest Scorer Form
                    </Heading>
                    <FieldGroup title="Guest Scorers">
                        <VStack width="full" spacing="6">
                            <FormControl isRequired id="firstName">
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input required value={firstName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl isRequired id="lastName">
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <Input required value={lastName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl isRequired id="displayName">
                                <FormLabel htmlFor="displayName">Display Name</FormLabel>
                                <Input required value={displayName} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl id="img">
                                <FormLabel htmlFor="img">Image Url</FormLabel>
                                <Input value={img} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            <FormControl id="link">
                                <FormLabel htmlFor="link">Link Url</FormLabel>
                                <Input value={link} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="tagline">
                                <FormLabel>Tagline</FormLabel>
                                <Input value={tagline} onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>Bio</FormLabel>
                                <Textarea
                                    required
                                    placeholder="Biography..."
                                    value={bio}
                                    onChange={e => handleFormChange(e)}
                                    type="text"
                                    size='md'
                                    rows="6"
                                />
                            </FormControl>
                        </VStack>
                    </FieldGroup>
                </Stack>
                <FieldGroup mt="8">
                    <HStack width="full">
                    <Button onClick={submitGuestScorer} type="submit" colorScheme="blue">
                        Submit Guest Scorer
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}