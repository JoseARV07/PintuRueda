import { Request, Response } from 'express';
import { Venta } from '../models/venta.model'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

export class VentaController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { id_user, id_producto, cantidad, precioTotal } = req.body;

        try {
            const newVenta = await Venta.create({ id_user, id_producto, cantidad, precioTotal });
            res.status(201).json({ message: 'Venta creada exitosamente', venta: newVenta });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la venta', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const ventas = await Venta.findAll();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las ventas', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la venta', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { id_user, id_producto, cantidad, precioTotal } = req.body;

        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }

            venta.id_user = id_user;
            venta.id_producto = id_producto;
            venta.cantidad = cantidad;
            venta.precioTotal = precioTotal;
            await venta.save();

            res.json({ message: 'Venta actualizada exitosamente', venta });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la venta', error });
        }
    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const venta = await Venta.findByPk(id);
            if (!venta) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }

            await venta.destroy();
            res.json({ message: 'Venta eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la venta', error });
        }
    }
}
