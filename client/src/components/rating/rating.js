import React, { useState } from 'react';
import './rating.scss';

function Rating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const onClickHandler = (index) => {
        setRating(index);

        console.log('sdasdsadasd');
    }

    const onHoverUpdate = (value) => {
        setHover(value);

    }

    return <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
                <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={onClickHandler.bind(null, index)}
                    onMouseEnter={onHoverUpdate.bind(null, index)}
                    onMouseLeave={onHoverUpdate.bind(null, rating)}
                >
                    <span className="star">&#9733;</span>
                </button>
            );
        })}
    </div>
}

export default Rating;
