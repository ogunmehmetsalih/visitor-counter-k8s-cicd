const express = require('express');
const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379,
  },
});

client.on('error', (err) => console.error('Redis Client Error', err));

const app = express();

(async () => {
  await client.connect(); // <--- BU ÇOK ÖNEMLİ
})();

app.get('/', async (req, res) => {
  try {
    const counter = await client.incr('counter');
    res.send(`
      <html>
        <head><title>Visitor Counter</title></head>
        <body>
          <h1>Ziyaret Sayısı: ${counter}</h1>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).send('Redis error');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

