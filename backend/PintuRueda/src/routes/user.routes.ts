import { Router } from 'express';
import { UserController } from '../controllers/user.controller'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { AuthMiddleware } from '../middleware/auth.middleware';
export class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/register', UserController.register); // Registrar usuario
        this.router.post('/login', UserController.login);
        this.router.get('/logout', AuthMiddleware.authenticate, UserController.logout);
        this.router.put('/:id', UserController.update); // Actualizar usuario
        this.router.get('/profile', AuthMiddleware.authenticate, UserController.profile);
        this.router.post('/', AuthMiddleware.authenticate, UserController.create);
        this.router.delete('/:id', AuthMiddleware.authenticate, UserController.delete);
        this.router.get('/', AuthMiddleware.authenticate, UserController.getAll);
        this.router.get('/:id', AuthMiddleware.authenticate, UserController.getById);
    }
}

