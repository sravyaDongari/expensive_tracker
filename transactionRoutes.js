const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
console.log(1)
// Connect to the SQLite database
// const db = new sqlite3.Database('../../database/expenseTracker.db');
const path = require('path');
const dbPath = path.join(__dirname, '../../database/expenseTracker.db');
console.log(`Connecting to database at: ${dbPath}`);
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});
// const db = new sqlite3.Database(dbPath);
console.log(2)
// 1. POST /transactions - Add a new transaction
router.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [type, category, amount, date, description], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ transactionId: this.lastID });
    });
});
console.log(3)
// 2. GET /transactions - Get all transactions
router.get('/transactions', (req, res) => {
    db.all("SELECT * FROM transactions", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ transactions: rows });
    });
});
console.log(4)
// 3. GET /transactions/:id - Get transaction by ID
router.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM transactions WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Transaction not found" });
        res.json(row);
    });
});
console.log(5)
// 4. PUT /transactions/:id - Update a transaction by ID
router.put('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;
    const query = `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`;
    db.run(query, [type, category, amount, date, description, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaction updated" });
    });
});

// 5. DELETE /transactions/:id - Delete a transaction by ID
router.delete('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM transactions WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaction deleted" });
    });
});

// 6. GET /summary - Get transaction summary (income, expenses, balance)
router.get('/summary', (req, res) => {
    const query = `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as totalIncome,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as totalExpenses,
            SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END) as balance
        FROM transactions`;
    db.get(query, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});
console.log(6)
module.exports = router;
