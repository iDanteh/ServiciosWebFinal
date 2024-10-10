import User from '../models/users.model.js';

//Obtener todos los usuarios
export const getUsers = async (req, res) =>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios'});
    }
};

//Obtener un usuario por ID