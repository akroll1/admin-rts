import {
    Box,
    Flex,
    Heading,
    Img,
    Link,
    Text,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { BsClockFill } from 'react-icons/bs'
import { Navigate, NavLink as RRLink, useNavigate } from 'react-router-dom'

export const BlogPost = ({ post }) => {
  const navigate = useNavigate()
  const { blogId, author, authorId, body, imgs = [], subtitle, summary, title } = post?.blogId ? post : '';
  return (
      <Flex
        as="article"
        bg={{sm: mode('fsl-heading-text', 'gray.700')}}
        shadow={{sm: 'base'}}
        rounded={{sm: 'md'}}
        overflow="hidden"
        transition="all 0.2s"
        _hover={{shadow: {sm: 'lg'}}}
        cursor="pointer"
        pb="2"
      >
        <Flex 
          direction="column"
          onClick={() => navigate(`/blog/${blogId}`)}
        >
          <Img height="60" objectFit="cover" alt={title} src={imgs?.length > 0 ? imgs[0] : ''} />
          <Flex
            direction="column"
            px="4"
          >
            <Text
              casing="uppercase"
              letterSpacing="wider"
              fontSize="xs"
              fontWeight="semibold"
              mb="2"
              pt="1"
              pl="0"
              color="gray.500"
            >
              {'FSL'}
            </Text>
            <Heading 
              color={mode('blackAlpha.700','fsl-heading-text')}
              as="h3" 
              size="sm" 
              mb="2" 
              lineHeight="base"
            >
              {title}
            </Heading>
            <Text 
              noOfLines={2} 
              mb="8" 
              color={mode('blackAlpha.600', 'blackAlpha.400')}
            >
              {summary}
            </Text>
            <Flex
              align="baseline"
              justify="space-between"
              fontSize="sm"
              color={mode('gray.600', 'gray.400')}
            >
              <Text>
                By&nbsp; 
                <Link 

                  as={RRLink} 
                  textDecor="underline" 
                  to={`/author/${authorId}`}
                >
                  {author}
                </Link>
              </Text>
              <Link href="#">
                <Box as={BsClockFill} display="inline-block" me="2" opacity={0.4} />6 min read
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  }