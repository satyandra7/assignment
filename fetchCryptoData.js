const axios = require('axios');
const Crypto = require('./crypto/model');

const CRYPTO_API_URL = 'https://api.coingecko.com/api/v3';

const fetchCryptoData = async (apiKey) => {
    const currency = 'usd';
    const ids = 'bitcoin,ethereum,matic';

    const options = {
        method: 'GET',
        url: `${CRYPTO_API_URL}/coins/markets?vs_currency=${currency}&ids=${ids}`,
        headers: {
            'Content-Type': 'application/json',
            'x-cg-demo-api-key': apiKey
        }
    };

    try {
        const response = await axios(options);
        const data = response.data;
        for (const item of data) {
            const crypto = new Crypto({
                id: item.id,
                name: item.name,
                current_price: item.current_price,
                market_cap: item.market_cap,
                price_change_24h: item.price_change_24h
            });
            await crypto.save();
            console.log(`Saved ${item.name} to the database`);
        }
    } catch (err) {
        console.error('Failed to fetch data from the CoinGecko API', err.message);
    }
};

module.exports = { fetchCryptoData };