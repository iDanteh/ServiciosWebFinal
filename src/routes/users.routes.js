import { Router } from 'express';
import { getUsers } from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/v1/', (req, res) => {res.send('Jalando');});
router.get('/api/v1/users', getUsers);
// router.get('/api/users/:userId', getUserById);
// router.post('/api/users', createUser);
// router.delete('/api/users/:userId', deleteUser);
// router.put('/api/users/:userId', updateUser);

export default router;