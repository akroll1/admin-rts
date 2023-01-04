import {
  Box,
  Heading,
  Link,
  SimpleGrid,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { useGlobalStore } from '../../stores'
import { SpinnerMain } from '../spinner'
import { BlogPost } from './blog-post'

export const Blog = () => {

  const {
    blogPosts,
    fetchBlogPosts,
    isLoading,
  } = useGlobalStore()

  useEffect(() => {

    fetchBlogPosts()
  },[])
  
  return (
    <Box as="section" bg={mode('whiteAlpha.200', 'inherit')} py="4">
      <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
        <Heading 
          size="xl" 
          mb="8" 
          fontWeight="extrabold"
        >
          Featured Articles
        </Heading>
        { isLoading && blogPosts.length === 0
          ?
            <SpinnerMain />
          :
            <SimpleGrid columns={{base: 1, md: 3}} spacing="12" mb="10">
              { blogPosts?.length > 0 && blogPosts.map( post => {
                return (
                  <BlogPost
                    key={post.blogId}
                    post={post}
                  />
                )
              })}
            </SimpleGrid>
          }
        <Link 
          fontSize="xl" 
          fontWeight="bold" 
          color="fsl-heading-text"
        >
          <span>View all articles</span>
          <Box as={BsArrowRight} display="inline-block" ms="2" />
        </Link>
      </Box>
    </Box>
  )
}