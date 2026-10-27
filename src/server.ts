import express from 'express';
import cors from 'cors';
import saleRouter from './routes/sale.routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Registra rotas
app.use(saleRouter);

app.listen(PORT, () => {
    console.log('Server is running...');
});