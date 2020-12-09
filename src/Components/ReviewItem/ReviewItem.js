import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, quantity, img , key, price} = props.product;
    return (
        <div>
            <div className="reviewImg">
                <img src={img} alt=""/>
            </div>
            <div className="reviewItem">
                <h4>{name}</h4>
                <p>Quantity: {quantity}</p>
                <p><small>Unit price: ${price}</small></p>
                <button className="addToCartBtn" onClick={() => props.removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;