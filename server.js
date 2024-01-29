const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors());

app.get('/bitfinex-candles-trade-api/:selectedPair/:timeFrame', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.bitfinex.com/v2/candles/trade:${req.params.timeFrame}:t${req.params.selectedPair}/hist?limit=1000`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/bitfinex-order-book-api/:selectedPair', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.bitfinex.com/v1/book/${req.params.selectedPair}`
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
