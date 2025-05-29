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
    const [ baseWidth, setBaseWidth ]   = useState( 200 );

    useLayoutEffect(() => {
        if ( contentRef.current ) {
            setBaseHeight( contentRef.current.clientHeight );
            console.log( baseHeight + 150, baseWidth );
            setBaseWidth( contentRef.current.clientWidth );
        }
    }); //TODO доделать подгонку размеров картинок, потом только текст

    return (
        <BaseScreen scroll={ true }>
            <div 
                style={{ 
                    padding:         "0", 
                    backgroundColor: "gray",
                    borderRadius:    "20px",
                    border:          `solid 1px ${ lines }`, 
                    height:          baseHeight + 150,
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
                    category === "ARTWORK" &&
                    <img
                        ref={ contentRef }
                        style={{
                            borderRadius: "20px",
                            border:       `solid 1px ${ lines }`,
                            maxHeight:    "calc(100vh - 150px)", 
                            maxWidth:     "calc(100vw - 80px)",
                            position:     "absolute",
                            top:          0,
                            objectFit:    "cover",
                        }}
                        src={ image }>
                    </img>
                }
            </div>
        </BaseScreen>
    )
};
