import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector }                            from 'react-redux';
import { changeParameter }                                     from '../app/store';
import Menu                                                    from './Menu'
import { current } from '@reduxjs/toolkit';


const PADDING = 2;
const menuHeight = 100;

export default function BaseScreen( props ) {

  const baseRef    = useRef( null );
  const contentRef = useRef( null );

  const bg_color     = useSelector( ( state ) => state.colorTheme.fill_active );
  const cards        = useSelector( ( state ) => state.configParams.cards )

  const [ contentWidth, setContentWidth ]       = useState( 99 );
  const [ scrollbarHeight, setScrollbarHeight ] = useState( PADDING );
  const [ scrollEvent, setScrollEvent ]         = useState( null );

  function changeScrollbarSize () {
    setScrollbarHeight( baseRef.current.clientHeight / contentRef.current.scrollHeight )
    if ( scrollbarHeight == visualViewport.height - PADDING * 2 ) setContentWidth( 100 );
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
    window.addEventListener( "resize", changeScrollbarSize )
  })

  function scrollTo ( percent ) {
    if ( contentRef.current ) {
      contentRef.current.scroll( 0, percent * contentRef.current.scrollHeight );
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
  
  const [ clickY, setClickY ]             = useState( PADDING );
  const [ cursor, setCursor ]             = useState( "pointer" );
  const [ sliderHeight, setSliderHeight ] = useState( 5 );

  const scrollbarBgLight   = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const scrollbarBgDark    = useSelector( ( state ) => state.colorTheme.fill_active );
  const scrollbarBorder    = useSelector( ( state ) => state.colorTheme.lines );
  const scrollbarBoxBorder = useSelector( ( state ) => state.colorTheme.stroke_active );

  const colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
      ${ scrollbarBgDark } ${ Math.floor(( clickY / window.innerHeight ) * 100) }% )`;

  useEffect( () => {
    if ( props.scrollEvent && blockRef.current && sliderRef.current ){
      const maxScroll = blockRef.current.clientHeight - sliderRef.current.clientHeight - PADDING;
      setClickY( ( prev ) => Math.min( Math.max( PADDING, prev + props.scrollEvent.deltaY * 0.1 ), maxScroll - PADDING));
    }
  }, [ props.scrollEvent ]); 

  useEffect( () => {
    setSliderHeight( ( blockRef.current.clientHeight - PADDING * 2 - menuHeight ) * props.scrollbarHeight  )
  }, [ props.scrollbarHeight ]);

  useEffect( () => {
    props.scrollTo( ( clickY + PADDING + menuHeight ) / ( blockRef.current.clientHeight - PADDING * 2 ) )
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