import express from 'express';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post('/confirmation', PaymentControllers.confirmationController);

router.post('/failed', PaymentControllers.failuerController);

router.post('/cancel', PaymentControllers.cancelController);

export const PaymentRoutes = router;
