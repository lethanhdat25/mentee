import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import rootSaga from './saga';
import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddle) => getDefaultMiddle().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
