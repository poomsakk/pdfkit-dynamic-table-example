import express from 'express';
import { genBill } from './gen-bill';
import mockData from './mockData';

const server = express();
const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
  console.log(`Bill generation endpoint: http://localhost:${PORT}/bill`);
});

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/bill', (req, res) => {
  const buffer = genBill(mockData);
  res.setHeader('Content-Type', 'application/pdf');
  buffer.pipe(res);
});
