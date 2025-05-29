import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector }                            from 'react-redux';
import BaseScreen                                              from '../BaseScreen';
import CardContent                                             from './CardContent';
import { useNavigate }                                         from 'react-router';
import { changeParameter, changePostInfo }                     from '../../app/store';

export default function CardScreen( props ) {
    const menuBg        = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
    const bioTextColor  = useSelector( ( state ) => state.colorTheme.stroke_active );
    const lines         = useSelector( ( state ) => state.colorTheme.lines );
    
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    // useEffect( () => { 
    //     if ( localStorage.length === 0 ) {
    //         navigate( '/' );
    //     } else if ( useSelector( ( state ) => state.postInfo.category ) === "" ) {
    //         const postId = JSON.parse( localStorage.getItem( "postId" ) );
    //         dispatcher( changePostInfo( { name: "postId", value: postId } ) );
            
    //         dispatcher( changeParameter( { name: "cards", value: JSON.parse( localStorage.getItem( "cards" ) ), newCards: true } ) );
    //         const cards = useSelector( ( state ) => state.configParams.cards );
    //         console.log(  postId  );
    //         const { image, title, author, category, text_content } =  cards[ postId ];

    //         dispatcher( changePostInfo( { name: "image", value: image } ) );
    //         dispatcher( changePostInfo( { name: "title", value: title } ) );
    //         dispatcher( changePostInfo( { name: "author", value: author } ) );
    //         dispatcher( changePostInfo( { name: "category", value: category } ) );
    //         dispatcher( changePostInfo( { name: "text_content", value: text_content } ) );
    //         navigate( `posts/${ props.id }` );
    //     };
    // }); 
           //TODO
           //* вызов списка постов из localStorage и нахождение конкретного 
           //* поста в случае перезагрузки страницы на адресе '/posts/{номер поста}',
           //* чтобы содержимое отображалось корректно

    const category     = useSelector( ( state ) => state.postInfo.category );
    const image        = useSelector( ( state ) => state.postInfo.image );
    const author       = useSelector( ( state ) => state.postInfo.author );
    const title        = useSelector( ( state ) => state.postInfo.title );
    const text_content = useSelector( ( state ) => state.postInfo.text_content );
    
    const contentRef = useRef( null );

    const [ baseHeight, setBaseHeight ] = useState( 200 );

    useLayoutEffect(() => {
        if ( contentRef.current ) {
            setBaseHeight( contentRef.current.clientHeight )
            if ( contentRef.current.clientHeight ) { 
                contentRef.current.style.height = visualViewport.height - 150;
                console.log("height -> ", contentRef.current);
            } else if ( contentHeight.current.clientWidth ) {
                contentRef = visualViewport.width - 150;
                console.log("width -> ", contentRef.current.style);
            };
        }
    }); //TODO доделать подгонку размеров картинок, потом только текст

    return (
        <BaseScreen>
            <div 
                id   ="card" 
                style={{ 
                    padding:         "0", 
                    // width:           "400px", 
                    height:          baseHeight,
                    backgroundColor: "gray",
                    position:        "absolute", 
                    top:             "20%", 
                    left:            "30%", 
                    borderRadius:    "20px",
                    border:          `solid 1px ${ lines }`, 
                    alignSelf:       "center",
                    alignContent:    "center",
                    cx:              "50%",
                    cy:              "50%"
                }}>
                {
                    category === "ARTWORK" && 
                        <img
                            ref={ contentRef }
                            style={{
                                borderRadius: "20px",
                                border:       `solid 1px ${ lines }`, 
                                cx:           "50%",
                                cy:           "50%"
                            }}
                            src={ image } 
                            >
                        </img>

                }
            </div>
        </BaseScreen>
    )
};

