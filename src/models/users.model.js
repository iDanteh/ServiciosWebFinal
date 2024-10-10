import { Model, DataTypes} from 'sequelize';
import sequelize from '../database/database.js';

// Modelo para usuarios
class User extends Model{}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
},
{
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at', // Define cuál columna es el createdAt
    updatedAt: 'updated_at', // Define cuál columna es el updated_at
    schema: 'public'
}
);

sequelize.sync()
    .then(() => {
        console.log('La tabla Users ha sido creada o ya existe');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos: Desde Users', error);
    });

export default User;