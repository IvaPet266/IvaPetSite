import React, { useEffect, useState } from 'react';
import BaseScreen from '../Components/BaseScreen';
import { useSelector } from 'react-redux';

export default function ScreenProfile( props ) {

  const userName = useSelector( ( state ) => state.userData.userName );
  const userBio = useSelector ( ( state ) => state.userData.userBio );
  const menuBg = useSelector ( ( state ) => state.colorTheme.fill_inactive );
  const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
  const bioTextColor = useSelector( ( state ) => state.colorTheme.stroke_active );

  const [ textColor, setTextColor ] = useState( "white" );
  const [ fontSize, setFontSize ] = useState( "12px" );
  const [ text, setText ] = useState( '' );
  const [ placeholder, setPlaceholder ] = useState( '' );
  const [ menuSection, setMenuSection ] = useState( "Collections" );

  const [ collectionsColor, setCollectionsColor ] = useState( menuTextColor );  
  const [ savedColor, setSavedColor ] = useState( menuTextColor );
  const [ likedColor, setLikedColor ] = useState( menuTextColor );
  const [ repostedColor, setRepostedColor ] = useState( menuTextColor );

  let placeholderState = false;
  useEffect(() => {
  if ( userBio.length > 60 ) {
    setText( userBio.slice( 0, 56 ) );
    setPlaceholder( '...' );
    placeholderState = true;
  }
  else {
    setText( userBio )
  }}, [])

  useEffect(() => {
    if ( menuSection == "Collections" ) {
      setCollectionsColor( "#FFF600" );
      setSavedColor( menuTextColor );
      setLikedColor( menuTextColor );
      setRepostedColor( menuTextColor );
    } else if ( menuSection == "Saved" ) {
      setCollectionsColor( menuTextColor );
      setSavedColor( "#00BC13" );
      setLikedColor( menuTextColor );
      setRepostedColor( menuTextColor );
    } else if ( menuSection == "Liked" ) { 
      setCollectionsColor( menuTextColor );
      setSavedColor( menuTextColor );
      setLikedColor( "#B90000" );
      setRepostedColor( menuTextColor );
    } else if ( menuSection == "Reposted" ) {
      setCollectionsColor( menuTextColor );
      setSavedColor( menuTextColor );
      setLikedColor( menuTextColor );
      setRepostedColor( "#4700AA" );
    }
  }, [ menuSection ])
    

  return (
    <BaseScreen>
      { props.children }
      <div className='CormorantInfant-serif' style={{ display: "flex", flexDirection: "row" }}>
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
               };
              }}
            >{ placeholder }</button>
          </div>
          <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
            </div>
            <h5 style={{ width: "20%", color: bioTextColor, fontSize: "25px", textAlign: "center", lineHeight: "35px", margin: "2px 0px" }}>
              { menuSection }
            </h5>
            <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
              <hr style={{ border: "none", margin: "2.5px", width: "100%", backgroundColor: bioTextColor }} size="3"/>
            </div>
          </div>
        </div>
        <div style={{ width: "20%", height: "100vh", background: menuBg, border: "solid black 2px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h5 style={{ fontSize: "35px", margin: "0px", color: menuTextColor }}>
            <u>Contents</u>
          </h5>
          <div onMouseEnter={() => {
              setCollectionsColor( "#FFF600" )
            }} onMouseLeave={() => {
              if ( menuSection != "Collections" ) {
                setCollectionsColor( menuTextColor ) 
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
            <p style={{ pointerEvents: "none", margin: "0px", paddingLeft: "10px" }}>j</p>
          </div>
          <div onMouseEnter={() => {
              setSavedColor( "#00BC13" )
            }} onMouseLeave={() => {
              if ( menuSection != "Saved" ) {
                setSavedColor( menuTextColor ) 
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
            <p style={{ pointerEvents: "none", margin: "0px", paddingLeft: "10px" }}>j</p>
          </div>
          <div onMouseEnter={() => {
              setLikedColor( "#B90000" )
            }} onMouseLeave={() => {
              if ( menuSection != "Liked" ) {
                setLikedColor( menuTextColor ) 
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
            <p style={{ pointerEvents: "none", margin: "0px", paddingLeft: "10px" }}>j</p>
          </div>
          <div onMouseEnter={() => {
                setRepostedColor( "#4700AA" )
              }} onMouseLeave={() => {
                if ( menuSection != "Reposted" ) {
                  setRepostedColor( menuTextColor ) 
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
            <p style={{ pointerEvents: "none", margin: "0px", paddingLeft: "10px" }}>j</p>
          </div>
          <hr style={{ border: "none", width: "100%", backgroundColor: "black", marginTop: "22px" }} size="3"/>
        </div>
      </div>
    </BaseScreen>
  )
}
