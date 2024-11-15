import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import UploadFilesToCloudinary from '../middleware/upload.middleware';
import multer from 'multer';
export class ProductRoutes {
    public router: Router;
    public upload = multer({ dest: 'uploads/' });
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', AuthMiddleware.authenticate, UploadFilesToCloudinary.uploadSingleImage, UploadFilesToCloudinary.uploadSingleFile('pinturas'), ProductController.create);
        this.router.get('/', ProductController.getAll);
        this.router.get('/:id', ProductController.getById);
        this.router.put('/:id', AuthMiddleware.authenticate,this.upload.single('image'),ProductController.update);
        this.router.delete('/:id', AuthMiddleware.authenticate, ProductController.delete);
    }
}
