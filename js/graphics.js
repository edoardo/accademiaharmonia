/*
    graphics.js - various functions for manage graphics

    (c) Edoardo Sabadelli
    http://www.sabadelli.it/edoardo
*/

// Opens a popup window to show a photo
function graphics_showPhoto( cFile, cType, nWidth, nHeight, nOffset, cAlt )
{
    cAlt = cAlt || '';
    var cPage = 'photoviewer.html?file='   + escape(cFile) +
                                '&type='   + escape(cType) +
                                '&width='  + escape(nWidth) +
                                '&height=' + escape(nHeight) +
                                '&alt='    + escape(cAlt);
    var oDate = new Date();
    graphics_popup( cPage, oDate.getTime(), nWidth, nHeight, nOffset,'no','no' );
}

// Opens a popup window with specified options
function graphics_popup( cUrl, cName, nX, nY, nOffset, lScrollbars, lResizable )
{
    cName = cName || 'oWin';
    nX = nX || 650;
    nY = nY || 550;
    nOffset = nOffset || 0;
    lScrollbars = lScrollbars || 'yes';
    lResizable = lResizable || 'yes';
    window.open( cUrl, cName, 'height='+(nY+nOffset)+',width='+(nX+nOffset)+',scrollbars='+lScrollbars+',resizable='+lResizable );
}
