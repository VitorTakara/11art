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

function initView(view){
   var navbar = getNavBar(view);
   var vamosConversar = getVamosConversar(view);
   var nossosTrabalhos = getNossosTrabalhos(view);
   var comoFunciona = getComoFunciona(view);
   var footer = getFooter(view);
   var modulo = getModuloView(view);

   return {
      navbar: navbar,
      main: modulo + comoFunciona + nossosTrabalhos + vamosConversar + footer
   };
}
function getFooter(view) {
   if (view != 'home')
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
   else
      return '';
};
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

   if (view != 'home')
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
   else
      return '';
}
function getComoFunciona(view) {
   if (view != 'home' && view != 'portfolio' && view != 'sobrenos' && view != 'contato'){
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
function loadHTML(url, view) {
  if(view == '3d' || view == 'design' || view == 'video' || view == 'web'){
   initWithoutFetch("modulos", view);
  }
  else{
   initFetch(url, view);
  }


}

function initWithoutFetch(page, view){
   var containers = initView(view); // Pega os containers

   // Insere no HTML
   document.getElementById("navbar").innerHTML = containers.navbar;
   document.getElementById("main").innerHTML = containers.main;
   initAfterLoadHTML(view);
}

function initFetch(url, view){
   fetch(url)
      .then(function(response) { return response.text(); })
      .then(function(data){
         var containers = initView(view); // Pega os containers

         // Insere no HTML
         document.getElementById("navbar").innerHTML = containers.navbar;
         document.getElementById("main").innerHTML = data + containers.main;
         initAfterLoadHTML(view);
      })
      .catch(function(data) {
         throw new Error(data);
      });
   };

function initAfterLoadHTML(view){
   initComponents(); // Iniciar Galeria e Animações suaves
   smoothScroll("navbar"); // Vá para o topo
   view == "home" ? initParticulasBG() : destroyParticulasBG(); // Constrói/Destrói particulas baseado se é "home" ou não
   if (view == "portfolio") document.getElementById("11art").click(); // Clica no "Todos" se for a tela de portfolio
}

// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
   'home': function home() {
      loadHTML('./home.html', "home");
   },
   'design': function design() {
      loadHTML('./design.html', "design");
   },
   '3d': function design() {
      loadHTML('./3d.html', "3d");
   },
   'web': function design() {
      loadHTML('./web.html', "web");
   },
   'video': function design() {
      loadHTML('./video.html', "video");
   },
   'sobrenos': function design() {
      loadHTML('./sobrenos.html', "sobrenos");
   },
   'contato': function design() {
      loadHTML('./contato.html', "contato");
   },
   'portfolio': function design() {
      loadHTML('./portfolio.html', "portfolio");
   },
   'servicos': function design() {
      loadHTML('./servicos.html', "servicos");
   },
});

// set the default route
router.on(function () {
   document.getElementById('main').innerHTML = loadHTML('./home.html', 'view', "home");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnby5taW4uanMiLCJwYXJ0aWNsZXMubWluLmpzIiwiZ2FsbGVyeS5qcyIsInNtb290aFNjcm9sbC5qcyIsInBhcnRpY2xlcy5qcyIsImluaXRpYWxpemF0aW9uLmpzIiwiZm9vdGVyLmpzIiwibmF2YmFyLmpzIiwidmFtb3MuY29udmVyc2FyLmpzIiwiY29tby5mdW5jaW9uYS5qcyIsIm1vZHVsby5qcyIsIm5vc3Nvcy50cmFiYWxob3MuanMiLCJ2aWV3Q29sb3IuanMiLCJyb3V0ZUNvbmZpZy5qcyIsInBvcnRmb2xpb0ZpbHRyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOmUuTmF2aWdvPXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9O2Z1bmN0aW9uIHQoKXtyZXR1cm4hKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3d8fCF3aW5kb3cuaGlzdG9yeXx8IXdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSl9ZnVuY3Rpb24gbihlLG4sbyl7dGhpcy5yb290PW51bGwsdGhpcy5fcm91dGVzPVtdLHRoaXMuX3VzZUhhc2g9bix0aGlzLl9oYXNoPXZvaWQgMD09PW8/XCIjXCI6byx0aGlzLl9wYXVzZWQ9ITEsdGhpcy5fZGVzdHJveWVkPSExLHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkPW51bGwsdGhpcy5fbm90Rm91bmRIYW5kbGVyPW51bGwsdGhpcy5fZGVmYXVsdEhhbmRsZXI9bnVsbCx0aGlzLl91c2VQdXNoU3RhdGU9IW4mJnQoKSx0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlPXRoaXMuX29uTG9jYXRpb25DaGFuZ2UuYmluZCh0aGlzKSx0aGlzLl9nZW5lcmljSG9va3M9bnVsbCx0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPVwicHVzaFN0YXRlXCIsZT90aGlzLnJvb3Q9bj9lLnJlcGxhY2UoL1xcLyQvLFwiL1wiK3RoaXMuX2hhc2gpOmUucmVwbGFjZSgvXFwvJC8sXCJcIik6biYmKHRoaXMucm9vdD10aGlzLl9jTG9jKCkuc3BsaXQodGhpcy5faGFzaClbMF0ucmVwbGFjZSgvXFwvJC8sXCIvXCIrdGhpcy5faGFzaCkpLHRoaXMuX2xpc3RlbigpLHRoaXMudXBkYXRlUGFnZUxpbmtzKCl9ZnVuY3Rpb24gbyhlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIFJlZ0V4cD9lOmUucmVwbGFjZSgvXFwvKyQvLFwiXCIpLnJlcGxhY2UoL15cXC8rLyxcIl4vXCIpfWZ1bmN0aW9uIGkoZSl7cmV0dXJuIGUucmVwbGFjZSgvXFwvJC8sXCJcIikuc3BsaXQoXCIvXCIpLmxlbmd0aH1mdW5jdGlvbiBzKGUsdCl7cmV0dXJuIGkodCktaShlKX1mdW5jdGlvbiByKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybihhcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06W10pLm1hcChmdW5jdGlvbih0KXt2YXIgaT1mdW5jdGlvbihlKXt2YXIgdD1bXTtyZXR1cm57cmVnZXhwOmUgaW5zdGFuY2VvZiBSZWdFeHA/ZTpuZXcgUmVnRXhwKGUucmVwbGFjZShuLlBBUkFNRVRFUl9SRUdFWFAsZnVuY3Rpb24oZSxvLGkpe3JldHVybiB0LnB1c2goaSksbi5SRVBMQUNFX1ZBUklBQkxFX1JFR0VYUH0pLnJlcGxhY2Uobi5XSUxEQ0FSRF9SRUdFWFAsbi5SRVBMQUNFX1dJTERDQVJEKStuLkZPTExPV0VEX0JZX1NMQVNIX1JFR0VYUCxuLk1BVENIX1JFR0VYUF9GTEFHUykscGFyYW1OYW1lczp0fX0obyh0LnJvdXRlKSkscz1pLnJlZ2V4cCxyPWkucGFyYW1OYW1lcyxhPWUucmVwbGFjZSgvXlxcLysvLFwiL1wiKS5tYXRjaChzKSxoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIDA9PT10Lmxlbmd0aD9udWxsOmU/ZS5zbGljZSgxLGUubGVuZ3RoKS5yZWR1Y2UoZnVuY3Rpb24oZSxuLG8pe3JldHVybiBudWxsPT09ZSYmKGU9e30pLGVbdFtvXV09ZGVjb2RlVVJJQ29tcG9uZW50KG4pLGV9LG51bGwpOm51bGx9KGEscik7cmV0dXJuISFhJiZ7bWF0Y2g6YSxyb3V0ZTp0LHBhcmFtczpofX0pLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZX0pfShlLHQpWzBdfHwhMX1mdW5jdGlvbiBhKGUsdCl7dmFyIG49dC5tYXAoZnVuY3Rpb24odCl7cmV0dXJuXCJcIj09PXQucm91dGV8fFwiKlwiPT09dC5yb3V0ZT9lOmUuc3BsaXQobmV3IFJlZ0V4cCh0LnJvdXRlK1wiKCR8LylcIikpWzBdfSksaT1vKGUpO3JldHVybiBuLmxlbmd0aD4xP24ucmVkdWNlKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUubGVuZ3RoPnQubGVuZ3RoJiYoZT10KSxlfSxuWzBdKToxPT09bi5sZW5ndGg/blswXTppfWZ1bmN0aW9uIGgoZSxuLG8pe3ZhciBpLHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3BsaXQoL1xcPyguKik/JC8pWzBdfTtyZXR1cm4gdm9pZCAwPT09byYmKG89XCIjXCIpLHQoKSYmIW4/cyhlKS5zcGxpdChvKVswXTooaT1lLnNwbGl0KG8pKS5sZW5ndGg+MT9zKGlbMV0pOnMoaVswXSl9ZnVuY3Rpb24gdSh0LG4sbyl7aWYobiYmXCJvYmplY3RcIj09PSh2b2lkIDA9PT1uP1widW5kZWZpbmVkXCI6ZShuKSkpe2lmKG4uYmVmb3JlKXJldHVybiB2b2lkIG4uYmVmb3JlKGZ1bmN0aW9uKCl7KCEoYXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0pfHxhcmd1bWVudHNbMF0pJiYodCgpLG4uYWZ0ZXImJm4uYWZ0ZXIobykpfSxvKTtpZihuLmFmdGVyKXJldHVybiB0KCksdm9pZChuLmFmdGVyJiZuLmFmdGVyKG8pKX10KCl9cmV0dXJuIG4ucHJvdG90eXBlPXtoZWxwZXJzOnttYXRjaDpyLHJvb3Q6YSxjbGVhbjpvLGdldE9ubHlVUkw6aH0sbmF2aWdhdGU6ZnVuY3Rpb24oZSx0KXt2YXIgbjtyZXR1cm4gZT1lfHxcIlwiLHRoaXMuX3VzZVB1c2hTdGF0ZT8obj0obj0odD9cIlwiOnRoaXMuX2dldFJvb3QoKStcIi9cIikrZS5yZXBsYWNlKC9eXFwvKy8sXCIvXCIpKS5yZXBsYWNlKC8oW146XSkoXFwvezIsfSkvZyxcIiQxL1wiKSxoaXN0b3J5W3RoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2RdKHt9LFwiXCIsbiksdGhpcy5yZXNvbHZlKCkpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJihlPWUucmVwbGFjZShuZXcgUmVnRXhwKFwiXlwiK3RoaXMuX2hhc2gpLFwiXCIpLHdpbmRvdy5sb2NhdGlvbi5ocmVmPXdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMkLyxcIlwiKS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5faGFzaCtcIi4qJFwiKSxcIlwiKSt0aGlzLl9oYXNoK2UpLHRoaXN9LG9uOmZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMsbj1hcmd1bWVudHMubGVuZ3RoLG89QXJyYXkobiksaT0wO2k8bjtpKyspb1tpXT1hcmd1bWVudHNbaV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygb1swXSl0aGlzLl9kZWZhdWx0SGFuZGxlcj17aGFuZGxlcjpvWzBdLGhvb2tzOm9bMV19O2Vsc2UgaWYoby5sZW5ndGg+PTIpaWYoXCIvXCI9PT1vWzBdKXt2YXIgcj1vWzFdO1wib2JqZWN0XCI9PT1lKG9bMV0pJiYocj1vWzFdLnVzZXMpLHRoaXMuX2RlZmF1bHRIYW5kbGVyPXtoYW5kbGVyOnIsaG9va3M6b1syXX19ZWxzZSB0aGlzLl9hZGQob1swXSxvWzFdLG9bMl0pO2Vsc2VcIm9iamVjdFwiPT09ZShvWzBdKSYmT2JqZWN0LmtleXMob1swXSkuc29ydChzKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Qub24oZSxvWzBdW2VdKX0pO3JldHVybiB0aGlzfSxvZmY6ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPT10aGlzLl9kZWZhdWx0SGFuZGxlciYmZT09PXRoaXMuX2RlZmF1bHRIYW5kbGVyLmhhbmRsZXI/dGhpcy5fZGVmYXVsdEhhbmRsZXI9bnVsbDpudWxsIT09dGhpcy5fbm90Rm91bmRIYW5kbGVyJiZlPT09dGhpcy5fbm90Rm91bmRIYW5kbGVyLmhhbmRsZXImJih0aGlzLl9ub3RGb3VuZEhhbmRsZXI9bnVsbCksdGhpcy5fcm91dGVzPXRoaXMuX3JvdXRlcy5yZWR1Y2UoZnVuY3Rpb24odCxuKXtyZXR1cm4gbi5oYW5kbGVyIT09ZSYmdC5wdXNoKG4pLHR9LFtdKSx0aGlzfSxub3RGb3VuZDpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLl9ub3RGb3VuZEhhbmRsZXI9e2hhbmRsZXI6ZSxob29rczp0fSx0aGlzfSxyZXNvbHZlOmZ1bmN0aW9uKGUpe3ZhciBuLG8saT10aGlzLHM9KGV8fHRoaXMuX2NMb2MoKSkucmVwbGFjZSh0aGlzLl9nZXRSb290KCksXCJcIik7dGhpcy5fdXNlSGFzaCYmKHM9cy5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeL1wiK3RoaXMuX2hhc2gpLFwiL1wiKSk7dmFyIGE9ZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3BsaXQoL1xcPyguKik/JC8pLnNsaWNlKDEpLmpvaW4oXCJcIil9KGV8fHRoaXMuX2NMb2MoKSksbD1oKHMsdGhpcy5fdXNlSGFzaCx0aGlzLl9oYXNoKTtyZXR1cm4hdGhpcy5fcGF1c2VkJiYodGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQmJmw9PT10aGlzLl9sYXN0Um91dGVSZXNvbHZlZC51cmwmJmE9PT10aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5xdWVyeT8odGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MmJnRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLmhvb2tzLmFscmVhZHkmJnRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLmhvb2tzLmFscmVhZHkodGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQucGFyYW1zKSwhMSk6KG89cihsLHRoaXMuX3JvdXRlcykpPyh0aGlzLl9jYWxsTGVhdmUoKSx0aGlzLl9sYXN0Um91dGVSZXNvbHZlZD17dXJsOmwscXVlcnk6YSxob29rczpvLnJvdXRlLmhvb2tzLHBhcmFtczpvLnBhcmFtcyxuYW1lOm8ucm91dGUubmFtZX0sbj1vLnJvdXRlLmhhbmRsZXIsdShmdW5jdGlvbigpe3UoZnVuY3Rpb24oKXtvLnJvdXRlLnJvdXRlIGluc3RhbmNlb2YgUmVnRXhwP24uYXBwbHkodm9pZCAwLG8ubWF0Y2guc2xpY2UoMSxvLm1hdGNoLmxlbmd0aCkpOm4oby5wYXJhbXMsYSl9LG8ucm91dGUuaG9va3Msby5wYXJhbXMsaS5fZ2VuZXJpY0hvb2tzKX0sdGhpcy5fZ2VuZXJpY0hvb2tzLG8ucGFyYW1zKSxvKTp0aGlzLl9kZWZhdWx0SGFuZGxlciYmKFwiXCI9PT1sfHxcIi9cIj09PWx8fGw9PT10aGlzLl9oYXNofHxmdW5jdGlvbihlLG4sbyl7aWYodCgpJiYhbilyZXR1cm4hMTtpZighZS5tYXRjaChvKSlyZXR1cm4hMTt2YXIgaT1lLnNwbGl0KG8pO3JldHVybiBpLmxlbmd0aDwyfHxcIlwiPT09aVsxXX0obCx0aGlzLl91c2VIYXNoLHRoaXMuX2hhc2gpKT8odShmdW5jdGlvbigpe3UoZnVuY3Rpb24oKXtpLl9jYWxsTGVhdmUoKSxpLl9sYXN0Um91dGVSZXNvbHZlZD17dXJsOmwscXVlcnk6YSxob29rczppLl9kZWZhdWx0SGFuZGxlci5ob29rc30saS5fZGVmYXVsdEhhbmRsZXIuaGFuZGxlcihhKX0saS5fZGVmYXVsdEhhbmRsZXIuaG9va3MpfSx0aGlzLl9nZW5lcmljSG9va3MpLCEwKToodGhpcy5fbm90Rm91bmRIYW5kbGVyJiZ1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe2kuX2NhbGxMZWF2ZSgpLGkuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOmkuX25vdEZvdW5kSGFuZGxlci5ob29rc30saS5fbm90Rm91bmRIYW5kbGVyLmhhbmRsZXIoYSl9LGkuX25vdEZvdW5kSGFuZGxlci5ob29rcyl9LHRoaXMuX2dlbmVyaWNIb29rcyksITEpKX0sZGVzdHJveTpmdW5jdGlvbigpe3RoaXMuX3JvdXRlcz1bXSx0aGlzLl9kZXN0cm95ZWQ9ITAsdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ9bnVsbCx0aGlzLl9nZW5lcmljSG9va3M9bnVsbCxjbGVhclRpbWVvdXQodGhpcy5fbGlzdGVuaW5nSW50ZXJ2YWwpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsdGhpcy5fb25Mb2NhdGlvbkNoYW5nZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsdGhpcy5fb25Mb2NhdGlvbkNoYW5nZSkpfSx1cGRhdGVQYWdlTGlua3M6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO1widW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCYmdGhpcy5fZmluZExpbmtzKCkuZm9yRWFjaChmdW5jdGlvbih0KXt0Lmhhc0xpc3RlbmVyQXR0YWNoZWR8fCh0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKG4pe2lmKChuLmN0cmxLZXl8fG4ubWV0YUtleSkmJlwiYVwiPT1uLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpcmV0dXJuITE7dmFyIG89ZS5nZXRMaW5rUGF0aCh0KTtlLl9kZXN0cm95ZWR8fChuLnByZXZlbnREZWZhdWx0KCksZS5uYXZpZ2F0ZShvLnJlcGxhY2UoL1xcLyskLyxcIlwiKS5yZXBsYWNlKC9eXFwvKy8sXCIvXCIpKSl9KSx0Lmhhc0xpc3RlbmVyQXR0YWNoZWQ9ITApfSl9LGdlbmVyYXRlOmZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxuPXRoaXMuX3JvdXRlcy5yZWR1Y2UoZnVuY3Rpb24obixvKXt2YXIgaTtpZihvLm5hbWU9PT1lKWZvcihpIGluIG49by5yb3V0ZSx0KW49bi50b1N0cmluZygpLnJlcGxhY2UoXCI6XCIraSx0W2ldKTtyZXR1cm4gbn0sXCJcIik7cmV0dXJuIHRoaXMuX3VzZUhhc2g/dGhpcy5faGFzaCtuOm59LGxpbms6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2dldFJvb3QoKStlfSxwYXVzZTpmdW5jdGlvbigpe3ZhciBlPSEoYXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0pfHxhcmd1bWVudHNbMF07dGhpcy5fcGF1c2VkPWUsdGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZD1lP1wicmVwbGFjZVN0YXRlXCI6XCJwdXNoU3RhdGVcIn0scmVzdW1lOmZ1bmN0aW9uKCl7dGhpcy5wYXVzZSghMSl9LGhpc3RvcnlBUElVcGRhdGVNZXRob2Q6ZnVuY3Rpb24oZSl7cmV0dXJuIHZvaWQgMD09PWU/dGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZDoodGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZD1lLGUpfSxkaXNhYmxlSWZBUElOb3RBdmFpbGFibGU6ZnVuY3Rpb24oKXt0KCl8fHRoaXMuZGVzdHJveSgpfSxsYXN0Um91dGVSZXNvbHZlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9sYXN0Um91dGVSZXNvbHZlZH0sZ2V0TGlua1BhdGg6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX0saG9va3M6ZnVuY3Rpb24oZSl7dGhpcy5fZ2VuZXJpY0hvb2tzPWV9LF9hZGQ6ZnVuY3Rpb24odCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOm51bGwsbz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06bnVsbDtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9ZW5jb2RlVVJJKHQpKSx0aGlzLl9yb3V0ZXMucHVzaChcIm9iamVjdFwiPT09KHZvaWQgMD09PW4/XCJ1bmRlZmluZWRcIjplKG4pKT97cm91dGU6dCxoYW5kbGVyOm4udXNlcyxuYW1lOm4uYXMsaG9va3M6b3x8bi5ob29rc306e3JvdXRlOnQsaGFuZGxlcjpuLGhvb2tzOm99KSx0aGlzLl9hZGR9LF9nZXRSb290OmZ1bmN0aW9uKCl7cmV0dXJuIG51bGwhPT10aGlzLnJvb3Q/dGhpcy5yb290Oih0aGlzLnJvb3Q9YSh0aGlzLl9jTG9jKCkuc3BsaXQoXCI/XCIpWzBdLHRoaXMuX3JvdXRlcyksdGhpcy5yb290KX0sX2xpc3RlbjpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYodGhpcy5fdXNlUHVzaFN0YXRlKXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJlwib25oYXNoY2hhbmdlXCJpbiB3aW5kb3cpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsdGhpcy5fb25Mb2NhdGlvbkNoYW5nZSk7ZWxzZXt2YXIgdD10aGlzLl9jTG9jKCksbj12b2lkIDAsbz12b2lkIDA7KG89ZnVuY3Rpb24oKXtuPWUuX2NMb2MoKSx0IT09biYmKHQ9bixlLnJlc29sdmUoKSksZS5fbGlzdGVuaW5nSW50ZXJ2YWw9c2V0VGltZW91dChvLDIwMCl9KSgpfX0sX2NMb2M6ZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3ZvaWQgMCE9PXdpbmRvdy5fX05BVklHT19XSU5ET1dfTE9DQVRJT05fTU9DS19fP3dpbmRvdy5fX05BVklHT19XSU5ET1dfTE9DQVRJT05fTU9DS19fOm8od2luZG93LmxvY2F0aW9uLmhyZWYpOlwiXCJ9LF9maW5kTGlua3M6ZnVuY3Rpb24oKXtyZXR1cm5bXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1uYXZpZ29dXCIpKX0sX29uTG9jYXRpb25DaGFuZ2U6ZnVuY3Rpb24oKXt0aGlzLnJlc29sdmUoKX0sX2NhbGxMZWF2ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkO2UmJmUuaG9va3MmJmUuaG9va3MubGVhdmUmJmUuaG9va3MubGVhdmUoZS5wYXJhbXMpfX0sbi5QQVJBTUVURVJfUkVHRVhQPS8oWzoqXSkoXFx3KykvZyxuLldJTERDQVJEX1JFR0VYUD0vXFwqL2csbi5SRVBMQUNFX1ZBUklBQkxFX1JFR0VYUD1cIihbXi9dKylcIixuLlJFUExBQ0VfV0lMRENBUkQ9XCIoPzouKilcIixuLkZPTExPV0VEX0JZX1NMQVNIX1JFR0VYUD1cIig/Oi8kfCQpXCIsbi5NQVRDSF9SRUdFWFBfRkxBR1M9XCJcIixufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXZpZ28ubWluLmpzLm1hcFxuIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qIEF1dGhvciA6IFZpbmNlbnQgR2FycmVhdSAgLSB2aW5jZW50Z2FycmVhdS5jb21cbi8qIE1JVCBsaWNlbnNlOiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vKiBEZW1vIC8gR2VuZXJhdG9yIDogdmluY2VudGdhcnJlYXUuY29tL3BhcnRpY2xlcy5qc1xuLyogR2l0SHViIDogZ2l0aHViLmNvbS9WaW5jZW50R2FycmVhdS9wYXJ0aWNsZXMuanNcbi8qIEhvdyB0byB1c2U/IDogQ2hlY2sgdGhlIEdpdEh1YiBSRUFETUVcbi8qIHYyLjAuMFxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmZ1bmN0aW9uIGhleFRvUmdiKGUpe3ZhciBhPS9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2k7ZT1lLnJlcGxhY2UoYSxmdW5jdGlvbihlLGEsdCxpKXtyZXR1cm4gYSthK3QrdCtpK2l9KTt2YXIgdD0vXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoZSk7cmV0dXJuIHQ/e3I6cGFyc2VJbnQodFsxXSwxNiksZzpwYXJzZUludCh0WzJdLDE2KSxiOnBhcnNlSW50KHRbM10sMTYpfTpudWxsfWZ1bmN0aW9uIGNsYW1wKGUsYSx0KXtyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgoZSxhKSx0KX1mdW5jdGlvbiBpc0luQXJyYXkoZSxhKXtyZXR1cm4gYS5pbmRleE9mKGUpPi0xfXZhciBwSlM9ZnVuY3Rpb24oZSxhKXt2YXIgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiK2UrXCIgPiAucGFydGljbGVzLWpzLWNhbnZhcy1lbFwiKTt0aGlzLnBKUz17Y2FudmFzOntlbDp0LHc6dC5vZmZzZXRXaWR0aCxoOnQub2Zmc2V0SGVpZ2h0fSxwYXJ0aWNsZXM6e251bWJlcjp7dmFsdWU6NDAwLGRlbnNpdHk6e2VuYWJsZTohMCx2YWx1ZV9hcmVhOjgwMH19LGNvbG9yOnt2YWx1ZTpcIiNmZmZcIn0sc2hhcGU6e3R5cGU6XCJjaXJjbGVcIixzdHJva2U6e3dpZHRoOjAsY29sb3I6XCIjZmYwMDAwXCJ9LHBvbHlnb246e25iX3NpZGVzOjV9LGltYWdlOntzcmM6XCJcIix3aWR0aDoxMDAsaGVpZ2h0OjEwMH19LG9wYWNpdHk6e3ZhbHVlOjEscmFuZG9tOiExLGFuaW06e2VuYWJsZTohMSxzcGVlZDoyLG9wYWNpdHlfbWluOjAsc3luYzohMX19LHNpemU6e3ZhbHVlOjIwLHJhbmRvbTohMSxhbmltOntlbmFibGU6ITEsc3BlZWQ6MjAsc2l6ZV9taW46MCxzeW5jOiExfX0sbGluZV9saW5rZWQ6e2VuYWJsZTohMCxkaXN0YW5jZToxMDAsY29sb3I6XCIjZmZmXCIsb3BhY2l0eToxLHdpZHRoOjF9LG1vdmU6e2VuYWJsZTohMCxzcGVlZDoyLGRpcmVjdGlvbjpcIm5vbmVcIixyYW5kb206ITEsc3RyYWlnaHQ6ITEsb3V0X21vZGU6XCJvdXRcIixib3VuY2U6ITEsYXR0cmFjdDp7ZW5hYmxlOiExLHJvdGF0ZVg6M2UzLHJvdGF0ZVk6M2UzfX0sYXJyYXk6W119LGludGVyYWN0aXZpdHk6e2RldGVjdF9vbjpcImNhbnZhc1wiLGV2ZW50czp7b25ob3Zlcjp7ZW5hYmxlOiEwLG1vZGU6XCJncmFiXCJ9LG9uY2xpY2s6e2VuYWJsZTohMCxtb2RlOlwicHVzaFwifSxyZXNpemU6ITB9LG1vZGVzOntncmFiOntkaXN0YW5jZToxMDAsbGluZV9saW5rZWQ6e29wYWNpdHk6MX19LGJ1YmJsZTp7ZGlzdGFuY2U6MjAwLHNpemU6ODAsZHVyYXRpb246LjR9LHJlcHVsc2U6e2Rpc3RhbmNlOjIwMCxkdXJhdGlvbjouNH0scHVzaDp7cGFydGljbGVzX25iOjR9LHJlbW92ZTp7cGFydGljbGVzX25iOjJ9fSxtb3VzZTp7fX0scmV0aW5hX2RldGVjdDohMSxmbjp7aW50ZXJhY3Q6e30sbW9kZXM6e30sdmVuZG9yczp7fX0sdG1wOnt9fTt2YXIgaT10aGlzLnBKUzthJiZPYmplY3QuZGVlcEV4dGVuZChpLGEpLGkudG1wLm9iaj17c2l6ZV92YWx1ZTppLnBhcnRpY2xlcy5zaXplLnZhbHVlLHNpemVfYW5pbV9zcGVlZDppLnBhcnRpY2xlcy5zaXplLmFuaW0uc3BlZWQsbW92ZV9zcGVlZDppLnBhcnRpY2xlcy5tb3ZlLnNwZWVkLGxpbmVfbGlua2VkX2Rpc3RhbmNlOmkucGFydGljbGVzLmxpbmVfbGlua2VkLmRpc3RhbmNlLGxpbmVfbGlua2VkX3dpZHRoOmkucGFydGljbGVzLmxpbmVfbGlua2VkLndpZHRoLG1vZGVfZ3JhYl9kaXN0YW5jZTppLmludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5kaXN0YW5jZSxtb2RlX2J1YmJsZV9kaXN0YW5jZTppLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmRpc3RhbmNlLG1vZGVfYnViYmxlX3NpemU6aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5zaXplLG1vZGVfcmVwdWxzZV9kaXN0YW5jZTppLmludGVyYWN0aXZpdHkubW9kZXMucmVwdWxzZS5kaXN0YW5jZX0saS5mbi5yZXRpbmFJbml0PWZ1bmN0aW9uKCl7aS5yZXRpbmFfZGV0ZWN0JiZ3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz4xPyhpLmNhbnZhcy5weHJhdGlvPXdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLGkudG1wLnJldGluYT0hMCk6KGkuY2FudmFzLnB4cmF0aW89MSxpLnRtcC5yZXRpbmE9ITEpLGkuY2FudmFzLnc9aS5jYW52YXMuZWwub2Zmc2V0V2lkdGgqaS5jYW52YXMucHhyYXRpbyxpLmNhbnZhcy5oPWkuY2FudmFzLmVsLm9mZnNldEhlaWdodCppLmNhbnZhcy5weHJhdGlvLGkucGFydGljbGVzLnNpemUudmFsdWU9aS50bXAub2JqLnNpemVfdmFsdWUqaS5jYW52YXMucHhyYXRpbyxpLnBhcnRpY2xlcy5zaXplLmFuaW0uc3BlZWQ9aS50bXAub2JqLnNpemVfYW5pbV9zcGVlZCppLmNhbnZhcy5weHJhdGlvLGkucGFydGljbGVzLm1vdmUuc3BlZWQ9aS50bXAub2JqLm1vdmVfc3BlZWQqaS5jYW52YXMucHhyYXRpbyxpLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5kaXN0YW5jZT1pLnRtcC5vYmoubGluZV9saW5rZWRfZGlzdGFuY2UqaS5jYW52YXMucHhyYXRpbyxpLmludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5kaXN0YW5jZT1pLnRtcC5vYmoubW9kZV9ncmFiX2Rpc3RhbmNlKmkuY2FudmFzLnB4cmF0aW8saS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5kaXN0YW5jZT1pLnRtcC5vYmoubW9kZV9idWJibGVfZGlzdGFuY2UqaS5jYW52YXMucHhyYXRpbyxpLnBhcnRpY2xlcy5saW5lX2xpbmtlZC53aWR0aD1pLnRtcC5vYmoubGluZV9saW5rZWRfd2lkdGgqaS5jYW52YXMucHhyYXRpbyxpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLnNpemU9aS50bXAub2JqLm1vZGVfYnViYmxlX3NpemUqaS5jYW52YXMucHhyYXRpbyxpLmludGVyYWN0aXZpdHkubW9kZXMucmVwdWxzZS5kaXN0YW5jZT1pLnRtcC5vYmoubW9kZV9yZXB1bHNlX2Rpc3RhbmNlKmkuY2FudmFzLnB4cmF0aW99LGkuZm4uY2FudmFzSW5pdD1mdW5jdGlvbigpe2kuY2FudmFzLmN0eD1pLmNhbnZhcy5lbC5nZXRDb250ZXh0KFwiMmRcIil9LGkuZm4uY2FudmFzU2l6ZT1mdW5jdGlvbigpe2kuY2FudmFzLmVsLndpZHRoPWkuY2FudmFzLncsaS5jYW52YXMuZWwuaGVpZ2h0PWkuY2FudmFzLmgsaSYmaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5yZXNpemUmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24oKXtpLmNhbnZhcy53PWkuY2FudmFzLmVsLm9mZnNldFdpZHRoLGkuY2FudmFzLmg9aS5jYW52YXMuZWwub2Zmc2V0SGVpZ2h0LGkudG1wLnJldGluYSYmKGkuY2FudmFzLncqPWkuY2FudmFzLnB4cmF0aW8saS5jYW52YXMuaCo9aS5jYW52YXMucHhyYXRpbyksaS5jYW52YXMuZWwud2lkdGg9aS5jYW52YXMudyxpLmNhbnZhcy5lbC5oZWlnaHQ9aS5jYW52YXMuaCxpLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZXx8KGkuZm4ucGFydGljbGVzRW1wdHkoKSxpLmZuLnBhcnRpY2xlc0NyZWF0ZSgpLGkuZm4ucGFydGljbGVzRHJhdygpLGkuZm4udmVuZG9ycy5kZW5zaXR5QXV0b1BhcnRpY2xlcygpKSxpLmZuLnZlbmRvcnMuZGVuc2l0eUF1dG9QYXJ0aWNsZXMoKX0pfSxpLmZuLmNhbnZhc1BhaW50PWZ1bmN0aW9uKCl7aS5jYW52YXMuY3R4LmZpbGxSZWN0KDAsMCxpLmNhbnZhcy53LGkuY2FudmFzLmgpfSxpLmZuLmNhbnZhc0NsZWFyPWZ1bmN0aW9uKCl7aS5jYW52YXMuY3R4LmNsZWFyUmVjdCgwLDAsaS5jYW52YXMudyxpLmNhbnZhcy5oKX0saS5mbi5wYXJ0aWNsZT1mdW5jdGlvbihlLGEsdCl7aWYodGhpcy5yYWRpdXM9KGkucGFydGljbGVzLnNpemUucmFuZG9tP01hdGgucmFuZG9tKCk6MSkqaS5wYXJ0aWNsZXMuc2l6ZS52YWx1ZSxpLnBhcnRpY2xlcy5zaXplLmFuaW0uZW5hYmxlJiYodGhpcy5zaXplX3N0YXR1cz0hMSx0aGlzLnZzPWkucGFydGljbGVzLnNpemUuYW5pbS5zcGVlZC8xMDAsaS5wYXJ0aWNsZXMuc2l6ZS5hbmltLnN5bmN8fCh0aGlzLnZzPXRoaXMudnMqTWF0aC5yYW5kb20oKSkpLHRoaXMueD10P3QueDpNYXRoLnJhbmRvbSgpKmkuY2FudmFzLncsdGhpcy55PXQ/dC55Ok1hdGgucmFuZG9tKCkqaS5jYW52YXMuaCx0aGlzLng+aS5jYW52YXMudy0yKnRoaXMucmFkaXVzP3RoaXMueD10aGlzLngtdGhpcy5yYWRpdXM6dGhpcy54PDIqdGhpcy5yYWRpdXMmJih0aGlzLng9dGhpcy54K3RoaXMucmFkaXVzKSx0aGlzLnk+aS5jYW52YXMuaC0yKnRoaXMucmFkaXVzP3RoaXMueT10aGlzLnktdGhpcy5yYWRpdXM6dGhpcy55PDIqdGhpcy5yYWRpdXMmJih0aGlzLnk9dGhpcy55K3RoaXMucmFkaXVzKSxpLnBhcnRpY2xlcy5tb3ZlLmJvdW5jZSYmaS5mbi52ZW5kb3JzLmNoZWNrT3ZlcmxhcCh0aGlzLHQpLHRoaXMuY29sb3I9e30sXCJvYmplY3RcIj09dHlwZW9mIGUudmFsdWUpaWYoZS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5KXt2YXIgcz1lLnZhbHVlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSppLnBhcnRpY2xlcy5jb2xvci52YWx1ZS5sZW5ndGgpXTt0aGlzLmNvbG9yLnJnYj1oZXhUb1JnYihzKX1lbHNlIHZvaWQgMCE9ZS52YWx1ZS5yJiZ2b2lkIDAhPWUudmFsdWUuZyYmdm9pZCAwIT1lLnZhbHVlLmImJih0aGlzLmNvbG9yLnJnYj17cjplLnZhbHVlLnIsZzplLnZhbHVlLmcsYjplLnZhbHVlLmJ9KSx2b2lkIDAhPWUudmFsdWUuaCYmdm9pZCAwIT1lLnZhbHVlLnMmJnZvaWQgMCE9ZS52YWx1ZS5sJiYodGhpcy5jb2xvci5oc2w9e2g6ZS52YWx1ZS5oLHM6ZS52YWx1ZS5zLGw6ZS52YWx1ZS5sfSk7ZWxzZVwicmFuZG9tXCI9PWUudmFsdWU/dGhpcy5jb2xvci5yZ2I9e3I6TWF0aC5mbG9vcigyNTYqTWF0aC5yYW5kb20oKSkrMCxnOk1hdGguZmxvb3IoMjU2Kk1hdGgucmFuZG9tKCkpKzAsYjpNYXRoLmZsb29yKDI1NipNYXRoLnJhbmRvbSgpKSswfTpcInN0cmluZ1wiPT10eXBlb2YgZS52YWx1ZSYmKHRoaXMuY29sb3I9ZSx0aGlzLmNvbG9yLnJnYj1oZXhUb1JnYih0aGlzLmNvbG9yLnZhbHVlKSk7dGhpcy5vcGFjaXR5PShpLnBhcnRpY2xlcy5vcGFjaXR5LnJhbmRvbT9NYXRoLnJhbmRvbSgpOjEpKmkucGFydGljbGVzLm9wYWNpdHkudmFsdWUsaS5wYXJ0aWNsZXMub3BhY2l0eS5hbmltLmVuYWJsZSYmKHRoaXMub3BhY2l0eV9zdGF0dXM9ITEsdGhpcy52bz1pLnBhcnRpY2xlcy5vcGFjaXR5LmFuaW0uc3BlZWQvMTAwLGkucGFydGljbGVzLm9wYWNpdHkuYW5pbS5zeW5jfHwodGhpcy52bz10aGlzLnZvKk1hdGgucmFuZG9tKCkpKTt2YXIgbj17fTtzd2l0Y2goaS5wYXJ0aWNsZXMubW92ZS5kaXJlY3Rpb24pe2Nhc2VcInRvcFwiOm49e3g6MCx5Oi0xfTticmVhaztjYXNlXCJ0b3AtcmlnaHRcIjpuPXt4Oi41LHk6LS41fTticmVhaztjYXNlXCJyaWdodFwiOm49e3g6MSx5Oi0wfTticmVhaztjYXNlXCJib3R0b20tcmlnaHRcIjpuPXt4Oi41LHk6LjV9O2JyZWFrO2Nhc2VcImJvdHRvbVwiOm49e3g6MCx5OjF9O2JyZWFrO2Nhc2VcImJvdHRvbS1sZWZ0XCI6bj17eDotLjUseToxfTticmVhaztjYXNlXCJsZWZ0XCI6bj17eDotMSx5OjB9O2JyZWFrO2Nhc2VcInRvcC1sZWZ0XCI6bj17eDotLjUseTotLjV9O2JyZWFrO2RlZmF1bHQ6bj17eDowLHk6MH19aS5wYXJ0aWNsZXMubW92ZS5zdHJhaWdodD8odGhpcy52eD1uLngsdGhpcy52eT1uLnksaS5wYXJ0aWNsZXMubW92ZS5yYW5kb20mJih0aGlzLnZ4PXRoaXMudngqTWF0aC5yYW5kb20oKSx0aGlzLnZ5PXRoaXMudnkqTWF0aC5yYW5kb20oKSkpOih0aGlzLnZ4PW4ueCtNYXRoLnJhbmRvbSgpLS41LHRoaXMudnk9bi55K01hdGgucmFuZG9tKCktLjUpLHRoaXMudnhfaT10aGlzLnZ4LHRoaXMudnlfaT10aGlzLnZ5O3ZhciByPWkucGFydGljbGVzLnNoYXBlLnR5cGU7aWYoXCJvYmplY3RcIj09dHlwZW9mIHIpe2lmKHIgaW5zdGFuY2VvZiBBcnJheSl7dmFyIGM9cltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqci5sZW5ndGgpXTt0aGlzLnNoYXBlPWN9fWVsc2UgdGhpcy5zaGFwZT1yO2lmKFwiaW1hZ2VcIj09dGhpcy5zaGFwZSl7dmFyIG89aS5wYXJ0aWNsZXMuc2hhcGU7dGhpcy5pbWc9e3NyYzpvLmltYWdlLnNyYyxyYXRpbzpvLmltYWdlLndpZHRoL28uaW1hZ2UuaGVpZ2h0fSx0aGlzLmltZy5yYXRpb3x8KHRoaXMuaW1nLnJhdGlvPTEpLFwic3ZnXCI9PWkudG1wLmltZ190eXBlJiZ2b2lkIDAhPWkudG1wLnNvdXJjZV9zdmcmJihpLmZuLnZlbmRvcnMuY3JlYXRlU3ZnSW1nKHRoaXMpLGkudG1wLnB1c2hpbmcmJih0aGlzLmltZy5sb2FkZWQ9ITEpKX19LGkuZm4ucGFydGljbGUucHJvdG90eXBlLmRyYXc9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7aS5jYW52YXMuY3R4LmRyYXdJbWFnZShyLGEueC10LGEueS10LDIqdCwyKnQvYS5pbWcucmF0aW8pfXZhciBhPXRoaXM7aWYodm9pZCAwIT1hLnJhZGl1c19idWJibGUpdmFyIHQ9YS5yYWRpdXNfYnViYmxlO2Vsc2UgdmFyIHQ9YS5yYWRpdXM7aWYodm9pZCAwIT1hLm9wYWNpdHlfYnViYmxlKXZhciBzPWEub3BhY2l0eV9idWJibGU7ZWxzZSB2YXIgcz1hLm9wYWNpdHk7aWYoYS5jb2xvci5yZ2IpdmFyIG49XCJyZ2JhKFwiK2EuY29sb3IucmdiLnIrXCIsXCIrYS5jb2xvci5yZ2IuZytcIixcIithLmNvbG9yLnJnYi5iK1wiLFwiK3MrXCIpXCI7ZWxzZSB2YXIgbj1cImhzbGEoXCIrYS5jb2xvci5oc2wuaCtcIixcIithLmNvbG9yLmhzbC5zK1wiJSxcIithLmNvbG9yLmhzbC5sK1wiJSxcIitzK1wiKVwiO3N3aXRjaChpLmNhbnZhcy5jdHguZmlsbFN0eWxlPW4saS5jYW52YXMuY3R4LmJlZ2luUGF0aCgpLGEuc2hhcGUpe2Nhc2VcImNpcmNsZVwiOmkuY2FudmFzLmN0eC5hcmMoYS54LGEueSx0LDAsMipNYXRoLlBJLCExKTticmVhaztjYXNlXCJlZGdlXCI6aS5jYW52YXMuY3R4LnJlY3QoYS54LXQsYS55LXQsMip0LDIqdCk7YnJlYWs7Y2FzZVwidHJpYW5nbGVcIjppLmZuLnZlbmRvcnMuZHJhd1NoYXBlKGkuY2FudmFzLmN0eCxhLngtdCxhLnkrdC8xLjY2LDIqdCwzLDIpO2JyZWFrO2Nhc2VcInBvbHlnb25cIjppLmZuLnZlbmRvcnMuZHJhd1NoYXBlKGkuY2FudmFzLmN0eCxhLngtdC8oaS5wYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5uYl9zaWRlcy8zLjUpLGEueS10Ly43NiwyLjY2KnQvKGkucGFydGljbGVzLnNoYXBlLnBvbHlnb24ubmJfc2lkZXMvMyksaS5wYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5uYl9zaWRlcywxKTticmVhaztjYXNlXCJzdGFyXCI6aS5mbi52ZW5kb3JzLmRyYXdTaGFwZShpLmNhbnZhcy5jdHgsYS54LTIqdC8oaS5wYXJ0aWNsZXMuc2hhcGUucG9seWdvbi5uYl9zaWRlcy80KSxhLnktdC8xLjUyLDIqdCoyLjY2LyhpLnBhcnRpY2xlcy5zaGFwZS5wb2x5Z29uLm5iX3NpZGVzLzMpLGkucGFydGljbGVzLnNoYXBlLnBvbHlnb24ubmJfc2lkZXMsMik7YnJlYWs7Y2FzZVwiaW1hZ2VcIjppZihcInN2Z1wiPT1pLnRtcC5pbWdfdHlwZSl2YXIgcj1hLmltZy5vYmo7ZWxzZSB2YXIgcj1pLnRtcC5pbWdfb2JqO3ImJmUoKX1pLmNhbnZhcy5jdHguY2xvc2VQYXRoKCksaS5wYXJ0aWNsZXMuc2hhcGUuc3Ryb2tlLndpZHRoPjAmJihpLmNhbnZhcy5jdHguc3Ryb2tlU3R5bGU9aS5wYXJ0aWNsZXMuc2hhcGUuc3Ryb2tlLmNvbG9yLGkuY2FudmFzLmN0eC5saW5lV2lkdGg9aS5wYXJ0aWNsZXMuc2hhcGUuc3Ryb2tlLndpZHRoLGkuY2FudmFzLmN0eC5zdHJva2UoKSksaS5jYW52YXMuY3R4LmZpbGwoKX0saS5mbi5wYXJ0aWNsZXNDcmVhdGU9ZnVuY3Rpb24oKXtmb3IodmFyIGU9MDtlPGkucGFydGljbGVzLm51bWJlci52YWx1ZTtlKyspaS5wYXJ0aWNsZXMuYXJyYXkucHVzaChuZXcgaS5mbi5wYXJ0aWNsZShpLnBhcnRpY2xlcy5jb2xvcixpLnBhcnRpY2xlcy5vcGFjaXR5LnZhbHVlKSl9LGkuZm4ucGFydGljbGVzVXBkYXRlPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPTA7ZTxpLnBhcnRpY2xlcy5hcnJheS5sZW5ndGg7ZSsrKXt2YXIgYT1pLnBhcnRpY2xlcy5hcnJheVtlXTtpZihpLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZSl7dmFyIHQ9aS5wYXJ0aWNsZXMubW92ZS5zcGVlZC8yO2EueCs9YS52eCp0LGEueSs9YS52eSp0fWlmKGkucGFydGljbGVzLm9wYWNpdHkuYW5pbS5lbmFibGUmJigxPT1hLm9wYWNpdHlfc3RhdHVzPyhhLm9wYWNpdHk+PWkucGFydGljbGVzLm9wYWNpdHkudmFsdWUmJihhLm9wYWNpdHlfc3RhdHVzPSExKSxhLm9wYWNpdHkrPWEudm8pOihhLm9wYWNpdHk8PWkucGFydGljbGVzLm9wYWNpdHkuYW5pbS5vcGFjaXR5X21pbiYmKGEub3BhY2l0eV9zdGF0dXM9ITApLGEub3BhY2l0eS09YS52byksYS5vcGFjaXR5PDAmJihhLm9wYWNpdHk9MCkpLGkucGFydGljbGVzLnNpemUuYW5pbS5lbmFibGUmJigxPT1hLnNpemVfc3RhdHVzPyhhLnJhZGl1cz49aS5wYXJ0aWNsZXMuc2l6ZS52YWx1ZSYmKGEuc2l6ZV9zdGF0dXM9ITEpLGEucmFkaXVzKz1hLnZzKTooYS5yYWRpdXM8PWkucGFydGljbGVzLnNpemUuYW5pbS5zaXplX21pbiYmKGEuc2l6ZV9zdGF0dXM9ITApLGEucmFkaXVzLT1hLnZzKSxhLnJhZGl1czwwJiYoYS5yYWRpdXM9MCkpLFwiYm91bmNlXCI9PWkucGFydGljbGVzLm1vdmUub3V0X21vZGUpdmFyIHM9e3hfbGVmdDphLnJhZGl1cyx4X3JpZ2h0OmkuY2FudmFzLncseV90b3A6YS5yYWRpdXMseV9ib3R0b206aS5jYW52YXMuaH07ZWxzZSB2YXIgcz17eF9sZWZ0Oi1hLnJhZGl1cyx4X3JpZ2h0OmkuY2FudmFzLncrYS5yYWRpdXMseV90b3A6LWEucmFkaXVzLHlfYm90dG9tOmkuY2FudmFzLmgrYS5yYWRpdXN9O3N3aXRjaChhLngtYS5yYWRpdXM+aS5jYW52YXMudz8oYS54PXMueF9sZWZ0LGEueT1NYXRoLnJhbmRvbSgpKmkuY2FudmFzLmgpOmEueCthLnJhZGl1czwwJiYoYS54PXMueF9yaWdodCxhLnk9TWF0aC5yYW5kb20oKSppLmNhbnZhcy5oKSxhLnktYS5yYWRpdXM+aS5jYW52YXMuaD8oYS55PXMueV90b3AsYS54PU1hdGgucmFuZG9tKCkqaS5jYW52YXMudyk6YS55K2EucmFkaXVzPDAmJihhLnk9cy55X2JvdHRvbSxhLng9TWF0aC5yYW5kb20oKSppLmNhbnZhcy53KSxpLnBhcnRpY2xlcy5tb3ZlLm91dF9tb2RlKXtjYXNlXCJib3VuY2VcIjphLngrYS5yYWRpdXM+aS5jYW52YXMudz9hLnZ4PS1hLnZ4OmEueC1hLnJhZGl1czwwJiYoYS52eD0tYS52eCksYS55K2EucmFkaXVzPmkuY2FudmFzLmg/YS52eT0tYS52eTphLnktYS5yYWRpdXM8MCYmKGEudnk9LWEudnkpfWlmKGlzSW5BcnJheShcImdyYWJcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIubW9kZSkmJmkuZm4ubW9kZXMuZ3JhYlBhcnRpY2xlKGEpLChpc0luQXJyYXkoXCJidWJibGVcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIubW9kZSl8fGlzSW5BcnJheShcImJ1YmJsZVwiLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25jbGljay5tb2RlKSkmJmkuZm4ubW9kZXMuYnViYmxlUGFydGljbGUoYSksKGlzSW5BcnJheShcInJlcHVsc2VcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIubW9kZSl8fGlzSW5BcnJheShcInJlcHVsc2VcIixpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uY2xpY2subW9kZSkpJiZpLmZuLm1vZGVzLnJlcHVsc2VQYXJ0aWNsZShhKSxpLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5lbmFibGV8fGkucGFydGljbGVzLm1vdmUuYXR0cmFjdC5lbmFibGUpZm9yKHZhciBuPWUrMTtuPGkucGFydGljbGVzLmFycmF5Lmxlbmd0aDtuKyspe3ZhciByPWkucGFydGljbGVzLmFycmF5W25dO2kucGFydGljbGVzLmxpbmVfbGlua2VkLmVuYWJsZSYmaS5mbi5pbnRlcmFjdC5saW5rUGFydGljbGVzKGEsciksaS5wYXJ0aWNsZXMubW92ZS5hdHRyYWN0LmVuYWJsZSYmaS5mbi5pbnRlcmFjdC5hdHRyYWN0UGFydGljbGVzKGEsciksaS5wYXJ0aWNsZXMubW92ZS5ib3VuY2UmJmkuZm4uaW50ZXJhY3QuYm91bmNlUGFydGljbGVzKGEscil9fX0saS5mbi5wYXJ0aWNsZXNEcmF3PWZ1bmN0aW9uKCl7aS5jYW52YXMuY3R4LmNsZWFyUmVjdCgwLDAsaS5jYW52YXMudyxpLmNhbnZhcy5oKSxpLmZuLnBhcnRpY2xlc1VwZGF0ZSgpO2Zvcih2YXIgZT0wO2U8aS5wYXJ0aWNsZXMuYXJyYXkubGVuZ3RoO2UrKyl7dmFyIGE9aS5wYXJ0aWNsZXMuYXJyYXlbZV07YS5kcmF3KCl9fSxpLmZuLnBhcnRpY2xlc0VtcHR5PWZ1bmN0aW9uKCl7aS5wYXJ0aWNsZXMuYXJyYXk9W119LGkuZm4ucGFydGljbGVzUmVmcmVzaD1mdW5jdGlvbigpe2NhbmNlbFJlcXVlc3RBbmltRnJhbWUoaS5mbi5jaGVja0FuaW1GcmFtZSksY2FuY2VsUmVxdWVzdEFuaW1GcmFtZShpLmZuLmRyYXdBbmltRnJhbWUpLGkudG1wLnNvdXJjZV9zdmc9dm9pZCAwLGkudG1wLmltZ19vYmo9dm9pZCAwLGkudG1wLmNvdW50X3N2Zz0wLGkuZm4ucGFydGljbGVzRW1wdHkoKSxpLmZuLmNhbnZhc0NsZWFyKCksaS5mbi52ZW5kb3JzLnN0YXJ0KCl9LGkuZm4uaW50ZXJhY3QubGlua1BhcnRpY2xlcz1mdW5jdGlvbihlLGEpe3ZhciB0PWUueC1hLngscz1lLnktYS55LG49TWF0aC5zcXJ0KHQqdCtzKnMpO2lmKG48PWkucGFydGljbGVzLmxpbmVfbGlua2VkLmRpc3RhbmNlKXt2YXIgcj1pLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5vcGFjaXR5LW4vKDEvaS5wYXJ0aWNsZXMubGluZV9saW5rZWQub3BhY2l0eSkvaS5wYXJ0aWNsZXMubGluZV9saW5rZWQuZGlzdGFuY2U7aWYocj4wKXt2YXIgYz1pLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5jb2xvcl9yZ2JfbGluZTtpLmNhbnZhcy5jdHguc3Ryb2tlU3R5bGU9XCJyZ2JhKFwiK2MucitcIixcIitjLmcrXCIsXCIrYy5iK1wiLFwiK3IrXCIpXCIsaS5jYW52YXMuY3R4LmxpbmVXaWR0aD1pLnBhcnRpY2xlcy5saW5lX2xpbmtlZC53aWR0aCxpLmNhbnZhcy5jdHguYmVnaW5QYXRoKCksaS5jYW52YXMuY3R4Lm1vdmVUbyhlLngsZS55KSxpLmNhbnZhcy5jdHgubGluZVRvKGEueCxhLnkpLGkuY2FudmFzLmN0eC5zdHJva2UoKSxpLmNhbnZhcy5jdHguY2xvc2VQYXRoKCl9fX0saS5mbi5pbnRlcmFjdC5hdHRyYWN0UGFydGljbGVzPWZ1bmN0aW9uKGUsYSl7dmFyIHQ9ZS54LWEueCxzPWUueS1hLnksbj1NYXRoLnNxcnQodCp0K3Mqcyk7aWYobjw9aS5wYXJ0aWNsZXMubGluZV9saW5rZWQuZGlzdGFuY2Upe3ZhciByPXQvKDFlMyppLnBhcnRpY2xlcy5tb3ZlLmF0dHJhY3Qucm90YXRlWCksYz1zLygxZTMqaS5wYXJ0aWNsZXMubW92ZS5hdHRyYWN0LnJvdGF0ZVkpO2UudngtPXIsZS52eS09YyxhLnZ4Kz1yLGEudnkrPWN9fSxpLmZuLmludGVyYWN0LmJvdW5jZVBhcnRpY2xlcz1mdW5jdGlvbihlLGEpe3ZhciB0PWUueC1hLngsaT1lLnktYS55LHM9TWF0aC5zcXJ0KHQqdCtpKmkpLG49ZS5yYWRpdXMrYS5yYWRpdXM7bj49cyYmKGUudng9LWUudngsZS52eT0tZS52eSxhLnZ4PS1hLnZ4LGEudnk9LWEudnkpfSxpLmZuLm1vZGVzLnB1c2hQYXJ0aWNsZXM9ZnVuY3Rpb24oZSxhKXtpLnRtcC5wdXNoaW5nPSEwO2Zvcih2YXIgdD0wO2U+dDt0KyspaS5wYXJ0aWNsZXMuYXJyYXkucHVzaChuZXcgaS5mbi5wYXJ0aWNsZShpLnBhcnRpY2xlcy5jb2xvcixpLnBhcnRpY2xlcy5vcGFjaXR5LnZhbHVlLHt4OmE/YS5wb3NfeDpNYXRoLnJhbmRvbSgpKmkuY2FudmFzLncseTphP2EucG9zX3k6TWF0aC5yYW5kb20oKSppLmNhbnZhcy5ofSkpLHQ9PWUtMSYmKGkucGFydGljbGVzLm1vdmUuZW5hYmxlfHxpLmZuLnBhcnRpY2xlc0RyYXcoKSxpLnRtcC5wdXNoaW5nPSExKX0saS5mbi5tb2Rlcy5yZW1vdmVQYXJ0aWNsZXM9ZnVuY3Rpb24oZSl7aS5wYXJ0aWNsZXMuYXJyYXkuc3BsaWNlKDAsZSksaS5wYXJ0aWNsZXMubW92ZS5lbmFibGV8fGkuZm4ucGFydGljbGVzRHJhdygpfSxpLmZuLm1vZGVzLmJ1YmJsZVBhcnRpY2xlPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIGEoKXtlLm9wYWNpdHlfYnViYmxlPWUub3BhY2l0eSxlLnJhZGl1c19idWJibGU9ZS5yYWRpdXN9ZnVuY3Rpb24gdChhLHQscyxuLGMpe2lmKGEhPXQpaWYoaS50bXAuYnViYmxlX2R1cmF0aW9uX2VuZCl7aWYodm9pZCAwIT1zKXt2YXIgbz1uLXAqKG4tYSkvaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5kdXJhdGlvbixsPWEtbztkPWErbCxcInNpemVcIj09YyYmKGUucmFkaXVzX2J1YmJsZT1kKSxcIm9wYWNpdHlcIj09YyYmKGUub3BhY2l0eV9idWJibGU9ZCl9fWVsc2UgaWYocjw9aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5kaXN0YW5jZSl7aWYodm9pZCAwIT1zKXZhciB2PXM7ZWxzZSB2YXIgdj1uO2lmKHYhPWEpe3ZhciBkPW4tcCoobi1hKS9pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmR1cmF0aW9uO1wic2l6ZVwiPT1jJiYoZS5yYWRpdXNfYnViYmxlPWQpLFwib3BhY2l0eVwiPT1jJiYoZS5vcGFjaXR5X2J1YmJsZT1kKX19ZWxzZVwic2l6ZVwiPT1jJiYoZS5yYWRpdXNfYnViYmxlPXZvaWQgMCksXCJvcGFjaXR5XCI9PWMmJihlLm9wYWNpdHlfYnViYmxlPXZvaWQgMCl9aWYoaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmhvdmVyLmVuYWJsZSYmaXNJbkFycmF5KFwiYnViYmxlXCIsaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmhvdmVyLm1vZGUpKXt2YXIgcz1lLngtaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194LG49ZS55LWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeSxyPU1hdGguc3FydChzKnMrbipuKSxjPTEtci9pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmRpc3RhbmNlO2lmKHI8PWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZGlzdGFuY2Upe2lmKGM+PTAmJlwibW91c2Vtb3ZlXCI9PWkuaW50ZXJhY3Rpdml0eS5zdGF0dXMpe2lmKGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuc2l6ZSE9aS5wYXJ0aWNsZXMuc2l6ZS52YWx1ZSlpZihpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLnNpemU+aS5wYXJ0aWNsZXMuc2l6ZS52YWx1ZSl7dmFyIG89ZS5yYWRpdXMraS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5zaXplKmM7bz49MCYmKGUucmFkaXVzX2J1YmJsZT1vKX1lbHNle3ZhciBsPWUucmFkaXVzLWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuc2l6ZSxvPWUucmFkaXVzLWwqYztvPjA/ZS5yYWRpdXNfYnViYmxlPW86ZS5yYWRpdXNfYnViYmxlPTB9aWYoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5vcGFjaXR5IT1pLnBhcnRpY2xlcy5vcGFjaXR5LnZhbHVlKWlmKGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUub3BhY2l0eT5pLnBhcnRpY2xlcy5vcGFjaXR5LnZhbHVlKXt2YXIgdj1pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLm9wYWNpdHkqYzt2PmUub3BhY2l0eSYmdjw9aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5vcGFjaXR5JiYoZS5vcGFjaXR5X2J1YmJsZT12KX1lbHNle3ZhciB2PWUub3BhY2l0eS0oaS5wYXJ0aWNsZXMub3BhY2l0eS52YWx1ZS1pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLm9wYWNpdHkpKmM7djxlLm9wYWNpdHkmJnY+PWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUub3BhY2l0eSYmKGUub3BhY2l0eV9idWJibGU9dil9fX1lbHNlIGEoKTtcIm1vdXNlbGVhdmVcIj09aS5pbnRlcmFjdGl2aXR5LnN0YXR1cyYmYSgpfWVsc2UgaWYoaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLmVuYWJsZSYmaXNJbkFycmF5KFwiYnViYmxlXCIsaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLm1vZGUpKXtpZihpLnRtcC5idWJibGVfY2xpY2tpbmcpe3ZhciBzPWUueC1pLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3gsbj1lLnktaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLmNsaWNrX3Bvc195LHI9TWF0aC5zcXJ0KHMqcytuKm4pLHA9KChuZXcgRGF0ZSkuZ2V0VGltZSgpLWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja190aW1lKS8xZTM7cD5pLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLmR1cmF0aW9uJiYoaS50bXAuYnViYmxlX2R1cmF0aW9uX2VuZD0hMCkscD4yKmkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5idWJibGUuZHVyYXRpb24mJihpLnRtcC5idWJibGVfY2xpY2tpbmc9ITEsaS50bXAuYnViYmxlX2R1cmF0aW9uX2VuZD0hMSl9aS50bXAuYnViYmxlX2NsaWNraW5nJiYodChpLmludGVyYWN0aXZpdHkubW9kZXMuYnViYmxlLnNpemUsaS5wYXJ0aWNsZXMuc2l6ZS52YWx1ZSxlLnJhZGl1c19idWJibGUsZS5yYWRpdXMsXCJzaXplXCIpLHQoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmJ1YmJsZS5vcGFjaXR5LGkucGFydGljbGVzLm9wYWNpdHkudmFsdWUsZS5vcGFjaXR5X2J1YmJsZSxlLm9wYWNpdHksXCJvcGFjaXR5XCIpKX19LGkuZm4ubW9kZXMucmVwdWxzZVBhcnRpY2xlPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIGEoKXt2YXIgYT1NYXRoLmF0YW4yKGQscCk7aWYoZS52eD11Kk1hdGguY29zKGEpLGUudnk9dSpNYXRoLnNpbihhKSxcImJvdW5jZVwiPT1pLnBhcnRpY2xlcy5tb3ZlLm91dF9tb2RlKXt2YXIgdD17eDplLngrZS52eCx5OmUueStlLnZ5fTt0LngrZS5yYWRpdXM+aS5jYW52YXMudz9lLnZ4PS1lLnZ4OnQueC1lLnJhZGl1czwwJiYoZS52eD0tZS52eCksdC55K2UucmFkaXVzPmkuY2FudmFzLmg/ZS52eT0tZS52eTp0LnktZS5yYWRpdXM8MCYmKGUudnk9LWUudnkpfX1pZihpLmludGVyYWN0aXZpdHkuZXZlbnRzLm9uaG92ZXIuZW5hYmxlJiZpc0luQXJyYXkoXCJyZXB1bHNlXCIsaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmhvdmVyLm1vZGUpJiZcIm1vdXNlbW92ZVwiPT1pLmludGVyYWN0aXZpdHkuc3RhdHVzKXt2YXIgdD1lLngtaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194LHM9ZS55LWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeSxuPU1hdGguc3FydCh0KnQrcypzKSxyPXt4OnQvbix5OnMvbn0sYz1pLmludGVyYWN0aXZpdHkubW9kZXMucmVwdWxzZS5kaXN0YW5jZSxvPTEwMCxsPWNsYW1wKDEvYyooLTEqTWF0aC5wb3cobi9jLDIpKzEpKmMqbywwLDUwKSx2PXt4OmUueCtyLngqbCx5OmUueStyLnkqbH07XCJib3VuY2VcIj09aS5wYXJ0aWNsZXMubW92ZS5vdXRfbW9kZT8odi54LWUucmFkaXVzPjAmJnYueCtlLnJhZGl1czxpLmNhbnZhcy53JiYoZS54PXYueCksdi55LWUucmFkaXVzPjAmJnYueStlLnJhZGl1czxpLmNhbnZhcy5oJiYoZS55PXYueSkpOihlLng9di54LGUueT12LnkpfWVsc2UgaWYoaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLmVuYWJsZSYmaXNJbkFycmF5KFwicmVwdWxzZVwiLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25jbGljay5tb2RlKSlpZihpLnRtcC5yZXB1bHNlX2ZpbmlzaHx8KGkudG1wLnJlcHVsc2VfY291bnQrKyxpLnRtcC5yZXB1bHNlX2NvdW50PT1pLnBhcnRpY2xlcy5hcnJheS5sZW5ndGgmJihpLnRtcC5yZXB1bHNlX2ZpbmlzaD0hMCkpLGkudG1wLnJlcHVsc2VfY2xpY2tpbmcpe3ZhciBjPU1hdGgucG93KGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZXB1bHNlLmRpc3RhbmNlLzYsMykscD1pLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3gtZS54LGQ9aS5pbnRlcmFjdGl2aXR5Lm1vdXNlLmNsaWNrX3Bvc195LWUueSxtPXAqcCtkKmQsdT0tYy9tKjE7Yz49bSYmYSgpfWVsc2UgMD09aS50bXAucmVwdWxzZV9jbGlja2luZyYmKGUudng9ZS52eF9pLGUudnk9ZS52eV9pKX0saS5mbi5tb2Rlcy5ncmFiUGFydGljbGU9ZnVuY3Rpb24oZSl7aWYoaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmhvdmVyLmVuYWJsZSYmXCJtb3VzZW1vdmVcIj09aS5pbnRlcmFjdGl2aXR5LnN0YXR1cyl7dmFyIGE9ZS54LWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeCx0PWUueS1pLmludGVyYWN0aXZpdHkubW91c2UucG9zX3kscz1NYXRoLnNxcnQoYSphK3QqdCk7aWYoczw9aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLmdyYWIuZGlzdGFuY2Upe3ZhciBuPWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5ncmFiLmxpbmVfbGlua2VkLm9wYWNpdHktcy8oMS9pLmludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5saW5lX2xpbmtlZC5vcGFjaXR5KS9pLmludGVyYWN0aXZpdHkubW9kZXMuZ3JhYi5kaXN0YW5jZTtpZihuPjApe3ZhciByPWkucGFydGljbGVzLmxpbmVfbGlua2VkLmNvbG9yX3JnYl9saW5lO2kuY2FudmFzLmN0eC5zdHJva2VTdHlsZT1cInJnYmEoXCIrci5yK1wiLFwiK3IuZytcIixcIityLmIrXCIsXCIrbitcIilcIixpLmNhbnZhcy5jdHgubGluZVdpZHRoPWkucGFydGljbGVzLmxpbmVfbGlua2VkLndpZHRoLGkuY2FudmFzLmN0eC5iZWdpblBhdGgoKSxpLmNhbnZhcy5jdHgubW92ZVRvKGUueCxlLnkpLGkuY2FudmFzLmN0eC5saW5lVG8oaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc194LGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeSksaS5jYW52YXMuY3R4LnN0cm9rZSgpLGkuY2FudmFzLmN0eC5jbG9zZVBhdGgoKX19fX0saS5mbi52ZW5kb3JzLmV2ZW50c0xpc3RlbmVycz1mdW5jdGlvbigpe1wid2luZG93XCI9PWkuaW50ZXJhY3Rpdml0eS5kZXRlY3Rfb24/aS5pbnRlcmFjdGl2aXR5LmVsPXdpbmRvdzppLmludGVyYWN0aXZpdHkuZWw9aS5jYW52YXMuZWwsKGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25ob3Zlci5lbmFibGV8fGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25jbGljay5lbmFibGUpJiYoaS5pbnRlcmFjdGl2aXR5LmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixmdW5jdGlvbihlKXtpZihpLmludGVyYWN0aXZpdHkuZWw9PXdpbmRvdyl2YXIgYT1lLmNsaWVudFgsdD1lLmNsaWVudFk7ZWxzZSB2YXIgYT1lLm9mZnNldFh8fGUuY2xpZW50WCx0PWUub2Zmc2V0WXx8ZS5jbGllbnRZO2kuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeD1hLGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeT10LGkudG1wLnJldGluYSYmKGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeCo9aS5jYW52YXMucHhyYXRpbyxpLmludGVyYWN0aXZpdHkubW91c2UucG9zX3kqPWkuY2FudmFzLnB4cmF0aW8pLGkuaW50ZXJhY3Rpdml0eS5zdGF0dXM9XCJtb3VzZW1vdmVcIn0pLGkuaW50ZXJhY3Rpdml0eS5lbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLGZ1bmN0aW9uKGUpe2kuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeD1udWxsLGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeT1udWxsLGkuaW50ZXJhY3Rpdml0eS5zdGF0dXM9XCJtb3VzZWxlYXZlXCJ9KSksaS5pbnRlcmFjdGl2aXR5LmV2ZW50cy5vbmNsaWNrLmVuYWJsZSYmaS5pbnRlcmFjdGl2aXR5LmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7aWYoaS5pbnRlcmFjdGl2aXR5Lm1vdXNlLmNsaWNrX3Bvc194PWkuaW50ZXJhY3Rpdml0eS5tb3VzZS5wb3NfeCxpLmludGVyYWN0aXZpdHkubW91c2UuY2xpY2tfcG9zX3k9aS5pbnRlcmFjdGl2aXR5Lm1vdXNlLnBvc195LGkuaW50ZXJhY3Rpdml0eS5tb3VzZS5jbGlja190aW1lPShuZXcgRGF0ZSkuZ2V0VGltZSgpLGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25jbGljay5lbmFibGUpc3dpdGNoKGkuaW50ZXJhY3Rpdml0eS5ldmVudHMub25jbGljay5tb2RlKXtjYXNlXCJwdXNoXCI6aS5wYXJ0aWNsZXMubW92ZS5lbmFibGU/aS5mbi5tb2Rlcy5wdXNoUGFydGljbGVzKGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5wdXNoLnBhcnRpY2xlc19uYixpLmludGVyYWN0aXZpdHkubW91c2UpOjE9PWkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5wdXNoLnBhcnRpY2xlc19uYj9pLmZuLm1vZGVzLnB1c2hQYXJ0aWNsZXMoaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucGFydGljbGVzX25iLGkuaW50ZXJhY3Rpdml0eS5tb3VzZSk6aS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnB1c2gucGFydGljbGVzX25iPjEmJmkuZm4ubW9kZXMucHVzaFBhcnRpY2xlcyhpLmludGVyYWN0aXZpdHkubW9kZXMucHVzaC5wYXJ0aWNsZXNfbmIpO2JyZWFrO2Nhc2VcInJlbW92ZVwiOmkuZm4ubW9kZXMucmVtb3ZlUGFydGljbGVzKGkuaW50ZXJhY3Rpdml0eS5tb2Rlcy5yZW1vdmUucGFydGljbGVzX25iKTticmVhaztjYXNlXCJidWJibGVcIjppLnRtcC5idWJibGVfY2xpY2tpbmc9ITA7YnJlYWs7Y2FzZVwicmVwdWxzZVwiOmkudG1wLnJlcHVsc2VfY2xpY2tpbmc9ITAsaS50bXAucmVwdWxzZV9jb3VudD0wLGkudG1wLnJlcHVsc2VfZmluaXNoPSExLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpLnRtcC5yZXB1bHNlX2NsaWNraW5nPSExfSwxZTMqaS5pbnRlcmFjdGl2aXR5Lm1vZGVzLnJlcHVsc2UuZHVyYXRpb24pfX0pfSxpLmZuLnZlbmRvcnMuZGVuc2l0eUF1dG9QYXJ0aWNsZXM9ZnVuY3Rpb24oKXtpZihpLnBhcnRpY2xlcy5udW1iZXIuZGVuc2l0eS5lbmFibGUpe3ZhciBlPWkuY2FudmFzLmVsLndpZHRoKmkuY2FudmFzLmVsLmhlaWdodC8xZTM7aS50bXAucmV0aW5hJiYoZS89MippLmNhbnZhcy5weHJhdGlvKTt2YXIgYT1lKmkucGFydGljbGVzLm51bWJlci52YWx1ZS9pLnBhcnRpY2xlcy5udW1iZXIuZGVuc2l0eS52YWx1ZV9hcmVhLHQ9aS5wYXJ0aWNsZXMuYXJyYXkubGVuZ3RoLWE7MD50P2kuZm4ubW9kZXMucHVzaFBhcnRpY2xlcyhNYXRoLmFicyh0KSk6aS5mbi5tb2Rlcy5yZW1vdmVQYXJ0aWNsZXModCl9fSxpLmZuLnZlbmRvcnMuY2hlY2tPdmVybGFwPWZ1bmN0aW9uKGUsYSl7Zm9yKHZhciB0PTA7dDxpLnBhcnRpY2xlcy5hcnJheS5sZW5ndGg7dCsrKXt2YXIgcz1pLnBhcnRpY2xlcy5hcnJheVt0XSxuPWUueC1zLngscj1lLnktcy55LGM9TWF0aC5zcXJ0KG4qbityKnIpO2M8PWUucmFkaXVzK3MucmFkaXVzJiYoZS54PWE/YS54Ok1hdGgucmFuZG9tKCkqaS5jYW52YXMudyxlLnk9YT9hLnk6TWF0aC5yYW5kb20oKSppLmNhbnZhcy5oLGkuZm4udmVuZG9ycy5jaGVja092ZXJsYXAoZSkpfX0saS5mbi52ZW5kb3JzLmNyZWF0ZVN2Z0ltZz1mdW5jdGlvbihlKXt2YXIgYT1pLnRtcC5zb3VyY2Vfc3ZnLHQ9LyMoWzAtOUEtRl17Myw2fSkvZ2kscz1hLnJlcGxhY2UodCxmdW5jdGlvbihhLHQsaSxzKXtpZihlLmNvbG9yLnJnYil2YXIgbj1cInJnYmEoXCIrZS5jb2xvci5yZ2IucitcIixcIitlLmNvbG9yLnJnYi5nK1wiLFwiK2UuY29sb3IucmdiLmIrXCIsXCIrZS5vcGFjaXR5K1wiKVwiO2Vsc2UgdmFyIG49XCJoc2xhKFwiK2UuY29sb3IuaHNsLmgrXCIsXCIrZS5jb2xvci5oc2wucytcIiUsXCIrZS5jb2xvci5oc2wubCtcIiUsXCIrZS5vcGFjaXR5K1wiKVwiO3JldHVybiBufSksbj1uZXcgQmxvYihbc10se3R5cGU6XCJpbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLThcIn0pLHI9d2luZG93LlVSTHx8d2luZG93LndlYmtpdFVSTHx8d2luZG93LGM9ci5jcmVhdGVPYmplY3RVUkwobiksbz1uZXcgSW1hZ2U7by5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7ZS5pbWcub2JqPW8sZS5pbWcubG9hZGVkPSEwLHIucmV2b2tlT2JqZWN0VVJMKGMpLGkudG1wLmNvdW50X3N2ZysrfSksby5zcmM9Y30saS5mbi52ZW5kb3JzLmRlc3Ryb3lwSlM9ZnVuY3Rpb24oKXtjYW5jZWxBbmltYXRpb25GcmFtZShpLmZuLmRyYXdBbmltRnJhbWUpLHQucmVtb3ZlKCkscEpTRG9tPW51bGx9LGkuZm4udmVuZG9ycy5kcmF3U2hhcGU9ZnVuY3Rpb24oZSxhLHQsaSxzLG4pe3ZhciByPXMqbixjPXMvbixvPTE4MCooYy0yKS9jLGw9TWF0aC5QSS1NYXRoLlBJKm8vMTgwO2Uuc2F2ZSgpLGUuYmVnaW5QYXRoKCksZS50cmFuc2xhdGUoYSx0KSxlLm1vdmVUbygwLDApO2Zvcih2YXIgdj0wO3I+djt2KyspZS5saW5lVG8oaSwwKSxlLnRyYW5zbGF0ZShpLDApLGUucm90YXRlKGwpO2UuZmlsbCgpLGUucmVzdG9yZSgpfSxpLmZuLnZlbmRvcnMuZXhwb3J0SW1nPWZ1bmN0aW9uKCl7d2luZG93Lm9wZW4oaS5jYW52YXMuZWwudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpLFwiX2JsYW5rXCIpfSxpLmZuLnZlbmRvcnMubG9hZEltZz1mdW5jdGlvbihlKXtpZihpLnRtcC5pbWdfZXJyb3I9dm9pZCAwLFwiXCIhPWkucGFydGljbGVzLnNoYXBlLmltYWdlLnNyYylpZihcInN2Z1wiPT1lKXt2YXIgYT1uZXcgWE1MSHR0cFJlcXVlc3Q7YS5vcGVuKFwiR0VUXCIsaS5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2Uuc3JjKSxhLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbihlKXs0PT1hLnJlYWR5U3RhdGUmJigyMDA9PWEuc3RhdHVzPyhpLnRtcC5zb3VyY2Vfc3ZnPWUuY3VycmVudFRhcmdldC5yZXNwb25zZSxpLmZuLnZlbmRvcnMuY2hlY2tCZWZvcmVEcmF3KCkpOihjb25zb2xlLmxvZyhcIkVycm9yIHBKUyAtIEltYWdlIG5vdCBmb3VuZFwiKSxpLnRtcC5pbWdfZXJyb3I9ITApKX0sYS5zZW5kKCl9ZWxzZXt2YXIgdD1uZXcgSW1hZ2U7dC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7aS50bXAuaW1nX29iaj10LGkuZm4udmVuZG9ycy5jaGVja0JlZm9yZURyYXcoKX0pLHQuc3JjPWkucGFydGljbGVzLnNoYXBlLmltYWdlLnNyY31lbHNlIGNvbnNvbGUubG9nKFwiRXJyb3IgcEpTIC0gTm8gaW1hZ2Uuc3JjXCIpLGkudG1wLmltZ19lcnJvcj0hMH0saS5mbi52ZW5kb3JzLmRyYXc9ZnVuY3Rpb24oKXtcImltYWdlXCI9PWkucGFydGljbGVzLnNoYXBlLnR5cGU/XCJzdmdcIj09aS50bXAuaW1nX3R5cGU/aS50bXAuY291bnRfc3ZnPj1pLnBhcnRpY2xlcy5udW1iZXIudmFsdWU/KGkuZm4ucGFydGljbGVzRHJhdygpLGkucGFydGljbGVzLm1vdmUuZW5hYmxlP2kuZm4uZHJhd0FuaW1GcmFtZT1yZXF1ZXN0QW5pbUZyYW1lKGkuZm4udmVuZG9ycy5kcmF3KTpjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKGkuZm4uZHJhd0FuaW1GcmFtZSkpOmkudG1wLmltZ19lcnJvcnx8KGkuZm4uZHJhd0FuaW1GcmFtZT1yZXF1ZXN0QW5pbUZyYW1lKGkuZm4udmVuZG9ycy5kcmF3KSk6dm9pZCAwIT1pLnRtcC5pbWdfb2JqPyhpLmZuLnBhcnRpY2xlc0RyYXcoKSxpLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZT9pLmZuLmRyYXdBbmltRnJhbWU9cmVxdWVzdEFuaW1GcmFtZShpLmZuLnZlbmRvcnMuZHJhdyk6Y2FuY2VsUmVxdWVzdEFuaW1GcmFtZShpLmZuLmRyYXdBbmltRnJhbWUpKTppLnRtcC5pbWdfZXJyb3J8fChpLmZuLmRyYXdBbmltRnJhbWU9cmVxdWVzdEFuaW1GcmFtZShpLmZuLnZlbmRvcnMuZHJhdykpOihpLmZuLnBhcnRpY2xlc0RyYXcoKSxpLnBhcnRpY2xlcy5tb3ZlLmVuYWJsZT9pLmZuLmRyYXdBbmltRnJhbWU9cmVxdWVzdEFuaW1GcmFtZShpLmZuLnZlbmRvcnMuZHJhdyk6Y2FuY2VsUmVxdWVzdEFuaW1GcmFtZShpLmZuLmRyYXdBbmltRnJhbWUpKX0saS5mbi52ZW5kb3JzLmNoZWNrQmVmb3JlRHJhdz1mdW5jdGlvbigpe1wiaW1hZ2VcIj09aS5wYXJ0aWNsZXMuc2hhcGUudHlwZT9cInN2Z1wiPT1pLnRtcC5pbWdfdHlwZSYmdm9pZCAwPT1pLnRtcC5zb3VyY2Vfc3ZnP2kudG1wLmNoZWNrQW5pbUZyYW1lPXJlcXVlc3RBbmltRnJhbWUoY2hlY2spOihjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKGkudG1wLmNoZWNrQW5pbUZyYW1lKSxpLnRtcC5pbWdfZXJyb3J8fChpLmZuLnZlbmRvcnMuaW5pdCgpLGkuZm4udmVuZG9ycy5kcmF3KCkpKTooaS5mbi52ZW5kb3JzLmluaXQoKSxpLmZuLnZlbmRvcnMuZHJhdygpKX0saS5mbi52ZW5kb3JzLmluaXQ9ZnVuY3Rpb24oKXtpLmZuLnJldGluYUluaXQoKSxpLmZuLmNhbnZhc0luaXQoKSxpLmZuLmNhbnZhc1NpemUoKSxpLmZuLmNhbnZhc1BhaW50KCksaS5mbi5wYXJ0aWNsZXNDcmVhdGUoKSxpLmZuLnZlbmRvcnMuZGVuc2l0eUF1dG9QYXJ0aWNsZXMoKSxpLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5jb2xvcl9yZ2JfbGluZT1oZXhUb1JnYihpLnBhcnRpY2xlcy5saW5lX2xpbmtlZC5jb2xvcil9LGkuZm4udmVuZG9ycy5zdGFydD1mdW5jdGlvbigpe2lzSW5BcnJheShcImltYWdlXCIsaS5wYXJ0aWNsZXMuc2hhcGUudHlwZSk/KGkudG1wLmltZ190eXBlPWkucGFydGljbGVzLnNoYXBlLmltYWdlLnNyYy5zdWJzdHIoaS5wYXJ0aWNsZXMuc2hhcGUuaW1hZ2Uuc3JjLmxlbmd0aC0zKSxpLmZuLnZlbmRvcnMubG9hZEltZyhpLnRtcC5pbWdfdHlwZSkpOmkuZm4udmVuZG9ycy5jaGVja0JlZm9yZURyYXcoKX0saS5mbi52ZW5kb3JzLmV2ZW50c0xpc3RlbmVycygpLGkuZm4udmVuZG9ycy5zdGFydCgpfTtPYmplY3QuZGVlcEV4dGVuZD1mdW5jdGlvbihlLGEpe2Zvcih2YXIgdCBpbiBhKWFbdF0mJmFbdF0uY29uc3RydWN0b3ImJmFbdF0uY29uc3RydWN0b3I9PT1PYmplY3Q/KGVbdF09ZVt0XXx8e30sYXJndW1lbnRzLmNhbGxlZShlW3RdLGFbdF0pKTplW3RdPWFbdF07cmV0dXJuIGV9LHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lPWZ1bmN0aW9uKCl7cmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKGUpe3dpbmRvdy5zZXRUaW1lb3V0KGUsMWUzLzYwKX19KCksd2luZG93LmNhbmNlbFJlcXVlc3RBbmltRnJhbWU9ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cub0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxjbGVhclRpbWVvdXR9KCksd2luZG93LnBKU0RvbT1bXSx3aW5kb3cucGFydGljbGVzSlM9ZnVuY3Rpb24oZSxhKXtcInN0cmluZ1wiIT10eXBlb2YgZSYmKGE9ZSxlPVwicGFydGljbGVzLWpzXCIpLGV8fChlPVwicGFydGljbGVzLWpzXCIpO3ZhciB0PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpLGk9XCJwYXJ0aWNsZXMtanMtY2FudmFzLWVsXCIscz10LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoaSk7aWYocy5sZW5ndGgpZm9yKDtzLmxlbmd0aD4wOyl0LnJlbW92ZUNoaWxkKHNbMF0pO3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7bi5jbGFzc05hbWU9aSxuLnN0eWxlLndpZHRoPVwiMTAwJVwiLG4uc3R5bGUuaGVpZ2h0PVwiMTAwJVwiO3ZhciByPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUpLmFwcGVuZENoaWxkKG4pO251bGwhPXImJnBKU0RvbS5wdXNoKG5ldyBwSlMoZSxhKSl9LHdpbmRvdy5wYXJ0aWNsZXNKUy5sb2FkPWZ1bmN0aW9uKGUsYSx0KXt2YXIgaT1uZXcgWE1MSHR0cFJlcXVlc3Q7aS5vcGVuKFwiR0VUXCIsYSksaS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oYSl7aWYoND09aS5yZWFkeVN0YXRlKWlmKDIwMD09aS5zdGF0dXMpe3ZhciBzPUpTT04ucGFyc2UoYS5jdXJyZW50VGFyZ2V0LnJlc3BvbnNlKTt3aW5kb3cucGFydGljbGVzSlMoZSxzKSx0JiZ0KCl9ZWxzZSBjb25zb2xlLmxvZyhcIkVycm9yIHBKUyAtIFhNTEh0dHBSZXF1ZXN0IHN0YXR1czogXCIraS5zdGF0dXMpLGNvbnNvbGUubG9nKFwiRXJyb3IgcEpTIC0gRmlsZSBjb25maWcgbm90IGZvdW5kXCIpfSxpLnNlbmQoKX07IiwidmFyIGluaXRQaG90b1N3aXBlRnJvbURPTSA9IGZ1bmN0aW9uIChnYWxsZXJ5U2VsZWN0b3IpIHtcclxuXHJcbiAgIC8vIHBhcnNlIHNsaWRlIGRhdGEgKHVybCwgdGl0bGUsIHNpemUgLi4uKSBmcm9tIERPTSBlbGVtZW50cyBcclxuICAgLy8gKGNoaWxkcmVuIG9mIGdhbGxlcnlTZWxlY3RvcilcclxuICAgdmFyIHBhcnNlVGh1bWJuYWlsRWxlbWVudHMgPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgdmFyIHRodW1iRWxlbWVudHMgPSBlbC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICBudW1Ob2RlcyA9IHRodW1iRWxlbWVudHMubGVuZ3RoLFxyXG4gICAgICAgICBpdGVtcyA9IFtdLFxyXG4gICAgICAgICBmaWd1cmVFbCxcclxuICAgICAgICAgbGlua0VsLFxyXG4gICAgICAgICBzaXplLFxyXG4gICAgICAgICBpdGVtO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1Ob2RlczsgaSsrKSB7XHJcblxyXG4gICAgICAgICBmaWd1cmVFbCA9IHRodW1iRWxlbWVudHNbaV07IC8vIDxmaWd1cmU+IGVsZW1lbnRcclxuXHJcbiAgICAgICAgIC8vIGluY2x1ZGUgb25seSBlbGVtZW50IG5vZGVzIFxyXG4gICAgICAgICBpZiAoZmlndXJlRWwubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGxpbmtFbCA9IGZpZ3VyZUVsLmNoaWxkcmVuWzBdOyAvLyA8YT4gZWxlbWVudFxyXG5cclxuICAgICAgICAgc2l6ZSA9IGxpbmtFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpLnNwbGl0KCd4Jyk7XHJcblxyXG4gICAgICAgICBpZiAobGlua0VsLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJykgPT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB2aWRlb1VSTCA9IGxpbmtFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gYDxkaXYgY2xhc3M9XCJnYWxsZXJ5LWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aWZyYW1lIGNsYXNzPVwiZ2FsbGVyeS1jb250YWluZXItaWZyYW1lXCIgc3JjPVwiJHt2aWRlb1VSTH1cIiBnZXN0dXJlPVwibWVkaWFcIiAgYWxsb3c9XCJlbmNyeXB0ZWQtbWVkaWFcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICBpdGVtID0ge1xyXG4gICAgICAgICAgICAgIGh0bWw6IHRlbXBsYXRlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpdGVtID0ge1xyXG4gICAgICAgICAgICAgIHNyYzogbGlua0VsLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxyXG4gICAgICAgICAgICAgIHc6IHBhcnNlSW50KHNpemVbMF0sIDEwKSxcclxuICAgICAgICAgICAgICBoOiBwYXJzZUludChzaXplWzFdLCAxMClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChmaWd1cmVFbC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIC8vIDxmaWdjYXB0aW9uPiBjb250ZW50XHJcbiAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBmaWd1cmVFbC5jaGlsZHJlblsxXS5pbm5lckhUTUw7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChsaW5rRWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyA8aW1nPiB0aHVtYm5haWwgZWxlbWVudCwgcmV0cmlldmluZyB0aHVtYm5haWwgdXJsXHJcbiAgICAgICAgICAgIGl0ZW0ubXNyYyA9IGxpbmtFbC5jaGlsZHJlblswXS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpdGVtLmVsID0gZmlndXJlRWw7IC8vIHNhdmUgbGluayB0byBlbGVtZW50IGZvciBnZXRUaHVtYkJvdW5kc0ZuXHJcbiAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBpdGVtcztcclxuICAgfTtcclxuXHJcbiAgIC8vIGZpbmQgbmVhcmVzdCBwYXJlbnQgZWxlbWVudFxyXG4gICB2YXIgY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3QoZWwsIGZuKSB7XHJcbiAgICAgIHJldHVybiBlbCAmJiAoZm4oZWwpID8gZWwgOiBjbG9zZXN0KGVsLnBhcmVudE5vZGUsIGZuKSk7XHJcbiAgIH07XHJcblxyXG4gICAvLyB0cmlnZ2VycyB3aGVuIHVzZXIgY2xpY2tzIG9uIHRodW1ibmFpbFxyXG4gICB2YXIgb25UaHVtYm5haWxzQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgICB2YXIgZVRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcbiAgICAgIC8vIGZpbmQgcm9vdCBlbGVtZW50IG9mIHNsaWRlXHJcbiAgICAgIHZhciBjbGlja2VkTGlzdEl0ZW0gPSBjbG9zZXN0KGVUYXJnZXQsIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICByZXR1cm4gKGVsLnRhZ05hbWUgJiYgZWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnRklHVVJFJyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFjbGlja2VkTGlzdEl0ZW0pIHtcclxuICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmaW5kIGluZGV4IG9mIGNsaWNrZWQgaXRlbSBieSBsb29waW5nIHRocm91Z2ggYWxsIGNoaWxkIG5vZGVzXHJcbiAgICAgIC8vIGFsdGVybmF0aXZlbHksIHlvdSBtYXkgZGVmaW5lIGluZGV4IHZpYSBkYXRhLSBhdHRyaWJ1dGVcclxuICAgICAgdmFyIGNsaWNrZWRHYWxsZXJ5ID0gY2xpY2tlZExpc3RJdGVtLnBhcmVudE5vZGUsXHJcbiAgICAgICAgIGNoaWxkTm9kZXMgPSBjbGlja2VkTGlzdEl0ZW0ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLFxyXG4gICAgICAgICBudW1DaGlsZE5vZGVzID0gY2hpbGROb2Rlcy5sZW5ndGgsXHJcbiAgICAgICAgIG5vZGVJbmRleCA9IDAsXHJcbiAgICAgICAgIGluZGV4O1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1DaGlsZE5vZGVzOyBpKyspIHtcclxuICAgICAgICAgaWYgKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmIChjaGlsZE5vZGVzW2ldID09PSBjbGlja2VkTGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgaW5kZXggPSBub2RlSW5kZXg7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIG5vZGVJbmRleCsrO1xyXG4gICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgIC8vIG9wZW4gUGhvdG9Td2lwZSBpZiB2YWxpZCBpbmRleCBmb3VuZFxyXG4gICAgICAgICBvcGVuUGhvdG9Td2lwZShpbmRleCwgY2xpY2tlZEdhbGxlcnkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgfTtcclxuXHJcbiAgIC8vIHBhcnNlIHBpY3R1cmUgaW5kZXggYW5kIGdhbGxlcnkgaW5kZXggZnJvbSBVUkwgKCMmcGlkPTEmZ2lkPTIpXHJcbiAgIHZhciBwaG90b3N3aXBlUGFyc2VIYXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSxcclxuICAgICAgICAgcGFyYW1zID0ge307XHJcblxyXG4gICAgICBpZiAoaGFzaC5sZW5ndGggPCA1KSB7XHJcbiAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB2YXJzID0gaGFzaC5zcGxpdCgnJicpO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgaWYgKCF2YXJzW2ldKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICBpZiAocGFpci5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHBhcmFtc1twYWlyWzBdXSA9IHBhaXJbMV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbXMuZ2lkKSB7XHJcbiAgICAgICAgIHBhcmFtcy5naWQgPSBwYXJzZUludChwYXJhbXMuZ2lkLCAxMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgIH07XHJcblxyXG4gICB2YXIgb3BlblBob3RvU3dpcGUgPSBmdW5jdGlvbiAoaW5kZXgsIGdhbGxlcnlFbGVtZW50LCBkaXNhYmxlQW5pbWF0aW9uLCBmcm9tVVJMKSB7XHJcbiAgICAgIHZhciBwc3dwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wc3dwJylbMF0sXHJcbiAgICAgICAgIGdhbGxlcnksXHJcbiAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgIGl0ZW1zO1xyXG5cclxuICAgICAgaXRlbXMgPSBwYXJzZVRodW1ibmFpbEVsZW1lbnRzKGdhbGxlcnlFbGVtZW50KTtcclxuXHJcbiAgICAgIC8vIGRlZmluZSBvcHRpb25zIChpZiBuZWVkZWQpXHJcbiAgICAgIG9wdGlvbnMgPSB7XHJcblxyXG4gICAgICAgICAvLyBkZWZpbmUgZ2FsbGVyeSBpbmRleCAoZm9yIFVSTClcclxuICAgICAgICAgZ2FsbGVyeVVJRDogZ2FsbGVyeUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXBzd3AtdWlkJyksXHJcblxyXG4gICAgICAgICBnZXRUaHVtYkJvdW5kc0ZuOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgLy8gU2VlIE9wdGlvbnMgLT4gZ2V0VGh1bWJCb3VuZHNGbiBzZWN0aW9uIG9mIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgaW5mb1xyXG4gICAgICAgICAgICB2YXIgdGh1bWJuYWlsID0gaXRlbXNbaW5kZXhdLmVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXSwgLy8gZmluZCB0aHVtYm5haWxcclxuICAgICAgICAgICAgICAgcGFnZVlTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgICAgcmVjdCA9IHRodW1ibmFpbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgIHg6IHJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgeTogcmVjdC50b3AgKyBwYWdlWVNjcm9sbCxcclxuICAgICAgICAgICAgICAgdzogcmVjdC53aWR0aFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gUGhvdG9Td2lwZSBvcGVuZWQgZnJvbSBVUkxcclxuICAgICAgaWYgKGZyb21VUkwpIHtcclxuICAgICAgICAgaWYgKG9wdGlvbnMuZ2FsbGVyeVBJRHMpIHtcclxuICAgICAgICAgICAgLy8gcGFyc2UgcmVhbCBpbmRleCB3aGVuIGN1c3RvbSBQSURzIGFyZSB1c2VkIFxyXG4gICAgICAgICAgICAvLyBodHRwOi8vcGhvdG9zd2lwZS5jb20vZG9jdW1lbnRhdGlvbi9mYXEuaHRtbCNjdXN0b20tcGlkLWluLXVybFxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgIGlmIChpdGVtc1tqXS5waWQgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaW4gVVJMIGluZGV4ZXMgc3RhcnQgZnJvbSAxXHJcbiAgICAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApIC0gMTtcclxuICAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBvcHRpb25zLmluZGV4ID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZXhpdCBpZiBpbmRleCBub3QgZm91bmRcclxuICAgICAgaWYgKGlzTmFOKG9wdGlvbnMuaW5kZXgpKSB7XHJcbiAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRpc2FibGVBbmltYXRpb24pIHtcclxuICAgICAgICAgb3B0aW9ucy5zaG93QW5pbWF0aW9uRHVyYXRpb24gPSAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQYXNzIGRhdGEgdG8gUGhvdG9Td2lwZSBhbmQgaW5pdGlhbGl6ZSBpdFxyXG4gICAgICBnYWxsZXJ5ID0gbmV3IFBob3RvU3dpcGUocHN3cEVsZW1lbnQsIFBob3RvU3dpcGVVSV9EZWZhdWx0LCBpdGVtcywgb3B0aW9ucyk7XHJcbiAgICAgIGdhbGxlcnkuaW5pdCgpO1xyXG4gICB9O1xyXG5cclxuICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBnYWxsZXJ5IGVsZW1lbnRzIGFuZCBiaW5kIGV2ZW50c1xyXG4gICB2YXIgZ2FsbGVyeUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChnYWxsZXJ5U2VsZWN0b3IpO1xyXG5cclxuICAgZm9yICh2YXIgaSA9IDAsIGwgPSBnYWxsZXJ5RWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIGdhbGxlcnlFbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHN3cC11aWQnLCBpICsgMSk7XHJcbiAgICAgIGdhbGxlcnlFbGVtZW50c1tpXS5vbmNsaWNrID0gb25UaHVtYm5haWxzQ2xpY2s7XHJcbiAgIH1cclxuXHJcbiAgIC8vIFBhcnNlIFVSTCBhbmQgb3BlbiBnYWxsZXJ5IGlmIGl0IGNvbnRhaW5zICMmcGlkPTMmZ2lkPTFcclxuICAgdmFyIGhhc2hEYXRhID0gcGhvdG9zd2lwZVBhcnNlSGFzaCgpO1xyXG4gICBpZiAoaGFzaERhdGEucGlkICYmIGhhc2hEYXRhLmdpZCkge1xyXG4gICAgICBvcGVuUGhvdG9Td2lwZShoYXNoRGF0YS5waWQsIGdhbGxlcnlFbGVtZW50c1toYXNoRGF0YS5naWQgLSAxXSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgIH1cclxufTsiLCJmdW5jdGlvbiBzbW9vdGhTY3JvbGwobG9jYXRpb24pIHtcclxuICAgaWYgKGxvY2F0aW9uKSB7XHJcbiAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgbG9jYXRpb24pO1xyXG4gICAgICBjb250YWluZXIuc2Nyb2xsSW50b1ZpZXcoe1xyXG4gICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcclxuICAgICAgICAgYmxvY2s6IFwic3RhcnRcIixcclxuICAgICAgICAgaW5saW5lOiBcIm5lYXJlc3RcIlxyXG4gICAgICB9KTtcclxuICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihcIlZhcmnDoXZlbCAnbG9jYXRpb24nIG7Do28gcGFzc2FkYSBubyBldmVudG8gZGUgJ2NsaWNrJ1wiKTtcclxufSIsImZ1bmN0aW9uIGluaXRQYXJ0aWN1bGFzQkcoKSB7XHJcbiAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMTE0LCAxMTQsIDExNClcIjtcclxuICAgaWYgKHBKU0RvbS5sZW5ndGggPT0gMSkge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcnRpY2xlcy1qc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICBwSlNEb21bMF0ucEpTLmZuLnZlbmRvcnMuc3RhcnQoKTtcclxuICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXJ0aWNsZXMtanNcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgcGFydGljbGVzSlMoXCJwYXJ0aWNsZXMtanNcIiwge1xyXG5cclxuICAgICAgICAgXCJwYXJ0aWNsZXNcIjoge1xyXG4gICAgICAgICAgICBcIm51bWJlclwiOiB7XHJcbiAgICAgICAgICAgICAgIFwidmFsdWVcIjogODAsXHJcbiAgICAgICAgICAgICAgIFwiZGVuc2l0eVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgIFwidmFsdWVfYXJlYVwiOiAxMDAwXHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb2xvclwiOiB7XHJcbiAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCIjZmZmXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJzaGFwZVwiOiB7XHJcbiAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNpcmNsZVwiLFxyXG4gICAgICAgICAgICAgICBcInN0cm9rZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwid2lkdGhcIjogMCxcclxuICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMwMDAwMDBcIlxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICBcInBvbHlnb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICBcIm5iX3NpZGVzXCI6IDVcclxuICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgXCJpbWFnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiaHR0cDovL2ltYWdlLmliYi5jby9nOWVGY0YvbG9nb190cmFuc3BhcmVudC5wbmdcIixcclxuICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDEwMFxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiB7XHJcbiAgICAgICAgICAgICAgIFwidmFsdWVcIjogMSxcclxuICAgICAgICAgICAgICAgXCJyYW5kb21cIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgIFwiYW5pbVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBcInNwZWVkXCI6IDEsXHJcbiAgICAgICAgICAgICAgICAgIFwib3BhY2l0eV9taW5cIjogMC42LFxyXG4gICAgICAgICAgICAgICAgICBcInN5bmNcIjogZmFsc2VcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNpemVcIjoge1xyXG4gICAgICAgICAgICAgICBcInZhbHVlXCI6IDMsXHJcbiAgICAgICAgICAgICAgIFwicmFuZG9tXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgIFwiYW5pbVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBcInNwZWVkXCI6IDQwLFxyXG4gICAgICAgICAgICAgICAgICBcInNpemVfbWluXCI6IDAuMSxcclxuICAgICAgICAgICAgICAgICAgXCJzeW5jXCI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsaW5lX2xpbmtlZFwiOiB7XHJcbiAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgIFwiZGlzdGFuY2VcIjogMTIwLFxyXG4gICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZhNzUwMFwiLFxyXG4gICAgICAgICAgICAgICBcIm9wYWNpdHlcIjogMC44LFxyXG4gICAgICAgICAgICAgICBcIndpZHRoXCI6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtb3ZlXCI6IHtcclxuICAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgXCJzcGVlZFwiOiA0LFxyXG4gICAgICAgICAgICAgICBcImRpcmVjdGlvblwiOiBcInJhbmRvbVwiLFxyXG4gICAgICAgICAgICAgICBcInJhbmRvbVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgXCJzdHJhaWdodFwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgXCJvdXRfbW9kZVwiOiBcImJvdW5jZVwiLFxyXG4gICAgICAgICAgICAgICBcImJvdW5jZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICBcImF0dHJhY3RcIjoge1xyXG4gICAgICAgICAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBcInJvdGF0ZVhcIjogMzYwMCxcclxuICAgICAgICAgICAgICAgICAgXCJyb3RhdGVZXCI6IDM2MDBcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICBcImludGVyYWN0aXZpdHlcIjoge1xyXG4gICAgICAgICAgICBcImRldGVjdF9vblwiOiBcImNhbnZhc1wiLFxyXG5cclxuICAgICAgICAgICAgXCJldmVudHNcIjoge1xyXG4gICAgICAgICAgICAgICBcIm9uaG92ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICBcIm1vZGVcIjogXCJyZXB1bHNlXCJcclxuICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgXCJvbmNsaWNrXCI6IHtcclxuICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIFwibW9kZVwiOiBcInJlbW92ZVwiXHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgIFwicmVzaXplXCI6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIFwibW9kZXNcIjoge1xyXG4gICAgICAgICAgICAgICBcInJlcHVsc2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICBcImRpc3RhbmNlXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgXCJkdXJhdGlvblwiOiAwLjRcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0sXHJcbiAgICAgICAgIFwicmV0aW5hX2RldGVjdFwiOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc3Ryb3lQYXJ0aWN1bGFzQkcoKSB7XHJcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFydGljbGVzLWpzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XHJcbiAgIGlmKHBKU0RvbVswXSAhPSB1bmRlZmluZWQpe1xyXG4gICAgICBjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKHBKU0RvbVswXS5wSlMuZm4uY2hlY2tBbmltRnJhbWUpO1xyXG4gICAgICBjYW5jZWxSZXF1ZXN0QW5pbUZyYW1lKHBKU0RvbVswXS5wSlMuZm4uZHJhd0FuaW1GcmFtZSk7XHJcbiAgICAgIHBKU0RvbVswXS5wSlMuZm4ucGFydGljbGVzRW1wdHkoKTtcclxuICAgICAgcEpTRG9tWzBdLnBKUy5mbi5jYW52YXNDbGVhcigpO1xyXG4gICB9XHJcbn0iLCIvLyBpbml0IHNjcm9sbCByZXZlYWwgZSBnYWxlcmlhXHJcbmZ1bmN0aW9uIGluaXRDb21wb25lbnRzKCkge1xyXG4gICB3aW5kb3cuc3IgPSBTY3JvbGxSZXZlYWwoKTtcclxuXHJcbiAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5pbWF0aW9uLWRlZmF1bHQnKS5sZW5ndGggPiAwKVxyXG4gICAgICBzci5yZXZlYWwoJy5hbmltYXRpb24tZGVmYXVsdCcsIHtcclxuICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgfSk7XHJcbiAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5pbWF0aW9uLWNvbW9GdW5jaW9uYScpLmxlbmd0aCA+IDApXHJcbiAgICAgIHNyLnJldmVhbCgnLmFuaW1hdGlvbi1jb21vRnVuY2lvbmEnLCB7XHJcbiAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0sIDUwMCk7XHJcbiAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvcycpLmxlbmd0aCA+IDApXHJcbiAgICAgIHNyLnJldmVhbCgnLmFuaW1hdGlvbi1tb2R1bG9zU2Vydmljb3MnLCB7XHJcbiAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0sIDUwMCk7XHJcblxyXG4gICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKS5sZW5ndGggPiAwKVxyXG4gICAgICBpbml0UGhvdG9Td2lwZUZyb21ET00oJy5nYWxsZXJ5Jyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRWaWV3KHZpZXcpe1xyXG4gICB2YXIgbmF2YmFyID0gZ2V0TmF2QmFyKHZpZXcpO1xyXG4gICB2YXIgdmFtb3NDb252ZXJzYXIgPSBnZXRWYW1vc0NvbnZlcnNhcih2aWV3KTtcclxuICAgdmFyIG5vc3Nvc1RyYWJhbGhvcyA9IGdldE5vc3Nvc1RyYWJhbGhvcyh2aWV3KTtcclxuICAgdmFyIGNvbW9GdW5jaW9uYSA9IGdldENvbW9GdW5jaW9uYSh2aWV3KTtcclxuICAgdmFyIGZvb3RlciA9IGdldEZvb3Rlcih2aWV3KTtcclxuICAgdmFyIG1vZHVsbyA9IGdldE1vZHVsb1ZpZXcodmlldyk7XHJcblxyXG4gICByZXR1cm4ge1xyXG4gICAgICBuYXZiYXI6IG5hdmJhcixcclxuICAgICAgbWFpbjogbW9kdWxvICsgY29tb0Z1bmNpb25hICsgbm9zc29zVHJhYmFsaG9zICsgdmFtb3NDb252ZXJzYXIgKyBmb290ZXJcclxuICAgfTtcclxufSIsImZ1bmN0aW9uIGdldEZvb3Rlcih2aWV3KSB7XHJcbiAgIGlmICh2aWV3ICE9ICdob21lJylcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgPGhyPlxyXG4gICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXItbGVmdFwiPlxyXG4gICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjxpbWcgY2xhc3M9XCJmb290ZXItbGVmdC1sb2dvXCIgc3JjPVwiLi9pbWcvMTFBcnRfT3JpZ2luYWwuc3ZnXCI+PC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+JmNvcHk7IDExQXJ0IDIwMTg8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5nb29nbGUuY29tXCI+PGkgY2xhc3M9XCJmb290ZXItcmlnaHQtZmIgZmEgZmEtZmFjZWJvb2stb2ZmaWNpYWwgZmEtM3hcIj48L2k+PC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPC9mb290ZXI+YDtcclxuICAgZWxzZVxyXG4gICAgICByZXR1cm4gJyc7XHJcbn07IiwiZnVuY3Rpb24gZ2V0TmF2QmFyKHZpZXcpIHtcclxuICAgdmFyIHZpZXdDb2xvciA9IGdldFZpZXdDb2xvcih2aWV3KTtcclxuXHJcbiAgIHJldHVybiBgXHJcbiAgICAgIDxuYXYgY2xhc3M9XCJuYXYgc3Ryb2tlRWZmZWN0XCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiR7dmlld0NvbG9yfVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmF2LWhlYWRlclwiPlxyXG4gICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWhlYWRlci10aXRsZVwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiIyFob21lXCI+XHJcbiAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nLzExQXJ0X1doaXRlLnN2Z1wiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4MFwiIGFsdD1cIlwiPiA8L2E+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5hdi1tb2JpbGVCdG5cIj5cclxuICAgICAgICAgPGxhYmVsIGZvcj1cIm5hdi1tb2JpbGVCdG5Ub29nbGVcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJuYXYtbW9iaWxlQnRuLXRvb2dsZVRleHRcIj5NZW51PC9wPlxyXG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICA8L2xhYmVsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwibmF2LW1vYmlsZUJ0blRvb2dsZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzXCI+XHJcbiAgICAgICAgIDxpbWcgY2xhc3M9XCJuYXYtbGlua3MtbG9nb1wiIHNyYz1cImltZy8xMUFydF9XaGl0ZS5zdmdcIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiODBcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdi1saW5rcy1idG5GZWNoYXJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5hdi1tb2JpbGVCdG5Ub29nbGVcIj5GZWNoYXIgWDwvbGFiZWw+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8YSBocmVmPVwiIyFob21lXCI+SE9NRTwvYT5cclxuICAgICAgICAgPGEgaHJlZj1cIiMhc2Vydmljb3NcIj5TRVJWScOHT1M8L2E+XHJcbiAgICAgICAgIDxhIGhyZWY9XCIjIXBvcnRmb2xpb1wiPlBPUlRGT0xJTzwvYT5cclxuICAgICAgICAgPGEgaHJlZj1cIiMhc29icmVub3NcIj5TT0JSRSBOw5NTPC9hPlxyXG4gICAgICAgICA8YSBjbGFzcz1cIm10bi00IG1iLTEwXCIgaHJlZj1cIiMhY29udGF0b1wiPkNPTlRBVE88L2E+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8L25hdj5cclxuICAgYDtcclxufTsiLCJmdW5jdGlvbiBnZXRWYW1vc0NvbnZlcnNhcih2aWV3KSB7XHJcbiAgIHZhciB2aWV3Q29sb3IgPSBnZXRWaWV3Q29sb3Iodmlldyk7XHJcbiAgIGlmICh2aWV3Q29sb3IgPT0gXCIjZmI4YzAwXCIpXHJcbiAgICAgIHZpZXdDb2xvciA9IFwiMTFhcnRcIjtcclxuICAgZWxzZVxyXG4gICAgICB2aWV3Q29sb3IgPSB2aWV3O1xyXG5cclxuICAgaWYgKHZpZXcgIT0gJ2hvbWUnKVxyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICA8aHIgaWQ9XCJjb250YWluZXJfdmFtb3NDb252ZXJzYXJcIj4gIDwhLS0gQW5jaG9yIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgcGItOFwiPlxyXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImJveFZhbW9zQ29udmVyc2FyXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJib3hWYW1vc0NvbnZlcnNhci10aXRsZVwiPlZhbW9zXHJcbiAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1tYXJrIHRleHQtbWFyay0ke3ZpZXdDb2xvcn1cIj5Db252ZXJzYXI/PC9zcGFuPiA7KTwvaDI+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImJveFZhbW9zQ29udmVyc2FyLWZvcm1cIiByb2xlPVwiZm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLW9mZnNldC0xIGNvbC1sZy0zIGNvbC1tZC01IHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJib3hWYW1vc0NvbnZlcnNhci1pbWcgbWItN1wiIHNyYz1cIi4vaW1nL3Bvc3Rib3guc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTcgY29sLW1kLTcgY29sLXhzLTEyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtQ29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtQ29udHJvbC1sYWJlbFwiPk5vbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtQ29udHJvbC1pbnB1dCBmb3JtQ29udHJvbC1pbnB1dC0ke3ZpZXdDb2xvcn1cIiBwbGFjZWhvbGRlcj1cIkV4OiBKb8Ojb3ppbmhvXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtQ29udHJvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtQ29udHJvbC1sYWJlbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybUNvbnRyb2wtaW5wdXQgZm9ybUNvbnRyb2wtaW5wdXQtJHt2aWV3Q29sb3J9XCIgcGxhY2Vob2xkZXI9XCJzZXVlbWFpbEBlbWFpbC5jb21cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1Db250cm9sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm1Db250cm9sLWxhYmVsXCI+TWVuc2FnZW08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiByZXF1aXJlZCBjbGFzcz1cImZvcm1Db250cm9sLWlucHV0IGZvcm1Db250cm9sLWlucHV0LSR7dmlld0NvbG9yfVwiIHBsYWNlaG9sZGVyPVwiKDAwKSAwMDAwMC0wMDAwXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJib3hWYW1vc0NvbnZlcnNhci1mb3JtLWJ0bkVudmlhciBidG4gYnRuLWZpbGwtJHt2aWV3Q29sb3J9XCIgdHlwZT1cImJ1dHRvblwiPkVudmlhcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYm94VmFtb3NDb252ZXJzYXItZm9ybS1idG5FbnZpYXIgYnRuIGJ0bi1vdXRsaW5lLXJlc2V0XCIgdHlwZT1cInJlc2V0XCI+TGltcGFyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgIGVsc2VcclxuICAgICAgcmV0dXJuICcnO1xyXG59IiwiZnVuY3Rpb24gZ2V0Q29tb0Z1bmNpb25hKHZpZXcpIHtcclxuICAgaWYgKHZpZXcgIT0gJ2hvbWUnICYmIHZpZXcgIT0gJ3BvcnRmb2xpbycgJiYgdmlldyAhPSAnc29icmVub3MnICYmIHZpZXcgIT0gJ2NvbnRhdG8nKXtcclxuICAgICAgdmFyIHZpZXdDbGFzcyA9IGdldFZpZXdDb2xvcih2aWV3KTtcclxuICAgICAgaWYgKHZpZXdDbGFzcyA9PSBcIiNmYjhjMDBcIilcclxuICAgICAgICAgdmlld0NsYXNzID0gXCIxMWFydFwiO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgIHZpZXdDbGFzcyA9IHZpZXc7XHJcblxyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICA8aHIgaWQ9XCJjb250YWluZXJfY29tb0Z1bmNpb25hXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgcGItOCBwdC01XCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cclxuICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJib3hDb21vRnVuY2lvbmFcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImJveENvbW9GdW5jaW9uYS10aXRsZSBhbmltYXRpb24tZGVmYXVsdCBwYi04XCI+Q29tbyBmdW5jaW9uYT8gPHNwYW4gY2xhc3M9XCJ0ZXh0LW1hcmsgdGV4dC1tYXJrLSR7dmlld0NsYXNzfVwiPsOJIGJlbSBzaW1wbGVzITwvc3Bhbj48L2gyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNCBib3hDb21vRnVuY2lvbmEtbWwgYW5pbWF0aW9uLWNvbW9GdW5jaW9uYVwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWNpcmNsZSBib3hDb21vRnVuY2lvbmEtY2lyY2xlLSR7dmlld0NsYXNzfVwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1jaXJjbGUtJHt2aWV3Q2xhc3N9LWltZyBmYSBmYS01eCBmYS1zbWlsZS1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtZGVzY3JpcHRpb24tdGl0bGUgbWItMFwiPjEgLSBDb250YSBwcmEgZ2VudGUhPC9oND5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtZGVzY3JpcHRpb24tc3VidGl0bGUgbXQtMFwiPlByaW1laXJvIHZvY8OqIHZhaSBkaXplciBkbyBxdWUgcHJlY2lzYSEgQmFubmVyLCBjYXJ0w6NvLCBmYWNlYm9vaywgcGFuZmxldG8gKC4uLik8L3A+ICAgXHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtNCBhbmltYXRpb24tY29tb0Z1bmNpb25hXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtY2lyY2xlIGJveENvbW9GdW5jaW9uYS1jaXJjbGUtJHt2aWV3Q2xhc3N9XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWNpcmNsZS0ke3ZpZXdDbGFzc30taW1nIGZhIGZhLTV4IGZhLXBlbmNpbFwiPjwvaT5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWRlc2NyaXB0aW9uLXRpdGxlIG1iLTBcIj4yIC0gUHJpbWVpcm8gZXNib8OnbzwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYm94Q29tb0Z1bmNpb25hLWRlc2NyaXB0aW9uLXN1YnRpdGxlIG10LTBcIj5WYW1vcyBwcmVwYXJhciBlIGFwcmVzZW50YXIgdW0gZXNib8OnbyBkbyBxdWUgcGxhbmVqYW1vcyBmYXplciwgPHNwYW4gY2xhc3M9XCJmdy03MDBcIj5zZW0gcGFnYW1lbnRvIGluaWNpYWwuPC9zcGFuPjwvcD4gICBcclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC00IGFuaW1hdGlvbi1jb21vRnVuY2lvbmFcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1jaXJjbGUgYm94Q29tb0Z1bmNpb25hLWNpcmNsZS0ke3ZpZXdDbGFzc31cIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtY2lyY2xlLSR7dmlld0NsYXNzfS1pbWcgZmEgZmEtNXggZmEtc3Rhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJib3hDb21vRnVuY2lvbmEtZGVzY3JpcHRpb24tdGl0bGUgbWItMFwiPjMgLSBBcHJvdmFkbyE8L2g0PlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImJveENvbW9GdW5jaW9uYS1kZXNjcmlwdGlvbi1zdWJ0aXRsZSBtdC0wXCI+Q29tIG8gZXNib8OnbyBhcHJvdmFkbywgaXJlbW9zIGRhciBjb250aW51aWRhZGUgYW8gcHJvamV0byAuLi4uLi4uIDwvcD4gICBcclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8L2FydGljbGU+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5gO1xyXG4gICB9XHJcbiAgIGVsc2VcclxuICAgICAgcmV0dXJuICcnO1xyXG59OyIsImZ1bmN0aW9uIGdldE1vZHVsb1ZpZXcgKHZpZXcpIHtcclxuICAgaWYgKHZpZXcgPT0gJzNkJyB8fCB2aWV3ID09ICdkZXNpZ24nIHx8IHZpZXcgPT0gJ3ZpZGVvJyB8fCB2aWV3ID09ICd3ZWInKXtcclxuICAgICAgXHJcbiAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgICAgICAgaW1nOiAnJyxcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gWyBERVNJR04gXVxyXG4gICAgICBpZih2aWV3ID09IFwiZGVzaWduXCIpe1xyXG4gICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ0Rlc2lnbiBHcsOhZmljbycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSW52ZW50b3JlIHJhdGlvbmUgcmVpY2llbmRpcyB0b3RhbSBvZGlvLCBxdW8gZGVsZW5pdGkgYmVhdGFlIGVhcXVlIGV4cGVkaXRhIHZlcm8gZWEsIG9kaXQgZXN0IG9mZmljaWlzIHRlbXBvcmlidXMgYWQuJyxcclxuICAgICAgICAgICAgaW1nOiAnLi9pbWcvZGVzaWduX2Muc3ZnJyxcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBbIFdFQiBdXHJcbiAgICAgIGVsc2UgaWYodmlldyA9PSBcIndlYlwiKXtcclxuICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdXZWJzaXRlJyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBJbnZlbnRvcmUgcmF0aW9uZSByZWljaWVuZGlzIHRvdGFtIG9kaW8sIHF1byBkZWxlbml0aSBiZWF0YWUgZWFxdWUgZXhwZWRpdGEgdmVybyBlYSwgb2RpdCBlc3Qgb2ZmaWNpaXMgdGVtcG9yaWJ1cyBhZC4nLFxyXG4gICAgICAgICAgICBpbWc6ICcuL2ltZy93ZWJfYy5zdmcnLFxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFsgVklERU8gXVxyXG4gICAgICBlbHNlIGlmKHZpZXcgPT0gXCJ2aWRlb1wiKXtcclxuICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdQcm9kdcOnw6NvIFbDrWRlbycsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gSW52ZW50b3JlIHJhdGlvbmUgcmVpY2llbmRpcyB0b3RhbSBvZGlvLCBxdW8gZGVsZW5pdGkgYmVhdGFlIGVhcXVlIGV4cGVkaXRhIHZlcm8gZWEsIG9kaXQgZXN0IG9mZmljaWlzIHRlbXBvcmlidXMgYWQuJyxcclxuICAgICAgICAgICAgaW1nOiAnLi9pbWcvdmlkZW9fYy5zdmcnLFxyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFsgM0QgXVxyXG4gICAgICBlbHNlIGlmKHZpZXcgPT0gXCIzZFwiKXtcclxuICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdNb2RlbGFnZW0gM0QnLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEludmVudG9yZSByYXRpb25lIHJlaWNpZW5kaXMgdG90YW0gb2RpbywgcXVvIGRlbGVuaXRpIGJlYXRhZSBlYXF1ZSBleHBlZGl0YSB2ZXJvIGVhLCBvZGl0IGVzdCBvZmZpY2lpcyB0ZW1wb3JpYnVzIGFkLicsXHJcbiAgICAgICAgICAgIGltZzogJy4vaW1nLzNkX2Muc3ZnJyxcclxuICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkVycm8gYW8gaW5zZXJpciBNw7NkdWxvLlwiKVxyXG5cclxuXHJcbiAgICAgIHJldHVybiBgXHJcbiAgICAgIDxhcnRpY2xlIGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgY29sLXhzLTEyIHBhbmVsIGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1sZWZ0IGNvbC1tZC01IGNvbC1sZy0zIGNvbC1sZy1vZmZzZXQtMSBjb2wteHMtMTIgY29sLXNtLTEyIHRleHQtY2VudGVyIFwiPlxyXG4gICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwicGFuZWwtbGVmdC1pbWdcIiBzcmM9XCIke2RhdGEuaW1nfVwiPlxyXG4gICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYW5lbC1sZWZ0LXRpdGxlIG1iLTBcIj4ke2RhdGEudGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1yaWdodCBjb2wtbWQtNyBjb2wtbGctNyBjb2wteHMtMTIgY29sLXNtLTEyXCI+XHJcbiAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicGFuZWwtcmlnaHQtZGVzY3JpcHRpb24gbXQtMFwiPiR7ZGF0YS5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBhbmltYXRpb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLSR7dmlld31cIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX2NvbW9GdW5jaW9uYScpXCIgdHlwZT1cImJ1dHRvblwiPkNvbW8gZnVuY2lvbmE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS0ke3ZpZXd9IG1sLTJcIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX25vc3Nvc1RyYWJhbGhvcycpXCIgdHlwZT1cImJ1dHRvblwiPk5vc3NvcyB0cmFiYWxob3M8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZmlsbC0ke3ZpZXd9IG1sLTJcIiByb2xlPVwiYnV0dG9uXCIgb25jbGljaz1cInNtb290aFNjcm9sbCgnY29udGFpbmVyX3ZhbW9zQ29udmVyc2FyJylcIiB0eXBlPVwiYnV0dG9uXCI+VmFtb3MgY29udmVyc2FyPzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9hcnRpY2xlPmA7XHJcbiAgIH1cclxuICAgZWxzZVxyXG4gICAgICByZXR1cm4gJyc7XHJcbn07IiwiZnVuY3Rpb24gZ2V0Tm9zc29zVHJhYmFsaG9zKHZpZXcpIHtcclxuICAgdmFyIHZpZXdDb2xvciA9IGdldFZpZXdDb2xvcih2aWV3KTtcclxuICAgdmFyIGNvbG9yQ2xhc3MgPSB2aWV3O1xyXG4gICB2YXIgZ2FsZXJpYUZvdG9zID0gW107XHJcblxyXG4gICBpZiAodmlld0NvbG9yID09IFwiI2ZiOGMwMFwiKVxyXG4gICAgICB2aWV3Q29sb3IgPSBcIjExYXJ0XCI7XHJcbiAgIGVsc2VcclxuICAgICAgdmlld0NvbG9yID0gdmlldztcclxuXHJcbiAgIC8vIFsgM0QgXVxyXG4gICBpZiAodmlldyA9PSBcIjNkXCIpXHJcbiAgICAgIGdhbGVyaWFGb3RvcyA9IFt7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH1dO1xyXG5cclxuXHJcbiAgIC8vIFsgVklERU8gXVxyXG4gICBlbHNlIGlmICh2aWV3ID09IFwidmlkZW9cIilcclxuICAgICAgZ2FsZXJpYUZvdG9zID0gW3tcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDUvMTAwNVwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9pUDJKR2xpVGR2dz9yZWw9MFwiLFxyXG4gICAgICAgICB0eXBlOiBcInZpZGVvXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDUvMTAwNVwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9pUDJKR2xpVGR2dz9yZWw9MFwiLFxyXG4gICAgICAgICB0eXBlOiBcInZpZGVvXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDUvMTAwNVwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9pUDJKR2xpVGR2dz9yZWw9MFwiLFxyXG4gICAgICAgICB0eXBlOiBcInZpZGVvXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDUvMTAwNVwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9pUDJKR2xpVGR2dz9yZWw9MFwiLFxyXG4gICAgICAgICB0eXBlOiBcInZpZGVvXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH1dO1xyXG5cclxuXHJcbiAgIC8vIFsgREVTSUdOIF1cclxuICAgZWxzZSBpZiAodmlldyA9PSBcImRlc2lnblwiKVxyXG4gICAgICBnYWxlcmlhRm90b3MgPSBbe1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9XTtcclxuXHJcblxyXG4gICAvLyBbIFdFQiBdXHJcbiAgIGVsc2UgaWYgKHZpZXcgPT0gXCJ3ZWJcIilcclxuICAgICAgZ2FsZXJpYUZvdG9zID0gW3tcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfV07XHJcblxyXG4gICAgICAvLyBbIFNFUlZJw4dPUyBdXHJcbiAgICAgIGVsc2UgaWYgKHZpZXcgPT0gXCJzZXJ2aWNvc1wiKXtcclxuICAgICAgY29sb3JDbGFzcyA9IFwiMTFhcnRcIjsgLy8gRmF6ZXIgYSBjbGFzc2UgZmljYXIgbGFyYW5qYVxyXG4gICAgICBnYWxlcmlhRm90b3MgPSBbe1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcjogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyX2FsdDogXCJhYVwiLFxyXG4gICAgICAgICBzb3VyY2U6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIHR5cGU6IFwiaW1nXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcIlRlc3RlXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRlc3RlIGRlc1wiXHJcbiAgICAgIH0sIHtcclxuICAgICAgICAgaW1nX3BsYWNlaG9sZGVyOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXJfYWx0OiBcImFhXCIsXHJcbiAgICAgICAgIHNvdXJjZTogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDEwLzEwMTBcIixcclxuICAgICAgICAgdHlwZTogXCJpbWdcIixcclxuICAgICAgICAgdGl0bGU6IFwiVGVzdGVcIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiVGVzdGUgZGVzXCJcclxuICAgICAgfSwge1xyXG4gICAgICAgICBpbWdfcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAxMC8xMDEwXCIsXHJcbiAgICAgICAgIGltZ19wbGFjZWhvbGRlcl9hbHQ6IFwiYWFcIixcclxuICAgICAgICAgc291cmNlOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMTAvMTAxMFwiLFxyXG4gICAgICAgICB0eXBlOiBcImltZ1wiLFxyXG4gICAgICAgICB0aXRsZTogXCJUZXN0ZVwiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJUZXN0ZSBkZXNcIlxyXG4gICAgICB9XTtcclxuICAgfVxyXG5cclxuICAgZWxzZSBnYWxlcmlhRm90b3MgPSBbXTsgLy8gRGVpeGEgdmF6aW9cclxuICAgaWYgKGdhbGVyaWFGb3Rvcy5sZW5ndGggPT0gNClcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgPGhyIGlkPVwiY29udGFpbmVyX25vc3Nvc1RyYWJhbGhvc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IGFuaW1hdGlvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgcGItNiBwdC01XCI+XHJcbiAgICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwiYm94Tm9zc29zVHJhYmFsaG9zXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJib3hOb3Nzb3NUcmFiYWxob3MtdGl0bGVcIj5BbGd1bnMgZGUgPHNwYW4gY2xhc3M9XCJ0ZXh0LW1hcmsgdGV4dC1tYXJrLSR7Y29sb3JDbGFzc31cIj5ub3Nzb3MgdHJhYmFsaG9zITwvc3Bhbj48L2gyPlxyXG4gICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtMyBjb2wteHMtNlwiPiBcclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7Z2FsZXJpYUZvdG9zWzBdLnNvdXJjZX1cIiBkYXRhLXNpemU9XCIxMDAweDEwMDBcIiBkYXRhLXR5cGU9XCIke2dhbGVyaWFGb3Rvc1swXS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7Z2FsZXJpYUZvdG9zWzBdLmltZ19wbGFjZWhvbGRlcn1cIiBhbHQ9XCIke2dhbGVyaWFGb3Rvc1swXS5pbWdfcGxhY2Vob2xkZXJfYWx0fVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheS10ZXh0XCI+JHtnYWxlcmlhRm90b3NbMF0udGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uPiR7Z2FsZXJpYUZvdG9zWzBdLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY29sLWxnLTMgY29sLW1kLTMgY29sLXhzLTZcIj4gXHJcbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke2dhbGVyaWFGb3Rvc1sxXS5zb3VyY2V9XCIgZGF0YS1zaXplPVwiMTAwMHgxMDAwXCIgZGF0YS10eXBlPVwiJHtnYWxlcmlhRm90b3NbMV0udHlwZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke2dhbGVyaWFGb3Rvc1sxXS5pbWdfcGxhY2Vob2xkZXJ9XCIgYWx0PVwiJHtnYWxlcmlhRm90b3NbMV0uaW1nX3BsYWNlaG9sZGVyX2FsdH1cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXktdGV4dFwiPiR7Z2FsZXJpYUZvdG9zWzFdLnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICA8ZmlnY2FwdGlvbj4ke2dhbGVyaWFGb3Rvc1sxXS5kZXNjcmlwdGlvbn08L2ZpZ2NhcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIDwvZmlndXJlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC0zIGNvbC14cy02XCI+IFxyXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtnYWxlcmlhRm90b3NbMl0uc291cmNlfVwiIGRhdGEtc2l6ZT1cIjEwMDB4MTAwMFwiIGRhdGEtdHlwZT1cIiR7Z2FsZXJpYUZvdG9zWzJdLnR5cGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtnYWxlcmlhRm90b3NbMl0uaW1nX3BsYWNlaG9sZGVyfVwiIGFsdD1cIiR7Z2FsZXJpYUZvdG9zWzJdLmltZ19wbGFjZWhvbGRlcl9hbHR9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5LXRleHRcIj4ke2dhbGVyaWFGb3Rvc1syXS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgPGZpZ2NhcHRpb24+JHtnYWxlcmlhRm90b3NbMl0uZGVzY3JpcHRpb259PC9maWdjYXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICA8L2ZpZ3VyZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgIDxmaWd1cmUgY2xhc3M9XCJjb2wtbGctMyBjb2wtbWQtMyBjb2wteHMtNlwiPiBcclxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7Z2FsZXJpYUZvdG9zWzNdLnNvdXJjZX1cIiBkYXRhLXNpemU9XCIxMDAweDEwMDBcIiBkYXRhLXR5cGU9XCIke2dhbGVyaWFGb3Rvc1szXS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7Z2FsZXJpYUZvdG9zWzNdLmltZ19wbGFjZWhvbGRlcn1cIiBhbHQ9XCIke2dhbGVyaWFGb3Rvc1szXS5pbWdfcGxhY2Vob2xkZXJfYWx0fVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheS10ZXh0XCI+JHtnYWxlcmlhRm90b3NbM10udGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgIDxmaWdjYXB0aW9uPiR7Z2FsZXJpYUZvdG9zWzNdLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGNvbC14cy0xMiB0ZXh0LWNlbnRlciBtdC02IHBsLTIgcHItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiIyFwb3J0Zm9saW9cIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS0ke2NvbG9yQ2xhc3N9IGZsb2F0LW5vbmVfaVwiPlZlciBtYWlzITwvYnV0dG9uPjwvYT5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmA7XHJcbiAgIGVsc2VcclxuICAgICAgcmV0dXJuICcnO1xyXG59IiwiZnVuY3Rpb24gZ2V0Vmlld0NvbG9yKHZpZXcpIHtcclxuICAgaWYgKHZpZXcgPT0gXCJob21lXCIpXHJcbiAgICAgIHJldHVybiBcIiNmYjhjMDBiYVwiO1xyXG4gICBlbHNlIGlmICh2aWV3ID09IFwid2ViXCIpXHJcbiAgICAgIHJldHVybiBcInJnYigwLCAxMjIsIDI1MClcIjtcclxuICAgZWxzZSBpZiAodmlldyA9PSBcInZpZGVvXCIpXHJcbiAgICAgIHJldHVybiBcInJnYigyNTUsIDU5LCA0OClcIjtcclxuICAgZWxzZSBpZiAodmlldyA9PSBcIjNkXCIpXHJcbiAgICAgIHJldHVybiBcInJnYig4OCwgODYsIDIxNClcIjtcclxuICAgZWxzZSBpZiAodmlldyA9PSBcImRlc2lnblwiKVxyXG4gICAgICByZXR1cm4gXCJyZ2IoNzYsIDIxNywgMTAwKVwiO1xyXG4gICBlbHNlXHJcbiAgICAgIHJldHVybiBcIiNmYjhjMDBcIjtcclxufSIsImZ1bmN0aW9uIGxvYWRIVE1MKHVybCwgdmlldykge1xuICBpZih2aWV3ID09ICczZCcgfHwgdmlldyA9PSAnZGVzaWduJyB8fCB2aWV3ID09ICd2aWRlbycgfHwgdmlldyA9PSAnd2ViJyl7XG4gICBpbml0V2l0aG91dEZldGNoKFwibW9kdWxvc1wiLCB2aWV3KTtcbiAgfVxuICBlbHNle1xuICAgaW5pdEZldGNoKHVybCwgdmlldyk7XG4gIH1cblxuXG59XG5cbmZ1bmN0aW9uIGluaXRXaXRob3V0RmV0Y2gocGFnZSwgdmlldyl7XG4gICB2YXIgY29udGFpbmVycyA9IGluaXRWaWV3KHZpZXcpOyAvLyBQZWdhIG9zIGNvbnRhaW5lcnNcblxuICAgLy8gSW5zZXJlIG5vIEhUTUxcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2YmFyXCIpLmlubmVySFRNTCA9IGNvbnRhaW5lcnMubmF2YmFyO1xuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpLmlubmVySFRNTCA9IGNvbnRhaW5lcnMubWFpbjtcbiAgIGluaXRBZnRlckxvYWRIVE1MKHZpZXcpO1xufVxuXG5mdW5jdGlvbiBpbml0RmV0Y2godXJsLCB2aWV3KXtcbiAgIGZldGNoKHVybClcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS50ZXh0KCk7IH0pXG4gICAgICAudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgIHZhciBjb250YWluZXJzID0gaW5pdFZpZXcodmlldyk7IC8vIFBlZ2Egb3MgY29udGFpbmVyc1xuXG4gICAgICAgICAvLyBJbnNlcmUgbm8gSFRNTFxuICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXZiYXJcIikuaW5uZXJIVE1MID0gY29udGFpbmVycy5uYXZiYXI7XG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIikuaW5uZXJIVE1MID0gZGF0YSArIGNvbnRhaW5lcnMubWFpbjtcbiAgICAgICAgIGluaXRBZnRlckxvYWRIVE1MKHZpZXcpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XG4gICAgICB9KTtcbiAgIH07XG5cbmZ1bmN0aW9uIGluaXRBZnRlckxvYWRIVE1MKHZpZXcpe1xuICAgaW5pdENvbXBvbmVudHMoKTsgLy8gSW5pY2lhciBHYWxlcmlhIGUgQW5pbWHDp8O1ZXMgc3VhdmVzXG4gICBzbW9vdGhTY3JvbGwoXCJuYXZiYXJcIik7IC8vIFbDoSBwYXJhIG8gdG9wb1xuICAgdmlldyA9PSBcImhvbWVcIiA/IGluaXRQYXJ0aWN1bGFzQkcoKSA6IGRlc3Ryb3lQYXJ0aWN1bGFzQkcoKTsgLy8gQ29uc3Ryw7NpL0Rlc3Ryw7NpIHBhcnRpY3VsYXMgYmFzZWFkbyBzZSDDqSBcImhvbWVcIiBvdSBuw6NvXG4gICBpZiAodmlldyA9PSBcInBvcnRmb2xpb1wiKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjExYXJ0XCIpLmNsaWNrKCk7IC8vIENsaWNhIG5vIFwiVG9kb3NcIiBzZSBmb3IgYSB0ZWxhIGRlIHBvcnRmb2xpb1xufVxuXG4vLyB1c2UgIyEgdG8gaGFzaFxucm91dGVyID0gbmV3IE5hdmlnbyhudWxsLCB0cnVlLCAnIyEnKTtcbnJvdXRlci5vbih7XG4gICAnaG9tZSc6IGZ1bmN0aW9uIGhvbWUoKSB7XG4gICAgICBsb2FkSFRNTCgnLi9ob21lLmh0bWwnLCBcImhvbWVcIik7XG4gICB9LFxuICAgJ2Rlc2lnbic6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgICAgIGxvYWRIVE1MKCcuL2Rlc2lnbi5odG1sJywgXCJkZXNpZ25cIik7XG4gICB9LFxuICAgJzNkJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoJy4vM2QuaHRtbCcsIFwiM2RcIik7XG4gICB9LFxuICAgJ3dlYic6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgICAgIGxvYWRIVE1MKCcuL3dlYi5odG1sJywgXCJ3ZWJcIik7XG4gICB9LFxuICAgJ3ZpZGVvJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoJy4vdmlkZW8uaHRtbCcsIFwidmlkZW9cIik7XG4gICB9LFxuICAgJ3NvYnJlbm9zJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoJy4vc29icmVub3MuaHRtbCcsIFwic29icmVub3NcIik7XG4gICB9LFxuICAgJ2NvbnRhdG8nOiBmdW5jdGlvbiBkZXNpZ24oKSB7XG4gICAgICBsb2FkSFRNTCgnLi9jb250YXRvLmh0bWwnLCBcImNvbnRhdG9cIik7XG4gICB9LFxuICAgJ3BvcnRmb2xpbyc6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgICAgIGxvYWRIVE1MKCcuL3BvcnRmb2xpby5odG1sJywgXCJwb3J0Zm9saW9cIik7XG4gICB9LFxuICAgJ3NlcnZpY29zJzogZnVuY3Rpb24gZGVzaWduKCkge1xuICAgICAgbG9hZEhUTUwoJy4vc2Vydmljb3MuaHRtbCcsIFwic2Vydmljb3NcIik7XG4gICB9LFxufSk7XG5cbi8vIHNldCB0aGUgZGVmYXVsdCByb3V0ZVxucm91dGVyLm9uKGZ1bmN0aW9uICgpIHtcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuaW5uZXJIVE1MID0gbG9hZEhUTUwoJy4vaG9tZS5odG1sJywgJ3ZpZXcnLCBcImhvbWVcIik7XG59KTtcblxuLy8gc2V0IHRoZSA0MDQgcm91dGVcbnJvdXRlci5ub3RGb3VuZChmdW5jdGlvbiAocXVlcnkpIHtcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJykuaW5uZXJIVE1MID0gJzxoMT5UT0RPIC0gTk9URk9VTkQ8L2gxPic7XG59KTtcblxucm91dGVyLnJlc29sdmUoKTsiLCJmdW5jdGlvbiBwb3J0Zm9saW9GaWx0cmFyKG1vZHVsbyl7XHJcbiAgIHByZWVuY2hlQm90YW8obW9kdWxvKTtcclxuICAgc3dpdGNoIChtb2R1bG8pIHtcclxuICAgICAgY2FzZSBcIjNkXCI6XHJcbiAgICAgICAgIG1vbnRhR2FsZXJpYShcIjNkXCIsIGdldE1vZHVsbyhcIjNkXCIpKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwidmlkZW9cIjpcclxuICAgICAgICAgbW9udGFHYWxlcmlhKFwidmlkZW9cIiwgZ2V0TW9kdWxvKFwidmlkZW9cIikpO1xyXG4gICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJ3ZWJcIjpcclxuICAgICAgICBtb250YUdhbGVyaWEoXCJ3ZWJcIiwgZ2V0TW9kdWxvKFwid2ViXCIpKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwiZGVzaWduXCI6XHJcbiAgICAgICAgIG1vbnRhR2FsZXJpYShcImRlc2lnblwiLCBnZXRNb2R1bG8oXCJkZXNpZ25cIikpO1xyXG4gICAgICBicmVhaztcclxuICAgXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgIHZhciBsaW5rc01vZHVsb3NUT0RPUyA9IFtnZXRNb2R1bG8oXCIzZFwiKSwgZ2V0TW9kdWxvKFwidmlkZW9cIiksIGdldE1vZHVsbyhcIndlYlwiKSwgZ2V0TW9kdWxvKFwiZGVzaWduXCIpXTtcclxuICAgICAgICAgbW9udGFHYWxlcmlhVG9kb3MobGlua3NNb2R1bG9zVE9ET1MpO1xyXG4gICAgICBicmVhaztcclxuICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb250YUdhbGVyaWEobW9kdWxvLCBsaW5rcyl7XHJcbiAgIHZhciB0ZW1wbGF0ZV9maW5hbCA9ICcnO1xyXG4gICBcclxuICAgbGlua3MuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgdGVtcGxhdGVfZmluYWwgKz0gXHJcbiAgICAgIGBcclxuICAgICAgPGZpZ3VyZSBjbGFzcz1cImNvbC1sZy0zIGNvbC1tZC0zIGNvbC14cy02IGdhbGxlcnktJHttb2R1bG99IGFuaW1hdGVkIGZhZGVJblwiPlxyXG4gICAgICAgICA8YSBocmVmPVwiJHtpdGVtLmltZ31cIiBkYXRhLXNpemU9XCIxMDAweDEwMDBcIj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cImdhbGxlcnktJHttb2R1bG99LWltZ1wiIHNyYz1cIiR7aXRlbS5taW5pSW1nfVwiIGFsdD1cIiR7aXRlbS5hbHR9XCIgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnktb3ZlcmxheVwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5LXRleHRcIj4ke2l0ZW0udGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8L2E+XHJcbiAgICAgICAgIDxmaWdjYXB0aW9uPiR7aXRlbS5kZXNjcmlwdGlvbn08L2ZpZ2NhcHRpb24+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgIDwvZmlndXJlPlxyXG4gICAgICBgO1xyXG4gICB9KTtcclxuXHJcbiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5JykuaW5uZXJIVE1MID0gdGVtcGxhdGVfZmluYWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vbnRhR2FsZXJpYVRvZG9zKGxpbmtzKXtcclxuICAgdmFyIHRlbXBsYXRlX2ZpbmFsID0gJyc7XHJcblxyXG4gICBsaW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpbmRleCl7XHJcbiAgICAgIHZhciBtb2R1bG8gPSAnJztcclxuICAgICAgaWYoaW5kZXggPT0gMCkgbW9kdWxvID0gXCIzZFwiO1xyXG4gICAgICBlbHNlIGlmKGluZGV4ID09IDEpIG1vZHVsbyA9IFwidmlkZW9cIjtcclxuICAgICAgZWxzZSBpZihpbmRleCA9PSAyKSBtb2R1bG8gPSBcIndlYlwiO1xyXG4gICAgICBlbHNlIG1vZHVsbyA9IFwiZGVzaWduXCI7XHJcblxyXG4gICAgICBlbC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICB0ZW1wbGF0ZV9maW5hbCArPSBcclxuICAgICAgICAgYFxyXG4gICAgICAgICA8ZmlndXJlIGNsYXNzPVwiY29sLWxnLTMgY29sLW1kLTMgY29sLXhzLTYgZ2FsbGVyeS0ke21vZHVsb30gYW5pbWF0ZWQgZmFkZUluXCI+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIke2l0ZW0uaW1nfVwiIGRhdGEtc2l6ZT1cIjEwMDB4MTAwMFwiPlxyXG4gICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiZ2FsbGVyeS0ke21vZHVsb30taW1nXCIgc3JjPVwiJHtpdGVtLm1pbmlJbWd9XCIgYWx0PVwiJHtpdGVtLmFsdH1cIiAvPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeS1vdmVybGF5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LW92ZXJsYXktdGV4dFwiPiR7aXRlbS50aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPGZpZ2NhcHRpb24+JHtpdGVtLmRlc2NyaXB0aW9ufTwvZmlnY2FwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgPC9maWd1cmU+XHJcbiAgICAgICAgIGA7XHJcbiAgICAgIH0pO1xyXG4gICB9KTtcclxuXHJcbiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5JykuaW5uZXJIVE1MID0gdGVtcGxhdGVfZmluYWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1vZHVsbyhtb2R1bG8pe1xyXG4gICAvLyAzRFxyXG4gICBpZihtb2R1bG8gPT0gXCIzZFwiKVxyXG4gICAgICByZXR1cm4gW3tcclxuICAgICAgICAgaW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwM1wiLFxyXG4gICAgICAgICBtaW5pSW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwM1wiLFxyXG4gICAgICAgICBhbHQ6IFwidGVzdGVcIixcclxuICAgICAgICAgdGl0bGU6IFwidGl0dWxvXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uXCJcclxuICAgICAgfV07XHJcblxyXG4gICAvLyBWw41ERU9cclxuICAgaWYobW9kdWxvID09IFwidmlkZW9cIilcclxuICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgIGltZzogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDAwLzEwMDVcIixcclxuICAgICAgICAgbWluaUltZzogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDAwLzEwMDVcIixcclxuICAgICAgICAgYWx0OiBcInRlc3RlXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcInRpdHVsb1wiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvblwiXHJcbiAgICAgIH1dO1xyXG5cclxuICAgLy8gV0VCXHJcbiAgIGlmKG1vZHVsbyA9PSBcIndlYlwiKVxyXG4gICAgICByZXR1cm4gW3tcclxuICAgICAgICAgaW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwNFwiLFxyXG4gICAgICAgICBtaW5pSW1nOiBcImh0dHBzOi8vcGxhY2VraXR0ZW4uY29tLzEwMDAvMTAwNFwiLFxyXG4gICAgICAgICBhbHQ6IFwidGVzdGVcIixcclxuICAgICAgICAgdGl0bGU6IFwidGl0dWxvXCIsXHJcbiAgICAgICAgIGRlc2NyaXB0aW9uOiBcImRlc2NyaXB0aW9uXCJcclxuICAgICAgfV07XHJcblxyXG4gICAvLyBERVNJR05cclxuICAgaWYobW9kdWxvID09IFwiZGVzaWduXCIpXHJcbiAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICBpbWc6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwMC8xMDAxXCIsXHJcbiAgICAgICAgIG1pbmlJbWc6IFwiaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20vMTAwMC8xMDAxXCIsXHJcbiAgICAgICAgIGFsdDogXCJ0ZXN0ZVwiLFxyXG4gICAgICAgICB0aXRsZTogXCJ0aXR1bG9cIixcclxuICAgICAgICAgZGVzY3JpcHRpb246IFwiZGVzY3JpcHRpb25cIlxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgIGltZzogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDAwLzEwMDJcIixcclxuICAgICAgICAgbWluaUltZzogXCJodHRwczovL3BsYWNla2l0dGVuLmNvbS8xMDAwLzEwMDJcIixcclxuICAgICAgICAgYWx0OiBcInRlc3RlXCIsXHJcbiAgICAgICAgIHRpdGxlOiBcInRpdHVsb1wiLFxyXG4gICAgICAgICBkZXNjcmlwdGlvbjogXCJkZXNjcmlwdGlvblwiXHJcbiAgICAgIH1dO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcmVlbmNoZUJvdGFvKG1vZHVsbyl7XHJcbiAgIC8vIFJlbW92ZSBhIGNsYXNzZSBkZSB0b2RvcyBvcyBib3TDtWVzXHJcbiAgIFtcIjNkXCIsIFwiZGVzaWduXCIsIFwid2ViXCIsIFwidmlkZW9cIiwgXCIxMWFydFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtfWApLmNsYXNzTGlzdC5yZW1vdmUoYGJ0bi1maWxsLSR7aXRlbX1gKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aXRlbX1gKS5jbGFzc0xpc3QucmVtb3ZlKGBidG4tb3V0bGluZS0ke2l0ZW19YCk7XHJcbiAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAvLyBBZGljaW9uYSBhIGNsYXNzZSBubyBtw7NkdWxvIGNsaWNhZG9cclxuICAgW1wiM2RcIiwgXCJkZXNpZ25cIiwgXCJ3ZWJcIiwgXCJ2aWRlb1wiLCBcIjExYXJ0XCJdLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgIGlmKGl0ZW0gPT0gbW9kdWxvKVxyXG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtfWApLmNsYXNzTGlzdC5hZGQoYGJ0bi1maWxsLSR7aXRlbX1gKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpdGVtfWApLmNsYXNzTGlzdC5hZGQoYGJ0bi1vdXRsaW5lLSR7aXRlbX1gKTtcclxuICAgfSk7XHJcbn0iXX0=
