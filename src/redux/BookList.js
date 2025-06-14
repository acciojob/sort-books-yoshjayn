import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setOrder } from './booksSlice';

const BooksList = () => {
  const dispatch = useDispatch();
  const { items, status, error, sortBy, order } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Sorting logic
  const sortedBooks = [...items].sort((a, b) => {
    const aVal = a[sortBy].toLowerCase();
    const bVal = b[sortBy].toLowerCase();
    return order === 'asc' 
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <div>
      <h1>Books List</h1>
      
      {/* Sort Controls - Fixed structure for test selectors */}
      <div>
        <div>
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            data-testid="sort-by-dropdown"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>

        <div>
          <label>Order:</label>
          <select 
            value={order} 
            onChange={(e) => dispatch(setOrder(e.target.value))}
            data-testid="order-dropdown"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Table with explicit 4 books */}
      <table data-testid="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map(book => (
            <tr key={book.id} data-testid="book-row">
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
