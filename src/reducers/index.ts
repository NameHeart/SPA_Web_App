// reducers/index.ts

import { combineReducers } from '@reduxjs/toolkit';
import personReducer from '../redux/personSlice';

const rootReducer = combineReducers({
  person: personReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
