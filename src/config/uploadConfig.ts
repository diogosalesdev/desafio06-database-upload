import multer from 'multer';
import path from 'path';

const importFolder = path.resolve('temp');

export default {
  directory: importFolder,
  storage: multer.diskStorage({
    destination: importFolder,
    filename(request, file, callback) {
      return callback(null, file.originalname);
    },
  }),
};
