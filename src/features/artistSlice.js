import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "./api";

export const getArtist = createAsyncThunk(
    'artist/getArtist',
    async (req, thunkAPI) => {
        const response = await API.getArtist(
            req.id,
            req.server,
            req.username,
            req.password,
        )
        return response;
    }
);

export const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artist: {},
        albums: [],
        loaded: false,
    },
    reducers: {
        setArtist: (state, action) => {
            state.artist = action.payload;
        },
        setAlbums: (state, action) => {
            state.albums = action.payload;
        },
        setLoaded: (state, action) => {
            state.loaded = action.payload;
        }
    },
    extraReducers: {
        [getArtist.pending]: (state, action) => {
            state.loaded = false;
            state.artist = {};
            state.albums = [];
        },
        [getArtist.fulfilled]: (state, action) => {
            state.loaded = true;
            [state.artist, state.albums] = action.payload;
        }
    }
});

export const {setArtist, setAlbums, setLoaded} = artistSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCurrentArtist = state => state.artist.artist;
export const selectCurrentArtistAlbums = state => state.artist.albums;
export const selectCurrentArtistLoaded = state => state.artist.loaded;

export default artistSlice.reducer;
