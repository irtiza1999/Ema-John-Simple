import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css';
import gify from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();
    const handleCheckOut = () =>{
        history.push('/shipment');
    }

    const handleRemoveProduct = (productKey) =>{
        const newCart =cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys= Object.keys(savedCart);

        fetch("https://nameless-lowlands-58863.herokuapp.com/productsByKeys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productKeys),
        })
          .then((res) => res.json())
          .then((data) => setCart(data));
    }, []);
    let image;
    if (orderPlaced){
        
        image = <h3>Order placed successfully!<img id = "gify" src={gify}></img></h3>}
    return (
        <div  className="review">
            <div  className="product-container" >
            {
                cart.map(pd=><ReviewItem product={pd} key={pd.key} removeProduct = {handleRemoveProduct}></ReviewItem>)
            }
            {
                image
            }
            
            </div>
            <div className="cart-container">
                <Cart cart ={cart}>
                    <button id="placeOrder" onClick={handleCheckOut} className="addToCartBtn">Proceed CheckOut</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;