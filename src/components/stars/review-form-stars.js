import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Flex } from '@chakra-ui/react'

export const ReviewFormStars = ({ rating, handleStarsClick }) => (
    <Flex>
        <ReactStars
            activeColor="#ffd700"
            count={5}
            isHalf
            size={22}
            onChange={handleStarsClick}
            value={rating}
            edit={true}
        />
    </Flex>
)

