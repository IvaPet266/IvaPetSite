import React, { useEffect, useRef, useState } from 'react';
import { useSelector }                        from 'react-redux';
import BaseScreen                             from '../Components/BaseScreen';

export default function ScreenNewPost( props ) {

  const lines         = useSelector( ( state ) => state.colorTheme.lines         );
  const stroke_active = useSelector( ( state ) => state.colorTheme.stroke_active );

  const [ dropZoneBorderColor, setDropZoneBorderColor ] = useState( stroke_active );
  const [ droppedFile,         setDroppedFile         ] = useState( false         );

  const imageRef = useRef( null );

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
      console.log("return"); 
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

  useEffect(() => {
    document.addEventListener( 'DOMContentLoaded', fileInput );
    return document.removeEventListener( 'DOMContentLoaded', fileInput );
  });

  return (
    <BaseScreen>
      { props.children }
      <div 
        style={{ 
          display:       "flex",
          flexDirection: "column",
          width:         "80%",
          position:      "absolute",
          top:           "calc( 100px + ( 100vh - 100px ) * 0.05 )",
          bottom:        "calc( ( 100vh - 100px ) * 0.05 )",
          left:          "calc( 100vw - 90% )",
          border:        `solid ${ stroke_active } 2px`,
          borderRadius:  "20px",
          padding:       "5px",
          background:    "darkgrey", 
          // pointerEvents: "none",
        }}>
        <div 
          id   ="dropZone"
          style={{
            transition:     "all 300ms ease-out",
            background:     "grey",
            height:         "50%",
            width:          "45%",
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
          onDrop={( event ) => {
            console.log("drop");
            event.preventDefault();
            setDropZoneBorderColor( stroke_active ); // возвращаем исходный вид рамки
            handleFiles( event.dataTransfer.files );
          }}
          onDragLeave={() => {
            setDropZoneBorderColor( stroke_active );
          }}
          onDragOver={( event ) => {
            console.log("dragover");
            event.preventDefault();
            setDropZoneBorderColor( lines );
          }}
          >
            {  
              droppedFile && (
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
      </div>
    </BaseScreen>
  );
};
