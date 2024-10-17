import { Router} from 'express'
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/companies.controllers.js';
import { authenticateToken } from '../controllers/users.controllers.js';

const router = Router();

router.get('/api/v1/companies', authenticateToken,getCompanies);
router.get('/api/v1/companies/:companyId', authenticateToken,getCompanyById);
router.post('/api/v1/companies', authenticateToken, createCompany);
router.put('/api/v1/companies/:companyId', authenticateToken, updateCompany);
router.delete('/api/v1/companies/:companyId', authenticateToken, deleteCompany);

export default router;