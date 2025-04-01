import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeScreen } from '../app/store';
import { useNavigate } from 'react-router';

const screenContext = createContext( "main" ); //!
export const useScreen = () => useContext( screenContext );

export default function ProviderScreen( props ) {
    const [ screen, setScreen ] = useState( 'main' );

    const routes = useSelector( ( state ) => state.routes.routes );
    const navigate = useNavigate();

    switch ( screen ) {
        default: {
            navigate( `/${ routes[ screen ] }` )
        }
    }

    return (
        <screenContext.Provider value={{ screen, setScreen }}>
            { props.children }
        </screenContext.Provider>
    )
};
