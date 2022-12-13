import { useState, useEffect } from 'react'
import { 
    Box, 
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
    Heading, 
    HStack, 
    Input, 
    Stack, 
    StackDivider, 
    Textarea,  
    VStack 
} from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { useScorecardStore } from '../../stores';

export const BlogPostForm = () => {
    const {
        blogPost,
        createBlogPost,
        fetchBlogPost,
        user,
    } = useScorecardStore()

    const [blogId, setBlogId] = useState(null)

    const [form, setForm] = useState({
        author: '',
        authorId: user.sub,
        body: '',
        imgs: [],
        published: false,
        subtitle: '',
        summary: '',
        title: '',
    });

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({ ...form, [id]: value })
    }

    const handleFetchBlogPost = () => {
        fetchBlogPost(blogId)
    }
    
    const handleUpdateBlogPost = () => {
        console.log('form: ', form)
    }

    const handleDelete = e => { 
        // hold on, this is fast...
        // deleteDiscussion(discussionId);
    }

    const handleCreateBlogPost = e => {
        Object.assign(form, {
            imgs: imgs?.length ? imgs : null,
        })
        console.log('form- create: ', form)

        createBlogPost(form)
    }
    
    const { author, body, imgs, published, subtitle, summary, title } = blogPost?.blogId ? blogPost : form
    // console.log('form: ', form)
    return (
        <Box 
            px={{base: '4', md: '10'}} 
            py="16" 
            maxWidth="3xl" 
            mx="auto"
        >   
            <form id="blog_post_form" onSubmit={(e) => {e.preventDefault()}}>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Heading size="lg" as="h1" paddingBottom="4" mt="3rem">
                        Blog Form
                    </Heading>
                    <FieldGroup title="Search for a post">
                        <VStack width="full" spacing="6">
                            <FormControl id="blogId">
                                <FormLabel htmlFor="blogId">Search by ID</FormLabel>
                                <Input 
                                    value={blogId} 
                                    onChange={ ({ currentTarget: {value} }) => setBlogId(value.length == 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!blogId}  
                                    minW="33%" 
                                    // isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={handleFetchBlogPost} 
                                    type="button" 
                                    colorScheme="solid">
                                    Search
                                </Button>
                            </HStack>
                        </VStack>
                    </FieldGroup>
                    <FieldGroup title="Blog Post Info">
                        <VStack width="full" spacing="6">
                            <FormControl id="author">
                                <FormLabel>Author Display Name</FormLabel>
                                <Input required value={author} onChange={handleFormChange} type="text" maxLength={100} />
                            </FormControl>

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
                                <FormLabel>Body</FormLabel>
                                <Textarea
                                    required
                                    placeholder="Body..."
                                    value={body}
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
                        onClick={blogId ? handleUpdateBlogPost : handleCreateBlogPost} 
                        type="submit" 
                        colorScheme="solid"
                        minW="40%"
                    >
                        { blogId ? `Update Post` : `Create Post` }
                    </Button>
                    <Button 
                        minW="40%"
                        onClick={handleDelete}
                        variant="outline"
                    >
                        Delete
                    </Button>
                    </HStack>
                </FieldGroup>
            </form>
        </Box>
    )
}