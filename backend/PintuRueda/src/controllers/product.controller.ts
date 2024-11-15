import { Request, Response } from 'express';
import { Producto as Product } from '../models/producto.model';
import cloudinary from '../libs/cloudinary.config';

export class ProductController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { nombre, descripcion, precio, stock, tipo_producto, fecha_agregado, codigo, categoria } = req.body;
        try {
            const newProduct = await Product.create({ nombre, descripcion, precio, stock, tipo_producto, codigo, categoria, imagen:req.body.imageUrl });
            res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el producto', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, tipo_producto, fecha_agregado, codigo, categoria } = req.body;
        let imagenUrl = req.body.imagenUrl;

        console.log(req.body,imagenUrl);
        
    
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
    
            // Si se proporciona una nueva imagen, sube la imagen a Cloudinary
            if (req.file) {
                // Si ya existe una imagen, elimina la anterior de Cloudinary
                if (product.imagen) {
                    const publicId = product.imagen.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId); // Elimina la imagen antigua
                    }
                }
                // Subir la nueva imagen a Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'pinturas', // Puedes cambiar la carpeta si lo necesitas
                    use_filename: true,
                });
    
                imagenUrl = result.secure_url; // Guardar la URL de la imagen subida
            }
    
            // Actualizar los campos del producto
            product.nombre = nombre;
            product.descripcion = descripcion;
            product.precio = precio;
            product.stock = stock;
            product.tipo_producto = tipo_producto;
            product.codigo = codigo;
            product.categoria = categoria;
            product.imagen = imagenUrl || product.imagen; // Si no se ha proporcionado una nueva imagen, mantiene la actual
    
            await product.save(); // Guardar los cambios
    
            res.status(200).json({ message: 'Producto actualizado exitosamente', product });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto', error });
        }
    }
    

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            await product.destroy();
            res.json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto', error });
        }
    }
}
