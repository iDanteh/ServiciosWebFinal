import Product from '../models/products.model.js';
import Category from '../models/category.model.js';
import Company from '../models/company.model.js';

//Controlador para creación de productos con referencia a las diferentes tablas

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos'});
        console.log(error);
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if(!product){
            return res.status(404).json({ error: 'Producto no encontrado'});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto'});
        console.log(error)
    }
};

export const createProduct = async (req, res) => {
    try {
        // Obtener el company_id del usuario autenticado
        const userId = req.user.id; 
        const company = await Company.findOne({ where: { user_id: userId } });
        
        if (!company) {
            return res.status(404).json({ error: 'Compañía no encontrada para el usuario' });
        }

        const company_id = company.id; // Obtener el ID de la compañía asociada al usuario
        const { name, description, price, stock, category_id, image_url } = req.body;

        // Verificar que la categoría existe
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        // Crear el nuevo producto
        const newProduct = await Product.create({
            company_id,
            name,
            description,
            price,
            stock,
            category_id,
            image_url,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
        console.log(error);
    }
};


// export const createProduct = async (req, res) => {
//     try {
//         const { company_id, name, description, price, stock, category_id, image_url } = req.body;
        
//         // Verificar que la categoría existe
//         const category = await Category.findByPk(category_id);
//         if (!category) {
//             return res.status(404).json({ error: 'Categoría no encontrada' });
//         }
        
//         // Verificar que la compañía existe
//         console.log("company_id recibido:", company_id); // Depurar el ID de la compañía
//         const company = await Company.findByPk(company_id);
//         if (!company) {
//             return res.status(404).json({ error: 'Compañía no encontrada' });
//         }

//         // Crear el nuevo producto
//         const newProduct = await Product.create({
//             company_id,
//             name,
//             description,
//             price,
//             stock,
//             category_id,
//             image_url,
//         });

//         res.status(201).json(newProduct);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al crear el producto' });
//         console.log(error);
//     }
// };



export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if(!product){
            return res.status(404).json({ error: 'Producto no encontrado'});
        }
        const { name, description, price, stock, category_id, image_url } = req.body;
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.category_id = category_id;
        product.image_url = image_url;
        await product.save();
        res.status(200).json({ message: 'Producto actualizado'});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto'});
        console.log(error)
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId);
        if(!product){
            return res.status(404).json({ error: 'Producto no encontrado'});
        }
        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto'});
        console.log(error)
    }
};