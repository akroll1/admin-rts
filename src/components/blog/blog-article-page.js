import { useEffect, useState } from 'react'
import {
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router';
import { useGlobalStore } from '../../stores';

export const BlogArticlePage = () => {

    const { blogId } = useParams();
    const [blogPost, setBlogPost] = useState({})

    const { 
        fetchBlogPost,
        selectedBlogPost
    } = useGlobalStore()

    useEffect(() => {
        if(blogId){
            fetchBlogPost(blogId)
        }
    },[blogId])

    useEffect(() => {
        if(selectedBlogPost?.blogId){
            setBlogPost(selectedBlogPost)
        }
    },[selectedBlogPost])

    const { 
        author,
        authorId,
        body,
        imgs,
        published,
        subtitle,
        summary,
        title,
        updatedAt 
    } = blogPost

    return (
        <Flex
            alignItems="flex-start"
            w="100%"
            flexDir="column"
            maxW={["90%", "90%", "60%"]}
            p={["4","4","8"]}
            mb="8"

            mx="auto"
        >
            <Heading
                mx="auto"
                mb="4"
                p="2"
            >
                {title}
            </Heading>

            <Text>
                {body}
            </Text>
        </Flex>
    )
}