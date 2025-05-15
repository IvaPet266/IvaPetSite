import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector }                            from 'react-redux';   //!
import Container                                               from './Card';
import { changeColorTheme, changeParameter, changeFilter }     from '../app/store';
import { NavLink, useLocation, useParams }                     from 'react-router';
import CardScreen                                              from './CardScreen';


const filters = {
    likes:    null,
    reposts:  null,
    saves:    null,
    author:   null,
    category: null,
    hashtags: [],
}

export default function Scroll( props ) {
    const [ cardWidth, setCardWidth ]     = useState( "200px" );
    const [ padding, setPadding ]         = useState( null );
    const [ CARDS, setCARDS ]             = useState( null );
    const [ defaultText, setDefaultText ] = useState( "Wait a second!" );
    const [ scroll, setScroll ]           = useState( null );

    const ref = useRef( null );
    const dispatcher = useDispatch();
    let params = useParams();
    const location = useLocation();

    const textColor      = useSelector( ( state ) => state.colorTheme.fill_inactive );
    const scrollPosY     = useSelector( ( state ) => state.configParams.scroll );

    const likesFilter    = useSelector( ( state ) => state.filters.likes );
    const repostsFilter  = useSelector( ( state ) => state.filters.reposts );
    const savesFilter    = useSelector( ( state ) => state.filters.saves );
    const authorFilter   = useSelector( ( state ) => state.filters.author );
    const categoryFilter = useSelector( ( state ) => state.filters.category );
    const hashtagsFilter = useSelector( ( state ) => state.filters.hashtags );

    const zoomHandle = () => {
        const { width, height } = ref.current.getBoundingClientRect();
        let w = Math.max( width * 0.25, 150 );

        const cardAmount = Math.floor( width / w );
        setPadding( ( width - ( cardAmount * w ) ) * 0.5 );

        setCardWidth( `${w}px` );
    };

    useLayoutEffect(() => {  
        window.visualViewport.addEventListener( "resize", zoomHandle );
        return () => {
            window.visualViewport.removeEventListener( "resize", zoomHandle );
        }
    }, []);



    useEffect(() => {(
        async () => {
            try {
                const response = await fetch( "https://storage.yandexcloud.net/sharetemp/artworks_data.json" );
                return await response.json()
            }
            catch ( error ) { console.warn( error ); }
        })().then( data => {
            setCARDS( Object.values( data ) );
        }
        )}, []
    );

    useEffect( () => {
        dispatcher( changeParameter( { "name": "cards", "value": CARDS }) )
    }, [ CARDS ])

    switch ( CARDS !== null ) {
        case true:
            return (
                <>
                    <Filters/>
                    <div
                        ref  ={ ref }
                        style={{
                            padding:        `0px ${ padding }px`, 
                            display:        "flex",
                            flexWrap:       "wrap", 
                            position:       "relative",
                            justifyContent: "center", 
                            top:            scrollPosY,
                        }} 
                        id   ="scroll">
                        { CARDS.map( ( value, index ) => {
                            const author   = checkFilters( authorFilter, value[ "author" ] );
                            const category = checkFilters( categoryFilter, value[ "category" ] );
                            params.cardId  = index;
                            if ( value[ "likes_amount" ] >= likesFilter && author && category )
                                return (
                                    <Container 
                                        key  ={ index } 
                                        id   ={ index }
                                        value={ value }/> 
                                )
                            })}
                    </div>
                </>
            )
        default:
            return <p style={{ color: textColor }}>{ defaultText }</p> //!
    }
};

function checkFilters( a, a1 ) {
    let ax;
    if ( a !== null ) ax = a == a1
    else ax = true;

    return ax
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
