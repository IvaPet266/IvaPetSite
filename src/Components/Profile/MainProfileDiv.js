import React, { useState, useEffect }     from "react";
import { useDispatch, useSelector }       from "react-redux";
import { BaseProfileComponentDiv, Lines } from "./ProfileMicroComponents";
import SVGButton                          from "../Buttons/SVGButtons";
import { changeColorTheme }               from "../../app/store";


export function MainProfileDiv ( props ) {
    
    const userName     = useSelector( ( state ) => state.userData.userName );
    const userBio      = useSelector ( ( state ) => state.userData.userBio );
    const menuBg       = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const divBg        = useSelector ( ( state ) => state.colorTheme.fill_active );
    const bioTextColor = useSelector( ( state ) => state.colorTheme.stroke_active );
    const lines        = useSelector( ( state ) => state.colorTheme.lines );
    
    const [ textColor, setTextColor ]       = useState( "white" );
    const [ fontSize, setFontSize ]         = useState( "12px" );
    const [ text, setText ]                 = useState( '' );
    const [ placeholder, setPlaceholder ]   = useState( '' );
    const [ confirmColor, setConfirmColor ] = useState( menuBg );
  
    const [ inputValue, setInputValue ]     = useState( '#aaaacc' ); // Начальное значение цвета
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
                <BaseProfileComponentDiv>
                    <h2 
                        style={{ 
                            color:     menuBg, 
                            fontSize:  "35px", 
                            margin:    "0px", 
                            textAlign: "center" 
                        }}>
                            Settings
                    </h2>
                    <div style={{ 
                            width:          "80%", 
                            display:        "flex", 
                            flexDirection:  "row", 
                            padding:        "0px", 
                            justifyContent: "space-between" 
                        }}>
                        <div style={{ display: "grid", placeItems: "center" }}>
                            <h5 
                                style={{ 
                                    color:      menuBg, 
                                    fontSize:   "25px", 
                                    textAlign:  "center", 
                                    lineHeight: "35px", 
                                    margin:     "0px", 
                                }}>
                                    Color Theme
                            </h5>
                        </div>
                        <input 
                            id      ="colorThemeInput" 
                            type    ="color" 
                            value   ={ inputValue } 
                            onChange={ ( event ) => setInputValue( event.target.value ) } 
                            style   ={{ 
                                border:          "solid 1px black", 
                                backgroundColor: "transparent", 
                                width:           "80px", 
                                height:          "50px", 
                                cursor:          "pointer" 
                            }}/>
                    </div>
                    <button 
                        style={{ 
                            transition:      "all 300ms ease-out", 
                            border:          "none", 
                            backgroundColor: "transparent", 
                            color:           confirmColor, 
                            cursor:          "pointer" 
                        }} 
                        onMouseEnter={ () => setConfirmColor( bioTextColor ) }
                        onMouseLeave={ () => setConfirmColor( menuBg ) }
                        onClick     ={ handleConfirmClick }>
                            Confirm
                    </button>
                </BaseProfileComponentDiv>
            )
        }
        case "Support Service": return (
            <div 
                style={{ 
                    width:           "80%", 
                    height:          "100vh", 
                    display:         "flex", 
                    flexDirection:   "column", 
                    alignItems:      "center", 
                    marginTop:       "5px", 
                    backgroundColor: menuBg, 
                    justifyContent:  "space-between" 
                }}>
                <div 
                    style={{ 
                        backgroundColor: divBg, 
                        width:           "100%", 
                        border:          `solid 2px ${ lines }`, 
                        borderTop:       "none" 
                    }}>
                    <h1 
                        style={{
                            textAlign: "center", // Это добавлено для центрирования текста
                            color:     menuBg,
                            margin:    "0px",
                            fontSize:  "40px"
                        }}>
                        Support Service
                    </h1>
                </div>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    <input 
                        style={{ 
                            boxSizing:    "border-box", 
                            marginLeft:   "5px", 
                            fontSize:     "30px",
                            marginBottom: "5px", 
                            width:        "68vw", 
                            color:        divBg 
                        }} 
                        type ="text"/>
                    <SVGButton 
                        border={ true } 
                        w     ="48" 
                        h     ="48" 
                        d     ="M10 24H38M38 24L24 10M38 24L24 38"/>
                </div>
            </div>
        )
        default: {
            return (
                <BaseProfileComponentDiv>
                    <img 
                        style={{ 
                            height:          "100px", 
                            width:           "100px", 
                            background:      "transparent", 
                            backgroundColor: "black", 
                            borderRadius:    "50%" 
                        }}/>
                    <p style={{ margin: "5px", color: bioTextColor }}>@{ userName }</p>
                    <div 
                        className='CormorantInfant-serif' 
                        style    ={{ 
                            padding:       "0px", 
                            display:       "flex", 
                            flexDirection: "column", 
                            alignItems:    "center" 
                        }}>
                        <p 
                            style={{
                                margin:    "0px", 
                                width:     "180px", 
                                textAlign: "center",
                                color:     bioTextColor 
                            }}>
                                { text }
                        </p>
                        <button 
                            style       ={{ 
                                transition: "all 300ms ease-out", 
                                border:     "none", 
                                background: "transparent", 
                                margin:     "0px", 
                                fontSize:   fontSize, 
                                color:      textColor 
                            }}
                            onMouseEnter={ () => {
                                setTextColor( "grey" );
                                if ( placeholder == '...' ) setPlaceholder( "show more" );
                            }} 
                            onMouseLeave={ () => { 
                                setTextColor( "white" );
                                if ( placeholder == 'show more' ) setPlaceholder( "..." );
                            }} 
                            onClick     ={ () => {
                                if ( placeholderState ) {
                                    if ( placeholder == 'show more' ) {
                                        setText( userBio );
                                        setPlaceholder( 'show less' );
                                    } else {
                                        setText( userBio.slice( 0, 56 ) );
                                        setPlaceholder( 'show more' );
                                    }
                                }
                            }}>
                                { placeholder }
                        </button>
                    </div>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Lines bg={ bioTextColor }/>
                        <h5 
                            style={{ 
                                width:      "20%", 
                                color:      bioTextColor, 
                                fontSize:   "25px", 
                                textAlign:  "center", 
                                lineHeight: "35px", 
                                margin:     "0px 0px 0px 3px" 
                            }}>
                            { props.instance }
                        </h5>
                        <Lines bg={ bioTextColor }/>
                    </div>
                </BaseProfileComponentDiv>
            )
        }
    }
}