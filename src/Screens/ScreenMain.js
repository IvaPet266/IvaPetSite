import React, { useRef } from 'react';
import BaseScreen        from '../Components/BaseScreen';
import Scroll            from '../Components/Scroll';

export default function ScreenMain( props ) {
  const scrollRef = useRef();
  return (
    <BaseScreen scroll={ true } scrollRef={ scrollRef }>
      { props.children }
      <Scroll scrollRef={ scrollRef }/>
    </BaseScreen>
  )
};
