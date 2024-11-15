import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthMiddleware {
    public static authenticate(req: Request, res: Response, next: NextFunction): void {
        const token = req.cookies.auth_token
        if (!token) {
            res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto')
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ message: 'Token inválido.' });
        }
    }
}
