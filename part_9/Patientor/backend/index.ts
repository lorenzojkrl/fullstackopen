// import express from 'express';
const express require('express');

const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged patientor');
  res.send('pongtor');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});