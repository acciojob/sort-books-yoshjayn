import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setOrder } from './booksSlice';

const BooksList = () => {
  const dispatch = useDispatch();
  const { items, status, error, sortBy, order } = useSelector(state => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  // Sorting logic
  const sortedBooks = [...items].sort((a, b) => {
    const aVal = a[sortBy].toLowerCase();
    const bVal = b[sortBy].toLowerCase();
    if (order === 'asc') return aVal.localeCompare(bVal);
    return bVal.localeCompare(aVal);
  });

  return (
    <div>
      <h1>Books List</h1>
      
      {/* Sort Controls - Fixed labels and structure */}
      <div>
        <label htmlFor="sort-by">Sort by:</label>
        <select 
          id="sort-by" 
          value={sortBy} 
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          data-testid="sort-by"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select 
          id="order" 
          value={order} 
          onChange={(e) => dispatch(setOrder(e.target.value))}
          data-testid="order"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Table with 4 books - Fixed structure */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map(book => (
            <tr key={book.id}>
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
