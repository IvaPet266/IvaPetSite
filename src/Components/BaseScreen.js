import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Menu from './Menu'


export default function BaseScreen( props ) {
  const bg_color = useSelector( ( state ) => state.colorTheme.fill_active )
  return (
    <div style={{ minHeight:"100vh", backgroundColor: bg_color }}>
          <Menu/>
        { props.children }
    </div>
  )
};
