import { Model, DataTypes} from 'sequelize';
import sequelize from '../database/database.js';
import User from './users.model.js';

class Company extends Model{}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    company_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    company_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
{
    sequelize,
    modelName: 'Company',
    freezeTableName: true,
    tableName: 'companies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    schema: 'public'
}
);

sequelize.sync()
    .then(() => {
        console.log('La tabla Companies ha sido creada o ya existe');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos: Desde Company', error);
    });

export default Company;