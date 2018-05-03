!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Navigo=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(e,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&t(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=n?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(e){return e.replace(/\/$/,"").split("/").length}function s(e,t){return i(t)-i(e)}function r(e,t){return function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(t){var i=function(e){var t=[];return{regexp:e instanceof RegExp?e:new RegExp(e.replace(n.PARAMETER_REGEXP,function(e,o,i){return t.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:t}}(o(t.route)),s=i.regexp,r=i.paramNames,a=e.replace(/^\/+/,"/").match(s),h=function(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce(function(e,n,o){return null===e&&(e={}),e[t[o]]=decodeURIComponent(n),e},null):null}(a,r);return!!a&&{match:a,route:t,params:h}}).filter(function(e){return e})}(e,t)[0]||!1}function a(e,t){var n=t.map(function(t){return""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]}),i=o(e);return n.length>1?n.reduce(function(e,t){return e.length>t.length&&(e=t),e},n[0]):1===n.length?n[0]:i}function h(e,n,o){var i,s=function(e){return e.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),t()&&!n?s(e).split(o)[0]:(i=e.split(o)).length>1?s(i[1]):s(i[0])}function u(t,n,o){if(n&&"object"===(void 0===n?"undefined":e(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(t(),n.after&&n.after(o))},o);if(n.after)return t(),void(n.after&&n.after(o))}t()}return n.prototype={helpers:{match:r,root:a,clean:o,getOnlyURL:h},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var t=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===e(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else"object"===e(o[0])&&Object.keys(o[0]).sort(s).forEach(function(e){t.on(e,o[0][e])});return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(t,n){return n.handler!==e&&t.push(n),t},[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var n,o,i=this,s=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var a=function(e){return e.split(/\?(.*)?$/).slice(1).join("")}(e||this._cLoc()),l=h(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&l===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=r(l,this._routes))?(this._callLeave(),this._lastRouteResolved={url:l,query:a,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,u(function(){u(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,a)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===l||"/"===l||l===this._hash||function(e,n,o){if(t()&&!n)return!1;if(!e.match(o))return!1;var i=e.split(o);return i.length<2||""===i[1]}(l,this._useHash,this._hash))?(u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(a)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(a)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach(function(t){t.hasListenerAttached||(t.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),t.hasListenerAttached=!0)})},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===e)for(i in n=o.route,t)n=n.toString().replace(":"+i,t[i]);return n},"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,this._historyAPIUpdateMethod=e?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(e){return void 0===e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){t()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e},_add:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof t&&(t=encodeURI(t)),this._routes.push("object"===(void 0===n?"undefined":e(n))?{route:t,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:t,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=a(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var t=this._cLoc(),n=void 0,o=void 0;(o=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var e=this._lastRouteResolved;e&&e.hooks&&e.hooks.leave&&e.hooks.leave(e.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="",n});
//# sourceMappingURL=navigo.min.js.map

   var initPhotoSwipeFromDOM = function(gallerySelector) {

      // parse slide data (url, title, size ...) from DOM elements 
      // (children of gallerySelector)
      var parseThumbnailElements = function(el) {
         var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

         for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                  continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                  src: linkEl.getAttribute('href'),
                  w: parseInt(size[0], 10),
                  h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                  // <figcaption> content
                  item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
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
         return el && ( fn(el) ? el : closest(el.parentNode, fn) );
      };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function(e) {
         e = e || window.event;
         e.preventDefault ? e.preventDefault() : e.returnValue = false;

         var eTarget = e.target || e.srcElement;

         // find root element of slide
         var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
         });

         if(!clickedListItem) {
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
            if(childNodes[i].nodeType !== 1) { 
                  continue; 
            }

            if(childNodes[i] === clickedListItem) {
                  index = nodeIndex;
                  break;
            }
            nodeIndex++;
         }



         if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
         }
         return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function() {
         var hash = window.location.hash.substring(1),
         params = {};

         if(hash.length < 5) {
            return params;
         }

         var vars = hash.split('&');
         for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                  continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                  continue;
            }           
            params[pair[0]] = pair[1];
         }

         if(params.gid) {
            params.gid = parseInt(params.gid, 10);
         }

         return params;
      };

      var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
         var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

         items = parseThumbnailElements(galleryElement);

         // define options (if needed)
         options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                  // See Options -> getThumbBoundsFn section of documentation for more info
                  var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                     pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                     rect = thumbnail.getBoundingClientRect(); 

                  return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

         };

         // PhotoSwipe opened from URL
         if(fromURL) {
            if(options.galleryPIDs) {
                  // parse real index when custom PIDs are used 
                  // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                  for(var j = 0; j < items.length; j++) {
                     if(items[j].pid == index) {
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
         if( isNaN(options.index) ) {
            return;
         }

         if(disableAnimation) {
            options.showAnimationDuration = 0;
         }

         // Pass data to PhotoSwipe and initialize it
         gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
         gallery.init();
      };

      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll( gallerySelector );

      for(var i = 0, l = galleryElements.length; i < l; i++) {
         galleryElements[i].setAttribute('data-pswp-uid', i+1);
         galleryElements[i].onclick = onThumbnailsClick;
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if(hashData.pid && hashData.gid) {
         openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
      }
   };

   // scroll suave
   function smoothScroll(location){
      if(location){
         var container = document.querySelector("#" + location);
         container.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      } else throw new Error("Variável 'location' não passada no evento de 'click'");
   }

   // init scroll reveal
   function initComponents(){
      window.sr = ScrollReveal();

      if(document.querySelectorAll('.animated').length > 0)
         sr.reveal('.animated', {duration: 1500});
      if(document.querySelectorAll('.animation-comoFunciona').length > 0)
         sr.reveal('.animation-comoFunciona', {duration: 1000}, 500);
      if(document.querySelectorAll('.animation-modulosServicos').length > 0)
         sr.reveal('.animation-modulosServicos', {duration: 1000}, 500);
      
      // init galeria
      if(document.querySelectorAll('.gallery').length > 0)
         initPhotoSwipeFromDOM('.gallery');
   }
function $id(id) {
  return document.getElementById(id);
}

function getNavBar(){
   var navBar_color;

   switch (view) {
      case "home":
         navBar_color = "#eb56007e";
      break;
      case "design":
         navBar_color = "rgb(76, 217, 100)";
      break;
   }

   return `
      <nav class="nav strokeEffect" style="background:${navBar_color}">
      <div class="nav-header">
         <div class="nav-header-title">
            <a href="#">
               <img src="img/11Art_White.png" width="50" height="80" alt=""> </a>
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
         <img class="nav-links-logo" src="img/11Art_White.png" width="50" height="80" alt="">
         <div class="nav-links-btnFechar">
            <label for="nav-mobileBtnToogle">Fechar X</label>
         </div>
         <hr>
         <a href="#!home">HOME</a>
         <a href="#!servicos">SERVIÇOS</a>
         <a href="#!portfolio">PORTFOLIO</a>
         <a href="#!sobrenos">SOBRE NÓS</a>
         <a class="mtn-4" href="#!contato">CONTATO</a>
      </div>
      </nav>
   `;
}

function loadHTML(url, id, view) {
   req = new XMLHttpRequest();
   req.open('GET', url);
   req.send();
   req.onload = function () {
   $id(id).innerHTML = getNavBar() + req.responseText; // Insere no HTML
   initComponents(); // Iniciar Galeria e Animações de Smoothscroll
  };
}

// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
  // 'view' is the id of the div element inside which we render the HTML
  'home': function home() {
   loadHTML('../home.html', 'view', "home");
  },
  'design': function design() {
   loadHTML('../design.html', 'view', "design");
  }
});

// set the default route
router.on(function () {
  $id('view').innerHTML = loadHTML('../home.html', 'view', "home");
});

// set the 404 route
router.notFound(function (query) {
  $id('view').innerHTML = '<h1>NOTFOUND</h1>';
});

router.resolve();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnby5taW4uanMiLCJzY3JpcHQuanMiLCJyb3V0ZUNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6ZS5OYXZpZ289dCgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZnVuY3Rpb24gdCgpe3JldHVybiEoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvd3x8IXdpbmRvdy5oaXN0b3J5fHwhd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKX1mdW5jdGlvbiBuKGUsbixvKXt0aGlzLnJvb3Q9bnVsbCx0aGlzLl9yb3V0ZXM9W10sdGhpcy5fdXNlSGFzaD1uLHRoaXMuX2hhc2g9dm9pZCAwPT09bz9cIiNcIjpvLHRoaXMuX3BhdXNlZD0hMSx0aGlzLl9kZXN0cm95ZWQ9ITEsdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ9bnVsbCx0aGlzLl9ub3RGb3VuZEhhbmRsZXI9bnVsbCx0aGlzLl9kZWZhdWx0SGFuZGxlcj1udWxsLHRoaXMuX3VzZVB1c2hTdGF0ZT0hbiYmdCgpLHRoaXMuX29uTG9jYXRpb25DaGFuZ2U9dGhpcy5fb25Mb2NhdGlvbkNoYW5nZS5iaW5kKHRoaXMpLHRoaXMuX2dlbmVyaWNIb29rcz1udWxsLHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9XCJwdXNoU3RhdGVcIixlP3RoaXMucm9vdD1uP2UucmVwbGFjZSgvXFwvJC8sXCIvXCIrdGhpcy5faGFzaCk6ZS5yZXBsYWNlKC9cXC8kLyxcIlwiKTpuJiYodGhpcy5yb290PXRoaXMuX2NMb2MoKS5zcGxpdCh0aGlzLl9oYXNoKVswXS5yZXBsYWNlKC9cXC8kLyxcIi9cIit0aGlzLl9oYXNoKSksdGhpcy5fbGlzdGVuKCksdGhpcy51cGRhdGVQYWdlTGlua3MoKX1mdW5jdGlvbiBvKGUpe3JldHVybiBlIGluc3RhbmNlb2YgUmVnRXhwP2U6ZS5yZXBsYWNlKC9cXC8rJC8sXCJcIikucmVwbGFjZSgvXlxcLysvLFwiXi9cIil9ZnVuY3Rpb24gaShlKXtyZXR1cm4gZS5yZXBsYWNlKC9cXC8kLyxcIlwiKS5zcGxpdChcIi9cIikubGVuZ3RofWZ1bmN0aW9uIHMoZSx0KXtyZXR1cm4gaSh0KS1pKGUpfWZ1bmN0aW9uIHIoZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpbXSkubWFwKGZ1bmN0aW9uKHQpe3ZhciBpPWZ1bmN0aW9uKGUpe3ZhciB0PVtdO3JldHVybntyZWdleHA6ZSBpbnN0YW5jZW9mIFJlZ0V4cD9lOm5ldyBSZWdFeHAoZS5yZXBsYWNlKG4uUEFSQU1FVEVSX1JFR0VYUCxmdW5jdGlvbihlLG8saSl7cmV0dXJuIHQucHVzaChpKSxuLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQfSkucmVwbGFjZShuLldJTERDQVJEX1JFR0VYUCxuLlJFUExBQ0VfV0lMRENBUkQpK24uRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQLG4uTUFUQ0hfUkVHRVhQX0ZMQUdTKSxwYXJhbU5hbWVzOnR9fShvKHQucm91dGUpKSxzPWkucmVnZXhwLHI9aS5wYXJhbU5hbWVzLGE9ZS5yZXBsYWNlKC9eXFwvKy8sXCIvXCIpLm1hdGNoKHMpLGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gMD09PXQubGVuZ3RoP251bGw6ZT9lLnNsaWNlKDEsZS5sZW5ndGgpLnJlZHVjZShmdW5jdGlvbihlLG4sbyl7cmV0dXJuIG51bGw9PT1lJiYoZT17fSksZVt0W29dXT1kZWNvZGVVUklDb21wb25lbnQobiksZX0sbnVsbCk6bnVsbH0oYSxyKTtyZXR1cm4hIWEmJnttYXRjaDphLHJvdXRlOnQscGFyYW1zOmh9fSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlfSl9KGUsdClbMF18fCExfWZ1bmN0aW9uIGEoZSx0KXt2YXIgbj10Lm1hcChmdW5jdGlvbih0KXtyZXR1cm5cIlwiPT09dC5yb3V0ZXx8XCIqXCI9PT10LnJvdXRlP2U6ZS5zcGxpdChuZXcgUmVnRXhwKHQucm91dGUrXCIoJHwvKVwiKSlbMF19KSxpPW8oZSk7cmV0dXJuIG4ubGVuZ3RoPjE/bi5yZWR1Y2UoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5sZW5ndGg+dC5sZW5ndGgmJihlPXQpLGV9LG5bMF0pOjE9PT1uLmxlbmd0aD9uWzBdOml9ZnVuY3Rpb24gaChlLG4sbyl7dmFyIGkscz1mdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdCgvXFw/KC4qKT8kLylbMF19O3JldHVybiB2b2lkIDA9PT1vJiYobz1cIiNcIiksdCgpJiYhbj9zKGUpLnNwbGl0KG8pWzBdOihpPWUuc3BsaXQobykpLmxlbmd0aD4xP3MoaVsxXSk6cyhpWzBdKX1mdW5jdGlvbiB1KHQsbixvKXtpZihuJiZcIm9iamVjdFwiPT09KHZvaWQgMD09PW4/XCJ1bmRlZmluZWRcIjplKG4pKSl7aWYobi5iZWZvcmUpcmV0dXJuIHZvaWQgbi5iZWZvcmUoZnVuY3Rpb24oKXsoIShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXSkmJih0KCksbi5hZnRlciYmbi5hZnRlcihvKSl9LG8pO2lmKG4uYWZ0ZXIpcmV0dXJuIHQoKSx2b2lkKG4uYWZ0ZXImJm4uYWZ0ZXIobykpfXQoKX1yZXR1cm4gbi5wcm90b3R5cGU9e2hlbHBlcnM6e21hdGNoOnIscm9vdDphLGNsZWFuOm8sZ2V0T25seVVSTDpofSxuYXZpZ2F0ZTpmdW5jdGlvbihlLHQpe3ZhciBuO3JldHVybiBlPWV8fFwiXCIsdGhpcy5fdXNlUHVzaFN0YXRlPyhuPShuPSh0P1wiXCI6dGhpcy5fZ2V0Um9vdCgpK1wiL1wiKStlLnJlcGxhY2UoL15cXC8rLyxcIi9cIikpLnJlcGxhY2UoLyhbXjpdKShcXC97Mix9KS9nLFwiJDEvXCIpLGhpc3RvcnlbdGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZF0oe30sXCJcIixuKSx0aGlzLnJlc29sdmUoKSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKGU9ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIrdGhpcy5faGFzaCksXCJcIiksd2luZG93LmxvY2F0aW9uLmhyZWY9d2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyQvLFwiXCIpLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLl9oYXNoK1wiLiokXCIpLFwiXCIpK3RoaXMuX2hhc2grZSksdGhpc30sb246ZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcyxuPWFyZ3VtZW50cy5sZW5ndGgsbz1BcnJheShuKSxpPTA7aTxuO2krKylvW2ldPWFyZ3VtZW50c1tpXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBvWzBdKXRoaXMuX2RlZmF1bHRIYW5kbGVyPXtoYW5kbGVyOm9bMF0saG9va3M6b1sxXX07ZWxzZSBpZihvLmxlbmd0aD49MilpZihcIi9cIj09PW9bMF0pe3ZhciByPW9bMV07XCJvYmplY3RcIj09PWUob1sxXSkmJihyPW9bMV0udXNlcyksdGhpcy5fZGVmYXVsdEhhbmRsZXI9e2hhbmRsZXI6cixob29rczpvWzJdfX1lbHNlIHRoaXMuX2FkZChvWzBdLG9bMV0sb1syXSk7ZWxzZVwib2JqZWN0XCI9PT1lKG9bMF0pJiZPYmplY3Qua2V5cyhvWzBdKS5zb3J0KHMpLmZvckVhY2goZnVuY3Rpb24oZSl7dC5vbihlLG9bMF1bZV0pfSk7cmV0dXJuIHRoaXN9LG9mZjpmdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9PXRoaXMuX2RlZmF1bHRIYW5kbGVyJiZlPT09dGhpcy5fZGVmYXVsdEhhbmRsZXIuaGFuZGxlcj90aGlzLl9kZWZhdWx0SGFuZGxlcj1udWxsOm51bGwhPT10aGlzLl9ub3RGb3VuZEhhbmRsZXImJmU9PT10aGlzLl9ub3RGb3VuZEhhbmRsZXIuaGFuZGxlciYmKHRoaXMuX25vdEZvdW5kSGFuZGxlcj1udWxsKSx0aGlzLl9yb3V0ZXM9dGhpcy5fcm91dGVzLnJlZHVjZShmdW5jdGlvbih0LG4pe3JldHVybiBuLmhhbmRsZXIhPT1lJiZ0LnB1c2gobiksdH0sW10pLHRoaXN9LG5vdEZvdW5kOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuX25vdEZvdW5kSGFuZGxlcj17aGFuZGxlcjplLGhvb2tzOnR9LHRoaXN9LHJlc29sdmU6ZnVuY3Rpb24oZSl7dmFyIG4sbyxpPXRoaXMscz0oZXx8dGhpcy5fY0xvYygpKS5yZXBsYWNlKHRoaXMuX2dldFJvb3QoKSxcIlwiKTt0aGlzLl91c2VIYXNoJiYocz1zLnJlcGxhY2UobmV3IFJlZ0V4cChcIl4vXCIrdGhpcy5faGFzaCksXCIvXCIpKTt2YXIgYT1mdW5jdGlvbihlKXtyZXR1cm4gZS5zcGxpdCgvXFw/KC4qKT8kLykuc2xpY2UoMSkuam9pbihcIlwiKX0oZXx8dGhpcy5fY0xvYygpKSxsPWgocyx0aGlzLl91c2VIYXNoLHRoaXMuX2hhc2gpO3JldHVybiF0aGlzLl9wYXVzZWQmJih0aGlzLl9sYXN0Um91dGVSZXNvbHZlZCYmbD09PXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnVybCYmYT09PXRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnF1ZXJ5Pyh0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcyYmdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MuYWxyZWFkeSYmdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQuaG9va3MuYWxyZWFkeSh0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5wYXJhbXMpLCExKToobz1yKGwsdGhpcy5fcm91dGVzKSk/KHRoaXMuX2NhbGxMZWF2ZSgpLHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOm8ucm91dGUuaG9va3MscGFyYW1zOm8ucGFyYW1zLG5hbWU6by5yb3V0ZS5uYW1lfSxuPW8ucm91dGUuaGFuZGxlcix1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe28ucm91dGUucm91dGUgaW5zdGFuY2VvZiBSZWdFeHA/bi5hcHBseSh2b2lkIDAsby5tYXRjaC5zbGljZSgxLG8ubWF0Y2gubGVuZ3RoKSk6bihvLnBhcmFtcyxhKX0sby5yb3V0ZS5ob29rcyxvLnBhcmFtcyxpLl9nZW5lcmljSG9va3MpfSx0aGlzLl9nZW5lcmljSG9va3Msby5wYXJhbXMpLG8pOnRoaXMuX2RlZmF1bHRIYW5kbGVyJiYoXCJcIj09PWx8fFwiL1wiPT09bHx8bD09PXRoaXMuX2hhc2h8fGZ1bmN0aW9uKGUsbixvKXtpZih0KCkmJiFuKXJldHVybiExO2lmKCFlLm1hdGNoKG8pKXJldHVybiExO3ZhciBpPWUuc3BsaXQobyk7cmV0dXJuIGkubGVuZ3RoPDJ8fFwiXCI9PT1pWzFdfShsLHRoaXMuX3VzZUhhc2gsdGhpcy5faGFzaCkpPyh1KGZ1bmN0aW9uKCl7dShmdW5jdGlvbigpe2kuX2NhbGxMZWF2ZSgpLGkuX2xhc3RSb3V0ZVJlc29sdmVkPXt1cmw6bCxxdWVyeTphLGhvb2tzOmkuX2RlZmF1bHRIYW5kbGVyLmhvb2tzfSxpLl9kZWZhdWx0SGFuZGxlci5oYW5kbGVyKGEpfSxpLl9kZWZhdWx0SGFuZGxlci5ob29rcyl9LHRoaXMuX2dlbmVyaWNIb29rcyksITApOih0aGlzLl9ub3RGb3VuZEhhbmRsZXImJnUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7aS5fY2FsbExlYXZlKCksaS5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6aS5fbm90Rm91bmRIYW5kbGVyLmhvb2tzfSxpLl9ub3RGb3VuZEhhbmRsZXIuaGFuZGxlcihhKX0saS5fbm90Rm91bmRIYW5kbGVyLmhvb2tzKX0sdGhpcy5fZ2VuZXJpY0hvb2tzKSwhMSkpfSxkZXN0cm95OmZ1bmN0aW9uKCl7dGhpcy5fcm91dGVzPVtdLHRoaXMuX2Rlc3Ryb3llZD0hMCx0aGlzLl9sYXN0Um91dGVSZXNvbHZlZD1udWxsLHRoaXMuX2dlbmVyaWNIb29rcz1udWxsLGNsZWFyVGltZW91dCh0aGlzLl9saXN0ZW5pbmdJbnRlcnZhbCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKSl9LHVwZGF0ZVBhZ2VMaW5rczpmdW5jdGlvbigpe3ZhciBlPXRoaXM7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50JiZ0aGlzLl9maW5kTGlua3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QuaGFzTGlzdGVuZXJBdHRhY2hlZHx8KHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24obil7aWYoKG4uY3RybEtleXx8bi5tZXRhS2V5KSYmXCJhXCI9PW4udGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSlyZXR1cm4hMTt2YXIgbz1lLmdldExpbmtQYXRoKHQpO2UuX2Rlc3Ryb3llZHx8KG4ucHJldmVudERlZmF1bHQoKSxlLm5hdmlnYXRlKG8ucmVwbGFjZSgvXFwvKyQvLFwiXCIpLnJlcGxhY2UoL15cXC8rLyxcIi9cIikpKX0pLHQuaGFzTGlzdGVuZXJBdHRhY2hlZD0hMCl9KX0sZ2VuZXJhdGU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG49dGhpcy5fcm91dGVzLnJlZHVjZShmdW5jdGlvbihuLG8pe3ZhciBpO2lmKG8ubmFtZT09PWUpZm9yKGkgaW4gbj1vLnJvdXRlLHQpbj1uLnRvU3RyaW5nKCkucmVwbGFjZShcIjpcIitpLHRbaV0pO3JldHVybiBufSxcIlwiKTtyZXR1cm4gdGhpcy5fdXNlSGFzaD90aGlzLl9oYXNoK246bn0sbGluazpmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5fZ2V0Um9vdCgpK2V9LHBhdXNlOmZ1bmN0aW9uKCl7dmFyIGU9IShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXTt0aGlzLl9wYXVzZWQ9ZSx0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPWU/XCJyZXBsYWNlU3RhdGVcIjpcInB1c2hTdGF0ZVwifSxyZXN1bWU6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlKCExKX0saGlzdG9yeUFQSVVwZGF0ZU1ldGhvZDpmdW5jdGlvbihlKXtyZXR1cm4gdm9pZCAwPT09ZT90aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kOih0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kPWUsZSl9LGRpc2FibGVJZkFQSU5vdEF2YWlsYWJsZTpmdW5jdGlvbigpe3QoKXx8dGhpcy5kZXN0cm95KCl9LGxhc3RSb3V0ZVJlc29sdmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkfSxnZXRMaW5rUGF0aDpmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpfSxob29rczpmdW5jdGlvbihlKXt0aGlzLl9nZW5lcmljSG9va3M9ZX0sX2FkZDpmdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06bnVsbCxvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpudWxsO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0JiYodD1lbmNvZGVVUkkodCkpLHRoaXMuX3JvdXRlcy5wdXNoKFwib2JqZWN0XCI9PT0odm9pZCAwPT09bj9cInVuZGVmaW5lZFwiOmUobikpP3tyb3V0ZTp0LGhhbmRsZXI6bi51c2VzLG5hbWU6bi5hcyxob29rczpvfHxuLmhvb2tzfTp7cm91dGU6dCxoYW5kbGVyOm4saG9va3M6b30pLHRoaXMuX2FkZH0sX2dldFJvb3Q6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9PXRoaXMucm9vdD90aGlzLnJvb3Q6KHRoaXMucm9vdD1hKHRoaXMuX2NMb2MoKS5zcGxpdChcIj9cIilbMF0sdGhpcy5fcm91dGVzKSx0aGlzLnJvb3QpfSxfbGlzdGVuOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZih0aGlzLl91c2VQdXNoU3RhdGUpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmXCJvbmhhc2hjaGFuZ2VcImluIHdpbmRvdyl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIix0aGlzLl9vbkxvY2F0aW9uQ2hhbmdlKTtlbHNle3ZhciB0PXRoaXMuX2NMb2MoKSxuPXZvaWQgMCxvPXZvaWQgMDsobz1mdW5jdGlvbigpe249ZS5fY0xvYygpLHQhPT1uJiYodD1uLGUucmVzb2x2ZSgpKSxlLl9saXN0ZW5pbmdJbnRlcnZhbD1zZXRUaW1lb3V0KG8sMjAwKX0pKCl9fSxfY0xvYzpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dm9pZCAwIT09d2luZG93Ll9fTkFWSUdPX1dJTkRPV19MT0NBVElPTl9NT0NLX18/d2luZG93Ll9fTkFWSUdPX1dJTkRPV19MT0NBVElPTl9NT0NLX186byh3aW5kb3cubG9jYXRpb24uaHJlZik6XCJcIn0sX2ZpbmRMaW5rczpmdW5jdGlvbigpe3JldHVybltdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLW5hdmlnb11cIikpfSxfb25Mb2NhdGlvbkNoYW5nZTpmdW5jdGlvbigpe3RoaXMucmVzb2x2ZSgpfSxfY2FsbExlYXZlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ7ZSYmZS5ob29rcyYmZS5ob29rcy5sZWF2ZSYmZS5ob29rcy5sZWF2ZShlLnBhcmFtcyl9fSxuLlBBUkFNRVRFUl9SRUdFWFA9LyhbOipdKShcXHcrKS9nLG4uV0lMRENBUkRfUkVHRVhQPS9cXCovZyxuLlJFUExBQ0VfVkFSSUFCTEVfUkVHRVhQPVwiKFteL10rKVwiLG4uUkVQTEFDRV9XSUxEQ0FSRD1cIig/Oi4qKVwiLG4uRk9MTE9XRURfQllfU0xBU0hfUkVHRVhQPVwiKD86LyR8JClcIixuLk1BVENIX1JFR0VYUF9GTEFHUz1cIlwiLG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdmlnby5taW4uanMubWFwXG4iLCJcclxuICAgdmFyIGluaXRQaG90b1N3aXBlRnJvbURPTSA9IGZ1bmN0aW9uKGdhbGxlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgICAgLy8gcGFyc2Ugc2xpZGUgZGF0YSAodXJsLCB0aXRsZSwgc2l6ZSAuLi4pIGZyb20gRE9NIGVsZW1lbnRzIFxyXG4gICAgICAvLyAoY2hpbGRyZW4gb2YgZ2FsbGVyeVNlbGVjdG9yKVxyXG4gICAgICB2YXIgcGFyc2VUaHVtYm5haWxFbGVtZW50cyA9IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgIHZhciB0aHVtYkVsZW1lbnRzID0gZWwuY2hpbGROb2RlcyxcclxuICAgICAgICAgICAgbnVtTm9kZXMgPSB0aHVtYkVsZW1lbnRzLmxlbmd0aCxcclxuICAgICAgICAgICAgaXRlbXMgPSBbXSxcclxuICAgICAgICAgICAgZmlndXJlRWwsXHJcbiAgICAgICAgICAgIGxpbmtFbCxcclxuICAgICAgICAgICAgc2l6ZSxcclxuICAgICAgICAgICAgaXRlbTtcclxuXHJcbiAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBudW1Ob2RlczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBmaWd1cmVFbCA9IHRodW1iRWxlbWVudHNbaV07IC8vIDxmaWd1cmU+IGVsZW1lbnRcclxuXHJcbiAgICAgICAgICAgIC8vIGluY2x1ZGUgb25seSBlbGVtZW50IG5vZGVzIFxyXG4gICAgICAgICAgICBpZihmaWd1cmVFbC5ub2RlVHlwZSAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlua0VsID0gZmlndXJlRWwuY2hpbGRyZW5bMF07IC8vIDxhPiBlbGVtZW50XHJcblxyXG4gICAgICAgICAgICBzaXplID0gbGlua0VsLmdldEF0dHJpYnV0ZSgnZGF0YS1zaXplJykuc3BsaXQoJ3gnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzbGlkZSBvYmplY3RcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgc3JjOiBsaW5rRWwuZ2V0QXR0cmlidXRlKCdocmVmJyksXHJcbiAgICAgICAgICAgICAgICAgIHc6IHBhcnNlSW50KHNpemVbMF0sIDEwKSxcclxuICAgICAgICAgICAgICAgICAgaDogcGFyc2VJbnQoc2l6ZVsxXSwgMTApXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGZpZ3VyZUVsLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gPGZpZ2NhcHRpb24+IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IGZpZ3VyZUVsLmNoaWxkcmVuWzFdLmlubmVySFRNTDsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGxpbmtFbC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIDxpbWc+IHRodW1ibmFpbCBlbGVtZW50LCByZXRyaWV2aW5nIHRodW1ibmFpbCB1cmxcclxuICAgICAgICAgICAgICAgICAgaXRlbS5tc3JjID0gbGlua0VsLmNoaWxkcmVuWzBdLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICBpdGVtLmVsID0gZmlndXJlRWw7IC8vIHNhdmUgbGluayB0byBlbGVtZW50IGZvciBnZXRUaHVtYkJvdW5kc0ZuXHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGZpbmQgbmVhcmVzdCBwYXJlbnQgZWxlbWVudFxyXG4gICAgICB2YXIgY2xvc2VzdCA9IGZ1bmN0aW9uIGNsb3Nlc3QoZWwsIGZuKSB7XHJcbiAgICAgICAgIHJldHVybiBlbCAmJiAoIGZuKGVsKSA/IGVsIDogY2xvc2VzdChlbC5wYXJlbnROb2RlLCBmbikgKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIHRyaWdnZXJzIHdoZW4gdXNlciBjbGlja3Mgb24gdGh1bWJuYWlsXHJcbiAgICAgIHZhciBvblRodW1ibmFpbHNDbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICAgICBlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgdmFyIGVUYXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG4gICAgICAgICAvLyBmaW5kIHJvb3QgZWxlbWVudCBvZiBzbGlkZVxyXG4gICAgICAgICB2YXIgY2xpY2tlZExpc3RJdGVtID0gY2xvc2VzdChlVGFyZ2V0LCBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsLnRhZ05hbWUgJiYgZWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnRklHVVJFJyk7XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgaWYoIWNsaWNrZWRMaXN0SXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIGZpbmQgaW5kZXggb2YgY2xpY2tlZCBpdGVtIGJ5IGxvb3BpbmcgdGhyb3VnaCBhbGwgY2hpbGQgbm9kZXNcclxuICAgICAgICAgLy8gYWx0ZXJuYXRpdmVseSwgeW91IG1heSBkZWZpbmUgaW5kZXggdmlhIGRhdGEtIGF0dHJpYnV0ZVxyXG4gICAgICAgICB2YXIgY2xpY2tlZEdhbGxlcnkgPSBjbGlja2VkTGlzdEl0ZW0ucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgY2hpbGROb2RlcyA9IGNsaWNrZWRMaXN0SXRlbS5wYXJlbnROb2RlLmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgIG51bUNoaWxkTm9kZXMgPSBjaGlsZE5vZGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgbm9kZUluZGV4ID0gMCxcclxuICAgICAgICAgICAgaW5kZXg7XHJcblxyXG4gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUNoaWxkTm9kZXM7IGkrKykge1xyXG4gICAgICAgICAgICBpZihjaGlsZE5vZGVzW2ldLm5vZGVUeXBlICE9PSAxKSB7IFxyXG4gICAgICAgICAgICAgICAgICBjb250aW51ZTsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGNoaWxkTm9kZXNbaV0gPT09IGNsaWNrZWRMaXN0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICBpbmRleCA9IG5vZGVJbmRleDtcclxuICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZUluZGV4Kys7XHJcbiAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgaWYoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAvLyBvcGVuIFBob3RvU3dpcGUgaWYgdmFsaWQgaW5kZXggZm91bmRcclxuICAgICAgICAgICAgb3BlblBob3RvU3dpcGUoIGluZGV4LCBjbGlja2VkR2FsbGVyeSApO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIHBhcnNlIHBpY3R1cmUgaW5kZXggYW5kIGdhbGxlcnkgaW5kZXggZnJvbSBVUkwgKCMmcGlkPTEmZ2lkPTIpXHJcbiAgICAgIHZhciBwaG90b3N3aXBlUGFyc2VIYXNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLFxyXG4gICAgICAgICBwYXJhbXMgPSB7fTtcclxuXHJcbiAgICAgICAgIGlmKGhhc2gubGVuZ3RoIDwgNSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICB2YXIgdmFycyA9IGhhc2guc3BsaXQoJyYnKTtcclxuICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCF2YXJzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpOyAgXHJcbiAgICAgICAgICAgIGlmKHBhaXIubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBhcmFtc1twYWlyWzBdXSA9IHBhaXJbMV07XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmKHBhcmFtcy5naWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLmdpZCA9IHBhcnNlSW50KHBhcmFtcy5naWQsIDEwKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHZhciBvcGVuUGhvdG9Td2lwZSA9IGZ1bmN0aW9uKGluZGV4LCBnYWxsZXJ5RWxlbWVudCwgZGlzYWJsZUFuaW1hdGlvbiwgZnJvbVVSTCkge1xyXG4gICAgICAgICB2YXIgcHN3cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHN3cCcpWzBdLFxyXG4gICAgICAgICAgICBnYWxsZXJ5LFxyXG4gICAgICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgICAgICBpdGVtcztcclxuXHJcbiAgICAgICAgIGl0ZW1zID0gcGFyc2VUaHVtYm5haWxFbGVtZW50cyhnYWxsZXJ5RWxlbWVudCk7XHJcblxyXG4gICAgICAgICAvLyBkZWZpbmUgb3B0aW9ucyAoaWYgbmVlZGVkKVxyXG4gICAgICAgICBvcHRpb25zID0ge1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5lIGdhbGxlcnkgaW5kZXggKGZvciBVUkwpXHJcbiAgICAgICAgICAgIGdhbGxlcnlVSUQ6IGdhbGxlcnlFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wc3dwLXVpZCcpLFxyXG5cclxuICAgICAgICAgICAgZ2V0VGh1bWJCb3VuZHNGbjogZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gU2VlIE9wdGlvbnMgLT4gZ2V0VGh1bWJCb3VuZHNGbiBzZWN0aW9uIG9mIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgaW5mb1xyXG4gICAgICAgICAgICAgICAgICB2YXIgdGh1bWJuYWlsID0gaXRlbXNbaW5kZXhdLmVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXSwgLy8gZmluZCB0aHVtYm5haWxcclxuICAgICAgICAgICAgICAgICAgICAgcGFnZVlTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgcmVjdCA9IHRodW1ibmFpbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgXHJcblxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4ge3g6cmVjdC5sZWZ0LCB5OnJlY3QudG9wICsgcGFnZVlTY3JvbGwsIHc6cmVjdC53aWR0aH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAvLyBQaG90b1N3aXBlIG9wZW5lZCBmcm9tIFVSTFxyXG4gICAgICAgICBpZihmcm9tVVJMKSB7XHJcbiAgICAgICAgICAgIGlmKG9wdGlvbnMuZ2FsbGVyeVBJRHMpIHtcclxuICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgcmVhbCBpbmRleCB3aGVuIGN1c3RvbSBQSURzIGFyZSB1c2VkIFxyXG4gICAgICAgICAgICAgICAgICAvLyBodHRwOi8vcGhvdG9zd2lwZS5jb20vZG9jdW1lbnRhdGlvbi9mYXEuaHRtbCNjdXN0b20tcGlkLWluLXVybFxyXG4gICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbXNbal0ucGlkID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIGluIFVSTCBpbmRleGVzIHN0YXJ0IGZyb20gMVxyXG4gICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4ID0gcGFyc2VJbnQoaW5kZXgsIDEwKSAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIGV4aXQgaWYgaW5kZXggbm90IGZvdW5kXHJcbiAgICAgICAgIGlmKCBpc05hTihvcHRpb25zLmluZGV4KSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZihkaXNhYmxlQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc2hvd0FuaW1hdGlvbkR1cmF0aW9uID0gMDtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gUGFzcyBkYXRhIHRvIFBob3RvU3dpcGUgYW5kIGluaXRpYWxpemUgaXRcclxuICAgICAgICAgZ2FsbGVyeSA9IG5ldyBQaG90b1N3aXBlKCBwc3dwRWxlbWVudCwgUGhvdG9Td2lwZVVJX0RlZmF1bHQsIGl0ZW1zLCBvcHRpb25zKTtcclxuICAgICAgICAgZ2FsbGVyeS5pbml0KCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGdhbGxlcnkgZWxlbWVudHMgYW5kIGJpbmQgZXZlbnRzXHJcbiAgICAgIHZhciBnYWxsZXJ5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCBnYWxsZXJ5U2VsZWN0b3IgKTtcclxuXHJcbiAgICAgIGZvcih2YXIgaSA9IDAsIGwgPSBnYWxsZXJ5RWxlbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgIGdhbGxlcnlFbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHN3cC11aWQnLCBpKzEpO1xyXG4gICAgICAgICBnYWxsZXJ5RWxlbWVudHNbaV0ub25jbGljayA9IG9uVGh1bWJuYWlsc0NsaWNrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQYXJzZSBVUkwgYW5kIG9wZW4gZ2FsbGVyeSBpZiBpdCBjb250YWlucyAjJnBpZD0zJmdpZD0xXHJcbiAgICAgIHZhciBoYXNoRGF0YSA9IHBob3Rvc3dpcGVQYXJzZUhhc2goKTtcclxuICAgICAgaWYoaGFzaERhdGEucGlkICYmIGhhc2hEYXRhLmdpZCkge1xyXG4gICAgICAgICBvcGVuUGhvdG9Td2lwZSggaGFzaERhdGEucGlkICwgIGdhbGxlcnlFbGVtZW50c1sgaGFzaERhdGEuZ2lkIC0gMSBdLCB0cnVlLCB0cnVlICk7XHJcbiAgICAgIH1cclxuICAgfTtcclxuXHJcbiAgIC8vIHNjcm9sbCBzdWF2ZVxyXG4gICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwobG9jYXRpb24pe1xyXG4gICAgICBpZihsb2NhdGlvbil7XHJcbiAgICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgbG9jYXRpb24pO1xyXG4gICAgICAgICBjb250YWluZXIuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJzdGFydFwiLCBpbmxpbmU6IFwibmVhcmVzdFwifSk7XHJcbiAgICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJWYXJpw6F2ZWwgJ2xvY2F0aW9uJyBuw6NvIHBhc3NhZGEgbm8gZXZlbnRvIGRlICdjbGljaydcIik7XHJcbiAgIH1cclxuXHJcbiAgIC8vIGluaXQgc2Nyb2xsIHJldmVhbFxyXG4gICBmdW5jdGlvbiBpbml0Q29tcG9uZW50cygpe1xyXG4gICAgICB3aW5kb3cuc3IgPSBTY3JvbGxSZXZlYWwoKTtcclxuXHJcbiAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRlZCcpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgIHNyLnJldmVhbCgnLmFuaW1hdGVkJywge2R1cmF0aW9uOiAxNTAwfSk7XHJcbiAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRpb24tY29tb0Z1bmNpb25hJykubGVuZ3RoID4gMClcclxuICAgICAgICAgc3IucmV2ZWFsKCcuYW5pbWF0aW9uLWNvbW9GdW5jaW9uYScsIHtkdXJhdGlvbjogMTAwMH0sIDUwMCk7XHJcbiAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbmltYXRpb24tbW9kdWxvc1NlcnZpY29zJykubGVuZ3RoID4gMClcclxuICAgICAgICAgc3IucmV2ZWFsKCcuYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvcycsIHtkdXJhdGlvbjogMTAwMH0sIDUwMCk7XHJcbiAgICAgIFxyXG4gICAgICAvLyBpbml0IGdhbGVyaWFcclxuICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnknKS5sZW5ndGggPiAwKVxyXG4gICAgICAgICBpbml0UGhvdG9Td2lwZUZyb21ET00oJy5nYWxsZXJ5Jyk7XHJcbiAgIH1cclxuICAgIiwiZnVuY3Rpb24gJGlkKGlkKSB7XG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG59XG5cbmZ1bmN0aW9uIGdldE5hdkJhcigpe1xuICAgdmFyIG5hdkJhcl9jb2xvcjtcblxuICAgc3dpdGNoICh2aWV3KSB7XG4gICAgICBjYXNlIFwiaG9tZVwiOlxuICAgICAgICAgbmF2QmFyX2NvbG9yID0gXCIjZWI1NjAwN2VcIjtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlc2lnblwiOlxuICAgICAgICAgbmF2QmFyX2NvbG9yID0gXCJyZ2IoNzYsIDIxNywgMTAwKVwiO1xuICAgICAgYnJlYWs7XG4gICB9XG5cbiAgIHJldHVybiBgXG4gICAgICA8bmF2IGNsYXNzPVwibmF2IHN0cm9rZUVmZmVjdFwiIHN0eWxlPVwiYmFja2dyb3VuZDoke25hdkJhcl9jb2xvcn1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuYXYtaGVhZGVyXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWhlYWRlci10aXRsZVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nLzExQXJ0X1doaXRlLnBuZ1wiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4MFwiIGFsdD1cIlwiPiA8L2E+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5hdi1tb2JpbGVCdG5cIj5cbiAgICAgICAgIDxsYWJlbCBmb3I9XCJuYXYtbW9iaWxlQnRuVG9vZ2xlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cIm5hdi1tb2JpbGVCdG4tdG9vZ2xlVGV4dFwiPk1lbnU8L3A+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJuYXYtbW9iaWxlQnRuVG9vZ2xlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzXCI+XG4gICAgICAgICA8aW1nIGNsYXNzPVwibmF2LWxpbmtzLWxvZ29cIiBzcmM9XCJpbWcvMTFBcnRfV2hpdGUucG5nXCIgd2lkdGg9XCI1MFwiIGhlaWdodD1cIjgwXCIgYWx0PVwiXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzLWJ0bkZlY2hhclwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5hdi1tb2JpbGVCdG5Ub29nbGVcIj5GZWNoYXIgWDwvbGFiZWw+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDxocj5cbiAgICAgICAgIDxhIGhyZWY9XCIjIWhvbWVcIj5IT01FPC9hPlxuICAgICAgICAgPGEgaHJlZj1cIiMhc2Vydmljb3NcIj5TRVJWScOHT1M8L2E+XG4gICAgICAgICA8YSBocmVmPVwiIyFwb3J0Zm9saW9cIj5QT1JURk9MSU88L2E+XG4gICAgICAgICA8YSBocmVmPVwiIyFzb2JyZW5vc1wiPlNPQlJFIE7Dk1M8L2E+XG4gICAgICAgICA8YSBjbGFzcz1cIm10bi00XCIgaHJlZj1cIiMhY29udGF0b1wiPkNPTlRBVE88L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuICAgYDtcbn1cblxuZnVuY3Rpb24gbG9hZEhUTUwodXJsLCBpZCwgdmlldykge1xuICAgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICByZXEub3BlbignR0VUJywgdXJsKTtcbiAgIHJlcS5zZW5kKCk7XG4gICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgJGlkKGlkKS5pbm5lckhUTUwgPSBnZXROYXZCYXIoKSArIHJlcS5yZXNwb25zZVRleHQ7IC8vIEluc2VyZSBubyBIVE1MXG4gICBpbml0Q29tcG9uZW50cygpOyAvLyBJbmljaWFyIEdhbGVyaWEgZSBBbmltYcOnw7VlcyBkZSBTbW9vdGhzY3JvbGxcbiAgfTtcbn1cblxuLy8gdXNlICMhIHRvIGhhc2hcbnJvdXRlciA9IG5ldyBOYXZpZ28obnVsbCwgdHJ1ZSwgJyMhJyk7XG5yb3V0ZXIub24oe1xuICAvLyAndmlldycgaXMgdGhlIGlkIG9mIHRoZSBkaXYgZWxlbWVudCBpbnNpZGUgd2hpY2ggd2UgcmVuZGVyIHRoZSBIVE1MXG4gICdob21lJzogZnVuY3Rpb24gaG9tZSgpIHtcbiAgIGxvYWRIVE1MKCcuLi9ob21lLmh0bWwnLCAndmlldycsIFwiaG9tZVwiKTtcbiAgfSxcbiAgJ2Rlc2lnbic6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgIGxvYWRIVE1MKCcuLi9kZXNpZ24uaHRtbCcsICd2aWV3JywgXCJkZXNpZ25cIik7XG4gIH1cbn0pO1xuXG4vLyBzZXQgdGhlIGRlZmF1bHQgcm91dGVcbnJvdXRlci5vbihmdW5jdGlvbiAoKSB7XG4gICRpZCgndmlldycpLmlubmVySFRNTCA9IGxvYWRIVE1MKCcuLi9ob21lLmh0bWwnLCAndmlldycsIFwiaG9tZVwiKTtcbn0pO1xuXG4vLyBzZXQgdGhlIDQwNCByb3V0ZVxucm91dGVyLm5vdEZvdW5kKGZ1bmN0aW9uIChxdWVyeSkge1xuICAkaWQoJ3ZpZXcnKS5pbm5lckhUTUwgPSAnPGgxPk5PVEZPVU5EPC9oMT4nO1xufSk7XG5cbnJvdXRlci5yZXNvbHZlKCk7Il19
