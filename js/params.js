/*
    params.js - module for manage querystrings

    (c) Edoardo Sabadelli
    http://www.sabadelli.it/edoardo
*/

// Associative array (hash)
var aParams = [];

// Parse given string or location.search (default) and fill the hash
function params_read( cParams )
{
    cParams = cParams || location.search.substring(1);

    var aCouples = cParams.split('&');
    for( var nC = 0; nC < aCouples.length; nC++ )
    {
        aKeysValues = aCouples[nC].split('=');
        aParams[aKeysValues[0]] = aKeysValues[1];
    }
}

// Return value of specified key
function params_getValue( cKey )
{
    return unescape( aParams[cKey] );
}
