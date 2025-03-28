import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const colorThemeSlice = createSlice({
    name: 'colorTheme',
    initialState: {
        fill_inactive: "#DBC1FF",
        fill_active: "#5E3F89",
        stroke_inactive: "#5E3F89",
        stroke_active: "white",
        lines: "black"
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes.
        // Also, no return statement is required from these functions.
        
        changeColorTheme: ( state, parameter ) => {
            state[ parameter.payload[ "name" ] ] = parameter.payload[ "value" ];
            console.log( parameter.payload[ "name" ], '->', state[ parameter.payload[ "name" ] ] )
        },
        back2defaultColorTheme: ( state ) => {
            state.fill_inactive = "#DBC1FF";
            state.fill_active = "#5E3F89";
            state.stroke_inactive = "#5E3F89";
            state.stroke_active = "white";
            state.lines = "black";
        }
    },
})

// Action creators are generated for each case reducer function
export const { changeColorTheme, back2defaultColorTheme } = colorThemeSlice.actions;

export const userData = createSlice({
    name: 'userData',
    initialState: {
        userId: null,
        userName: "username",
        userBio: "bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio",
    },
    reducers: {
        giveUID: ( state, parameter ) => {
            state.userId = parameter.payload
        },
        changeUserName: ( state, parameter ) => {
            state.userName = parameter.payload
        }
    }
})

export const { giveUID, changeUserName } = userData.actions;


export const filters = createSlice({
    name: "filters",
    initialState: {
        likes: null,
        reposts: null, 
        saves: null,
        author: null,
        hashtags: [],
    },
    reducers: {
        changeFilter: ( state, parameter ) => {
            state[ parameter.payload[ "name" ] ] = parameter.payload[ "value" ];
        },
        back2defaultFilters: ( state ) => {
            state.likes = null;
            state.reposts = null; 
            state.saves = null;
            state.author = null;
            state.hashtags = [];
       }
    }
})

export const { changeFilter, back2defaultFilters } = filters.actions;

export const configParams = createSlice({
    name: "configParams",
    initialState: {
        filters: false,
    },
    reducers: {
        changeParameter: ( state, parameter ) => {
            state[ parameter.payload[ "name" ] ] = parameter.payload[ "value" ];
            console.log( parameter.payload[ "name" ], '->', state[ parameter.payload[ "name" ] ] )
        },
        back2defaultParamters: ( state ) => {
            state.filters = false;
       }
    }
})

export const { changeParameter, back2defaultParamters } = configParams.actions


export default configureStore({
    reducer: {
        colorTheme: colorThemeSlice.reducer,
        userData: userData.reducer,
        filters: filters.reducer,
        configParams: configParams.reducer,
    },
})
