import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookGrid from './BookGrid';
import BookDetail from './BookDetail';
import Book from '../interfaces/Book'

const BookSearch = () => {
  const [books, setBooks] = useState([] as Book[]);
  const [selectedBook, setSelectedBook] = useState({} as Book);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get('http://localhost:3000/api/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  };

  const handleBookClick = (book:Book) => {
    setSelectedBook(book);
  };

  return (
    <div>
      <h1>Book Search</h1>
      {selectedBook.id != undefined ? (
        <BookDetail book={selectedBook} />
      ) : (
        <BookGrid books={books} onBookClick={handleBookClick} />
      )}
    </div>
  );
};

export default BookSearch;
