import React, { useRef } from 'react';
import BaseScreen        from '../Components/BaseScreen';
import Scroll            from '../Components/Scroll';

export default function ScreenMain( props ) {
  const scroll = null;
  return (
    <BaseScreen scroll={ true } scrollDiv={ scroll }>
      { props.children }
      <Scroll scroll={ scroll }/>
    </BaseScreen>
  )
};
