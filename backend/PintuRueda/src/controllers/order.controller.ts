import { Request, Response } from 'express';
import { Pedido as Order } from '../models/pedido.model';

export class OrderController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { id_cliente, fecha_pedido, estado } = req.body;

        try {
            const newOrder = await Order.create({ id_cliente, fecha_pedido, estado });
            res.status(201).json({ message: 'Pedido creado exitosamente', order: newOrder });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el pedido', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los pedidos', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el pedido', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { id_cliente, fecha_pedido, estado } = req.body;

        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }

            order.id = id_cliente;
            order.fecha_pedido = fecha_pedido;
            order.estado = estado;
            await order.save();

            res.json({ message: 'Pedido actualizado exitosamente', order });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el pedido', error });
        }
    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }

            await order.destroy();
            res.json({ message: 'Pedido eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el pedido', error });
        }
    }
}
