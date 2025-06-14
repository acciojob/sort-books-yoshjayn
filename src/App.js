import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BookList from './redux/BookList';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <main>
          <BookList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
