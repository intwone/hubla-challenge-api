import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

export const multerConfig = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'temp'),
    filename(_, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
};
