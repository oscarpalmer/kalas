!function(e,t,n){"undefined"!=typeof module&&module.exports?module.exports=n():"function"==typeof define&&define.amd?define(n):t[e]=n()}("kalas",this,function(){function e(e,o,i,a){var r,c=a?n:t;if("string"==typeof o)c(e,o,i);else if(o===Object(o))for(r in o)o.hasOwnProperty(r)&&c(e,r,o[r])}function t(e,t,n){if(e[f])e[f](t,n,!1);else if(e[d]){e[d]("on"+t,e[t+n]);try{delete e[t+n]}catch(o){e[t+n]=void 0}}}function n(e,t,n){if(e[c])e[c](t,n,!1);else if(e[u]){var o;e[t+n]=function(){o=a.event,o.target=o.target||o.srcElement,n.handleEvent?n.handleEvent.call(e,o):n.call(e,o)},e[u]("on"+t,e[t+n])}}var o,i,a=this,r=a.document,c="addEventListener",f="removeEventListener",u="attachEvent",d="detachEvent",l="createEvent",v="createEventObject",s=/^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,p="onreadystatechange",E="readyCallback",y=[];return Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1}),Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0}),o=function(){function e(t){y.push(t),i.on(r,"DOMContentLoaded",e[E]),i.on(r,p,e[E]),i.on(a,"load",e[E])}return e.isReady=!1,e[E]=function(t){var n,o,i;if(!(e.isReady||t.type===p&&"complete"!==r.readyState))for(e.isReady=!0,n=0,o=y.length,i="load"===t.type?a:r;o>n;n++)y[n].call(i,t)},e}(),i={off:function(t,n,o){e(t,n,o,!1)},on:function(t,n,o){e(t,n,o,!0)},ready:function(e){o(e)},trigger:function(e,t){var n,o;r[v]?(n=r[v](),e.fireEvent("on"+t,n)):(r[l]?(o=s.test(t)?"MouseEvents":"HTMLEvents",n=r[l](o),n.initEvent(t,!0,!0)):n=new Event(t),e.dispatchEvent(n))}}});