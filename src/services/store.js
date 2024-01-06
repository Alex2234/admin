import { configureStore } from '@reduxjs/toolkit';
import { domainsReducer } from './reducers/domains';
import { infoDomainReducer } from './reducers/infoDomain';


const store = configureStore({
  reducer: {
    domains: domainsReducer,
    infoDomain: infoDomainReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
  
  export default store;