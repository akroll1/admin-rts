import {
    Box,
    Flex,
    Heading,
    Img,
    Link,
    LinkBox,
    LinkOverlay,
    SimpleGrid,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { BsArrowRight, BsClockFill } from 'react-icons/bs'
  
  const BlogArticles = (props) => {
    const { title, href, description, media, author, category } = props
    return (
      <LinkBox
        as="article"
        bg={{sm: mode('white', 'gray.700')}}
        shadow={{sm: 'base'}}
        rounded={{sm: 'md'}}
        overflow="hidden"
        transition="all 0.2s"
        _hover={{shadow: {sm: 'lg'}}}
      >
        <Flex direction="column">
          <Img height="60" objectFit="cover" alt={title} src={media} />
          <Flex
            direction="column"
            px={{
              sm: '6',
            }}
            py="5"
          >
            <Text
              casing="uppercase"
              letterSpacing="wider"
              fontSize="xs"
              fontWeight="semibold"
              mb="2"
              color="gray.500"
            >
              {category}
            </Text>
            <Heading as="h3" size="sm" mb="2" lineHeight="base">
              <LinkOverlay href={href}>{title}</LinkOverlay>
            </Heading>
            <Text noOfLines={2} mb="8" color={mode('gray.600', 'gray.400')}>
              {description}
            </Text>
            <Flex
              align="baseline"
              justify="space-between"
              fontSize="sm"
              color={mode('gray.600', 'gray.400')}
            >
              <Text>
                By{' '}
                <Box as="a" textDecor="underline" href={author.href}>
                  {author.name}
                </Box>
              </Text>
              <Link href="#">
                <Box as={BsClockFill} display="inline-block" me="2" opacity={0.4} />6 min read
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </LinkBox>
    )
  }
  
  export const Blog = () => {
    return (
      <Box as="section" bg={mode('gray.50', 'inherit')} py={{base: '10', sm: '24'}}>
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <Heading size="xl" mb="8" fontWeight="extrabold">
            Featured Articles
          </Heading>
          <SimpleGrid columns={{base: 1, md: 3}} spacing="12" mb="10">
            <BlogArticles
              category="Teofimo Lopez"
              media="teofimo.png"
              title="Have I Lost It?"
              description="A young phenom with shattered confidence, with seemingly no one around him that can right the ship."
              href="/blog/123"
              author={{name: 'Andrew Kroll', href: '/writers/123'}}
            />
            <BlogArticles
              category="2023 Wishlist"
              media="tyson-fury.png"
              title="The Fights We Need to See in 2023"
              description="As we approach 2023, boxing fans need Santa to deliver us some fights!"
              href="/blog/123"
              author={{name: 'Andrew Kroll', href: '/writers/123'}}
            />
            <BlogArticles
              category="Spence vs Crawford"
              media="spence-crawford.jpeg"
              title="The Spence-Crawford Saga Continues"
              description="When do boxing fans get to see this one? Will we ever get to see this? Fans are not happy."
              href="/blog/456"
              author={{name: 'Andrew Kroll', href: '/writers/456'}}
            />
            <BlogArticles
              category="Pound-4-Pound List"
              media="shakur.png"
              title="The 2023 Pound-4-Pound List: Who We Like"
              description="Who's moved up and who's moved out. Here's our list to start 2023."
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