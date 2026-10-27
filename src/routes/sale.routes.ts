import { Router } from "express";
import { SaleController } from "../controllers/SaleController";

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post('/webhook/sales', saleController.receivedWebhook);
saleRouter.get('/reports/sales', saleController.getReport);

export default saleRouter;