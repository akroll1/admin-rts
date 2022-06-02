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
  import * as React from 'react'
  import { BsArrowRight, BsClockFill } from 'react-icons/bs'
  
  const BlogArticles = (props) => {
    const { title, href, description, media, author, category } = props
    return (
      <LinkBox
        as="article"
        bg={{
          sm: mode('white', 'gray.700'),
        }}
        shadow={{
          sm: 'base',
        }}
        rounded={{
          sm: 'md',
        }}
        overflow="hidden"
        transition="all 0.2s"
        _hover={{
          shadow: {
            sm: 'lg',
          },
        }}
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
      <Box as="section" bg={mode('gray.50', 'gray.800')} py={{base: '10', sm: '24'}}>
        <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{base: '6', md: '8'}}>
          <Heading size="xl" mb="8" fontWeight="extrabold">
            Featured Articles
          </Heading>
          <SimpleGrid columns={{base: 1, md: 3}} spacing="12" mb="10">
            <BlogArticles
              category="Upcoming Fights"
              media="tyson-fury.png"
              title="The Fights We Still Want to See"
              description="We're over halfway through 2021... already. But we still have fights that we MUST see. Here they are."
              href="/blog/123"
              author={{name: 'Andrew Kroll', href: '/writers/123'}}
            />
            <BlogArticles
              category="Spence vs Pacquiao"
              media="pacman.png"
              title="Manny Pacquiao vs Errol Spence, Jr., What to Watch For"
              description="Does Manny Pacquiao still have it? Can he compete with the bigger Spence?"
              href="/blog/456"
              author={{name: 'Andrew Kroll', href: '/writers/456'}}
            />
            <BlogArticles
              category="Pound-4-Pound List"
              media="loma.png"
              title="August 2021 Pound-4-Pound List: Who We Like"
              description="After Loma's dominant victory, does he rank higher than Tiofimo? Where does Fury stand now?"
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