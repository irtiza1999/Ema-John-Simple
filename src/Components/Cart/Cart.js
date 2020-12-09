import React from 'react';

import './Cart.css'
const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i]
        total = total + (product.price * (product.quantity|| 1));
    }
    const formatNumber = number =>{
        const convert = number.toFixed(2);
        return Number(convert);
    }
    let totalPrice = formatNumber(total);
    let tax = formatNumber(totalPrice / 10);
    let shippingCost = 0;
    if (totalPrice < 15 && totalPrice > 0){
        shippingCost = 10;
    }
    else if(totalPrice > 15){
        shippingCost = 0;
    }
    let grandTotal = formatNumber(totalPrice + shippingCost + tax)

    return (
        <div>
            <h4 id="order">Order Summary</h4>
            <p><span class="high">Total Items Ordered:</span> {cart.length}</p>
            <p><span class="high">Total price:</span> ${totalPrice}</p>
            <p><small><span class="high">Tax+VAT:</span> ${tax}</small></p>
            <p><small><span class="high">Shipping Cost:</span> ${shippingCost}</small></p>
            <p id="grand">Grand Total: ${grandTotal}</p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;