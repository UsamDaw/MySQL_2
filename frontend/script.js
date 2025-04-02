// Funksjon for å hente bøker fra backend
function fetchBooks() {
    fetch('http://localhost:3001/books')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('books-list');
            booksList.innerHTML = ''; // Tømmer listen før vi legger til nye bøker

            data.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${book.title} - ${book.author} - ${book.genre} - Status: ${book.status}
                    <button onclick="editBook(${book.id}, '${book.title}', '${book.author}', '${book.genre}', '${book.status}')">Rediger</button>
                    <button onclick="deleteBook(${book.id})">Slett</button>
                    ${book.status === 'Tilgjengelig' 
                        ? `<button onclick="markAsBorrowed(${book.id})">Lån bok</button>`
                        : `<button onclick="markAsAvailable(${book.id})">Returner bok</button>`
                    }
                `;
                booksList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Feil ved henting av bøker:', error);
        });
}

// Funksjon for å legge til en bok
const form = document.getElementById('add-book-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Bok lagt til:', data);
        fetchBooks(); // Hent oppdaterte bøker etter innsending
        form.reset(); // Tømmer skjemaet etter innsending
    })
    .catch(error => {
        console.error('Feil ved innsending av bok:', error);
    });
});

// Funksjon for å markere en bok som utlånt
function markAsBorrowed(bookId) {
    fetch(`http://localhost:3001/books/${bookId}/borrow`, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Bok markert som utlånt:', data);
        fetchBooks(); // Hent oppdaterte bøker etter statusendring
    })
    .catch(error => {
        console.error('Feil ved markering av bok som utlånt:', error);
    });
}

// Funksjon for å markere en bok som tilgjengelig
function markAsAvailable(bookId) {
    fetch(`http://localhost:3001/books/${bookId}/available`, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Bok markert som tilgjengelig:', data);
        fetchBooks(); // Hent oppdaterte bøker etter statusendring
    })
    .catch(error => {
        console.error('Feil ved markering av bok som tilgjengelig:', error);
    });
}

// Funksjon for å redigere en bok
function editBook(id, title, author, genre, status) {
    const modal = document.getElementById('edit-book-modal');
    const editForm = document.getElementById('edit-book-form');
    
    document.getElementById('edit-book-id').value = id;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-author').value = author;
    document.getElementById('edit-genre').value = genre;
    document.getElementById('edit-status').value = status;
    
    modal.style.display = 'block';
}

// Funksjon for å sende redigert bok
document.getElementById('edit-book-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('edit-book-id').value;
    const title = document.getElementById('edit-title').value;
    const author = document.getElementById('edit-author').value;
    const genre = document.getElementById('edit-genre').value;
    const status = document.getElementById('edit-status').value;
    
    fetch(`http://localhost:3001/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre, status }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Bok oppdatert:', data);
        fetchBooks(); // Hent oppdaterte bøker
        document.getElementById('edit-book-modal').style.display = 'none';
    })
    .catch(error => {
        console.error('Feil ved oppdatering av bok:', error);
    });
});

// Funksjon for å slette en bok
function deleteBook(bookId) {
    fetch(`http://localhost:3001/books/${bookId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Bok slettet:', data);
        fetchBooks(); // Hent oppdaterte bøker etter sletting
    })
    .catch(error => {
        console.error('Feil ved sletting av bok:', error);
    });
}

// Modal lukking
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('edit-book-modal').style.display = 'none';
});

// Kall fetchBooks for å laste bøker når siden lastes
window.onload = fetchBooks;