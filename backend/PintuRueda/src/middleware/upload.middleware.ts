import { Request, Response, NextFunction } from 'express';
import cloudinary from '../libs/cloudinary.config';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export default class UploadFilesToCloudinary {
    // Configuración del almacenamiento en disco (temporal)
    static storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });


    static uploadSingleImage = multer({
        storage: this.storage,
        limits: { fileSize: 1024 * 1024 * 10 }, // Límite de tamaño de 10MB
    }).single('image');

    // Middleware para subir la imagen a Cloudinary
    static uploadSingleFile(folder: string) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const file = req.file as Express.Multer.File;

                if (!file) {
                     res.status(400).json({ error: "No se encontró ninguna imagen para cargar" });
                }

                const filenameWithoutExt = path.parse(file.originalname).name;

                // Subir la imagen a Cloudinary
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: `uploads/${folder}`,
                    public_id: filenameWithoutExt
                });

                req.body.imageUrl = result.secure_url;

                // Eliminar el archivo temporal
                fs.unlinkSync(file.path);

                next();
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: "Error al procesar la imagen" });
            }
        };
    }
}
