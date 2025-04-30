import React, { useState }            from 'react';
import { useScreen }                  from './ProviderScreen';
import SVGButton, { SVGButton2Paths } from './SVGButtons';
import { useSelector }                from 'react-redux';
import { NavLink, Link, useLocation } from 'react-router';


export default function Menu( props ) {
  
  const menuBg = useSelector ( ( state ) => state.colorTheme.fill_inactive );
  const lines = useSelector ( ( state ) => state.colorTheme.lines );

  const location = useLocation();

  return (
    <nav>
      <div id="menu" 
        style={{
          display:        "flex", 
          flexDirection:  "row", 
          justifyContent: "space-between", 
          flexWrap:       "nowrap", 
          background:     menuBg, 
          padding:        "", 
          alignItems:     "center", 
          height:         "100px", 
          border:         `solid ${ lines } 1px` 
        }}>
        <div>
          <NavLink to="/">
            { ({ isActive }) => (
              <Button 
                id      ="main" 
                isActive={ isActive }>
                  Main
              </Button>
            )}
          </NavLink>
          <NavLink to="/contests">
            { ({ isActive }) => (
              <Button 
                id      ="contests" 
                isActive={ isActive }>
                  Contests
              </Button>
            )}
          </NavLink>
          <NavLink to="/discussion">
            { ({ isActive }) => (
              <Button 
                id      ="discussion" 
                isActive={ isActive }>
                  Discussion
              </Button>
            )}
          </NavLink>
        </div>  
        <NavLink to="/newpost">
          { ({ isActive }) => (
            <SVGButton2Paths 
              id      ="newpost" 
              isActive={ isActive }
              d1      ="M35 67.5C52.9493 67.5 67.5 52.9493 67.5 35C67.5 17.0507 52.9493 2.5 35 2.5C17.0507 2.5 2.5 17.0507 2.5 35C2.5 52.9493 17.0507 67.5 35 67.5Z"
              d2      ="M35 22V48M22 35H48M67.5 35C67.5 52.9493 52.9493 67.5 35 67.5C17.0507 67.5 2.5 52.9493 2.5 35C2.5 17.0507 17.0507 2.5 35 2.5C52.9493 2.5 67.5 17.0507 67.5 35Z"
            />
          )}
        </NavLink>
        <div>  
          <NavLink to="/search">
            { ({ isActive }) => (
              <SVGButton 
                menu    ={ true } 
                isActive={ isActive } 
                id      ="search" 
                w       ="58" 
                h       ="58" 
                d       ="M55.25 55.25L42.5625 42.5625M49.4167 26.0833C49.4167 38.97 38.97 49.4167 26.0833 49.4167C13.1967 49.4167 2.75 38.97 2.75 26.0833C2.75 13.1967 13.1967 2.75 26.0833 2.75C38.97 2.75 49.4167 13.1967 49.4167 26.0833Z"
              />
            )}
          </NavLink>
          <NavLink to="/profile/collections">
            { ({ isActive }) => {
              if ( location.pathname.indexOf( "profile" ) != -1 ) isActive = true;
              return (
                <SVGButton 
                  menu    ={ true } 
                  isActive={ isActive } 
                  id      ="profile" 
                  w       ="52" 
                  h       ="58" 
                  d       ="M49.3337 55.25V49.4167C49.3337 46.3225 48.1045 43.355 45.9166 41.1671C43.7286 38.9792 40.7612 37.75 37.667 37.75H14.3337C11.2395 37.75 8.272 38.9792 6.08408 41.1671C3.89615 43.355 2.66699 46.3225 2.66699 49.4167V55.25M37.667 14.4167C37.667 20.86 32.4436 26.0833 26.0003 26.0833C19.557 26.0833 14.3337 20.86 14.3337 14.4167C14.3337 7.97334 19.557 2.75 26.0003 2.75C32.4436 2.75 37.667 7.97334 37.667 14.4167Z"
                />
              )
            }}
          </NavLink>
        </div>
      </div>      
    </nav>
  )
};



export function Button( props ) {

  const menuBg        = useSelector ( ( state ) => state.colorTheme.fill_inactive );
  const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
  const bioTextColor  = useSelector( ( state ) => state.colorTheme.stroke_active );

  const [ backgroundColorInactive, setBackgroundColorInactive ] = useState( menuBg );
  const [ textColorInactive, setTextColorInactive ]             = useState( menuTextColor );
  
  let style;

  switch ( props.isActive ) {
    case true: 
      style={
        background: menuTextColor, 
        color:      bioTextColor, 
        height:     "50px", 
        width:      "160px", 
        textAlign:  "center",
        fontFamily: "Cormorant Infant, serif", 
        margin:     "8px", 
        whiteSpace: "nowrap", 
        cursor:     "pointer"
      }; break;
    default: style={
        background:  backgroundColorInactive, 
        color:       textColorInactive, 
        borderColor: backgroundColorInactive, 
        height:      "50px", 
        width:       "160px", 
        textAlign:   "center", 
        fontFamily:  "Cormorant Infant, serif", 
        fontWeight:  "bold",
        margin:      "8px", 
        transition:  "all 300ms ease-out", 
        whiteSpace:  "nowrap", 
        cursor:      "pointer"
      }; break;
  };

  return (
    <button 
      onMouseEnter={() => {
        setBackgroundColorInactive( menuTextColor );
        setTextColorInactive( bioTextColor );
      }} 
      onMouseLeave={() => {
        setBackgroundColorInactive( menuBg );
        setTextColorInactive( menuTextColor );
      }}
      style       ={ style }>
        { props.children }
    </button>
  )
};