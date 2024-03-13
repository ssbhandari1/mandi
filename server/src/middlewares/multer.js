const multer = require('multer');
const {v4:uuid} = require('uuid')
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        const id =uuid()
        const extname = file.originalname.split('.').pop();
        callback(null, `${id}.${extname}`);
    }

})

const singleUpload = multer({storage}).single("photo")

module.exports = singleUpload