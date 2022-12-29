import { useState, useEffect } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { DiscussionsFormTable } from '../tables';
import { useGlobalStore } from '../../stores';

export const DiscussionsForm = () => {
    const {
        createDiscussion,
        deleteDiscussion,
        discussion,
        discussions,
        fetchAllDiscussions,
        fetchDiscussion,
        updateDiscussion,
        user,
    } = useGlobalStore()
    const { sub } = user
    const toast = useToast();
    const [discussionId, setDiscussionId] = useState(null)
    const [allDiscussions, setAllDiscussions] = useState([]);
    const [form, setForm] = useState({
        body: '',
        discussionId: '',
        ownerId: sub,
        pics: [],
        subtitle: '',
        summary: '',
        title: '',
    });

    useEffect(() => {
        fetchAllDiscussions()
    },[])

    useEffect(() => {
        if(discussions.length > 0){
            setAllDiscussions(discussions)
        }
    },[discussions])
    useEffect(() => {
        if(discussion.ownerId){
            setForm(discussion)
        }
    },[discussion])

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        if(id === 'body'){
            return setForm({ ...form, [id]: value })
        }
        return setForm({ ...form, [id]: value })
    }

    const handleFetchDiscussion = () => {
        fetchDiscussion(discussionId)
    }

    const handleDelete = e => { 
        // hold on, this is fast...
        // deleteDiscussion(discussionId);
    }

    const handleCreateDiscussion = e => {
        console.log('form- create: ', form)
        createDiscussion(form)
    }

    const handleUpdateDiscussion = e => {
        console.log('form - UPDATE: ', form)
        updateDiscussion(form)
    }

    const selectDiscussion = e => {
        const { id } = e.currentTarget;
        const selected = discussions.filter( discussion => discussion.discussionId ===  id);
        setForm({...selected[0]});
    };
    
    const { title, subtitle, summary, body } = form
    // console.log('form: ', form)
    return (
        <Box 
            px={{base: '4', md: '10'}} 
            py="16" 
            maxWidth="3xl" 
            mx="auto"
        >   
            <form id="discussions_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Discussions Form
                    </Heading>
                    <FieldGroup title="Search for a Discussion">
                        <VStack width="full" spacing="6">
                            <FormControl id="discussionId">
                                <FormLabel htmlFor="discussionId">Search by ID</FormLabel>
                                <Input 
                                    value={discussionId} 
                                    onChange={ ({ currentTarget: {value} }) => setDiscussionId(value.length == 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!discussionId}  
                                    minW="33%" 
                                    // isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={handleFetchDiscussion} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Discussion Info">
                        <VStack width="full" spacing="6">
                            <FormControl id="title">
                                <FormLabel>Title</FormLabel>
                                <Input required value={title} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="subtitle">
                                <FormLabel>Subtitle</FormLabel>
                                <Input value={subtitle} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>
                            
                            <FormControl id="summary">
                                <FormLabel>Summary</FormLabel>
                                <Input value={summary} onChange={handleFormChange} type="text" maxLength={255} />
                            </FormControl>
                            <FormControl id="body">
                                <FormLabel>Discussion</FormLabel>
                                <Textarea
                                    required
                                    placeholder="Discussion..."
                                    val={body}
                                    onChange={handleFormChange}
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
                    <Button 
                        onClick={discussionId ? handleUpdateDiscussion : handleCreateDiscussion} 
                        type="submit" 
                        colorScheme="solid"
                    >
                        { discussionId ? `Update Discussion` : `Create Discussion` }
                    </Button>
                    <Button 
                        onClick={handleDelete}
                        variant="outline"
                    >
                        Delete
                    </Button>
                    </HStack>
                </FieldGroup>
            </form>
            <Flex maxH="15rem" overflowY="scroll">
                <DiscussionsFormTable   
                    allDiscussions={allDiscussions} 
                    deleteDiscussion={deleteDiscussion} 
                    selectDiscussion={selectDiscussion} 
                />
            </Flex>
        </Box>
    )
}