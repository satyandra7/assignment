# Cryptocurrency Server Side Application

## Assignment Objective
Develop a server-side application using Node.js and MongoDB to complete the following tasks:

---

## Task 1: Background Job
Implement a background job that will:
- Fetch the following details for 3 cryptocurrencies (Bitcoin, Matic, and Ethereum):
  - Current price in USD
  - Market cap in USD
  - 24-hour change
- Store the fetched data in a MongoDB database.
- Schedule the job to run **once every 2 hours**.

**API Hint:** The relevant API for the above details can be fetched using CoinGecko. Refer to their documentation: [CoinGecko API Documentation](https://docs.coingecko.com/v3.0.1/reference/introduction).

**CoinGecko IDs:**
- Bitcoin: `bitcoin`
- Matic: `matic-network`
- Ethereum: `ethereum`

---

## Task 2: API `/stats`
### Description:
Create an API endpoint that returns the latest data about a requested cryptocurrency.

### Endpoint:
```
GET /stats
```

### Query Parameters:
```json
{
  "coin": "bitcoin" // Could be one of the following: bitcoin, matic-network, ethereum
}
```

### Sample Response:
```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

---

## Task 3: API `/deviation`
### Description:
Create an API endpoint that returns the **standard deviation** of the price of the requested cryptocurrency for the last 100 records stored in the database by the background service.

### Endpoint:
```
GET /deviation
```

### Query Parameters:
```json
{
  "coin": "bitcoin" // Could be one of the following: bitcoin, matic-network, ethereum
}
```

### Sample Response:
For example, if the database contains 3 records for `bitcoin` with prices:
- 40000, 45000, 50000

The response will be:
```json
{
  "standardDeviation": 4082.48
}
```

---

## Setup and Usage Instructions
### Prerequisites:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   ```bash
   mongod
   ```

4. Start the application:
   ```bash
   npm start
   ```

### Testing:
Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.

