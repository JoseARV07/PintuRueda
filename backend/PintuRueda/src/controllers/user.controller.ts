import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user.model'; // Ajusta la ruta según tu estructura de proyecto

export class UserController {
    public static async register(req: Request, res: Response): Promise<any> {
        const { nombre, email, password,role,direccion,telefono } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                nombre,
                email,
                role,
                direccion,
                telefono,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Usuario registrado exitosamente', user:{
                id: newUser.id,
                nombre: newUser.nombre,
                email: newUser.email,
                role: newUser.role
            } });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario', error });
        }
    }

    public static async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const token = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email, role: user.role }, process.env.JWT_SECRET || 'tu_secreto', {
                expiresIn: '1h',
            });

            res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV === 'production' ? true : false });

            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    }

    public static async logout(req: Request, res: Response): Promise<any> {
        res.clearCookie('auth_token');
        res.json({ message: 'Sesión cerrada exitosamente' });
    }


    public static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { nombre, email, password, role } = req.body;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            user.nombre = nombre;
            user.email = email;
            user.role = role;
            await user.save();

            res.status(201).json({ message: 'Usuario actualizado exitosamente', user });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario', error });
        }
    }

    public static async profile(req: Request, res: Response): Promise<any> {
        const user = req.user;

        try {
            res
                .status(200)
                .json({ authorized: true, message: "Acceso permitido", user });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el perfil del usuario', error });
        }

    }

    public static async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const userRole = req.user;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if ((userRole as JwtPayload).role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permisos para eliminar este usuario' });
            }

            await user.destroy();
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario', error });
        }
    }

    
    public static async create(req: Request, res: Response): Promise<any> {
        const { nombre, email, password,role,direccion,telefono } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                nombre,
                email,
                role,
                direccion,
                telefono,
                password: hashedPassword,
            });

            res.status(201).json({ message: 'Usuario registrado exitosamente', user:{
                id: newUser.id,
                nombre: newUser.nombre,
                email: newUser.email,
                role: newUser.role
            } });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario', error });
        }
    }

    // // Obtener todos los usuarios
    public static async getAll(req: Request, res: Response): Promise<any> {
        try {
            if ((req.user as JwtPayload).role !== 'admin') {
                res.status(403).json({ message: 'No tienes permisos para obtener todos los usuarios' });
      
            }else{
                const users = await User.findAll({});
                res.status(200).json({ users });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios', error });
        }
    }

    // Obtener un usuario por ID
    public static async getById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }
}
