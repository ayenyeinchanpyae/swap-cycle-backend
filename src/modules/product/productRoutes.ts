import express from 'express';
import multer from 'multer';
import { add, index, get, update, remove, getByUser } from './productController';

const router = express.Router();
const fileUpload = multer({ dest: 'uploads/' }); // The same Multer configuration as used in the controller
const upload = multer();

router.post('/add', fileUpload.single('imageUrl'), add);
router.get('/', index);
router.get('/:productId', get);
router.put('/:productId', fileUpload.single('imageUrl'), update);
router.delete('/:productId', remove);
router.get('/user/:userId', getByUser);
//router.post('/upload', fileUpload.single('image'), upload);
export default router;
