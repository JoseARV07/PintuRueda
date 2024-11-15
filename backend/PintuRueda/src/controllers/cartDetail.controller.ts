import { Request, Response } from 'express';
import { DetalleCarrito as CartDetail } from '../models/detalleCarrito.model';
import { Producto } from '../models/producto.model';
import { Carrito } from '../models/carrito.model';

export class CartDetailController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { id_carrito, id_producto, cantidad, subtotal } = req.body;

        try {
            const newCartDetail = await CartDetail.create({ id_carrito, id_producto, cantidad, subtotal });
            res.status(201).json({ message: 'Detalle del carrito creado exitosamente', cartDetail: newCartDetail });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el detalle del carrito', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const cartDetails = await CartDetail.findAll({
                include: [
                    {
                        model: Producto,
                        as: 'producto',
                        attributes: ['id', 'nombre', 'precio', 'imagen'],
                    },
                    {
                        model: Carrito,
                        as: 'carrito',
                        attributes: ['id', 'id_user', 'estado'],
                    }
                ],
            });
            res.status(200).json(cartDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los detalles del carrito', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const cartDetail = await CartDetail.findByPk(id);
            if (!cartDetail) {
                return res.status(404).json({ message: 'Detalle del carrito no encontrado' });
            }
            res.json(cartDetail);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el detalle del carrito', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { id_carrito, id_producto, cantidad, subtotal } = req.body;

        try {
            const cartDetail = await CartDetail.findByPk(id);
            if (!cartDetail) {
                return res.status(404).json({ message: 'Detalle del carrito no encontrado' });
            }

            cartDetail.id_carrito = id_carrito;
            cartDetail.id_producto = id_producto;
            cartDetail.cantidad = cantidad;
            cartDetail.subtotal = subtotal;
            await cartDetail.save();

            res.json({ message: 'Detalle del carrito actualizado exitosamente', cartDetail });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el detalle del carrito', error });
        }
    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const cartDetail = await CartDetail.findByPk(id);
            if (!cartDetail) {
                return res.status(404).json({ message: 'Detalle del carrito no encontrado' });
            }

            await cartDetail.destroy();
            res.json({ message: 'Detalle del carrito eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el detalle del carrito', error });
        }
    }
}
