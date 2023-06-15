import React from 'react';
import Book from '../interfaces/Book'

const BookDetail: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
    </div>
  );
};

export default BookDetail;
