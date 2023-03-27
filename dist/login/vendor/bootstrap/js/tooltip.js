/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.1.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("popper.js")):"function"==typeof define&&define.amd?define(["popper.js"],t):e.Tooltip=t(e.Popper)}(this,(function(e){"use strict";e=e&&"default"in e?e.default:e;var t=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},n={container:!1,delay:0,html:!1,placement:"top",title:"",template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",offset:0},o=function(){function o(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this),t=i({},n,t),e.jquery&&(e=e[0]),this.reference=e,this.options=t;var s="string"==typeof t.trigger?t.trigger.split(" ").filter((function(e){return-1!==["click","hover","focus"].indexOf(e)})):[];this._isOpen=!1,this._setEventListeners(e,s,t)}return t(o,[{key:"_create",value:function(e,t,i,n){var o=window.document.createElement("div");o.innerHTML=t.trim();var r=o.childNodes[0];r.id="tooltip_"+Math.random().toString(36).substr(2,10),r.setAttribute("aria-hidden","false");var s,a=o.querySelector(this.innerSelector);if(1===i.nodeType)n&&a.appendChild(i);else if((s=i)&&"[object Function]"==={}.toString.call(s)){var u=i.call(e);n?a.innerHTML=u:a.innerText=u}else n?a.innerHTML=i:a.innerText=i;return r}},{key:"_show",value:function(t,n){if(this._isOpen)return this;if(this._isOpen=!0,this._tooltipNode)return this._tooltipNode.style.display="",this._tooltipNode.setAttribute("aria-hidden","false"),this.popperInstance.update(),this;var o=t.getAttribute("title")||n.title;if(!o)return this;var r=this._create(t,n.template,o,n.html);t.setAttribute("aria-describedby",r.id);var s=this._findContainer(n.container,t);this._append(r,s);var a=i({},n.popperOptions,{placement:n.placement});return a.modifiers=i({},a.modifiers,{arrow:{element:this.arrowSelector}}),n.boundariesElement&&(a.modifiers.preventOverflow={boundariesElement:n.boundariesElement}),this.popperInstance=new e(t,r,a),this._tooltipNode=r,this}},{key:"_hide",value:function(){return this._isOpen?(this._isOpen=!1,this._tooltipNode.style.display="none",this._tooltipNode.setAttribute("aria-hidden","true"),this):this}},{key:"_dispose",value:function(){var e=this;return this._tooltipNode&&(this._hide(),this.popperInstance.destroy(),this._events.forEach((function(t){var i=t.func,n=t.event;e.reference.removeEventListener(n,i)})),this._events=[],this._tooltipNode.parentNode.removeChild(this._tooltipNode),this._tooltipNode=null),this}},{key:"_findContainer",value:function(e,t){return"string"==typeof e?e=window.document.querySelector(e):!1===e&&(e=t.parentNode),e}},{key:"_append",value:function(e,t){t.appendChild(e)}},{key:"_setEventListeners",value:function(e,t,i){var n=this,o=[],r=[];t.forEach((function(e){switch(e){case"hover":o.push("mouseenter"),r.push("mouseleave");break;case"focus":o.push("focus"),r.push("blur");break;case"click":o.push("click"),r.push("click")}})),o.forEach((function(t){var o=function(t){!0!==n._isOpen&&(t.usedByTooltip=!0,n._scheduleShow(e,i.delay,i,t))};n._events.push({event:t,func:o}),e.addEventListener(t,o)})),r.forEach((function(t){var o=function(t){!0!==t.usedByTooltip&&n._scheduleHide(e,i.delay,i,t)};n._events.push({event:t,func:o}),e.addEventListener(t,o)}))}},{key:"_scheduleShow",value:function(e,t,i){var n=this,o=t&&t.show||t||0;window.setTimeout((function(){return n._show(e,i)}),o)}},{key:"_scheduleHide",value:function(e,t,i,n){var o=this,r=t&&t.hide||t||0;window.setTimeout((function(){if(!1!==o._isOpen&&document.body.contains(o._tooltipNode)){if("mouseleave"===n.type)if(o._setTooltipNodeEvent(n,e,t,i))return;o._hide(e,i)}}),r)}}]),o}(),r=function(){var e=this;this.show=function(){return e._show(e.reference,e.options)},this.hide=function(){return e._hide()},this.dispose=function(){return e._dispose()},this.toggle=function(){return e._isOpen?e.hide():e.show()},this.arrowSelector=".tooltip-arrow, .tooltip__arrow",this.innerSelector=".tooltip-inner, .tooltip__inner",this._events=[],this._setTooltipNodeEvent=function(t,i,n,o){var r=t.relatedreference||t.toElement;return!!e._tooltipNode.contains(r)&&(e._tooltipNode.addEventListener(t.type,(function n(r){var s=r.relatedreference||r.toElement;e._tooltipNode.removeEventListener(t.type,n),i.contains(s)||e._scheduleHide(i,o.delay,o,r)})),!0)}};return o}));
//# sourceMappingURL=tooltip.map