import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setOrder } from './booksSlice';

const sortOptions = [
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'publisher', label: 'Publisher' }
];

const orderOptions = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' }
];

function getSortedBooks(books, sortBy, order) {
  const sorted = [...books].sort((a, b) => {
    const aVal = a[sortBy].toLowerCase();
    const bVal = b[sortBy].toLowerCase();
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

const BooksList = () => {
  const dispatch = useDispatch();
  const { items, status, error, sortBy, order } = useSelector(state => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleOrderChange = (e) => {
    dispatch(setOrder(e.target.value));
  };

  const sortedBooks = getSortedBooks(items, sortBy, order);

  return (
    <div>
      <h1>Books List</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <label htmlFor="order">Order:</label>
        <select id="order" value={order} onChange={handleOrderChange}>
          {orderOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}

      {status === 'succeeded' && (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
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
      )}
    </div>
  );
};

export default BooksList;
