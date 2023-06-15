import React, {useState} from 'react';
import Book from '../interfaces/Book'
import {Table, Pagination} from 'react-bootstrap';

interface BookGridProps {
    books: Book[];
    onBookClick: (book: Book) => void;
  }
  
  interface BookGridProps {
    books: Book[];
    onBookClick: (book: Book) => void;
  }
  
  const BookGrid: React.FC<BookGridProps> = ({ books, onBookClick }) => {
    const handleBookClick = (book: Book) => {
      onBookClick(book);
    };
  
    const itemsPerPage = 10; // Number of items to display per page
    const totalPages = Math.ceil(books.length / itemsPerPage);
  
    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);
  
    // State to store filter values
    const [titleFilter, setTitleFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
  
    // Calculate the start and end index of the books to display based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Filter the books based on the filter values
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
        book.author.toLowerCase().includes(authorFilter.toLowerCase())
    );
  
    // Get the books to display on the current page
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);
  
    // Handle page change
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    // Handle filter changes
    const handleTitleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleFilter(event.target.value);
      setCurrentPage(1); // Reset the current page when filter changes
    };
  
    const handleAuthorFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuthorFilter(event.target.value);
      setCurrentPage(1); // Reset the current page when filter changes
    };
  
    return (
      <div className='container-fluid'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>
                Title
                <br></br>
                <input
                  type="text"
                  value={titleFilter}
                  onChange={handleTitleFilterChange}
                  placeholder="Filter by title"
                />
              </th>
              <th>
                Author
                <br></br>
                <input
                  type="text"
                  value={authorFilter}
                  onChange={handleAuthorFilterChange}
                  placeholder="Filter by author"
                />
              </th>
              <th>Published Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {booksToDisplay.map((book) => (
              <tr key={book.id} onClick={() => handleBookClick(book)}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
                <td>{book.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
  };
  
  export default BookGrid;