import React, { useEffect, useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';
import Product from '../Product/Product'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import CircularProgress from "@material-ui/core/CircularProgress";
const Shop = () => {
    const[products, setProducts] =  useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch("https://nameless-lowlands-58863.herokuapp.com/products")
          .then((res) => res.json())
          .then((data) => setProducts(data));
    }, [])

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch("https://nameless-lowlands-58863.herokuapp.com/productsByKeys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productKeys),
        })
          .then((res) => res.json())
          .then((data) => setCart(data));
    }, [])
    
        const  handleAddProduct = (product) =>{
        let sameProduct = cart.find(pd=>pd.key===product.key);
        let newCart;
        let count = 1;
        if (sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=> pd.key !== product.key)
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key, count);
    }
    
    return (
      <div className="shop-container">
        <div className="product-container">
          {products.length === 0 && <CircularProgress color="secondary" />}
          {products.map((product) => (
            <Product
              key={product.key}
              showAddToCart={true}
              handleAddProduct={handleAddProduct}
              product={product}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart}>
            <Link to="/review">
              <button id="reviewBtn" className="addToCartBtn">
                Review your order
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    );
};

export default Shop;