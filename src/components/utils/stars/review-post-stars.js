import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Flex } from '@chakra-ui/react';

export const ReviewPostStars = ({ 
    handleStarsClick,
    rating, 
}) => (
    <Flex flexDir="row" mr="2" pr={["0", "2"]}>
        <ReactStars
            activeColor="#ffd700"
            count={5}
            isHalf
            size={22}
            onChange={handleStarsClick}
            value={rating}
            edit={false}
        />
    </Flex>
)

