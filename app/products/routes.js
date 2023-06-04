const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require('./controller');

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.post('/product/', upload.single('avatar'), productController.store);
router.put('/product/:id', upload.single('avatar'), productController.update);
router.delete('/product/:id', upload.single('avatar'), productController.destroy);

module.exports = router;