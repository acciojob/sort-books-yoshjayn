import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BookList from './redux/BookList';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Book Sorting Application</h1>
          <p>Sort your books by title, author, or publisher</p>
        </header>
        <main>
          <BookList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
