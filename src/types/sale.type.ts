export type SaleStatus = 'approved' | 'pending' | 'refused';

// Interface para os dados que chegam do webhook 
export interface CreateSale {
  transactionId: string;
  customerEmail: string;
  amount: number;
  currency?: string;
  status?: SaleStatus;
}

// Interface para o formato de retorno da venda 
export interface SaleResponse {
  id: string;
  transactionId: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: string;
  receivedAt: Date;
}