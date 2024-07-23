import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, editProduct } from '../features/products/productSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CreateEditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((prod) => prod._id === id)
  );

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
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
        console.log("formData",formData)
      dispatch(createProduct(formData));
    }
    navigate('/');
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Create'} Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Edit' : 'Create'} Product</button>
      </form>
    </div>
  );
};

export default CreateEditProduct;
