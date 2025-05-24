import React, { useState } from "react";
import { useSelector } from "react-redux";


export function Button( props ) {

    const menuBg        = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
    const bioTextColor  = useSelector( ( state ) => state.colorTheme.stroke_active );
    const isDragging    = useSelector( ( state ) => state.configParams.isDragging );
  
    const [ backgroundColorInactive, setBackgroundColorInactive ] = useState( menuBg );
    const [ textColorInactive, setTextColorInactive ]             = useState( menuTextColor );
    
    let style;
  
    switch ( props.isActive ) {
      case true: 
        style={
          background: menuTextColor, 
          color:      bioTextColor, 
          height:     "50px", 
          width:      "160px", 
          textAlign:  "center",
          fontFamily: "Cormorant Infant, serif", 
          margin:     "8px", 
          whiteSpace: "nowrap", 
          cursor:     isDragging ? "grabbing" : "pointer"
        }; break;
      default: style={
          background:  backgroundColorInactive, 
          color:       textColorInactive, 
          borderColor: backgroundColorInactive, 
          transition:  "all 300ms ease-out", 
          fontWeight:  "bold",
          height:      "50px", 
          width:       "160px", 
          textAlign:   "center", 
          fontFamily:  "Cormorant Infant, serif", 
          margin:      "8px", 
          whiteSpace:  "nowrap", 
          cursor:      isDragging ? "grabbing" : "pointer"
        }; break;
    };
  
    return (
      <button 
        onMouseEnter={() => {
          if ( !isDragging ) {
            setBackgroundColorInactive( menuTextColor );
            setTextColorInactive( bioTextColor );
          }
        }} 
        onMouseLeave={() => {
          setBackgroundColorInactive( menuBg );
          setTextColorInactive( menuTextColor );
        }}
        style       ={ style }>
          { props.children }
      </button>
    )
  };