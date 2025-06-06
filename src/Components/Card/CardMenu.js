import React, { useEffect, useState } from 'react';

const ANIMATION_DURATION = 300;

export default function CardMenu({
    handleContainerHover,
    focused, category, 
    id, author, src
}) {

    const [ SVGfill,      setSVGfill      ] = useState( "#BFBFBF"                        );
    const [ rotateDegree, setRotateDegree ] = useState( 0                                ); 
    const [ translateY,   setTranslateY   ] = useState( 0                                );
    const [ isActive,     setIsActive     ] = useState( false                            );
    const [ menuHeight,   setMenuHeight   ] = useState( category === "ARTWORK" ? 95 : 65 );
    // const [ pointerEvents, setPointerEvents ] = useState( "none" );

    const [ maxTranslateY, setMaxTranslateY ] = useState( category === "ARTWORK" ? 95 : 65 );

    const [ likeFill,      setLikeFill      ] = useState( "#BFBFBF" );
    const [ likedState,    setLikedState    ] = useState( false     );
    const [ downloadFill,  setDownloadFill  ] = useState( "#BFBFBF" );
    const [ shareFill,     setShareFill     ] = useState( "#BFBFBF" );
    const [ downloadState, setDownloadState ] = useState( false     );
    const [ shareState,    setShareState    ] = useState( false     );
    const [ downloadD,     setDownloadD     ] = useState( "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" );

    const filename = `${ author }-${ id }.jpg`;

    useEffect(() => {
        if ( focused === false ) {
            // setPointerEvents( "none" );
            setIsActive( false    );
            setTranslateY( 0      );
            setRotateDegree( -180 );
        } else {
            // setPointerEvents( "cursor" );
            setIsActive( true            );
            setTranslateY( maxTranslateY );
            setRotateDegree( 180         );
        };
    }, [ focused ]);

    function clickHandler( event ) {
        setIsActive( !isActive );

        setTranslateY( isActive === true ? maxTranslateY : 0 );
        setRotateDegree( isActive === true ? 180 : -180      );

        setTimeout(() => {
            console.log(event, "hello");
        }, ANIMATION_DURATION );
    };

    function downloadPost() {
        const status = downloadImage( src, filename );
        if ( status ) setDownloadState( true );
        console.log("download");
    };

    async function downloadImage( url, filename ) {
        try {
            const response = await fetch( url );
            
            if ( !response.ok ) throw new Error( `Error: ${ response.status }` );
        
            const blob = await response.blob();
            
            const objectUrl = URL.createObjectURL( blob );
        
            const anchorElement = document.createElement('a');
            anchorElement.href = objectUrl;
            anchorElement.download = filename;
            anchorElement.click(); 
            
            setTimeout( () => URL.revokeObjectURL( objectUrl ), 100 );
            return true;
        } catch ( error ) {
            console.error( error.message || error );
        };
    };

    useEffect(() => {
        if ( downloadState === false ) {
            setDownloadD( "M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" );
        } else setDownloadD( "M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z" );
    }, [ downloadState ]);

    return (
        <>
            <div
                onMouseOver={ () => handleContainerHover( true ) }
                // onClick    ={ clickHandler }

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
                    x="0" r="3" fill={ SVGfill }
                />
                <CardCircle
                    x="10" r="3" fill={ SVGfill }
                />
                <CardCircle
                    x="20" r="3" fill={ SVGfill }
                />
            </div>
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
                <MenuSVG handleContainerHover={ handleContainerHover } 
                    setSVGfill={ setLikeFill } SVGfill={ likeFill } top="1px" 
                    activeState={ likedState } setActiveState={ setLikedState }
                    d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                {
                    category === "ARTWORK" && 
                    <MenuSVG handleContainerHover={ handleContainerHover } 
                        setSVGfill={ setDownloadFill } SVGfill={ downloadFill } 
                        activeState={ downloadState } setActiveState={ setDownloadState }
                        onClickFunction={ downloadPost } d={ downloadD } top="30px"/> 
                }
                <MenuSVG handleContainerHover={ handleContainerHover } 
                    setSVGfill={ setShareFill } SVGfill={ shareFill } 
                    top={ category === "ARTWORK" ? "59px" : "30px" }
                    setActiveState={ setShareState } activeState={ shareState }
                    d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/>
            </div>
        </>
    );
};

export const CardCircle = ({
    x, r, fill
}) => (
    <div 
        style={{
            width:           `${ 2 * r }px`,
            height:          `${ 2 * r }px`,
            backgroundColor: "transparent",
            borderRadius:    "50%",
            border:          `2px solid ${ fill }`,
            position:        "absolute",
            top:             "2px",
            left:            `${ x }px`,
            pointerEvents:   "none"
        }}
    />
);

export const MenuSVG = ({
    handleContainerHover,
    SVGfill,
    setSVGfill,
    top,
    d,
    setActiveState,
    activeState,
    onClickFunction=null
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
            setSVGfill( "white"        );
            handleContainerHover( true );
        }}
        onMouseLeave={ () => setSVGfill( "#BFBFBF" ) }
        onClick     ={ () => {
            setActiveState( !activeState );
            if ( onClickFunction ) onClickFunction();
        }}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d={ d }/>
    </svg>
);