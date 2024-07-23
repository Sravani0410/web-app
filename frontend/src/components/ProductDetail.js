import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/productSlice';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        product && (
          <>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <Link to={`/edit/${product._id}`}>Edit Details</Link>
            </>
        )
      )}
    </div>
  );
};

export default ProductDetail;
