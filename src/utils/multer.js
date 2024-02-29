
const multer = require("multer");
const path = require("path");

// Define multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/resume");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const txtFileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
        cb(null, true);
    } else {
        cb(new Error('Only .txt files are allowed!'), false);
    }
};

// Initialize multer upload middleware
const initializeUpload = () => {
    return multer({ storage: storage, fileFilter: txtFileFilter }).single('filename');
};

module.exports = initializeUpload
