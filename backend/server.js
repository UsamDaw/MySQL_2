const cors = require('cors');

const express = require('express');
const booksRouter = require('./routes/books');  // Importer books-router
const app = express();
const port = 3001;

// Middleware for å parse JSON-requests
app.use(express.json());
app.use(cors());
// Bruk books-router for håndtering av bok-relaterte ruter
app.use('/books', booksRouter);

// Start serveren
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
