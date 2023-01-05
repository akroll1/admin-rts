import { useEffect, useState } from 'react'
import {
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router'
import { useGlobalStore } from '../../stores'
import { replaceNewLineWithBreaks } from '../../stores/stores/utils-store'
import { SpinnerMain } from '../spinner'
import { parseEpoch } from '../../utils'

export const BlogArticlePage = () => {

    const { blogId } = useParams();
    const [blogPost, setBlogPost] = useState({})

    const { 
        fetchBlogPost,
        isLoading,
        selectedBlogPost,
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
        createdAt,
        imgs,
        published,
        subtitle,
        summary,
        title,
        updatedAt 
    } = blogPost
    
    console.log('updatedAt: ', parseEpoch(createdAt, true))
    return (
        <Flex
            alignItems="flex-start"
            w="100%"
            flexDir="column"
            maxW={["80%", "70%", "75%", "50%"]}
            p={["4","4","8"]}
            mb="8"

            mx="auto"
        >
            { isLoading
                ?
                    <SpinnerMain />
                :
                    <Flex
                        flexDir="column"
                        w="100%"
                    >
                        <Heading
                            mx="auto"
                            mb="2"
                            p="2"
                        >
                            {title}
                        </Heading>

                        <Text
                            mt="2"
                            fontSize="lg"
                            fontWeight="semibold"
                            color="#CACACA"
                        >
                            Written By {`${author}`}
                        </Text>
                        <Text
                            mb="2"
                            p="1"
                            fontSize="sm"
                            fontWeight="semibold"
                            color="#CACACA"
                        >
                            {`${parseEpoch(createdAt, true)}`}
                        </Text>

                        <Text
                            fontSize="md"
                            dangerouslySetInnerHTML={{ __html: replaceNewLineWithBreaks(body ? body : '')}}
                        />
                    </Flex>
            }
        </Flex>
    )
}