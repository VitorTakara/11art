!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Navigo=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(e,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&t(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=n?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(e){return e.replace(/\/$/,"").split("/").length}function s(e,t){return i(t)-i(e)}function r(e,t){return function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(t){var i=function(e){var t=[];return{regexp:e instanceof RegExp?e:new RegExp(e.replace(n.PARAMETER_REGEXP,function(e,o,i){return t.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:t}}(o(t.route)),s=i.regexp,r=i.paramNames,a=e.replace(/^\/+/,"/").match(s),h=function(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce(function(e,n,o){return null===e&&(e={}),e[t[o]]=decodeURIComponent(n),e},null):null}(a,r);return!!a&&{match:a,route:t,params:h}}).filter(function(e){return e})}(e,t)[0]||!1}function a(e,t){var n=t.map(function(t){return""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]}),i=o(e);return n.length>1?n.reduce(function(e,t){return e.length>t.length&&(e=t),e},n[0]):1===n.length?n[0]:i}function h(e,n,o){var i,s=function(e){return e.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),t()&&!n?s(e).split(o)[0]:(i=e.split(o)).length>1?s(i[1]):s(i[0])}function u(t,n,o){if(n&&"object"===(void 0===n?"undefined":e(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(t(),n.after&&n.after(o))},o);if(n.after)return t(),void(n.after&&n.after(o))}t()}return n.prototype={helpers:{match:r,root:a,clean:o,getOnlyURL:h},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var t=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===e(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else"object"===e(o[0])&&Object.keys(o[0]).sort(s).forEach(function(e){t.on(e,o[0][e])});return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(t,n){return n.handler!==e&&t.push(n),t},[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var n,o,i=this,s=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var a=function(e){return e.split(/\?(.*)?$/).slice(1).join("")}(e||this._cLoc()),l=h(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&l===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=r(l,this._routes))?(this._callLeave(),this._lastRouteResolved={url:l,query:a,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,u(function(){u(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,a)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===l||"/"===l||l===this._hash||function(e,n,o){if(t()&&!n)return!1;if(!e.match(o))return!1;var i=e.split(o);return i.length<2||""===i[1]}(l,this._useHash,this._hash))?(u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(a)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(a)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach(function(t){t.hasListenerAttached||(t.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),t.hasListenerAttached=!0)})},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===e)for(i in n=o.route,t)n=n.toString().replace(":"+i,t[i]);return n},"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,this._historyAPIUpdateMethod=e?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(e){return void 0===e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){t()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e},_add:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof t&&(t=encodeURI(t)),this._routes.push("object"===(void 0===n?"undefined":e(n))?{route:t,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:t,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=a(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var t=this._cLoc(),n=void 0,o=void 0;(o=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var e=this._lastRouteResolved;e&&e.hooks&&e.hooks.leave&&e.hooks.leave(e.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="",n});
//# sourceMappingURL=navigo.min.js.map
/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */
function hexToRgb(e){var a=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(a,function(e,a,t,i){return a+a+t+t+i+i});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function clamp(e,a,t){return Math.min(Math.max(e,a),t)}function isInArray(e,a){return a.indexOf(e)>-1}var pJS=function(e,a){var t=document.querySelector("#"+e+" > .particles-js-canvas-el");this.pJS={canvas:{el:t,w:t.offsetWidth,h:t.offsetHeight},particles:{number:{value:400,density:{enable:!0,value_area:800}},color:{value:"#fff"},shape:{type:"circle",stroke:{width:0,color:"#ff0000"},polygon:{nb_sides:5},image:{src:"",width:100,height:100}},opacity:{value:1,random:!1,anim:{enable:!1,speed:2,opacity_min:0,sync:!1}},size:{value:20,random:!1,anim:{enable:!1,speed:20,size_min:0,sync:!1}},line_linked:{enable:!0,distance:100,color:"#fff",opacity:1,width:1},move:{enable:!0,speed:2,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:3e3,rotateY:3e3}},array:[]},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:100,line_linked:{opacity:1}},bubble:{distance:200,size:80,duration:.4},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}},mouse:{}},retina_detect:!1,fn:{interact:{},modes:{},vendors:{}},tmp:{}};var i=this.pJS;a&&Object.deepExtend(i,a),i.tmp.obj={size_value:i.particles.size.value,size_anim_speed:i.particles.size.anim.speed,move_speed:i.particles.move.speed,line_linked_distance:i.particles.line_linked.distance,line_linked_width:i.particles.line_linked.width,mode_grab_distance:i.interactivity.modes.grab.distance,mode_bubble_distance:i.interactivity.modes.bubble.distance,mode_bubble_size:i.interactivity.modes.bubble.size,mode_repulse_distance:i.interactivity.modes.repulse.distance},i.fn.retinaInit=function(){i.retina_detect&&window.devicePixelRatio>1?(i.canvas.pxratio=window.devicePixelRatio,i.tmp.retina=!0):(i.canvas.pxratio=1,i.tmp.retina=!1),i.canvas.w=i.canvas.el.offsetWidth*i.canvas.pxratio,i.canvas.h=i.canvas.el.offsetHeight*i.canvas.pxratio,i.particles.size.value=i.tmp.obj.size_value*i.canvas.pxratio,i.particles.size.anim.speed=i.tmp.obj.size_anim_speed*i.canvas.pxratio,i.particles.move.speed=i.tmp.obj.move_speed*i.canvas.pxratio,i.particles.line_linked.distance=i.tmp.obj.line_linked_distance*i.canvas.pxratio,i.interactivity.modes.grab.distance=i.tmp.obj.mode_grab_distance*i.canvas.pxratio,i.interactivity.modes.bubble.distance=i.tmp.obj.mode_bubble_distance*i.canvas.pxratio,i.particles.line_linked.width=i.tmp.obj.line_linked_width*i.canvas.pxratio,i.interactivity.modes.bubble.size=i.tmp.obj.mode_bubble_size*i.canvas.pxratio,i.interactivity.modes.repulse.distance=i.tmp.obj.mode_repulse_distance*i.canvas.pxratio},i.fn.canvasInit=function(){i.canvas.ctx=i.canvas.el.getContext("2d")},i.fn.canvasSize=function(){i.canvas.el.width=i.canvas.w,i.canvas.el.height=i.canvas.h,i&&i.interactivity.events.resize&&window.addEventListener("resize",function(){i.canvas.w=i.canvas.el.offsetWidth,i.canvas.h=i.canvas.el.offsetHeight,i.tmp.retina&&(i.canvas.w*=i.canvas.pxratio,i.canvas.h*=i.canvas.pxratio),i.canvas.el.width=i.canvas.w,i.canvas.el.height=i.canvas.h,i.particles.move.enable||(i.fn.particlesEmpty(),i.fn.particlesCreate(),i.fn.particlesDraw(),i.fn.vendors.densityAutoParticles()),i.fn.vendors.densityAutoParticles()})},i.fn.canvasPaint=function(){i.canvas.ctx.fillRect(0,0,i.canvas.w,i.canvas.h)},i.fn.canvasClear=function(){i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h)},i.fn.particle=function(e,a,t){if(this.radius=(i.particles.size.random?Math.random():1)*i.particles.size.value,i.particles.size.anim.enable&&(this.size_status=!1,this.vs=i.particles.size.anim.speed/100,i.particles.size.anim.sync||(this.vs=this.vs*Math.random())),this.x=t?t.x:Math.random()*i.canvas.w,this.y=t?t.y:Math.random()*i.canvas.h,this.x>i.canvas.w-2*this.radius?this.x=this.x-this.radius:this.x<2*this.radius&&(this.x=this.x+this.radius),this.y>i.canvas.h-2*this.radius?this.y=this.y-this.radius:this.y<2*this.radius&&(this.y=this.y+this.radius),i.particles.move.bounce&&i.fn.vendors.checkOverlap(this,t),this.color={},"object"==typeof e.value)if(e.value instanceof Array){var s=e.value[Math.floor(Math.random()*i.particles.color.value.length)];this.color.rgb=hexToRgb(s)}else void 0!=e.value.r&&void 0!=e.value.g&&void 0!=e.value.b&&(this.color.rgb={r:e.value.r,g:e.value.g,b:e.value.b}),void 0!=e.value.h&&void 0!=e.value.s&&void 0!=e.value.l&&(this.color.hsl={h:e.value.h,s:e.value.s,l:e.value.l});else"random"==e.value?this.color.rgb={r:Math.floor(256*Math.random())+0,g:Math.floor(256*Math.random())+0,b:Math.floor(256*Math.random())+0}:"string"==typeof e.value&&(this.color=e,this.color.rgb=hexToRgb(this.color.value));this.opacity=(i.particles.opacity.random?Math.random():1)*i.particles.opacity.value,i.particles.opacity.anim.enable&&(this.opacity_status=!1,this.vo=i.particles.opacity.anim.speed/100,i.particles.opacity.anim.sync||(this.vo=this.vo*Math.random()));var n={};switch(i.particles.move.direction){case"top":n={x:0,y:-1};break;case"top-right":n={x:.5,y:-.5};break;case"right":n={x:1,y:-0};break;case"bottom-right":n={x:.5,y:.5};break;case"bottom":n={x:0,y:1};break;case"bottom-left":n={x:-.5,y:1};break;case"left":n={x:-1,y:0};break;case"top-left":n={x:-.5,y:-.5};break;default:n={x:0,y:0}}i.particles.move.straight?(this.vx=n.x,this.vy=n.y,i.particles.move.random&&(this.vx=this.vx*Math.random(),this.vy=this.vy*Math.random())):(this.vx=n.x+Math.random()-.5,this.vy=n.y+Math.random()-.5),this.vx_i=this.vx,this.vy_i=this.vy;var r=i.particles.shape.type;if("object"==typeof r){if(r instanceof Array){var c=r[Math.floor(Math.random()*r.length)];this.shape=c}}else this.shape=r;if("image"==this.shape){var o=i.particles.shape;this.img={src:o.image.src,ratio:o.image.width/o.image.height},this.img.ratio||(this.img.ratio=1),"svg"==i.tmp.img_type&&void 0!=i.tmp.source_svg&&(i.fn.vendors.createSvgImg(this),i.tmp.pushing&&(this.img.loaded=!1))}},i.fn.particle.prototype.draw=function(){function e(){i.canvas.ctx.drawImage(r,a.x-t,a.y-t,2*t,2*t/a.img.ratio)}var a=this;if(void 0!=a.radius_bubble)var t=a.radius_bubble;else var t=a.radius;if(void 0!=a.opacity_bubble)var s=a.opacity_bubble;else var s=a.opacity;if(a.color.rgb)var n="rgba("+a.color.rgb.r+","+a.color.rgb.g+","+a.color.rgb.b+","+s+")";else var n="hsla("+a.color.hsl.h+","+a.color.hsl.s+"%,"+a.color.hsl.l+"%,"+s+")";switch(i.canvas.ctx.fillStyle=n,i.canvas.ctx.beginPath(),a.shape){case"circle":i.canvas.ctx.arc(a.x,a.y,t,0,2*Math.PI,!1);break;case"edge":i.canvas.ctx.rect(a.x-t,a.y-t,2*t,2*t);break;case"triangle":i.fn.vendors.drawShape(i.canvas.ctx,a.x-t,a.y+t/1.66,2*t,3,2);break;case"polygon":i.fn.vendors.drawShape(i.canvas.ctx,a.x-t/(i.particles.shape.polygon.nb_sides/3.5),a.y-t/.76,2.66*t/(i.particles.shape.polygon.nb_sides/3),i.particles.shape.polygon.nb_sides,1);break;case"star":i.fn.vendors.drawShape(i.canvas.ctx,a.x-2*t/(i.particles.shape.polygon.nb_sides/4),a.y-t/1.52,2*t*2.66/(i.particles.shape.polygon.nb_sides/3),i.particles.shape.polygon.nb_sides,2);break;case"image":if("svg"==i.tmp.img_type)var r=a.img.obj;else var r=i.tmp.img_obj;r&&e()}i.canvas.ctx.closePath(),i.particles.shape.stroke.width>0&&(i.canvas.ctx.strokeStyle=i.particles.shape.stroke.color,i.canvas.ctx.lineWidth=i.particles.shape.stroke.width,i.canvas.ctx.stroke()),i.canvas.ctx.fill()},i.fn.particlesCreate=function(){for(var e=0;e<i.particles.number.value;e++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value))},i.fn.particlesUpdate=function(){for(var e=0;e<i.particles.array.length;e++){var a=i.particles.array[e];if(i.particles.move.enable){var t=i.particles.move.speed/2;a.x+=a.vx*t,a.y+=a.vy*t}if(i.particles.opacity.anim.enable&&(1==a.opacity_status?(a.opacity>=i.particles.opacity.value&&(a.opacity_status=!1),a.opacity+=a.vo):(a.opacity<=i.particles.opacity.anim.opacity_min&&(a.opacity_status=!0),a.opacity-=a.vo),a.opacity<0&&(a.opacity=0)),i.particles.size.anim.enable&&(1==a.size_status?(a.radius>=i.particles.size.value&&(a.size_status=!1),a.radius+=a.vs):(a.radius<=i.particles.size.anim.size_min&&(a.size_status=!0),a.radius-=a.vs),a.radius<0&&(a.radius=0)),"bounce"==i.particles.move.out_mode)var s={x_left:a.radius,x_right:i.canvas.w,y_top:a.radius,y_bottom:i.canvas.h};else var s={x_left:-a.radius,x_right:i.canvas.w+a.radius,y_top:-a.radius,y_bottom:i.canvas.h+a.radius};switch(a.x-a.radius>i.canvas.w?(a.x=s.x_left,a.y=Math.random()*i.canvas.h):a.x+a.radius<0&&(a.x=s.x_right,a.y=Math.random()*i.canvas.h),a.y-a.radius>i.canvas.h?(a.y=s.y_top,a.x=Math.random()*i.canvas.w):a.y+a.radius<0&&(a.y=s.y_bottom,a.x=Math.random()*i.canvas.w),i.particles.move.out_mode){case"bounce":a.x+a.radius>i.canvas.w?a.vx=-a.vx:a.x-a.radius<0&&(a.vx=-a.vx),a.y+a.radius>i.canvas.h?a.vy=-a.vy:a.y-a.radius<0&&(a.vy=-a.vy)}if(isInArray("grab",i.interactivity.events.onhover.mode)&&i.fn.modes.grabParticle(a),(isInArray("bubble",i.interactivity.events.onhover.mode)||isInArray("bubble",i.interactivity.events.onclick.mode))&&i.fn.modes.bubbleParticle(a),(isInArray("repulse",i.interactivity.events.onhover.mode)||isInArray("repulse",i.interactivity.events.onclick.mode))&&i.fn.modes.repulseParticle(a),i.particles.line_linked.enable||i.particles.move.attract.enable)for(var n=e+1;n<i.particles.array.length;n++){var r=i.particles.array[n];i.particles.line_linked.enable&&i.fn.interact.linkParticles(a,r),i.particles.move.attract.enable&&i.fn.interact.attractParticles(a,r),i.particles.move.bounce&&i.fn.interact.bounceParticles(a,r)}}},i.fn.particlesDraw=function(){i.canvas.ctx.clearRect(0,0,i.canvas.w,i.canvas.h),i.fn.particlesUpdate();for(var e=0;e<i.particles.array.length;e++){var a=i.particles.array[e];a.draw()}},i.fn.particlesEmpty=function(){i.particles.array=[]},i.fn.particlesRefresh=function(){cancelRequestAnimFrame(i.fn.checkAnimFrame),cancelRequestAnimFrame(i.fn.drawAnimFrame),i.tmp.source_svg=void 0,i.tmp.img_obj=void 0,i.tmp.count_svg=0,i.fn.particlesEmpty(),i.fn.canvasClear(),i.fn.vendors.start()},i.fn.interact.linkParticles=function(e,a){var t=e.x-a.x,s=e.y-a.y,n=Math.sqrt(t*t+s*s);if(n<=i.particles.line_linked.distance){var r=i.particles.line_linked.opacity-n/(1/i.particles.line_linked.opacity)/i.particles.line_linked.distance;if(r>0){var c=i.particles.line_linked.color_rgb_line;i.canvas.ctx.strokeStyle="rgba("+c.r+","+c.g+","+c.b+","+r+")",i.canvas.ctx.lineWidth=i.particles.line_linked.width,i.canvas.ctx.beginPath(),i.canvas.ctx.moveTo(e.x,e.y),i.canvas.ctx.lineTo(a.x,a.y),i.canvas.ctx.stroke(),i.canvas.ctx.closePath()}}},i.fn.interact.attractParticles=function(e,a){var t=e.x-a.x,s=e.y-a.y,n=Math.sqrt(t*t+s*s);if(n<=i.particles.line_linked.distance){var r=t/(1e3*i.particles.move.attract.rotateX),c=s/(1e3*i.particles.move.attract.rotateY);e.vx-=r,e.vy-=c,a.vx+=r,a.vy+=c}},i.fn.interact.bounceParticles=function(e,a){var t=e.x-a.x,i=e.y-a.y,s=Math.sqrt(t*t+i*i),n=e.radius+a.radius;n>=s&&(e.vx=-e.vx,e.vy=-e.vy,a.vx=-a.vx,a.vy=-a.vy)},i.fn.modes.pushParticles=function(e,a){i.tmp.pushing=!0;for(var t=0;e>t;t++)i.particles.array.push(new i.fn.particle(i.particles.color,i.particles.opacity.value,{x:a?a.pos_x:Math.random()*i.canvas.w,y:a?a.pos_y:Math.random()*i.canvas.h})),t==e-1&&(i.particles.move.enable||i.fn.particlesDraw(),i.tmp.pushing=!1)},i.fn.modes.removeParticles=function(e){i.particles.array.splice(0,e),i.particles.move.enable||i.fn.particlesDraw()},i.fn.modes.bubbleParticle=function(e){function a(){e.opacity_bubble=e.opacity,e.radius_bubble=e.radius}function t(a,t,s,n,c){if(a!=t)if(i.tmp.bubble_duration_end){if(void 0!=s){var o=n-p*(n-a)/i.interactivity.modes.bubble.duration,l=a-o;d=a+l,"size"==c&&(e.radius_bubble=d),"opacity"==c&&(e.opacity_bubble=d)}}else if(r<=i.interactivity.modes.bubble.distance){if(void 0!=s)var v=s;else var v=n;if(v!=a){var d=n-p*(n-a)/i.interactivity.modes.bubble.duration;"size"==c&&(e.radius_bubble=d),"opacity"==c&&(e.opacity_bubble=d)}}else"size"==c&&(e.radius_bubble=void 0),"opacity"==c&&(e.opacity_bubble=void 0)}if(i.interactivity.events.onhover.enable&&isInArray("bubble",i.interactivity.events.onhover.mode)){var s=e.x-i.interactivity.mouse.pos_x,n=e.y-i.interactivity.mouse.pos_y,r=Math.sqrt(s*s+n*n),c=1-r/i.interactivity.modes.bubble.distance;if(r<=i.interactivity.modes.bubble.distance){if(c>=0&&"mousemove"==i.interactivity.status){if(i.interactivity.modes.bubble.size!=i.particles.size.value)if(i.interactivity.modes.bubble.size>i.particles.size.value){var o=e.radius+i.interactivity.modes.bubble.size*c;o>=0&&(e.radius_bubble=o)}else{var l=e.radius-i.interactivity.modes.bubble.size,o=e.radius-l*c;o>0?e.radius_bubble=o:e.radius_bubble=0}if(i.interactivity.modes.bubble.opacity!=i.particles.opacity.value)if(i.interactivity.modes.bubble.opacity>i.particles.opacity.value){var v=i.interactivity.modes.bubble.opacity*c;v>e.opacity&&v<=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)}else{var v=e.opacity-(i.particles.opacity.value-i.interactivity.modes.bubble.opacity)*c;v<e.opacity&&v>=i.interactivity.modes.bubble.opacity&&(e.opacity_bubble=v)}}}else a();"mouseleave"==i.interactivity.status&&a()}else if(i.interactivity.events.onclick.enable&&isInArray("bubble",i.interactivity.events.onclick.mode)){if(i.tmp.bubble_clicking){var s=e.x-i.interactivity.mouse.click_pos_x,n=e.y-i.interactivity.mouse.click_pos_y,r=Math.sqrt(s*s+n*n),p=((new Date).getTime()-i.interactivity.mouse.click_time)/1e3;p>i.interactivity.modes.bubble.duration&&(i.tmp.bubble_duration_end=!0),p>2*i.interactivity.modes.bubble.duration&&(i.tmp.bubble_clicking=!1,i.tmp.bubble_duration_end=!1)}i.tmp.bubble_clicking&&(t(i.interactivity.modes.bubble.size,i.particles.size.value,e.radius_bubble,e.radius,"size"),t(i.interactivity.modes.bubble.opacity,i.particles.opacity.value,e.opacity_bubble,e.opacity,"opacity"))}},i.fn.modes.repulseParticle=function(e){function a(){var a=Math.atan2(d,p);if(e.vx=u*Math.cos(a),e.vy=u*Math.sin(a),"bounce"==i.particles.move.out_mode){var t={x:e.x+e.vx,y:e.y+e.vy};t.x+e.radius>i.canvas.w?e.vx=-e.vx:t.x-e.radius<0&&(e.vx=-e.vx),t.y+e.radius>i.canvas.h?e.vy=-e.vy:t.y-e.radius<0&&(e.vy=-e.vy)}}if(i.interactivity.events.onhover.enable&&isInArray("repulse",i.interactivity.events.onhover.mode)&&"mousemove"==i.interactivity.status){var t=e.x-i.interactivity.mouse.pos_x,s=e.y-i.interactivity.mouse.pos_y,n=Math.sqrt(t*t+s*s),r={x:t/n,y:s/n},c=i.interactivity.modes.repulse.distance,o=100,l=clamp(1/c*(-1*Math.pow(n/c,2)+1)*c*o,0,50),v={x:e.x+r.x*l,y:e.y+r.y*l};"bounce"==i.particles.move.out_mode?(v.x-e.radius>0&&v.x+e.radius<i.canvas.w&&(e.x=v.x),v.y-e.radius>0&&v.y+e.radius<i.canvas.h&&(e.y=v.y)):(e.x=v.x,e.y=v.y)}else if(i.interactivity.events.onclick.enable&&isInArray("repulse",i.interactivity.events.onclick.mode))if(i.tmp.repulse_finish||(i.tmp.repulse_count++,i.tmp.repulse_count==i.particles.array.length&&(i.tmp.repulse_finish=!0)),i.tmp.repulse_clicking){var c=Math.pow(i.interactivity.modes.repulse.distance/6,3),p=i.interactivity.mouse.click_pos_x-e.x,d=i.interactivity.mouse.click_pos_y-e.y,m=p*p+d*d,u=-c/m*1;c>=m&&a()}else 0==i.tmp.repulse_clicking&&(e.vx=e.vx_i,e.vy=e.vy_i)},i.fn.modes.grabParticle=function(e){if(i.interactivity.events.onhover.enable&&"mousemove"==i.interactivity.status){var a=e.x-i.interactivity.mouse.pos_x,t=e.y-i.interactivity.mouse.pos_y,s=Math.sqrt(a*a+t*t);if(s<=i.interactivity.modes.grab.distance){var n=i.interactivity.modes.grab.line_linked.opacity-s/(1/i.interactivity.modes.grab.line_linked.opacity)/i.interactivity.modes.grab.distance;if(n>0){var r=i.particles.line_linked.color_rgb_line;i.canvas.ctx.strokeStyle="rgba("+r.r+","+r.g+","+r.b+","+n+")",i.canvas.ctx.lineWidth=i.particles.line_linked.width,i.canvas.ctx.beginPath(),i.canvas.ctx.moveTo(e.x,e.y),i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x,i.interactivity.mouse.pos_y),i.canvas.ctx.stroke(),i.canvas.ctx.closePath()}}}},i.fn.vendors.eventsListeners=function(){"window"==i.interactivity.detect_on?i.interactivity.el=window:i.interactivity.el=i.canvas.el,(i.interactivity.events.onhover.enable||i.interactivity.events.onclick.enable)&&(i.interactivity.el.addEventListener("mousemove",function(e){if(i.interactivity.el==window)var a=e.clientX,t=e.clientY;else var a=e.offsetX||e.clientX,t=e.offsetY||e.clientY;i.interactivity.mouse.pos_x=a,i.interactivity.mouse.pos_y=t,i.tmp.retina&&(i.interactivity.mouse.pos_x*=i.canvas.pxratio,i.interactivity.mouse.pos_y*=i.canvas.pxratio),i.interactivity.status="mousemove"}),i.interactivity.el.addEventListener("mouseleave",function(e){i.interactivity.mouse.pos_x=null,i.interactivity.mouse.pos_y=null,i.interactivity.status="mouseleave"})),i.interactivity.events.onclick.enable&&i.interactivity.el.addEventListener("click",function(){if(i.interactivity.mouse.click_pos_x=i.interactivity.mouse.pos_x,i.interactivity.mouse.click_pos_y=i.interactivity.mouse.pos_y,i.interactivity.mouse.click_time=(new Date).getTime(),i.interactivity.events.onclick.enable)switch(i.interactivity.events.onclick.mode){case"push":i.particles.move.enable?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):1==i.interactivity.modes.push.particles_nb?i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb,i.interactivity.mouse):i.interactivity.modes.push.particles_nb>1&&i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);break;case"remove":i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);break;case"bubble":i.tmp.bubble_clicking=!0;break;case"repulse":i.tmp.repulse_clicking=!0,i.tmp.repulse_count=0,i.tmp.repulse_finish=!1,setTimeout(function(){i.tmp.repulse_clicking=!1},1e3*i.interactivity.modes.repulse.duration)}})},i.fn.vendors.densityAutoParticles=function(){if(i.particles.number.density.enable){var e=i.canvas.el.width*i.canvas.el.height/1e3;i.tmp.retina&&(e/=2*i.canvas.pxratio);var a=e*i.particles.number.value/i.particles.number.density.value_area,t=i.particles.array.length-a;0>t?i.fn.modes.pushParticles(Math.abs(t)):i.fn.modes.removeParticles(t)}},i.fn.vendors.checkOverlap=function(e,a){for(var t=0;t<i.particles.array.length;t++){var s=i.particles.array[t],n=e.x-s.x,r=e.y-s.y,c=Math.sqrt(n*n+r*r);c<=e.radius+s.radius&&(e.x=a?a.x:Math.random()*i.canvas.w,e.y=a?a.y:Math.random()*i.canvas.h,i.fn.vendors.checkOverlap(e))}},i.fn.vendors.createSvgImg=function(e){var a=i.tmp.source_svg,t=/#([0-9A-F]{3,6})/gi,s=a.replace(t,function(a,t,i,s){if(e.color.rgb)var n="rgba("+e.color.rgb.r+","+e.color.rgb.g+","+e.color.rgb.b+","+e.opacity+")";else var n="hsla("+e.color.hsl.h+","+e.color.hsl.s+"%,"+e.color.hsl.l+"%,"+e.opacity+")";return n}),n=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),r=window.URL||window.webkitURL||window,c=r.createObjectURL(n),o=new Image;o.addEventListener("load",function(){e.img.obj=o,e.img.loaded=!0,r.revokeObjectURL(c),i.tmp.count_svg++}),o.src=c},i.fn.vendors.destroypJS=function(){cancelAnimationFrame(i.fn.drawAnimFrame),t.remove(),pJSDom=null},i.fn.vendors.drawShape=function(e,a,t,i,s,n){var r=s*n,c=s/n,o=180*(c-2)/c,l=Math.PI-Math.PI*o/180;e.save(),e.beginPath(),e.translate(a,t),e.moveTo(0,0);for(var v=0;r>v;v++)e.lineTo(i,0),e.translate(i,0),e.rotate(l);e.fill(),e.restore()},i.fn.vendors.exportImg=function(){window.open(i.canvas.el.toDataURL("image/png"),"_blank")},i.fn.vendors.loadImg=function(e){if(i.tmp.img_error=void 0,""!=i.particles.shape.image.src)if("svg"==e){var a=new XMLHttpRequest;a.open("GET",i.particles.shape.image.src),a.onreadystatechange=function(e){4==a.readyState&&(200==a.status?(i.tmp.source_svg=e.currentTarget.response,i.fn.vendors.checkBeforeDraw()):(console.log("Error pJS - Image not found"),i.tmp.img_error=!0))},a.send()}else{var t=new Image;t.addEventListener("load",function(){i.tmp.img_obj=t,i.fn.vendors.checkBeforeDraw()}),t.src=i.particles.shape.image.src}else console.log("Error pJS - No image.src"),i.tmp.img_error=!0},i.fn.vendors.draw=function(){"image"==i.particles.shape.type?"svg"==i.tmp.img_type?i.tmp.count_svg>=i.particles.number.value?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):void 0!=i.tmp.img_obj?(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame)):i.tmp.img_error||(i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw)):(i.fn.particlesDraw(),i.particles.move.enable?i.fn.drawAnimFrame=requestAnimFrame(i.fn.vendors.draw):cancelRequestAnimFrame(i.fn.drawAnimFrame))},i.fn.vendors.checkBeforeDraw=function(){"image"==i.particles.shape.type?"svg"==i.tmp.img_type&&void 0==i.tmp.source_svg?i.tmp.checkAnimFrame=requestAnimFrame(check):(cancelRequestAnimFrame(i.tmp.checkAnimFrame),i.tmp.img_error||(i.fn.vendors.init(),i.fn.vendors.draw())):(i.fn.vendors.init(),i.fn.vendors.draw())},i.fn.vendors.init=function(){i.fn.retinaInit(),i.fn.canvasInit(),i.fn.canvasSize(),i.fn.canvasPaint(),i.fn.particlesCreate(),i.fn.vendors.densityAutoParticles(),i.particles.line_linked.color_rgb_line=hexToRgb(i.particles.line_linked.color)},i.fn.vendors.start=function(){isInArray("image",i.particles.shape.type)?(i.tmp.img_type=i.particles.shape.image.src.substr(i.particles.shape.image.src.length-3),i.fn.vendors.loadImg(i.tmp.img_type)):i.fn.vendors.checkBeforeDraw()},i.fn.vendors.eventsListeners(),i.fn.vendors.start()};Object.deepExtend=function(e,a){for(var t in a)a[t]&&a[t].constructor&&a[t].constructor===Object?(e[t]=e[t]||{},arguments.callee(e[t],a[t])):e[t]=a[t];return e},window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),window.cancelRequestAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}(),window.pJSDom=[],window.particlesJS=function(e,a){"string"!=typeof e&&(a=e,e="particles-js"),e||(e="particles-js");var t=document.getElementById(e),i="particles-js-canvas-el",s=t.getElementsByClassName(i);if(s.length)for(;s.length>0;)t.removeChild(s[0]);var n=document.createElement("canvas");n.className=i,n.style.width="100%",n.style.height="100%";var r=document.getElementById(e).appendChild(n);null!=r&&pJSDom.push(new pJS(e,a))},window.particlesJS.load=function(e,a,t){var i=new XMLHttpRequest;i.open("GET",a),i.onreadystatechange=function(a){if(4==i.readyState)if(200==i.status){var s=JSON.parse(a.currentTarget.response);window.particlesJS(e,s),t&&t()}else console.log("Error pJS - XMLHttpRequest status: "+i.status),console.log("Error pJS - File config not found")},i.send()};
var initPhotoSwipeFromDOM = function (gallerySelector) {

   // parse slide data (url, title, size ...) from DOM elements 
   // (children of gallerySelector)
   var parseThumbnailElements = function (el) {
      var thumbElements = el.childNodes,
         numNodes = thumbElements.length,
         items = [],
         figureEl,
         linkEl,
         size,
         item;

      for (var i = 0; i < numNodes; i++) {

         figureEl = thumbElements[i]; // <figure> element

         // include only element nodes 
         if (figureEl.nodeType !== 1) {
            continue;
         }

         linkEl = figureEl.children[0]; // <a> element

         size = linkEl.getAttribute('data-size').split('x');

         if (linkEl.getAttribute('data-type') == "video") {
            var videoURL = linkEl.getAttribute('href');
            var template = `<div class="gallery-container">
                              <iframe class="gallery-container-iframe" src="${videoURL}" gesture="media"  allow="encrypted-media" allowfullscreen></iframe>
                            </div>`;
            item = {
              html: template
            };
          } else {
            item = {
              src: linkEl.getAttribute('href'),
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
            };
          }

         if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML;
         }

         if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src');
         }

         item.el = figureEl; // save link to element for getThumbBoundsFn
         items.push(item);
      }

      return items;
   };

   // find nearest parent element
   var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
   };

   // triggers when user clicks on thumbnail
   var onThumbnailsClick = function (e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function (el) {
         return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if (!clickedListItem) {
         return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
         childNodes = clickedListItem.parentNode.childNodes,
         numChildNodes = childNodes.length,
         nodeIndex = 0,
         index;

      for (var i = 0; i < numChildNodes; i++) {
         if (childNodes[i].nodeType !== 1) {
            continue;
         }

         if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
         }
         nodeIndex++;
      }



      if (index >= 0) {
         // open PhotoSwipe if valid index found
         openPhotoSwipe(index, clickedGallery);
      }
      return false;
   };

   // parse picture index and gallery index from URL (#&pid=1&gid=2)
   var photoswipeParseHash = function () {
      var hash = window.location.hash.substring(1),
         params = {};

      if (hash.length < 5) {
         return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
         if (!vars[i]) {
            continue;
         }
         var pair = vars[i].split('=');
         if (pair.length < 2) {
            continue;
         }
         params[pair[0]] = pair[1];
      }

      if (params.gid) {
         params.gid = parseInt(params.gid, 10);
      }

      return params;
   };

   var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
         gallery,
         options,
         items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {

         // define gallery index (for URL)
         galleryUID: galleryElement.getAttribute('data-pswp-uid'),

         getThumbBoundsFn: function (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
               pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
               rect = thumbnail.getBoundingClientRect();

            return {
               x: rect.left,
               y: rect.top + pageYScroll,
               w: rect.width
            };
         }

      };

      // PhotoSwipe opened from URL
      if (fromURL) {
         if (options.galleryPIDs) {
            // parse real index when custom PIDs are used 
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (var j = 0; j < items.length; j++) {
               if (items[j].pid == index) {
                  options.index = j;
                  break;
               }
            }
         } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
         }
      } else {
         options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
         return;
      }

      if (disableAnimation) {
         options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
   };

   // loop through all gallery elements and bind events
   var galleryElements = document.querySelectorAll(gallerySelector);

   for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
   }

   // Parse URL and open gallery if it contains #&pid=3&gid=1
   var hashData = photoswipeParseHash();
   if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
   }
};
function smoothScroll(location) {
   if (location) {
      var container = document.querySelector("#" + location);
      container.scrollIntoView({
         behavior: "smooth",
         block: "start",
         inline: "nearest"
      });
   } else throw new Error("Variável 'location' não passada no evento de 'click'");
}
function initParticulasBG() {
   document.body.style.backgroundColor = "rgb(114, 114, 114)";
   if (pJSDom.length == 1) {
      document.getElementById("particles-js").style.display = "block";
      pJSDom[0].pJS.fn.vendors.start();
   } else {
      document.getElementById("particles-js").style.display = "block";
      particlesJS("particles-js", {

         "particles": {
            "number": {
               "value": 80,
               "density": {
                  "enable": true,
                  "value_area": 1000
               }
            },
            "color": {
               "value": "#fff"
            },
            "shape": {
               "type": "circle",
               "stroke": {
                  "width": 0,
                  "color": "#000000"
               },
               "polygon": {
                  "nb_sides": 5
               },
               "image": {
                  "src": "http://image.ibb.co/g9eFcF/logo_transparent.png",
                  "width": 100,
                  "height": 100
               }
            },
            "opacity": {
               "value": 1,
               "random": false,
               "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.6,
                  "sync": false
               }
            },
            "size": {
               "value": 3,
               "random": true,
               "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
               }
            },
            "line_linked": {
               "enable": true,
               "distance": 120,
               "color": "#fa7500",
               "opacity": 0.8,
               "width": 1
            },
            "move": {
               "enable": true,
               "speed": 4,
               "direction": "random",
               "random": false,
               "straight": false,
               "out_mode": "bounce",
               "bounce": true,
               "attract": {
                  "enable": true,
                  "rotateX": 3600,
                  "rotateY": 3600
               }
            }
         },

         "interactivity": {
            "detect_on": "canvas",

            "events": {
               "onhover": {
                  "enable": true,
                  "mode": "repulse"
               },
               "onclick": {
                  "enable": false,
                  "mode": "remove"
               },
               "resize": true
            },

            "modes": {
               "repulse": {
                  "distance": 100,
                  "duration": 0.4
               }
            }
         },
         "retina_detect": true
      });
   }
}

function destroyParticulasBG() {
   document.getElementById("particles-js").style.display = "none";
   document.body.style.backgroundColor = "white";
   if(pJSDom[0] != undefined){
      cancelRequestAnimFrame(pJSDom[0].pJS.fn.checkAnimFrame);
      cancelRequestAnimFrame(pJSDom[0].pJS.fn.drawAnimFrame);
      pJSDom[0].pJS.fn.particlesEmpty();
      pJSDom[0].pJS.fn.canvasClear();
   }
}
// init scroll reveal e galeria
function initComponents() {
   window.sr = ScrollReveal();

   if (document.querySelectorAll('.animation-default').length > 0)
      sr.reveal('.animation-default', {
         duration: 1500
      });
   if (document.querySelectorAll('.animation-comoFunciona').length > 0)
      sr.reveal('.animation-comoFunciona', {
         duration: 1000
      }, 500);
   if (document.querySelectorAll('.animation-modulosServicos').length > 0)
      sr.reveal('.animation-modulosServicos', {
         duration: 1000
      }, 500);

   if (document.querySelectorAll('.gallery').length > 0)
      initPhotoSwipeFromDOM('.gallery');
}

function initView(view, type){
   if(type == "home"){
      return {
         navbar: getNavBar(view),
         main: getHome()
      };
   } else {

      var vamosConversar = '', 
         nossosTrabalhos = '',
         comoFunciona = '',
         footer = '',
         modulo = '',
         portfolio = '',
         servicos = '',
         sobrenos = '',
         contato = '',
         navbar = '';

      navbar = getNavBar(view);
      comoFunciona = getComoFunciona(view);
      nossosTrabalhos = getNossosTrabalhos(view);
      vamosConversar = getVamosConversar(view);
      footer = getFooter(view);

      if(type == "modulos")
         modulo = getModuloView(view);

      if(type == "menu") {
         portfolio = getPortfolio(view);
         servicos = getServicos(view);
         sobrenos = getSobrenos(view);
         contato = getContato(view);
      }

      return {
         navbar: navbar,
         main: modulo + portfolio + servicos + sobrenos + contato + comoFunciona + nossosTrabalhos + vamosConversar + footer
      };
   }
}
function getFooter(view) {
      return `
         <hr>
         <footer class="footer">
            <div class="footer-left">
               <a href="#"><img class="footer-left-logo" src="./img/11Art_Original.svg"></a>
            </div>
            <div class="footer-center">
                  <span>&copy; 11Art 2018</span>
            </div>
            <div class="footer-right">
               <a target="_blank" href="https://www.google.com"><i class="footer-right-fb fa fa-facebook-official fa-3x"></i></a>
            </div>
         </footer>`;
};
function getContato(view){
   if(view == "contato")
      return `      
      <div class="pageTitle animation-default">
         <h1 class="pageTitle-h1"><span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">Contato</span></h1>
         <p class="pageTitle-p">Fale com gente que entende e quer ouvir!</p>
      </div>
      `;
   else
      return '';
}
function getHome(view){
      return `
      <div class="container-fluid">
         <section>
            <article class="container">
               <h1 class="text-center text-white tituloBoasVindas animation-modulosServicos">
                  <span class="font-weight-bold">Bem vindo!</span> Conta pra gente, do que você precisa?
                  <span class="font-weight-bold">;)</span>
               </h1>
      
               <div class="row">
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-design text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/design.svg">
                        <h3>Design Gráfico</h3>
                        <p>BANNER, FYLER, MIDIAS SOCIAIS, IMPRESSOS...</p>
                        <a class="no-textDecoration" href="#!design">
                           <button type="button" class="button-11art button-11art-design">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-web text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/web.svg">
                        <h3>Website</h3>
                        <p>COMPLETO, REPONSIVO, RÁPIDO, SEO, ACESSÍVEL...</p>
                        <a class="no-textDecoration" href="#!web">
                           <button type="button" class="button-11art button-11art-web">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-video text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/video.svg">
                        <h3>Produção Vídeo</h3>
                        <p>EDIÇÃO, MONTAGEM, CLIP, FINALIZAÇÃO, EFEITOS...</p>
                        <a class="no-textDecoration" href="#!video">
                           <button type="button" class="button-11art button-11art-video">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-3d text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/3d.svg">
                        <h3 class="titulo">Modelagem 3D</h3>
                        <p>PERSONAGEM, CENÁRIO, AMBIENTE, OBJETOS...</p>
                        <a class="no-textDecoration" href="#!3d">
                           <button type="button" class="button-11art button-11art-3d">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
               </div>
            </article>
         </section>
      </div>
      `;
}
function getPortfolio(view){
   if(view == "portfolio")
      return `      
      <div class="pageTitle animation-default">
      <h1 class="pageTitle-h1"><span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">Portfolio</span></h1>
      <p class="pageTitle-p">Escolha uma categoria abaixo para filtrar ;)</p>
      </div>
      <div class="text-center animation-default row">
         <div class="col-md-12">
            <button id="11art" onclick="portfolioFiltrar('11art')" class="btn btn-outline-11art btn-portfolio">Todos</button>
            <button id="design" onclick="portfolioFiltrar('design')" class="btn btn-outline-design btn-portfolio">Design Gráfico</button>
            <button id="3d" onclick="portfolioFiltrar('3d')" class="btn btn-outline-3d btn-portfolio">Modelagem 3D</button>
            <button id="web" onclick="portfolioFiltrar('web')" class="btn btn-outline-web btn-portfolio">Website</button>
            <button id="video" onclick="portfolioFiltrar('video')" class="btn btn-outline-video btn-portfolio">Produção Vídeo</button>
         </div>
      </div>
      <div class="row animation-default">
         <div class="col-md-12 pb-6 pt-5">
            <article class="boxPortfolio">
               <div class="gallery">
               </div>
            </article>
         </div>
      </div>
      `;
   else
      return '';
}
function getServicos(view){
   if(view == "servicos")
      return `      
      <div class="pageTitle animation-default">
         <h1 class="pageTitle-h1"><span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">Nossos Serviços</span></h1>
      </div>
      <article class="row">
            <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
               <div class="panel-left col-md-5 col-lg-3 col-lg-offset-1 col-xs-12 col-sm-12 text-center ">
                  <img class="panel-left-img" src="./img/design_c.svg">
                  <h1 class="panel-left-title mb-0">Design Gráfico</h1>
               </div>
               <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12">
                  <p class="panel-right-description mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.</p>
                  <div class="row">
                     <div class="col-md-12 animation-default">
                        <button class="btn btn-outline-design btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">Como funciona</button>
                        <button class="btn btn-outline-design btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">Nossos trabalhos</button>
                        <button class="btn btn-fill-design btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">Vamos conversar?</button>
                     </div>
                  </div>
               </div>
            </div>
         </article>
         <hr>
         <article class="row">
            <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
               <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_max600">
                  <img class="panel-left-img" src="./img/web_c.svg">
                  <h1 class="panel-left-title mb-0">Website</h1>
               </div>
               <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12 col-lg-offset-1">
                  <p class="panel-right-description mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.</p>
                  <div class="row">
                     <div class="col-md-12 animation-default">
                        <button class="btn btn-outline-web btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">Como funciona</button>
                        <button class="btn btn-outline-web btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">Nossos trabalhos</button>
                        <button class="btn btn-fill-web btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">Vamos conversar?</button>
                     </div>
                  </div>
               </div>
               <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_min600">
                  <img class="panel-left-img" src="./img/web_c.svg">
                  <h1 class="panel-left-title mb-0">Website</h1>
               </div>
            </div>
         </article>
         <hr>
         <article class="row">
            <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
               <div class="panel-left col-md-5 col-lg-3 col-lg-offset-1 col-xs-12 col-sm-12 text-center ">
                  <img class="panel-left-img" src="./img/3d_c.svg">
                  <h1 class="panel-left-title mb-0">Modelagem 3D</h1>
               </div>
               <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12">
                  <p class="panel-right-description mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.</p>
                  <div class="row">
                     <div class="col-md-12 animation-default">
                        <button class="btn btn-outline-3d btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">Como funciona</button>
                        <button class="btn btn-outline-3d btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">Nossos trabalhos</button>
                        <button class="btn btn-fill-3d btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">Vamos conversar?</button>
                     </div>
                  </div>
               </div>
            </div>
         </article>
         <hr>
         <article class="row">
               <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
                  <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_max600">
                     <img class="panel-left-img" src="./img/video_c.svg">
                     <h1 class="panel-left-title mb-0">Produção de video</h1>
                  </div>
                  <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12 col-lg-offset-1">
                     <p class="panel-right-description mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.</p>
                     <div class="row">
                        <div class="col-md-12 animation-default">
                           <button class="btn btn-outline-video btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">Como funciona</button>
                           <button class="btn btn-outline-video btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">Nossos trabalhos</button>
                           <button class="btn btn-fill-video btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">Vamos conversar?</button>
                        </div>
                     </div>
                  </div>
                  <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_min600">
                     <img class="panel-left-img" src="./img/video_c.svg">
                     <h1 class="panel-left-title mb-0">Produção de video</h1>
                  </div>
               </div>
         </article>
      `;
   else
      return '';
}
function getSobrenos(view){
   if(view == "sobrenos")
      return `      
      <div class="container sobrenos">
      <section class="animation-default">
         <div class="row">
            <arcticle class="col-md-12">
               <div class="pageTitle">
                  <h1 class="pageTitle-h1">
                     <span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">11Art</span>
                  </h1>
               </div>
               <div class="sobrenos-11art">
                  <p>
                     <strong>11Art</strong> é uma marca que compõe um time de profissionais que atendem todas as áreas de arte.
                     <strong>11Art</strong> foi batizado assim porque representa a 11° Arte
                     <i>(décima primeira arte)</i>, que é a união de todas as artes, seja ela gráfica, web, impressa, 3D ou vídeo.</p>
               </div>
            </arcticle>
         </div>
         <hr>
         <div class="row mb-12 mt-8">
            <article class="col-md-12">
               <div class="pageTitle mt-6">
                  <h1 class="pageTitle-h1">
                     <span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">O Time</span>
                  </h1>
               </div>
               <div class="sobrenos-oTime">
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="http://placekitten.com/500/500">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                           <h4 class="sobrenos-oTime-card-info-name">Gato 1</h4>
                           <p class="sobrenos-oTime-card-info-function">Função</p>
                           <p class="sobrenos-oTime-card-info-bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint placeat, earum iste quia ratione?
                              Delectus distinctio iste numquam vero, fugit dolore quae dicta reiciendis corrupti aut ut saepe
                              obcaecati!
                           </p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="http://placekitten.com/500/502">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                           <h4 class="sobrenos-oTime-card-info-name">Gato 2</h4>
                           <p class="sobrenos-oTime-card-info-function">Função</p>
                           <p class="sobrenos-oTime-card-info-bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint placeat, earum iste quia ratione?
                              Delectus distinctio iste numquam vero, fugit dolore quae dicta reiciendis corrupti aut ut saepe
                              obcaecati!
                           </p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="http://placekitten.com/505/500">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                           <h4 class="sobrenos-oTime-card-info-name">Gato 3</h4>
                           <p class="sobrenos-oTime-card-info-function">Função</p>
                           <p class="sobrenos-oTime-card-info-bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint placeat, earum iste quia ratione?
                              Delectus distinctio iste numquam vero, fugit dolore quae dicta reiciendis corrupti aut ut saepe
                              obcaecati!
                           </p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="http://placekitten.com/500/505">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                           <h4 class="sobrenos-oTime-card-info-name">Gato 4</h4>
                           <p class="sobrenos-oTime-card-info-function">Função</p>
                           <p class="sobrenos-oTime-card-info-bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sint placeat, earum iste quia ratione?
                              Delectus distinctio iste numquam vero, fugit dolore quae dicta reiciendis corrupti aut ut saepe
                              obcaecati!
                           </p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" href="#">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </article>
      </section>
      </div>
      `;
   else
      return '';
}
function getNavBar(view) {
   var viewColor = getViewColor(view);

   return `
      <nav class="nav strokeEffect" style="background:${viewColor}">
      <div class="nav-header">
         <div class="nav-header-title">
            <a href="#!home">
               <img src="img/11Art_White.svg" width="50" height="80" alt=""> </a>
         </div>
      </div>
      <div class="nav-mobileBtn">
         <label for="nav-mobileBtnToogle">
            <p class="nav-mobileBtn-toogleText">Menu</p>
            <span></span>
            <span></span>
            <span></span>
         </label>
      </div>
      <input type="checkbox" id="nav-mobileBtnToogle">
      <div class="nav-links">
         <img class="nav-links-logo" src="img/11Art_White.svg" width="50" height="80" alt="">
         <div class="nav-links-btnFechar">
            <label for="nav-mobileBtnToogle">Fechar X</label>
         </div>
         <a href="#!home">HOME</a>
         <a href="#!servicos">SERVIÇOS</a>
         <a href="#!portfolio">PORTFOLIO</a>
         <a href="#!sobrenos">SOBRE NÓS</a>
         <a class="mtn-4 mb-10" href="#!contato">CONTATO</a>
      </div>
      </nav>
   `;
};
function getVamosConversar(view) {
   var viewColor = getViewColor(view);
   if (viewColor == "#fb8c00")
      viewColor = "11art";
   else
      viewColor = view;

      return `
      <hr id="container_vamosConversar">  <!-- Anchor -->
      <div class="row animation-default">
         <div class="col-md-12 pb-8">
            <article class="boxVamosConversar">
               <div class="text-center">
                  <h2 class="boxVamosConversar-title">Vamos
                     <span class="text-mark text-mark-${viewColor}">Conversar?</span> ;)</h2>
               </div>
               <form class="boxVamosConversar-form" role="form">
                  <div class="col-lg-offset-1 col-lg-3 col-md-5 text-center">
                     <img class="boxVamosConversar-img mb-7" src="./img/postbox.svg">
                  </div>
                  <div class="col-lg-7 col-md-7 col-xs-12">
                     <div class="formControl">
                        <label class="formControl-label">Nome</label>
                        <input required class="formControl-input formControl-input-${viewColor}" placeholder="Ex: Joãozinho" />
                     </div>
                     <div class="formControl">
                        <label class="formControl-label">Email</label>
                        <input required type="email" class="formControl-input formControl-input-${viewColor}" placeholder="seuemail@email.com" />
                     </div>
                     <div class="formControl">
                        <label class="formControl-label">Mensagem</label>
                        <textarea rows="3" required class="formControl-input formControl-input-${viewColor}" placeholder="(00) 00000-0000"></textarea>
                     </div>
                     <button class="boxVamosConversar-form-btnEnviar btn btn-fill-${viewColor}" type="button">Enviar</button>
                     <button class="boxVamosConversar-form-btnEnviar btn btn-outline-reset" type="reset">Limpar</button>
                  </div>
               </form>
            </article>
         </div>
      </div>`;
}
function getComoFunciona(view) {
   if (view != 'portfolio' && view != 'sobrenos' && view != 'contato'){
      var viewClass = getViewColor(view);
      if (viewClass == "#fb8c00")
         viewClass = "11art";
      else
         viewClass = view;

      return `
      <hr id="container_comoFunciona">
      <div class="row pb-8 pt-5">
         <div class="col-md-12">
         <article class="boxComoFunciona">
            <div class="text-center">
               <h2 class="boxComoFunciona-title animation-default pb-8">Como funciona? <span class="text-mark text-mark-${viewClass}">É bem simples!</span></h2>
            </div>

            <div class="col-lg-3 col-md-4 boxComoFunciona-ml animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-smile-o"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">1 - Conta pra gente!</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">Primeiro você vai dizer do que precisa! Banner, cartão, facebook, panfleto (...)</p>   
               </div>
            </div>

            <div class="col-lg-3 col-md-4 animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-pencil"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">2 - Primeiro esboço</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">Vamos preparar e apresentar um esboço do que planejamos fazer, <span class="fw-700">sem pagamento inicial.</span></p>   
               </div>
            </div>

            <div class="col-lg-3 col-md-4 animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-star-o"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">3 - Aprovado!</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">Com o esboço aprovado, iremos dar continuidade ao projeto ....... </p>   
               </div>
            </div>
         </article>
         </div>
      </div>`;
   }
   else
      return '';
};
function getModuloView (view) {
   if (view == '3d' || view == 'design' || view == 'video' || view == 'web'){
      
      var data = {
         title: '',
         description: '',
         img: '',
      }

      // [ DESIGN ]
      if(view == "design"){
         data = {
            title: 'Design Gráfico',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/design_c.svg',
         }
      }

      // [ WEB ]
      else if(view == "web"){
         data = {
            title: 'Website',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/web_c.svg',
         }
      }

      // [ VIDEO ]
      else if(view == "video"){
         data = {
            title: 'Produção Vídeo',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/video_c.svg',
         }
      }

      // [ 3D ]
      else if(view == "3d"){
         data = {
            title: 'Modelagem 3D',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/3d_c.svg',
         }
      }

      else throw new Error("Erro ao inserir Módulo.")


      return `
      <article class="row">
         <div class="col-md-12 col-xs-12 panel animation-default">
            <div class="panel-left col-md-5 col-lg-3 col-lg-offset-1 col-xs-12 col-sm-12 text-center ">
               <img class="panel-left-img" src="${data.img}">
               <h1 class="panel-left-title mb-0">${data.title}</h1>
            </div>
            <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12">
               <p class="panel-right-description mt-0">${data.description}</p>
               <div class="row">
                  <div class="col-md-12 animation-default">
                     <button class="btn btn-outline-${view}" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">Como funciona</button>
                     <button class="btn btn-outline-${view} ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">Nossos trabalhos</button>
                     <button class="btn btn-fill-${view} ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">Vamos conversar?</button>
                  </div>
               </div>
            </div>
         </div>
      </article>`;
   }
   else
      return '';
};
function getNossosTrabalhos(view) {
   var viewColor = getViewColor(view);
   var colorClass = view;
   var galeriaFotos = [];

   if (viewColor == "#fb8c00")
      viewColor = "11art";
   else
      viewColor = view;

   // [ 3D ]
   if (view == "3d")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];


   // [ VIDEO ]
   else if (view == "video")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }];


   // [ DESIGN ]
   else if (view == "design")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];


   // [ WEB ]
   else if (view == "web")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];

      // [ SERVIÇOS ]
      else if (view == "servicos"){
      colorClass = "11art"; // Fazer a classe ficar laranja
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];
   }

   else galeriaFotos = []; // Deixa vazio
   if (galeriaFotos.length == 4)
      return `
      <hr id="container_nossosTrabalhos">
      <div class="row animation-default">
         <div class="col-md-12 pb-6 pt-5">
            <article class="boxNossosTrabalhos">
               <div class="text-center">
                  <h2 class="boxNossosTrabalhos-title">Alguns de <span class="text-mark text-mark-${colorClass}">nossos trabalhos!</span></h2>
               </div>

               <div class="gallery">
                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[0].source}" data-size="1000x1000" data-type="${galeriaFotos[0].type}">
                     <img src="${galeriaFotos[0].img_placeholder}" alt="${galeriaFotos[0].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[0].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[0].description}</figcaption>                                    
                  </figure>
            
                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[1].source}" data-size="1000x1000" data-type="${galeriaFotos[1].type}">
                     <img src="${galeriaFotos[1].img_placeholder}" alt="${galeriaFotos[1].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[1].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[1].description}</figcaption>                                    
                  </figure>

                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[2].source}" data-size="1000x1000" data-type="${galeriaFotos[2].type}">
                     <img src="${galeriaFotos[2].img_placeholder}" alt="${galeriaFotos[2].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[2].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[2].description}</figcaption>                                    
                  </figure>

                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[3].source}" data-size="1000x1000" data-type="${galeriaFotos[3].type}">
                     <img src="${galeriaFotos[3].img_placeholder}" alt="${galeriaFotos[3].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[3].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[3].description}</figcaption>                                    
                  </figure>
               </div>
               <div class="col-md-12 col-xs-12 text-center mt-6 pl-2 pr-2">
                     <a href="#!portfolio"><button type="button" class="btn btn-outline-${colorClass} float-none_i">Ver mais!</button></a>
                  </div>
            </article>
         </div>
      </div>`;
   else
      return '';
}
function getViewColor(view) {
   if (view == "home")
      return "#fb8c00ba";
   else if (view == "web")
      return "rgb(0, 122, 250)";
   else if (view == "video")
      return "rgb(255, 59, 48)";
   else if (view == "3d")
      return "rgb(88, 86, 214)";
   else if (view == "design")
      return "rgb(76, 217, 100)";
   else
      return "#fb8c00";
}
function loadHTML(view, type) {
   var containers = initView(view, type); // Pega os containers

   // Insere no HTML
   document.getElementById("navbar").innerHTML = containers.navbar;
   document.getElementById("main").innerHTML = containers.main;

   initComponents(); // Iniciar Galeria e Animações suaves
   smoothScroll("navbar"); // Vá para o topo
   if (view == "home") initParticulasBG(); else destroyParticulasBG(); // Constrói/Destrói particulas baseado se é "home" ou não
   if (view == "portfolio") document.getElementById("11art").click(); // Clica no "Todos" se for a tela de portfolio
}
alert('a')
// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
   'home': loadHTML("home", "home"),
   'design': function design() {
      loadHTML("design", "modulos");
   },
   '3d': function design() {
      loadHTML("3d", "modulos");
   },
   'web': function design() {
      loadHTML("web", "modulos");
   },
   'video': function design() {
      loadHTML("video", "modulos");
   },
   'sobrenos': function design() {
      loadHTML("sobrenos", "menu");
   },
   'contato': function design() {
      loadHTML("contato", "menu");
   },
   'portfolio': function design() {
      loadHTML("portfolio", "menu");
   },
   'servicos': function design() {
      loadHTML("servicos", "menu");
   },
});

// set the default route
router.on(function () {
   document.getElementById('main').innerHTML = loadHTML("home", "home");
});

// set the 404 route
router.notFound(function (query) {
   document.getElementById('main').innerHTML = '<h1>TODO - NOTFOUND</h1>';
});

router.resolve();
function portfolioFiltrar(modulo){
   preencheBotao(modulo);
   switch (modulo) {
      case "3d":
         montaGaleria("3d", getModulo("3d"));
      break;

      case "video":
         montaGaleria("video", getModulo("video"));
      break;

      case "web":
        montaGaleria("web", getModulo("web"));
      break;

      case "design":
         montaGaleria("design", getModulo("design"));
      break;
   
      default:
         var linksModulosTODOS = [getModulo("3d"), getModulo("video"), getModulo("web"), getModulo("design")];
         montaGaleriaTodos(linksModulosTODOS);
      break;
   }
}

function montaGaleria(modulo, links){
   var template_final = '';
   
   links.forEach(function(item){
      template_final += 
      `
      <figure class="col-lg-3 col-md-3 col-xs-6 gallery-${modulo} animated fadeIn">
         <a href="${item.img}" data-size="1000x1000">
            <img class="gallery-${modulo}-img" src="${item.miniImg}" alt="${item.alt}" />
            <div class="gallery-overlay">
               <div class="gallery-overlay-text">${item.title}</div>
            </div>
         </a>
         <figcaption>${item.description}</figcaption>                                    
      </figure>
      `;
   });

   document.querySelector('.gallery').innerHTML = template_final;
}

function montaGaleriaTodos(links){
   var template_final = '';

   links.forEach(function(el, index){
      var modulo = '';
      if(index == 0) modulo = "3d";
      else if(index == 1) modulo = "video";
      else if(index == 2) modulo = "web";
      else modulo = "design";

      el.forEach(function(item){
         template_final += 
         `
         <figure class="col-lg-3 col-md-3 col-xs-6 gallery-${modulo} animated fadeIn">
            <a href="${item.img}" data-size="1000x1000">
               <img class="gallery-${modulo}-img" src="${item.miniImg}" alt="${item.alt}" />
               <div class="gallery-overlay">
                  <div class="gallery-overlay-text">${item.title}</div>
               </div>
            </a>
            <figcaption>${item.description}</figcaption>                                    
         </figure>
         `;
      });
   });

   document.querySelector('.gallery').innerHTML = template_final;
}

function getModulo(modulo){
   // 3D
   if(modulo == "3d")
      return [{
         img: "https://placekitten.com/1000/1003",
         miniImg: "https://placekitten.com/1000/1003",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];

   // VÍDEO
   if(modulo == "video")
      return [{
         img: "https://placekitten.com/1000/1005",
         miniImg: "https://placekitten.com/1000/1005",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];

   // WEB
   if(modulo == "web")
      return [{
         img: "https://placekitten.com/1000/1004",
         miniImg: "https://placekitten.com/1000/1004",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];

   // DESIGN
   if(modulo == "design")
      return [{
         img: "https://placekitten.com/1000/1001",
         miniImg: "https://placekitten.com/1000/1001",
         alt: "teste",
         title: "titulo",
         description: "description"
      },
      {
         img: "https://placekitten.com/1000/1002",
         miniImg: "https://placekitten.com/1000/1002",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];
}

function preencheBotao(modulo){
   // Remove a classe de todos os botões
   ["3d", "design", "web", "video", "11art"].forEach(function(item){
      document.getElementById(`${item}`).classList.remove(`btn-fill-${item}`);
      document.getElementById(`${item}`).classList.remove(`btn-outline-${item}`);
   });



   // Adiciona a classe no módulo clicado
   ["3d", "design", "web", "video", "11art"].forEach(function(item){
      if(item == modulo)
         document.getElementById(`${item}`).classList.add(`btn-fill-${item}`);
      else
         document.getElementById(`${item}`).classList.add(`btn-outline-${item}`);
   });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnby5taW4uanMiLCJwYXJ0aWNsZXMubWluLmpzIiwiZ2FsbGVyeS5qcyIsInNtb290aFNjcm9sbC5qcyIsInBhcnRpY2xlcy5qcyIsImluaXRpYWxpemF0aW9uLmpzIiwiZm9vdGVyLmpzIiwiY29udGF0by5qcyIsImhvbWUuanMiLCJwb3J0Zm9saW8uanMiLCJzZXJ2aWNvcy5qcyIsInNvYnJlbm9zLmpzIiwibmF2YmFyLmpzIiwidmFtb3MuY29udmVyc2FyLmpzIiwiY29tby5mdW5jaW9uYS5qcyIsIm1vZHVsby5qcyIsIm5vc3Nvcy50cmFiYWxob3MuanMiLCJ2aWV3Q29sb3IuanMiLCJyb3V0ZUNvbmZpZy5qcyIsInBvcnRmb2xpb0ZpbHRyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6ZS5OYXZpZ289dCgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZnVuY3Rpb24gdCgpe3JldHVybiEoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvd3x8IXdpbmRvdy5oaXN0b3J5fHwhd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKX1mdW5jdGlvbiBuKGUsbixvKXt0aGlzLnJvb3Q9bnVsbCx0aGlzLl9yb3V0ZXM9W10sdGhpcy5fdXNlSGFzaD1uLHRoaXMuX2hhc2g9dm9pZCAwPT09bz9cIiNcIjpvLHRoaXMuX3BhdXNlZD0hMSx0aGlzLl9kZXN0cm95ZWQ9ITEsdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ9bnVsbCx0aGlzLl9ub3RGb3VuZEhhbmRsZXI9bnVsbCx0aGlzLl9kZWZhdWx0SGFuZGxlcj1udWxsLHRoaXMuX3VzZVB1c2hTdGF0ZT0hbiYmdCgpLHRoaXMuX29uTG9jYXRpb25DaGFuZ2U9dGhpcy5fb25Mb2NhdGlvbkNoYW5nZS5iaW5kKHRoaXMpLHRoaXMuX2dlbmVyaWNIb29rcz1udWxsLHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9XCJwdXNoU3RhdGVcIixlP3RoaXMucm9vdD1uP2UucmVwbGFjZSgvXFwvJC8sXCIvXCIrdGhpcy5faGFzaCk6ZS5yZXBsYWNlKC9cXC8kLyxcIlwiKTpuJiYodGhpcy5yb290PXRoaXMuX2NMb2MoKS5zcGxpdCh0aGlzLl9oYXNoKVswXS5yZXBsYWNlKC9cXC8kLyxcIi9cIit0aGlzLl9oYXNoKSksdGhpcy5fbGlzdGVuKCksdGhpcy51cGRhdGVQYWdlTGlua3MoKX1mdW5jdGlvbiBvKGUpe3JldHVybiBlIGluc3RhbmNlb2YgUmVnRXhwP2U6ZS5yZXBsYWNlKC9cXC8rJC8sXCJcIikucmVwbGFjZSgvXlxcLysvLFwiXi9cIil9ZnVuY3Rpb24gaShlKXtyZXR1cm4gZS5yZXBsYWNlKC9cXC8kLyxcIlwiKS5zcGxpdChcIi9cIikubGVuZ3RofWZ1bmN0aW9uIHMoZSx0KXtyZXR1cm4gaSh0KS1pKGUpfWZ1bmN0aW9uIHIoZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpbXSkubWFwKGZ1bmN0aW9uKHQpe3ZhciBpPWZ1bmN0aW9uKGUpe3ZhciB0PVtdO3JldHVybntyZWdleHA6ZSBpbnN0YW5jZW9mIFJlZ0V4cD9lOm5ldyBSZWdFeHAoZS5yZXBsYWNlKG4uUEFSQU1FVEVSX1JFR0VYUCxmdW5jdGlvbihlLG8saSl7cmV0dXJuIHQucHVzaChpKSxuLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQfSkucmVwbGFjZShuLldJTERDQVJEX1JFR0VYUCxuLlJFUExBQ0VfV0lMRENBUkQpK24uRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQLG4uTUFUQ0hfUkVHRVhQX0ZMQUdTKSxwYXJhbU5hbWVzOnR9fShvKHQucm91dGUpKSxzPWkucmVnZXhwLHI9aS5wYXJhbU5hbWVzLGE9ZS5yZXBsYWNlKC9eXFwvKy8sXCIvXCIpLm1hdGNoKHMpLGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gMD09PXQubGVuZ3RoP251bGw6ZT9lLnNsaWNlKDEsZS5sZW5ndGgpLnJlZHVjZShmdW5jdGlvbihlLG4sbyl7cmV0dXJuIG51bGw9PT1lJiYoZT17fSksZVt0W29dXT1kZWNvZGVVUklDb21wb25lbnQobiksZX0sbnVsbCk6bnVsbH0oYSxyKTtyZXR1cm4hIWEmJnttYXRjaDphLHJvdXRlOnQscGFyYW1zOmh9fSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlfSl9KGUsdClbMF18fCExfWZ1bmN0aW9uIGEoZSx0KXt2YXIgbj10Lm1hcChmdW5jdGlvbih0KXtyZXR1cm5cIlwiPT09dC5yb3V0ZXx8XCIqXCI9PT10LnJvdXRlP2U6ZS5zcGxpdChuZXcgUmVnRXhwKHQucm91dGUrXCIoJHwvKVwiKSlbMF19KSxpPW8oZSk7cmV0dXJuIG4ubGVuZ3RoPjE/bi5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5sZW5ndGg+dC5sZW5ndGgmJihlPXQpLGV9LG5bMF0pOjE9PT1uLmxlbmd0aD9uWzBdOml9ZnVuY3Rpb24gaChlLG4sbyl7dmFyIGkscz1mdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdCgvXFw/KC4qKT8kLylbMF19O3JldHVybiB2b2lkIDA9PT1vJiYobz1cIiNcIiksdCgpJiYhbj9zKGUpLnNwbGl0KG8pWzBdOihpPWUuc3BsaXQobykpLmxlbmd0aD4xP3MoaVsxXSk6cyhpWzBdKX1mdW5jdGlvbiB1KHQsbixvKXtpZihuJiZcIm9iamVjdFwiPT09KHZvaWQgMD09PW4/XCJ1bmRlZmluZWRcIjplKG4pKSl7aWYobi5iZWZvcmUpcmV0dXJuIHZvaWQgbi5iZWZvcmUoZnVuY3Rpb24oKXsoIShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXSkmJih0KCksbi5hZnRlciYmbi5hZnRlcihvKSl9LG8pO2lmKG4uYWZ0ZXIpcmV0dXJuIHQoKSx2b2lkKG4uYWZ0ZXImJm4uYWZ0ZXIobykpfXQoKX1yZXR1cm4gbi5wcm90b3R5cGU9e2hlbHBlcnM6e21hdGNoOnIscm9vdDphLGNsZWFuOm8sZ2V0T25seVVSTDpofSxuYXZpZ2F0ZTpmdW5jdGlvbihlLHQpe3ZhciBuO3JldHVybiBlPWV8fFwiXCIsdGhpcy5fdXNlUHVzaFN0YXRlPyhuPShuPSh0P1wiXCI6dGhpcy5fZ2V0Um9vdCgpK1wiL1wiKStlLnJlcGxhY2UoL15cXC8rLyxcIi9cIikpLnJlcGxhY2UoLyhbXjpdKShcXC97Mix9KS9nLFwiJDEvXCIpLGhpc3RvcnlbdGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZF0oe30sXCJcIixuKSx0aGlzLnJlc29sdmUoKSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKGU9ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIrdGhpcy5faGFzaCksXCJcIiksd2luZG93LmxvY2F0aW9uLmhyZWY9d2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyQvLFwiXCIpLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLl9oYXNoK1wiLiokXCIpLFwiXCIpK3RoaXMuX2hhc2grZSksdGhpc30sb246ZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcyxuPWFyZ3VtZW50cy5sZW5ndGgsbz1BcnJheShuKSxpPTA7aTxuO2krKylvW2ldPWFyZ3VtZW50c1tpXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBvWzBdKXRoaXMuX2RlZmF1bHRIYW5kbGVyPXtoYW5kbGVyOm9bMF0saG9va3M6b1sxXX07ZWxzZSBpZihvLmxlbmd0aD49MilpZihcIi9cIj09PW9bMF0pe3ZhciByPW9bMV07XCJvYmplY3RcIj09PWUob1sxXSkmJihyPW9bMV0udXNlcyksdGhpcy5fZGVmYXVsdEhhbmRsZXI9e2hhbmRsZXI6cixob29rczpvWzJdfX1lbHNlIHRoaXMuX2FkZChvWzBdLG9bMV0sb1syXSk7ZWxzZVwib2JqZWN0XCI9PT1lKG9bMF0pJiZPYmplY3Qua2V5cyhvWzBdKS5zb3J0KHMpLmZvckVhY2goZnVuY3Rpb24oZSl7dC5vbihlLG9bMF1bZV0pfSk7cmV0dXJuIHRoaXN9LG9mZjpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9PXRoaXMuX2RlZmF1bHRIYW5kbGVyJiZlPT09dGhpcy5fZGVmYXVsdEhhbmRsZXIuaGFuZGxlcj90aGlzLl9kZWZhdWx0SGFuZGxlcj1udWxsOm51bGwhPT10aGlzLl9ub3RGb3VuZEhhbmRsZXImJmU9PT10aGlzLl9ub3RGb3VuZEhhbmRsZXIuaGFuZGxlciYmKHRoaXMuX25vdEZvdW5kSGFuZGxlcj1udWxsKSx0aGlzLl9yb3V0ZXM9dGhpcy5fcm91dGVzLnJlZHVjZShmdW5jdGlvbih0LG4pe3JldHVybiBuLmhhbmRsZXIhPT1lJiZ0LnB1c2gobiksdH0sW10pLHRoaXN9LG5vdEZvdW5kOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuX25vdEZvdW5kSGFuZGxlcj17aGFuZGxlcjplLGhvb2tzOnR9LHRoaXN9LHJlc29sdmU6ZnVuY3Rpb24oZSl7dmFyIG4sbyxpPXRoaXMscz0oZXx8dGhpcy5fY0xvYygpKS5yZXBsYWNlKHRoaXMuX2dldFJvb3QoKSxcIlwiKTt0aGlzLl91c2VIYXNoJiYocz1zLnJlcGxhY2UobmV3IFJlZ0V4cChcIl4vXCIrdGhpcy5faGFzaCksXCIvXCIpKTt2YXIgYT1mdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdCgvXFw/KC4qKT8kLykuc2xpY2UoMSkuam9pbihcIlwiKX0oZXx8dGhpcy5fY0xvYygpKSxsPWgocyx0aGlzLl91c2VIYXNoLHRoaXMuX2hhc2gpO3JldHVybiF0aGlzLl9wYXVzZWQmJih0aGlzLl9sYXN0Um91dGVSZXNvbHZlZCYmbD09PXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnVybCYmYT09PXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnF1ZXJ5Pyh0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcyYmdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MuYWxyZWFkeSYmdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MuYWxyZWFkeSh0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5wYXJhbXMpLCExKToobz1yKGwsdGhpcy5fcm91dGVzKSk/KHRoaXMuX2NhbGxMZWF2ZSgpLHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOm8ucm91dGUuaG9va3MscGFyYW1zOm8ucGFyYW1zLG5hbWU6by5yb3V0ZS5uYW1lfSxuPW8ucm91dGUuaGFuZGxlcix1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe28ucm91dGUucm91dGUgaW5zdGFuY2VvZiBSZWdFeHA/bi5hcHBseSh2b2lkIDAsby5tYXRjaC5zbGljZSgxLG8ubWF0Y2gubGVuZ3RoKSk6bihvLnBhcmFtcyxhKX0sby5yb3V0ZS5ob29rcyxvLnBhcmFtcyxpLl9nZW5lcmljSG9va3MpfSx0aGlzLl9nZW5lcmljSG9va3Msby5wYXJhbXMpLG8pOnRoaXMuX2RlZmF1bHRIYW5kbGVyJiYoXCJcIj09PWx8fFwiL1wiPT09bHx8bD09PXRoaXMuX2hhc2h8fGZ1bmN0aW9uKGUsbixvKXtpZih0KCkmJiFuKXJldHVybiExO2lmKCFlLm1hdGNoKG8pKXJldHVybiExO3ZhciBpPWUuc3BsaXQobyk7cmV0dXJuIGkubGVuZ3RoPDJ8fFwiXCI9PT1pWzFdfShsLHRoaXMuX3VzZUhhc2gsdGhpcy5faGFzaCkpPyh1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe2kuX2NhbGxMZWF2ZSgpLGkuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOmkuX2RlZmF1bHRIYW5kbGVyLmhvb2tzfSxpLl9kZWZhdWx0SGFuZGxlci5oYW5kbGVyKGEpfSxpLl9kZWZhdWx0SGFuZGxlci5ob29rcyl9LHRoaXMuX2dlbmVyaWNIb29rcyksITApOih0aGlzLl9ub3RGb3VuZEhhbmRsZXImJnUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7aS5fY2FsbExlYXZlKCksaS5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6aS5fbm90Rm91bmRIYW5kbGVyLmhvb2tzfSxpLl9ub3RGb3VuZEhhbmRsZXIuaGFuZGxlcihhKX0saS5fbm90Rm91bmRIYW5kbGVyLmhvb2tzKX0sdGhpcy5fZ2VuZXJpY0hvb2tzKSwhMSkpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5fcm91dGVzPVtdLHRoaXMuX2Rlc3Ryb3llZD0hMCx0aGlzLl9sYXN0Um91dGVSZXNvbHZlZD1udWxsLHRoaXMuX2dlbmVyaWNIb29rcz1udWxsLGNsZWFyVGltZW91dCh0aGlzLl9saXN0ZW5pbmdJbnRlcnZhbCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKSl9LHVwZGF0ZVBhZ2VMaW5rczpmdW5jdGlvbigpe3ZhciBlPXRoaXM7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50JiZ0aGlzLl9maW5kTGlua3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QuaGFzTGlzdGVuZXJBdHRhY2hlZHx8KHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24obil7aWYoKG4uY3RybEtleXx8bi5tZXRhS2V5KSYmXCJhXCI9PW4udGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4hMTt2YXIgbz1lLmdldExpbmtQYXRoKHQpO2UuX2Rlc3Ryb3llZHx8KG4ucHJldmVudERlZmF1bHQoKSxlLm5hdmlnYXRlKG8ucmVwbGFjZSgvXFwvKyQvLFwiXCIpLnJlcGxhY2UoL15cXC8rLyxcIi9cIikpKX0pLHQuaGFzTGlzdGVuZXJBdHRhY2hlZD0hMCl9KX0sZ2VuZXJhdGU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG49dGhpcy5fcm91dGVzLnJlZHVjZShmdW5jdGlvbihuLG8pe3ZhciBpO2lmKG8ubmFtZT09PWUpZm9yKGkgaW4gbj1vLnJvdXRlLHQpbj1uLnRvU3RyaW5nKCkucmVwbGFjZShcIjpcIitpLHRbaV0pO3JldHVybiBufSxcIlwiKTtyZXR1cm4gdGhpcy5fdXNlSGFzaD90aGlzLl9oYXNoK246bn0sbGluazpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fZ2V0Um9vdCgpK2V9LHBhdXNlOmZ1bmN0aW9uKCl7dmFyIGU9IShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXTt0aGlzLl9wYXVzZWQ9ZSx0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPWU/XCJyZXBsYWNlU3RhdGVcIjpcInB1c2hTdGF0ZVwifSxyZXN1bWU6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlKCExKX0saGlzdG9yeUFQSVVwZGF0ZU1ldGhvZDpmdW5jdGlvbihlKXtyZXR1cm4gdm9pZCAwPT09ZT90aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kOih0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPWUsZSl9LGRpc2FibGVJZkFQSU5vdEF2YWlsYWJsZTpmdW5jdGlvbigpe3QoKXx8dGhpcy5kZXN0cm95KCl9LGxhc3RSb3V0ZVJlc29sdmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkfSxnZXRMaW5rUGF0aDpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpfSxob29rczpmdW5jdGlvbihlKXt0aGlzLl9nZW5lcmljSG9va3M9ZX0sX2FkZDpmdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06bnVsbCxvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpudWxsO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1lbmNvZGVVUkkodCkpLHRoaXMuX3JvdXRlcy5wdXNoKFwib2JqZWN0XCI9PT0odm9pZCAwPT09bj9cInVuZGVmaW5lZFwiOmUobikpP3tyb3V0ZTp0LGhhbmRsZXI6bi51c2VzLG5hbWU6bi5hcyxob29rczpvfHxuLmhvb2tzfTp7cm91dGU6dCxoYW5kbGVyOm4saG9va3M6b30pLHRoaXMuX2FkZH0sX2dldFJvb3Q6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9PXRoaXMucm9vdD90aGlzLnJvb3Q6KHRoaXMucm9vdD1hKHRoaXMuX2NMb2MoKS5zcGxpdChcIj9cIilbMF0sdGhpcy5fcm91dGVzKSx0aGlzLnJvb3QpfSxfbGlzdGVuOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZih0aGlzLl91c2VQdXNoU3RhdGUpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJvbmhhc2hjaGFuZ2VcImluIHdpbmRvdyl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKTtlbHNle3ZhciB0PXRoaXMuX2NMb2MoKSxuPXZvaWQgMCxvPXZvaWQgMDsobz1mdW5jdGlvbigpe249ZS5fY0xvYygpLHQhPT1uJiYodD1uLGUucmVzb2x2ZSgpKSxlLl9saXN0ZW5pbmdJbnRlcnZhbD1zZXRUaW1lb3V0KG8sMjAwKX0pKCl9fSxfY0xvYzpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dm9pZCAwIT09d2luZG93Ll9fTkFWSUdPX1dJTkRPV19MT0NBVElPTl9NT0NLX18/d2luZG93Ll9fTkFWSUdPX1dJTkRPV19MT0NBVElPTl9NT0NLX186byh3aW5kb3cubG9jYXRpb24uaHJlZik6XCJcIn0sX2ZpbmRMaW5rczpmdW5jdGlvbigpe3JldHVybltdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW5hdmlnb11cIikpfSxfb25Mb2NhdGlvbkNoYW5nZTpmdW5jdGlvbigpe3RoaXMucmVzb2x2ZSgpfSxfY2FsbExlYXZlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ7ZSYmZS5ob29rcyYmZS5ob29rcy5sZWF2ZSYmZS5ob29rcy5sZWF2ZShlLnBhcmFtcyl9fSxuLlBBUkFNRVRFUl9SRUdFWFA9LyhbOipdKShcXHcrKS9nLG4uV0lMRENBUkRfUkVHRVhQPS9cXCovZyxuLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQPVwiKFteL10rKVwiLG4uUkVQTEFDRV9XSUxEQ0FSRD1cIig/Oi4qKVwiLG4uRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQPVwiKD86LyR8JClcIixuLk1BVENIX1JFR0VYUF9GTEFHUz1cIlwiLG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdmlnby5taW4uanMubWFwXG4iLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyogQXV0aG9yIDogVmluY2VudCBHYXJyZWF1ICAtIHZpbmNlbnRnYXJyZWF1LmNvbVxuLyogTUlUIGxpY2Vuc2U6IGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8qIERlbW8gLyBHZW5lcmF0b3IgOiB2aW5jZW50Z2FycmVhdS5jb20vcGFydGljbGVzLmpzXG4vKiBHaXRIdWIgOiBnaXRodWIuY29tL1ZpbmNlbnRHYXJyZWF1L3BhcnRpY2xlcy5qc1xuLyogSG93IHRvIHVzZT8gOiBDaGVjayB0aGUgR2l0SHViIFJFQURNRVxuLyogdjIuMC4wXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuZnVuY3Rpb24gaGV4VG9SZ2IoZSl7dmFyIGE9L14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtlPWUucmVwbGFjZShhLGZ1bmN0aW9uKGUsYSx0LGkpe3JldHVybiBhK2ErdCt0K2kraX0pO3ZhciB0PS9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhlKTtyZXR1cm4gdD97cjpwYXJzZUludCh0WzFdLDE2KSxnOnBhcnNlSW50KHRbMl0sMTYpLGI6cGFyc2VJbnQodFszXSwxNil9Om51bGx9ZnVuY3Rpb24gY2xhbXAoZSxhLHQpe3JldHVybiBNYXRoLm1pbihNYXRoLm1heChlLGEpLHQpfWZ1bmN0aW9uIGlzSW5BcnJheShlLGEpe3JldHVybiBhLmluZGV4T2YoZSk+LTF9dmFyIHBKUz1mdW5jdGlvbihlLGEpe3ZhciB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIrZStcIiA+IC5wYXJ0aWNsZXMtanMtY2FudmFzLWVsXCIpO3RoaXMucEpTPXtjYW52YXM6e2VsOnQsdzp0Lm9mZnNldFdpZHRoLGg6dC5vZmZzZXRIZWlnaHR9LHBhcnRpY2xlczp7bnVtYmVyOnt2YWx1ZTo0MDAsZGVuc2l0eTp7ZW5hYmxlOiEwLHZhbHVlX2FyZWE6ODAwfX0sY29sb3I6e3ZhbHVlOlwiI2ZmZlwifSxzaGFwZTp7dHlwZTpcImNpcmNsZVwiLHN0cm9rZTp7d2lkdGg6MCxjb2xvcjpcIiNmZjAwMDBcIn0scG9seWdvbjp7bmJfc2lkZXM6NX0saW1hZ2U6e3NyYzpcIlwiLHdpZHRoOjEwMCxoZWlnaHQ6MTAwfX0sb3BhY2l0eTp7dmFsdWU6MSxyYW5kb206ITEsYW5pbTp7ZW5hYmxlOiExLHNwZWVkOjIsb3BhY2l0eV9taW46MCxzeW5jOiExfX0sc2l6ZTp7dmFsdWU6MjAscmFuZG9tOiExLGFuaW06e2VuYWJsZTohMSxzcGVlZDoyMCxzaXplX21pbjowLHN5bmM6ITF9fSxsaW5lX2xpbmtlZDp7ZW5hYmxlOiEwLGRpc3RhbmNlOjEwMCxjb2xvcjpcIiNmZmZcIixvcGFjaXR5OjEsd2lkdGg6MX0sbW92ZTp7ZW5hYmxlOiEwLHNwZWVkOjIsZGlyZWN0aW9uOlwibm9uZVwiLHJhbmRvbTohMSxzdHJhaWdodDohMSxvdXRfbW9kZTpcIm91dFwiLGJvdW5jZTohMSxhdHRyYWN0OntlbmFibGU6ITEscm90YXRlWDozZTMscm90YXRlWTozZTN9fSxhcnJheTpbXX0saW50ZXJhY3Rpdml0eTp7ZGV0ZWN0X29uOlwiY2FudmFzXCIsZXZlbnRzOntvbmhvdmVyOntlbmFibGU6ITAsbW9kZTpcImdyYWJcIn0sb25jbGljazp7ZW5hYmxlOiEwLG1vZGU6XCJwdXNoXCJ9LHJlc2l6ZTohMH0sbW9kZXM6e2dyYWI6e2Rpc3RhbmNlOjEwMCxsaW5lX2xpbmtlZDp7b3BhY2l0eToxfX0sYnViYmxlOntkaXN0YW5jZToyMDAsc2l6ZTo4MCxkdXJhdGlvbjouNH0scmVwdWxzZTp7ZGlzdGFuY2U6MjAwLGR1cmF0aW9uOi40fSxwdXNoOntwYXJ0aWNsZXNfbmI6NH0scmVtb3ZlOntwYXJ0aWNsZXNfbmI6Mn19LG1vdXNlOnt9fSxyZXRpbmFfZGV0ZWN0OiExLGZuOntpbnRlcmFjdDp7fSxtb2Rlczp7fSx2ZW5kb3JzOnt9fSx0bXA6e319O3ZhciBpPXRoaXMucEpTO2EmJk9iamVjdC5kZWVwRXh0ZW5kKGksYSksaS50bXAub2JqPXtzaXplX3ZhbHVlOmkucGFydGljbGVzLnNpemUudmFsdWUsc2l6ZV9hbmltX3NwZWVkOmkucGFydGljbGVzLnNpemUuYW5pbS5zcGVlZCxtb3ZlX3NwZWVkOmkucGFydGljbGVzLm1vdmUuc3BlZWQsbGluZV9saW5rZWRfZGlzdGFuY2U6aS5wYXJ0aWNsZXMubGluZV9saW5rZWQuZGlzdGFuY2UsbGluZV9saW5rZWRfd2lkdGg6aS5wYXJ0aWNsZXMubGluZV9saW5rZWQud2lkdGgsbW9kZV9ncmFiX2Rpc3RhbmNlOmkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmRpc3RhbmNlLG1vZGVfYnViYmxlX2Rpc3RhbmNlOmkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZGlzdGFuY2UsbW9kZV9idWJibGVfc2l6ZTppLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLnNpemUsbW9kZV9yZXB1bHNlX2Rpc3RhbmNlOmkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZXB1bHNlLmRpc3RhbmNlfSxpLmZuLnJldGluYUluaXQ9ZnVuY3Rpb24oKXtpLnJldGluYV9kZXRlY3QmJndpbmRvdy5kZXZpY2VQaXhlbFJhdGlvPjE/KGkuY2FudmFzLnB4cmF0aW89d2luZG93LmRldmljZVBpeGVsUmF0aW8saS50bXAucmV0aW5hPSEwKTooaS5jYW52YXMucHhyYXRpbz0xLGkudG1wLnJldGluYT0hMSksaS5jYW52YXMudz1pLmNhbnZhcy5lbC5vZmZzZXRXaWR0aCppLmNhbnZhcy5weHJhdGlvLGkuY2FudmFzLmg9aS5jYW52YXMuZWwub2Zmc2V0SGVpZ2h0KmkuY2FudmFzLnB4cmF0aW8saS5wYXJ0aWNsZXMuc2l6ZS52YWx1ZT1pLnRtcC5vYmouc2l6ZV92YWx1ZSppLmNhbnZhcy5weHJhdGlvLGkucGFydGljbGVzLnNpemUuYW5pbS5zcGVlZD1pLnRtcC5vYmouc2l6ZV9hbmltX3NwZWVkKmkuY2FudmFzLnB4cmF0aW8saS5wYXJ0aWNsZXMubW92ZS5zcGVlZD1pLnRtcC5vYmoubW92ZV9zcGVlZCppLmNhbnZhcy5weHJhdGlvLGkucGFydGljbGVzLmxpbmVfbGlua2VkLmRpc3RhbmNlPWkudG1wLm9iai5saW5lX2xpbmtlZF9kaXN0YW5jZSppLmNhbnZhcy5weHJhdGlvLGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmRpc3RhbmNlPWkudG1wLm9iai5tb2RlX2dyYWJfZGlzdGFuY2UqaS5jYW52YXMucHhyYXRpbyxpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmRpc3RhbmNlPWkudG1wLm9iai5tb2RlX2J1YmJsZV9kaXN0YW5jZSppLmNhbnZhcy5weHJhdGlvLGkucGFydGljbGVzLmxpbmVfbGlua2VkLndpZHRoPWkudG1wLm9iai5saW5lX2xpbmtlZF93aWR0aCppLmNhbnZhcy5weHJhdGlvLGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuc2l6ZT1pLnRtcC5vYmoubW9kZV9idWJibGVfc2l6ZSppLmNhbnZhcy5weHJhdGlvLGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZXB1bHNlLmRpc3RhbmNlPWkudG1wLm9iai5tb2RlX3JlcHVsc2VfZGlzdGFuY2UqaS5jYW52YXMucHhyYXRpb30saS5mbi5jYW52YXNJbml0PWZ1bmN0aW9uKCl7aS5jYW52YXMuY3R4PWkuY2FudmFzLmVsLmdldENvbnRleHQoXCIyZFwiKX0saS5mbi5jYW52YXNTaXplPWZ1bmN0aW9uKCl7aS5jYW52YXMuZWwud2lkdGg9aS5jYW52YXMudyxpLmNhbnZhcy5lbC5oZWlnaHQ9aS5jYW52YXMuaCxpJiZpLmludGVyYWN0aXZpdHkuZXZlbnRzLnJlc2l6ZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbigpe2kuY2FudmFzLnc9aS5jYW52YXMuZWwub2Zmc2V0V2lkdGgsaS5jYW52YXMuaD1pLmNhbnZhcy5lbC5vZmZzZXRIZWlnaHQsaS50bXAucmV0aW5hJiYoaS5jYW52YXMudyo9aS5jYW52YXMucHhyYXRpbyxpLmNhbnZhcy5oKj1pLmNhbnZhcy5weHJhdGlvKSxpLmNhbnZhcy5lbC53aWR0aD1pLmNhbnZhcy53LGkuY2FudmFzLmVsLmhlaWdodD1pLmNhbnZhcy5oLGkucGFydGljbGVzLm1vdmUuZW5hYmxlfHwoaS5mbi5wYXJ0aWNsZXNFbXB0eSgpLGkuZm4ucGFydGljbGVzQ3JlYXRlKCksaS5mbi5wYXJ0aWNsZXNEcmF3KCksaS5mbi52ZW5kb3JzLmRlbnNpdHlBdXRvUGFydGljbGVzKCkpLGkuZm4udmVuZG9ycy5kZW5zaXR5QXV0b1BhcnRpY2xlcygpfSl9LGkuZm4uY2FudmFzUGFpbnQ9ZnVuY3Rpb24oKXtpLmNhbnZhcy5jdHguZmlsbFJlY3QoMCwwLGkuY2FudmFzLncsaS5jYW52YXMuaCl9LGkuZm4uY2FudmFzQ2xlYXI9ZnVuY3Rpb24oKXtpLmNhbnZhcy5jdHguY2xlYXJSZWN0KDAsMCxpLmNhbnZhcy53LGkuY2FudmFzLmgpfSxpLmZuLnBhcnRpY2xlPWZ1bmN0aW9uKGUsYSx0KXtpZih0aGlzLnJhZGl1cz0oaS5wYXJ0aWNsZXMuc2l6ZS5yYW5kb20/TWF0aC5yYW5kb20oKToxKSppLnBhcnRpY2xlcy5zaXplLnZhbHVlLGkucGFydGljbGVzLnNpemUuYW5pbS5lbmFibGUmJih0aGlzLnNpemVfc3RhdHVzPSExLHRoaXMudnM9aS5wYXJ0aWNsZXMuc2l6ZS5hbmltLnNwZWVkLzEwMCxpLnBhcnRpY2xlcy5zaXplLmFuaW0uc3luY3x8KHRoaXMudnM9dGhpcy52cypNYXRoLnJhbmRvbSgpKSksdGhpcy54PXQ/dC54Ok1hdGgucmFuZG9tKCkqaS5jYW52YXMudyx0aGlzLnk9dD90Lnk6TWF0aC5yYW5kb20oKSppLmNhbnZhcy5oLHRoaXMueD5pLmNhbnZhcy53LTIqdGhpcy5yYWRpdXM/dGhpcy54PXRoaXMueC10aGlzLnJhZGl1czp0aGlzLng8Mip0aGlzLnJhZGl1cyYmKHRoaXMueD10aGlzLngrdGhpcy5yYWRpdXMpLHRoaXMueT5pLmNhbnZhcy5oLTIqdGhpcy5yYWRpdXM/dGhpcy55PXRoaXMueS10aGlzLnJhZGl1czp0aGlzLnk8Mip0aGlzLnJhZGl1cyYmKHRoaXMueT10aGlzLnkrdGhpcy5yYWRpdXMpLGkucGFydGljbGVzLm1vdmUuYm91bmNlJiZpLmZuLnZlbmRvcnMuY2hlY2tPdmVybGFwKHRoaXMsdCksdGhpcy5jb2xvcj17fSxcIm9iamVjdFwiPT10eXBlb2YgZS52YWx1ZSlpZihlLnZhbHVlIGluc3RhbmNlb2YgQXJyYXkpe3ZhciBzPWUudmFsdWVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmkucGFydGljbGVzLmNvbG9yLnZhbHVlLmxlbmd0aCldO3RoaXMuY29sb3IucmdiPWhleFRvUmdiKHMpfWVsc2Ugdm9pZCAwIT1lLnZhbHVlLnImJnZvaWQgMCE9ZS52YWx1ZS5nJiZ2b2lkIDAhPWUudmFsdWUuYiYmKHRoaXMuY29sb3IucmdiPXtyOmUudmFsdWUucixnOmUudmFsdWUuZyxiOmUudmFsdWUuYn0pLHZvaWQgMCE9ZS52YWx1ZS5oJiZ2b2lkIDAhPWUudmFsdWUucyYmdm9pZCAwIT1lLnZhbHVlLmwmJih0aGlzLmNvbG9yLmhzbD17aDplLnZhbHVlLmgsczplLnZhbHVlLnMsbDplLnZhbHVlLmx9KTtlbHNlXCJyYW5kb21cIj09ZS52YWx1ZT90aGlzLmNvbG9yLnJnYj17cjpNYXRoLmZsb29yKDI1NipNYXRoLnJhbmRvbSgpKSswLGc6TWF0aC5mbG9vcigyNTYqTWF0aC5yYW5kb20oKSkrMCxiOk1hdGguZmxvb3IoMjU2Kk1hdGgucmFuZG9tKCkpKzB9Olwic3RyaW5nXCI9PXR5cGVvZiBlLnZhbHVlJiYodGhpcy5jb2xvcj1lLHRoaXMuY29sb3IucmdiPWhleFRvUmdiKHRoaXMuY29sb3IudmFsdWUpKTt0aGlzLm9wYWNpdHk9KGkucGFydGljbGVzLm9wYWNpdHkucmFuZG9tP01hdGgucmFuZG9tKCk6MSkqaS5wYXJ0aWNsZXMub3BhY2l0eS52YWx1ZSxpLnBhcnRpY2xlcy5vcGFjaXR5LmFuaW0uZW5hYmxlJiYodGhpcy5vcGFjaXR5X3N0YXR1cz0hMSx0aGlzLnZvPWkucGFydGljbGVzLm9wYWNpdHkuYW5pbS5zcGVlZC8xMDAsaS5wYXJ0aWNsZXMub3BhY2l0eS5hbmltLnN5bmN8fCh0aGlzLnZvPXRoaXMudm8qTWF0aC5yYW5kb20oKSkpO3ZhciBuPXt9O3N3aXRjaChpLnBhcnRpY2xlcy5tb3ZlLmRpcmVjdGlvbil7Y2FzZVwidG9wXCI6bj17eDowLHk6LTF9O2JyZWFrO2Nhc2VcInRvcC1yaWdodFwiOm49e3g6LjUseTotLjV9O2JyZWFrO2Nhc2VcInJpZ2h0XCI6bj17eDoxLHk6LTB9O2JyZWFrO2Nhc2VcImJvdHRvbS1yaWdodFwiOm49e3g6LjUseTouNX07YnJlYWs7Y2FzZVwiYm90dG9tXCI6bj17eDowLHk6MX07YnJlYWs7Y2FzZVwiYm90dG9tLWxlZnRcIjpuPXt4Oi0uNSx5OjF9O2JyZWFrO2Nhc2VcImxlZnRcIjpuPXt4Oi0xLHk6MH07YnJlYWs7Y2FzZVwidG9wLWxlZnRcIjpuPXt4Oi0uNSx5Oi0uNX07YnJlYWs7ZGVmYXVsdDpuPXt4OjAseTowfX1pLnBhcnRpY2xlcy5tb3ZlLnN0cmFpZ2h0Pyh0aGlzLnZ4PW4ueCx0aGlzLnZ5PW4ueSxpLnBhcnRpY2xlcy5tb3ZlLnJhbmRvbSYmKHRoaXMudng9dGhpcy52eCpNYXRoLnJhbmRvbSgpLHRoaXMudnk9dGhpcy52eSpNYXRoLnJhbmRvbSgpKSk6KHRoaXMudng9bi54K01hdGgucmFuZG9tKCktLjUsdGhpcy52eT1uLnkrTWF0aC5yYW5kb20oKS0uNSksdGhpcy52eF9pPXRoaXMudngsdGhpcy52eV9pPXRoaXMudnk7dmFyIHI9aS5wYXJ0aWNsZXMuc2hhcGUudHlwZTtpZihcIm9iamVjdFwiPT10eXBlb2Ygcil7aWYociBpbnN0YW5jZW9mIEFycmF5KXt2YXIgYz1yW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyLmxlbmd0aCldO3RoaXMuc2hhcGU9Y319ZWxzZSB0aGlzLnNoYXBlPXI7aWYoXCJpbWFnZVwiPT10aGlzLnNoYXBlKXt2YXIgbz1pLnBhcnRpY2xlcy5zaGFwZTt0aGlzLmltZz17c3JjOm8uaW1hZ2Uuc3JjLHJhdGlvOm8uaW1hZ2Uud2lkdGgvby5pbWFnZS5oZWlnaHR9LHRoaXMuaW1nLnJhdGlvfHwodGhpcy5pbWcucmF0aW89MSksXCJzdmdcIj09aS50bXAuaW1nX3R5cGUmJnZvaWQgMCE9aS50bXAuc291cmNlX3N2ZyYmKGkuZm4udmVuZG9ycy5jcmVhdGVTdmdJbWcodGhpcyksaS50bXAucHVzaGluZyYmKHRoaXMuaW1nLmxvYWRlZD0hMSkpfX0saS5mbi5wYXJ0aWNsZS5wcm90b3R5cGUuZHJhdz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXtpLmNhbnZhcy5jdHguZHJhd0ltYWdlKHIsYS54LXQsYS55LXQsMip0LDIqdC9hLmltZy5yYXRpbyl9dmFyIGE9dGhpcztpZih2b2lkIDAhPWEucmFkaXVzX2J1YmJsZSl2YXIgdD1hLnJhZGl1c19idWJibGU7ZWxzZSB2YXIgdD1hLnJhZGl1cztpZih2b2lkIDAhPWEub3BhY2l0eV9idWJibGUpdmFyIHM9YS5vcGFjaXR5X2J1YmJsZTtlbHNlIHZhciBzPWEub3BhY2l0eTtpZihhLmNvbG9yLnJnYil2YXIgbj1cInJnYmEoXCIrYS5jb2xvci5yZ2IucitcIixcIithLmNvbG9yLnJnYi5nK1wiLFwiK2EuY29sb3IucmdiLmIrXCIsXCIrcytcIilcIjtlbHNlIHZhciBuPVwiaHNsYShcIithLmNvbG9yLmhzbC5oK1wiLFwiK2EuY29sb3IuaHNsLnMrXCIlLFwiK2EuY29sb3IuaHNsLmwrXCIlLFwiK3MrXCIpXCI7c3dpdGNoKGkuY2FudmFzLmN0eC5maWxsU3R5bGU9bixpLmNhbnZhcy5jdHguYmVnaW5QYXRoKCksYS5zaGFwZSl7Y2FzZVwiY2lyY2xlXCI6aS5jYW52YXMuY3R4LmFyYyhhLngsYS55LHQsMCwyKk1hdGguUEksITEpO2JyZWFrO2Nhc2VcImVkZ2VcIjppLmNhbnZhcy5jdHgucmVjdChhLngtdCxhLnktdCwyKnQsMip0KTticmVhaztjYXNlXCJ0cmlhbmdsZVwiOmkuZm4udmVuZG9ycy5kcmF3U2hhcGUoaS5jYW52YXMuY3R4LGEueC10LGEueSt0LzEuNjYsMip0LDMsMik7YnJlYWs7Y2FzZVwicG9seWdvblwiOmkuZm4udmVuZG9ycy5kcmF3U2hhcGUoaS5jYW52YXMuY3R4LGEueC10LyhpLnBhcnRpY2xlcy5zaGFwZS5wb2x5Z29uLm5iX3NpZGVzLzMuNSksYS55LXQvLjc2LDIuNjYqdC8oaS5wYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5uYl9zaWRlcy8zKSxpLnBhcnRpY2xlcy5zaGFwZS5wb2x5Z29uLm5iX3NpZGVzLDEpO2JyZWFrO2Nhc2VcInN0YXJcIjppLmZuLnZlbmRvcnMuZHJhd1NoYXBlKGkuY2FudmFzLmN0eCxhLngtMip0LyhpLnBhcnRpY2xlcy5zaGFwZS5wb2x5Z29uLm5iX3NpZGVzLzQpLGEueS10LzEuNTIsMip0KjIuNjYvKGkucGFydGljbGVzLnNoYXBlLnBvbHlnb24ubmJfc2lkZXMvMyksaS5wYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5uYl9zaWRlcywyKTticmVhaztjYXNlXCJpbWFnZVwiOmlmKFwic3ZnXCI9PWkudG1wLmltZ190eXBlKXZhciByPWEuaW1nLm9iajtlbHNlIHZhciByPWkudG1wLmltZ19vYmo7ciYmZSgpfWkuY2FudmFzLmN0eC5jbG9zZVBhdGgoKSxpLnBhcnRpY2xlcy5zaGFwZS5zdHJva2Uud2lkdGg+MCYmKGkuY2FudmFzLmN0eC5zdHJva2VTdHlsZT1pLnBhcnRpY2xlcy5zaGFwZS5zdHJva2UuY29sb3IsaS5jYW52YXMuY3R4LmxpbmVXaWR0aD1pLnBhcnRpY2xlcy5zaGFwZS5zdHJva2Uud2lkdGgsaS5jYW52YXMuY3R4LnN0cm9rZSgpKSxpLmNhbnZhcy5jdHguZmlsbCgpfSxpLmZuLnBhcnRpY2xlc0NyZWF0ZT1mdW5jdGlvbigpe2Zvcih2YXIgZT0wO2U8aS5wYXJ0aWNsZXMubnVtYmVyLnZhbHVlO2UrKylpLnBhcnRpY2xlcy5hcnJheS5wdXNoKG5ldyBpLmZuLnBhcnRpY2xlKGkucGFydGljbGVzLmNvbG9yLGkucGFydGljbGVzLm9wYWNpdHkudmFsdWUpKX0saS5mbi5wYXJ0aWNsZXNVcGRhdGU9ZnVuY3Rpb24oKXtmb3IodmFyIGU9MDtlPGkucGFydGljbGVzLmFycmF5Lmxlbmd0aDtlKyspe3ZhciBhPWkucGFydGljbGVzLmFycmF5W2VdO2lmKGkucGFydGljbGVzLm1vdmUuZW5hYmxlKXt2YXIgdD1pLnBhcnRpY2xlcy5tb3ZlLnNwZWVkLzI7YS54Kz1hLnZ4KnQsYS55Kz1hLnZ5KnR9aWYoaS5wYXJ0aWNsZXMub3BhY2l0eS5hbmltLmVuYWJsZSYmKDE9PWEub3BhY2l0eV9zdGF0dXM/KGEub3BhY2l0eT49aS5wYXJ0aWNsZXMub3BhY2l0eS52YWx1ZSYmKGEub3BhY2l0eV9zdGF0dXM9ITEpLGEub3BhY2l0eSs9YS52byk6KGEub3BhY2l0eTw9aS5wYXJ0aWNsZXMub3BhY2l0eS5hbmltLm9wYWNpdHlfbWluJiYoYS5vcGFjaXR5X3N0YXR1cz0hMCksYS5vcGFjaXR5LT1hLnZvKSxhLm9wYWNpdHk8MCYmKGEub3BhY2l0eT0wKSksaS5wYXJ0aWNsZXMuc2l6ZS5hbmltLmVuYWJsZSYmKDE9PWEuc2l6ZV9zdGF0dXM/KGEucmFkaXVzPj1pLnBhcnRpY2xlcy5zaXplLnZhbHVlJiYoYS5zaXplX3N0YXR1cz0hMSksYS5yYWRpdXMrPWEudnMpOihhLnJhZGl1czw9aS5wYXJ0aWNsZXMuc2l6ZS5hbmltLnNpemVfbWluJiYoYS5zaXplX3N0YXR1cz0hMCksYS5yYWRpdXMtPWEudnMpLGEucmFkaXVzPDAmJihhLnJhZGl1cz0wKSksXCJib3VuY2VcIj09aS5wYXJ0aWNsZXMubW92ZS5vdXRfbW9kZSl2YXIgcz17eF9sZWZ0OmEucmFkaXVzLHhfcmlnaHQ6aS5jYW52YXMudyx5X3RvcDphLnJhZGl1cyx5X2JvdHRvbTppLmNhbnZhcy5ofTtlbHNlIHZhciBzPXt4X2xlZnQ6LWEucmFkaXVzLHhfcmlnaHQ6aS5jYW52YXMudythLnJhZGl1cyx5X3RvcDotYS5yYWRpdXMseV9ib3R0b206aS5jYW52YXMuaCthLnJhZGl1c307c3dpdGNoKGEueC1hLnJhZGl1cz5pLmNhbnZhcy53PyhhLng9cy54X2xlZnQsYS55PU1hdGgucmFuZG9tKCkqaS5jYW52YXMuaCk6YS54K2EucmFkaXVzPDAmJihhLng9cy54X3JpZ2h0LGEueT1NYXRoLnJhbmRvbSgpKmkuY2FudmFzLmgpLGEueS1hLnJhZGl1cz5pLmNhbnZhcy5oPyhhLnk9cy55X3RvcCxhLng9TWF0aC5yYW5kb20oKSppLmNhbnZhcy53KTphLnkrYS5yYWRpdXM8MCYmKGEueT1zLnlfYm90dG9tLGEueD1NYXRoLnJhbmRvbSgpKmkuY2FudmFzLncpLGkucGFydGljbGVzLm1vdmUub3V0X21vZGUpe2Nhc2VcImJvdW5jZVwiOmEueCthLnJhZGl1cz5pLmNhbnZhcy53P2Eudng9LWEudng6YS54LWEucmFkaXVzPDAmJihhLnZ4PS1hLnZ4KSxhLnkrYS5yYWRpdXM+aS5jYW52YXMuaD9hLnZ5PS1hLnZ5OmEueS1hLnJhZGl1czwwJiYoYS52eT0tYS52eSl9aWYoaXNJbkFycmF5KFwiZ3JhYlwiLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3Zlci5tb2RlKSYmaS5mbi5tb2Rlcy5ncmFiUGFydGljbGUoYSksKGlzSW5BcnJheShcImJ1YmJsZVwiLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3Zlci5tb2RlKXx8aXNJbkFycmF5KFwiYnViYmxlXCIsaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLm1vZGUpKSYmaS5mbi5tb2Rlcy5idWJibGVQYXJ0aWNsZShhKSwoaXNJbkFycmF5KFwicmVwdWxzZVwiLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3Zlci5tb2RlKXx8aXNJbkFycmF5KFwicmVwdWxzZVwiLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25jbGljay5tb2RlKSkmJmkuZm4ubW9kZXMucmVwdWxzZVBhcnRpY2xlKGEpLGkucGFydGljbGVzLmxpbmVfbGlua2VkLmVuYWJsZXx8aS5wYXJ0aWNsZXMubW92ZS5hdHRyYWN0LmVuYWJsZSlmb3IodmFyIG49ZSsxO248aS5wYXJ0aWNsZXMuYXJyYXkubGVuZ3RoO24rKyl7dmFyIHI9aS5wYXJ0aWNsZXMuYXJyYXlbbl07aS5wYXJ0aWNsZXMubGluZV9saW5rZWQuZW5hYmxlJiZpLmZuLmludGVyYWN0LmxpbmtQYXJ0aWNsZXMoYSxyKSxpLnBhcnRpY2xlcy5tb3ZlLmF0dHJhY3QuZW5hYmxlJiZpLmZuLmludGVyYWN0LmF0dHJhY3RQYXJ0aWNsZXMoYSxyKSxpLnBhcnRpY2xlcy5tb3ZlLmJvdW5jZSYmaS5mbi5pbnRlcmFjdC5ib3VuY2VQYXJ0aWNsZXMoYSxyKX19fSxpLmZuLnBhcnRpY2xlc0RyYXc9ZnVuY3Rpb24oKXtpLmNhbnZhcy5jdHguY2xlYXJSZWN0KDAsMCxpLmNhbnZhcy53LGkuY2FudmFzLmgpLGkuZm4ucGFydGljbGVzVXBkYXRlKCk7Zm9yKHZhciBlPTA7ZTxpLnBhcnRpY2xlcy5hcnJheS5sZW5ndGg7ZSsrKXt2YXIgYT1pLnBhcnRpY2xlcy5hcnJheVtlXTthLmRyYXcoKX19LGkuZm4ucGFydGljbGVzRW1wdHk9ZnVuY3Rpb24oKXtpLnBhcnRpY2xlcy5hcnJheT1bXX0saS5mbi5wYXJ0aWNsZXNSZWZyZXNoPWZ1bmN0aW9uKCl7Y2FuY2VsUmVxdWVzdEFuaW1GcmFtZShpLmZuLmNoZWNrQW5pbUZyYW1lKSxjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKGkuZm4uZHJhd0FuaW1GcmFtZSksaS50bXAuc291cmNlX3N2Zz12b2lkIDAsaS50bXAuaW1nX29iaj12b2lkIDAsaS50bXAuY291bnRfc3ZnPTAsaS5mbi5wYXJ0aWNsZXNFbXB0eSgpLGkuZm4uY2FudmFzQ2xlYXIoKSxpLmZuLnZlbmRvcnMuc3RhcnQoKX0saS5mbi5pbnRlcmFjdC5saW5rUGFydGljbGVzPWZ1bmN0aW9uKGUsYSl7dmFyIHQ9ZS54LWEueCxzPWUueS1hLnksbj1NYXRoLnNxcnQodCp0K3Mqcyk7aWYobjw9aS5wYXJ0aWNsZXMubGluZV9saW5rZWQuZGlzdGFuY2Upe3ZhciByPWkucGFydGljbGVzLmxpbmVfbGlua2VkLm9wYWNpdHktbi8oMS9pLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5vcGFjaXR5KS9pLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5kaXN0YW5jZTtpZihyPjApe3ZhciBjPWkucGFydGljbGVzLmxpbmVfbGlua2VkLmNvbG9yX3JnYl9saW5lO2kuY2FudmFzLmN0eC5zdHJva2VTdHlsZT1cInJnYmEoXCIrYy5yK1wiLFwiK2MuZytcIixcIitjLmIrXCIsXCIrcitcIilcIixpLmNhbnZhcy5jdHgubGluZVdpZHRoPWkucGFydGljbGVzLmxpbmVfbGlua2VkLndpZHRoLGkuY2FudmFzLmN0eC5iZWdpblBhdGgoKSxpLmNhbnZhcy5jdHgubW92ZVRvKGUueCxlLnkpLGkuY2FudmFzLmN0eC5saW5lVG8oYS54LGEueSksaS5jYW52YXMuY3R4LnN0cm9rZSgpLGkuY2FudmFzLmN0eC5jbG9zZVBhdGgoKX19fSxpLmZuLmludGVyYWN0LmF0dHJhY3RQYXJ0aWNsZXM9ZnVuY3Rpb24oZSxhKXt2YXIgdD1lLngtYS54LHM9ZS55LWEueSxuPU1hdGguc3FydCh0KnQrcypzKTtpZihuPD1pLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5kaXN0YW5jZSl7dmFyIHI9dC8oMWUzKmkucGFydGljbGVzLm1vdmUuYXR0cmFjdC5yb3RhdGVYKSxjPXMvKDFlMyppLnBhcnRpY2xlcy5tb3ZlLmF0dHJhY3Qucm90YXRlWSk7ZS52eC09cixlLnZ5LT1jLGEudngrPXIsYS52eSs9Y319LGkuZm4uaW50ZXJhY3QuYm91bmNlUGFydGljbGVzPWZ1bmN0aW9uKGUsYSl7dmFyIHQ9ZS54LWEueCxpPWUueS1hLnkscz1NYXRoLnNxcnQodCp0K2kqaSksbj1lLnJhZGl1cythLnJhZGl1cztuPj1zJiYoZS52eD0tZS52eCxlLnZ5PS1lLnZ5LGEudng9LWEudngsYS52eT0tYS52eSl9LGkuZm4ubW9kZXMucHVzaFBhcnRpY2xlcz1mdW5jdGlvbihlLGEpe2kudG1wLnB1c2hpbmc9ITA7Zm9yKHZhciB0PTA7ZT50O3QrKylpLnBhcnRpY2xlcy5hcnJheS5wdXNoKG5ldyBpLmZuLnBhcnRpY2xlKGkucGFydGljbGVzLmNvbG9yLGkucGFydGljbGVzLm9wYWNpdHkudmFsdWUse3g6YT9hLnBvc194Ok1hdGgucmFuZG9tKCkqaS5jYW52YXMudyx5OmE/YS5wb3NfeTpNYXRoLnJhbmRvbSgpKmkuY2FudmFzLmh9KSksdD09ZS0xJiYoaS5wYXJ0aWNsZXMubW92ZS5lbmFibGV8fGkuZm4ucGFydGljbGVzRHJhdygpLGkudG1wLnB1c2hpbmc9ITEpfSxpLmZuLm1vZGVzLnJlbW92ZVBhcnRpY2xlcz1mdW5jdGlvbihlKXtpLnBhcnRpY2xlcy5hcnJheS5zcGxpY2UoMCxlKSxpLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZXx8aS5mbi5wYXJ0aWNsZXNEcmF3KCl9LGkuZm4ubW9kZXMuYnViYmxlUGFydGljbGU9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gYSgpe2Uub3BhY2l0eV9idWJibGU9ZS5vcGFjaXR5LGUucmFkaXVzX2J1YmJsZT1lLnJhZGl1c31mdW5jdGlvbiB0KGEsdCxzLG4sYyl7aWYoYSE9dClpZihpLnRtcC5idWJibGVfZHVyYXRpb25fZW5kKXtpZih2b2lkIDAhPXMpe3ZhciBvPW4tcCoobi1hKS9pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmR1cmF0aW9uLGw9YS1vO2Q9YStsLFwic2l6ZVwiPT1jJiYoZS5yYWRpdXNfYnViYmxlPWQpLFwib3BhY2l0eVwiPT1jJiYoZS5vcGFjaXR5X2J1YmJsZT1kKX19ZWxzZSBpZihyPD1pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmRpc3RhbmNlKXtpZih2b2lkIDAhPXMpdmFyIHY9cztlbHNlIHZhciB2PW47aWYodiE9YSl7dmFyIGQ9bi1wKihuLWEpL2kuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZHVyYXRpb247XCJzaXplXCI9PWMmJihlLnJhZGl1c19idWJibGU9ZCksXCJvcGFjaXR5XCI9PWMmJihlLm9wYWNpdHlfYnViYmxlPWQpfX1lbHNlXCJzaXplXCI9PWMmJihlLnJhZGl1c19idWJibGU9dm9pZCAwKSxcIm9wYWNpdHlcIj09YyYmKGUub3BhY2l0eV9idWJibGU9dm9pZCAwKX1pZihpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIuZW5hYmxlJiZpc0luQXJyYXkoXCJidWJibGVcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIubW9kZSkpe3ZhciBzPWUueC1pLmludGVyYWN0aXZpdHkubW91c2UucG9zX3gsbj1lLnktaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc195LHI9TWF0aC5zcXJ0KHMqcytuKm4pLGM9MS1yL2kuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZGlzdGFuY2U7aWYocjw9aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5kaXN0YW5jZSl7aWYoYz49MCYmXCJtb3VzZW1vdmVcIj09aS5pbnRlcmFjdGl2aXR5LnN0YXR1cyl7aWYoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5zaXplIT1pLnBhcnRpY2xlcy5zaXplLnZhbHVlKWlmKGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuc2l6ZT5pLnBhcnRpY2xlcy5zaXplLnZhbHVlKXt2YXIgbz1lLnJhZGl1cytpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLnNpemUqYztvPj0wJiYoZS5yYWRpdXNfYnViYmxlPW8pfWVsc2V7dmFyIGw9ZS5yYWRpdXMtaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5zaXplLG89ZS5yYWRpdXMtbCpjO28+MD9lLnJhZGl1c19idWJibGU9bzplLnJhZGl1c19idWJibGU9MH1pZihpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLm9wYWNpdHkhPWkucGFydGljbGVzLm9wYWNpdHkudmFsdWUpaWYoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5vcGFjaXR5PmkucGFydGljbGVzLm9wYWNpdHkudmFsdWUpe3ZhciB2PWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUub3BhY2l0eSpjO3Y+ZS5vcGFjaXR5JiZ2PD1pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLm9wYWNpdHkmJihlLm9wYWNpdHlfYnViYmxlPXYpfWVsc2V7dmFyIHY9ZS5vcGFjaXR5LShpLnBhcnRpY2xlcy5vcGFjaXR5LnZhbHVlLWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUub3BhY2l0eSkqYzt2PGUub3BhY2l0eSYmdj49aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5vcGFjaXR5JiYoZS5vcGFjaXR5X2J1YmJsZT12KX19fWVsc2UgYSgpO1wibW91c2VsZWF2ZVwiPT1pLmludGVyYWN0aXZpdHkuc3RhdHVzJiZhKCl9ZWxzZSBpZihpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uY2xpY2suZW5hYmxlJiZpc0luQXJyYXkoXCJidWJibGVcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uY2xpY2subW9kZSkpe2lmKGkudG1wLmJ1YmJsZV9jbGlja2luZyl7dmFyIHM9ZS54LWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja19wb3NfeCxuPWUueS1pLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3kscj1NYXRoLnNxcnQocypzK24qbikscD0oKG5ldyBEYXRlKS5nZXRUaW1lKCktaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLmNsaWNrX3RpbWUpLzFlMztwPmkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZHVyYXRpb24mJihpLnRtcC5idWJibGVfZHVyYXRpb25fZW5kPSEwKSxwPjIqaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5kdXJhdGlvbiYmKGkudG1wLmJ1YmJsZV9jbGlja2luZz0hMSxpLnRtcC5idWJibGVfZHVyYXRpb25fZW5kPSExKX1pLnRtcC5idWJibGVfY2xpY2tpbmcmJih0KGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuc2l6ZSxpLnBhcnRpY2xlcy5zaXplLnZhbHVlLGUucmFkaXVzX2J1YmJsZSxlLnJhZGl1cyxcInNpemVcIiksdChpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLm9wYWNpdHksaS5wYXJ0aWNsZXMub3BhY2l0eS52YWx1ZSxlLm9wYWNpdHlfYnViYmxlLGUub3BhY2l0eSxcIm9wYWNpdHlcIikpfX0saS5mbi5tb2Rlcy5yZXB1bHNlUGFydGljbGU9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gYSgpe3ZhciBhPU1hdGguYXRhbjIoZCxwKTtpZihlLnZ4PXUqTWF0aC5jb3MoYSksZS52eT11Kk1hdGguc2luKGEpLFwiYm91bmNlXCI9PWkucGFydGljbGVzLm1vdmUub3V0X21vZGUpe3ZhciB0PXt4OmUueCtlLnZ4LHk6ZS55K2Uudnl9O3QueCtlLnJhZGl1cz5pLmNhbnZhcy53P2Uudng9LWUudng6dC54LWUucmFkaXVzPDAmJihlLnZ4PS1lLnZ4KSx0LnkrZS5yYWRpdXM+aS5jYW52YXMuaD9lLnZ5PS1lLnZ5OnQueS1lLnJhZGl1czwwJiYoZS52eT0tZS52eSl9fWlmKGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3Zlci5lbmFibGUmJmlzSW5BcnJheShcInJlcHVsc2VcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIubW9kZSkmJlwibW91c2Vtb3ZlXCI9PWkuaW50ZXJhY3Rpdml0eS5zdGF0dXMpe3ZhciB0PWUueC1pLmludGVyYWN0aXZpdHkubW91c2UucG9zX3gscz1lLnktaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc195LG49TWF0aC5zcXJ0KHQqdCtzKnMpLHI9e3g6dC9uLHk6cy9ufSxjPWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZXB1bHNlLmRpc3RhbmNlLG89MTAwLGw9Y2xhbXAoMS9jKigtMSpNYXRoLnBvdyhuL2MsMikrMSkqYypvLDAsNTApLHY9e3g6ZS54K3IueCpsLHk6ZS55K3IueSpsfTtcImJvdW5jZVwiPT1pLnBhcnRpY2xlcy5tb3ZlLm91dF9tb2RlPyh2LngtZS5yYWRpdXM+MCYmdi54K2UucmFkaXVzPGkuY2FudmFzLncmJihlLng9di54KSx2LnktZS5yYWRpdXM+MCYmdi55K2UucmFkaXVzPGkuY2FudmFzLmgmJihlLnk9di55KSk6KGUueD12LngsZS55PXYueSl9ZWxzZSBpZihpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uY2xpY2suZW5hYmxlJiZpc0luQXJyYXkoXCJyZXB1bHNlXCIsaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLm1vZGUpKWlmKGkudG1wLnJlcHVsc2VfZmluaXNofHwoaS50bXAucmVwdWxzZV9jb3VudCsrLGkudG1wLnJlcHVsc2VfY291bnQ9PWkucGFydGljbGVzLmFycmF5Lmxlbmd0aCYmKGkudG1wLnJlcHVsc2VfZmluaXNoPSEwKSksaS50bXAucmVwdWxzZV9jbGlja2luZyl7dmFyIGM9TWF0aC5wb3coaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlcHVsc2UuZGlzdGFuY2UvNiwzKSxwPWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja19wb3NfeC1lLngsZD1pLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3ktZS55LG09cCpwK2QqZCx1PS1jL20qMTtjPj1tJiZhKCl9ZWxzZSAwPT1pLnRtcC5yZXB1bHNlX2NsaWNraW5nJiYoZS52eD1lLnZ4X2ksZS52eT1lLnZ5X2kpfSxpLmZuLm1vZGVzLmdyYWJQYXJ0aWNsZT1mdW5jdGlvbihlKXtpZihpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIuZW5hYmxlJiZcIm1vdXNlbW92ZVwiPT1pLmludGVyYWN0aXZpdHkuc3RhdHVzKXt2YXIgYT1lLngtaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194LHQ9ZS55LWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeSxzPU1hdGguc3FydChhKmErdCp0KTtpZihzPD1pLmludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5kaXN0YW5jZSl7dmFyIG49aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmdyYWIubGluZV9saW5rZWQub3BhY2l0eS1zLygxL2kuaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmxpbmVfbGlua2VkLm9wYWNpdHkpL2kuaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmRpc3RhbmNlO2lmKG4+MCl7dmFyIHI9aS5wYXJ0aWNsZXMubGluZV9saW5rZWQuY29sb3JfcmdiX2xpbmU7aS5jYW52YXMuY3R4LnN0cm9rZVN0eWxlPVwicmdiYShcIityLnIrXCIsXCIrci5nK1wiLFwiK3IuYitcIixcIituK1wiKVwiLGkuY2FudmFzLmN0eC5saW5lV2lkdGg9aS5wYXJ0aWNsZXMubGluZV9saW5rZWQud2lkdGgsaS5jYW52YXMuY3R4LmJlZ2luUGF0aCgpLGkuY2FudmFzLmN0eC5tb3ZlVG8oZS54LGUueSksaS5jYW52YXMuY3R4LmxpbmVUbyhpLmludGVyYWN0aXZpdHkubW91c2UucG9zX3gsaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc195KSxpLmNhbnZhcy5jdHguc3Ryb2tlKCksaS5jYW52YXMuY3R4LmNsb3NlUGF0aCgpfX19fSxpLmZuLnZlbmRvcnMuZXZlbnRzTGlzdGVuZXJzPWZ1bmN0aW9uKCl7XCJ3aW5kb3dcIj09aS5pbnRlcmFjdGl2aXR5LmRldGVjdF9vbj9pLmludGVyYWN0aXZpdHkuZWw9d2luZG93OmkuaW50ZXJhY3Rpdml0eS5lbD1pLmNhbnZhcy5lbCwoaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmhvdmVyLmVuYWJsZXx8aS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLmVuYWJsZSkmJihpLmludGVyYWN0aXZpdHkuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLGZ1bmN0aW9uKGUpe2lmKGkuaW50ZXJhY3Rpdml0eS5lbD09d2luZG93KXZhciBhPWUuY2xpZW50WCx0PWUuY2xpZW50WTtlbHNlIHZhciBhPWUub2Zmc2V0WHx8ZS5jbGllbnRYLHQ9ZS5vZmZzZXRZfHxlLmNsaWVudFk7aS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194PWEsaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc195PXQsaS50bXAucmV0aW5hJiYoaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194Kj1pLmNhbnZhcy5weHJhdGlvLGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeSo9aS5jYW52YXMucHhyYXRpbyksaS5pbnRlcmFjdGl2aXR5LnN0YXR1cz1cIm1vdXNlbW92ZVwifSksaS5pbnRlcmFjdGl2aXR5LmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oZSl7aS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194PW51bGwsaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc195PW51bGwsaS5pbnRlcmFjdGl2aXR5LnN0YXR1cz1cIm1vdXNlbGVhdmVcIn0pKSxpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uY2xpY2suZW5hYmxlJiZpLmludGVyYWN0aXZpdHkuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtpZihpLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3g9aS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194LGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja19wb3NfeT1pLmludGVyYWN0aXZpdHkubW91c2UucG9zX3ksaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLmNsaWNrX3RpbWU9KG5ldyBEYXRlKS5nZXRUaW1lKCksaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLmVuYWJsZSlzd2l0Y2goaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLm1vZGUpe2Nhc2VcInB1c2hcIjppLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZT9pLmZuLm1vZGVzLnB1c2hQYXJ0aWNsZXMoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucGFydGljbGVzX25iLGkuaW50ZXJhY3Rpdml0eS5tb3VzZSk6MT09aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucGFydGljbGVzX25iP2kuZm4ubW9kZXMucHVzaFBhcnRpY2xlcyhpLmludGVyYWN0aXZpdHkubW9kZXMucHVzaC5wYXJ0aWNsZXNfbmIsaS5pbnRlcmFjdGl2aXR5Lm1vdXNlKTppLmludGVyYWN0aXZpdHkubW9kZXMucHVzaC5wYXJ0aWNsZXNfbmI+MSYmaS5mbi5tb2Rlcy5wdXNoUGFydGljbGVzKGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5wdXNoLnBhcnRpY2xlc19uYik7YnJlYWs7Y2FzZVwicmVtb3ZlXCI6aS5mbi5tb2Rlcy5yZW1vdmVQYXJ0aWNsZXMoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlbW92ZS5wYXJ0aWNsZXNfbmIpO2JyZWFrO2Nhc2VcImJ1YmJsZVwiOmkudG1wLmJ1YmJsZV9jbGlja2luZz0hMDticmVhaztjYXNlXCJyZXB1bHNlXCI6aS50bXAucmVwdWxzZV9jbGlja2luZz0hMCxpLnRtcC5yZXB1bHNlX2NvdW50PTAsaS50bXAucmVwdWxzZV9maW5pc2g9ITEsc2V0VGltZW91dChmdW5jdGlvbigpe2kudG1wLnJlcHVsc2VfY2xpY2tpbmc9ITF9LDFlMyppLmludGVyYWN0aXZpdHkubW9kZXMucmVwdWxzZS5kdXJhdGlvbil9fSl9LGkuZm4udmVuZG9ycy5kZW5zaXR5QXV0b1BhcnRpY2xlcz1mdW5jdGlvbigpe2lmKGkucGFydGljbGVzLm51bWJlci5kZW5zaXR5LmVuYWJsZSl7dmFyIGU9aS5jYW52YXMuZWwud2lkdGgqaS5jYW52YXMuZWwuaGVpZ2h0LzFlMztpLnRtcC5yZXRpbmEmJihlLz0yKmkuY2FudmFzLnB4cmF0aW8pO3ZhciBhPWUqaS5wYXJ0aWNsZXMubnVtYmVyLnZhbHVlL2kucGFydGljbGVzLm51bWJlci5kZW5zaXR5LnZhbHVlX2FyZWEsdD1pLnBhcnRpY2xlcy5hcnJheS5sZW5ndGgtYTswPnQ/aS5mbi5tb2Rlcy5wdXNoUGFydGljbGVzKE1hdGguYWJzKHQpKTppLmZuLm1vZGVzLnJlbW92ZVBhcnRpY2xlcyh0KX19LGkuZm4udmVuZG9ycy5jaGVja092ZXJsYXA9ZnVuY3Rpb24oZSxhKXtmb3IodmFyIHQ9MDt0PGkucGFydGljbGVzLmFycmF5Lmxlbmd0aDt0Kyspe3ZhciBzPWkucGFydGljbGVzLmFycmF5W3RdLG49ZS54LXMueCxyPWUueS1zLnksYz1NYXRoLnNxcnQobipuK3Iqcik7Yzw9ZS5yYWRpdXMrcy5yYWRpdXMmJihlLng9YT9hLng6TWF0aC5yYW5kb20oKSppLmNhbnZhcy53LGUueT1hP2EueTpNYXRoLnJhbmRvbSgpKmkuY2FudmFzLmgsaS5mbi52ZW5kb3JzLmNoZWNrT3ZlcmxhcChlKSl9fSxpLmZuLnZlbmRvcnMuY3JlYXRlU3ZnSW1nPWZ1bmN0aW9uKGUpe3ZhciBhPWkudG1wLnNvdXJjZV9zdmcsdD0vIyhbMC05QS1GXXszLDZ9KS9naSxzPWEucmVwbGFjZSh0LGZ1bmN0aW9uKGEsdCxpLHMpe2lmKGUuY29sb3IucmdiKXZhciBuPVwicmdiYShcIitlLmNvbG9yLnJnYi5yK1wiLFwiK2UuY29sb3IucmdiLmcrXCIsXCIrZS5jb2xvci5yZ2IuYitcIixcIitlLm9wYWNpdHkrXCIpXCI7ZWxzZSB2YXIgbj1cImhzbGEoXCIrZS5jb2xvci5oc2wuaCtcIixcIitlLmNvbG9yLmhzbC5zK1wiJSxcIitlLmNvbG9yLmhzbC5sK1wiJSxcIitlLm9wYWNpdHkrXCIpXCI7cmV0dXJuIG59KSxuPW5ldyBCbG9iKFtzXSx7dHlwZTpcImltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOFwifSkscj13aW5kb3cuVVJMfHx3aW5kb3cud2Via2l0VVJMfHx3aW5kb3csYz1yLmNyZWF0ZU9iamVjdFVSTChuKSxvPW5ldyBJbWFnZTtvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtlLmltZy5vYmo9byxlLmltZy5sb2FkZWQ9ITAsci5yZXZva2VPYmplY3RVUkwoYyksaS50bXAuY291bnRfc3ZnKyt9KSxvLnNyYz1jfSxpLmZuLnZlbmRvcnMuZGVzdHJveXBKUz1mdW5jdGlvbigpe2NhbmNlbEFuaW1hdGlvbkZyYW1lKGkuZm4uZHJhd0FuaW1GcmFtZSksdC5yZW1vdmUoKSxwSlNEb209bnVsbH0saS5mbi52ZW5kb3JzLmRyYXdTaGFwZT1mdW5jdGlvbihlLGEsdCxpLHMsbil7dmFyIHI9cypuLGM9cy9uLG89MTgwKihjLTIpL2MsbD1NYXRoLlBJLU1hdGguUEkqby8xODA7ZS5zYXZlKCksZS5iZWdpblBhdGgoKSxlLnRyYW5zbGF0ZShhLHQpLGUubW92ZVRvKDAsMCk7Zm9yKHZhciB2PTA7cj52O3YrKyllLmxpbmVUbyhpLDApLGUudHJhbnNsYXRlKGksMCksZS5yb3RhdGUobCk7ZS5maWxsKCksZS5yZXN0b3JlKCl9LGkuZm4udmVuZG9ycy5leHBvcnRJbWc9ZnVuY3Rpb24oKXt3aW5kb3cub3BlbihpLmNhbnZhcy5lbC50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIiksXCJfYmxhbmtcIil9LGkuZm4udmVuZG9ycy5sb2FkSW1nPWZ1bmN0aW9uKGUpe2lmKGkudG1wLmltZ19lcnJvcj12b2lkIDAsXCJcIiE9aS5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2Uuc3JjKWlmKFwic3ZnXCI9PWUpe3ZhciBhPW5ldyBYTUxIdHRwUmVxdWVzdDthLm9wZW4oXCJHRVRcIixpLnBhcnRpY2xlcy5zaGFwZS5pbWFnZS5zcmMpLGEub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKGUpezQ9PWEucmVhZHlTdGF0ZSYmKDIwMD09YS5zdGF0dXM/KGkudG1wLnNvdXJjZV9zdmc9ZS5jdXJyZW50VGFyZ2V0LnJlc3BvbnNlLGkuZm4udmVuZG9ycy5jaGVja0JlZm9yZURyYXcoKSk6KGNvbnNvbGUubG9nKFwiRXJyb3IgcEpTIC0gSW1hZ2Ugbm90IGZvdW5kXCIpLGkudG1wLmltZ19lcnJvcj0hMCkpfSxhLnNlbmQoKX1lbHNle3ZhciB0PW5ldyBJbWFnZTt0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtpLnRtcC5pbWdfb2JqPXQsaS5mbi52ZW5kb3JzLmNoZWNrQmVmb3JlRHJhdygpfSksdC5zcmM9aS5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2Uuc3JjfWVsc2UgY29uc29sZS5sb2coXCJFcnJvciBwSlMgLSBObyBpbWFnZS5zcmNcIiksaS50bXAuaW1nX2Vycm9yPSEwfSxpLmZuLnZlbmRvcnMuZHJhdz1mdW5jdGlvbigpe1wiaW1hZ2VcIj09aS5wYXJ0aWNsZXMuc2hhcGUudHlwZT9cInN2Z1wiPT1pLnRtcC5pbWdfdHlwZT9pLnRtcC5jb3VudF9zdmc+PWkucGFydGljbGVzLm51bWJlci52YWx1ZT8oaS5mbi5wYXJ0aWNsZXNEcmF3KCksaS5wYXJ0aWNsZXMubW92ZS5lbmFibGU/aS5mbi5kcmF3QW5pbUZyYW1lPXJlcXVlc3RBbmltRnJhbWUoaS5mbi52ZW5kb3JzLmRyYXcpOmNhbmNlbFJlcXVlc3RBbmltRnJhbWUoaS5mbi5kcmF3QW5pbUZyYW1lKSk6aS50bXAuaW1nX2Vycm9yfHwoaS5mbi5kcmF3QW5pbUZyYW1lPXJlcXVlc3RBbmltRnJhbWUoaS5mbi52ZW5kb3JzLmRyYXcpKTp2b2lkIDAhPWkudG1wLmltZ19vYmo/KGkuZm4ucGFydGljbGVzRHJhdygpLGkucGFydGljbGVzLm1vdmUuZW5hYmxlP2kuZm4uZHJhd0FuaW1GcmFtZT1yZXF1ZXN0QW5pbUZyYW1lKGkuZm4udmVuZG9ycy5kcmF3KTpjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKGkuZm4uZHJhd0FuaW1GcmFtZSkpOmkudG1wLmltZ19lcnJvcnx8KGkuZm4uZHJhd0FuaW1GcmFtZT1yZXF1ZXN0QW5pbUZyYW1lKGkuZm4udmVuZG9ycy5kcmF3KSk6KGkuZm4ucGFydGljbGVzRHJhdygpLGkucGFydGljbGVzLm1vdmUuZW5hYmxlP2kuZm4uZHJhd0FuaW1GcmFtZT1yZXF1ZXN0QW5pbUZyYW1lKGkuZm4udmVuZG9ycy5kcmF3KTpjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKGkuZm4uZHJhd0FuaW1GcmFtZSkpfSxpLmZuLnZlbmRvcnMuY2hlY2tCZWZvcmVEcmF3PWZ1bmN0aW9uKCl7XCJpbWFnZVwiPT1pLnBhcnRpY2xlcy5zaGFwZS50eXBlP1wic3ZnXCI9PWkudG1wLmltZ190eXBlJiZ2b2lkIDA9PWkudG1wLnNvdXJjZV9zdmc/aS50bXAuY2hlY2tBbmltRnJhbWU9cmVxdWVzdEFuaW1GcmFtZShjaGVjayk6KGNhbmNlbFJlcXVlc3RBbmltRnJhbWUoaS50bXAuY2hlY2tBbmltRnJhbWUpLGkudG1wLmltZ19lcnJvcnx8KGkuZm4udmVuZG9ycy5pbml0KCksaS5mbi52ZW5kb3JzLmRyYXcoKSkpOihpLmZuLnZlbmRvcnMuaW5pdCgpLGkuZm4udmVuZG9ycy5kcmF3KCkpfSxpLmZuLnZlbmRvcnMuaW5pdD1mdW5jdGlvbigpe2kuZm4ucmV0aW5hSW5pdCgpLGkuZm4uY2FudmFzSW5pdCgpLGkuZm4uY2FudmFzU2l6ZSgpLGkuZm4uY2FudmFzUGFpbnQoKSxpLmZuLnBhcnRpY2xlc0NyZWF0ZSgpLGkuZm4udmVuZG9ycy5kZW5zaXR5QXV0b1BhcnRpY2xlcygpLGkucGFydGljbGVzLmxpbmVfbGlua2VkLmNvbG9yX3JnYl9saW5lPWhleFRvUmdiKGkucGFydGljbGVzLmxpbmVfbGlua2VkLmNvbG9yKX0saS5mbi52ZW5kb3JzLnN0YXJ0PWZ1bmN0aW9uKCl7aXNJbkFycmF5KFwiaW1hZ2VcIixpLnBhcnRpY2xlcy5zaGFwZS50eXBlKT8oaS50bXAuaW1nX3R5cGU9aS5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2Uuc3JjLnN1YnN0cihpLnBhcnRpY2xlcy5zaGFwZS5pbWFnZS5zcmMubGVuZ3RoLTMpLGkuZm4udmVuZG9ycy5sb2FkSW1nKGkudG1wLmltZ190eXBlKSk6aS5mbi52ZW5kb3JzLmNoZWNrQmVmb3JlRHJhdygpfSxpLmZuLnZlbmRvcnMuZXZlbnRzTGlzdGVuZXJzKCksaS5mbi52ZW5kb3JzLnN0YXJ0KCl9O09iamVjdC5kZWVwRXh0ZW5kPWZ1bmN0aW9uKGUsYSl7Zm9yKHZhciB0IGluIGEpYVt0XSYmYVt0XS5jb25zdHJ1Y3RvciYmYVt0XS5jb25zdHJ1Y3Rvcj09PU9iamVjdD8oZVt0XT1lW3RdfHx7fSxhcmd1bWVudHMuY2FsbGVlKGVbdF0sYVt0XSkpOmVbdF09YVt0XTtyZXR1cm4gZX0sd2luZG93LnJlcXVlc3RBbmltRnJhbWU9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oZSl7d2luZG93LnNldFRpbWVvdXQoZSwxZTMvNjApfX0oKSx3aW5kb3cuY2FuY2VsUmVxdWVzdEFuaW1GcmFtZT1mdW5jdGlvbigpe3JldHVybiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dH0oKSx3aW5kb3cucEpTRG9tPVtdLHdpbmRvdy5wYXJ0aWNsZXNKUz1mdW5jdGlvbihlLGEpe1wic3RyaW5nXCIhPXR5cGVvZiBlJiYoYT1lLGU9XCJwYXJ0aWNsZXMtanNcIiksZXx8KGU9XCJwYXJ0aWNsZXMtanNcIik7dmFyIHQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZSksaT1cInBhcnRpY2xlcy1qcy1jYW52YXMtZWxcIixzPXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShpKTtpZihzLmxlbmd0aClmb3IoO3MubGVuZ3RoPjA7KXQucmVtb3ZlQ2hpbGQoc1swXSk7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtuLmNsYXNzTmFtZT1pLG4uc3R5bGUud2lkdGg9XCIxMDAlXCIsbi5zdHlsZS5oZWlnaHQ9XCIxMDAlXCI7dmFyIHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZSkuYXBwZW5kQ2hpbGQobik7bnVsbCE9ciYmcEpTRG9tLnB1c2gobmV3IHBKUyhlLGEpKX0sd2luZG93LnBhcnRpY2xlc0pTLmxvYWQ9ZnVuY3Rpb24oZSxhLHQpe3ZhciBpPW5ldyBYTUxIdHRwUmVxdWVzdDtpLm9wZW4oXCJHRVRcIixhKSxpLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbihhKXtpZig0PT1pLnJlYWR5U3RhdGUpaWYoMjAwPT1pLnN0YXR1cyl7dmFyIHM9SlNPTi5wYXJzZShhLmN1cnJlbnRUYXJnZXQucmVzcG9uc2UpO3dpbmRvdy5wYXJ0aWNsZXNKUyhlLHMpLHQmJnQoKX1lbHNlIGNvbnNvbGUubG9nKFwiRXJyb3IgcEpTIC0gWE1MSHR0cFJlcXVlc3Qgc3RhdHVzOiBcIitpLnN0YXR1cyksY29uc29sZS5sb2coXCJFcnJvciBwSlMgLSBGaWxlIGNvbmZpZyBub3QgZm91bmRcIil9LGkuc2VuZCgpfTsiLCJ2YXIgaW5pdFBob3RvU3dpcGVGcm9tRE9NID0gZnVuY3Rpb24gKGdhbGxlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgLy8gcGFyc2Ugc2xpZGUgZGF0YSAodXJsLCB0aXRsZSwgc2l6ZSAuLi4pIGZyb20gRE9NIGVsZW1lbnRzIFxyXG4gICAvLyAoY2hpbGRyZW4gb2YgZ2FsbGVyeVNlbGVjdG9yKVxyXG4gICB2YXIgcGFyc2VUaHVtYm5haWxFbGVtZW50cyA9IGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICB2YXIgdGh1bWJFbGVtZW50cyA9IGVsLmNoaWxkTm9kZXMsXHJcbiAgICAgICAgIG51bU5vZGVzID0gdGh1bWJFbGVtZW50cy5sZW5ndGgsXHJcbiAgICAgICAgIGl0ZW1zID0gW10sXHJcbiAgICAgICAgIGZpZ3VyZUVsLFxyXG4gICAgICAgICBsaW5rRWwsXHJcbiAgICAgICAgIHNpemUsXHJcbiAgICAgICAgIGl0ZW07XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bU5vZGVzOyBpKyspIHtcclxuXHJcbiAgICAgICAgIGZpZ3VyZUVsID0gdGh1bWJFbGVtZW50c1tpXTsgLy8gPGZpZ3VyZT4gZWxlbWVudFxyXG5cclxuICAgICAgICAgLy8gaW5jbHVkZSBvbmx5IGVsZW1lbnQgbm9kZXMgXHJcbiAgICAgICAgIGlmIChmaWd1cmVFbC5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgbGlua0VsID0gZmlndXJlRWwuY2hpbGRyZW5bMF07IC8vIDxhPiBlbGVtZW50XHJcblxyXG4gICAgICAgICBzaXplID0gbGlua0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJykuc3BsaXQoJ3gnKTtcclxuXHJcbiAgICAgICAgIGlmIChsaW5rRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXR5cGUnKSA9PSBcInZpZGVvXCIpIHtcclxuICAgICAgICAgICAgdmFyIHZpZGVvVVJMID0gbGlua0VsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBgPGRpdiBjbGFzcz1cImdhbGxlcnktY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpZnJhbWUgY2xhc3M9XCJnYWxsZXJ5LWNvbnRhaW5lci1pZnJhbWVcIiBzcmM9XCIke3ZpZGVvVVJMfVwiIGdlc3R1cmU9XCJtZWRpYVwiICBhbGxvdz1cImVuY3J5cHRlZC1tZWRpYVwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgaHRtbDogdGVtcGxhdGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgc3JjOiBsaW5rRWwuZ2V0QXR0cmlidXRlKCdocmVmJyksXHJcbiAgICAgICAgICAgICAgdzogcGFyc2VJbnQoc2l6ZVswXSwgMTApLFxyXG4gICAgICAgICAgICAgIGg6IHBhcnNlSW50KHNpemVbMV0sIDEwKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKGZpZ3VyZUVsLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgLy8gPGZpZ2NhcHRpb24+IGNvbnRlbnRcclxuICAgICAgICAgICAgaXRlbS50aXRsZSA9IGZpZ3VyZUVsLmNoaWxkcmVuWzFdLmlubmVySFRNTDtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKGxpbmtFbC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIDxpbWc+IHRodW1ibmFpbCBlbGVtZW50LCByZXRyaWV2aW5nIHRodW1ibmFpbCB1cmxcclxuICAgICAgICAgICAgaXRlbS5tc3JjID0gbGlua0VsLmNoaWxkcmVuWzBdLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGl0ZW0uZWwgPSBmaWd1cmVFbDsgLy8gc2F2ZSBsaW5rIHRvIGVsZW1lbnQgZm9yIGdldFRodW1iQm91bmRzRm5cclxuICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICB9O1xyXG5cclxuICAgLy8gZmluZCBuZWFyZXN0IHBhcmVudCBlbGVtZW50XHJcbiAgIHZhciBjbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChlbCwgZm4pIHtcclxuICAgICAgcmV0dXJuIGVsICYmIChmbihlbCkgPyBlbCA6IGNsb3Nlc3QoZWwucGFyZW50Tm9kZSwgZm4pKTtcclxuICAgfTtcclxuXHJcbiAgIC8vIHRyaWdnZXJzIHdoZW4gdXNlciBjbGlja3Mgb24gdGh1bWJuYWlsXHJcbiAgIHZhciBvblRodW1ibmFpbHNDbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCA/IGUucHJldmVudERlZmF1bHQoKSA6IGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgICAgIHZhciBlVGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cclxuICAgICAgLy8gZmluZCByb290IGVsZW1lbnQgb2Ygc2xpZGVcclxuICAgICAgdmFyIGNsaWNrZWRMaXN0SXRlbSA9IGNsb3Nlc3QoZVRhcmdldCwgZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgIHJldHVybiAoZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdGSUdVUkUnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIWNsaWNrZWRMaXN0SXRlbSkge1xyXG4gICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZpbmQgaW5kZXggb2YgY2xpY2tlZCBpdGVtIGJ5IGxvb3BpbmcgdGhyb3VnaCBhbGwgY2hpbGQgbm9kZXNcclxuICAgICAgLy8gYWx0ZXJuYXRpdmVseSwgeW91IG1heSBkZWZpbmUgaW5kZXggdmlhIGRhdGEtIGF0dHJpYnV0ZVxyXG4gICAgICB2YXIgY2xpY2tlZEdhbGxlcnkgPSBjbGlja2VkTGlzdEl0ZW0ucGFyZW50Tm9kZSxcclxuICAgICAgICAgY2hpbGROb2RlcyA9IGNsaWNrZWRMaXN0SXRlbS5wYXJlbnROb2RlLmNoaWxkTm9kZXMsXHJcbiAgICAgICAgIG51bUNoaWxkTm9kZXMgPSBjaGlsZE5vZGVzLmxlbmd0aCxcclxuICAgICAgICAgbm9kZUluZGV4ID0gMCxcclxuICAgICAgICAgaW5kZXg7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUNoaWxkTm9kZXM7IGkrKykge1xyXG4gICAgICAgICBpZiAoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKGNoaWxkTm9kZXNbaV0gPT09IGNsaWNrZWRMaXN0SXRlbSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IG5vZGVJbmRleDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbm9kZUluZGV4Kys7XHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgLy8gb3BlbiBQaG90b1N3aXBlIGlmIHZhbGlkIGluZGV4IGZvdW5kXHJcbiAgICAgICAgIG9wZW5QaG90b1N3aXBlKGluZGV4LCBjbGlja2VkR2FsbGVyeSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICB9O1xyXG5cclxuICAgLy8gcGFyc2UgcGljdHVyZSBpbmRleCBhbmQgZ2FsbGVyeSBpbmRleCBmcm9tIFVSTCAoIyZwaWQ9MSZnaWQ9MilcclxuICAgdmFyIHBob3Rvc3dpcGVQYXJzZUhhc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLFxyXG4gICAgICAgICBwYXJhbXMgPSB7fTtcclxuXHJcbiAgICAgIGlmIChoYXNoLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHZhcnMgPSBoYXNoLnNwbGl0KCcmJyk7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICBpZiAoIXZhcnNbaV0pIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgcGFyYW1zW3BhaXJbMF1dID0gcGFpclsxXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5naWQpIHtcclxuICAgICAgICAgcGFyYW1zLmdpZCA9IHBhcnNlSW50KHBhcmFtcy5naWQsIDEwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgfTtcclxuXHJcbiAgIHZhciBvcGVuUGhvdG9Td2lwZSA9IGZ1bmN0aW9uIChpbmRleCwgZ2FsbGVyeUVsZW1lbnQsIGRpc2FibGVBbmltYXRpb24sIGZyb21VUkwpIHtcclxuICAgICAgdmFyIHBzd3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBzd3AnKVswXSxcclxuICAgICAgICAgZ2FsbGVyeSxcclxuICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgaXRlbXM7XHJcblxyXG4gICAgICBpdGVtcyA9IHBhcnNlVGh1bWJuYWlsRWxlbWVudHMoZ2FsbGVyeUVsZW1lbnQpO1xyXG5cclxuICAgICAgLy8gZGVmaW5lIG9wdGlvbnMgKGlmIG5lZWRlZClcclxuICAgICAgb3B0aW9ucyA9IHtcclxuXHJcbiAgICAgICAgIC8vIGRlZmluZSBnYWxsZXJ5IGluZGV4IChmb3IgVVJMKVxyXG4gICAgICAgICBnYWxsZXJ5VUlEOiBnYWxsZXJ5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHN3cC11aWQnKSxcclxuXHJcbiAgICAgICAgIGdldFRodW1iQm91bmRzRm46IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAvLyBTZWUgT3B0aW9ucyAtPiBnZXRUaHVtYkJvdW5kc0ZuIHNlY3Rpb24gb2YgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBpbmZvXHJcbiAgICAgICAgICAgIHZhciB0aHVtYm5haWwgPSBpdGVtc1tpbmRleF0uZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLCAvLyBmaW5kIHRodW1ibmFpbFxyXG4gICAgICAgICAgICAgICBwYWdlWVNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICAgICByZWN0ID0gdGh1bWJuYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgeDogcmVjdC5sZWZ0LFxyXG4gICAgICAgICAgICAgICB5OiByZWN0LnRvcCArIHBhZ2VZU2Nyb2xsLFxyXG4gICAgICAgICAgICAgICB3OiByZWN0LndpZHRoXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBQaG90b1N3aXBlIG9wZW5lZCBmcm9tIFVSTFxyXG4gICAgICBpZiAoZnJvbVVSTCkge1xyXG4gICAgICAgICBpZiAob3B0aW9ucy5nYWxsZXJ5UElEcykge1xyXG4gICAgICAgICAgICAvLyBwYXJzZSByZWFsIGluZGV4IHdoZW4gY3VzdG9tIFBJRHMgYXJlIHVzZWQgXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9waG90b3N3aXBlLmNvbS9kb2N1bWVudGF0aW9uL2ZhcS5odG1sI2N1c3RvbS1waWQtaW4tdXJsXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2pdLnBpZCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4ID0gajtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpbiBVUkwgaW5kZXhlcyBzdGFydCBmcm9tIDFcclxuICAgICAgICAgICAgb3B0aW9ucy5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCkgLSAxO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBleGl0IGlmIGluZGV4IG5vdCBmb3VuZFxyXG4gICAgICBpZiAoaXNOYU4ob3B0aW9ucy5pbmRleCkpIHtcclxuICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlzYWJsZUFuaW1hdGlvbikge1xyXG4gICAgICAgICBvcHRpb25zLnNob3dBbmltYXRpb25EdXJhdGlvbiA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBhc3MgZGF0YSB0byBQaG90b1N3aXBlIGFuZCBpbml0aWFsaXplIGl0XHJcbiAgICAgIGdhbGxlcnkgPSBuZXcgUGhvdG9Td2lwZShwc3dwRWxlbWVudCwgUGhvdG9Td2lwZVVJX0RlZmF1bHQsIGl0ZW1zLCBvcHRpb25zKTtcclxuICAgICAgZ2FsbGVyeS5pbml0KCk7XHJcbiAgIH07XHJcblxyXG4gICAvLyBsb29wIHRocm91Z2ggYWxsIGdhbGxlcnkgZWxlbWVudHMgYW5kIGJpbmQgZXZlbnRzXHJcbiAgIHZhciBnYWxsZXJ5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGdhbGxlcnlTZWxlY3Rvcik7XHJcblxyXG4gICBmb3IgKHZhciBpID0gMCwgbCA9IGdhbGxlcnlFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgZ2FsbGVyeUVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1wc3dwLXVpZCcsIGkgKyAxKTtcclxuICAgICAgZ2FsbGVyeUVsZW1lbnRzW2ldLm9uY2xpY2sgPSBvblRodW1ibmFpbHNDbGljaztcclxuICAgfVxyXG5cclxuICAgLy8gUGFyc2UgVVJMIGFuZCBvcGVuIGdhbGxlcnkgaWYgaXQgY29udGFpbnMgIyZwaWQ9MyZnaWQ9MVxyXG4gICB2YXIgaGFzaERhdGEgPSBwaG90b3N3aXBlUGFyc2VIYXNoKCk7XHJcbiAgIGlmIChoYXNoRGF0YS5waWQgJiYgaGFzaERhdGEuZ2lkKSB7XHJcbiAgICAgIG9wZW5QaG90b1N3aXBlKGhhc2hEYXRhLnBpZCwgZ2FsbGVyeUVsZW1lbnRzW2hhc2hEYXRhLmdpZCAtIDFdLCB0cnVlLCB0cnVlKTtcclxuICAgfVxyXG59OyIsImZ1bmN0aW9uIHNtb290aFNjcm9sbChsb2NhdGlvbikge1xyXG4gICBpZiAobG9jYXRpb24pIHtcclxuICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBsb2NhdGlvbik7XHJcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG4gICAgICAgICBibG9jazogXCJzdGFydFwiLFxyXG4gICAgICAgICBpbmxpbmU6IFwibmVhcmVzdFwiXHJcbiAgICAgIH0pO1xyXG4gICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiVmFyacOhdmVsICdsb2NhdGlvbicgbsOjbyBwYXNzYWRhIG5vIGV2ZW50byBkZSAnY2xpY2snXCIpO1xyXG59IiwiZnVuY3Rpb24gaW5pdFBhcnRpY3VsYXNCRygpIHtcclxuICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigxMTQsIDExNCwgMTE0KVwiO1xyXG4gICBpZiAocEpTRG9tLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFydGljbGVzLWpzXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIHBKU0RvbVswXS5wSlMuZm4udmVuZG9ycy5zdGFydCgpO1xyXG4gICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcnRpY2xlcy1qc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICBwYXJ0aWNsZXNKUyhcInBhcnRpY2xlcy1qc1wiLCB7XHJcblxyXG4gICAgICAgICBcInBhcnRpY2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwibnVtYmVyXCI6IHtcclxuICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiA4MCxcclxuICAgICAgICAgICAgICAgXCJkZW5zaXR5XCI6IHtcclxuICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgXCJ2YWx1ZV9hcmVhXCI6IDEwMDBcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbG9yXCI6IHtcclxuICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIiNmZmZcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNoYXBlXCI6IHtcclxuICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiY2lyY2xlXCIsXHJcbiAgICAgICAgICAgICAgIFwic3Ryb2tlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiAwLFxyXG4gICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgIFwicG9seWdvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwibmJfc2lkZXNcIjogNVxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICBcImltYWdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgXCJzcmNcIjogXCJodHRwOi8vaW1hZ2UuaWJiLmNvL2c5ZUZjRi9sb2dvX3RyYW5zcGFyZW50LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgICBcIndpZHRoXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogMTAwXHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IHtcclxuICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiAxLFxyXG4gICAgICAgICAgICAgICBcInJhbmRvbVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgXCJhbmltXCI6IHtcclxuICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIFwic3BlZWRcIjogMSxcclxuICAgICAgICAgICAgICAgICAgXCJvcGFjaXR5X21pblwiOiAwLjYsXHJcbiAgICAgICAgICAgICAgICAgIFwic3luY1wiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2l6ZVwiOiB7XHJcbiAgICAgICAgICAgICAgIFwidmFsdWVcIjogMyxcclxuICAgICAgICAgICAgICAgXCJyYW5kb21cIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgXCJhbmltXCI6IHtcclxuICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIFwic3BlZWRcIjogNDAsXHJcbiAgICAgICAgICAgICAgICAgIFwic2l6ZV9taW5cIjogMC4xLFxyXG4gICAgICAgICAgICAgICAgICBcInN5bmNcIjogZmFsc2VcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxpbmVfbGlua2VkXCI6IHtcclxuICAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgXCJkaXN0YW5jZVwiOiAxMjAsXHJcbiAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmE3NTAwXCIsXHJcbiAgICAgICAgICAgICAgIFwib3BhY2l0eVwiOiAwLjgsXHJcbiAgICAgICAgICAgICAgIFwid2lkdGhcIjogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1vdmVcIjoge1xyXG4gICAgICAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICBcInNwZWVkXCI6IDQsXHJcbiAgICAgICAgICAgICAgIFwiZGlyZWN0aW9uXCI6IFwicmFuZG9tXCIsXHJcbiAgICAgICAgICAgICAgIFwicmFuZG9tXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBcInN0cmFpZ2h0XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICBcIm91dF9tb2RlXCI6IFwiYm91bmNlXCIsXHJcbiAgICAgICAgICAgICAgIFwiYm91bmNlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgIFwiYXR0cmFjdFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIFwicm90YXRlWFwiOiAzNjAwLFxyXG4gICAgICAgICAgICAgICAgICBcInJvdGF0ZVlcIjogMzYwMFxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgIFwiaW50ZXJhY3Rpdml0eVwiOiB7XHJcbiAgICAgICAgICAgIFwiZGV0ZWN0X29uXCI6IFwiY2FudmFzXCIsXHJcblxyXG4gICAgICAgICAgICBcImV2ZW50c1wiOiB7XHJcbiAgICAgICAgICAgICAgIFwib25ob3ZlclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIFwibW9kZVwiOiBcInJlcHVsc2VcIlxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICBcIm9uY2xpY2tcIjoge1xyXG4gICAgICAgICAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgXCJtb2RlXCI6IFwicmVtb3ZlXCJcclxuICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgXCJyZXNpemVcIjogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgXCJtb2Rlc1wiOiB7XHJcbiAgICAgICAgICAgICAgIFwicmVwdWxzZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZGlzdGFuY2VcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICBcImR1cmF0aW9uXCI6IDAuNFxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSxcclxuICAgICAgICAgXCJyZXRpbmFfZGV0ZWN0XCI6IHRydWVcclxuICAgICAgfSk7XHJcbiAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGVzdHJveVBhcnRpY3VsYXNCRygpIHtcclxuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXJ0aWNsZXMtanNcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcclxuICAgaWYocEpTRG9tWzBdICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIGNhbmNlbFJlcXVlc3RBbmltRnJhbWUocEpTRG9tWzBdLnBKUy5mbi5jaGVja0FuaW1GcmFtZSk7XHJcbiAgICAgIGNhbmNlbFJlcXVlc3RBbmltRnJhbWUocEpTRG9tWzBdLnBKUy5mbi5kcmF3QW5pbUZyYW1lKTtcclxuICAgICAgcEpTRG9tWzBdLnBKUy5mbi5wYXJ0aWNsZXNFbXB0eSgpO1xyXG4gICAgICBwSlNEb21bMF0ucEpTLmZuLmNhbnZhc0NsZWFyKCk7XHJcbiAgIH1cclxufSIsIi8vIGluaXQgc2Nyb2xsIHJldmVhbCBlIGdhbGVyaWFcclxuZnVuY3Rpb24gaW5pdENvbXBvbmVudHMoKSB7XHJcbiAgIHdpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpO1xyXG5cclxuICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRpb24tZGVmYXVsdCcpLmxlbmd0aCA+IDApXHJcbiAgICAgIHNyLnJldmVhbCgnLmFuaW1hdGlvbi1kZWZhdWx0Jywge1xyXG4gICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICB9KTtcclxuICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRpb24tY29tb0Z1bmNpb25hJykubGVuZ3RoID4gMClcclxuICAgICAgc3IucmV2ZWFsKCcuYW5pbWF0aW9uLWNvbW9GdW5jaW9uYScsIHtcclxuICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgfSwgNTAwKTtcclxuICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRpb24tbW9kdWxvc1NlcnZpY29zJykubGVuZ3RoID4gMClcclxuICAgICAgc3IucmV2ZWFsKCcuYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvcycsIHtcclxuICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgfSwgNTAwKTtcclxuXHJcbiAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeScpLmxlbmd0aCA+IDApXHJcbiAgICAgIGluaXRQaG90b1N3aXBlRnJvbURPTSgnLmdhbGxlcnknKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFZpZXcodmlldywgdHlwZSl7XHJcbiAgIGlmKHR5cGUgPT0gXCJob21lXCIpe1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICBuYXZiYXI6IGdldE5hdkJhcih2aWV3KSxcclxuICAgICAgICAgbWFpbjogZ2V0SG9tZSgpXHJcbiAgICAgIH07XHJcbiAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB2YXIgdmFtb3NDb252ZXJzYXIgPSAnJywgXHJcbiAgICAgICAgIG5vc3Nvc1RyYWJhbGhvcyA9ICcnLFxyXG4gICAgICAgICBjb21vRnVuY2lvbmEgPSAnJyxcclxuICAgICAgICAgZm9vdGVyID0gJycsXHJcbiAgICAgICAgIG1vZHVsbyA9ICcnLFxyXG4gICAgICAgICBwb3J0Zm9saW8gPSAnJyxcclxuICAgICAgICAgc2Vydmljb3MgPSAnJyxcclxuICAgICAgICAgc29icmVub3MgPSAnJyxcclxuICAgICAgICAgY29udGF0byA9ICcnLFxyXG4gICAgICAgICBuYXZiYXIgPSAnJztcclxuXHJcbiAgICAgIG5hdmJhciA9IGdldE5hdkJhcih2aWV3KTtcclxuICAgICAgY29tb0Z1bmNpb25hID0gZ2V0Q29tb0Z1bmNpb25hKHZpZXcpO1xyXG4gICAgICBub3Nzb3NUcmFiYWxob3MgPSBnZXROb3Nzb3NUcmFiYWxob3Modmlldyk7XHJcbiAgICAgIHZhbW9zQ29udmVyc2FyID0gZ2V0VmFtb3NDb252ZXJzYXIodmlldyk7XHJcbiAgICAgIGZvb3RlciA9IGdldEZvb3Rlcih2aWV3KTtcclxuXHJcbiAgICAgIGlmKHR5cGUgPT0gXCJtb2R1bG9zXCIpXHJcbiAgICAgICAgIG1vZHVsbyA9IGdldE1vZHVsb1ZpZXcodmlldyk7XHJcblxyXG4gICAgICBpZih0eXBlID09IFwibWVudVwiKSB7XHJcbiAgICAgICAgIHBvcnRmb2xpbyA9IGdldFBvcnRmb2xpbyh2aWV3KTtcclxuICAgICAgICAgc2Vydmljb3MgPSBnZXRTZXJ2aWNvcyh2aWV3KTtcclxuICAgICAgICAgc29icmVub3MgPSBnZXRTb2JyZW5vcyh2aWV3KTtcclxuICAgICAgICAgY29udGF0byA9IGdldENvbnRhdG8odmlldyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgIG5hdmJhcjogbmF2YmFyLFxyXG4gICAgICAgICBtYWluOiBtb2R1bG8gKyBwb3J0Zm9saW8gKyBzZXJ2aWNvcyArIHNvYnJlbm9zICsgY29udGF0byArIGNvbW9GdW5jaW9uYSArIG5vc3Nvc1RyYWJhbGhvcyArIHZhbW9zQ29udmVyc2FyICsgZm9vdGVyXHJcbiAgICAgIH07XHJcbiAgIH1cclxufSIsImZ1bmN0aW9uIGdldEZvb3Rlcih2aWV3KSB7XHJcbiAgICAgIHJldHVybiBgXHJcbiAgICAgICAgIDxocj5cclxuICAgICAgICAgPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWxlZnRcIj5cclxuICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj48aW1nIGNsYXNzPVwiZm9vdGVyLWxlZnQtbG9nb1wiIHNyYz1cIi4vaW1nLzExQXJ0X09yaWdpbmFsLnN2Z1wiPjwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPiZjb3B5OyAxMUFydCAyMDE4PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbVwiPjxpIGNsYXNzPVwiZm9vdGVyLXJpZ2h0LWZiIGZhIGZhLWZhY2Vib29rLW9mZmljaWFsIGZhLTN4XCI+PC9pPjwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDwvZm9vdGVyPmA7XHJcbn07IiwiZnVuY3Rpb24gZ2V0Q29udGF0byh2aWV3KXtcclxuICAgaWYodmlldyA9PSBcImNvbnRhdG9cIilcclxuICAgICAgcmV0dXJuIGAgICAgICBcclxuICAgICAgPGRpdiBjbGFzcz1cInBhZ2VUaXRsZSBhbmltYXRpb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICA8aDEgY2xhc3M9XCJwYWdlVGl0bGUtaDFcIj48c3BhbiBjbGFzcz1cInRleHQtbWFyayB0ZXh0LW1hcmstMTFhcnQgcHItNSBwbC01IHBhZ2VUaXRsZS1zcGFuXCI+Q29udGF0bzwvc3Bhbj48L2gxPlxyXG4gICAgICAgICA8cCBjbGFzcz1cInBhZ2VUaXRsZS1wXCI+RmFsZSBjb20gZ2VudGUgcXVlIGVudGVuZGUgZSBxdWVyIG91dmlyITwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgIGVsc2VcclxuICAgICAgcmV0dXJuICcnO1xyXG59IiwiZnVuY3Rpb24gZ2V0SG9tZSh2aWV3KXtcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG4gICAgICAgICA8c2VjdGlvbj5cclxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwidGV4dC1jZW50ZXIgdGV4dC13aGl0ZSB0aXR1bG9Cb2FzVmluZGFzIGFuaW1hdGlvbi1tb2R1bG9zU2Vydmljb3NcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb250LXdlaWdodC1ib2xkXCI+QmVtIHZpbmRvITwvc3Bhbj4gQ29udGEgcHJhIGdlbnRlLCBkbyBxdWUgdm9jw6ogcHJlY2lzYT9cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb250LXdlaWdodC1ib2xkXCI+Oyk8L3NwYW4+XHJcbiAgICAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgIFxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNiBtb2R1bG8gYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kdWxvLWRlc2lnbiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibW9kdWxvLWltZyBtdC0xMCBtYi03XCIgc3JjPVwiaW1nL2Rlc2lnbi5zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPkRlc2lnbiBHcsOhZmljbzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkJBTk5FUiwgRllMRVIsIE1JRElBUyBTT0NJQUlTLCBJTVBSRVNTT1MuLi48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibm8tdGV4dERlY29yYXRpb25cIiBocmVmPVwiIyFkZXNpZ25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24tMTFhcnQgYnV0dG9uLTExYXJ0LWRlc2lnblwiPkNPTlRJTlVBUjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNiBtb2R1bG8gYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kdWxvLXdlYiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibW9kdWxvLWltZyBtdC0xMCBtYi03XCIgc3JjPVwiaW1nL3dlYi5zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPldlYnNpdGU8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5DT01QTEVUTywgUkVQT05TSVZPLCBSw4FQSURPLCBTRU8sIEFDRVNTw41WRUwuLi48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibm8tdGV4dERlY29yYXRpb25cIiBocmVmPVwiIyF3ZWJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24tMTFhcnQgYnV0dG9uLTExYXJ0LXdlYlwiPkNPTlRJTlVBUjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNiBtb2R1bG8gYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kdWxvLXZpZGVvIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtb2R1bG8taW1nIG10LTEwIG1iLTdcIiBzcmM9XCJpbWcvdmlkZW8uc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5Qcm9kdcOnw6NvIFbDrWRlbzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkVEScOHw4NPLCBNT05UQUdFTSwgQ0xJUCwgRklOQUxJWkHDh8ODTywgRUZFSVRPUy4uLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuby10ZXh0RGVjb3JhdGlvblwiIGhyZWY9XCIjIXZpZGVvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uLTExYXJ0IGJ1dHRvbi0xMWFydC12aWRlb1wiPkNPTlRJTlVBUjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNiBtb2R1bG8gYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kdWxvLTNkIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtb2R1bG8taW1nIG10LTEwIG1iLTdcIiBzcmM9XCJpbWcvM2Quc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInRpdHVsb1wiPk1vZGVsYWdlbSAzRDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlBFUlNPTkFHRU0sIENFTsOBUklPLCBBTUJJRU5URSwgT0JKRVRPUy4uLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuby10ZXh0RGVjb3JhdGlvblwiIGhyZWY9XCIjITNkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uLTExYXJ0IGJ1dHRvbi0xMWFydC0zZFwiPkNPTlRJTlVBUjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxufSIsImZ1bmN0aW9uIGdldFBvcnRmb2xpbyh2aWV3KXtcclxuICAgaWYodmlldyA9PSBcInBvcnRmb2xpb1wiKVxyXG4gICAgICByZXR1cm4gYCAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGFnZVRpdGxlIGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgIDxoMSBjbGFzcz1cInBhZ2VUaXRsZS1oMVwiPjxzcGFuIGNsYXNzPVwidGV4dC1tYXJrIHRleHQtbWFyay0xMWFydCBwci01IHBsLTUgcGFnZVRpdGxlLXNwYW5cIj5Qb3J0Zm9saW88L3NwYW4+PC9oMT5cclxuICAgICAgPHAgY2xhc3M9XCJwYWdlVGl0bGUtcFwiPkVzY29saGEgdW1hIGNhdGVnb3JpYSBhYmFpeG8gcGFyYSBmaWx0cmFyIDspPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyIGFuaW1hdGlvbi1kZWZhdWx0IHJvd1wiPlxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCIxMWFydFwiIG9uY2xpY2s9XCJwb3J0Zm9saW9GaWx0cmFyKCcxMWFydCcpXCIgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtMTFhcnQgYnRuLXBvcnRmb2xpb1wiPlRvZG9zPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJkZXNpZ25cIiBvbmNsaWNrPVwicG9ydGZvbGlvRmlsdHJhcignZGVzaWduJylcIiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1kZXNpZ24gYnRuLXBvcnRmb2xpb1wiPkRlc2lnbiBHcsOhZmljbzwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiM2RcIiBvbmNsaWNrPVwicG9ydGZvbGlvRmlsdHJhcignM2QnKVwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLTNkIGJ0bi1wb3J0Zm9saW9cIj5Nb2RlbGFnZW0gM0Q8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIndlYlwiIG9uY2xpY2s9XCJwb3J0Zm9saW9GaWx0cmFyKCd3ZWInKVwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXdlYiBidG4tcG9ydGZvbGlvXCI+V2Vic2l0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwidmlkZW9cIiBvbmNsaWNrPVwicG9ydGZvbGlvRmlsdHJhcigndmlkZW8nKVwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXZpZGVvIGJ0bi1wb3J0Zm9saW9cIj5Qcm9kdcOnw6NvIFbDrWRlbzwvYnV0dG9uPlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBwYi02IHB0LTVcIj5cclxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJib3hQb3J0Zm9saW9cIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnlcIj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gICBlbHNlXHJcbiAgICAgIHJldHVybiAnJztcclxufSIsImZ1bmN0aW9uIGdldFNlcnZpY29zKHZpZXcpe1xyXG4gICBpZih2aWV3ID09IFwic2Vydmljb3NcIilcclxuICAgICAgcmV0dXJuIGAgICAgICBcclxuICAgICAgPGRpdiBjbGFzcz1cInBhZ2VUaXRsZSBhbmltYXRpb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICA8aDEgY2xhc3M9XCJwYWdlVGl0bGUtaDFcIj48c3BhbiBjbGFzcz1cInRleHQtbWFyayB0ZXh0LW1hcmstMTFhcnQgcHItNSBwbC01IHBhZ2VUaXRsZS1zcGFuXCI+Tm9zc29zIFNlcnZpw6dvczwvc3Bhbj48L2gxPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGFydGljbGUgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBjb2wteHMtMTIgcGFuZWwgcGFuZWwtc2Vydmljb3MgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxlZnQgY29sLW1kLTUgY29sLWxnLTMgY29sLWxnLW9mZnNldC0xIGNvbC14cy0xMiBjb2wtc20tMTIgdGV4dC1jZW50ZXIgXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwYW5lbC1sZWZ0LWltZ1wiIHNyYz1cIi4vaW1nL2Rlc2lnbl9jLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYW5lbC1sZWZ0LXRpdGxlIG1iLTBcIj5EZXNpZ24gR3LDoWZpY288L2gxPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLXJpZ2h0IGNvbC1tZC03IGNvbC1sZy03IGNvbC14cy0xMiBjb2wtc20tMTJcIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwYW5lbC1yaWdodC1kZXNjcmlwdGlvbiBtdC0wXCI+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSW52ZW50b3JlIHJhdGlvbmUgcmVpY2llbmRpcyB0b3RhbSBvZGlvLCBxdW8gZGVsZW5pdGkgYmVhdGFlIGVhcXVlIGV4cGVkaXRhIHZlcm8gZWEsIG9kaXQgZXN0IG9mZmljaWlzIHRlbXBvcmlidXMgYWQuPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1kZXNpZ24gYnRuLWFjdGlvbnNcIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX2NvbW9GdW5jaW9uYScpXCIgdHlwZT1cImJ1dHRvblwiPkNvbW8gZnVuY2lvbmE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1kZXNpZ24gYnRuLWFjdGlvbnMgbWwtMlwiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfbm9zc29zVHJhYmFsaG9zJylcIiB0eXBlPVwiYnV0dG9uXCI+Tm9zc29zIHRyYWJhbGhvczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1maWxsLWRlc2lnbiBidG4tYWN0aW9ucyBtbC0yXCIgcm9sZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJzbW9vdGhTY3JvbGwoJ2NvbnRhaW5lcl92YW1vc0NvbnZlcnNhcicpXCIgdHlwZT1cImJ1dHRvblwiPlZhbW9zIGNvbnZlcnNhcj88L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPGhyPlxyXG4gICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGNvbC14cy0xMiBwYW5lbCBwYW5lbC1zZXJ2aWNvcyBhbmltYXRpb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtbGVmdCBjb2wtbWQtNSBjb2wtbGctMyBjb2wteHMtMTIgY29sLXNtLTEyIHRleHQtY2VudGVyIHNob3dfbWF4NjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwYW5lbC1sZWZ0LWltZ1wiIHNyYz1cIi4vaW1nL3dlYl9jLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYW5lbC1sZWZ0LXRpdGxlIG1iLTBcIj5XZWJzaXRlPC9oMT5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1yaWdodCBjb2wtbWQtNyBjb2wtbGctNyBjb2wteHMtMTIgY29sLXNtLTEyIGNvbC1sZy1vZmZzZXQtMVwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBhbmVsLXJpZ2h0LWRlc2NyaXB0aW9uIG10LTBcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJbnZlbnRvcmUgcmF0aW9uZSByZWljaWVuZGlzIHRvdGFtIG9kaW8sIHF1byBkZWxlbml0aSBiZWF0YWUgZWFxdWUgZXhwZWRpdGEgdmVybyBlYSwgb2RpdCBlc3Qgb2ZmaWNpaXMgdGVtcG9yaWJ1cyBhZC48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBhbmltYXRpb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXdlYiBidG4tYWN0aW9uc1wiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfY29tb0Z1bmNpb25hJylcIiB0eXBlPVwiYnV0dG9uXCI+Q29tbyBmdW5jaW9uYTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXdlYiBidG4tYWN0aW9ucyBtbC0yXCIgcm9sZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJzbW9vdGhTY3JvbGwoJ2NvbnRhaW5lcl9ub3Nzb3NUcmFiYWxob3MnKVwiIHR5cGU9XCJidXR0b25cIj5Ob3Nzb3MgdHJhYmFsaG9zPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWZpbGwtd2ViIGJ0bi1hY3Rpb25zIG1sLTJcIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIiB0eXBlPVwiYnV0dG9uXCI+VmFtb3MgY29udmVyc2FyPzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtbGVmdCBjb2wtbWQtNSBjb2wtbGctMyBjb2wteHMtMTIgY29sLXNtLTEyIHRleHQtY2VudGVyIHNob3dfbWluNjAwXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwYW5lbC1sZWZ0LWltZ1wiIHNyYz1cIi4vaW1nL3dlYl9jLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYW5lbC1sZWZ0LXRpdGxlIG1iLTBcIj5XZWJzaXRlPC9oMT5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgICAgIDxocj5cclxuICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBjb2wteHMtMTIgcGFuZWwgcGFuZWwtc2Vydmljb3MgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxlZnQgY29sLW1kLTUgY29sLWxnLTMgY29sLWxnLW9mZnNldC0xIGNvbC14cy0xMiBjb2wtc20tMTIgdGV4dC1jZW50ZXIgXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwYW5lbC1sZWZ0LWltZ1wiIHNyYz1cIi4vaW1nLzNkX2Muc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInBhbmVsLWxlZnQtdGl0bGUgbWItMFwiPk1vZGVsYWdlbSAzRDwvaDE+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtcmlnaHQgY29sLW1kLTcgY29sLWxnLTcgY29sLXhzLTEyIGNvbC1zbS0xMlwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInBhbmVsLXJpZ2h0LWRlc2NyaXB0aW9uIG10LTBcIj5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJbnZlbnRvcmUgcmF0aW9uZSByZWljaWVuZGlzIHRvdGFtIG9kaW8sIHF1byBkZWxlbml0aSBiZWF0YWUgZWFxdWUgZXhwZWRpdGEgdmVybyBlYSwgb2RpdCBlc3Qgb2ZmaWNpaXMgdGVtcG9yaWJ1cyBhZC48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBhbmltYXRpb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLTNkIGJ0bi1hY3Rpb25zXCIgcm9sZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJzbW9vdGhTY3JvbGwoJ2NvbnRhaW5lcl9jb21vRnVuY2lvbmEnKVwiIHR5cGU9XCJidXR0b25cIj5Db21vIGZ1bmNpb25hPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtM2QgYnRuLWFjdGlvbnMgbWwtMlwiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfbm9zc29zVHJhYmFsaG9zJylcIiB0eXBlPVwiYnV0dG9uXCI+Tm9zc29zIHRyYWJhbGhvczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1maWxsLTNkIGJ0bi1hY3Rpb25zIG1sLTJcIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIiB0eXBlPVwiYnV0dG9uXCI+VmFtb3MgY29udmVyc2FyPzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgICAgICA8aHI+XHJcbiAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgY29sLXhzLTEyIHBhbmVsIHBhbmVsLXNlcnZpY29zIGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1sZWZ0IGNvbC1tZC01IGNvbC1sZy0zIGNvbC14cy0xMiBjb2wtc20tMTIgdGV4dC1jZW50ZXIgc2hvd19tYXg2MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInBhbmVsLWxlZnQtaW1nXCIgc3JjPVwiLi9pbWcvdmlkZW9fYy5zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFuZWwtbGVmdC10aXRsZSBtYi0wXCI+UHJvZHXDp8OjbyBkZSB2aWRlbzwvaDE+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtcmlnaHQgY29sLW1kLTcgY29sLWxnLTcgY29sLXhzLTEyIGNvbC1zbS0xMiBjb2wtbGctb2Zmc2V0LTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwYW5lbC1yaWdodC1kZXNjcmlwdGlvbiBtdC0wXCI+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSW52ZW50b3JlIHJhdGlvbmUgcmVpY2llbmRpcyB0b3RhbSBvZGlvLCBxdW8gZGVsZW5pdGkgYmVhdGFlIGVhcXVlIGV4cGVkaXRhIHZlcm8gZWEsIG9kaXQgZXN0IG9mZmljaWlzIHRlbXBvcmlidXMgYWQuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS12aWRlbyBidG4tYWN0aW9uc1wiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfY29tb0Z1bmNpb25hJylcIiB0eXBlPVwiYnV0dG9uXCI+Q29tbyBmdW5jaW9uYTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXZpZGVvIGJ0bi1hY3Rpb25zIG1sLTJcIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX25vc3Nvc1RyYWJhbGhvcycpXCIgdHlwZT1cImJ1dHRvblwiPk5vc3NvcyB0cmFiYWxob3M8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZmlsbC12aWRlbyBidG4tYWN0aW9ucyBtbC0yXCIgcm9sZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJzbW9vdGhTY3JvbGwoJ2NvbnRhaW5lcl92YW1vc0NvbnZlcnNhcicpXCIgdHlwZT1cImJ1dHRvblwiPlZhbW9zIGNvbnZlcnNhcj88L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxlZnQgY29sLW1kLTUgY29sLWxnLTMgY29sLXhzLTEyIGNvbC1zbS0xMiB0ZXh0LWNlbnRlciBzaG93X21pbjYwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicGFuZWwtbGVmdC1pbWdcIiBzcmM9XCIuL2ltZy92aWRlb19jLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYW5lbC1sZWZ0LXRpdGxlIG1iLTBcIj5Qcm9kdcOnw6NvIGRlIHZpZGVvPC9oMT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgIGA7XHJcbiAgIGVsc2VcclxuICAgICAgcmV0dXJuICcnO1xyXG59IiwiZnVuY3Rpb24gZ2V0U29icmVub3Modmlldyl7XHJcbiAgIGlmKHZpZXcgPT0gXCJzb2JyZW5vc1wiKVxyXG4gICAgICByZXR1cm4gYCAgICAgIFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyIHNvYnJlbm9zXCI+XHJcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICA8YXJjdGljbGUgY2xhc3M9XCJjb2wtbWQtMTJcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2VUaXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYWdlVGl0bGUtaDFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LW1hcmsgdGV4dC1tYXJrLTExYXJ0IHByLTUgcGwtNSBwYWdlVGl0bGUtc3BhblwiPjExQXJ0PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2gxPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLTExYXJ0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPjExQXJ0PC9zdHJvbmc+IMOpIHVtYSBtYXJjYSBxdWUgY29tcMO1ZSB1bSB0aW1lIGRlIHByb2Zpc3Npb25haXMgcXVlIGF0ZW5kZW0gdG9kYXMgYXMgw6FyZWFzIGRlIGFydGUuXHJcbiAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+MTFBcnQ8L3N0cm9uZz4gZm9pIGJhdGl6YWRvIGFzc2ltIHBvcnF1ZSByZXByZXNlbnRhIGEgMTHCsCBBcnRlXHJcbiAgICAgICAgICAgICAgICAgICAgIDxpPihkw6ljaW1hIHByaW1laXJhIGFydGUpPC9pPiwgcXVlIMOpIGEgdW5pw6NvIGRlIHRvZGFzIGFzIGFydGVzLCBzZWphIGVsYSBncsOhZmljYSwgd2ViLCBpbXByZXNzYSwgM0Qgb3UgdsOtZGVvLjwvcD5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXJjdGljbGU+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8aHI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbWItMTIgbXQtOFwiPlxyXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZVRpdGxlIG10LTZcIj5cclxuICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFnZVRpdGxlLWgxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1tYXJrIHRleHQtbWFyay0xMWFydCBwci01IHBsLTUgcGFnZVRpdGxlLXNwYW5cIj5PIFRpbWU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvaDE+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic29icmVub3Mtb1RpbWVcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL3BsYWNla2l0dGVuLmNvbS81MDAvNTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJzb2JyZW5vcy1vVGltZS1jYXJkLWluZm8tbmFtZVwiPkdhdG8gMTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWZ1bmN0aW9uXCI+RnVuw6fDo288L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWJpb1wiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEF1dCBzaW50IHBsYWNlYXQsIGVhcnVtIGlzdGUgcXVpYSByYXRpb25lP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxlY3R1cyBkaXN0aW5jdGlvIGlzdGUgbnVtcXVhbSB2ZXJvLCBmdWdpdCBkb2xvcmUgcXVhZSBkaWN0YSByZWljaWVuZGlzIGNvcnJ1cHRpIGF1dCB1dCBzYWVwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmNhZWNhdGkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mYWNlYm9vay1vZmZpY2lhbCBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saW5rZWRpbiBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1lbnZlbG9wZSBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL3BsYWNla2l0dGVuLmNvbS81MDAvNTAyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJzb2JyZW5vcy1vVGltZS1jYXJkLWluZm8tbmFtZVwiPkdhdG8gMjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWZ1bmN0aW9uXCI+RnVuw6fDo288L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWJpb1wiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEF1dCBzaW50IHBsYWNlYXQsIGVhcnVtIGlzdGUgcXVpYSByYXRpb25lP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxlY3R1cyBkaXN0aW5jdGlvIGlzdGUgbnVtcXVhbSB2ZXJvLCBmdWdpdCBkb2xvcmUgcXVhZSBkaWN0YSByZWljaWVuZGlzIGNvcnJ1cHRpIGF1dCB1dCBzYWVwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmNhZWNhdGkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mYWNlYm9vay1vZmZpY2lhbCBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saW5rZWRpbiBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1lbnZlbG9wZSBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL3BsYWNla2l0dGVuLmNvbS81MDUvNTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJzb2JyZW5vcy1vVGltZS1jYXJkLWluZm8tbmFtZVwiPkdhdG8gMzwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWZ1bmN0aW9uXCI+RnVuw6fDo288L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWJpb1wiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEF1dCBzaW50IHBsYWNlYXQsIGVhcnVtIGlzdGUgcXVpYSByYXRpb25lP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxlY3R1cyBkaXN0aW5jdGlvIGlzdGUgbnVtcXVhbSB2ZXJvLCBmdWdpdCBkb2xvcmUgcXVhZSBkaWN0YSByZWljaWVuZGlzIGNvcnJ1cHRpIGF1dCB1dCBzYWVwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmNhZWNhdGkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mYWNlYm9vay1vZmZpY2lhbCBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saW5rZWRpbiBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1lbnZlbG9wZSBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL3BsYWNla2l0dGVuLmNvbS81MDAvNTA1XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHNvYnJlbm9zLW9UaW1lLWNhcmQtaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJzb2JyZW5vcy1vVGltZS1jYXJkLWluZm8tbmFtZVwiPkdhdG8gNDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWZ1bmN0aW9uXCI+RnVuw6fDo288L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic29icmVub3Mtb1RpbWUtY2FyZC1pbmZvLWJpb1wiPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEF1dCBzaW50IHBsYWNlYXQsIGVhcnVtIGlzdGUgcXVpYSByYXRpb25lP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWxlY3R1cyBkaXN0aW5jdGlvIGlzdGUgbnVtcXVhbSB2ZXJvLCBmdWdpdCBkb2xvcmUgcXVhZSBkaWN0YSByZWljaWVuZGlzIGNvcnJ1cHRpIGF1dCB1dCBzYWVwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmNhZWNhdGkhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mYWNlYm9vay1vZmZpY2lhbCBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saW5rZWRpbiBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInNvYnJlbm9zLW9UaW1lLWNhcmQtY29udGFjdC1hXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1lbnZlbG9wZSBmYS0yeFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgZWxzZVxyXG4gICAgICByZXR1cm4gJyc7XHJcbn0iLCJmdW5jdGlvbiBnZXROYXZCYXIodmlldykge1xyXG4gICB2YXIgdmlld0NvbG9yID0gZ2V0Vmlld0NvbG9yKHZpZXcpO1xyXG5cclxuICAgcmV0dXJuIGBcclxuICAgICAgPG5hdiBjbGFzcz1cIm5hdiBzdHJva2VFZmZlY3RcIiBzdHlsZT1cImJhY2tncm91bmQ6JHt2aWV3Q29sb3J9XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuYXYtaGVhZGVyXCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXYtaGVhZGVyLXRpdGxlXCI+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjIWhvbWVcIj5cclxuICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvMTFBcnRfV2hpdGUuc3ZnXCIgd2lkdGg9XCI1MFwiIGhlaWdodD1cIjgwXCIgYWx0PVwiXCI+IDwvYT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmF2LW1vYmlsZUJ0blwiPlxyXG4gICAgICAgICA8bGFiZWwgZm9yPVwibmF2LW1vYmlsZUJ0blRvb2dsZVwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIm5hdi1tb2JpbGVCdG4tdG9vZ2xlVGV4dFwiPk1lbnU8L3A+XHJcbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XHJcbiAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJuYXYtbW9iaWxlQnRuVG9vZ2xlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuYXYtbGlua3NcIj5cclxuICAgICAgICAgPGltZyBjbGFzcz1cIm5hdi1saW5rcy1sb2dvXCIgc3JjPVwiaW1nLzExQXJ0X1doaXRlLnN2Z1wiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4MFwiIGFsdD1cIlwiPlxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzLWJ0bkZlY2hhclwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibmF2LW1vYmlsZUJ0blRvb2dsZVwiPkZlY2hhciBYPC9sYWJlbD5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDxhIGhyZWY9XCIjIWhvbWVcIj5IT01FPC9hPlxyXG4gICAgICAgICA8YSBocmVmPVwiIyFzZXJ2aWNvc1wiPlNFUlZJw4dPUzwvYT5cclxuICAgICAgICAgPGEgaHJlZj1cIiMhcG9ydGZvbGlvXCI+UE9SVEZPTElPPC9hPlxyXG4gICAgICAgICA8YSBocmVmPVwiIyFzb2JyZW5vc1wiPlNPQlJFIE7Dk1M8L2E+XHJcbiAgICAgICAgIDxhIGNsYXNzPVwibXRuLTQgbWItMTBcIiBocmVmPVwiIyFjb250YXRvXCI+Q09OVEFUTzwvYT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmF2PlxyXG4gICBgO1xyXG59OyIsImZ1bmN0aW9uIGdldFZhbW9zQ29udmVyc2FyKHZpZXcpIHtcclxuICAgdmFyIHZpZXdDb2xvciA9IGdldFZpZXdDb2xvcih2aWV3KTtcclxuICAgaWYgKHZpZXdDb2xvciA9PSBcIiNmYjhjMDBcIilcclxuICAgICAgdmlld0NvbG9yID0gXCIxMWFydFwiO1xyXG4gICBlbHNlXHJcbiAgICAgIHZpZXdDb2xvciA9IHZpZXc7XHJcblxyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICA8aHIgaWQ9XCJjb250YWluZXJfdmFtb3NDb252ZXJzYXJcIj4gIDwhLS0gQW5jaG9yIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgcGItOFwiPlxyXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImJveFZhbW9zQ29udmVyc2FyXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJib3hWYW1vc0NvbnZlcnNhci10aXRsZVwiPlZhbW9zXHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1tYXJrIHRleHQtbWFyay0ke3ZpZXdDb2xvcn1cIj5Db252ZXJzYXI/PC9zcGFuPiA7KTwvaDI+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImJveFZhbW9zQ29udmVyc2FyLWZvcm1cIiByb2xlPVwiZm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLW9mZnNldC0xIGNvbC1sZy0zIGNvbC1tZC01IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJib3hWYW1vc0NvbnZlcnNhci1pbWcgbWItN1wiIHNyYz1cIi4vaW1nL3Bvc3Rib3guc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTcgY29sLW1kLTcgY29sLXhzLTEyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtQ29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtQ29udHJvbC1sYWJlbFwiPk5vbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtQ29udHJvbC1pbnB1dCBmb3JtQ29udHJvbC1pbnB1dC0ke3ZpZXdDb2xvcn1cIiBwbGFjZWhvbGRlcj1cIkV4OiBKb8Ojb3ppbmhvXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtQ29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtQ29udHJvbC1sYWJlbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybUNvbnRyb2wtaW5wdXQgZm9ybUNvbnRyb2wtaW5wdXQtJHt2aWV3Q29sb3J9XCIgcGxhY2Vob2xkZXI9XCJzZXVlbWFpbEBlbWFpbC5jb21cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1Db250cm9sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm1Db250cm9sLWxhYmVsXCI+TWVuc2FnZW08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiByZXF1aXJlZCBjbGFzcz1cImZvcm1Db250cm9sLWlucHV0IGZvcm1Db250cm9sLWlucHV0LSR7dmlld0NvbG9yfVwiIHBsYWNlaG9sZGVyPVwiKDAwKSAwMDAwMC0wMDAwXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJib3hWYW1vc0NvbnZlcnNhci1mb3JtLWJ0bkVudmlhciBidG4gYnRuLWZpbGwtJHt2aWV3Q29sb3J9XCIgdHlwZT1cImJ1dHRvblwiPkVudmlhcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYm94VmFtb3NDb252ZXJzYXItZm9ybS1idG5FbnZpYXIgYnRuIGJ0bi1vdXRsaW5lLXJlc2V0XCIgdHlwZT1cInJlc2V0XCI+TGltcGFyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbn0iLCJmdW5jdGlvbiBnZXRDb21vRnVuY2lvbmEodmlldykge1xyXG4gICBpZiAodmlldyAhPSAncG9ydGZvbGlvJyAmJiB2aWV3ICE9ICdzb2JyZW5vcycgJiYgdmlldyAhPSAnY29udGF0bycpe1xyXG4gICAgICB2YXIgdmlld0NsYXNzID0gZ2V0Vmlld0NvbG9yKHZpZXcpO1xyXG4gICAgICBpZiAodmlld0NsYXNzID09IFwiI2ZiOGMwMFwiKVxyXG4gICAgICAgICB2aWV3Q2xhc3MgPSBcIjExYXJ0XCI7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICAgdmlld0NsYXNzID0gdmlldztcclxuXHJcbiAgICAgIHJldHVybiBgXHJcbiAgICAgIDxociBpZD1cImNvbnRhaW5lcl9jb21vRnVuY2lvbmFcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBwYi04IHB0LTVcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImJveENvbW9GdW5jaW9uYVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLXRpdGxlIGFuaW1hdGlvbi1kZWZhdWx0IHBiLThcIj5Db21vIGZ1bmNpb25hPyA8c3BhbiBjbGFzcz1cInRleHQtbWFyayB0ZXh0LW1hcmstJHt2aWV3Q2xhc3N9XCI+w4kgYmVtIHNpbXBsZXMhPC9zcGFuPjwvaDI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC00IGJveENvbW9GdW5jaW9uYS1tbCBhbmltYXRpb24tY29tb0Z1bmNpb25hXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtY2lyY2xlIGJveENvbW9GdW5jaW9uYS1jaXJjbGUtJHt2aWV3Q2xhc3N9XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWNpcmNsZS0ke3ZpZXdDbGFzc30taW1nIGZhIGZhLTV4IGZhLXNtaWxlLW9cIj48L2k+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvbi10aXRsZSBtYi0wXCI+MSAtIENvbnRhIHByYSBnZW50ZSE8L2g0PlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvbi1zdWJ0aXRsZSBtdC0wXCI+UHJpbWVpcm8gdm9jw6ogdmFpIGRpemVyIGRvIHF1ZSBwcmVjaXNhISBCYW5uZXIsIGNhcnTDo28sIGZhY2Vib29rLCBwYW5mbGV0byAoLi4uKTwvcD4gICBcclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC00IGFuaW1hdGlvbi1jb21vRnVuY2lvbmFcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1jaXJjbGUgYm94Q29tb0Z1bmNpb25hLWNpcmNsZS0ke3ZpZXdDbGFzc31cIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtY2lyY2xlLSR7dmlld0NsYXNzfS1pbWcgZmEgZmEtNXggZmEtcGVuY2lsXCI+PC9pPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtZGVzY3JpcHRpb24tdGl0bGUgbWItMFwiPjIgLSBQcmltZWlybyBlc2Jvw6dvPC9oND5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtZGVzY3JpcHRpb24tc3VidGl0bGUgbXQtMFwiPlZhbW9zIHByZXBhcmFyIGUgYXByZXNlbnRhciB1bSBlc2Jvw6dvIGRvIHF1ZSBwbGFuZWphbW9zIGZhemVyLCA8c3BhbiBjbGFzcz1cImZ3LTcwMFwiPnNlbSBwYWdhbWVudG8gaW5pY2lhbC48L3NwYW4+PC9wPiAgIFxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTMgY29sLW1kLTQgYW5pbWF0aW9uLWNvbW9GdW5jaW9uYVwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWNpcmNsZSBib3hDb21vRnVuY2lvbmEtY2lyY2xlLSR7dmlld0NsYXNzfVwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1jaXJjbGUtJHt2aWV3Q2xhc3N9LWltZyBmYSBmYS01eCBmYS1zdGFyLW9cIj48L2k+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvbi10aXRsZSBtYi0wXCI+MyAtIEFwcm92YWRvITwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWRlc2NyaXB0aW9uLXN1YnRpdGxlIG10LTBcIj5Db20gbyBlc2Jvw6dvIGFwcm92YWRvLCBpcmVtb3MgZGFyIGNvbnRpbnVpZGFkZSBhbyBwcm9qZXRvIC4uLi4uLi4gPC9wPiAgIFxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgIH1cclxuICAgZWxzZVxyXG4gICAgICByZXR1cm4gJyc7XHJcbn07IiwiZnVuY3Rpb24gZ2V0TW9kdWxvVmlldyAodmlldykge1xyXG4gICBpZiAodmlldyA9PSAnM2QnIHx8IHZpZXcgPT0gJ2Rlc2lnbicgfHwgdmlldyA9PSAndmlkZW8nIHx8IHZpZXcgPT0gJ3dlYicpe1xyXG4gICAgICBcclxuICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgICAgICBpbWc6ICcnLFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBbIERFU0lHTiBdXHJcbiAgICAgIGlmKHZpZXcgPT0gXCJkZXNpZ25cIil7XHJcbiAgICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRGVzaWduIEdyw6FmaWNvJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJbnZlbnRvcmUgcmF0aW9uZSByZWljaWVuZGlzIHRvdGFtIG9kaW8sIHF1byBkZWxlbml0aSBiZWF0YWUgZWFxdWUgZXhwZWRpdGEgdmVybyBlYSwgb2RpdCBlc3Qgb2ZmaWNpaXMgdGVtcG9yaWJ1cyBhZC4nLFxyXG4gICAgICAgICAgICBpbWc6ICcuL2ltZy9kZXNpZ25fYy5zdmcnLFxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFsgV0VCIF1cclxuICAgICAgZWxzZSBpZih2aWV3ID09IFwid2ViXCIpe1xyXG4gICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1dlYnNpdGUnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEludmVudG9yZSByYXRpb25lIHJlaWNpZW5kaXMgdG90YW0gb2RpbywgcXVvIGRlbGVuaXRpIGJlYXRhZSBlYXF1ZSBleHBlZGl0YSB2ZXJvIGVhLCBvZGl0IGVzdCBvZmZpY2lpcyB0ZW1wb3JpYnVzIGFkLicsXHJcbiAgICAgICAgICAgIGltZzogJy4vaW1nL3dlYl9jLnN2ZycsXHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gWyBWSURFTyBdXHJcbiAgICAgIGVsc2UgaWYodmlldyA9PSBcInZpZGVvXCIpe1xyXG4gICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1Byb2R1w6fDo28gVsOtZGVvJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJbnZlbnRvcmUgcmF0aW9uZSByZWljaWVuZGlzIHRvdGFtIG9kaW8sIHF1byBkZWxlbml0aSBiZWF0YWUgZWFxdWUgZXhwZWRpdGEgdmVybyBlYSwgb2RpdCBlc3Qgb2ZmaWNpaXMgdGVtcG9yaWJ1cyBhZC4nLFxyXG4gICAgICAgICAgICBpbWc6ICcuL2ltZy92aWRlb19jLnN2ZycsXHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gWyAzRCBdXHJcbiAgICAgIGVsc2UgaWYodmlldyA9PSBcIjNkXCIpe1xyXG4gICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ01vZGVsYWdlbSAzRCcsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSW52ZW50b3JlIHJhdGlvbmUgcmVpY2llbmRpcyB0b3RhbSBvZGlvLCBxdW8gZGVsZW5pdGkgYmVhdGFlIGVhcXVlIGV4cGVkaXRhIHZlcm8gZWEsIG9kaXQgZXN0IG9mZmljaWlzIHRlbXBvcmlidXMgYWQuJyxcclxuICAgICAgICAgICAgaW1nOiAnLi9pbWcvM2RfYy5zdmcnLFxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiRXJybyBhbyBpbnNlcmlyIE3Ds2R1bG8uXCIpXHJcblxyXG5cclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgPGFydGljbGUgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBjb2wteHMtMTIgcGFuZWwgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWxlZnQgY29sLW1kLTUgY29sLWxnLTMgY29sLWxnLW9mZnNldC0xIGNvbC14cy0xMiBjb2wtc20tMTIgdGV4dC1jZW50ZXIgXCI+XHJcbiAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJwYW5lbC1sZWZ0LWltZ1wiIHNyYz1cIiR7ZGF0YS5pbWd9XCI+XHJcbiAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInBhbmVsLWxlZnQtdGl0bGUgbWItMFwiPiR7ZGF0YS50aXRsZX08L2gxPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLXJpZ2h0IGNvbC1tZC03IGNvbC1sZy03IGNvbC14cy0xMiBjb2wtc20tMTJcIj5cclxuICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwYW5lbC1yaWdodC1kZXNjcmlwdGlvbiBtdC0wXCI+JHtkYXRhLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtJHt2aWV3fVwiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfY29tb0Z1bmNpb25hJylcIiB0eXBlPVwiYnV0dG9uXCI+Q29tbyBmdW5jaW9uYTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLSR7dmlld30gbWwtMlwiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfbm9zc29zVHJhYmFsaG9zJylcIiB0eXBlPVwiYnV0dG9uXCI+Tm9zc29zIHRyYWJhbGhvczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1maWxsLSR7dmlld30gbWwtMlwiIHJvbGU9XCJidXR0b25cIiBvbmNsaWNrPVwic21vb3RoU2Nyb2xsKCdjb250YWluZXJfdmFtb3NDb252ZXJzYXInKVwiIHR5cGU9XCJidXR0b25cIj5WYW1vcyBjb252ZXJzYXI/PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2FydGljbGU+YDtcclxuICAgfVxyXG4gICBlbHNlXHJcbiAgICAgIHJldHVybiAnJztcclxufTsiLCJmdW5jdGlvbiBnZXROb3Nzb3NUcmFiYWxob3Modmlldykge1xyXG4gICB2YXIgdmlld0NvbG9yID0gZ2V0Vmlld0NvbG9yKHZpZXcpO1xyXG4gICB2YXIgY29sb3JDbGFzcyA9IHZpZXc7XHJcbiAgIHZhciBnYWxlcmlhRm90b3MgPSBbXTtcclxuXHJcbiAgIGlmICh2aWV3Q29sb3IgPT0gXCIjZmI4YzAwXCIpXHJcbiAgICAgIHZpZXdDb2xvciA9IFwiMTFhcnRcIjtcclxuICAgZWxzZVxyXG4gICAgICB2aWV3Q29sb3IgPSB2aWV3O1xyXG5cclxuICAgLy8gWyAzRCBdXHJcbiAgIGlmICh2aWV3ID09IFwiM2RcIilcclxuICAgICAgZ2FsZXJpYUZvdG9zID0gW3tcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfV07XHJcblxyXG5cclxuICAgLy8gWyBWSURFTyBdXHJcbiAgIGVsc2UgaWYgKHZpZXcgPT0gXCJ2aWRlb1wiKVxyXG4gICAgICBnYWxlcmlhRm90b3MgPSBbe1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwNS8xMDA1XCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL2lQMkpHbGlUZHZ3P3JlbD0wXCIsXHJcbiAgICAgICAgIHR5cGU6IFwidmlkZW9cIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwNS8xMDA1XCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL2lQMkpHbGlUZHZ3P3JlbD0wXCIsXHJcbiAgICAgICAgIHR5cGU6IFwidmlkZW9cIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwNS8xMDA1XCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL2lQMkpHbGlUZHZ3P3JlbD0wXCIsXHJcbiAgICAgICAgIHR5cGU6IFwidmlkZW9cIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwNS8xMDA1XCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL2lQMkpHbGlUZHZ3P3JlbD0wXCIsXHJcbiAgICAgICAgIHR5cGU6IFwidmlkZW9cIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfV07XHJcblxyXG5cclxuICAgLy8gWyBERVNJR04gXVxyXG4gICBlbHNlIGlmICh2aWV3ID09IFwiZGVzaWduXCIpXHJcbiAgICAgIGdhbGVyaWFGb3RvcyA9IFt7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH1dO1xyXG5cclxuXHJcbiAgIC8vIFsgV0VCIF1cclxuICAgZWxzZSBpZiAodmlldyA9PSBcIndlYlwiKVxyXG4gICAgICBnYWxlcmlhRm90b3MgPSBbe1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9XTtcclxuXHJcbiAgICAgIC8vIFsgU0VSVknDh09TIF1cclxuICAgICAgZWxzZSBpZiAodmlldyA9PSBcInNlcnZpY29zXCIpe1xyXG4gICAgICBjb2xvckNsYXNzID0gXCIxMWFydFwiOyAvLyBGYXplciBhIGNsYXNzZSBmaWNhciBsYXJhbmphXHJcbiAgICAgIGdhbGVyaWFGb3RvcyA9IFt7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH1dO1xyXG4gICB9XHJcblxyXG4gICBlbHNlIGdhbGVyaWFGb3RvcyA9IFtdOyAvLyBEZWl4YSB2YXppb1xyXG4gICBpZiAoZ2FsZXJpYUZvdG9zLmxlbmd0aCA9PSA0KVxyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICA8aHIgaWQ9XCJjb250YWluZXJfbm9zc29zVHJhYmFsaG9zXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgYW5pbWF0aW9uLWRlZmF1bHRcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBwYi02IHB0LTVcIj5cclxuICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJib3hOb3Nzb3NUcmFiYWxob3NcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImJveE5vc3Nvc1RyYWJhbGhvcy10aXRsZVwiPkFsZ3VucyBkZSA8c3BhbiBjbGFzcz1cInRleHQtbWFyayB0ZXh0LW1hcmstJHtjb2xvckNsYXNzfVwiPm5vc3NvcyB0cmFiYWxob3MhPC9zcGFuPjwvaDI+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnlcIj5cclxuICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC0zIGNvbC14cy02XCI+IFxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtnYWxlcmlhRm90b3NbMF0uc291cmNlfVwiIGRhdGEtc2l6ZT1cIjEwMDB4MTAwMFwiIGRhdGEtdHlwZT1cIiR7Z2FsZXJpYUZvdG9zWzBdLnR5cGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtnYWxlcmlhRm90b3NbMF0uaW1nX3BsYWNlaG9sZGVyfVwiIGFsdD1cIiR7Z2FsZXJpYUZvdG9zWzBdLmltZ19wbGFjZWhvbGRlcl9hbHR9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5LXRleHRcIj4ke2dhbGVyaWFGb3Rvc1swXS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24+JHtnYWxlcmlhRm90b3NbMF0uZGVzY3JpcHRpb259PC9maWdjYXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtMyBjb2wteHMtNlwiPiBcclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7Z2FsZXJpYUZvdG9zWzFdLnNvdXJjZX1cIiBkYXRhLXNpemU9XCIxMDAweDEwMDBcIiBkYXRhLXR5cGU9XCIke2dhbGVyaWFGb3Rvc1sxXS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7Z2FsZXJpYUZvdG9zWzFdLmltZ19wbGFjZWhvbGRlcn1cIiBhbHQ9XCIke2dhbGVyaWFGb3Rvc1sxXS5pbWdfcGxhY2Vob2xkZXJfYWx0fVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheS10ZXh0XCI+JHtnYWxlcmlhRm90b3NbMV0udGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uPiR7Z2FsZXJpYUZvdG9zWzFdLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XHJcblxyXG4gICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY29sLWxnLTMgY29sLW1kLTMgY29sLXhzLTZcIj4gXHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2dhbGVyaWFGb3Rvc1syXS5zb3VyY2V9XCIgZGF0YS1zaXplPVwiMTAwMHgxMDAwXCIgZGF0YS10eXBlPVwiJHtnYWxlcmlhRm90b3NbMl0udHlwZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2dhbGVyaWFGb3Rvc1syXS5pbWdfcGxhY2Vob2xkZXJ9XCIgYWx0PVwiJHtnYWxlcmlhRm90b3NbMl0uaW1nX3BsYWNlaG9sZGVyX2FsdH1cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXktdGV4dFwiPiR7Z2FsZXJpYUZvdG9zWzJdLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbj4ke2dhbGVyaWFGb3Rvc1syXS5kZXNjcmlwdGlvbn08L2ZpZ2NhcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC0zIGNvbC14cy02XCI+IFxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtnYWxlcmlhRm90b3NbM10uc291cmNlfVwiIGRhdGEtc2l6ZT1cIjEwMDB4MTAwMFwiIGRhdGEtdHlwZT1cIiR7Z2FsZXJpYUZvdG9zWzNdLnR5cGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtnYWxlcmlhRm90b3NbM10uaW1nX3BsYWNlaG9sZGVyfVwiIGFsdD1cIiR7Z2FsZXJpYUZvdG9zWzNdLmltZ19wbGFjZWhvbGRlcl9hbHR9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5LXRleHRcIj4ke2dhbGVyaWFGb3Rvc1szXS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24+JHtnYWxlcmlhRm90b3NbM10uZGVzY3JpcHRpb259PC9maWdjYXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgY29sLXhzLTEyIHRleHQtY2VudGVyIG10LTYgcGwtMiBwci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjIXBvcnRmb2xpb1wiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLSR7Y29sb3JDbGFzc30gZmxvYXQtbm9uZV9pXCI+VmVyIG1haXMhPC9idXR0b24+PC9hPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+YDtcclxuICAgZWxzZVxyXG4gICAgICByZXR1cm4gJyc7XHJcbn0iLCJmdW5jdGlvbiBnZXRWaWV3Q29sb3Iodmlldykge1xyXG4gICBpZiAodmlldyA9PSBcImhvbWVcIilcclxuICAgICAgcmV0dXJuIFwiI2ZiOGMwMGJhXCI7XHJcbiAgIGVsc2UgaWYgKHZpZXcgPT0gXCJ3ZWJcIilcclxuICAgICAgcmV0dXJuIFwicmdiKDAsIDEyMiwgMjUwKVwiO1xyXG4gICBlbHNlIGlmICh2aWV3ID09IFwidmlkZW9cIilcclxuICAgICAgcmV0dXJuIFwicmdiKDI1NSwgNTksIDQ4KVwiO1xyXG4gICBlbHNlIGlmICh2aWV3ID09IFwiM2RcIilcclxuICAgICAgcmV0dXJuIFwicmdiKDg4LCA4NiwgMjE0KVwiO1xyXG4gICBlbHNlIGlmICh2aWV3ID09IFwiZGVzaWduXCIpXHJcbiAgICAgIHJldHVybiBcInJnYig3NiwgMjE3LCAxMDApXCI7XHJcbiAgIGVsc2VcclxuICAgICAgcmV0dXJuIFwiI2ZiOGMwMFwiO1xyXG59IiwiZnVuY3Rpb24gbG9hZEhUTUwodmlldywgdHlwZSkge1xuICAgdmFyIGNvbnRhaW5lcnMgPSBpbml0Vmlldyh2aWV3LCB0eXBlKTsgLy8gUGVnYSBvcyBjb250YWluZXJzXG5cbiAgIC8vIEluc2VyZSBubyBIVE1MXG4gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdmJhclwiKS5pbm5lckhUTUwgPSBjb250YWluZXJzLm5hdmJhcjtcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKS5pbm5lckhUTUwgPSBjb250YWluZXJzLm1haW47XG5cbiAgIGluaXRDb21wb25lbnRzKCk7IC8vIEluaWNpYXIgR2FsZXJpYSBlIEFuaW1hw6fDtWVzIHN1YXZlc1xuICAgc21vb3RoU2Nyb2xsKFwibmF2YmFyXCIpOyAvLyBWw6EgcGFyYSBvIHRvcG9cbiAgIGlmICh2aWV3ID09IFwiaG9tZVwiKSBpbml0UGFydGljdWxhc0JHKCk7IGVsc2UgZGVzdHJveVBhcnRpY3VsYXNCRygpOyAvLyBDb25zdHLDs2kvRGVzdHLDs2kgcGFydGljdWxhcyBiYXNlYWRvIHNlIMOpIFwiaG9tZVwiIG91IG7Do29cbiAgIGlmICh2aWV3ID09IFwicG9ydGZvbGlvXCIpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiMTFhcnRcIikuY2xpY2soKTsgLy8gQ2xpY2Egbm8gXCJUb2Rvc1wiIHNlIGZvciBhIHRlbGEgZGUgcG9ydGZvbGlvXG59XG5hbGVydCgnYScpXG4vLyB1c2UgIyEgdG8gaGFzaFxucm91dGVyID0gbmV3IE5hdmlnbyhudWxsLCB0cnVlLCAnIyEnKTtcbnJvdXRlci5vbih7XG4gICAnaG9tZSc6IGxvYWRIVE1MKFwiaG9tZVwiLCBcImhvbWVcIiksXG4gICAnZGVzaWduJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoXCJkZXNpZ25cIiwgXCJtb2R1bG9zXCIpO1xuICAgfSxcbiAgICczZCc6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgICAgIGxvYWRIVE1MKFwiM2RcIiwgXCJtb2R1bG9zXCIpO1xuICAgfSxcbiAgICd3ZWInOiBmdW5jdGlvbiBkZXNpZ24oKSB7XG4gICAgICBsb2FkSFRNTChcIndlYlwiLCBcIm1vZHVsb3NcIik7XG4gICB9LFxuICAgJ3ZpZGVvJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoXCJ2aWRlb1wiLCBcIm1vZHVsb3NcIik7XG4gICB9LFxuICAgJ3NvYnJlbm9zJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoXCJzb2JyZW5vc1wiLCBcIm1lbnVcIik7XG4gICB9LFxuICAgJ2NvbnRhdG8nOiBmdW5jdGlvbiBkZXNpZ24oKSB7XG4gICAgICBsb2FkSFRNTChcImNvbnRhdG9cIiwgXCJtZW51XCIpO1xuICAgfSxcbiAgICdwb3J0Zm9saW8nOiBmdW5jdGlvbiBkZXNpZ24oKSB7XG4gICAgICBsb2FkSFRNTChcInBvcnRmb2xpb1wiLCBcIm1lbnVcIik7XG4gICB9LFxuICAgJ3NlcnZpY29zJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoXCJzZXJ2aWNvc1wiLCBcIm1lbnVcIik7XG4gICB9LFxufSk7XG5cbi8vIHNldCB0aGUgZGVmYXVsdCByb3V0ZVxucm91dGVyLm9uKGZ1bmN0aW9uICgpIHtcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuaW5uZXJIVE1MID0gbG9hZEhUTUwoXCJob21lXCIsIFwiaG9tZVwiKTtcbn0pO1xuXG4vLyBzZXQgdGhlIDQwNCByb3V0ZVxucm91dGVyLm5vdEZvdW5kKGZ1bmN0aW9uIChxdWVyeSkge1xuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKS5pbm5lckhUTUwgPSAnPGgxPlRPRE8gLSBOT1RGT1VORDwvaDE+Jztcbn0pO1xuXG5yb3V0ZXIucmVzb2x2ZSgpOyIsImZ1bmN0aW9uIHBvcnRmb2xpb0ZpbHRyYXIobW9kdWxvKXtcclxuICAgcHJlZW5jaGVCb3Rhbyhtb2R1bG8pO1xyXG4gICBzd2l0Y2ggKG1vZHVsbykge1xyXG4gICAgICBjYXNlIFwiM2RcIjpcclxuICAgICAgICAgbW9udGFHYWxlcmlhKFwiM2RcIiwgZ2V0TW9kdWxvKFwiM2RcIikpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJ2aWRlb1wiOlxyXG4gICAgICAgICBtb250YUdhbGVyaWEoXCJ2aWRlb1wiLCBnZXRNb2R1bG8oXCJ2aWRlb1wiKSk7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBcIndlYlwiOlxyXG4gICAgICAgIG1vbnRhR2FsZXJpYShcIndlYlwiLCBnZXRNb2R1bG8oXCJ3ZWJcIikpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJkZXNpZ25cIjpcclxuICAgICAgICAgbW9udGFHYWxlcmlhKFwiZGVzaWduXCIsIGdldE1vZHVsbyhcImRlc2lnblwiKSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICBcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgdmFyIGxpbmtzTW9kdWxvc1RPRE9TID0gW2dldE1vZHVsbyhcIjNkXCIpLCBnZXRNb2R1bG8oXCJ2aWRlb1wiKSwgZ2V0TW9kdWxvKFwid2ViXCIpLCBnZXRNb2R1bG8oXCJkZXNpZ25cIildO1xyXG4gICAgICAgICBtb250YUdhbGVyaWFUb2RvcyhsaW5rc01vZHVsb3NUT0RPUyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vbnRhR2FsZXJpYShtb2R1bG8sIGxpbmtzKXtcclxuICAgdmFyIHRlbXBsYXRlX2ZpbmFsID0gJyc7XHJcbiAgIFxyXG4gICBsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICB0ZW1wbGF0ZV9maW5hbCArPSBcclxuICAgICAgYFxyXG4gICAgICA8ZmlndXJlIGNsYXNzPVwiY29sLWxnLTMgY29sLW1kLTMgY29sLXhzLTYgZ2FsbGVyeS0ke21vZHVsb30gYW5pbWF0ZWQgZmFkZUluXCI+XHJcbiAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0uaW1nfVwiIGRhdGEtc2l6ZT1cIjEwMDB4MTAwMFwiPlxyXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiZ2FsbGVyeS0ke21vZHVsb30taW1nXCIgc3JjPVwiJHtpdGVtLm1pbmlJbWd9XCIgYWx0PVwiJHtpdGVtLmFsdH1cIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5XCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXktdGV4dFwiPiR7aXRlbS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIDwvYT5cclxuICAgICAgICAgPGZpZ2NhcHRpb24+JHtpdGVtLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgPC9maWd1cmU+XHJcbiAgICAgIGA7XHJcbiAgIH0pO1xyXG5cclxuICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKS5pbm5lckhUTUwgPSB0ZW1wbGF0ZV9maW5hbDtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9udGFHYWxlcmlhVG9kb3MobGlua3Mpe1xyXG4gICB2YXIgdGVtcGxhdGVfZmluYWwgPSAnJztcclxuXHJcbiAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24oZWwsIGluZGV4KXtcclxuICAgICAgdmFyIG1vZHVsbyA9ICcnO1xyXG4gICAgICBpZihpbmRleCA9PSAwKSBtb2R1bG8gPSBcIjNkXCI7XHJcbiAgICAgIGVsc2UgaWYoaW5kZXggPT0gMSkgbW9kdWxvID0gXCJ2aWRlb1wiO1xyXG4gICAgICBlbHNlIGlmKGluZGV4ID09IDIpIG1vZHVsbyA9IFwid2ViXCI7XHJcbiAgICAgIGVsc2UgbW9kdWxvID0gXCJkZXNpZ25cIjtcclxuXHJcbiAgICAgIGVsLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgIHRlbXBsYXRlX2ZpbmFsICs9IFxyXG4gICAgICAgICBgXHJcbiAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtMyBjb2wteHMtNiBnYWxsZXJ5LSR7bW9kdWxvfSBhbmltYXRlZCBmYWRlSW5cIj5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIiR7aXRlbS5pbWd9XCIgZGF0YS1zaXplPVwiMTAwMHgxMDAwXCI+XHJcbiAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJnYWxsZXJ5LSR7bW9kdWxvfS1pbWdcIiBzcmM9XCIke2l0ZW0ubWluaUltZ31cIiBhbHQ9XCIke2l0ZW0uYWx0fVwiIC8+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheS10ZXh0XCI+JHtpdGVtLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8ZmlnY2FwdGlvbj4ke2l0ZW0uZGVzY3JpcHRpb259PC9maWdjYXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICA8L2ZpZ3VyZT5cclxuICAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgIH0pO1xyXG5cclxuICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKS5pbm5lckhUTUwgPSB0ZW1wbGF0ZV9maW5hbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TW9kdWxvKG1vZHVsbyl7XHJcbiAgIC8vIDNEXHJcbiAgIGlmKG1vZHVsbyA9PSBcIjNkXCIpXHJcbiAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICBpbWc6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwMC8xMDAzXCIsXHJcbiAgICAgICAgIG1pbmlJbWc6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwMC8xMDAzXCIsXHJcbiAgICAgICAgIGFsdDogXCJ0ZXN0ZVwiLFxyXG4gICAgICAgICB0aXRsZTogXCJ0aXR1bG9cIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb25cIlxyXG4gICAgICB9XTtcclxuXHJcbiAgIC8vIFbDjURFT1xyXG4gICBpZihtb2R1bG8gPT0gXCJ2aWRlb1wiKVxyXG4gICAgICByZXR1cm4gW3tcclxuICAgICAgICAgaW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwNVwiLFxyXG4gICAgICAgICBtaW5pSW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwNVwiLFxyXG4gICAgICAgICBhbHQ6IFwidGVzdGVcIixcclxuICAgICAgICAgdGl0bGU6IFwidGl0dWxvXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uXCJcclxuICAgICAgfV07XHJcblxyXG4gICAvLyBXRUJcclxuICAgaWYobW9kdWxvID09IFwid2ViXCIpXHJcbiAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICBpbWc6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwMC8xMDA0XCIsXHJcbiAgICAgICAgIG1pbmlJbWc6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwMC8xMDA0XCIsXHJcbiAgICAgICAgIGFsdDogXCJ0ZXN0ZVwiLFxyXG4gICAgICAgICB0aXRsZTogXCJ0aXR1bG9cIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb25cIlxyXG4gICAgICB9XTtcclxuXHJcbiAgIC8vIERFU0lHTlxyXG4gICBpZihtb2R1bG8gPT0gXCJkZXNpZ25cIilcclxuICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgIGltZzogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDAwLzEwMDFcIixcclxuICAgICAgICAgbWluaUltZzogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDAwLzEwMDFcIixcclxuICAgICAgICAgYWx0OiBcInRlc3RlXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcInRpdHVsb1wiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICAgaW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwMlwiLFxyXG4gICAgICAgICBtaW5pSW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwMlwiLFxyXG4gICAgICAgICBhbHQ6IFwidGVzdGVcIixcclxuICAgICAgICAgdGl0bGU6IFwidGl0dWxvXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uXCJcclxuICAgICAgfV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZWVuY2hlQm90YW8obW9kdWxvKXtcclxuICAgLy8gUmVtb3ZlIGEgY2xhc3NlIGRlIHRvZG9zIG9zIGJvdMO1ZXNcclxuICAgW1wiM2RcIiwgXCJkZXNpZ25cIiwgXCJ3ZWJcIiwgXCJ2aWRlb1wiLCBcIjExYXJ0XCJdLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2l0ZW19YCkuY2xhc3NMaXN0LnJlbW92ZShgYnRuLWZpbGwtJHtpdGVtfWApO1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtfWApLmNsYXNzTGlzdC5yZW1vdmUoYGJ0bi1vdXRsaW5lLSR7aXRlbX1gKTtcclxuICAgfSk7XHJcblxyXG5cclxuXHJcbiAgIC8vIEFkaWNpb25hIGEgY2xhc3NlIG5vIG3Ds2R1bG8gY2xpY2Fkb1xyXG4gICBbXCIzZFwiLCBcImRlc2lnblwiLCBcIndlYlwiLCBcInZpZGVvXCIsIFwiMTFhcnRcIl0uZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgaWYoaXRlbSA9PSBtb2R1bG8pXHJcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2l0ZW19YCkuY2xhc3NMaXN0LmFkZChgYnRuLWZpbGwtJHtpdGVtfWApO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2l0ZW19YCkuY2xhc3NMaXN0LmFkZChgYnRuLW91dGxpbmUtJHtpdGVtfWApO1xyXG4gICB9KTtcclxufSJdfQ==
