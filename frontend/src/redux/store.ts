import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from './userDetailsSlice';
import dropZoneReducer from './dropZoneSlice' ;
import userChoiceReducer from './userChoiceSilce'
import activeSectionReducer from './activeSection';

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    dropZone : dropZoneReducer,
    userChoice: userChoiceReducer,
    activeSection: activeSectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
