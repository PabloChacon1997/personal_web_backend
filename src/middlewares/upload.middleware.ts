import {  Request } from 'express';
import multer from 'multer'


const storage = multer.memoryStorage();

const fileFilter = (req: Request,file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Solo se permiten imagenes'));
  }
  cb(null, true)
}

export const upload = (fieldName: string) => multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single(fieldName);