/*-----------------------------------------------------------------
 Copyright (C) 2001 Thomas Brattli
 This script was released at DHTMLCentral.com
 Visit for more great scripts!
 This may be used and changed freely as long as this msg is intact!
 We will also appreciate any links you could give us.
 Made by Thomas Brattli
 -----------------------------------------------------------------*/
function browser() {
 this.ver = navigator.appVersion;
 this.agent = navigator.userAgent;
 this.dom = document.getElementById ? 1 : 0;
 this.opera5 = this.agent.indexOf('Opera 5') > -1;
 this.ie4 = ( document.all && !this.dom && !this.opera5 ) ? 1 : 0;
 this.ie5 = ( this.ver.indexOf('MSIE 5') > -1 && this.dom && !this.opera5 ) ? 1 : 0; 
 this.ie6 = ( this.ver.indexOf('MSIE 6') > -1 && this.dom && !this.opera5 ) ? 1 : 0;
 this.ie = this.ie4 || this.ie5 || this.ie6;
 this.mac = this.agent.indexOf('Mac') > -1;
 this.win = this.agent.indexOf('Windows') > -1;
 this.ns4 = ( document.layers && !this.dom ) ? 1 : 0;
 this.ns6 = ( this.dom && parseInt(this.ver) >= 5 ) ? 1 : 0; 
 this.bw = this.ie6 || this.ie5 || this.ie4 || this.ns6 || this.ns4 || this.opera5;
 return this;
}
var bw = new browser();