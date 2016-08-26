import { createStore, compose ,applyMiddleware} from 'redux';
import rootReducer from '../reducers';

export default function configureStore(middleware = [], preloadedState ) {
  
  const store = createStore(rootReducer, preloadedState, 
    applyMiddleware(...middleware)
  );

  return store;
}
