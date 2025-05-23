import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector }                                         from 'react-redux';
import Menu                                                    from './Menu';

// const PADDING = 2;
// const menuHeight = 100;

export default function BaseScreen( props ) {

  const baseRef    = useRef( null );
  const contentRef = useRef( null );

  const bg_color = useSelector( ( state ) => state.colorTheme.fill_active );
  const cards    = useSelector( ( state ) => state.configParams.cards );

  const [ deltaY, setDeltaY ]               = useState( null );
  const [ sliderHeight, setSliderHeight ]   = useState( null );
  const [ baseRefHeight, setBaseRefHeight ] = useState( null );

  function scrollTo( percent ) {
    contentRef.current.scroll( 0, percent * contentRef.current.scrollHeight )
  }

  function onWheel ( event ) {
    setDeltaY( event.nativeEvent.deltaY );
  };

  function onResize () {
    if ( contentRef.current && baseRef.current ) {
      setSliderHeight( ( contentRef.current.clientHeight * baseRef.current.clientHeight ) / contentRef.current.scrollHeight )
    }
  };

  useEffect(() => {
    window.addEventListener( "resize", onResize );
    return () => window.removeEventListener( "resize", onResize )
  });

  useEffect(() => {
    if ( baseRef.current ) {
      setBaseRefHeight( baseRef.current.clientHeight );
    }
  }, [ baseRef.current, contentRef.current ])

  useLayoutEffect(() => {
    onResize();
  });


  return (
    <div 
      style  ={{ 
        display:         "flex", 
        flexDirection:   "row", 
        // height:          "100vh", 
        width:           "100vw", 
        backgroundColor: bg_color 
      }}
      onWheel={ onWheel }
      ref    ={ baseRef }>
      <div style={{ 
          display:       "flex", 
          flexDirection: "column", 
          width:         "99%", 
          height:        "100vh" 
        }}>
        <Menu/>
        <div 
          style={{ 
            backgroundColor: bg_color, 
            overflow:        "hidden"
          }}
          ref  ={ contentRef } 
          >
          { props.children }
        </div>
      </div>
      { props.scroll && (
        <>
          <Scrollbar 
            deltaY        = { deltaY }
            sliderHeight  = { sliderHeight }
            scrollTo      = { scrollTo }
            baseRefHeight = { baseRefHeight }
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

  let colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
    ${ scrollbarBgDark } ${ Math.floor(( clickY / window.innerHeight ) * 100) }% )`;


  //* цвета
  const scrollbarBgLight   = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const scrollbarBgDark    = useSelector( ( state ) => state.colorTheme.fill_active );
  const scrollbarBorder    = useSelector( ( state ) => state.colorTheme.lines );
  const scrollbarBoxBorder = useSelector( ( state ) => state.colorTheme.stroke_active );
  

  //* градиент ползунка
  useEffect(() => {
    colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
      ${ scrollbarBgDark } ${ Math.floor(( clickY / window.innerHeight ) * 100) }% )`;
  }, [ clickY, window.innerHeight ]);

  useEffect(() => {
    const percent = clickY / props.baseRefHeight;
    console.log(percent);
    props.scrollTo(percent)
  }, [ clickY ]);

  useEffect(() => {
    const maxScroll = props.baseRefHeight - props.sliderHeight;
    setClickY( ( prev ) => Math.min( Math.max( 0, prev + props.deltaY * 0.05 ), maxScroll ))
  }, [ props.deltaY ])

  return (
    <div 
      id      ="scrollDiv"
      style   ={{ 
        background: `linear-gradient(${ scrollbarBgDark } 10%, 30%, ${ scrollbarBgLight })`, 
        border:     `solid ${ scrollbarBorder } 1px`, 
        margin:     "0", 
        width:      "1%", 
        cursor:     "pointer", 
      }} 
      onClick ={( event ) => {
          setClickY( Math.min( ( props.baseRefHeight - props.sliderHeight ), event.clientY ))
        }}
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
          height:         `${ props.sliderHeight }px`, 
          justifyContent: "center", 
          alignItems:     "center", 
          background:     colorTransitionStyle, 
          border:         `solid ${ scrollbarBoxBorder } 1px`,
          borderRadius:   "10px", 
          boxShadow:      "inset 0 0 8px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  )
}