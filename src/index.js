import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import companiesRoutes from './routes/companies.routes.js';
import morgan from 'morgan';
import sequelize from './database/database.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(companiesRoutes);

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