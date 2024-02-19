import express from 'express';
import { add, get, getBySeller } from './orderController';

const router = express.Router();
console.log('order routes')
router.post('/', add);
//get by buyer
router.get('/buyer/:userId', get);
//get buy seller
router.get('/seller/:userId', getBySeller);

export default router;
