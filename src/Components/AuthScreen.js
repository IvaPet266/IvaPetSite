import React, { useState }          from 'react';
import BaseScreen                   from './BaseScreen';
import { changeParameter }          from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate }              from 'react-router';

export default function AuthScreen( props ) {

  const lines         = useSelector( ( state ) => state.colorTheme.lines         );
  const stroke_active = useSelector( ( state ) => state.colorTheme.stroke_active );
  const fill_inactive = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const fill_active   = useSelector( ( state ) => state.colorTheme.fill_active   );

  const [ registerFocus, setRegisterFocus ] = useState( 1   );
  const [ loginFocus,    setLoginFocus    ] = useState( 0.5 );

  const [ registerLoginState, setRegisterLoginState ] = useState( "register" );

  const navigate   = useNavigate();
  const dispatcher = useDispatch();

  return (
    <BaseScreen>
        <div
          className='CormorantInfant-serif'
          style={{
            display:         "flex",
            flexDirection:   "column",
            width:           "30%",
            position:        "absolute",
            top:             "calc( 100px + ( 100vh - 100px ) * 0.05 )",
            bottom:          "calc( ( 100vh - 100px ) * 0.05 )",
            left:            "calc( 100vw - 65% )",
            border:          `solid ${ stroke_active } 2px`,
            borderRadius:    "20px",
            padding:         "5px",
            backgroundColor: fill_inactive,
            color:           fill_active,
            // justifyContent:  "center",
            alignItems:      "center"
          }}
          >
            <h3
              style={{
                fontSize:  "28px", 
                margin:    0,
                marginTop: "10px",
                height:    "10%"
              }}
              >Authorization</h3>
            <div 
              style={{
                height:         "5%",
                display:        "flex",
                flexDirection:  "row",
                justifyContent: "space-between"
              }}
              >
              <h3 
                style={{
                  transition:  "opacity 300ms ease-out",
                  cursor:      "pointer",
                  opacity:     registerFocus,
                  marginRight: "5px",
                  marginTop:  "5px"
                }}
                onMouseEnter={() => {
                  if ( registerLoginState !== "register") {
                    setRegisterFocus( 0.9 );
                  };
                }}
                onMouseLeave={() => {
                  if ( registerLoginState !== "register") {
                    setRegisterFocus( 0.5 );
                  };
                }}
                onClick={() => {
                  setRegisterLoginState( "register" );
                  setRegisterFocus( 1               );
                  setLoginFocus( 0.5                );
                }}
                >
                register
              </h3>
              <h3 
                style={{
                  transition: "opacity 300ms ease-out",
                  cursor:     "pointer",
                  opacity:    loginFocus,
                  marginLeft: "5px",
                  marginTop:  "5px"
                }}
                onMouseEnter={() => {
                  if ( registerLoginState !== "login" ) {
                    setLoginFocus( 0.9 );
                  };
                }}
                onMouseLeave={() => {
                  if ( registerLoginState !== "login" ) {
                    setLoginFocus( 0.5 );
                  };
                }}
                onClick={() => {
                  setRegisterLoginState( "login" );
                  setLoginFocus( 1               );
                  setRegisterFocus( 0.5          );
                }}

                >
                log in
              </h3>
              

            </div>
            <button
              style={{
                position: "absolute",
                bottom:   "10px"
              }}
              onClick={() => {
                dispatcher( changeParameter( { name: "isAuthorized", value: true } ) );
                navigate( "/newpost" );
              }}
              >
              TEST BUTTON
            </button>


        </div>
    </BaseScreen>
  )
}
