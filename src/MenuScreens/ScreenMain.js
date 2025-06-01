import React, { useRef } from 'react';
import BaseScreen        from '../Components/BaseScreen';
import Feed              from '../Components/Feed/Feed';

export default function ScreenMain( props ) {
  const scroll = null;
  return (
    <BaseScreen scroll={ true }>
      { props.children }
      <Feed/>
    </BaseScreen>
  );
};
