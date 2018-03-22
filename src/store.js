import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_USERS = 'SET_USERS';

const usersReducer = (state = [], action) => {
  switch(action.type) {
    case SET_USERS:
      state = action.users;
    break;
  }
  return state;
};

const reducer = combineReducers({
  users: usersReducer
});

const loadUsers = () => {
  return (dispatch) => {
    return axios.get('/api/users')
      .then(result => result.data)
      .then(users => dispatch({
        type: SET_USERS,
        users
      })
    )
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { loadUsers };
