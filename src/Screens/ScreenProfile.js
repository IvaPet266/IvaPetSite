import React from 'react';
import BaseScreen from '../Components/BaseScreen';
import { useSelector } from 'react-redux';

export default function ScreenProfile( props ) {

  const userName = useSelector( ( state ) => state.userData.userName );
  const userBio = useSelector ( ( state ) => state.userData.userBio );

  let text;
  if ( userBio.length > 30 ) text = `${ userBio.slice( 0, 30 ) }...`
  else text = userBio;

  return (
    <BaseScreen>
      { props.children }
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "5px" }}>
        <img style={{ 
                    height: "70px", width: "70px", background: "transparent", 
                    backgroundColor: "black", borderRadius: "50%" }}/>
        <p style={{ margin: "5px" }}>@{ userName }</p>
        <p style={{ margin: "5px" }}>{ text }</p>
      </div>
      <div style={{ background: "white" }}>ScreenProfile</div>
      
    </BaseScreen>
  )
}
