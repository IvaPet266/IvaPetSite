import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';   //!
import Container from './Card';
import cat from  '../imgs/cards/cat.jpg';
import cat1 from '../imgs/cards/cat1.jpg';
import cat2 from '../imgs/cards/cat2.jpg';
import dog from '../imgs/cards/dog.jpg';
import dog1 from '../imgs/cards/dog1.jpg';
import { changeColorTheme, changeParameter } from '../app/store';



export default function Scroll( props ) {
    const [ cardWidth, setCardWidth ] = useState( "200px" );
    const [ padding, setPadding ] = useState( null );
    const [ CARDS, setCARDS ] = useState( null );
    const ref = useRef( null );

    const textColor = useSelector( ( state ) => state.colorTheme.fill_inactive );

    const zoomHandle = () => {
        const { width } = ref.current.getBoundingClientRect();
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

    switch ( CARDS !== null ) {
        case true:
            console.log("cards");
            return (
                <>
                    <Filters/>
                    
                    <div
                        ref={ ref }
                        style={{
                            padding: `0 ${ padding }`,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}>
                        
                        { CARDS.map( ( value, index ) => <Container 
                                    key={ index } img={ value[ "image" ] } 
                                    title={ value[ "title" ] } author={ value[ "author" ] }
                                    category={ value[ "category" ] }
                                    text_content={ value[ "text_content" ] }/> ) }
                        
                    </div>
                </>
                )
        default:
            return <p style={{ color: textColor }}>Wait a minute!</p> //!
    }
};

export function Filters() {
    const filtersBg = useSelector( ( state ) => state.colorTheme.fill_inactive ); 
    const menuBg = useSelector( ( state ) => state.colorTheme.fill_active );
    const lines = useSelector( ( state ) => state.colorTheme.lines ); 
    const filters = useSelector( ( state ) => state.configParams.filters ); 
    const dispatch = useDispatch();

    const likesFilter = useSelector( ( state ) => state.filters.likes );
    const repostsFilter = useSelector( ( state ) => state.filters.reposts );
    const savesFilter = useSelector( ( state ) => state.filters.saves );
    const authorFilter = useSelector( ( state ) => state.filters.author );
    const hashtagsFilter = useSelector( ( state ) => state.filters.hashtags );

    const [ filtersBtnText, setFiltersBtnText ] = useState( '>>' );
    const [ filtersBtnColor, setFiltersBtnColor ] = useState( filtersBg );
    const [ filtersBorder, setFiltersBorder ] = useState( "none" );
    const [ filtersBtnTextColor, setFiltersBtnTextColor ] = useState( menuBg );
    
    switch ( filters ) {
        case true: 
            return (
                <div style={{
                    height: "60px", width: "100%", background: filtersBg, display: "flex", 
                    flexDirection: "row", justifyContent: "space-between", border: `solid 1px ${ lines }`
                }}>
                    <FilterDiv name="Likes" type="number"/>
                    <FilterDiv name="Reposts" type="number"/>
                    <FilterDiv name="Saves" type="number"/>
                    <FilterDiv name="Author" type="number"/>
                    <FilterDiv name="Hashtags" type="text"/>
                    <button style={{ transition: "all 300ms ease-out", background: filtersBtnColor, border: filtersBorder, color: filtersBtnTextColor }} 
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
                        onClick={() => {
                            console.log("dispatch");
                            dispatch( changeParameter( { "name": "filters", "value": !filters }) );
                            setFiltersBtnText( "<<" )
                            }}>{ filtersBtnText }
                    </button> 
                </div>
            )
        default: {
            return (
                <button style={{ 
                    height: "60px", transition: "all 300ms ease-out", background: filtersBtnColor,
                    border: filtersBorder, color: filtersBtnTextColor }} 
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
                    onClick={() => {
                        console.log("dispatch");
                        dispatch( changeParameter( { "name": "filters", "value": !filters }) );
                        setFiltersBtnText( "<<" )
                        }}>{ filtersBtnText }
                </button> 
            )
        }
    }
}

export function FilterDiv( props ) {
  return (
    <div id={`${ props.name }Filter`} 
        style={{background: "transparent", display: "flex", 
        flexDirection: "row", alignItems: "center" }}>
        <h5>{ props.name }</h5>
        <input style={{ height: "60%", margin: "5px" }} type={ props.type }></input>
    </div>
  )
}
