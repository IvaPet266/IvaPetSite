import React, { useState, useRef, useEffect, use } from 'react';
import { useSelector } from 'react-redux';
import Menu from './Menu'


export default function BaseScreen( props ) {
  const bg_color = useSelector( ( state ) => state.colorTheme.fill_active );
  
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "99%", minHeight: "100vh", backgroundColor: bg_color }}>
        <Menu/>
        { props.children }
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
        <p>dfgvb</p>
      </div>
      <ScrollBar/>
    </div>
  )
};

export function ScrollBar ( props ) {
  const [ isDragging, setIsDragging ] = useState( false );
  const [ positionY, setPositionY ] = useState( 0 );
  const innerDivRef = useRef( null ); 

  const handleMouseDown = ( event ) => {
    if ( !innerDivRef.current ) return;
    
    console.log("mouseDown")

    const initialY = event.clientY;

    const rect = innerDivRef.current.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY;

    setIsDragging( true );

    const handleMouseMove = ( event ) => {
      if ( !isDragging || !innerDivRef.current ) return;
      
      console.log("mouseMove")

      const newY = Math.min(
        Math.max( offsetTop + event.clientY - initialY, 0 ),
        window.innerHeight - innerDivRef.current.offsetHeight
      );

      setPositionY( newY );
      window.scrollBy( 0, newY )
    };

    const handleMouseUp = () => {
      document.removeEventListener( 'mousemove', handleMouseMove );
      document.removeEventListener( 'mouseup', handleMouseUp );
      setIsDragging( false );
    };

    document.addEventListener( 'mousemove', handleMouseMove );
    document.addEventListener( 'mouseup', handleMouseUp );

    useEffect(() => {
      return () => {
        document.removeEventListener( 'mousemove', handleMouseMove );
        document.removeEventListener( 'mouseup', handleMouseUp );
      };
    }, []);
  };

  const handleScroll = () => {
    let scrollPosition = window.scrollY || window.pageYOffset;
    setPositionY( `${50 + scrollPosition / 2}%` );
  }

  const handleWheel = ( event ) => {
    setIsDragging( true )
    window.scrollBy( 0, event.deltaY );
    handleScroll();
  }

  useEffect(() => {
    window.addEventListener( 'scroll', handleScroll );
    window.addEventListener( 'wheel', handleWheel );
  }, [])

  // handleScroll();


  return (
    <div style={{ backgroundColor: "aqua", margin: "0", width: "1%" }}>
      <div ref={ innerDivRef }
        style={{
          position: isDragging ? 'fixed' : 'static',
          top: isDragging ? `${ positionY }px` : undefined,
          height: "5vh", justifyContent: "center", alignItems: "center",
          backgroundColor: "red", borderRadius: "10px",
          cursor: "pointer"
        }}
        onMouseDown={ handleMouseDown }
      />
    </div>
  );
}
