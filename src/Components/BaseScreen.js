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

  let isDragged = false;

  function changeScrollbarSize () {
    setScrollbarHeight( Math.min( Math.round( scrollHeight / window.innerHeight ), window.innerHeight ) );
    if ( scrollbarHeight == window.innerHeight ) setScrollWidth( 100 );
  };

  function addScroll() {
    setScroll( document.getElementById( "scroll" ));

    switch ( scrollHeight ) {
      case null: return;
      default:
        if ( scroll !== null ) {
          changeScrollbarSize();
          clearInterval( scrollIntervalId );
          window.addEventListener( "scroll", handleScroll );
          window.addEventListener( 'wheel', handleWheel );
          return;
        }
    }
  };
  let scrollIntervalId;
  useEffect(() => {
    if ( scroll === null ) scrollIntervalId = setInterval( addScroll, 250 );
  }, [ scroll ]);

  function handleMouseDown () {
    isDragged = true;
    setCursor( "dragging" );
    document.addEventListener( "mousemove", ( event ) => handleMouseUp( event, false ) );
    document.addEventListener( "mouseup", ( event ) => handleMouseUp( event ) );
  };
  
  function handleMouseUp ( event, mouseup=true ) {
    if ( isDragged ) {
      const posY = event.clientY < 0 ? 0 : ( event.clientY > scrollHeight ? scrollHeight : event.clientY );
  
      setScrollbarPosY( posY );
      const d = Math.round( ( posY * scrollHeight ) / window.innerHeight );
  
      dispatcher( changeParameter( { "name": "scroll", "value": -1 * d } ) );
    }
    if ( mouseup ) {
      document.removeEventListener( "mousemove", ( event ) => handleMouseUp( event, false ) );
      document.removeEventListener( "mouseup", ( event ) => handleMouseUp( event ) );
      isDragged = false;
    }
  };  

  function handleScroll () {
    console.log("scroll");
  }

  function handleWheel ( event ) {
    console.log("wheel");
    const scrollPosition = scrollbarPosY + event.deltaY;
    setScrollbarPosY( scrollPosition )

    const d = Math.round( ( scrollPosition * scrollHeight ) / window.innerHeight );
    dispatcher( changeParameter( { "name": "scroll", "value": -1 * d } ) );
  };

  function clickScroll( event ) {
    const posY = event.nativeEvent.offsetY 
    console.log( event, event.nativeEvent.offsetY, scrollbarHeight );
    setScrollbarPosY( posY )
  }

  useLayoutEffect(() => {
    !props.scroll && scrollWidth !== 100 && setScrollWidth( 100 );
    scrollWidth !== 99 && setScrollWidth( 99 )
    window.visualViewport.addEventListener( "scroll", ( event ) => handleScroll( event ) );
    window.visualViewport.addEventListener( "resize", changeScrollbarSize );
    return () => window.visualViewport.removeEventListener( "resize", changeScrollbarSize );
  }, [])


  useEffect(() => {
    changeScrollbarSize()
  }, [ scrollHeight, window.innerHeight, window.innerWidth ]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", backgroundColor: bg_color }}>
      <div style={{ display: "flex", flexDirection: "column", width: `${ scrollWidth }%`, height: "100vh" }}>
        <Menu/>
        <div style={{ backgroundColor: bg_color, overflow: "hidden" }}>
          { props.children }
        </div>
      </div>
      { props.scroll && (
        <>
          <Scrollbar clickScroll={ ( event ) => clickScroll( event ) }
            setScrollbarPosY={ ( state ) => setScrollbarPosY( state ) }
            scrollbarPosY={ scrollbarPosY } scrollbarHeight={ scrollbarHeight }
            cursor={ cursor } handleMouseDown={ handleMouseDown }
          />
        </>
      )}
    </div>
  )
};


function Scrollbar( props ) {
  const scrollbarBgLight = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const scrollbarBgDark = useSelector( ( state ) => state.colorTheme.fill_active );
  const scrollbarBorder = useSelector( ( state ) => state.colorTheme.lines );
  const scrollbarBoxBorder = useSelector( ( state ) => state.colorTheme.stroke_active );

  const colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
      ${ scrollbarBgDark } ${ Math.floor(( props.scrollbarPosY / window.innerHeight ) * 100) }% )`;
      
  return (
    <div style={{ background: `linear-gradient(${ scrollbarBgDark } 10%, 30%, ${ scrollbarBgLight })`, 
      margin: "0", width: "1%", border: `solid ${ scrollbarBorder } 1px` }} onClick={( event ) => props.clickScroll( event )}>
      <div ref={ props.ref }
        style={{ 
          transition: "background 100ms ease-in-out", minHeight: "5px", position: "relative", 
          top: props.scrollbarPosY, right: 0, height: `${ props.scrollbarHeight }px`, justifyContent: "center", 
          alignItems: "center", background: colorTransitionStyle, border: `solid ${ scrollbarBoxBorder } 1px`,
          borderRadius: "10px", cursor: props.cursor, boxShadow: "inset 0 0 8px rgba(0, 0, 0, 0.2)",
        }} id="scrollbar"
        onMouseDown={ () => props.handleMouseDown() }
      />
    </div>
  )
}