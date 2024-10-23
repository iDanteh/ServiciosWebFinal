import User from '../models/users.model.js';
import jwt from 'jsonwebtoken';
// import secretKey from '../jwt/.env';
const SECRET_KEY = 'serviciosweb';

//Obtener todos los usuarios
export const getUsers = async (req, res) =>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios'});
    }
};

export const getUserById = async(req, res) =>{
    try {
        const user = await User.findByPk(req.params.userId);
        if(!user){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el usuario'});
    }
};

export const registerUser = async (req, res) =>{
    try {
        const role = "user";
        const {name, email, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({ where: { email: email } });
        if(user){
            return res.status(409).json({ error: 'El correo ingresado ya existe'});
        }
        
        const newUser = await User.create({ email, password, name, role });
        const token = generateAccessToken(user);
        res.status(201).json(newUser);
        console.log(res.status(201).json({ token }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al registrar el usuario'});
    }
};

//Generar token de acceso
function generateAccessToken(user){
    return jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
};

//Middleware para verificar el token de acceso
export const authenticateToken = (req, res, next) =>{
    const accesToken = req.headers['authorization'] || req.query.accesToken;
    const token = accesToken && accesToken.split(' ')[1];

    if (token == null) return res.status(401).json({ error: 'Acceso denegado. No hay token.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido.' });

        req.user = user; // Agregar la información del usuario al request
        next(); // Pasar al siguiente middleware o ruta
    });
};

export const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ where: {email: email} });
        if(!user){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }

        if(user.password !== password){
            return res.status(401).json({ error: 'Contraseña incorrecta'});
        }

        const accessToken = generateAccessToken(user); //Generar token de acceso

        // res.status(200).json({
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     role: user.role
        // });
        res.status(200).json({ user, accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al autenticar el usuario'});
    }
};

export const deleteUser = async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.userId);
        if(!user){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado'});
    } catch (error) {
        console.log(error)
    }
};

export const updateUser = async (req, res) =>{
    try {
        const user = await User.findByPk(req.params.userId);
        if(!user){
            return res.status(404).json({ error: 'Usuario no encontrado'});
        }
        const {name, email, password} = req.body;
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        res.status(200).json({ message: 'Usuario actualizado'});
    } catch (error) {
        console.log(error)
    }
};