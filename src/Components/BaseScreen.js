import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector }                            from 'react-redux';
import { changeParameter }                                     from '../app/store';
import Menu                                                    from './Menu'


export default function BaseScreen( props ) {

  const baseRef = useRef( null );

  const bg_color     = useSelector( ( state ) => state.colorTheme.fill_active );
  const scrollHeight = useSelector( ( state ) => state.configParams.scrollHeight );

  const [ scrollWidth, setScrollWidth ]         = useState( 99 );
  const [ scrollbarHeight, setScrollbarHeight ] = useState( 90 );
  const [ scrollPosition, setScrollPosition ]   = useState( 0 );
  const [ scrollEvent, setScrollEvent ]         = useState( null );

  const dispatcher = useDispatch();

  function changeScrollbarSize () {
    console.log(`visualViewport.height -> ${visualViewport.height} | scrollHeight -> ${scrollHeight} |  ( visualViewport.height ** 2 ) / scrollHeight = ${ ( visualViewport.height ** 2 ) / scrollHeight } `);
    // setScrollbarHeight( Math.min( Math.round( ( visualViewport.height ** 2 ) / scrollHeight ), visualViewport.height ) );
    setScrollbarHeight( Math.min( Math.round( ( visualViewport.height ** 2 ) / scrollHeight ), 10 ) );
    if ( scrollbarHeight == visualViewport.height ) setScrollWidth( 100 );
  };

  useLayoutEffect(() => {
    if ( scrollHeight !== null ) {
      const scroll = document.getElementById( "scroll" );
      dispatcher( changeParameter( { name: "scrollHeight", value: scroll.style.height } ) );
      changeScrollbarSize()
    } else setScrollWidth( 100 )
  }, [ scrollHeight, props.scrollDiv ])

  useEffect(() => {
    changeScrollbarSize()
  }, [ scrollHeight, visualViewport.width, visualViewport.height, props.scrollDiv ])

  function onWheel ( event ) {
    if ( baseRef.current ) {
      console.log(event)
      setScrollEvent( event.nativeEvent )
    }
  }

  // function addScroll() {
  //   setScroll( document.getElementById( "scroll" ));

  //   switch ( scrollHeight ) {
  //     case null: return;
  //     default:
  //       if ( scroll !== null ) {
  //         changeScrollbarSize();
  //         clearInterval( scrollIntervalId );
  //         window.addEventListener( "scroll", handleScroll );
  //         window.addEventListener( 'wheel', handleWheel );
  //         return;
  //       }
  //   }
  // };
  // let scrollIntervalId;
  // useEffect(() => {
  //   if ( scroll === null ) scrollIntervalId = setInterval( addScroll, 250 );
  // }, [ scroll ]);

  // function handleMouseDown () {
  //   isDragged = true;
  //   setCursor( "dragging" );
  //   document.addEventListener( "mousemove", ( event ) => handleMouseUp( event, false ) );
  //   document.addEventListener( "mouseup", ( event ) => handleMouseUp( event ) );
  // };
  
  // function handleMouseUp ( event, mouseup=true ) {
  //   if ( isDragged ) {
  //     const posY = event.clientY < 0 ? 0 : ( event.clientY > scrollHeight ? scrollHeight : event.clientY );
  
  //     setClickY( posY );
  //     const d = Math.round( ( posY * scrollHeight ) / window.innerHeight );
  
  //     dispatcher( changeParameter( { "name": "scroll", "value": -1 * d } ) );
  //   }
  //   if ( mouseup ) {
  //     document.removeEventListener( "mousemove", ( event ) => handleMouseUp( event, false ) );
  //     document.removeEventListener( "mouseup", ( event ) => handleMouseUp( event ) );
  //     isDragged = false;
  //   }
  // };  

  // function handleScroll () {
  //   console.log("scroll");
  // }

  // function handleWheel ( event ) {
  //   console.log("wheel");
  //   const scrollPosition = ClickY + event.deltaY;
  //   setClickY( scrollPosition )

  //   const d = Math.round( ( scrollPosition * scrollHeight ) / window.innerHeight );
  //   dispatcher( changeParameter( { "name": "scroll", "value": -1 * d } ) );
  // };

  // useLayoutEffect(() => {
  //   !props.scroll && scrollWidth !== 100 && setScrollWidth( 100 );
  //   scrollWidth !== 99 && setScrollWidth( 99 )
  //   window.visualViewport.addEventListener( "scroll", ( event ) => handleScroll( event ) );
  //   window.visualViewport.addEventListener( "resize", changeScrollbarSize );
  //   return () => window.visualViewport.removeEventListener( "resize", changeScrollbarSize );
  // }, [])

  return (
    <div 
      style  ={{ 
        display:         "flex", 
        flexDirection:   "row", 
        height:          "100vh", 
        width:           "100vw", 
        backgroundColor: bg_color 
      }}
      onWheel={ onWheel }
      ref    ={ baseRef }>
      <div style={{ 
          display:       "flex", 
          flexDirection: "column", 
          width:         `${ scrollWidth }%`, 
          height:        "100vh" 
        }}>
        <Menu/>
        <div style={{ 
            backgroundColor: bg_color, 
            overflow:        "hidden",
            top:             `${ scrollPosition }%`
          }}>
          { props.children }
        </div>
      </div>
      { props.scroll && (
        <>
          <Scrollbar 
            scrollEvent      ={ scrollEvent }
            scrollbarHeight  ={ scrollbarHeight }
            setScrollPosition={ ( position ) => setScrollPosition( position ) }
          />
        </>
      )}
    </div>
  )
};


function Scrollbar( props ) {

  const sliderRef = useRef( null );
  const blockRef  = useRef( null );
  
  const [ clickY, setClickY ] = useState( 0 );
  const [ cursor, setCursor ] = useState( "pointer" );

  const scrollbarBgLight   = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const scrollbarBgDark    = useSelector( ( state ) => state.colorTheme.fill_active );
  const scrollbarBorder    = useSelector( ( state ) => state.colorTheme.lines );
  const scrollbarBoxBorder = useSelector( ( state ) => state.colorTheme.stroke_active );

  const colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
      ${ scrollbarBgDark } ${ Math.floor(( clickY / window.innerHeight ) * 100) }% )`;

  const PADDING = 2;

  useEffect( () => {
    if ( props.scrollEvent && blockRef.current && sliderRef.current ){
      const maxScroll = blockRef.current.clientHeight - sliderRef.current.clientHeight - PADDING;

      setClickY( ( prev ) => Math.min( Math.max( PADDING, prev + props.scrollEvent.deltaY * 0.1 ), maxScroll - PADDING));
      const scrollDiv = document.getElementById( "scrollDiv" );
      console.log(scrollDiv ,scrollDiv.style.height)
      props.setScrollPosition( ( clickY / scrollDiv.style.height ) * 100 );
    }
  }, [ props.scrollEvent ])
  
  return (
    <div 
      id      ="scrollDiv"
      style   ={{ 
        background: `linear-gradient(${ scrollbarBgDark } 10%, 30%, ${ scrollbarBgLight })`, 
        border:     `solid ${ scrollbarBorder } 1px`, 
        margin:     "0", 
        width:      "1%", 
      }} 
      onClick ={( event ) => setClickY( event.nativeEvent.offsetY  )}
      ref     ={ blockRef }
      >
      <div 
        ref        ={ sliderRef }
        style      ={{ 
          transition:     "background 100ms ease-in-out",
          minHeight:      "5px", 
          maxHeight:      `${ visualViewport.height - 1 }px`,
          position:       "relative", 
          top:            clickY, 
          right:          0, 
          height:         `${ props.scrollbarHeight }px`, 
          justifyContent: "center", 
          alignItems:     "center", 
          background:     colorTransitionStyle, 
          border:         `solid ${ scrollbarBoxBorder } 1px`,
          borderRadius:   "10px", 
          cursor:         cursor, 
          boxShadow:      "inset 0 0 8px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  )
}