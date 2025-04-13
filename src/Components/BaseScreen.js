import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from './Menu'
import { changeParameter } from '../app/store';


export default function BaseScreen( props ) {
  const bg_color = useSelector( ( state ) => state.colorTheme.fill_active );
  const [ cursor, setCursor ] = useState( "pointer" );
  const scrollHeight = useSelector( ( state ) => state.configParams.scrollHeight );

  const ref = useRef( null );
  const dispatcher = useDispatch();

  const [ scrollWidth, setScrollWidth ] = useState( 99 );
  const [ scrollbarHeight, setScrollbarHeight ] = useState( 90 );
  const [ scroll, setScroll ] = useState( document.getElementById( "scroll" ));
  const [ scrollbarPosY, setScrollbarPosY ] = useState( 0 );

  const [ isDragged, setIsDragged ] = useState( false ); 

  let scrollIntervalId;
  useEffect(() => {
    if ( scroll === null ) scrollIntervalId = setInterval( addScroll, 250 );
  }, [ scroll ]);

  function changeScrollbarSize () {
    setScrollbarHeight( Math.min( Math.round( scrollHeight / window.innerHeight ), window.innerHeight ) );
    if ( scrollbarHeight == window.innerHeight ) setScrollWidth( 100 );
    console.log( scrollbarHeight );
  };

  function addScroll() {
    setScroll( document.getElementById( "scroll" ));

    switch ( scrollHeight ) {
      case null:
        return;
      default:
        if ( scroll !== null ) {
          changeScrollbarSize();
          clearInterval( scrollIntervalId );
          return;
        }
    }
  };

  function handleMouseDown () {
    setIsDragged( true );
    setCursor( "dragging" );
    document.addEventListener( "mouseup", ( event ) => handleMouseUp( event ) );
  };

  function handleMouseUp ( event_ ) {
    console.log(event_);
    const posY = event_.clientY < 0 ? 0 : ( event_.client > scrollHeight ? scrollHeight : event_.clientY )
    console.log( posY );
    setScrollbarPosY( posY );
    const d = Math.round( ( posY * scrollHeight ) / window.innerHeight )
    console.log(-1 * d);

    dispatcher( changeParameter( { "name": "scroll", "value": -1 * d } ) )
    document.removeEventListener( "mouseup", ( event ) => handleMouseUp( event ) );
    setIsDragged( false );
  };

  
  useLayoutEffect(() => {  
    window.visualViewport.addEventListener( "resize", changeScrollbarSize );
    return () => {
      window.visualViewport.removeEventListener( "resize", changeScrollbarSize );
    }
  }, []);
  
  useEffect(() => {
    window.visualViewport.addEventListener( "scroll", ( event ) => handleMouseUp( event ) );
    console.log(2);
    return () => {
      window.visualViewport.removeEventListener( "scroll", ( event ) => handleMouseUp( event ) )
      console.log(3);
    }
  }, [])

  useEffect(() => {
    changeScrollbarSize()
  }, [ scrollHeight ]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", backgroundColor: "grey"  }}>
      <div style={{ display: "flex", flexDirection: "column", width: `${ scrollWidth }%`, height: "100vh" }}>
        <Menu/>
        <div style={{ backgroundColor: bg_color, overflow: "hidden" }}>
          { props.children }
        </div>
      </div>
      <div style={{ backgroundColor: "aqua", margin: "0", width: "1%" }}>
        <div ref={ ref }
          style={{
            position: "relative",
            top: scrollbarPosY,
            right: 0,
            height: `${ scrollbarHeight }px`, justifyContent: "center", alignItems: "center",
            backgroundColor: "red", borderRadius: "10px",
            cursor: cursor
          }} id="scrollbar"
          onMouseDown={() => handleMouseDown()}
        />
      </div>
    </div>
  )
};
