/* 
 * Upload de arquivos. Filename salva como .jpg
 * O armazenamento é feito em disco em <dir>/public/images/<filename.jpg>
 */

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, __dirname + '/../public/images'),
    filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.jpg')
});

const upload = multer({ storage });

module.exports = upload;