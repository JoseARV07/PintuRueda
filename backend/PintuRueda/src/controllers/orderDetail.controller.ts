import { Request, Response } from 'express';
import { DetallePedido as OrderDetail } from '../models/detallePedido.model';

export class OrderDetailController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { id_pedido, id_producto, cantidad, subtotal } = req.body;

        try {
            const newOrderDetail = await OrderDetail.create({ id_pedido, id_producto, cantidad, subtotal });
            res.status(201).json({ message: 'Detalle del pedido creado exitosamente', orderDetail: newOrderDetail });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el detalle del pedido', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const orderDetails = await OrderDetail.findAll();
            res.json(orderDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los detalles del pedido', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const orderDetail = await OrderDetail.findByPk(id);
            if (!orderDetail) {
                return res.status(404).json({ message: 'Detalle del pedido no encontrado' });
            }
            res.json(orderDetail);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el detalle del pedido', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { id_pedido, id_producto, cantidad, subtotal } = req.body;

        try {
            const orderDetail = await OrderDetail.findByPk(id);
            if (!orderDetail) {
                return res.status(404).json({ message: 'Detalle del pedido no encontrado' });
            }

            orderDetail.id_pedido = id_pedido;
            orderDetail.id_producto = id_producto;
            orderDetail.cantidad = cantidad;
            orderDetail.subtotal = subtotal;
            await orderDetail.save();

            res.json({ message: 'Detalle del pedido actualizado exitosamente', orderDetail });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el detalle del pedido', error });
        }
    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const orderDetail = await OrderDetail.findByPk(id);
            if (!orderDetail) {
                return res.status(404).json({ message: 'Detalle del pedido no encontrado' });
            }

            await orderDetail.destroy();
            res.json({ message: 'Detalle del pedido eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el detalle del pedido', error });
        }
    }
}
