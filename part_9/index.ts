import express = require('express');
// import express from 'express';
const app = express();

// Adding _ in front of an unused variable to silence warning
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});