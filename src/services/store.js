import { configureStore } from '@reduxjs/toolkit';
import { domainsReducer } from './reducers/domains';


const store = configureStore({
  reducer: {
    domains: domainsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
  
  export default store;