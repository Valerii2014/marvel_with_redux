import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    offset: 250,
    comics: [],
}

const comicsSlice = createSlice({
    name: 'comics',
    initialState,
    reducers: {
        setComics: (state, action) => {
            state.offset += 8
            state.comics = [...state.comics, ...action.payload]
        }
    }
})

const {actions, reducer} = comicsSlice;

export default reducer;

export const {setComics} = actions;