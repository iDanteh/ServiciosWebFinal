import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('servicios', 'lenin_test', '190622', {
    // host: '192.168.43.20',
    host: '192.168.1.73',
    dialect: 'postgres',
    port: 5432
});

// Conexión para usarla en otros módulos
export default sequelize;