import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    randomCharId: Math.floor(Math.random() * (1011400-1011000) + 1011000),
    offset: 201,
    chars: [],
    selectedCharId: '',
    infoForCharPage: {},
}

const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setRandomCharId: (state, action) => {
            state.randomCharId = action.payload
        },
        setChars: (state, action) => {
            state.offset += 9
            state.chars = [...state.chars, ...action.payload]
        },
        setCharInfoId: (state, action) => {
            state.selectedCharId = action.payload
        },
        setInfoForCharPage: (state, action) => {
            state.infoForCharPage = action.payload
        }
    }
})

const {actions, reducer} = characterSlice;
export default reducer;
export const {
    setInfoForCharPage,
    setRandomCharId, 
    setCharInfoId, 
    setChars, 
} = actions;