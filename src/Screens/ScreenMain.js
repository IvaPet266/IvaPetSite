import React from 'react';
import BaseScreen from '../Components/BaseScreen';
import Scroll from '../Components/Scroll';

export default function ScreenMain( props ) {
  return (
    <BaseScreen scroll={ true }>
      { props.children }
      <Scroll/>
    </BaseScreen>
  )
};
