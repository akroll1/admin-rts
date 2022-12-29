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

    // console.log('body: ', 
    const t = body.split( el => el == '\\')
    console.log('t: ', t)
    return (
        <Flex
            alignItems="flex-start"
            w="100%"
            flexDir="column"
            maxW={["90%", "90%", "80%"]}
            p={["2","4","8"]}
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
                {body.split('\n').map(e => <p>{ e }</p>)}

            </Text>
        </Flex>
    )
}