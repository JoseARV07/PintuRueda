import { Request, Response } from 'express';
import { Carrito as Cart } from '../models/carrito.model';
import { User } from '../models/user.model';

export class CartController {
    public static async create(req: Request, res: Response): Promise<any> {
        const { id_user, estado } = req.body;

        try {
            const newCart = await Cart.create({ id_user, estado });
            res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el carrito', error });
        }
    }

    public static async findUserCart(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        try {
            const cart = await Cart.findOne({ where: { id_user: id } });
            if(cart){
               return res.status(201).json({cart,status:201});
            }

            return res.status(404).json({ message: 'Carrito del usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el carrito del usuario', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const carts = await Cart.findAll({
                include: [
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'email'],
                    },
                ],
            });
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los carritos', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const cart = await Cart.findByPk(id);
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el carrito', error });
        }
    }

    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { id_user, estado } = req.body;

        try {
            const cart = await Cart.findByPk(id);
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            cart.id_user = id_user;
            cart.estado = estado;
            await cart.save();

            res.json({ message: 'Carrito actualizado exitosamente', cart });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el carrito', error });
        }
    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const cart = await Cart.findByPk(id);
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            await cart.destroy();
            res.json({ message: 'Carrito eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el carrito', error });
        }
    }
}
