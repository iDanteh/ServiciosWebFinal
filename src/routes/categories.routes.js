import {Router} from 'express';
import {createCategory, deleteCategory, getCategories, getCategoryById, updateCategory} from '../controllers/categories.controllers.js';
import {authenticateToken} from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/v1/categories', authenticateToken, getCategories);
router.get('/api/v1/categories/:categoryId', authenticateToken, getCategoryById);
router.post('/api/v1/categories', authenticateToken, createCategory);
router.put('/api/v1/categories/:categoryId', authenticateToken, updateCategory);
router.delete('/api/v1/categories/:categoryId', authenticateToken, deleteCategory);

export default router;