import { Model, DataTypes} from 'sequelize';
import sequelize from '../database/database.js';
import Category from './category.model.js';
import Company from './company.model.js';

class Product extends Model{}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Company,
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Category,
          key: 'id'
        }
      },
      image_url: {
        type: DataTypes.STRING,
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
        modelName: 'Product',
        freezeTableName: true,
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at', // Define cuál columna es el createdAt
        updatedAt: 'updated_at', // Define cuál columna es el updated_at
        schema: 'public'
    });

    sequelize.sync()
    .then(() => {
        console.log('La tabla Product ha sido creada o ya existe');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos: Desde Product', error);
    });

export default Product;