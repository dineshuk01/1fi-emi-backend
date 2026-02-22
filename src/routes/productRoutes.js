const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
  getProductById,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/id/:id', getProductById);
router.get('/:slug', getProductBySlug);

module.exports = router;