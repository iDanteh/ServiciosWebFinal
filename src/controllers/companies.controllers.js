import Company from '../models/company.model.js';

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las empresas'});
        console.log(error)
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.companyId);
        if(!company){
            return res.status(404).json({ error: 'Empresa no encontrada'});
        }
        res.status(200).json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la empresa'});
    }
};

export const createCompany = async (req, res) => {
    try {
        const userId = req.user.id;
        const { company_name, company_description, address } = req.body;

        // Crear una nueva empresa
        const newCompany = await Company.create({
            user_id: userId,
            company_name,
            company_description,
            address,
        });
        console.log(newCompany);
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la empresa'});
    }
};

export const updateCompany = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.companyId);
        if (!company){
            return res.status(404).json({ error: 'Empresa no encontrada'});
        }

        const { company_name, company_description, address } = req.body;
        company.company_name = company_name;
        company.company_description = company_description;
        company.address = address;
        await company.save();
        res.status(200).json({ message: 'Empresa actualizada'});
    } catch (error) {
        console.log(error)
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.companyId);
        if (!company){
            return res.status(404).json({ error: 'Empresa no encontrada'});
        }
        await company.destroy();
        res.status(200).json({ message: 'Empresa eliminada'});
    } catch (error) {
        console.log(error);
    }
};