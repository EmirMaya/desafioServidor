import multer from 'multer'


// destino archivos nombre
// const storage = multer.diskStorage({
//     destination:  function(req, file, cb) {
//         cb(null, `${__dirname}/public/uploads`)
//     },
//     filename: function(req, file, cb) {
//         console.log('file: ',file)
//         cb(null, `${Date.now()}-${file.originalname}`)        
//     }
// })

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const ___dirname = path.dirname(__dirname);


export default __dirname;

//este lo saque de internet, no lo entiendo muy bien.