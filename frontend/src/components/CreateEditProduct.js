import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, editProduct } from "../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateEditProduct.css"
const CreateEditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((prod) => prod._id === id)
  );

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (id && product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [id, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editProduct({ ...formData, id }));
    } else {
      // console.log("formData", formData);
      dispatch(createProduct(formData));
    }
    navigate("/products");
  };

  return (
    <div className="container-form">
      <div className="form-container">
        <h1 className="form-title">
          {id ? "Edit" : "Add"} Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Name:</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label">Price:</label>
            <input
            className="form-input"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-label">Description:</label>
            <textarea
            className="form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form-button">{id ? "Update Product" : "Add Product"} Product</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditProduct;
