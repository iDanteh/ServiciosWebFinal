import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('servicios', 'lenin_test', '190622', {
//     // // host: '192.168.43.20',
//     // host: '192.168.1.73',
//     // host: '192.168.133.193',
//     // host: '192.168.133.40',
//     host: '10.168.111.143',
//     dialect: 'postgres',
//     port: 5432
// });

const sequelize = new Sequelize('serviciosweb', 'postgres', 'LeninRonaldo717', {
    host: 'serviciosweb.ctg4i46wefhi.us-east-2.rds.amazonaws.com',  // Aquí pones el endpoint de tu RDS
    dialect: 'postgres',
    port: 5432,  // El puerto por defecto de PostgreSQL
    logging: false, // Opcional: desactivar logs de SQL
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Para evitar problemas con SSL
        },
    },
});

// Conexión para usarla en otros módulos
export default sequelize;