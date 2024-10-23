const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database or open an existing one
const db = new sqlite3.Database('./database/expenseTracker.db');

// Function to create the transactions table
const createTransactionsTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,  -- 'income' or 'expense'
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        );`;
    db.run(query, (err) => {
        if (err) {
            return console.error("Error creating transactions table:", err.message);
        }
        console.log("Transactions table created successfully");
    });
};

// Function to create the categories table
const createCategoriesTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL  -- 'income' or 'expense'
        );`;
    db.run(query, (err) => {
        if (err) {
            return console.error("Error creating categories table:", err.message);
        }
        console.log("Categories table created successfully");
    });
};

const addData=()=>{
    const query=`
    INSERT INTO transactions (type, category, amount, date, description) VALUES ('income', 'Salary', 3000.00, '2024-10-01', 'October Salary'),('expense', 'Rent', 1200.00, '2024-10-02', 'Apartment Rent'),('expense', 'Food', 150.00, '2024-10-03', 'Grocery Shopping'),('income', 'Freelance', 500.00, '2024-10-04', 'Freelance Job'),('expense', 'Utilities', 100.00, '2024-10-05', 'Electricity Bill'),('expense', 'Shopping', 75.00, '2024-10-06', 'New Shoes');
    `;
    db.run(query, (err)=>{
        if(err){
            return console.error("Error while creating database", err.message);
        }
        console.log("Data added successfully to transactions")
    })
}

const addData1=()=>{
    const query=`
    INSERT INTO categories (name, type) VALUES ('Salary', 'income'),('Freelance', 'income'),('Food', 'expense'),('Rent', 'expense'),('Utilities', 'expense'),('Shopping', 'expense'),('Interest', 'income');
    `;
    db.run(query, (err)=>{
        if(err){
            return console.error("Error while creating database", err.message);
        }
        console.log("Data added successfully to transactions")
    })
}

const selectAllTransactions = () => {
    db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('All Transactions:');
        rows.forEach((row) => {
            console.log(row);
        });
    });
};

// Initialize the database by creating tables
const initializeDatabase = () => {
    // createTransactionsTable();
    // createCategoriesTable();
    // addData();
    // addData1();
    selectAllTransactions();
};

initializeDatabase();

// Close the database connection after initialization
db.close((err) => {
    if (err) {
        return console.error("Error closing the database:", err.message);
    }
    console.log("Database connection closed");
});
