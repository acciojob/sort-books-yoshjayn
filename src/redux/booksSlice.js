import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fixed mock data with exactly 4 books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  return [
    { id: 1, title: 'C Programming', author: 'Dennis Ritchie', publisher: 'Prentice Hall' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt', publisher: 'Addison-Wesley' },
    { id: 3, title: 'Clean Code', author: 'Robert C. Martin', publisher: 'Prentice Hall' },
    { id: 4, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', publisher: "O'Reilly Media" },
    { id: 5, title: 'Design Patterns', author: 'Erich Gamma', publisher: 'Addison-Wesley' },
    { id: 6, title: 'Refactoring', author: 'Martin Fowler', publisher: 'Addison-Wesley' },
    { id: 7, title: "You Don't Know JS", author: 'Kyle Simpson', publisher: "O'Reilly Media" },
    { id: 8, title: 'Effective Java', author: 'Joshua Bloch', publisher: 'Addison-Wesley' },
    { id: 9, title: 'Java Concurrency in Practice', author: 'Brian Goetz', publisher: 'Addison-Wesley' },
    { id: 10, title: 'Head First Design Patterns', author: 'Eric Freeman', publisher: "O'Reilly Media" },
    { id: 11, title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', publisher: 'CareerCup' },
    { id: 12, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', publisher: 'MIT Press' },
    { id: 13, title: 'The Clean Coder', author: 'Robert C. Martin', publisher: 'Prentice Hall' },
    { id: 14, title: 'Code Complete', author: 'Steve McConnell', publisher: 'Microsoft Press' },
    { id: 15, title: 'Programming Pearls', author: 'Jon Bentley', publisher: 'Addison-Wesley' }
  ];
});


const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    sortBy: 'title', // Default sort by title
    order: 'asc'     // Default order ascending
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    }
  },
 extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'; // when fetch starts
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'; // when fetch succeeds
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'; // when fetch fails
        state.error = action.error.message;
      });
  }
});

export const { setSortBy, setOrder } = booksSlice.actions;
export default booksSlice.reducer;
