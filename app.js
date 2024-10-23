const express = require('express');
// console.log(1)
const bodyParser = require('body-parser');
// console.log(2)
const transactionRoutes = require('./routes/transactionRoutes');
// console.log(3)
const app = express();
// console.log(4)

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', transactionRoutes);

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
