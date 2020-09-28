import React, { useState, useEffect } from 'react';

const BooksList = () => {
    const [books, updateBooks] = useState([]);

    useEffect(function effectFunction() {
        fetch('http://hp-api.herokuapp.com/api/characters')
            .then(response => response.json())
            .then(({ data: books }) => {
                updateBooks(books);
                console.log(books)
            });
        console.log(books)
    }, []);

    return (
        <ul>
            {/* {books.map(book => (
                <li key={book.name}>{book.name}</li>
            ))} */}
        </ul>
    );
}

export default BooksList;