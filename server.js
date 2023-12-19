const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3001;

// Configure middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// Configure database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rohit@123',
    database: 'YogaClasses',
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// ...

// API endpoint to handle form submission
// API endpoint to handle form submission
app.post('/submitForm', (req, res) => {
    // Validate form data (add more validation as needed)
    const { firstName, lastName, age, selectedBatch } = req.body;
    if (!firstName || !lastName || age <= 0 || !selectedBatch) {
        return res.status(400).json({ error: 'Invalid form data' });
    }

    // Insert form data into the database
    const insertQuery = 'INSERT INTO Participants (FirstName, LastName, Age, SelectedBatch) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [firstName, lastName, age, selectedBatch], (insertError, result) => {
        if (insertError) {
            console.error('Error inserting data into the database:', insertError);
            return res.status(500).json({ error: 'Internal server error', details: insertError.message });
        }

        // Simulate a successful payment response
        const paymentResponse = { status: 'success', message: 'Payment successful' };

        // Send the payment response to the frontend
        res.json({ success: true, paymentResponse });
    });
});


// ...


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
