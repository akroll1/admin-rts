import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Flex } from '@chakra-ui/react';

export const ReviewPostStars = ({ rating, handleStarsClick }) => (
    <Flex mt="-0.5rem">
        <ReactStars
            activeColor="#ffd700"
            count={5}
            isHalf
            size={25}
            onChange={handleStarsClick}
            value={rating}
            edit={false}
        />
    </Flex>
)

