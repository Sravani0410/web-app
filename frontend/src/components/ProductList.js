import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
const localstoragetoken=localStorage.getItem('token')
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <>
      <Navbar />
      <div className='product-list'>
      {/* <h1>Product List</h1> */}
      {localstoragetoken&&<ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <Link to={`/products/${product._id}`}>View Details</Link>
            </li>
          ))}
        </ul>}
      {/* {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <Link to={`/products/${product._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )} */}
      </div>
    </>
  );
};

export default ProductList;
