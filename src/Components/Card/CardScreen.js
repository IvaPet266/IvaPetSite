import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector }                            from 'react-redux';
import BaseScreen                                              from '../BaseScreen';


export default function CardScreen( props ) {
    const menuBg        = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
    const bioTextColor  = useSelector( ( state ) => state.colorTheme.stroke_active );
    const lines         = useSelector( ( state ) => state.colorTheme.lines );
    
    const imageRef = useRef( null );
    const spanRef  = useRef( null );

    const [ baseHeight, setBaseHeight ]   = useState( 450 );
    const [ baseWidth, setBaseWidth ]     = useState( 400 );
    const [ defaultText, setDefaultText ] = useState( "Wait a second!" );
    const [ data, setData ]               = useState( null );
    
    useEffect(() => {
        const data = {};

        data.postId       = localStorage.getItem( "postId" );
        data.category     = localStorage.getItem( "category" );
        data.image        = localStorage.getItem( "image" );
        data.author       = localStorage.getItem( "author" );
        data.title        = localStorage.getItem( "title" );
        data.text_content = localStorage.getItem( "text_content" );

        setData( data );
    }, []);
    
    useLayoutEffect(() => {
        if ( imageRef.current ) {
            setBaseHeight( imageRef.current.clientHeight );
            setBaseWidth(  imageRef.current.clientWidth  );
        } else if ( spanRef.current ) {
            setBaseHeight( spanRef.current.clientHeight );
        };
    });

    switch ( data ) {
        case ( null ):
            return (
                <div 
                    style={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: 'center'
                    }}
                    >
                    <div 
                        className="loader"/>
                    <p style={{ color: menuTextColor }}>{ defaultText }</p> 
                </div>
            );
        default:
            const {
                category,
                image,
                author,
                title,
                text_content
            } = data;
            return (
                <BaseScreen scroll={ true }>
                    <div 
                        style={{ 
                            padding:         "0", 
                            backgroundColor: "gray",
                            borderRadius:    "20px",
                            border:          `solid 1px ${ lines }`, 
                            height:          baseHeight + 50,
                            width:           baseWidth,
                            position:        "relative",
                            display:         "flex",
                            justifySelf:     "center",
                            justifyContent:  "center",
                            alignItems:      "center",
                            marginTop:       "50px", /* Отступ сверху, равный высоте меню */
                            marginBottom:    "50px",
                        }}>
                        {
                            (
                                category === "ARTWORK" &&
                                <img
                                    ref  ={ imageRef }
                                    style={{
                                        borderRadius: "20px",
                                        border:       `solid 1px ${ lines }`,
                                        maxHeight:    "calc(100vh - 150px)", 
                                        maxWidth:     "calc(100vw - 80px)",
                                        position:     "absolute",
                                        top:          0,
                                        objectFit:    "cover",
                                        zIndex:       2
                                    }}
                                    src  ={ image }>
                                </img>
                            ) || (
                                ( category === "PROSE" || category === "POEM" ) &&
                                <div
                                    style={{ 
                                        width:          "100%", 
                                        height:         "calc(100% - 50px)",
                                        position:       "absolute",
                                        top:            0,
                                        borderRadius:   "20px",
                                        zIndex:         2,
                                        pointerEvents:  'none',  
                                        display:        "flex", 
                                        alignContent:   "center",  
                                        justifyContent: "center",
                                        whiteSpace:     "pre-line", 
                                        textAlign:      "center",
                                        background:     bioTextColor,
                                    }}>
                                    <span 
                                        ref  ={ spanRef }
                                        style={{ 
                                            transition:    "all 300ms ease-out", 
                                            alignSelf:     "center",
                                            textAlign:     "center",
                                            pointerEvents: "none",
                                            color:         lines,
                                            background:    "transparent",
                                        }}>
                                        { text_content }
                                    </span>
                                </div>
                            )
                        }
                        <div
                            style={{
                                background:              "grey",
                                width:                   "100%",
                                height:                  "70px", 
                                borderBottomRightRadius: "20px",
                                borderBottomLeftRadius:  "20px",
                                position:                "absolute",
                                bottom:                  0,
                            }}
                            >
                            <div 
                                className='CormorantInfant-serif' 
                                style    ={{ 
                                    padding: "3px",
                                    width:   "100%"
                                }}>
                                <h5 
                                    style={{ 
                                        margin:       "2px",
                                        width:        "150px", 
                                        position:     "absolute",
                                        whiteSpace:   "nowrap",
                                        overflow:     "hidden",
                                        bottom:       "20px",
                                        left:         "7px",
                                        right:        "50px",
                                        color:        bioTextColor,
                                    }}>
                                        { title }
                                </h5>
                                <span 
                                    style={{ 
                                        width:        "150px",
                                        position:     "absolute",
                                        whiteSpace:   "nowrap",
                                        overflow:     "hidden",
                                        left:         "8px",
                                        bottom:       "5px",
                                        right:        "50px",
                                        color:        bioTextColor
                                    }}>
                                        { author }
                                </span>
                            </div>
                            <img 
                                style={{ 
                                    position:        "absolute", 
                                    bottom:          "4px",
                                    right:           "10px",
                                    height:          "30px",
                                    width:           "30px",
                                    backgroundColor: bioTextColor, 
                                    borderRadius:    "25px" 
                                }}/>
                        </div>
                    </div>
                </BaseScreen>
            )
    }; 
};       
