(()=>{"use strict";var t={874:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});const r=2*Math.PI;function s(t,e,s,i){t.beginPath(),t.arc(e.x,e.y,1,0,r),t.strokeStyle=s,t.stroke(),t.fillStyle=i,t.fill(),t.closePath()}e.default=function(t,e,r,i,o){t.fillStyle="#59EFE502",t.fillRect(0,0,i,o);for(let i of e.creatures)s(t,r.convertToCanvasCoordinates(i.position),"#275579","#443838");e.step()}},607:function(t,e,r){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(r(874)),o=r(242),n=s(r(653)),a=document.getElementById("animation-canvas"),u=document.getElementById("framerate-slider"),c=a.getContext("2d");let l=parseInt(u.value);u.addEventListener("input",(()=>{l=parseInt(u.value)}));let h=(0,n.default)(30,7,2);const d=(0,o.cameraForWorld)(a.width,a.height,h);!function t(){(0,i.default)(c,h,d,a.width,a.height),setTimeout((()=>requestAnimationFrame(t)),1e3/l)}()},242:function(t,e,r){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.cameraForWorld=e.Camera=void 0;const i=s(r(531));class o{constructor(t,e){this.scaleFactor=t,this.translationOffset=e}convertToCanvasCoordinates(t){return t.times(this.scaleFactor).plus(this.translationOffset)}}e.Camera=o,e.cameraForWorld=function(t,e,r,s=.05){const n=Math.min(t*(1-2*s)/(r.width+1e-6),e*(1-2*s)/(r.height+1e-6)),a=t/2-n*(r.minXCoord+r.width/2),u=e/2-n*(r.minYCoord+r.height/2),c=new i.default(a,u);return new o(n,c)}},598:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this._position=t}get position(){return this._position}pursue(t,e,r=1){const s=t.position.minus(this.position);if(s.magnitudeSquared()<r*r)return;const i=s.unit().times(e);this._position=this.position.plus(i)}}},531:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class r{constructor(t,e){this.x=t,this.y=e}get coordinates(){return[this.x,this.y]}minus(t){return new r(this.x-t.x,this.y-t.y)}plus(t){return new r(this.x+t.x,this.y+t.y)}times(t){return new r(this.x*t,this.y*t)}magnitudeSquared(){return this.x*this.x+this.y*this.y}unit(){const t=Math.sqrt(this.magnitudeSquared());return new r(this.x/t,this.y/t)}}e.default=r},730:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t=[],e=[]){this._creatures=t,this.chaseRelations=e}step(){for(let t of this.chaseRelations){const e=1;t.chaser.pursue(t.chased,e)}}get creatures(){return this._creatures}get minXCoord(){return Math.min(...this._creatures.map((t=>t.position.x)))}get maxXCoord(){return Math.max(...this._creatures.map((t=>t.position.x)))}get minYCoord(){return Math.min(...this._creatures.map((t=>t.position.y)))}get maxYCoord(){return Math.max(...this._creatures.map((t=>t.position.y)))}get width(){return this.maxXCoord-this.minXCoord}get height(){return this.maxYCoord-this.minYCoord}}},627:function(t,e,r){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(r(598)),o=s(r(531));e.default=function(t,e=200,r=new o.default(0,0)){const s=[],n=2*Math.PI/t;for(let a=0;a<t;a++){const t=a*n,u=r.x+e*Math.cos(t),c=r.y+e*Math.sin(t);s.push(new i.default(new o.default(u,c)))}return s}},653:function(t,e,r){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(r(730)),o=s(r(627));e.default=function(t,e,r=1){const s=t*e,n=(0,o.default)(s),a=t*r+1,u=[];for(let t=0;t<s;t++){const e={chaser:n[t],chased:n[t*a%s]};u.push(e)}return new i.default(n,u)}}},e={};!function r(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,r),o.exports}(607)})();