import React from 'react'
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Product = (props) => {
    const {img, name, key, seller, price, stock} = props.product || '';
    return (
        <div className="product">
            <div>
                <img src={img} alt={key}/>
            </div>
            <div className="product-info">
                <h4 id="product-name"><Link to={key}>{name}</Link></h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p><strong>${price}</strong></p>
                <br/>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                { props.showAddToCart && <button className="addToCartBtn"
                onClick={() => props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart}/> Add to cart</button>}
            </div>
            
        </div>
    );
};

export default Product;