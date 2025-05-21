import React           from 'react';
import { useSelector } from 'react-redux';
import BaseScreen      from '../BaseScreen';

export default function CardScreen( props ) {
    const menuBg        = useSelector ( ( state ) => state.colorTheme.fill_inactive );
    const menuTextColor = useSelector ( ( state ) => state.colorTheme.stroke_inactive );
    const bioTextColor  = useSelector( ( state ) => state.colorTheme.stroke_active );
    const lines         = useSelector( ( state ) => state.colorTheme.lines );
    
    return (
        <BaseScreen>
            <div 
                id   ="card" 
                style={{ 
                    padding: "5px", 
                    width: "400px", 
                    height: "500px", 
                    backgroundColor: "gray",
                    position: "absolute", 
                    top: "25%", 
                    left: "25%", 
                    borderRadius: "20px",
                    border: `solid 1px ${ lines }`, 
                }}>
                { props.children }
            </div>
        </BaseScreen>
    )
};