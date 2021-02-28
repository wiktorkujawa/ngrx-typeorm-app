import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import GridFsStorage from 'multer-gridfs-storage';

export class MulterService {
  initStorage(url: string, bucketName: string) {
    return new GridFsStorage({
      url: url,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      file: (_req: any, file: any) => {
        return new Promise((resolve: any, reject: any) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename =
              buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: bucketName,
            };
            resolve(fileInfo);
          });
        });
      },
    });
  }

  initUpload(storage: any) {
    return multer({
      storage: storage,
      fileFilter: function (_req, file, callback) {
        const ext = path.extname(file.originalname);
        if (
          ext !== '.png' &&
          ext !== '.jpg' &&
          ext !== '.gif' &&
          ext !== '.jpeg'
        ) {
          return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
      },
    });
  }
}
