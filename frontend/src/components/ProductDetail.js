import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../features/products/productSlice";
import { Link, useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  return (
    <div className="product-detail">
      {status === "loading" ? (
        <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
      ) : (
        product && (
          <>
            <div className="product-detail-container">
              <h1 className="product-detail-title">View Details Page</h1>
              <p><b>Product Name: </b>{product.name}</p>
              <p><b>Price: </b>₹{product.price}</p>
              <p><b>Product Description: </b>{product.description}</p>
              <Link to="/products" className="back-link">
                Back to List
              </Link>
              {/* <Link to={`/edit/${product._id}`}>Edit Details</Link> */}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ProductDetail;
