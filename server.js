const express = require('express');
const redis = require('redis');
const path = require('path');

const app = express();
const client = redis.createClient({ url: 'redis://redis:6379' });

client.connect().catch(console.error);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const count = await client.incr('visits');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/count', async (req, res) => {
    const count = await client.get('visits');
    res.send({ count: count || 0 });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

