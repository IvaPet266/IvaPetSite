import { configureStore } from '@reduxjs/toolkit';
import { createSlice }    from '@reduxjs/toolkit';


function checkWhite( color ) {
    const r = parseInt( color.substring( 0, 2 ), 16 ); 
    const g = parseInt( color.substring( 2, 4 ), 16 );  

    return r > 128 && g > 128;
};

export const colorThemeSlice = createSlice({
    name: 'colorTheme',
    initialState: {
        fill_inactive:   "#DBC1FF",
        fill_active:     "#5E3F89",
        stroke_inactive: "#5E3F89",
        stroke_active:   "white",
        lines:           "black"
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

            if ( parameter.payload[ "name" ] !== "lines" ) state.lines = checkWhite( state.fill_inactive ) ? "black" : "white";
        },
        back2defaultColorTheme: ( state ) => {
            state.fill_inactive   = "#DBC1FF";
            state.fill_active     = "#5E3F89";
            state.stroke_inactive = "#5E3F89";
            state.stroke_active   = "white";
            state.lines           = "black";
        }
    },
});

// Action creators are generated for each case reducer function
export const { changeColorTheme, back2defaultColorTheme } = colorThemeSlice.actions;

export const userData = createSlice({
    name: 'userData',
    initialState: {
        userId:   null,
        userName: "username",
        userBio:  "bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio",
    },
    reducers: {
        giveUID: ( state, parameter ) => {
            state.userId = parameter.payload;
        },
        changeUserName: ( state, parameter ) => {
            state.userName = parameter.payload;
        }
    }
})

export const { giveUID, changeUserName } = userData.actions;

export const filters = createSlice({
    name: "filters",
    initialState: {
        likes:    null,
        reposts:  null, 
        saves:    null,
        author:   null,
        category: null,
        hashtags: [],
    },
    reducers: {
        changeFilter: ( state, parameter ) => {
            state[ parameter.payload[ "name" ] ] = parameter.payload[ "value" ];
        },
        back2defaultFilters: ( state ) => {
            state.likes    = null;
            state.reposts  = null; 
            state.saves    = null;
            state.author   = null;
            state.category = null;
            state.hashtags = [];
       }
    }
})

export const { changeFilter, back2defaultFilters } = filters.actions;

export const configParams = createSlice({
    name: "configParams",
    initialState: {
        filters:     false,
        scroll:      0,
        cardsAmount: 0, 
        cards:       null,
        isDragging:  false,
    },
    reducers: {
        changeParameter: ( state, parameter ) => {
            state[ parameter.payload[ "name" ] ] = parameter.payload[ "value" ];
            if ( parameter.payload.name === "cards" && parameter.payload.newCards === undefined ) {
                localStorage.setItem("cards", JSON.stringify( state.cards ) );
            };
        },
        back2defaultConfigParamters: ( state ) => {
            state.filters = false;
        }
    }
});

export const { changeParameter, back2defaultConfigParamters } = configParams.actions;

export const routes = createSlice({
    name: "routes",
    initialState: {
        routes: {
            main:        "",
            contests:    "contests",
            discussion:  "discussion",
            newPost:     "newpost",
            search:      "search",
            profile:     "profile",
            collections: "profile/collections",
            saved:       "profile/saved",
            liked:       "profile/liked",
            reposted:    "profile/reposted",
            settings:    "profile/settings",
            support:     "profile/support",
            cards:       "cards"
        },
        cardId: null
    },
    reducers: {
    }  
});

export const postInfo = createSlice({
    name: "postInfo",
    initialState: {
        image:        "", 
        title:        "", 
        author:       "", 
        category:     "", 
        text_content: "",
        postId:       null
    },
    reducers: {
        changePostInfo: ( state, parameter ) => {
            state[ parameter.payload[ "name" ] ] = parameter.payload[ "value" ];
            if ( parameter.payload.name === "postId" ) {
                localStorage.setItem("postId", JSON.stringify( state.postId ) );
            };
        },
        back2defaultPostInfo: ( state ) => {
            state.image        = "";    
            state.title        = "";        
            state.author       = "";        
            state.category     = "";        
            state.text_content = "";        
        }
    }
});

export const { changePostInfo, back2defaultPostInfo } = postInfo.actions;

export default configureStore({
    reducer: {
        colorTheme:   colorThemeSlice.reducer,
        userData:     userData.reducer,
        filters:      filters.reducer,
        configParams: configParams.reducer,
        postInfo:     postInfo.reducer,
        routes:       routes.reducer
    },
});