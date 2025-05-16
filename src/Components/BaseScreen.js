import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useSelector }                                         from 'react-redux';
import Menu                                                    from './Menu'


// const PADDING = 2;
// const menuHeight = 100;

export default function BaseScreen( props ) {

  const baseRef    = useRef( null );
  const contentRef = useRef( null );

  const bg_color = useSelector( ( state ) => state.colorTheme.fill_active );
  const cards    = useSelector( ( state ) => state.configParams.cards )

  const [ contentWidth, setContentWidth ]       = useState( 99 );
  const [ scrollbarHeight, setScrollbarHeight ] = useState( 0 );
  const [ scrollEvent, setScrollEvent ]         = useState( null );

  function changeScrollbarSize () {
    if ( baseRef.current && contentRef.current ) {
      setScrollbarHeight( baseRef.current.clientHeight / contentRef.current.scrollHeight )
      if ( scrollbarHeight == visualViewport.height ) setContentWidth( 100 );
    }
  };

  useEffect(() => {
    changeScrollbarSize()
  }, [ visualViewport.width, visualViewport.height, cards, contentRef.current ])

  function onWheel ( event ) {
    if ( baseRef.current ) {
      setScrollEvent( event.nativeEvent )
    }
  };

  useLayoutEffect( () => {
    window.addEventListener( "resize", changeScrollbarSize );
    if ( !props.scroll ) {
      window.removeEventListener( "resize", changeScrollbarSize );
      setContentWidth( 100 )
    }
  })

  function scrollTo ( percent ) {
    if ( contentRef.current ) {
      const scrollY = percent * contentRef.current.scrollHeight;
      contentRef.current.scroll( 0, scrollY >= 440 ? ( scrollY - 440 ) : scrollY );
    }
  }

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
          width:         `${ contentWidth }%`, 
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
            scrollEvent      ={ scrollEvent }
            scrollbarHeight  ={ scrollbarHeight }
            scrollTo         ={ scrollTo }
          />
        </>
      )}
    </div>
  )
};

function Scrollbar( props ) {

  const sliderRef = useRef( null );
  const blockRef  = useRef( null );
  
  const [ clickY, setClickY ]             = useState( 0 );
  const [ cursor, setCursor ]             = useState( "pointer" );
  const [ sliderHeight, setSliderHeight ] = useState( 5 );
  const [ percent, setPercent ]            = useState( 0 );

  const scrollbarBgLight   = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const scrollbarBgDark    = useSelector( ( state ) => state.colorTheme.fill_active );
  const scrollbarBorder    = useSelector( ( state ) => state.colorTheme.lines );
  const scrollbarBoxBorder = useSelector( ( state ) => state.colorTheme.stroke_active );
  
  const colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
    ${ scrollbarBgDark } ${ Math.floor(( clickY / window.innerHeight ) * 100) }% )`;
    
  const blockHeightMsliderHeight = () => {
    return blockRef.current.clientHeight - sliderRef.current.clientHeight
  };

  useEffect( () => {
    if ( props.scrollEvent && blockRef.current && sliderRef.current ){
      const maxScroll = blockHeightMsliderHeight();
      setClickY( ( prev ) => Math.min( Math.max( 0, prev + props.scrollEvent.deltaY * 0.1 ), maxScroll ));
    }
  }, [ props.scrollEvent ]); 

  useEffect( () => {
    if ( blockRef.current ) {
      setSliderHeight( blockRef.current.clientHeight * props.scrollbarHeight  )
    }
  }, [ props.scrollbarHeight ]);

  useEffect( () => {
    if ( blockRef.current && sliderRef.current ) {
      setPercent( clickY / blockHeightMsliderHeight() );
      console.log( percent );
      props.scrollTo( percent )
    }
  }, [ clickY, sliderHeight ]);


  return (
    <div 
      id      ="scrollDiv"
      style   ={{ 
        background: `linear-gradient(${ scrollbarBgDark } 10%, 30%, ${ scrollbarBgLight })`, 
        border:     `solid ${ scrollbarBorder } 1px`, 
        margin:     "0", 
        width:      "1%", 
      }} 
      onClick ={( event ) => {
          console.log( Math.min( Math.max( 0, event.nativeEvent.offsetY ), blockHeightMsliderHeight() ) );
          setClickY( Math.min( Math.max( 0, event.nativeEvent.offsetY ), blockHeightMsliderHeight() ) )
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
          height:         `${ sliderHeight }px`, 
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