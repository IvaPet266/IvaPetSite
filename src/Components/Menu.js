import React, { useState } from 'react';
import { useScreen } from '../Screens/ProviderScreen';
import SVGButton, { SVGButton2Paths } from './SVGButtons';
import { useSelector } from 'react-redux';


export default function Menu( props ) {
  
  const text = {
    "eng": {
      "mainScreen": "Main",
      "competitionsScreen": "Competitions",
      "subscriptionsScreen": "Subscription",
      "discussionScreen": "Discussion"
    },
    "rus": {
      "mainScreen": "Главная",
      "competitionsScreen": "Конкурсы",
      "subscriptionsScreen": "Подписки",
      "discussionScreen": "Обсуждение"
    }
  };

  return (
    <div id="menu" style={{
        display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "nowrap",
        background: "#DBC1FF", padding: "", alignItems: "center", height: "100px", border: "solid black 1px" 
      }}>
      <div>
        <Button id="main" style_={ false }>Main</Button>
        <Button id="contests" style_={ false }>Contests</Button>
        <Button id="discussion" style_={ false }>Discussion</Button>
      </div>  

      <SVGButton2Paths id="newPost" 
        d1="M35 67.5C52.9493 67.5 67.5 52.9493 67.5 35C67.5 17.0507 52.9493 2.5 35 2.5C17.0507 2.5 2.5 17.0507 2.5 35C2.5 52.9493 17.0507 67.5 35 67.5Z"
        d2="M35 22V48M22 35H48M67.5 35C67.5 52.9493 52.9493 67.5 35 67.5C17.0507 67.5 2.5 52.9493 2.5 35C2.5 17.0507 17.0507 2.5 35 2.5C52.9493 2.5 67.5 17.0507 67.5 35Z"
      />
      <div>  
        <SVGButton id="search" 
          d="M55.25 55.25L42.5625 42.5625M49.4167 26.0833C49.4167 38.97 38.97 49.4167 26.0833 49.4167C13.1967 49.4167 2.75 38.97 2.75 26.0833C2.75 13.1967 13.1967 2.75 26.0833 2.75C38.97 2.75 49.4167 13.1967 49.4167 26.0833Z"
        />
        <SVGButton id="profile" 
          d="M49.3337 55.25V49.4167C49.3337 46.3225 48.1045 43.355 45.9166 41.1671C43.7286 38.9792 40.7612 37.75 37.667 37.75H14.3337C11.2395 37.75 8.272 38.9792 6.08408 41.1671C3.89615 43.355 2.66699 46.3225 2.66699 49.4167V55.25M37.667 14.4167C37.667 20.86 32.4436 26.0833 26.0003 26.0833C19.557 26.0833 14.3337 20.86 14.3337 14.4167C14.3337 7.97334 19.557 2.75 26.0003 2.75C32.4436 2.75 37.667 7.97334 37.667 14.4167Z"
        />
      </div>
    </div>
  )
};



export function Button( props ) {

  const { screen, setScreen } = useScreen();
  const menuBg = useSelector ( ( state ) => state.colorTheme.fill_inactive );
  const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
  const bioTextColor = useSelector( ( state ) => state.colorTheme.stroke_active );

  const [ backgroundColorInactive, setBackgroundColorInactive ] = useState( menuBg );
  const [ textColorInactive, setTextColorInactive ] = useState( menuTextColor );
  
  let style;

  switch ( screen ) {
    case props.id: style={
        background: menuTextColor, color: bioTextColor, height: "50px", width: "160px", textAlign: "center",
        fontFamily: "Cormorant Infant, serif", margin: "8px", whiteSpace: "nowrap"
      }; break;
    default: style={
        background: backgroundColorInactive, color: textColorInactive, borderColor: backgroundColorInactive, 
        height: "50px", width: "160px", textAlign: "center", fontFamily: "Cormorant Infant, serif", fontWeight: "bold",
        margin: "8px", transition: "all 300ms ease-out", whiteSpace: "nowrap"
      }; break;
  };

  return (
    <button onClick={ () => setScreen( props.id ) } 
      onMouseEnter={() => {
        if ( props.id != screen ) {
          setBackgroundColorInactive( menuTextColor );
          setTextColorInactive( bioTextColor );
        }
      }} onMouseLeave={() => {
        if ( props.id != screen ) {
          setBackgroundColorInactive( menuBg );
          setTextColorInactive( menuTextColor );
        }
      }}
      style={ style }>{ props.children }</button>
  )
};