import React                              from "react";
import { NavLink }                        from "react-router";
import { LinkButton, ProfileContentsSVG } from "./ProfileMicroComponents";

export function ProfileLink( props ) {
    switch ( props.link ){
        case false: 
            return (
                <LinkButton
                    objColor={ props.objColor }
                    text    ={ props.text } 
                />
            )
        default:
            return (
                <NavLink to={ `/profile/${ props.link }` }>
                    <LinkButton
                       objColor={ props.objColor }
                       text    ={ props.text } 
                    />
                </NavLink>
            )
    };
};

export const ProfileContents = ( props ) => (
    <div 
        style       ={{ 
            width:          "100%", 
            display:        "flex", 
            flexDirection:  "row", 
            padding:        "0px", 
            justifyContent: "space-between",
        }} 
        onMouseEnter={ () => {
            props.setObjColor( props.activeContentsColor );
            props.fill && props.setObjFillSVG( props.activeContentsColor );
            props.setObjStrokeSVG( props.fill ? props.lines : props.activeContentsColor );
        }}
        onMouseLeave={ () => {
            if ( props.menuSection != props.text ) {
                props.setObjColor( props.inactiveContentsColor );
                props.fill && props.setObjFillSVG( "none" );
                props.setObjStrokeSVG( props.inactiveContentsColor );
            };
        }}
        onClick={ () => {
            if ( props.text === 'Privacy Policy' ) {
                window.open( 'https://2048game.com/ru/', '_blank' );
            } else if ( props.text === 'Log Out' ) {
                console.log('Log Out');
            } else if ( props.link !== 'none' ) {
                props.setMenuSection( props.text );
            } else {
                console.log(`Liked post №${ props.postId }`);
            }
        }}>
        {( props.fill === false || props.link !== "none" ) && (
            <ProfileLink
                link     = { props.link }
                text     = { props.text }
                objColor = { props.objColor }
            />
        )}
        <ProfileContentsSVG
            w={ props.w } h ={ props.h } 
            d={ props.d } d1={ props.d1 }
            contentsColor={ props.contentsColor }
            objFillSVG   ={ props.fill ? props.objFillSVG : "none" }/>
    </div>
);