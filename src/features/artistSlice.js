import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "./api";

export const getArtists = createAsyncThunk(
    'artists/getArtists',
    async (auth, thunkAPI) => {
        const response = await API.getArtists(
            auth.server,
            auth.username,
            auth.password,
        )
        return response;
    }
);

export const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artists: [],
        loaded: false,
    },
    reducers: {
        setArtists: (state, action) => {
            state.artists = action.payload;
        },
    },
    extraReducers: {
        [getArtists.pending]: (state, action) => {
            state.loaded = true;
        },
        [getArtists.fulfilled]: (state, action) => {
            state.loaded = true;
            state.artists = action.payload;
        }
    }
});

export const {setArtists} = artistSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectArtists = state => state.artists.artists;
export const selectArtistsLoaded = state => state.artists.loaded;

export default artistSlice.reducer;
