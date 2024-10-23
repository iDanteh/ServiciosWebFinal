import { Model, DataTypes} from 'sequelize';
import sequelize from '../database/database.js';

class Category extends Model{}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
        sequelize,
        modelName: 'Category',
        freezeTableName: true,
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at', // Define cuál columna es el createdAt
        updatedAt: 'updated_at', // Define cuál columna es el updated_at
        schema: 'public'
    });

    sequelize.sync()
    .then(() => {
        console.log('La tabla Category ha sido creada o ya existe');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos: Desde Category', error);
    });

export default Category;