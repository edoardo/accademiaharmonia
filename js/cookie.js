/**********************************************
 cookie.js - module for read and write cookies

 (c) Edoardo Sabadelli
 http://www.sabadelli.it/edoardo
***********************************************/

var cName, cValue, cPath, cExpires;

// Write a cookie
function cookie_write( cName, cValue, cPath, cExpires )
{
    cPath = ( cPath != '' ) ? cPath : '/';
    cExpires = ( cExpires != '' ) ? cExpires : 'Saturday, 17-Jun-2029 23:59:59 GMT';
    document.cookie = cName+'='+cValue+'; path='+cPath+'; expires='+cExpires;
}

// Read specified cookie
function cookie_read( cName )
{
    var oCookie = document.cookie;
    if( oCookie.length > 0 ) {
        if( oCookie.indexOf( cName+'=' ) != -1 ) {
            var nStartValue = oCookie.indexOf( cName+'=' )+cName.length+1;
            var nEndValue = ( oCookie.indexOf( '; ', nStartValue ) != -1 ) ? oCookie.indexOf( '; ', nStartValue ) : oCookie.length;
            return unescape( oCookie.substring( nStartValue, nEndValue ) );
        } else { 
            return null;
        }
    }
}
