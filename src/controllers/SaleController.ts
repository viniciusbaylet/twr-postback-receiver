import { SaleService } from "../services/SaleService";
import { Request, Response } from 'express';

export class SaleController {
    private saleService: SaleService;

    constructor() {
        this.saleService = new SaleService();

        this.receivedWebhook = this.receivedWebhook.bind(this);
        this.getReport = this.getReport.bind(this);
    }

    async receivedWebhook(req: Request, res: Response) {
        try {
            const sale = await this.saleService.processWebhook(req.body);

            return res.status(201).json({
                message: 'Postback processado e salvo com sucesso',
                saleId: sale.id,
            });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao processar webhook'})
        }
    }

    async getReport(req: Request, res: Response) {
        try {
            const report = await this.saleService.getSalesReport();
            return res.status(200).json(report);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno ao gerar relatório.'})
        }
    }

}