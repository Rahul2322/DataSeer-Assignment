const express = require('express');
const router = express.Router();
const { wrapper } = require("../utils/errorWrap")
const expressValidator = require("../middleware/validationError")
const { verifyTokenMiddleware } = require("../middleware/checkAuth")
const {checkRolePermission} = require("../middleware/checkRolePermission")
const { addRole, register, login, logout, uploadResume, emailSend, changePassword, getAllRegisterUser, readResume, removeFile, getFileList } = require("../controller/user");
const { userValidation } = require('../validation/register');



router.post('/role', verifyTokenMiddleware, wrapper(addRole));
router.post('/register', userValidation, expressValidator, (register))
router.post('/login', wrapper(login))
router.post("/forgot-password", wrapper(emailSend))
router.post('/changePassword', wrapper(changePassword))
router.delete('/logout', verifyTokenMiddleware, wrapper(logout))
router.post("/resume", verifyTokenMiddleware, wrapper(uploadResume));
router.get('/register/user', verifyTokenMiddleware, wrapper(getAllRegisterUser))
router.get('/read-resume', verifyTokenMiddleware, wrapper(readResume))
router.delete('/remove-file/', verifyTokenMiddleware, wrapper(removeFile))  
router.get('/file-list', verifyTokenMiddleware, wrapper(getFileList))   

module.exports = router;
