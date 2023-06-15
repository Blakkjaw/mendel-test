import express from 'express';
import http from 'http';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/books', (req, res) => {
  fs.readFile('./src/assets/MOCK_DATA.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading book data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const books = JSON.parse(data);
      res.json(books);
    } catch (parseError) {
      console.error('Error parsing book data:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
