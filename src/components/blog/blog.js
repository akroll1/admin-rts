import {
    Box,
    Heading,
    Link,
    SimpleGrid,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { BsArrowRight, BsClockFill } from 'react-icons/bs'
  import { BlogArticle } from './blog-article'

  export const Blog = () => {
    return (
      <Box as="section" bg={mode('gray.50', 'inherit')} py="4">
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <Heading size="xl" mb="8" fontWeight="extrabold">
            Featured Articles
          </Heading>
          <SimpleGrid columns={{base: 1, md: 3}} spacing="12" mb="10">
            {/* { blogPosts } */}
            {/* <BlogArticles
              // category="Teofimo Lopez"
              media={imgs[0]}
              title={title}
              summary={summary}
              to="/blog/{blogId}"
              author={{name: {author}, href: '#'}}
            /> */}
            <BlogArticle
              category="Teofimo Lopez"
              media="teofimo.png"
              title="Have I Lost It?"
              summary="A young phenom with shattered confidence, with seemingly no one around him that can right the ship."
              href="/blog/123"
              author={{name: 'Andrew Kroll', href: '/writers/123'}}
            />
            <BlogArticle
              category="2023 Wishlist"
              media="tyson-fury.png"
              title="The Fights We Need to See in 2023"
              summary="As we approach 2023, boxing fans need Santa to deliver us some fights!"
              href="/blog/123"
              author={{name: 'Andrew Kroll', href: '/writers/123'}}
            />
            <BlogArticle
              category="Spence vs Crawford"
              media="spence-crawford.jpeg"
              title="The Spence-Crawford Saga"
              summary="When do boxing fans get to see this one? Will we ever get to see this? Fans are not happy."
              href="/blog/456"
              author={{name: 'Andrew Kroll', href: '/writers/456'}}
            />
            <BlogArticle
              category="Pound-4-Pound List"
              media="shakur.png"
              title="The 2023 Pound-4-Pound List: Who We Like"
              summary="Who's moved up and who's moved out. Here's our list to start 2023."
              href="/blog/789"
              author={{name: 'Andrew Kroll', href: '/writers/789'}}
            />
          </SimpleGrid>
          <Link fontSize="xl" fontWeight="bold" color={mode('blue.600', 'blue.400')}>
            <span>View all articles</span>
            <Box as={BsArrowRight} display="inline-block" ms="2" />
          </Link>
        </Box>
      </Box>
    )
  }