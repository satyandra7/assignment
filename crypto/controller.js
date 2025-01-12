//To handle the routes requests here

const  Crypto  = require('./model');

const getCryptoData = async (req, res) => {
    try {
        const cryptoData = await Crypto.find();
        res.status(200).json(cryptoData);
    } catch (error) {
        res.status(500).json({ error : 'Error fetching data from the database' });
    }
}

const getCryptoDataByCoin = async (req, res) => {
    try {
        const {coin} = req.body;

        // Check if the coin parameter is provided
        if (!coin) {
            return res.status(400).json({ error: 'Coin parameter is required' });
        }
        // Check if the coin parameter is a valid string
        if (typeof coin !== 'string' || coin.trim() === '') {
            return res.status(400).json({ error: 'Coin parameter must be a valid non-empty string' });
        }

        // Check if the coin parameter is one of the allowed values
        const allowedCoins = ['bitcoin', 'ethereum', 'matic'];
        if (!allowedCoins.includes(coin)) {
            return res.status(400).json({ error: 'Coin parameter must be one of: bitcoin, ethereum, matic' });
        }

        const cryptoData = await Crypto.findOne({id : coin}).sort({createdAt : -1});
        if (!cryptoData) {
            return res.status(404).json({ error: `No data found for coin: ${coin}` });
        }

        const customizedResponse = {
            id: cryptoData.id,
            current_price: cryptoData.current_price,
            market_cap: cryptoData.market_cap,
            price_change_24h: cryptoData.price_change_24h,
            createdAt: cryptoData.createdAt,
            updatedAt: cryptoData.updatedAt,
        };

        res.status(200).json(customizedResponse);
    } catch (error) {
        res.status(500).json({ error : `Error fetching data with id :${id} from the database` });
    }
}

const getCryptoDataByDeviation = async (req, res) => {
    try {
       const { coin } = req.body;
       
       // Check if the coin parameter is provided
       if (!coin) {
           return res.status(400).json({ error: 'Coin parameter is required' });
       }
       // Check if the coin parameter is a valid string
       if (typeof coin !== 'string' || coin.trim() === '') {
           return res.status(400).json({ error: 'Coin parameter must be a valid non-empty string' });
       }

       // Check if the coin parameter is one of the allowed values
       const allowedCoins = ['bitcoin', 'ethereum', 'matic'];
       if (!allowedCoins.includes(coin)) {
           return res.status(400).json({ error: 'Coin parameter must be one of: bitcoin, ethereum, matic' });
       }

       const cryptoData = await Crypto.find({ id: coin }).sort({ createdAt: -1 }).limit(100);

       // Extract the current_price values
       const prices = cryptoData.map(item => item.current_price);

       // Calculate the mean (average)
       const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;

       // Calculate the variance
       const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;

       // Calculate the standard deviation
       const standardDeviation = Math.sqrt(variance);

       res.status(200).json({ standardDeviation });

    } catch (error) {
        res.status(500).json({ error : 'Error fetching data from the database' });
    }   
}

module.exports = { getCryptoData, getCryptoDataByCoin, getCryptoDataByDeviation };
