import React, { useRef, useState } from 'react';
import { useScreen } from './ProviderScreen';
import { useSelector } from 'react-redux';                                                //!
// import { Link } from 'react-router';

export default function SVGButton( props ) {

    const { screen, setScreen } = useScreen();

    const bg_inactive = useSelector( ( state ) => state.colorTheme.fill_inactive );       //!   
    const bg_active = useSelector( ( state ) => state.colorTheme.fill_active );           //!
    const stroke_inactive = useSelector( ( state ) => state.colorTheme.stroke_inactive ); //!           
    const stroke_active = useSelector( ( state ) => state.colorTheme.stroke_active );     //!       

    const bg = useRef( props.id == screen? bg_active: bg_inactive )                       //!
    const stroke = useRef( props.id == screen? stroke_active: stroke_inactive )           //!

    const [ defaultBg, setDefaultBg ] = useState( bg.current );
    const [ defaultStroke, setDefaultStroke ] = useState( stroke.current );

    const [ bgColor, setBgColor ] = useState( defaultBg );
    const [ strokeColor, setStrokeColor ] = useState( defaultStroke );
    
    const border = props.border ? `solid 3px ${ bg_active }` : "none";
    const margin = props.border ? "0 0 5px 5px"  : "8px";
    const [ fillColor, setFillColor ] = useState( bg_inactive );

    const fill = props.border ? fillColor : bgColor;
    const backgroundColor = props.border ? fillColor : "transparent";
    console.log(fill);

    return (
        // <Link to={`/${ props.id }`}>
            <button
                onClick={ () => {
                    if ( props.menu ) setScreen( props.id )
                    else console.log("send message");
                }}
                style={{
                    backgroundColor,
                    margin, width: props.w, height: props.h, 
                    transition: "all 300ms ease-out",
                    border: "none",
                    alignItems: "center",
                    alignSelf: "center",
                    cursor: "pointer", padding: "0px"
                }}>
                <svg 
                    onMouseOver={() => { 
                        setBgColor( defaultStroke ); 
                        setStrokeColor( "white" );
                        setFillColor( bg_active );
                    }}
                    onMouseOut={() => { 
                        setBgColor( defaultBg ); 
                        setStrokeColor( defaultStroke );
                        setFillColor( bg_inactive ); 
                    }}
                    style={{ transition: "all 300ms ease-out", border, fill }}
                    width={ props.w } height={ props.h } viewBox={`0 0 ${ props.w } ${ props.h }`} xmlns="http://www.w3.org/2000/svg">
                        <path style={{ 
                            transition: "all 300ms ease-out", 
                            stroke: strokeColor, fill, pointerEvents: "none", strokeWidth:"4", 
                            strokeLinecap:"round", strokeLinejoin:"round" }}
                            d={ props.d }
                        />
                        { props.children }
                </svg>
            </button>
        // </Link> 
    )
}

export function SVGButton2Paths ( props ) {

    const { screen, setScreen } = useScreen();

    const bg_inactive = useSelector( ( state ) => state.colorTheme.fill_inactive );       //! 
    const bg_active = useSelector( ( state ) => state.colorTheme.fill_active );           //! 
    const stroke_inactive = useSelector( ( state ) => state.colorTheme.stroke_inactive ); //!
    const stroke_active = useSelector( ( state ) => state.colorTheme.stroke_active );     //! 

    const bg = useRef( props.id == screen? bg_active: bg_inactive );                      //!
    const stroke = useRef( props.id == screen? stroke_active: stroke_inactive );          //! 
 
    const [ defaultBg, setDefaultBg ] = useState( bg.current );
    const [ defaultStroke, setDefaultStroke ] = useState( stroke.current );

    const [ bgColor, setBgColor ] = useState( defaultBg );
    const [ strokeColor, setStrokeColor ] = useState( defaultStroke );
    
    return (
        // <Link to={`/${ props.id }`}>
            <button
                onClick={ () => setScreen( props.id ) }
                style={{
                    background: "transparent",
                    margin: "8px",
                    transition: "all 300ms ease-out",
                    border: "none",
                    alignSelf: "center",
                    cursor: "pointer"
                }}>
                <svg 
                    onMouseOver={() => { setBgColor( defaultStroke ); setStrokeColor( "white" ) }}
                    onMouseOut={() => { setBgColor( defaultBg ); setStrokeColor( defaultStroke ) }}
                    style={{ transition: "all 300ms ease-out" }} 
                    width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{
                            transition: "all 300ms ease-out", 
                            fill: bgColor, pointerEvents: "none"
                            }}
                            d={ props.d1 }/>
                        <path style={{ 
                            transition: "all 300ms ease-out", 
                            stroke: strokeColor, 
                            pointerEvents: "none", strokeWidth:"4", 
                            strokeLinecap:"round", strokeLinejoin:"round" 
                            }}
                            d={ props.d2 }/>
                </svg>
            </button>
        // </Link>
    )
}
