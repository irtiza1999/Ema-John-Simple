import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import CircularProgress from "@material-ui/core/CircularProgress";

const Detail = () => {
    const {productKey} = useParams();
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    useEffect(()=>{
        fetch('https://nameless-lowlands-58863.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data =>{ setProduct(data)
                        setLoading(false)
        })
    },[productKey])

    return (
      <div>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Product showAddToCart={false} product={product}></Product>
        )}
      </div>
    );
};

export default Detail;