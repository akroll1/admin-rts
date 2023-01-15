import ReactStars from 'react-rating-stars-component';

export const ReviewFormStars = ({  stars, handleStarsClick }) => (
    <ReactStars
        activeColor="#ffd700"
        count={5}
        isHalf
        size={22}
        onChange={handleStarsClick}
        value={stars}
        edit={true}
    />
)
