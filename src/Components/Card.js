import React, { useEffect, useState } from 'react';
import { useSelector }                from 'react-redux';
import { useNavigate }                from 'react-router';
import { ProfileContentsFill }        from './ProfileComponents';

export default function Container( props ) {

    const { image, title, author, category, text_content } = props.value;

    let navigate = useNavigate();
    
    const [ focused, setFocused ]           = useState( false );
    const [ filter, setFilter ]             = useState( "none" );
    const [ textFilter, setTextFilter ]     = useState( "none" );
    const [ textStyle, setTextStyle ]       = useState( { color: "black", background: "transparent" } );
    const [ SVGfill, setSVGfill ]           = useState( "#BFBFBF" );
    const [ SVGanimation, setSVGanimation ] = useState( "none" );
    // const [isCircleHovered, setIsCircleHovered] = useState(false); // Отслеживаем состояние кружка //!

    const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
    const lines         = useSelector( ( state ) => state.colorTheme.lines );

    const margin = 10;

    // const title = props.title.length < 25 ? props.title : `${ props.title.slice( 0, 27 ) }...`

    function handleContainerHover( isEntered ) {
        setFocused( isEntered );
        setFilter( isEntered ? 'brightness(30%) saturate(40%)' : 'none' );
        setTextFilter( isEntered ? 'brightness(30%) contrast(30%)' : 'none' );
        setTextStyle({
            color: isEntered ? 'lightgrey' : 'black',
            background: 'transparent'
        });
    };

    // Отдельная обработка для кружка
    function handleCircleHover( isEntered ) {
        setIsCircleHovered( isEntered );
        setSVGfill( isEntered ? '#FFFFFF' : '#BFBFBF' );
    };

    function clickHandler( event ) {
        const svg = document.getElementById('svg');
              
    };

    return (
        <div 
            style       ={{
                display:      "inline-block", /* ? */
                background:   "grey", 
                overflow:     "hidden",
                cursor:       "pointer",
                // width:        `${ props.width - margin }px`,
                margin:       `${ margin * 0.25 }px ${ margin * 0.5 }px`,
                minHeihgt:    "250px", 
                maxHeight:    "250px",
                maxWidth:     "200px", 
                position:     "relative",
                border:       `solid 1px ${ lines }`,
                borderRadius: "20px",
            }} 
            onMouseEnter={() => handleContainerHover( true )}
            onMouseOut  ={() => handleContainerHover( false )}
            onClick     ={ clickHandler }>
            <svg
                id          ="more"
                onMouseEnter={( event ) => {
                    event.stopPropagation(); // Остановить всплытие события вверх
                    handleCircleHover( true );
                }}
                onMouseOut  ={( event ) => {
                    event.stopPropagation(); // Остановить всплытие события вверх
                    handleCircleHover( false );
                }}
                viewBox='0 0 30 10'
                xmlns  ="http://www.w3.org/2000/svg"
                onClick={() => {
                    setSVGanimation( "moreAnimation 500ms " )
                }}
                style={{
                    transition:    "opacity 300ms ease-out",
                    opacity:       Number( focused ),
                    animation:     SVGanimation,
                    position:      "absolute",
                    top:           "7px",
                    right:         "3px",
                    height:        "10px",
                    width:         "30px",
                    zIndex:        2, 
                    pointerEvents: "none",
                }}>
                <circle 
                    style={{
                        padding: "5px",
                    }}
                    cx="4" cy="4"
                    r="4px" 
                    fill={ SVGfill }/>
                <circle 
                    style={{
                        padding: "5px",
                    }}
                    cx="14" cy="4"
                    r="4px" 
                    fill={ SVGfill }/>
                <circle 
                    style={{
                        padding: "5px",
                    }}
                    cx="24" cy="4"
                    r="4px" 
                    fill={ SVGfill }/>
            </svg>       
            <div 
                style={{ 
                    padding:       "2px", 
                    position:      "absolute",
                    bottom:        "5px", 
                    width:         "100%",
                    zIndex:        1, 
                    pointerEvents: 'none',
                    transition:    "opacity 300ms ease-out",
                    opacity:       Number( focused ),
                    display:       "flex", 
                    flexDirection: "row",
                }}>
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
                            textOverflow: "ellipsis",
                            whiteSpace:   "nowrap",
                            overflow:     "hidden",
                            bottom:       "20px",
                            left:         "7px",
                            right:        "50px",
                            color:        "white" 
                        }}>
                            { title }
                    </h5>
                    <span 
                        style={{ 
                            width:        "150px",
                            position:     "absolute",
                            textOverflow: "ellipsis",
                            whiteSpace:   "nowrap",
                            overflow:     "hidden",
                            left:         "8px",
                            bottom:       "5px",
                            right:        "50px",
                            color:        "white",
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
                        backgroundColor: "white", 
                        borderRadius:    "25px" 
                    }}/>
            </div> 
            { (() => {
                if ( category == "ARTWORK" ) {
                    return (
                        <img 
                            style={{
                                width:          "100%", 
                                height:         "100%",
                                objectFit:      "cover", 
                                objectPosition: "center 60%",
                                borderRadius:   "20px", 
                                transition:     "all 300ms ease-out",
                                opacity:        1, 
                                pointerEvents:  'none', 
                                filter:         filter, 
                                boxShadow:      "none",
                            }} 
                            src  ={ image }/>
                    )
                } else {
                    let textLimit;
                    if ( category == "PROSE" ) textLimit = 340
                    else textLimit = 237

                    let text;
                    if ( text_content.length > textLimit ) text = `${ text_content.slice( 0, textLimit-3 ) }...`
                    else text = text_content;
                    return (
                        <div style={{ 
                                width:         "90%", 
                                height:        "100%",
                                transition:    "all 300ms ease-out",
                                borderRadius:  "20px", 
                                padding:       "5px",
                                opacity:       1, 
                                pointerEvents: 'none',  
                                display:       "flex", 
                                alignContent:  "center",  
                                whiteSpace:    "pre-line", 
                                textAlign:     "center",
                                filter:        textFilter
                            }}>
                            <span style={{ 
                                    transition: "all 300ms ease-out", 
                                    ...textStyle 
                                }}>
                                { text }
                            </span>
                        </div>
                    )
                } 
            })()}
        </div>
    )
};