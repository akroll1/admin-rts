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
import { useGlobalStore } from '../../stores';

export const SummaryForm = () => {
    const {
    } = useGlobalStore()

    const [summaryId, setSummaryId] = useState(null)

    const [form, setForm] = useState({
       type: '',
       summary: {}
    });

    const handleFormChange = e => {
        const { id, value } = e.currentTarget;
        return setForm({ ...form, [id]: value })
    }

    const handleFetchSummary = () => {
        // fetchSummaryById(summaryId)
    }
    
    const handleUpdateBlogPost = () => {
        console.log('form: ', form)
    }

    const handleDelete = e => { 
        // hold on, this is fast...

    }

    const handleCreateSummary = e => {
        Object.assign(form, {
            imgs: imgs?.length ? imgs : null,
        })
        console.log('form- create: ', form)

        createSummary()
    }
    
    const { author, body, imgs, published, subtitle, summary, title } = blogPost?.summaryId ? blogPost : form
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
                            <FormControl id="summaryId">
                                <FormLabel htmlFor="summaryId">Search by ID</FormLabel>
                                <Input 
                                    value={summaryId} 
                                    onChange={ ({ currentTarget: {value} }) => setSummaryId(value.length == 36 ? value : '')} 
                                    type="text" 
                                />
                            </FormControl>
                            <HStack justifyContent="center" width="full">
                                <Button 
                                    disabled={!summaryId}  
                                    minW="33%" 
                                    // isLoading={isSubmitting} 
                                    loadingText="Searching..." 
                                    onClick={handleFetchSummary} 
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
                        onClick={summaryId ? handleUpdateBlogPost : handleCreateSummary} 
                        type="submit" 
                        colorScheme="solid"
                        minW="40%"
                    >
                        { summaryId ? `Update Post` : `Create Post` }
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