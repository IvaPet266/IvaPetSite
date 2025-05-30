import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector }                            from 'react-redux';   //!
import { useLocation, useParams }                              from 'react-router';
import Container                                               from '../Card/Card';
import { changeParameter }                                     from '../../app/store';
import { Filters }                                             from './Filters';
import CardScreen                                              from '../Card/CardScreen';


export default function Feed( props ) {
    const [ cardWidth, setCardWidth ]     = useState( "200px" );
    const [ padding, setPadding ]         = useState( null );
    const [ CARDS, setCARDS ]             = useState( null );
    const [ defaultText, setDefaultText ] = useState( "Wait a second!" );

    // use__
    const ref        = useRef( null );
    const dispatcher = useDispatch();
    let params       = useParams();
    const location   = useLocation();

    const textColor  = useSelector( ( state ) => state.colorTheme.fill_inactive );
    const lines      = useSelector( ( state ) => state.colorTheme.lines );
    const scrollPosY = useSelector( ( state ) => state.configParams.scroll );

    const likesFilter    = useSelector( ( state ) => state.filters.likes );
    const repostsFilter  = useSelector( ( state ) => state.filters.reposts );
    const savesFilter    = useSelector( ( state ) => state.filters.saves );
    const authorFilter   = useSelector( ( state ) => state.filters.author );
    const categoryFilter = useSelector( ( state ) => state.filters.category );
    const hashtagsFilter = useSelector( ( state ) => state.filters.hashtags );

    const zoomHandle = () => {
        const { width, height } = ref.current.getBoundingClientRect();
        let w = Math.max( width * 0.25, 150 );

        const cardAmount = Math.floor( width / w );
        setPadding( ( width - ( cardAmount * w ) ) * 0.5 );

        setCardWidth( `${w}px` );
    };

    useLayoutEffect(() => {  
        window.visualViewport.addEventListener( "resize", zoomHandle );
        return () => {
            window.visualViewport.removeEventListener( "resize", zoomHandle );
        }
    }, []);

    useEffect(() => {(
        async () => {
            try {
                const response = await fetch( "https://storage.yandexcloud.net/sharetemp/artworks_data.json" );
                return await response.json()
            } catch ( error ) { console.warn( error ); };
        })().then( data => {
            setCARDS( Object.values( data ) );
        }
        )}, []
    );

    useEffect( () => {
        console.log( CARDS );
        dispatcher( changeParameter( { "name": "cards", "value": CARDS }) );
    }, [ CARDS ]);

    switch ( CARDS !== null ) {
        case true:
            return (
                <>
                    <Filters/>
                    <div
                        ref  ={ ref }
                        style={{
                            padding:        `0px ${ padding }px`, 
                            display:        "flex",
                            flexWrap:       "wrap", 
                            position:       "relative",
                            justifyContent: "center", 
                            top:            scrollPosY,
                        }} 
                        id   ="scroll">
                        { CARDS.map( ( value, index ) => {
                            const author   = checkFilters( authorFilter, value[ "author" ] );
                            const category = checkFilters( categoryFilter, value[ "category" ] );
                            params.cardId  = index;
                            if ( value[ "likes_amount" ] >= likesFilter && author && category )
                                return (
                                    <Container 
                                        key  ={ index } 
                                        id   ={ index }
                                        value={ value }/>
                                )
                            })}
                    </div>
                </>
            )
        default:
            return (
                <div 
                    style={{
                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignContent: 'center'
                    }}
                    >
                    <div 
                        className="loader"/>
                    <p style={{ color: textColor }}>{ defaultText }</p> 
                </div>
                )
    }
};

function checkFilters( a, a1 ) {
    let ax;
    if ( a !== null ) ax = a == a1
    else ax = true;

    return ax
};