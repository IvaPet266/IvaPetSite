import React, { useEffect, useState } from 'react'
import Menu from './Menu';

const ANIMATION_DURATION = 300

export default function CardMenu({
    handleContainerHover,
    focused, category
}) {

    const [ SVGfill, setSVGfill ]             = useState( "white" ); //useState( "#BFBFBF" );
    const [ rotateDegree, setRotateDegree ]   = useState( 0 );
    const [ translateY, setTranslateY ]       = useState( 0 );
    const [ isActive, setIsActive ]           = useState( false );
    const [ menuHeight, setMenuHeight ]       = useState( 84 );
    const [ pointerEvents, setPointerEvents ] = useState( "none" );

    const [ likeFill, setLikeFill ]           = useState( "#BFBFBF" );
    const [ likedState, setLikedState ]       = useState( false );
    const [ downloadFill, setDownloadFill ]   = useState( "#BFBFBF" );
    const [ shareFill, setShareFill ]         = useState( "#BFBFBF" );
    const [ downloadState, setDownloadState ] = useState( false );
    const [ categoryState, setCategoryState ] = useState( false );

    useEffect(() => {
        console.log(focused);
        if ( focused === false ) {
            // setPointerEvents( "none" );
            setIsActive( false );
            setTranslateY( 0 );
            setRotateDegree( -180 );
        } else {
            // setPointerEvents( "cursor" );
            setIsActive( true );
            setTranslateY( 89 );
            setRotateDegree( 180 );
        }
    }, [ focused ]);

    function clickHandler( event ) {
        setIsActive( !isActive );

        setTranslateY( isActive === true ? 89 : 0 );
        setRotateDegree( isActive === true ? 180 : -180 );

        setTimeout(() => {
            console.log(event, "hello");
        }, ANIMATION_DURATION )
    };

    function downloadPost() {
        setDownloadState( true );
        console.log("download");
    }

    return (
        <>
            <svg
                onMouseOver={ () => handleContainerHover( true ) }
                onClick    ={ clickHandler }

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
            <div 
                onMouseOver={ () => handleContainerHover( true ) }
                style      ={{
                    transition:    `${ ANIMATION_DURATION }ms ease-out`,
                    opacity:       Number( focused ),
                    position:      "absolute",
                    top:           "7px",
                    right:         "2px",
                    width:         "30px",
                    height:        `${ menuHeight }px`,
                    zIndex:        2,
                }}> 
                <MenuSVG handleContainerHover={ handleContainerHover } setSVGfill={ setLikeFill } SVGfill={ likeFill } top="1px" activeState={ likedState } setActiveState={ setLikedState }
                    d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                <svg 
                    style={{
                        transition: `${ ANIMATION_DURATION }ms ease-out`,
                        height:     "24px",
                        width:      "24px", 
                        fill:       downloadFill,
                        position:   "absolute",
                        left:       "3px",
                        top:        "30px",
                    }}
                    onMouseOver ={ () => {
                        setDownloadFill( "white" );
                        handleContainerHover( true )
                    }}
                    onMouseLeave={ () => setDownloadFill( "#BFBFBF" ) }
                    onClick={ downloadPost }
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    {
                        (() => {
                            switch ( downloadState ) {
                                case false:
                                    if ( category === "ARTWORK" ) return <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/> 
                                    else { 
                                            console.log( "not ARTWORK; false" );
                                            if ( !categoryState ) setCategoryState( true );
                                            return;
                                        }
                                default: return <path d="M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z"/> 
                            }
                        })()
                    }
                    {
                        !downloadState && categoryState && 
                        <path d="M0 0h24v24H0V0z" fill="none"/> &&
                        <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>                 
                    }
                </svg>
                <MenuSVG handleContainerHover={ handleContainerHover } setSVGfill={ setShareFill } SVGfill={ shareFill } top="59px"
                    d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/>
            </div>
        </>
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
);

export const MenuSVG = ({
    handleContainerHover,
    SVGfill,
    setSVGfill,
    top,
    d,
    setActiveState,
    activeState
}) => (
    <svg 
        style={{
            transition: `${ ANIMATION_DURATION }ms ease-out`,
            height:     "24px",
            width:      "24px", 
            fill:       SVGfill,
            position:   "absolute",
            left:       "3px",
            top:        top,
        }}
        onMouseOver ={ () => {
            setSVGfill( "white" );
            handleContainerHover( true )
        }}
        onMouseLeave={ () => setSVGfill( "#BFBFBF" )}
        onClick     ={ () => setActiveState( !activeState )}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d={ d }/>
    </svg>
)