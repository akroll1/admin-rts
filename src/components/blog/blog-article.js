import {
    Box,
    Flex,
    Heading,
    Img,
    Link,
    LinkBox,
    LinkOverlay,
    Text,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { BsClockFill } from 'react-icons/bs'

export const BlogArticle = (props) => {
    const { title, href, summary, media, author, category = '' } = props
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
              {summary}
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