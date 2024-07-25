import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import "./ProductList.css"


const ProductList = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.products.products);
  // const status = useSelector((state) => state.products.status);
  const { products, totalPages, currentPage, status, error } = useSelector((state) => state.products);
  const localstoragetoken = localStorage.getItem("token");
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({ page: currentPage, limit: 10 }));
    }
  }, [status, dispatch]);
  const handlePageChange = (page) => {
    dispatch(fetchProducts({ page, limit: 10 }));
  };
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  console.log("products",products)
  return (
    <>
      <Navbar />
      <div className="product-list-container">
        {/* <h1>Product List</h1> */}
        {localstoragetoken && (
          <div className="product-container">
            <div className="product-list-container">
              <ul className="product-list">
                {products?.map((product) => (
                  <li key={product.id} className="product-item">
                    <img
                  className="product-image"
                  src="./image.jpg"
                  alt="dummy-image"
                />
                   <div className="product-details">
                  <h2 className="product-name">{product.name}</h2>
                </div>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-description">{product.description}</p>
                  <div className="product-links">
                  <Link to={`/products/${product._id}`} className="view-details">
                    View Details
                  </Link>
                  <Link to={`/edit/${product._id}`} className="edit">Edit Details</Link>
                </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
         <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default ProductList;
