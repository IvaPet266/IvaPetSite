import React, { useState }               from "react";
import { useDispatch, useSelector }      from "react-redux";
import { changeFilter, changeParameter } from "../app/store";


const filters = {
    likes:    null,
    reposts:  null,
    saves:    null,
    author:   null,
    category: null,
    hashtags: [],
}

export function Filters() {
    const filtersBg    = useSelector( ( state ) => state.colorTheme.fill_inactive ); 
    const menuBg       = useSelector( ( state ) => state.colorTheme.fill_active );
    const lines        = useSelector( ( state ) => state.colorTheme.lines ); 
    const storeFilters = useSelector( ( state ) => state.configParams.filters ); 

    const dispatch = useDispatch();

    const [ filtersBtnText, setFiltersBtnText ]           = useState( '>>' );
    const [ filtersBtnColor, setFiltersBtnColor ]         = useState( filtersBg );
    const [ filtersBorder, setFiltersBorder ]             = useState( "none" );
    const [ filtersBtnTextColor, setFiltersBtnTextColor ] = useState( menuBg );

    const [ resetBgColor, setResetBgColor ]               = useState( menuBg );
    const [ resetColor, setResetColor ]                   = useState( filtersBg );
    const [ resetBorder, setResetBorder ]                 = useState( "none" );

    const [ confirmColor, setConfirmColor ]               = useState( filtersBg );
    const [ confirmBgColor, setConfirmBgColor ]           = useState( menuBg );
    const [ confirmBorder, setConfirmBorder ]             = useState( "none" );
    
    switch ( storeFilters ) {
        case true: 
            return (
                <div 
                    style={{
                        height:         "60px", 
                        width:          "100%", 
                        padding:        "5px",
                        background:     filtersBg, 
                        display:        "flex", 
                        flexDirection:  "row", 
                        justifyContent: "space-between", 
                        border:         `solid 1px ${ lines }` 
                    }}>
                    <FilterDiv name="Likes"    type="number"/>
                    <FilterDiv name="Reposts"  type="number"/>
                    <FilterDiv name="Saves"    type="number"/>
                    <FilterDiv name="Author"   type="text"/>
                    <FilterDiv name="Hashtags" type="text"/>
                    <FilterDiv name="Category" type=""/>
                    <input 
                        style       ={{ 
                            transition:      "all 300ms ease-out", 
                            backgroundColor: resetBgColor, 
                            color:           resetColor, 
                            border:          resetBorder, 
                            cursor:          "pointer" 
                        }} 
                        type        ="reset" 
                        onClick     ={() => { 
                            filters.likes    = null;
                            filters.reposts  = null;
                            filters.saves    = null;
                            filters.author   = null;
                            filters.category = null;
                            filters.hashtags = [];
                            for ( const filter of [ "likes", "repostsFilter", "saves", "author", "category", "hashtags" ] ) {
                                dispatch( changeFilter( { name: filter, value: null } ))
                            }
                        }} 
                        onMouseEnter={() => {
                            setResetBgColor( filtersBg );
                            setResetColor( menuBg );
                            setResetBorder( `solid 1px ${ menuBg }`);
                        }} 
                        onMouseLeave={() => {
                            setResetBgColor( menuBg );
                            setResetColor( filtersBg );
                            setResetBorder( "none" );
                        }} 
                        value       ="Reset"/>
                    <button 
                        style       ={{ 
                            transition:      "all 300ms ease-out", 
                            backgroundColor: confirmBgColor, 
                            color:           confirmColor, 
                            border:          confirmBorder, 
                            cursor:          "pointer" 
                        }} 
                        onMouseEnter={() => {
                            setConfirmBgColor( filtersBg );
                            setConfirmColor( menuBg );
                            setConfirmBorder( `solid 1px ${ menuBg }`);
                        }} 
                        onMouseLeave={() => {
                            setConfirmBgColor( menuBg );
                            setConfirmColor( filtersBg );
                            setConfirmBorder( "none" );
                        }} 
                        onClick     ={() => {
                            for ( const filter of [ "likes", "repostsFilter", "saves", "author", "category", "hashtags" ] ) {
                                dispatch( changeFilter( { name: filter, value: filters[ filter ] } ))
                            }
                        }}>
                            Confirm
                    </button>
                    <button 
                        style={{ 
                            transition: "all 300ms ease-out", 
                            background: filtersBtnColor, 
                            border:     filtersBorder, 
                            color:      filtersBtnTextColor, 
                            cursor:     "pointer" 
                        }} 
                        onMouseEnter={() => {
                            setFiltersBtnColor( filtersBg );
                            setFiltersBorder( `solid 1px ${ menuBg }` );
                            setFiltersBtnTextColor( menuBg );
                        }}
                        onMouseLeave={() => {
                            setFiltersBtnColor( menuBg );
                            setFiltersBorder( "none" );
                            setFiltersBtnTextColor( filtersBg );
                        }}
                        onClick     ={() => {
                            dispatch( changeParameter( { "name": "filters", "value": !storeFilters }) );
                            setFiltersBtnText( ">>" )
                        }}>
                            { filtersBtnText }
                    </button> 
                </div>
            )
        default: {
            return (
                <button 
                    style       ={{ 
                        height:     "60px", 
                        transition: "all 300ms ease-out", 
                        background: filtersBtnColor,
                        border:     filtersBorder, 
                        color:      filtersBtnTextColor, 
                        cursor:     "pointer" 
                    }} 
                    onMouseEnter={() => {
                        setFiltersBtnColor( menuBg );
                        setFiltersBorder( `solid 1px ${ filtersBg }` );
                        setFiltersBtnTextColor( filtersBg );
                    }}
                    onMouseLeave={() => {
                        setFiltersBtnColor( filtersBg );
                        setFiltersBorder( "none" );
                        setFiltersBtnTextColor( menuBg );
                    }}
                    onClick     ={() => {
                        dispatch( changeParameter( { "name": "filters", "value": !storeFilters }) );
                        setFiltersBtnText( "<<" )
                    }}>
                        { filtersBtnText }
                </button> 
            )
        }
    }
}

export function FilterDiv( props ) {
    const filter = useSelector( ( state ) => state.filters[ props.name.toLowerCase() ])
    return (
        <div 
            id   ={ `${ props.name }Filter` } 
            style={{
                background:    "transparent", 
                display:       "flex", 
                flexDirection: "row", 
                alignItems:    "center" 
            }}>
            <h5>{ props.name }</h5>
            <input 
                style   ={{ height: "60%", width: "50px", margin: "5px" }} 
                type    ={ props.type } value={ filter }
                onChange={( state ) => {
                    filters[ props.name.toLowerCase() ] = state.target.value ;
                }}/>
        </div>
    )
}
