import React, { useEffect, useState }           from 'react';
import { useDispatch, useSelector }             from 'react-redux';
import { useNavigate, NavLink }                 from 'react-router';
import CardMenu                                 from './CardMenu';
import { back2defaultPostInfo, changePostInfo } from '../../app/store';
import CardContent                              from './CardContent';

export default function Container( props ) {

    const { image, title, author, category, text_content } = props.value;

    let navigate     = useNavigate();
    const dispatcher = useDispatch();
    
    const menuTextColor = useSelector( ( state ) => state.colorTheme.stroke_inactive );
    const lines         = useSelector( ( state ) => state.colorTheme.lines );

    const [ focused, setFocused ]             = useState( false );
    const [ filter, setFilter ]               = useState( "none" );
    const [ textFilter, setTextFilter ]       = useState( "none" );
    const [ textStyle, setTextStyle ]         = useState( { color: "black", background: "transparent" } );

    const margin = 10;

    // const title = props.title.length < 25 ? props.title : `${ props.title.slice( 0, 27 ) }...`

    function clickHandler() {
        dispatcher( back2defaultPostInfo() );
        
        dispatcher( changePostInfo({ name: "image", value: image }) );
        dispatcher( changePostInfo({ name: "title", value: title }) );
        dispatcher( changePostInfo({ name: "author", value: author }) );
        dispatcher( changePostInfo({ name: "category", value: category }) );
        dispatcher( changePostInfo({ name: "text_content", value: text_content }) );
        navigate( `posts/${ props.id }` );
    }

    function handleContainerHover( isEntered ) {
        setFocused( isEntered );
        setFilter( isEntered ? 'brightness(30%) saturate(40%)' : 'none' );
        setTextFilter( isEntered ? 'brightness(30%) contrast(30%)' : 'none' );
        setTextStyle({
            color: isEntered ? 'lightgrey' : 'black',
            background: 'transparent'
        });
    };

    return (
        <div 
            style       ={{
                display:       "inline-block", /* ? */
                background:    "grey", 
                overflow:      "hidden",
                cursor:        "pointer",
                // width:         `${ props.width - margin }px`,
                margin:        `${ margin * 0.25 }px ${ margin * 0.5 }px`,
                minHeihgt:     "250px", 
                maxHeight:     "250px",
                maxWidth:      "200px", 
                position:      "relative",
                border:        `solid 1px ${ lines }`,
                borderRadius:  "20px",
                userSelect:    "none",
            }} 
            onMouseEnter={() => handleContainerHover( true )}
            onMouseOut  ={() => handleContainerHover( false )}
            onClick     ={ clickHandler }
            >
            <CardMenu 
                handleContainerHover={ handleContainerHover }
                focused             ={ focused }
                category            ={ category }
                id                  ={ props.id } 
                author              ={ author }
                src                 ={ image }
            />
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
            <CardContent 
                filter    ={ filter }     image={ image } post={ false }
                category  ={ category }   text_content={ text_content } 
                textFilter={ textFilter } textStyle={ textStyle }
                />
        </div>
    )
};