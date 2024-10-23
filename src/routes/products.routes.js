import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js';
import {authenticateToken} from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/v1/products', authenticateToken, getProducts);
router.get('/api/v1/products/:productId', authenticateToken, getProductById);
router.post('/api/v1/products', authenticateToken, createProduct);
router.put('/api/v1/products/:productId', authenticateToken, updateProduct);
router.delete('/api/v1/products/:productId', authenticateToken, deleteProduct);

export default router;