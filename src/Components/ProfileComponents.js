import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { changeColorTheme } from "../app/store"
import SVGButton from "./SVGButtons"
import { NavLink } from "react-router"
// import { Link } from "react-router"


export function ProfileLink( props ) {
    switch ( props.link ){
        case false: 
            return (
                <button style={{ 
                    background: "transparent", border: "none", 
                    margin: "0px", padding: "2px", cursor: "pointer" 
                    }}>
                    <span className='CormorantInfant-serif' 
                        style={{ pointerEvents: "none", transition: "color 300ms ease-out", 
                        fontWeight: "bold", color: props.objColor, fontSize: "25px" }}>
                        { props.text }
                    </span>
                </button>
            )
        default:
            return (
                <NavLink to={ `/profile/${ props.link }` }>
                    <button style={{ 
                        background: "transparent", border: "none", 
                        margin: "0px", padding: "2px", cursor: "pointer" 
                        }}>
                        <span className='CormorantInfant-serif' 
                            style={{ pointerEvents: "none", transition: "color 300ms ease-out", 
                            fontWeight: "bold", color: props.objColor, fontSize: "25px" }}>
                            { props.text }
                        </span>
                    </button>
                </NavLink>
            )
    }
}


export function ProfileContents ( props ) {
    return (
        <div 
            style={{ 
            width: "100%", display: "flex", flexDirection: "row", 
            padding: "0px", justifyContent: "space-between"
            }} onMouseEnter={() => {
            props.setObjColor( props.activeContentsColor )
            props.setObjStrokeSVG( props.activeContentsColor )
            }} onMouseLeave={() => {
            if ( props.menuSection != props.text ) {
                props.setObjColor( props.inactiveContentsColor )
                props.setObjStrokeSVG( props.inactiveContentsColor )
            }}} onClick={() => {
                if ( props.text == "Privacy Policy" ) window.open( "https://2048game.com/ru/", "_blank" )
                else if ( props.text == "Log Out" ) console.log( "Log Out" )
                else {
                    props.setMenuSection( props.text );
                }
            }}>
            <ProfileLink link={ props.link } text={ props.text } objColor={ props.objColor }/>
            <svg 
                style={{ 
                    transition: "all 300ms ease-out", pointerEvents: "none", margin: "0px", 
                    paddingRight: "5px", alignSelf: "center", cursor: "pointer" 
                }} width={ props.w } height={ props.h } viewBox={`0 0 ${ props.w } ${ props.h }`} 
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path style={{ 
                    transition: "stroke 300ms ease-out", stroke: props.contentsColor,
                    strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }}
                    d={ props.d }/>
                { 
                    props.d1 && <path style={{
                    transition: "stroke 300ms ease-out", stroke: props.contentsColor, 
                    strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }}
                    d={ props.d1 }/>
                }
            </svg>
        </div>
    )
}
  
export function ProfileContentsFill( props ) {
    return (
        <div 
            style={{ 
                width: "100%", display: "flex", flexDirection: "row", 
                padding: "0px", justifyContent: "space-between"
            }} onMouseEnter={() => {
                props.setObjColor( props.activeContentsColor );
                props.setObjFillSVG( props.activeContentsColor );
                props.setObjStrokeSVG( props.lines );
            }} onMouseLeave={() => {
                if ( props.menuSection != props.text ) {
                    props.setObjColor( props.inactiveContentsColor );
                    props.setObjFillSVG( "none" );
                    props.setObjStrokeSVG( props.inactiveContentsColor );
            }}} onClick={() => {
                props.setMenuSection( props.text )
            }}>
            <ProfileLink link={ props.link } text={ props.text } objColor={ props.objColor }/>
            <svg 
                style={{ 
                    transition: "all 300ms ease-out", pointerEvents: "none", margin: "0px",
                    paddingRight: "5px", alignSelf: "center", cursor: "pointer" 
                }} width={ props.w } height={ props.h } viewBox={`0 0 ${ props.w } ${ props.h }`} 
                fill={ props.objFillSVG } xmlns="http://www.w3.org/2000/svg">
                <path style={{ 
                    transition: "stroke 300ms ease-out", stroke: props.contentsColor, strokeWidth: "3", 
                    strokeLinecap: "round", strokeLinejoin: "round" }}
                    d={ props.d }
                />
                {
                    props.d1 && <path style={{
                    transition: "stroke 300ms ease-out", stroke: props.contentsColor, 
                    strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round"
                    }}
                    d={ props.d1 }/>
                }
            </svg>
        </div>
    )
}
  
export function MainProfileDiv ( props ) {
    
    const userName = useSelector( ( state ) => state.userData.userName );
    const userBio = useSelector ( ( state ) => state.userData.userBio );
    const menuBg = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const divBg = useSelector ( ( state ) => state.colorTheme.fill_active );
    const bioTextColor = useSelector( ( state ) => state.colorTheme.stroke_active );
    const lines = useSelector( ( state ) => state.colorTheme.lines );
    
    const [ textColor, setTextColor ] = useState( "white" );
    const [ fontSize, setFontSize ] = useState( "12px" );
    const [ text, setText ] = useState( '' );
    const [ placeholder, setPlaceholder ] = useState( '' );
    const [ confirmColor, setConfirmColor ] = useState( menuBg );
  
    const [ inputValue, setInputValue ] = useState( '#aaaacc' ); // Начальное значение цвета
    const dispatcher = useDispatch();
  
    const handleConfirmClick = () => {
      dispatcher( changeColorTheme({ "name": "fill_inactive", "value": `#${ inputValue.slice( 1 ) }` } ), {} );
      const value = `#${ Math.abs( parseInt( inputValue.replace( '#', '0x' ), 16 ) - parseInt( "#7D8276".replace( '#', '0x' ), 16 ) ).toString( 16 ) }`
      dispatcher( changeColorTheme({ "name": "fill_active", "value": value } ), {} );
      dispatcher( changeColorTheme({ "name": "stroke_inactive", "value": value } ), {} );
    };
    
    let placeholderState = false;
    useEffect(() => {
        if ( userBio.length > 60 ) {
            setText( userBio.slice( 0, 56 ) );
            setPlaceholder( '...' );
            placeholderState = true;
        } else {
            setText( userBio );
    }}, []);
  
    switch ( props.instance ) {
        case "Settings": {
            return (
                <div style={{ 
                    width: "80%", height: "100vh", display: "flex", 
                    flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                    <h2 style={{ 
                        color: menuBg, fontSize: "35px", 
                        margin: "0px", textAlign: "center" }}>Settings</h2>
                    <div style={{ 
                        width: "80%", display: "flex", flexDirection: "row", 
                        padding: "0px", justifyContent: "space-between" }}>
                    <div style={{ display: "grid", placeItems: "center" }}>
                        <h5 style={{ 
                            color: menuBg, fontSize: "25px", margin: "0px", 
                            textAlign: "center", lineHeight: "35px" }}>Color Theme</h5>
                    </div>
                    <input id="colorThemeInput" type="color" value={ inputValue } 
                        onChange={ ( event ) => setInputValue( event.target.value ) } 
                        style={{ 
                            border: "solid 1px black", backgroundColor: "transparent", 
                            width: "80px", height: "50px", cursor: "pointer" }}/>
                    </div>
                    <button style={{ 
                        transition: "all 300ms ease-out", border: "none", 
                        backgroundColor: "transparent", color: confirmColor, cursor: "pointer" 
                        }} onMouseEnter={() => setConfirmColor( bioTextColor )}
                        onMouseLeave={() => setConfirmColor( menuBg )}
                        onClick={ handleConfirmClick }>Confirm</button>
                </div>
            )
        }
        case "Support Service": return (
            <div style={{ 
                width: "80%", height: "100vh", display: "flex", backgroundColor: menuBg, flexDirection: "column", 
                alignItems: "center", marginTop: "5px", justifyContent: "space-between" }}>
                <div style={{ backgroundColor: divBg, width: "100%", border: `solid 2px ${ lines }`, borderTop: "none" }}>
                    <h1 style={{
                        textAlign: "center", // Это добавлено для центрирования текста
                        color: menuBg,
                        margin: "0px",
                        fontSize: "40px"
                    }}>Support Service</h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    <input style={{ 
                        boxSizing: "border-box", marginLeft: "5px", fontSize: "30px",
                        marginBottom: "5px", width: "68vw", color: divBg 
                        }} type="text"/>
                    <SVGButton border={ true } w="48" h="48" d="M10 24H38M38 24L24 10M38 24L24 38"/>
                </div>
            </div>
        )
        default: {
            return (
                <div style={{ 
                    width: "80%", height: "100vh", display: "flex", 
                    flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                    <img style={{ 
                        height: "100px", width: "100px", background: "transparent", 
                        backgroundColor: "black", borderRadius: "50%" }}/>
                    <p style={{ margin: "5px", color: bioTextColor }}>@{ userName }</p>
                    <div className='CormorantInfant-serif' 
                        style={{ 
                            padding: "0px", display: "flex", 
                            flexDirection: "column", alignItems: "center" 
                        }}>
                    <p style={{
                        margin: "0px", width: "180px", textAlign: "center",
                        color: bioTextColor }}>{ text }</p>
                    <button style={{ 
                        background: "transparent", border: "none", margin: "0px", 
                        fontSize: fontSize, transition: "all 300ms ease-out", color: textColor }}
                        onMouseEnter={ () => {
                            setTextColor( "grey" );
                            if ( placeholder == '...' ) setPlaceholder( "show more" );
                        }} onMouseLeave={ () => { 
                            setTextColor( "white" );
                            if ( placeholder == 'show more' ) setPlaceholder( "..." );
                        }} onClick={ () => {
                            if ( placeholderState ) {
                                if ( placeholder == 'show more' ) {
                                    setText( userBio );
                                    setPlaceholder( 'show less' );
                                } else {
                                    setText( userBio.slice( 0, 56 ) );
                                    setPlaceholder( 'show more' );
                                }
                        }
                        }}>{ placeholder }</button>
                    </div>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Lines bg={ bioTextColor }/>
                    <h5 style={{ 
                        width: "20%", color: bioTextColor, fontSize: "25px", 
                        textAlign: "center", lineHeight: "35px", margin: "0px 0px 0px 3px" }}>
                        { props.instance }
                    </h5>
                    <Lines bg={ bioTextColor }/>
                    </div>
                </div>
            )
        }
    }
}
  
export function Lines( props ) {
    return (
        <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
            <hr style={{ 
                border: "none", margin: "2.5px", 
                width: "100%", backgroundColor: props.bg }} size="3"/>
            <hr style={{ 
                border: "none", margin: "2.5px", 
                width: "100%", backgroundColor: props.bg }} size="3"/>
        </div>
    )
  }