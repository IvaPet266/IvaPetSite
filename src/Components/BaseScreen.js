import React, {  useState } from 'react';
import { useSelector } from 'react-redux';



export default function BaseScreen( props ) {
  const bg_color = useSelector( ( state ) => state.colorTheme.fill_active )
  return (
    <div style={{ minHeight:"100vh", background: bg_color }}>
        { props.children }
    </div>
  )
};
 