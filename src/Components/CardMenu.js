import React, { useEffect, useState } from 'react'

export default function CardMenu({
    handleContainerHover,
    focused 
}) {
    console.log(focused, handleContainerHover);
    const ANIMATION_DURATION = 300

    const [ SVGfill, setSVGfill ]           = useState( "white" ); //useState( "#BFBFBF" );
    const [ rotateDegree, setRotateDegree ] = useState( 0 );
    const [ translateY, setTranslateY ]     = useState( 0 );
    const [ isActive, setIsActive ]         = useState( false );

    useEffect(() => {
        console.log(focused);
        if ( focused === false ) {
            setIsActive( false );
            setTranslateY( 0 );
            setRotateDegree( -180 );
        }
    }, [ focused ]);

    function clickHandler( event ) {
        setIsActive( !isActive );

        setTranslateY( isActive === true ? 100 : 0 );
        setRotateDegree( isActive === true ? 180 : -180 );

        setTimeout(() => {
            console.log(event, "hello");
        }, ANIMATION_DURATION )
    }
    return (
        <svg
            onMouseOver={ () => handleContainerHover( true ) }
            onClick={ clickHandler }

            viewBox='0 0 30 10'
            xmlns  ="http://www.w3.org/2000/svg"

            style={{
                transform:     `translateY(${ translateY }px) rotate(${ rotateDegree }deg)`,
                transition:    `${ ANIMATION_DURATION }ms ease-out`,
                opacity:       Number( focused ),
                position:      "absolute",
                top:           "7px",
                right:         "3px",
                height:        "10px",
                width:         "30px",
                zIndex:        1, 
            }}>
            <CardCircle
                cx="4"   cy  ="4"
                r ="4px" fill={ SVGfill }
            />
            <CardCircle
                cx="14"  cy  ="4"
                r ="4px" fill={ SVGfill }
            />
            <CardCircle
                cx="24"  cy  ="4"
                r ="4px" fill={ SVGfill }
            />
        </svg>       
    )
}

export const CardCircle = ({
    cx, cy, r, fill
}) => (
    <circle 
        style={{
            padding:       "5px",
            pointerEvents: "none",
        }}
        cx={ cx } cy  ={ cy }
        r ={ r }  fill={ fill }/>
)