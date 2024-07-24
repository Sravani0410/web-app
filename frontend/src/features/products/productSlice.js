import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
const token = localStorage.getItem('token');

const initialState = {
  products: [],
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products');
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
  try {
    const response = await axios.post('/api/products', product, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
  }
});

export const editProduct = createAsyncThunk('products/editProduct', async (product) => {
  const { id, ...updatedProduct } = product;
  try {
    const response = await axios.put(`/api/products/${id}`, updatedProduct, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
