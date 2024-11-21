import { Router } from 'express';
import { getUsers, getUserById, loginUser, registerUser, deleteUser, updateUser, authenticateToken } from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/v1/', authenticateToken,(req, res) => {res.send('Jalando con JWT');});
router.get('/api/v1/users', authenticateToken, getUsers);
router.get('/api/v1/users/:userId', getUserById);   
router.post('/api/v1/register', registerUser);
router.post('/api/v1/login', loginUser);
router.delete('/api/v1/users/:userId', authenticateToken, deleteUser);
router.put('/api/v1/users/:userId', authenticateToken, updateUser);

export default router;