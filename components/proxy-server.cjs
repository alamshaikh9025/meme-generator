const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001; // You can use any port you prefer

app.use(cors());

// Define the /proxy-image endpoint
app.get('/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url;

    // Fetch the image from the external URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Set the appropriate response headers for an image
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Length', imageBuffer.length);

    // Send the image data as the response
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
