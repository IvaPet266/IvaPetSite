let location = "abc/profile/collections";
const s = location.slice( location.indexOf( "profile" ) + 8 );
console.log( `${ s.slice( 0, 1 ).toUpperCase() }${ s.slice( 1, s.length ) }` )

const k = "50"
console.log( 2*k);

const prev = [0,0,0,0,1]
const value = 5
const e = [...prev, value]
console.log(typeof(e), e)