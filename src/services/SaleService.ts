import { SaleRepository } from "../repositories/SaleRepository";
import { CreateSale } from "../types/sale.type";

export class SaleService {
    private saleRepository: SaleRepository;

    constructor() {
        this.saleRepository = new SaleRepository();
    }

    async processWebhook(payload: CreateSale) {
        if (!payload || !payload.transactionId || !payload.amount) {
            throw new Error('Payload inválido. Os campos transactionId e amount são obrigatórios.');
        }

        const existingSale = await this.saleRepository.findByTransactionId(payload.transactionId);

        if(existingSale) {
            return existingSale;
        }

        return await this.saleRepository.create(payload);
    }

    async getSalesReport() {
        const sales = await this.saleRepository.findAll();

        const totalSalesCount = sales.length;
        const totalApprovedRevenue = sales
        .filter((sale) => sale.status === 'approved')
        .reduce((acc, sale) => acc + sale.amount, 0);

        return {
            summary: {
                totalSalesCount,
                totalApprovedRevenue,
                currency: 'BRL',
            },
            data: sales
        }
    }
}