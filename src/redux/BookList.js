import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, sortBooks } from './booksSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const { items, status, error, sortBy } = useSelector(state => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const handleSort = (criteria) => {
    dispatch(sortBooks(criteria));
  };

  if (status === 'loading') {
    return <div className="loading">Loading books...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="book-list-container">
      <div className="sort-controls">
        <h3>Sort Books By:</h3>
        <button className={sortBy === 'title' ? 'active' : ''} onClick={() => handleSort('title')}>Title</button>
        <button className={sortBy === 'author' ? 'active' : ''} onClick={() => handleSort('author')}>Author</button>
        <button className={sortBy === 'publisher' ? 'active' : ''} onClick={() => handleSort('publisher')}>Publisher</button>
      </div>
      <div className="books-grid">
        {items.map(book => (
          <div key={book.id} className="book-item">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author"><strong>Author:</strong> {book.author}</p>
            <p className="book-publisher"><strong>Publisher:</strong> {book.publisher}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
