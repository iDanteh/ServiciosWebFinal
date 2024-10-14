import { Router} from 'express'
import { createCompany, getCompanies, getCompanyById } from '../controllers/companies.controllers.js';
import { authenticateToken } from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/v1/companies', authenticateToken,getCompanies);
router.get('/api/v1/companies/:companyId', authenticateToken,getCompanyById);
router.post('/api/v1/companies', authenticateToken, createCompany);

export default router;