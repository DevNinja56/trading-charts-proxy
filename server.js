const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/bitfinex-candles-trade-api', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.bitfinex.com/v2/candles/trade:1m:tBTCUSD/hist?limit=1000'
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/bitfinex-order-book-api', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.bitfinex.com/v1/book/btcusd'
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
