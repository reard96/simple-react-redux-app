import React from 'react';
import { render } from 'react-dom';
import store, { loadUsers } from './store';

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(loadUsers());

const root = document.getElementById('root');

render(<hr />, root);
