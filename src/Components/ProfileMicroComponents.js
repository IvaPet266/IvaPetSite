import React from "react"

export const ProfileContentsPath = ({
    contentsColor,
    d
}) => <path 
        style={{
            transition:     "stroke 300ms ease-out",
            stroke:         contentsColor, 
            strokeWidth:    "3",
            strokeLinecap:  "round", 
            strokeLinejoin: "round"
        }}
        d    ={ d }/>

export const ProfileContentsSVG = ({
    w, 
    h, 
    d, 
    d1,
    objFillSVG, 
    contentsColor, 
}) => (
    <svg 
        style  ={{ 
            transition:    "all 300ms ease-out", 
            pointerEvents: "none", 
            margin:        "0px",
            paddingRight:  "5px", 
            alignSelf:     "center", 
            cursor:        "pointer" 
        }} 
        width  ={ w } 
        height ={ h }
        viewBox={`0 0 ${ w } ${ h }`} 
        fill   ={ objFillSVG } 
        xmlns  ="http://www.w3.org/2000/svg">
        <ProfileContentsPath contentsColor={ contentsColor } d={ d }/>
        { d1 && <ProfileContentsPath contentsColor={ contentsColor } d={ d1 }/> }
    </svg>)

export const LinesHR = ({
    bg,
}) => <hr 
        style={{ 
            border:          "none", 
            margin:          "2.5px", 
            width:           "100%", 
            backgroundColor: bg 
        }} 
        size ="3"/>
     
export const Lines = ( 
    props 
) => <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
        <LinesHR bg={ props.bg }/>
        <LinesHR bg={ props.bg }/>
     </div>

export const LinkSpan = ({
    objColor,
    text
}) => (
    <span className='CormorantInfant-serif' 
        style={{ 
            pointerEvents: "none", 
            transition:    "color 300ms ease-out", 
            fontWeight:    "bold", 
            color:         objColor, 
            fontSize:      "25px" }}>
        { text }
    </span>
)

export const LinkButton = ({
    objColor,
    text
}) => (
    <button 
        style={{ 
            background: "transparent", 
            border:     "none", 
            margin:     "0px", 
            padding:    "2px", 
            cursor:     "pointer" 
        }}>
        <LinkSpan
            objColor={ objColor }
            text    ={ text }
        />
    </button>
)

export const BaseProfileComponentDiv = ( props ) => (
    <div 
        style={{
            width:         "80%", 
            height:        "100vh", 
            display:       "flex", 
            flexDirection: "column", 
            alignItems:    "center", 
            marginTop:     "5px" 
        }}>
        { props.children }
    </div>
)