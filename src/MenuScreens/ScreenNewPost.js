import React, { useEffect, useRef, useState } from 'react';
import { useSelector }                        from 'react-redux';
import BaseScreen                             from '../Components/BaseScreen';
import { useNavigate } from 'react-router';

export default function ScreenNewPost( props ) {

  const lines         = useSelector( ( state ) => state.colorTheme.lines         );
  const stroke_active = useSelector( ( state ) => state.colorTheme.stroke_active );
  const fill_inactive = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const fill_active   = useSelector( ( state ) => state.colorTheme.fill_active   );

  const isAuthorized  = useSelector( ( state ) => state.configParams.isAuthorized );

  const navigate = useNavigate();

  const [ dropZoneBorderColor, setDropZoneBorderColor ] = useState( stroke_active );
  const [ droppedFile,         setDroppedFile         ] = useState( false         );
  const [ titleWarning,        setTitleWarning        ] = useState( null          );
  const [ textContentWarning,  setTextContentWarning  ] = useState( null          );
  const [ category,            setCategory            ] = useState( "ARTWORK"     );
  const [ categoryWidth,       setCategoryWidth       ] = useState( "55%"         );
  const [ textInputWidth,      setTextInputWidth      ] = useState( "55%"         );
  
  const imageRef     = useRef( null );
  const selectRef    = useRef( null );
  const uploadDivRef = useRef( null );
  
  const uploadDivWidth = useRef( "100%" );

  function fileInput() {
    const dropZone  = document.getElementById( 'dropZone'  );
    const fileInput = document.getElementById( 'fileInput' );
    
    console.log("DOMContentLoaded");
    
    // Клик по зоне загрузки открывает окно выбора файлов
    dropZone.addEventListener( 'click', () => {
      console.log("click");
      fileInput.click(); // показываем скрытый input для выбора файлов
    });
  };

  // Функция обработки загруженных файлов
  function handleFiles( files ) {
    setDroppedFile( true );
    console.log( files.length, files[ 0 ].type );
    if ( !files.length || !files[ 0 ].type.startsWith( "image/" ) ) {
      alert( "Incorrect file format" );
      return;
    }
    for( let i = 0; i < files.length; i++ ) {
        console.log( `Файл ${ i + 1 }:`, files[ i ].name );
    };
    const reader = new FileReader();
    reader.onload = () => {
      console.log( "reader.onload()" );
      const imgUrl = reader.result;
      imageRef.current.src = imgUrl;
    };
    
    reader.readAsDataURL( files[ 0 ] );
  };

  function uploadPost( event ) {
    const func = "https://functions.yandexcloud.net/d4eg75tmlqest0cq7buv";
  };

  useEffect(() => {
    document.addEventListener( 'DOMContentLoaded', fileInput );
    if ( !isAuthorized ) {
      alert( "You are not authorized!" );
      navigate( "/auth" );
    };
    return document.removeEventListener( 'DOMContentLoaded', fileInput );
  }, []);

  useEffect( () => {
    console.log(category);
    setCategoryWidth(  category === "ARTWORK" ? "55%" : "30%" );
    setTextInputWidth( category === "ARTWORK" ? "35%" : "60%" );
  }, [ category ] );
  
  return (
    <BaseScreen>
      { props.children }
      <div 
        style={{ 
          display:       "flex",
          flexDirection: "row",
          width:         "80%",
          position:      "absolute",
          top:           "calc( 100px + ( 100vh - 100px ) * 0.05 )",
          bottom:        "calc( ( 100vh - 100px ) * 0.05 )",
          left:          "calc( 100vw - 90% )",
          border:        `solid ${ stroke_active } 2px`,
          borderRadius:  "20px",
          padding:       "5px",
          background:    fill_inactive,
          // pointerEvents: "none",
        }}>
        <div
          style={{
            transition:    "all 300ms ease-out",
            display:       'flex',
            flexDirection: "column",
            height:        "100%",
            width:         categoryWidth,
            position:      "absolute",
            left:          "5px",
            top:           "5px",
            bottom:        "5px",
          }}
          ref  ={ uploadDivRef }
          >
          {
            category === "ARTWORK" && 
            (
              <>
                <div 
                  id   ="dropZone"
                  style={{
                    transition:     "all 300ms ease-out",
                    background:     fill_active,
                    height:         "50%",
                    width:          `${ uploadDivWidth.current - 4 }px`,
                    border:         `2px dashed ${ dropZoneBorderColor }`,
                    borderRadius:   "20px",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "18px",
                    color:          stroke_active,
                    cursor:         "pointer",
                    zIndex:         3
                  }}
                  onDrop     ={( event ) => {
                    console.log("drop");
                    event.preventDefault();
                    setDropZoneBorderColor( stroke_active ); // возвращаем исходный вид рамки
                    handleFiles( event.dataTransfer.files );
                  }}
                  onDragLeave={() => {
                    setDropZoneBorderColor( stroke_active );
                  }}
                  onDragOver ={( event ) => {
                    console.log("dragover");
                    event.preventDefault();
                    setDropZoneBorderColor( lines );
                  }}
                  >
                    {  
                      droppedFile && 
                      (
                        <img
                          ref  ={ imageRef }
                          style={{
                            height: "100%",
                            width:  "auto",
                          }}
                        />
                      )
                    }
                </div>
                <input 
                  type ="file"
                  id   ="fileInput"
                  accept='jpg,jpeg,webm'
                  style={{
                    display: "none",
                    height:  "100%",
                    width:   "100%",
                  }}
                  onChange={() => {
                    console.log("change");
                    handleFiles( fileInput.files ); // обрабатываем выбранные файлы
                  }}
                  />
              </>
            )
          }
          <div
            id="selectionDiv"
            style={{
              transition:     "all 300ms ease-out",
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "center",
              alignItems:     "center",
              width: "100%",
              // width:          `${ uploadDivWidth.current }px`
            }}
            >
            {/* <input type="checkbox" value="jjjj"/> */}
            <h3
              className='CormorantInfant-serif'
              style={{
                color:        fill_active,
                fontWeight:   "bold",
                fontSize:     "20px",
                margin:       0,
                marginBottom: "5px"
              }}
              >
                Choose post category
            </h3>
            <select 
              id       ="categories" 
              name     ='category'
              className='CormorantInfant-serif'
              style={{
                background:   fill_active,
                border:       `solid ${ stroke_active } 1px`,
                borderRadius: "20px",
                width:        "100%",
                color:        stroke_active
              }}
              ref={ selectRef }
              onChange={() => {
                setCategory( [ "ARTWORK", "PROSE", "POEM" ][ selectRef.current.selectedIndex ] );
                if ( selectRef.current.selectedIndex !== 0 ) {
                  if ( droppedFile ) {
                    alert( "Are you sure you want to unselect the chozen photo?" );
                  };
                  setDroppedFile( false );
                };
              }}
              >
              <option value="ARTWORK">Artwork</option>
              <option value="PROSE"  >Prose  </option>
              <option value="POEM"   >Poetry </option>
            </select>
          </div>
        </div>
        <div
          style={{
            transition:     "all 300ms ease-out",
            display:        "flex",
            flexDirection:  "column",
            padding:        "5px",
            alignItems:     "center",
            justifyContent: 'center',
            position:       "absolute",
            width:          textInputWidth,
            height:         "95%",
            // maxWidth:       "35%",
            top:            "5px",
            bottom:         "5px",
            right:          "5px",
          }}
          >
          <NewPostTextInput 
            text           ="Title" 
            warning        ={ titleWarning } 
            textColor      ={ fill_active }
            setWarning     ={ setTitleWarning } 
            textLengthQuota={ 70 }
            />
          {
            category !== "ARTWORK" &&
            <NewPostTextInput 
              text           ="Text Content" 
              warning        ={ textContentWarning } 
              textColor      ={ fill_active }
              setWarning     ={ setTextContentWarning } 
              textLengthQuota={ 10000 }
              />
          }
        </div>
      </div>
    </BaseScreen>
  );
};

export const NewPostTextInput = ({
  text,
  warning,
  textColor,
  setWarning,
  textLengthQuota,
}) => (
  <>
    <h3
      className='CormorantInfant-serif'
      style={{
        color:        textColor,
        fontWeight:   "bold",
        fontSize:     "25px",
        margin:       0,
        marginBottom: "5px"
      }}
      >
        { text }
    </h3>
    <TextInput text={ text } setWarning={ setWarning } textLengthQuota={ textLengthQuota }/>
    { 
      warning &&
      <p
        className='CormorantInfant-serif'
        style    ={{
          color:     "red",
          margin:    0,
          marginTop: "2px",
        }}>
          { warning.toLowerCase() }
        </p>
    }
  </>
);

export const TextInput = ({
  text,
  setWarning,
  textLengthQuota
}) => {
  const lines         = useSelector( ( state ) => state.colorTheme.lines         );
  const stroke_active = useSelector( ( state ) => state.colorTheme.stroke_active );
  const fill_inactive = useSelector( ( state ) => state.colorTheme.fill_inactive );
  const fill_active   = useSelector( ( state ) => state.colorTheme.fill_active   );

  const [ borderColor, setBorderColor ] = useState( stroke_active );

  const inputRef = useRef( null );

  return (
    <textarea 
      className='CormorantInfant-serif'
      ref      ={ inputRef }
      onChange ={() => {
        if ( inputRef.current.value.length >= textLengthQuota ) {
          inputRef.current.value = inputRef.current.value.slice( 0, textLengthQuota );
          setWarning( `${ text } is too long!` );
        } else setWarning( null );
      }}
      name ="comment" 
      cols ="45"
      style={{
        border:          `solid ${ borderColor } 1px`,
        borderRadius:    "20px",
        minHeight:       "20px",
        height:          textLengthQuota === 70 ? "32px" : "60%",
        width:           "95%",
        backgroundColor: fill_active,
        color:           stroke_active, 
        resize:          "none",
        paddingTop:      "2px",
        paddingBottom:   "2px",
        paddingLeft:     "5px",
        paddingRight:    "5px",
      }}
      />
  );
};