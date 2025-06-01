import React, { useEffect, useState } from 'react';
import { useSelector }                from 'react-redux';  

export default function SVGButton( props ) {

    const bg_inactive     = useSelector( ( state ) => state.colorTheme.fill_inactive   );     
    const bg_active       = useSelector( ( state ) => state.colorTheme.fill_active     );    
    const stroke_inactive = useSelector( ( state ) => state.colorTheme.stroke_inactive );           
    const stroke_active   = useSelector( ( state ) => state.colorTheme.stroke_active   );  
    const isDragging      = useSelector( ( state ) => state.configParams.isDragging    );       

    const [ bgColor,     setBgColor     ] = useState( bg_inactive     );
    const [ strokeColor, setStrokeColor ] = useState( stroke_inactive );
    const [ fillColor,   setFillColor   ] = useState( bg_inactive     );
    
    const border = props.border ? `solid 3px ${ bg_active }` : "none";
    const margin = props.border ? "0 0 5px 5px"  : "8px";

    const fill            = props.border ? fillColor : bgColor;
    const backgroundColor = props.border ? fillColor : "transparent";

    useEffect(() => {
        if ( props.isActive == true ) {
            setBgColor( stroke_inactive ); 
            setStrokeColor( "white"     );
            setFillColor( bg_active     );
        } else {
            setBgColor( bg_inactive         ); 
            setStrokeColor( stroke_inactive );
            setFillColor( bg_inactive       ); 
        };
    }, [ props.isActive ]);

    return (
        <button
            onClick={ () => {
                if ( !props.menu ) console.log("send message");
            }}
            style  ={{
                backgroundColor,
                margin,
                width:      props.w, 
                height:     props.h, 
                transition: "all 300ms ease-out",
                border:     "none",
                alignItems: "center",
                alignSelf:  "center",
                cursor:     isDragging ? "grabbing" : "pointer",
                padding:    "0px"
            }}>
            <svg 
                onMouseOver={() => { 
                    if ( !isDragging ) {
                        setBgColor( stroke_inactive ); 
                        setStrokeColor( "white"     );
                        setFillColor( bg_active     );
                    };
                }}
                onMouseOut ={() => { 
                    if ( !props.isActive ) {
                        setBgColor( bg_inactive         ); 
                        setStrokeColor( stroke_inactive );
                        setFillColor( bg_inactive       ); 
                    };
                }}
                style      ={{ transition: "all 300ms ease-out", border, fill }}
                width      ={ props.w } 
                height     ={ props.h } 
                viewBox    ={`0 0 ${ props.w } ${ props.h }`} 
                xmlns      ="http://www.w3.org/2000/svg">
                    <path 
                        style={{ 
                            transition:     "all 300ms ease-out", 
                            stroke:         strokeColor, 
                            fill, 
                            pointerEvents:  "none", 
                            strokeWidth:    "4", 
                            strokeLinecap:  "round", 
                            strokeLinejoin: "round" 
                        }}
                        d    ={ props.d }
                    />
                    { props.children }
            </svg>
        </button>
    );
};

export function SVGButton2Paths ( props ) {

    const bg_inactive     = useSelector( ( state ) => state.colorTheme.fill_inactive   ); 
    const bg_active       = useSelector( ( state ) => state.colorTheme.fill_active     ); 
    const stroke_inactive = useSelector( ( state ) => state.colorTheme.stroke_inactive );
    const stroke_active   = useSelector( ( state ) => state.colorTheme.stroke_active   ); 
    const isDragging      = useSelector( ( state ) => state.configParams.isDragging    );

    const [ bgColor,     setBgColor     ] = useState( bg_inactive     );
    const [ strokeColor, setStrokeColor ] = useState( stroke_inactive );

    useEffect(() => {
        if ( props.isActive == true ) {
            setBgColor( stroke_inactive ); 
            setStrokeColor( "white"     );
            console.log("newpost"); 
        } else {
            setBgColor( bg_inactive         ); 
            setStrokeColor( stroke_inactive );
        };
    }, [ props.isActive ]);

    return (
        <button
            style={{
                background: "transparent",
                margin:     "8px",
                transition: "all 300ms ease-out",
                border:     "none",
                alignSelf:  "center",
                cursor:     isDragging ? "grabbing" : "pointer"
            }}>
            <svg 
                onMouseOver={() => { 
                    if ( !isDragging ) {
                        setBgColor( stroke_inactive ); 
                        setStrokeColor( "white"     ); 
                    };
                }} 
                onMouseOut ={() => { 
                    if ( !props.isActive ) {
                        setBgColor( bg_inactive         ); 
                        setStrokeColor( stroke_inactive );
                    };
                }} 
                style      ={{ transition: "all 300ms ease-out" }} 
                width      ="70" 
                height     ="70" 
                viewBox    ="0 0 70 70" 
                fill       ="none"
                xmlns      ="http://www.w3.org/2000/svg">
                    <path 
                        style={{
                            transition:    "all 300ms ease-out", 
                            fill:          bgColor, 
                            pointerEvents: "none"
                        }}
                        d    ={ props.d1 }/>
                    <path 
                        style={{ 
                            transition:     "all 300ms ease-out", 
                            stroke:         strokeColor, 
                            pointerEvents:  "none",
                            strokeWidth:    "4", 
                            strokeLinecap:  "round", 
                            strokeLinejoin: "round" 
                        }}
                        d    ={ props.d2 }/>
            </svg>
        </button>
    );
};