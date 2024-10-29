import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import companiesRoutes from './routes/companies.routes.js';
import productsRoutes from './routes/products.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import morgan from 'morgan';
import sequelize from './database/database.js';
import cors from 'cors';

const app = express();

// app.use(cors());
// Configuración de CORS para un origen específico
app.use(cors({
    origin: 'http://localhost:3000', // Pendiente de configurar para la ruta con el cliente
    methods: 'GET,POST,PUT,DELETE', // Mtodos permitidos
    allowedHeaders: 'Content-Type,Authorization' // Cabeceras permitidas
}));

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(companiesRoutes);
app.use(productsRoutes);
app.use(categoriesRoutes);

app.listen(PORT);
console.log('Listening on port ', PORT);

// Test de conexión a la base de datos
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

testConnection();