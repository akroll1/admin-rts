import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import { parseEpoch} from '../../../utils/utils'
import { ReviewPostStars } from '../../stars'
import { FiMoreHorizontal } from 'react-icons/fi'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
export const ReviewItem = ({ 
  handleLikeClick,
  reviewItem 
}) => {
  const [localLikes, setLocalLikes] = useState(0);
  const [clickedUP, setClickedUP] = useState(false)
  const [clickedDOWN, setClickedDOWN] = useState(false)
  const { likes, rating, review, reviewId, title, updatedAt, username } = reviewItem;

  useEffect(() => {
    setLocalLikes(likes > 0 ? likes * Math.ceil(Math.random()*100) : 1)
  },[likes]);

  const handleVote = type => {
    if(type === 'up' && !clickedUP){
      setLocalLikes(localLikes + 1);
      setClickedUP(true);
      handleLikeClick(reviewId, type);
    } else if(type ==='down' && !clickedDOWN) {
      setClickedDOWN(true);
      handleLikeClick(reviewId, type);
    }
  }

  return (
    <Stack 
      my="2" 
      p={["2", "4"]} 
      boxSizing="border-box" 
      flex="0 0 45%" 
      spacing="2.5" 
      textAlign="left"
      justifyContent="flex-start"
      w="100%"
      maxW={["100%", "50%"]}
    >
      <Box 
        spacing="3" 
        display="flex" 
        flexDirection={["column", "row"]} 
        alignItems={["flex-start", "center"]} 
        justifyContent="flex-start"
      >
        <Flex minW="100%" display="inline-flex" flexWrap="wrap">
          <ReviewPostStars 
            rating={rating} 
            minW="100%" 
            size="sm" 
          />
          <Box>
            <Heading 
              display="inline-flex" 
              flex="1 0 50%" 
              m="auto" 
              size="sm" 
              fontWeight="medium" 
              color={useColorModeValue('black', 'white')}
            >
              {title}
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Text 
        minH={["3rem","4.5rem"]} 
        noOfLines={3} 
        wordBreak="break-word"
      >
        {review}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
        - {username} on {parseEpoch(updatedAt,'reviews')}
      </Text>
      <Flex 
        px="1" 
        flexDirection="row" 
        justifyContent="space-between" 
        alignItems="center"
      >
        <Flex justifyContent="flex-start">
          <Icon 
            h={4} 
            w={4} 
            onClick={() => handleVote('up')} 
            as={FaRegThumbsUp} 
            _hover={{cursor: 'pointer'}} 
          />
            <Text pl="1" mr="2" fontSize="xs">{`${localLikes}`}</Text>
          <Icon 
            h={4} 
            w={4} 
            onClick={() => handleVote('down')} 
            as={FaRegThumbsDown} 
            _hover={{cursor: 'pointer'}} 
          />
        </Flex>
        <Menu>
          <MenuButton
            border="none"
            as={IconButton}
            aria-label='Options'
            icon={<FiMoreHorizontal />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<AddIcon />}>
              Follow {username}
            </MenuItem>
            <MenuItem icon={<EditIcon />}>
              Un-Follow
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Stack>
  )
}