/*
#/**
# * @module     AJAX.js
# * @file       AJAX.js
# * @helpfile   %DOC_ENV%/js/ajax.4
# *
# * This fabulous class implements an OO approach to the AJAX technology, providing methods for make
# * calls to a CGI from a web page via JavaScript and the XMLHttpRequest object.
# *
# * @author     Edoardo Sabadelli
# * @date       2005/12/01
# * @version    $Revision: $
# */

// $Id: $

/*
#/**
# * @method     new() -> oAJAX
# *  Object constructor, returns a brand new AJAX object.<br />
# *  No parameters are requested here, so you can make multiple different calls on the same object by
# *  passing different parameters to che call() method.
# *
# * @return     oAJAX
# *  Object reference
# *
# * @example
# * // a new AJAX object instance
# * var oAJAX = new AJAX();
# */
var AJAX = function()
{
    // handle cache
    this._handle = undefined;

    // default values for some properties
    this._props =
    {
        method: 'GET',
        uri: null,
        asyncronous: true,
        responsetype: 'text',
        response: false,
        callback: null,
    };
}

// version
AJAX.VERSION = '$Revision: $'.slice( 11, -2 );

// object methods
AJAX.prototype = {

/*
#/**
# * @method     call( aProps [, aParams ]) -> cResponse
# *  This public method performs the call via XmlHttpRequest to the specified server's script and
# *  returns the response.
# *
# * @param      aProps
# *  Structure with options used in the call passed as an object literal.<br />
# *  Properties are:<br />
# *  - uri: /cgi-bin/yourscript (mandatory!)<br />
# *    URI of the script to call.<br />
# *  - method: GET, POST, HEAD... (default is GET)<br />
# *    HTTP method to use in the call.<br />
# *  - asyncronous: true or false (default is true)<br />
# *    indicates if the function execution will continue while waiting the server response or not.<br />
# *  - responsetype: text or xml (default is text)<br />
# *    indicates which method use for retrieve the response.<br />
# *  - callback: reference to function to use for process the response
# *
# * @param      aParams
# *  List of parameters to pass to the call.<br />
# *  You can pass an URL-escaped string, an array or an array literal.
# *
# * @return     cResponse
# *  Response stuff depending on responsetype setting.<br />
# *  Can be plain text or XML.
# *
# *  <script type="text/javascript" src="/cgi-bin/public/js?js=AJAX"></script>
# *  <script type="text/javascript">var oAJAX = new AJAX();</script>
# *
# * @example
# *  // Call examples:
# *  oAJAX.call({ uri:'/cgi-bin/ced/test/edoardo/ajax_test', callback: function( cText ) { alert( cText ) } });
# *  <input type="button" value="Text response" onclick="oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_test', callback: function( cText ) { alert( cText ) } })" />
# *  <br />
# *  // Other examples:
# *  // parameters as array literal
# *  oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_test', responsetype: 'xml', callback: function( cXml ) { alert( cXml ) } },
# *             [ 'mode','xml','param1','value1' ]);
# *  <input type="button" value="XML response" onclick="oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_test', responsetype: 'xml', callback: function( cXml ) { alert( cXml ) } },[ 'mode','xml','param1','value1' ])" />
# *  <br />
# *  // parameters as standard array
# *  &lt;input type="text" onchange="oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_validator', callback: function( cResponse ) { alert( cResponse ) } }, new Array( 'item', this.value )) /&gt;
# *  <input type="text" value="Insert an item and press TAB..." size="30" onchange="oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_validator', callback: function( cResponse ) { alert( cResponse ) } }, new Array( 'item', this.value ))" onfocus="this.value=''" />
# *  <br />
# *  // parameters as string
# *  oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_test', callback: function( cText ) { alert( cText ) } },
# *             'param1=value1&param2=value2');
# *  <input type="button" value="Try this instead!" onclick="oAJAX.call({ uri: '/cgi-bin/ced/test/edoardo/ajax_test', callback: function( cText ) { alert( cText ) } },'param1=value1&param2=value2' )" />
# */ 
call: function( aProps, rParams )
{
    // set object properties
    for( var cKey in this._props )
    {
        if( aProps[cKey] != undefined )
        {
            this['_' + cKey] = aProps[cKey];
        }
        else
        {
            this['_' + cKey] = this._props[cKey];
        }
    }

    // manage parameters
    var rQuerystring = null;

    if( rParams != undefined )
    {
        // string
        if( typeof( rParams ) == 'string' )
        {
            rQuerystring = rParams;
        }
        // array or array literal
        else
        {
            var aTemp = new Array();

            while( rParams.length )
            {
                aTemp.push( escape( rParams.shift() ) + '=' + escape( rParams.shift() ) );
            }

            // query string
            rQuerystring = aTemp.join( '&' );
        }

        // test HTTP method
        if( this._method.toUpperCase() == 'GET' )
        {
            // append querystring to uri and pass null value to send
            this._uri += '?' + rQuerystring;
            rQuerystring = null;
        }
    }

    // get XMLHttpRequest object
    var oHandle = this._getHandle();

    // manage the response
    oHandle.onreadystatechange = function()
    {
        if( oHandle.readyState == 4 )
        {
            if( oHandle.status == 200 )
            {
                cResponse = ( oHandle._parent._responsetype == 'text' )
                          ? oHandle.responseText
                          : oHandle.responseXML;

                // Execute callback function
                var oCallback = oHandle._parent._callback;
                oCallback( cResponse );
            }
            else
            {
                alert( 'server returns a bad response! (' + oHandle.status + ')' ); // XXX
            }
        }
        else
        {
//            alert( 'not ready! (' + oHandle.readyState + ')' );
        }
    }

    // make the call
    oHandle.open( this._method.toUpperCase(), this._uri, this._asyncronous );
    oHandle.send( rQuerystring );
},


/*
#/**
# * @method     _getHandle() -> XMLHttpRequest
# *  This private method is called by the call() method and returns the XMLHttpRequest object.
# *
# * @return     XMLHttpRequest
# */
_getHandle: function()
{
    // Check cache...
    //if( ! this._handle )
    if( typeof( this._handler ) == 'undefined' )
    {
        // FF, M, NN, O
        if( window.XMLHttpRequest )
        {
            this._handle = new XMLHttpRequest();
        }
        // Exploder
        else if( window.ActiveXObject )
        {
            var aWinzozz = new Array(
                'Msxml2.XMLHTTP.5.0',
                'Msxml2.XMLHTTP.4.0',
                'Msxml2.XMLHTTP.3.0',
                'Msxml2.XMLHTTP',
                'Microsoft.XMLHTTP'
            );

            for( var i = 0; i < aWinzozz.length; i++ )
            {
                try
                {
                    new ActiveXObject( aWinzozz[i] );
                    this._handle = new ActiveXObject( aWinzozz[i] );

                    break;
                }
                catch(e)
                {}
            }
        }

        // Check object validity
        if( typeof( this._handle ) == 'undefined' )
        {
            alert( 'Unable to locate XMLHttpRequest object!' );
        }
        // parent reference
        else
        {
            this._handle._parent = this;
        }
    }

    return this._handle;
},

};
