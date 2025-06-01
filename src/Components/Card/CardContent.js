import React from 'react'

export default function CardContent({
    category,   filter, post,
    image,      text_content, 
    textFilter, textStyle
}) {
    switch ( category ) {
        case ( "ARTWORK" ): {
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
                    src  ={ image }
                />
            );
        } 
        default: {
            let textLimit;
            let text;
            if ( !post ) {
                if ( category == "PROSE" ) textLimit = 400
                else textLimit = 300;
    
                if ( text_content.length > textLimit ) text = `${ text_content.slice( 0, textLimit-3 ) }...`
                else text = text_content;
            } else text = text_content;

            return (
                <div
                    style={{ 
                        width:          "100%", 
                        height:         "100%",
                        transition:     "all 300ms ease-out",
                        borderRadius:   "20px", 
                        // padding:        "2px",
                        opacity:        1, 
                        pointerEvents:  'none',  
                        display:        "flex", 
                        alignContent:   "center",  
                        whiteSpace:     "pre-line", 
                        textAlign:      "center",
                        filter:         textFilter,
                        justifyContent: "center",
                    }}
                    >
                    <span 
                        style={{ 
                            transition:    "all 300ms ease-out", 
                            // alignSelf:     "center",
                            textAlign:     "center",
                            pointerEvents: "none",
                            ...textStyle 
                        }}>
                        { text }
                    </span>
                </div>
            );
        }
    };
};
