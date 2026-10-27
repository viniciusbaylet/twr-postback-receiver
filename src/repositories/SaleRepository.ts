import prisma from "../prisma/client";
import { CreateSale, SaleResponse } from "../types/sale.type";

export class SaleRepository {
    async create(data: CreateSale): Promise<SaleResponse> {
        return await prisma.sale.create({ 
            data: {
                transactionId: data.transactionId,
                customerEmail: data.customerEmail,
                amount: data.amount,
                currency: data.currency || 'BRL',
                status: data.status ?? 'pending'
            }
        });
    }

    async findAll(): Promise<SaleResponse[]> {
        return await prisma.sale.findMany({
            orderBy: { receivedAt: 'desc' }
        });
    }

    async findByTransactionId(transactionId: string): Promise<SaleResponse | null> {
        return await prisma.sale.findUnique({
            where: { transactionId }
        });
    }
} 