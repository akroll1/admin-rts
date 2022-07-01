import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import { DiscussionsFormTable } from '../tables';

export const DiscussionsForm = ({ user, tokenConfig }) => {
    const toast = useToast();
    const discussionsUrl = process.env.REACT_APP_DISCUSSIONS;
    const [discussions, setDiscussions] = useState([]);
    const [discussion, setDiscussion] = useState({
        discussionId: uuidv4(),
        discussionTitle: '',
        discussionSubtitle: '',
        discussionBody: '',
        discussionSummary: '',
        discussionPics: [],
        discussionOwnerId: user.sub
    });

    useEffect(() => {
        axios.get(discussionsUrl,tokenConfig)
            .then(res => setDiscussions(res.data))
            .catch(err => console.log(err))
    },[])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        if(id === 'discussionBody'){
            return setDiscussion({...discussion, [id]: value });
        }
        return setDiscussion({...discussion, [id]: value });
    }
    const submitDiscussion = () => {
        const discussionsPutUrl = discussionsUrl + `/${discussion.discussionId}`;
        return axios.put(discussionsPutUrl, discussion, tokenConfig)
            .then(res => {
                if(res.status === 200){
                    toast({ title: 'Discussion PUT good.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,})
                }})
            .catch(err => console.log(err))
    }
    const deleteDiscussion = e => {
        const { id } = e.currentTarget;
        const newDiscussionsList = discussions.filter( discussion => discussion.discussionId !== id);
        setDiscussions(newDiscussionsList);
    }
    const selectDiscussion = e => {
        const { id } = e.currentTarget;
        const selected = discussions.filter( discussion => discussion.discussionId ===  id);
        setDiscussion({...selected[0]});
    };
    // useEffect(() => {
    //     console.log('discussion: ',discussion);
    //     console.log('discussions: ',discussions);
    // },[discussion, discussions])
    const { discussionTitle, discussionSubtitle, discussionSummary, discussionBody } = discussion
    return (
        <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
            <Flex maxH="15rem" overflowY="scroll">
                <DiscussionsFormTable discussions={discussions} deleteDiscussion={deleteDiscussion} selectDiscussion={selectDiscussion} />
            </Flex>
            <form id="discussions-form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Discussions Form
                    </Heading>
                    <FieldGroup title="Discussion Info">
                        <VStack width="full" spacing="6">
                            <FormControl id="discussionTitle">
                                <FormLabel>Discussion Title</FormLabel>
                                <Input required value={discussionTitle} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="discussionSubtitle">
                                <FormLabel>Sub-title</FormLabel>
                                <Input value={discussionSubtitle} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="discussionSummary">
                                <FormLabel>Summary/Synopsis</FormLabel>
                                <Input value={discussionSummary} onChange={e => handleFormChange(e)} type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="discussionBody">
                                <FormLabel>Discussion</FormLabel>
                                <Textarea
                                    required
                                    placeholder="Discussion here..."
                                    value={discussionBody}
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
                    <Button onClick={submitDiscussion} type="submit" colorScheme="blue">
                        Post Discussion
                    </Button>
                    <Button variant="outline">Cancel</Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}