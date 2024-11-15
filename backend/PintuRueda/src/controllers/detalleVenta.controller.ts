import { Request, Response } from 'express';
import { DetalleVenta as SaleDetail } from '../models/detalleVenta.model'; // Ajusta la ruta según tu estructura

export class SaleDetailController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { id_venta, id_producto, cantidad, precio_unitario, subtotal } = req.body;

        try {
            const newSaleDetail = await SaleDetail.create({ id_venta, id_producto, cantidad, precio_unitario, subtotal });
            res.status(201).json({ message: 'Detalle de la venta creado exitosamente', saleDetail: newSaleDetail });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el detalle de la venta', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const saleDetails = await SaleDetail.findAll();
            res.json(saleDetails);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los detalles de la venta', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const saleDetail = await SaleDetail.findByPk(id);
            if (!saleDetail) {
                return res.status(404).json({ message: 'Detalle de la venta no encontrado' });
            }
            res.json(saleDetail);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el detalle de la venta', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { id_venta, id_producto, cantidad, precio_unitario, subtotal } = req.body;

        try {
            const saleDetail = await SaleDetail.findByPk(id);
            if (!saleDetail) {
                return res.status(404).json({ message: 'Detalle de la venta no encontrado' });
            }

            saleDetail.id_venta = id_venta;
            saleDetail.id_producto = id_producto;
            saleDetail.cantidad = cantidad;
            saleDetail.precio_unitario = precio_unitario;
            saleDetail.subtotal = subtotal;
            await saleDetail.save();

            res.json({ message: 'Detalle de la venta actualizado exitosamente', saleDetail });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el detalle de la venta', error });
        }
    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const saleDetail = await SaleDetail.findByPk(id);
            if (!saleDetail) {
                return res.status(404).json({ message: 'Detalle de la venta no encontrado' });
            }

            await saleDetail.destroy();
            res.json({ message: 'Detalle de la venta eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el detalle de la venta', error });
        }
    }
}
