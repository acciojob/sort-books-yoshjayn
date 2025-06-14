import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fixed mock data with exactly 4 books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  return [
    { id: 1, title: 'C Programming', author: 'Dennis Ritchie', publisher: 'Prentice Hall' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt', publisher: 'Addison-Wesley' },
    { id: 3, title: 'Clean Code', author: 'Robert C. Martin', publisher: 'Prentice Hall' },
    { id: 4, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', publisher: "O'Reilly Media" }
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
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export const { setSortBy, setOrder } = booksSlice.actions;
export default booksSlice.reducer;
