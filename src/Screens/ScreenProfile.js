import React, { useEffect, useState } from 'react';
import BaseScreen from '../Components/BaseScreen';
import { useDispatch, useSelector } from 'react-redux';
import { changeColorTheme, changeTheme } from '../app/store';


export default function ScreenProfile( props ) {

  const menuBg = useSelector ( ( state ) => state.colorTheme.fill_inactive );
  const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
  const bioTextColor = useSelector( ( state ) => state.colorTheme.stroke_active );
  const lines = useSelector( ( state ) => state.colorTheme.lines );

  const [ menuSection, setMenuSection ] = useState( "Collections" );

  const [ collectionsColor, setCollectionsColor ] = useState( menuTextColor );  
  const [ collectionsStrokeSVG, setCollectionsStrokeSVG ] = useState( menuTextColor );
  const [ collectionsFillSVG, setCollectionsFillSVG ] = useState( "none" );

  const [ savedColor, setSavedColor ] = useState( menuTextColor );
  const [ savedStrokeSVG, setSavedStrokeSVG ] = useState( menuTextColor );

  const [ likedColor, setLikedColor ] = useState( menuTextColor );
  const [ likedStrokeSVG, setLikedStrokeSVG ] = useState( menuTextColor );
  const [ likedFillSVG, setLikedFillSVG ] = useState( "none" );

  const [ repostedColor, setRepostedColor ] = useState( menuTextColor );
  const [ repostedStrokeSVG, setRepostedStrokeSVG ] = useState( menuTextColor );

  const [ settingsColor, setSettingsColor ] = useState( menuTextColor );
  const [ settingsStrokeSVG, setSettingsStrokeSVG ] = useState( menuTextColor );

  useEffect(() => {
    if ( menuSection == "Collections" ) {
      setCollectionsColor( "#FFF600" );
      setCollectionsStrokeSVG( lines );
      setCollectionsFillSVG( "#FFF600" );

      setSavedColor( menuTextColor );
      setSavedStrokeSVG( menuTextColor );

      setLikedColor( menuTextColor );
      setLikedFillSVG( "none" );
      setLikedStrokeSVG( menuTextColor );

      setRepostedColor( menuTextColor );
      setRepostedStrokeSVG( menuTextColor );

      setSettingsColor( menuTextColor );
      setSettingsStrokeSVG( menuTextColor );
    } else if ( menuSection == "Saved" ) {
      setCollectionsColor( menuTextColor );
      setCollectionsStrokeSVG( menuTextColor );
      setCollectionsFillSVG( "none" );

      setSavedColor( "#00BC13" );
      setSavedStrokeSVG( "#00BC13" );

      setLikedColor( menuTextColor );
      setLikedFillSVG( "none" );
      setLikedStrokeSVG( menuTextColor );

      setRepostedColor( menuTextColor );
      setRepostedStrokeSVG( menuTextColor );

      setSettingsColor( menuTextColor );
      setSettingsStrokeSVG( menuTextColor );
    } else if ( menuSection == "Liked" ) { 
      setCollectionsColor( menuTextColor );
      setCollectionsStrokeSVG( menuTextColor );
      setCollectionsFillSVG( "none" );

      setSavedColor( menuTextColor );
      setSavedStrokeSVG( menuTextColor );
      
      setLikedColor( "#B90000" );
      setLikedFillSVG( "#B90000" );
      setLikedStrokeSVG( lines );

      setRepostedColor( menuTextColor );
      setRepostedStrokeSVG( menuTextColor );

      setSettingsColor( menuTextColor );
      setSettingsStrokeSVG( menuTextColor );
    } else if ( menuSection == "Reposted" ) {
      setCollectionsColor( menuTextColor );
      setCollectionsStrokeSVG( menuTextColor );
      setCollectionsFillSVG( "none" );
      
      setSavedColor( menuTextColor );
      setSavedStrokeSVG( menuTextColor );
      
      setLikedColor( menuTextColor );
      setLikedFillSVG( "none" );
      setLikedStrokeSVG( menuTextColor );
      
      setRepostedColor( "#4700AA" );
      setRepostedStrokeSVG( "#4700AA" );

      setSettingsColor( menuTextColor );
      setSettingsStrokeSVG( menuTextColor );
    } else if ( menuSection == "Settings" ) {
      setCollectionsColor( menuTextColor );
      setCollectionsStrokeSVG( menuTextColor );
      setCollectionsFillSVG( "none" );

      setSavedColor( menuTextColor );
      setSavedStrokeSVG( menuTextColor );
      
      setLikedColor( menuTextColor );
      setLikedFillSVG( "none" );
      setLikedStrokeSVG( menuTextColor );
      
      setRepostedColor( menuTextColor );
      setRepostedStrokeSVG( menuTextColor );

      setSettingsColor( bioTextColor );
      setSettingsStrokeSVG( bioTextColor );
    }
  }, [ menuSection ])
    

  return (
    <BaseScreen>
      { props.children }
      <div className='CormorantInfant-serif' style={{ display: "flex", flexDirection: "row" }}>
        <MainProfileDiv instance={ menuSection }/>
        <div style={{ width: "20%", height: "100vh", background: menuBg, border: "solid black 2px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h5 style={{ fontSize: "35px", margin: "0px", color: menuTextColor }}>
            <u>Contents</u>
          </h5>
          <div onMouseEnter={() => {
              setCollectionsColor( "#FFF600" );
              setCollectionsStrokeSVG( lines );
              setCollectionsFillSVG( "#FFF600" );
            }} onMouseLeave={() => {
              if ( menuSection != "Collections" ) {
                setCollectionsColor( menuTextColor );
                setCollectionsStrokeSVG( menuTextColor );
                setCollectionsFillSVG( "none" );
              }
            }} onClick={() => {
              setMenuSection( "Collections" );
            }}
            style={{ width: "100%", display: "flex", flexDirection: "row", padding: "0px", justifyContent: "space-between" }}>
            <button style={{ background: "transparent", border: "none", margin: "0px", padding: "2px" }}>
                <span className='CormorantInfant-serif' style={{ pointerEvents: "none", transition: "color 300ms ease-out", fontWeight: "bold", color: collectionsColor, fontSize: "25px" }}>
                  Collections
                </span>
            </button>
            <svg style={{ transition: "fill 300ms ease-out", pointerEvents: "none", margin: "0px", paddingRight: "5px", alignSelf: "center" }} width="31" height="31" viewBox="0 0 31 31" fill={ collectionsFillSVG } xmlns="http://www.w3.org/2000/svg">
              <path style={{ transition: "stroke 300ms ease-out", stroke: collectionsStrokeSVG, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} d="M15.4997 2.58325L19.4909 10.6691L28.4163 11.9737L21.958 18.2641L23.4822 27.1508L15.4997 22.9528L7.51717 27.1508L9.04134 18.2641L2.58301 11.9737L11.5084 10.6691L15.4997 2.58325Z"/>
            </svg>
          </div>
          <div onMouseEnter={() => {
              setSavedColor( "#00BC13" );
              setSavedStrokeSVG( "#00BC13" );
            }} onMouseLeave={() => {
              if ( menuSection != "Saved" ) {
                setSavedColor( menuTextColor );
                setSavedStrokeSVG( menuTextColor );
              }
            }} onClick={() => {
              setMenuSection( "Saved" );
            }}
            style={{ width: "100%", display: "flex", flexDirection: "row", padding: "0px", justifyContent: "space-between" }}>
            <button style={{ background: "transparent", border: "none", margin: "0px", padding: "2px" }}>
              <span className='CormorantInfant-serif' style={{ pointerEvents: "none", transition: "color 300ms ease-out", fontWeight: "bold", color: savedColor, fontSize: "25px" }}>
                Saved
              </span>
            </button>
            <svg style={{ transition: "all 300ms ease-out", pointerEvents: "none", margin: "0px", paddingRight: "5px", alignSelf: "center" }} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path style={{ transition: "stroke 300ms ease-out", stroke: savedStrokeSVG, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} d="M24.5 17.5V22.1667C24.5 22.7855 24.2542 23.379 23.8166 23.8166C23.379 24.2542 22.7855 24.5 22.1667 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V17.5M8.16667 11.6667L14 17.5M14 17.5L19.8333 11.6667M14 17.5V3.5"/>
            </svg>
          </div>
          <div onMouseEnter={() => {
              setLikedColor( "#B90000" );
              setLikedFillSVG( "#B90000" );
              setLikedStrokeSVG( lines );
            }} onMouseLeave={() => {
              if ( menuSection != "Liked" ) {
                setLikedColor( menuTextColor );
                setLikedFillSVG( "none" );
                setLikedStrokeSVG( menuTextColor );
              }
            }} onClick={() => {
              setMenuSection( "Liked" );
            }}
            style={{ width: "100%", display: "flex", flexDirection: "row", padding: "0px", justifyContent: "space-between" }}>
            <button style={{ background: "transparent", border: "none", margin: "0px", padding: "2px" }}>
              <span className='CormorantInfant-serif' style={{ pointerEvents: "none", transition: "color 300ms ease-out", fontWeight: "bold", color: likedColor, fontSize: "25px" }}>
                Liked
              </span>
            </button>
            <svg style={{ transition: "fill 300ms ease-out", pointerEvents: "none", margin: "0px", paddingRight: "5px", alignSelf: "center" }} width="28" height="28" viewBox="0 0 28 28" fill={ likedFillSVG } xmlns="http://www.w3.org/2000/svg">
              <path style={{ transition: "stroke 300ms ease-out", stroke: likedStrokeSVG, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} d="M24.3131 5.37827C23.7173 4.7821 23.0098 4.30919 22.2311 3.98653C21.4524 3.66387 20.6177 3.4978 19.7748 3.4978C18.9319 3.4978 18.0973 3.66387 17.3186 3.98653C16.5399 4.30919 15.8324 4.7821 15.2365 5.37827L13.9998 6.61493L12.7631 5.37827C11.5595 4.17463 9.92702 3.49843 8.22481 3.49843C6.52261 3.49843 4.89012 4.17463 3.68648 5.37827C2.48284 6.58191 1.80664 8.21439 1.80664 9.9166C1.80664 11.6188 2.48284 13.2513 3.68648 14.4549L13.9998 24.7683L24.3131 14.4549C24.9093 13.8591 25.3822 13.1515 25.7049 12.3728C26.0275 11.5941 26.1936 10.7595 26.1936 9.9166C26.1936 9.0737 26.0275 8.23905 25.7049 7.46035C25.3822 6.68165 24.9093 5.97415 24.3131 5.37827Z"/>
            </svg>
          </div>
          <div onMouseEnter={() => {
                setRepostedColor( "#4700AA" );
                setRepostedStrokeSVG( "#4700AA" );
              }} onMouseLeave={() => {
                if ( menuSection != "Reposted" ) {
                  setRepostedColor( menuTextColor );
                  setRepostedStrokeSVG( menuTextColor );
                }
              }} onClick={() => {
                setMenuSection( "Reposted" );
              }}
            style={{ width: "100%", display: "flex", flexDirection: "row", padding: "0px", justifyContent: "space-between" }}>
            <button style={{ background: "transparent", border: "none", margin: "0px", padding: "2px" }}>
              <span className='CormorantInfant-serif' style={{ pointerEvents: "none", transition: "color 300ms ease-out", fontWeight: "bold", color: repostedColor, fontSize: "25px" }}>
                Reposted
              </span>
            </button>
            <svg style={{ transition: "all 300ms ease-out", pointerEvents: "none", margin: "0px", paddingRight: "5px", alignSelf: "center" }} width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path style={{ transition: "stroke 300ms ease-out", stroke: repostedStrokeSVG, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} d="M17.8333 1.16675L22.5 5.83342M22.5 5.83342L17.8333 10.5001M22.5 5.83342H6.16667C4.92899 5.83342 3.742 6.32508 2.86683 7.20025C1.99167 8.07542 1.5 9.2624 1.5 10.5001V12.8334M6.16667 26.8334L1.5 22.1667M1.5 22.1667L6.16667 17.5001M1.5 22.1667H17.8333C19.071 22.1667 20.258 21.6751 21.1332 20.7999C22.0083 19.9247 22.5 18.7378 22.5 17.5001V15.1667"/>   
            </svg>
          </div>
          <hr style={{ border: "none", width: "100%", backgroundColor: lines, marginTop: "26px" }} size="3"/>
          <div onMouseEnter={() => {
                setSettingsColor( bioTextColor );
                setSettingsStrokeSVG( bioTextColor );
              }} onMouseLeave={() => {
                if ( menuSection != "Settings" ) {
                  setSettingsColor( menuTextColor );
                  setSettingsStrokeSVG( menuTextColor );
                }
              }} onClick={() => {
                setMenuSection( "Settings" );
              }}
            style={{ width: "100%", display: "flex", flexDirection: "row", padding: "0px", justifyContent: "space-between" }}>
            <button style={{ background: "transparent", border: "none", margin: "0px", padding: "2px" }}>
              <span className='CormorantInfant-serif' style={{ pointerEvents: "none", transition: "color 300ms ease-out", fontWeight: "bold", color: settingsColor, fontSize: "25px" }}>
                Settings
              </span>
            </button>
            <svg style={{ transition: "all 300ms ease-out", pointerEvents: "none", margin: "0px", paddingRight: "5px", alignSelf: "center" }} width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path style={{ transition: "stroke 300ms ease-out", stroke: settingsStrokeSVG, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} d="M13.5 16.875C15.364 16.875 16.875 15.364 16.875 13.5C16.875 11.636 15.364 10.125 13.5 10.125C11.636 10.125 10.125 11.636 10.125 13.5C10.125 15.364 11.636 16.875 13.5 16.875Z"/>
              <path style={{ transition: "stroke 300ms ease-out", stroke: settingsStrokeSVG, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} d="M21.825 16.875C21.6752 17.2143 21.6306 17.5907 21.6967 17.9557C21.7629 18.3206 21.9369 18.6574 22.1962 18.9225L22.2638 18.99C22.4729 19.199 22.6389 19.4471 22.7521 19.7203C22.8654 19.9934 22.9236 20.2862 22.9236 20.5819C22.9236 20.8776 22.8654 21.1703 22.7521 21.4435C22.6389 21.7166 22.4729 21.9648 22.2638 22.1737C22.0548 22.3829 21.8066 22.5489 21.5335 22.6621C21.2603 22.7754 20.9676 22.8336 20.6719 22.8336C20.3762 22.8336 20.0834 22.7754 19.8103 22.6621C19.5371 22.5489 19.289 22.3829 19.08 22.1737L19.0125 22.1062C18.7474 21.8469 18.4106 21.6729 18.0457 21.6067C17.6807 21.5406 17.3043 21.5852 16.965 21.735C16.6323 21.8776 16.3485 22.1144 16.1486 22.4162C15.9487 22.7181 15.8414 23.0717 15.84 23.4337V23.625C15.84 24.2217 15.6029 24.794 15.181 25.216C14.759 25.6379 14.1867 25.875 13.59 25.875C12.9933 25.875 12.421 25.6379 11.999 25.216C11.5771 24.794 11.34 24.2217 11.34 23.625V23.5237C11.3313 23.1514 11.2108 22.7902 10.9941 22.4873C10.7774 22.1843 10.4746 21.9536 10.125 21.825C9.78568 21.6752 9.40928 21.6306 9.04434 21.6967C8.67939 21.7629 8.34264 21.9369 8.0775 22.1962L8.01 22.2638C7.80104 22.4729 7.55289 22.6389 7.27974 22.7521C7.00659 22.8654 6.71381 22.9236 6.41812 22.9236C6.12244 22.9236 5.82965 22.8654 5.55651 22.7521C5.28336 22.6389 5.03521 22.4729 4.82625 22.2638C4.61705 22.0548 4.4511 21.8066 4.33787 21.5335C4.22464 21.2603 4.16635 20.9676 4.16635 20.6719C4.16635 20.3762 4.22464 20.0834 4.33787 19.8103C4.4511 19.5371 4.61705 19.289 4.82625 19.08L4.89375 19.0125C5.1531 18.7474 5.32708 18.4106 5.39325 18.0457C5.45943 17.6807 5.41475 17.3043 5.265 16.965C5.12239 16.6323 4.8856 16.3485 4.58377 16.1486C4.28195 15.9487 3.92826 15.8414 3.56625 15.84H3.375C2.77826 15.84 2.20597 15.6029 1.78401 15.181C1.36205 14.759 1.125 14.1867 1.125 13.59C1.125 12.9933 1.36205 12.421 1.78401 11.999C2.20597 11.5771 2.77826 11.34 3.375 11.34H3.47625C3.84862 11.3313 4.20976 11.2108 4.51271 10.9941C4.81567 10.7774 5.04643 10.4746 5.175 10.125C5.32475 9.78568 5.36943 9.40928 5.30326 9.04434C5.23708 8.67939 5.0631 8.34264 4.80375 8.0775L4.73625 8.01C4.52705 7.80104 4.3611 7.55289 4.24787 7.27974C4.13464 7.00659 4.07636 6.71381 4.07636 6.41812C4.07636 6.12244 4.13464 5.82965 4.24787 5.55651C4.3611 5.28336 4.52705 5.03521 4.73625 4.82625C4.94521 4.61705 5.19336 4.4511 5.46651 4.33787C5.73966 4.22464 6.03244 4.16635 6.32812 4.16635C6.62381 4.16635 6.91659 4.22464 7.18974 4.33787C7.46289 4.4511 7.71104 4.61705 7.92 4.82625L7.9875 4.89375C8.25264 5.1531 8.58939 5.32708 8.95434 5.39325C9.31928 5.45943 9.69568 5.41475 10.035 5.265H10.125C10.4577 5.12239 10.7415 4.8856 10.9414 4.58377C11.1413 4.28195 11.2486 3.92826 11.25 3.56625V3.375C11.25 2.77826 11.4871 2.20597 11.909 1.78401C12.331 1.36205 12.9033 1.125 13.5 1.125C14.0967 1.125 14.669 1.36205 15.091 1.78401C15.5129 2.20597 15.75 2.77826 15.75 3.375V3.47625C15.7514 3.83826 15.8587 4.19195 16.0586 4.49377C16.2585 4.7956 16.5423 5.03239 16.875 5.175C17.2143 5.32475 17.5907 5.36943 17.9557 5.30326C18.3206 5.23708 18.6574 5.0631 18.9225 4.80375L18.99 4.73625C19.199 4.52705 19.4471 4.3611 19.7203 4.24787C19.9934 4.13464 20.2862 4.07636 20.5819 4.07636C20.8776 4.07636 21.1703 4.13464 21.4435 4.24787C21.7166 4.3611 21.9648 4.52705 22.1737 4.73625C22.3829 4.94521 22.5489 5.19336 22.6621 5.46651C22.7754 5.73966 22.8336 6.03244 22.8336 6.32812C22.8336 6.62381 22.7754 6.91659 22.6621 7.18974C22.5489 7.46289 22.3829 7.71104 22.1737 7.92L22.1062 7.9875C21.8469 8.25264 21.6729 8.58939 21.6067 8.95434C21.5406 9.31928 21.5852 9.69568 21.735 10.035V10.125C21.8776 10.4577 22.1144 10.7415 22.4162 10.9414C22.7181 11.1413 23.0717 11.2486 23.4337 11.25H23.625C24.2217 11.25 24.794 11.4871 25.216 11.909C25.6379 12.331 25.875 12.9033 25.875 13.5C25.875 14.0967 25.6379 14.669 25.216 15.091C24.794 15.5129 24.2217 15.75 23.625 15.75H23.5237C23.1617 15.7514 22.8081 15.8587 22.5062 16.0586C22.2044 16.2585 21.9676 16.5423 21.825 16.875Z"/>
            </svg>
          </div>
        </div>
      </div>
    </BaseScreen>
  )
}

export function MainProfileDiv ( props ) {
  
  const userName = useSelector( ( state ) => state.userData.userName );
  const userBio = useSelector ( ( state ) => state.userData.userBio );
  const menuBg = useSelector ( ( state ) => state.colorTheme.fill_inactive );
  const bioTextColor = useSelector( ( state ) => state.colorTheme.stroke_active );
  
  const [ textColor, setTextColor ] = useState( "white" );
  const [ fontSize, setFontSize ] = useState( "12px" );
  const [ text, setText ] = useState( '' );
  const [ placeholder, setPlaceholder ] = useState( '' );
  const [ confirmColor, setConfirmColor ] = useState( menuBg );

  const [ inputValue, setInputValue ] = useState( '#aaaacc' ); // Начальное значение цвета
  const dispatcher = useDispatch();

  const handleColorChange = ( event ) => {
    setInputValue( event.target.value );
    console.log( inputValue, "event.target.value" )
  };

  const handleConfirmClick = () => {
    console.log("changeTheme")

    dispatcher( changeColorTheme({ "name": "fill_inactive", "value": `#${ inputValue.slice( 1 ) }` } ), {} );
    const value = `#${ Math.abs( parseInt( inputValue.replace( '#', '0x' ), 16 ) - parseInt( "#7D8276".replace( '#', '0x' ), 16 ) ).toString( 16 ) }`
    dispatcher( changeColorTheme({ "name": "fill_active", "value": value } ), {} );
    dispatcher( changeColorTheme({ "name": "stroke_inactive", "value": value } ), {} );
    
  };
  
  let placeholderState = false;
  useEffect(() => {
    if ( userBio.length > 60 ) {
      setText( userBio.slice( 0, 56 ) );
      setPlaceholder( '...' );
      placeholderState = true;
    }
    else {
      setText( userBio );
  }}, []);


  switch ( props.instance ) {
    case "Settings": {
      return (
        <div style={{ width: "80%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
          <h2 style={{ color: menuBg, fontSize: "35px", margin: "0px", textAlign: "center" }}>Settings</h2>
          <div style={{ width: "80%", display: "flex", flexDirection: "row", padding: "0px", justifyContent: "space-between" }}>
            <div style={{ display: "grid", placeItems: "center" }}>
              <h5 style={{ color: menuBg, fontSize: "25px", margin: "0px", textAlign: "center", lineHeight: "35px" }}>Color Theme</h5>
            </div>
            <input id="colorThemeInput" type="color" value={ inputValue } onChange={ handleColorChange } 
              style={{ border: "solid 1px black", backgroundColor: "transparent", width: "80px", height: "50px" }}/>
          </div>
          <button style={{ transition: "all 300ms ease-out", border: "none", backgroundColor: "transparent", color: confirmColor }} onMouseEnter={() => {
              setConfirmColor( bioTextColor )
            }} onMouseLeave={() => {
              setConfirmColor( menuBg )
            }} onClick={ handleConfirmClick }>Confirm</button>
        </div>
      )
    }
    default: {
      return (
        <div style={{ width: "80%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
          <img style={{ height: "100px", width: "100px", background: "transparent", backgroundColor: "black", borderRadius: "50%" }}/>
          <p style={{ margin: "5px", color: bioTextColor }}>@{ userName }</p>
          <div className='CormorantInfant-serif' style={{ padding: "0px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ margin: "0px", width: "180px", textAlign: "center", color: bioTextColor }}>{ text }</p>
            <button style={{ background: "transparent", border: "none", margin: "0px", fontSize: fontSize, transition: "all 300ms ease-out", color: textColor }}
              onMouseEnter={ () => {
                setTextColor( "grey" );
                // setFontSize( "14px" );
                if ( placeholder == '...' ) setPlaceholder( "show more" );
              }}
              onMouseLeave={ () => { 
                setTextColor( "white" );
                // setFontSize( "12px" );
                if ( placeholder == 'show more' ) setPlaceholder( "..." );
              }}
              onClick={ () => {
                if ( placeholderState ) {
                  console.log('show');
                  if ( placeholder == 'show more' ) {
                    console.log('more');
                    setText( userBio );
                    setPlaceholder( 'show less' );
                  } else {
                    console.log('less');
                    setText( userBio.slice( 0, 56 ) );
                    setPlaceholder( 'show more' );
                  }
                }
              }}>{ placeholder }</button>
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
            </div>
            <h5 style={{ width: "20%", color: bioTextColor, fontSize: "25px", textAlign: "center", lineHeight: "35px", margin: "0px 0px 0px 3px" }}>
              { props.instance }
            </h5>
            <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
            </div>
          </div>
        </div>
      )
    }
  }
}