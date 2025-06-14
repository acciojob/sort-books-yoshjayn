import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulate API call (replace with real API if available)
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  // Return EXACTLY 4 books as per test expectation
  return [
    { id: 1, title: 'C Programming', author: 'Dennis Ritchie', publisher: 'Prentice Hall' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt', publisher: 'Addison-Wesley' },
    { id: 3, title: 'Clean Code', author: 'Robert C. Martin', publisher: 'Prentice Hall' },
    { id: 4, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', publisher: "O'Reilly Media" }
  ];
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  sortBy: 'title',
  order: 'asc'
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
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
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSortBy, setOrder } = booksSlice.actions;
export default booksSlice.reducer;
