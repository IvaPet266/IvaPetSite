import React, { useState, useRef, useEffect, useLayoutEffect, use } from 'react';
import { useDispatch, useSelector }                                         from 'react-redux';
import Menu                                                    from './Menu';
import { changeParameter } from '../app/store';

const PADDING = 5;
// const menuHeight = 100;

export default function BaseScreen( props ) {

  const baseRef    = useRef( null );
  const contentRef = useRef( null );

  const bg_color   = useSelector( ( state ) => state.colorTheme.fill_active );
  const cards      = useSelector( ( state ) => state.configParams.cards );
  const isDragging = useSelector( ( state ) => state.configParams.isDragging );

  const [ deltaY, setDeltaY ]             = useState( null );
  const [ sliderHeight, setSliderHeight ] = useState( null );
  const [ contentWidth, setContentWidth ] = useState( props.scroll ? 99 : 100 );

  function scrollTo( percent ) {
    contentRef.current.scroll( 0, percent * contentRef.current.scrollHeight )
  }

  function onWheel ( event ) {
    setDeltaY( event.nativeEvent.deltaY + Math.random() );
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
        backgroundColor: bg_color,
        cursor:          isDragging ? "grabbing" : "auto"
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
            deltaY        = { deltaY }
            sliderHeight  = { sliderHeight }
            scrollTo      = { scrollTo }
          />
        </>
      )}
    </div>
  )
};


function Scrollbar( props ) {

  const sliderRef  = useRef( null );
  const blockRef   = useRef( null );
  const isDragging = useRef( false );
  
  const [ clickY, setClickY ] = useState( 0 );
  const [ cursor, setCursor ] = useState( "grab" );

  const dispatcher = useDispatch();

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

  //* скролл ленты
  useEffect(() => {
    if ( blockRef.current ) {
      const percent = clickY / blockRef.current.clientHeight;
      props.scrollTo( percent );
    }
  }, [ clickY ]);

  //* перемещение ползунка
  useEffect(() => {
    if ( blockRef.current ) {
      changeClickY( clickY + props.deltaY * 0.15 );
    }
  }, [ props.deltaY ]);

  //* изменение clickY
  function changeClickY( newValue ) {
      const maxScroll = blockRef.current.clientHeight - props.sliderHeight;
      setClickY( Math.min( Math.max( 0, newValue ), maxScroll ))
  };

  //* начало перетаскивания
  function dragStart() {
    isDragging.current = true;
    setCursor( "grabbing" );
    dispatcher( changeParameter( { name: "isDragging", value: true } ) );
  };
  
  //* конец перетаскивания
  function dragEnd() {
    isDragging.current = false;
    setCursor( "grab" );
    dispatcher( changeParameter( { name: "isDragging", value: false } ) );
  };
  
  //* процесс перетаскивания
  function dragging( event ) {
    if ( isDragging.current ) {
      changeClickY( event.clientY );
    };
  };
  
  //* подписки на события
  useEffect(() => {
    document.addEventListener( "mousemove", dragging );
    document.addEventListener( "mouseup", dragEnd );
    return () => {
      document.removeEventListener( "mousemove", dragging );
      document.removeEventListener( "mouseup", dragEnd );
    }
  }, [])

  return (
    <div 
      id      ="scrollDiv"
      style   ={{ 
        background: `linear-gradient(${ scrollbarBgDark } 10%, 30%, ${ scrollbarBgLight })`, 
        border:     `solid ${ scrollbarBorder } 1px`, 
        margin:     "0", 
        width:      "1%", 
        cursor:     isDragging ? "grabbing" : "pointer",
      }} 
      onClick ={ ( event ) => changeClickY( event.clientY ) }
      ref     ={ blockRef }
      >
      <div 
        id          ="slider"
        ref         ={ sliderRef }
        onMouseDown ={ dragStart }
        style       ={{ 
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
          cursor:         cursor
        }}
      />
    </div>
  )
}