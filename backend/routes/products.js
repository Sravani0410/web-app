const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all products
router.get('/',auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  try {
    const count = await Product.countDocuments({"userId":req.user.user.id});
    const products = await Product.find({"userId":req.user.user.id})
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new product
router.post('/', auth, async (req, res) => {
  const { name, price, description } = req.body;
  let userId=req.user.user.id

  try {
    const newProduct = new Product({ name, price, description,userId });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error1');
  }
});

// Edit a product
router.put('/:id', auth, async (req, res) => {
  const { name, price, description } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product.name = name;
    product.price = price;
    product.description = description;

    product = await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
