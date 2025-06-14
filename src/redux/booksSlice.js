import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async thunk to fetch books (replace the URL with your real API)
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    // Transforming data to fit book structure for demo
    return data.slice(0, 10).map(item => ({
      id: item.id,
      title: item.title,
      author: `Author ${item.userId}`,
      publisher: `Publisher ${item.id % 3 + 1}`
    }));
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    sortBy: 'title'
  },
  reducers: {
    sortBooks: (state, action) => {
      state.sortBy = action.payload;
      state.items.sort((a, b) => {
        switch (action.payload) {
          case 'author':
            return a.author.localeCompare(b.author);
          case 'publisher':
            return a.publisher.localeCompare(b.publisher);
          default:
            return a.title.localeCompare(b.title);
        }
      });
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

export const { sortBooks } = booksSlice.actions;
export default booksSlice.reducer;
