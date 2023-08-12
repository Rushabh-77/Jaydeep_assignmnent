import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { app_url, axiosInstance } from '../../config/helper';
import { Footer } from '../footer/footer';


const Product = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(); // Call the getProducts function inside the useEffect hook
  }, []);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get(app_url + "/api/products/getProduct");
      setProducts(response.data.data.prodResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };




  // Function to handle increasing quantity
  const handleIncreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };


  // Function to handle decreasing quantity
  const handleDecreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
      )
    );
  };


  const addToCart = async (prodId, quantity) => {
    let cartObj = {
      id: prodId,
      quantity: quantity
    }
    // getProducts()
    let cartData = await axiosInstance.post(app_url + '/api/cart/addToCart', cartObj)
    if(cartData) alert("Product Added to cart")
  }


  return (
    <div>
      <h1>Product Page</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <div className="quantity-buttons">
              <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
              <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
              <button onClick={() => addToCart(product.id, product.quantity)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};
export default Product;
