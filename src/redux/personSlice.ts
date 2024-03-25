// personSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from './person';

const initialState: Person[] = [];

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson(state, action: PayloadAction<Person>) {
      state.push(action.payload);
    },
    updatePerson(state, action: PayloadAction<Person>) {
      const index = state.findIndex((person) => person.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePerson(state, action: PayloadAction<string>) {
      return state.filter((person) => person.id !== action.payload);
    },
  },
});

export const { addPerson, updatePerson, deletePerson } = personSlice.actions;
export default personSlice.reducer;
