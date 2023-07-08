import { configureStore } from "@reduxjs/toolkit";
import { charactersApi } from '../services/charactersApi';
import { comicsApi } from "../services/comicsApi";
import characters from './appSlice/charactersSlice';
import comics from './appSlice/comicsSlice';


const store = configureStore({
    reducer: {
        comics,
        characters,
        [charactersApi.reducerPath]: charactersApi.reducer,
        [comicsApi.reducerPath]: comicsApi.reducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(charactersApi.middleware, comicsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;