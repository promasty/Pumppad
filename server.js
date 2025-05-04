const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/api/tokens', async (req, res) => {
  try {
    const response = await axios.get('https://pepuscan.com/api/tokens');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
});

app.listen(3001, () => {
  console.log('Proxy server running at http://localhost:3001');
});
