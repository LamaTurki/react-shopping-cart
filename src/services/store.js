import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import { getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = window && window.__INITIAL_STATE__;
const middlewares = [
  thunk.withExtraArgument(getFirebase)];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
          )
  );

store.subscribe(() => {
  const state = store.getState();
  const persist = {
    cart: state.cart,
    total: state.total,
    saved: state.saved,
  };

  window.localStorage.setItem('state', JSON.stringify(persist));
});

export default store;