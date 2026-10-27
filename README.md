# TWR Postback Receiver

API desenvolvida em **TypeScript** com arquitetura em camadas, utilizando **Express**, **Prisma ORM** e banco de dados **NeonDB** (PostgreSQL), criada como parte do desafio técnico para a vaga de Estágio em Desenvolvimento Back-end na **The White Rabbit**.

A aplicação tem como objetivo receber webhooks (postbacks) de plataformas de pagamento referentes a vendas e disponibilizar um relatório consolidado dessas transações.

---

## Tecnologias Utilizadas
- **Node.js** com **TypeScript**
- **Express.js** (Framework HTTP)
- **Prisma ORM** (Gerenciamento e migrações de banco de dados)
- **NeonDB** (PostgreSQL Serverless)

---

## Como Acessar a Aplicação em Produção

A API está hospedada e ativa no Render na seguinte URL base:
`https://twr-postback-receiver-api.onrender.com/`

---

## Exemplos de Chamadas (Endpoints)

### 1. Registrar um Webhook de Venda (POST)
Envia os dados da transação para o endpoint de postback.

- **URL:** `POST https://twr-postback-receiver-api.onrender.com/webhook/sales`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "transactionId": "TX-123456789",
  "customerEmail": "comprador@email.com",
  "amount": 199.90,
  "currency": "BRL",
  "status": "approved"
}
```

- **Resposta Esperada (201 Created):**
```json
{
  "message": "Postback processado e salvo com sucesso",
  "saleId": "uuid-gerado-pelo-banco"
}
```

### 2. Consultar o Relatório de Vendas (GET)
Retorna um resumo consolidado contendo o total de vendas, receita total aprovada e a lista completa de transações.

- **URL:** `GET https://twr-postback-receiver-api.onrender.com/reports/sales`
- **Resposta Esperada (200 OK):**
```json
{
  "summary": {
    "totalSalesCount": 1,
    "totalApprovedRevenue": 199.90,
    "currency": "BRL"
  },
  "data": [
    {
      "id": "uuid-gerado-pelo-banco",
      "transactionId": "TX-123456789",
      "customerEmail": "comprador@email.com",
      "amount": 199.90,
      "currency": "BRL",
      "status": "approved",
      "receivedAt": "2026-10-27T21:00:00.000Z"
    }
  ]
}
```

---

## Premissas, Decisões e O que foi deixado de fora

### Premissas e Decisões de Arquitetura:

### 1. Arquitetura em Camadas:
O projeto foi estruturado de forma modular (Routes, Controllers, Services, Repositories), o que garante alta manutenibilidade, testabilidade e escalabilidade, isolando a regra de negócio da camada de infraestrutura/banco de dados.

### 2. Prevenção de Duplicidade:
Plataformas de pagamento reais costumam reenviar webhooks se não receberem uma resposta rápida de sucesso (retentativas). A aplicação valida se o transactionId já existe no banco antes de criar um novo registro, evitando vendas duplicadas.

### 3. Validação de Payload:
O sistema checa se os campos obrigatórios (transactionId e amount) estão presentes, retornando um erro 400 amigável caso a requisição venha malformada.

### 4. Persistência com NeonDB + Prisma:
Optou-se por um banco relacional gerenciado via Prisma ORM para garantir tipagem estrita de ponta a ponta e facilidade nas migrações.

### O que foi decidido não fazer (e por quê):

### 1. Sistema de Filas (Queue / Workers): 
Para o escopo de umdesafio com volume de testes controlado, o processamento síncrono atende perfeitamente. Em um ambiente de escala massiva de produção, o ideal seria introduzir uma fila (como Redis) para processamento assíncrono dos webhooks.

### 2. Autenticação / Assinatura de Webhook: 
Plataformas como Stripe usam chaves secretas e hash no header para validar a autenticidade da requisição. Como o desafio não especificou uma plataforma de checkout-alvo, focou-se na resiliência e tratamento dos dados, omitindo a validação de assinatura para facilitar os testes manuais dos avaliadores.
