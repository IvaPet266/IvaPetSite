import React           from 'react';
import { useSelector } from 'react-redux';
import BaseScreen      from '../BaseScreen';
import CardContent     from './CardContent';

export default function CardScreen( props ) {
    const menuBg        = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
    const bioTextColor  = useSelector( ( state ) => state.colorTheme.stroke_active );
    const lines         = useSelector( ( state ) => state.colorTheme.lines );

    
    const category     = useSelector( ( state ) => state.postInfo.category );
    const image        = useSelector( ( state ) => state.postInfo.image );
    const author       = useSelector( ( state ) => state.postInfo.author );
    const title        = useSelector( ( state ) => state.postInfo.title );
    const text_content = useSelector( ( state ) => state.postInfo.text_content );
    
    return (
        <BaseScreen>
            <div 
                id   ="card" 
                style={{ 
                    padding: "0", 
                    width: "400px", 
                    height: category == "ARTWORK" ? "500px": "700px",
                    backgroundColor: "gray",
                    position: "absolute", 
                    top: "25%", 
                    left: "25%", 
                    borderRadius: "20px",
                    border: `solid 1px ${ lines }`, 
                }}>
                <CardContent 
                    image={ image } filter={ "none" } 
                    text_content={ text_content } post={ true } 
                    category={ category } textFilter={ "none" }
                    textStyle={ { color: "black", background: "transparent" } }/>
            </div>
        </BaseScreen>
    )
};