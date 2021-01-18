import express = require('express');
// import express from 'express';
const app = express();

// Adding _ in front of an unused variable to silence warning
app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});