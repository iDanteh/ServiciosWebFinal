import Category from '../models/category.model.js';

//Controlador para creación de productos con referencia a las diferentes tablas

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorías'});
        console.log(error);
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId);
        if(!category){
            return res.status(404).json({ error: 'Categoría no encontrada'});
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la categoría'});
        console.log(error);
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la categoría'});
        console.log(error);
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId);
        if(!category){
            return res.status(404).json({ error: 'Categoría no encontrada'});
        }
        const { name, description } = req.body;
        category.name = name;
        category.description = description;
        await category.save();
        res.status(200).json({ message: 'Categoría actualizada'});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoría'});
        console.log(error);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId);
        if(!category){
            return res.status(404).json({ error: 'Categoría no encontrada'});
        }
        await category.destroy();
        res.status(200).json({ message: 'Categoría eliminada'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la categoría'});
        console.log(error);
    }
};