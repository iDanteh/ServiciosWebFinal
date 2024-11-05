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
const allowedOrigins = ['http://192.168.43.132.com'];
app.use(cors({
    origin: (origin, callback) => {
        // Permitir peticiones sin origen (por ejemplo, desde herramientas de pruebas)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Permite el acceso si el origen está en la lista permitida
        } else {
            callback(new Error('No autorizado por CORS')); // Rechaza la solicitud si el origen no está en la lista
        }
    },
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
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