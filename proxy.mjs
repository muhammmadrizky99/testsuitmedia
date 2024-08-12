import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('Missing URL parameter');
    }

    try {
        const response = await fetch(url);
        const contentType = response.headers.get('content-type');
        const buffer = await response.buffer();
        res.setHeader('Content-Type', contentType);
        res.send(buffer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
