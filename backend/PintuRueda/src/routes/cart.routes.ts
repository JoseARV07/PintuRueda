import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

export class CartRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', CartController.create);
        this.router.get('/', CartController.getAll);
        this.router.get('/:id', CartController.getById);
        this.router.put('/:id', CartController.update);
        this.router.delete('/:id', CartController.delete);
        this.router.get('/user/:id', CartController.findUserCart);
    }
}
