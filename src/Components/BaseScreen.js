import React, { useState, useRef, useEffect, useLayoutEffect, } from 'react';
import { useDispatch, useSelector }                             from 'react-redux';
import Menu                                                     from './Menu';
import { changeParameter }                                      from '../app/store';

// const PADDING = 5;
const menuHeight = 100;

export default function BaseScreen( props ) {

  const baseRef    = useRef( null );
  const contentRef = useRef( null );

  const top        = useRef( 0 );
  const topCurrent = useRef( 0 );

  const bg_color   = useSelector( ( state ) => state.colorTheme.fill_active  );
  const cards      = useSelector( ( state ) => state.configParams.cards      );
  const isDragging = useSelector( ( state ) => state.configParams.isDragging );

  const [ deltaY,       setDeltaY       ] = useState( null                    );
  const [ sliderHeight, setSliderHeight ] = useState( 5                       );
  const [ contentWidth, setContentWidth ] = useState( props.scroll ? 99 : 100 );


  function scrollWrapper() {
    const delta    = topCurrent.current - top.current;
    const deltaAbs = Math.abs( delta );
    
    if ( delta > 0 ) {
      topCurrent.current = Math.max( topCurrent.current - ( deltaAbs / 300 ) + 1 - menuHeight, top.current );
    } else {
      topCurrent.current = Math.min( topCurrent.current + ( deltaAbs / 300 ) + 1, top.current );
    };

    contentRef.current.scroll( 0, topCurrent.current );

    if ( topCurrent.current != top.current ) {
      requestAnimationFrame( scrollWrapper );
    };
  };

  //* прокрутка содержимого страницы
  function scrollTo( percent ) {
    
    top.current = ( Math.round( percent * 1000 ) / 1000 )* contentRef.current.scrollHeight;
    
    scrollWrapper(); 
    // contentRef.current.scroll(0, top.current)   
  };

  //* обработка прокрутки колёсика
  function onWheel ( event ) {
    setDeltaY( event.nativeEvent.deltaY + Math.random() );
  };

  //* обработка изменения размеров страницы/окна
  function onResize () {
    if ( contentRef.current && baseRef.current ) {
      setSliderHeight( ( contentRef.current.clientHeight * baseRef.current.clientHeight ) / contentRef.current.scrollHeight );
    };
  };

  function stopDropFiles( event ) {
    event.preventDefault();
    event.stopPropagation();
  };

  //* подписка/окна на событие изменения размеров страницы/окна после рендера страницы
  useEffect(() => {
    window.addEventListener( "resize", onResize                 );
    document.addEventListener( 'dragover', stopDropFiles, false );
    document.addEventListener( 'drop', stopDropFiles, false     );
    
    return () => {
      window.removeEventListener( "resize", onResize                 );
      document.removeEventListener( 'dragover', stopDropFiles, false );
      document.removeEventListener( 'drop', stopDropFiles, false     );
    };
  });

  //* вызов функции onResize() сразу после рендера страницы, чтобы своевременно изменить размер слайдера
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
      ref    ={ baseRef }
      onDrop     ={() => false }
      onDragStart={() => false }
      onDragEnter={( event ) => {
        event.preventDefault(); 
        return false;
      }}
      onDragOver ={( event ) => {
        event.preventDefault(); 
        return false; 
      }}
      >
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
            overflow:        "hidden",
            transition:      "all 100ms ease"
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
  );
};


function Scrollbar( props ) {

  const sliderRef  = useRef( null  );
  const blockRef   = useRef( null  );
  const isDragging = useRef( false );
  
  const [ clickY, setClickY ] = useState( 0      );
  const [ cursor, setCursor ] = useState( "grab" );

  let slider = null;

  const dispatcher = useDispatch();

  let colorTransitionStyle = `linear-gradient(to bottom, ${ scrollbarBgLight } 0%,
    ${ scrollbarBgDark } ${ Math.floor( ( clickY / visualViewport.height ) * 100 ) }% )`;


  //* цвета
  const scrollbarBgLight   = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const scrollbarBgDark    = useSelector( ( state ) => state.colorTheme.fill_active   );
  const scrollbarBorder    = useSelector( ( state ) => state.colorTheme.lines         );
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
    };
  }, [ clickY ]);

  //* перемещение ползунка
  useEffect(() => {
    if ( blockRef.current ) {
      changeClickY( clickY + props.deltaY * 0.15 );
    };
  }, [ props.deltaY ]);

  //* изменение clickY
  function changeClickY( newValue ) {
      const maxScroll = blockRef.current.clientHeight - props.sliderHeight;
      const bottomLimit = visualViewport.height - props.sliderHeight;
      
      setClickY( Math.min( Math.max( 0, newValue ), Math.min( maxScroll, bottomLimit ) ) );
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
  
  //* подписки/отписки на/от события(й)
  useEffect(() => {
    document.addEventListener( "mousemove", dragging );
    document.addEventListener( "mouseup", dragEnd );
    slider = document.getElementById( "slider" );
    return () => {
      document.removeEventListener( "mousemove", dragging );
      document.removeEventListener( "mouseup", dragEnd );
    };
  }, []);

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
  );
};