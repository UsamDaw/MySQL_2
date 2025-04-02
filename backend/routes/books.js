const express = require('express');
const db = require('../db');  // Importer db.js for MySQL-tilkobling
const router = express.Router();

// Hent alle bøker
router.get('/', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Noe gikk galt med å hente bøker' });
        }
        res.json(results);
    });
});

// Legg til en ny bok
router.post('/', (req, res) => {
    const { title, author, genre } = req.body;
    const sql = 'INSERT INTO books (title, author, genre, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, author, genre, 'Available'], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Noe gikk galt med å legge til bok' });
        }
        res.status(201).json({ message: 'Boken ble lagt til!' });
    });
});

// Oppdater en bok
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, status } = req.body;
    const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, status = ? WHERE id = ?';
    db.query(sql, [title, author, genre, status, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Noe gikk galt med å oppdatere bok' });
        }
        res.json({ message: 'Boken ble oppdatert!' });
    });
});

// Markere bok som utlånt
router.put('/:id/borrow', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE books SET status = "Lent" WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Noe gikk galt med å låne bok' });
        }
        res.json({ message: 'Boken er nå utlånt!' });
    });
});

// Markere bok som tilgjengelig
router.put('/:id/available', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE books SET status = "Available" WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Noe gikk galt med å returnere bok' });
        }
        res.json({ message: 'Boken er nå tilgjengelig!' });
    });
});

// Slett en bok
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Noe gikk galt med å slette bok' });
        }
        res.json({ message: 'Boken ble slettet!' });
    });
});

module.exports = router;