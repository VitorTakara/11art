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
      if(document.querySelectorAll('. animation-comoFunciona').length > 0)
         sr.reveal('. animation-comoFunciona', {duration: 1000}, 500);
      if(document.querySelectorAll('.animation-modulosServicos').length > 0)
         sr.reveal('.animation-modulosServicos', {duration: 1000}, 500);
      
      // init galeria
      if(document.querySelectorAll('.gallery').length > 0)
         initPhotoSwipeFromDOM('.gallery');
   }
function $id(id) {
  return document.getElementById(id);
}

function getNavBar(view){
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
   var navbar = getNavBar(view);
   $id(id).innerHTML = navbar + req.responseText; // Insere no HTML
   initComponents(); // Iniciar Galeria e Animações de Smoothscroll
  };
}

// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
  // 'view' is the id of the div element inside which we render the HTML
  'home': function home() {
   loadHTML('./home.html', 'view', "home");
  },
  'design': function design() {
   loadHTML('./design.html', 'view', "design");
  }
});

// set the default route
router.on(function () {
  $id('view').innerHTML = loadHTML('./home.html', 'view', "home");
});

// set the 404 route
router.notFound(function (query) {
  $id('view').innerHTML = '<h1>NOTFOUND</h1>';
});

router.resolve();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnby5taW4uanMiLCJzY3JpcHQuanMiLCJyb3V0ZUNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTplLk5hdmlnbz10KCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtmdW5jdGlvbiB0KCl7cmV0dXJuIShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHwhd2luZG93Lmhpc3Rvcnl8fCF3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpfWZ1bmN0aW9uIG4oZSxuLG8pe3RoaXMucm9vdD1udWxsLHRoaXMuX3JvdXRlcz1bXSx0aGlzLl91c2VIYXNoPW4sdGhpcy5faGFzaD12b2lkIDA9PT1vP1wiI1wiOm8sdGhpcy5fcGF1c2VkPSExLHRoaXMuX2Rlc3Ryb3llZD0hMSx0aGlzLl9sYXN0Um91dGVSZXNvbHZlZD1udWxsLHRoaXMuX25vdEZvdW5kSGFuZGxlcj1udWxsLHRoaXMuX2RlZmF1bHRIYW5kbGVyPW51bGwsdGhpcy5fdXNlUHVzaFN0YXRlPSFuJiZ0KCksdGhpcy5fb25Mb2NhdGlvbkNoYW5nZT10aGlzLl9vbkxvY2F0aW9uQ2hhbmdlLmJpbmQodGhpcyksdGhpcy5fZ2VuZXJpY0hvb2tzPW51bGwsdGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZD1cInB1c2hTdGF0ZVwiLGU/dGhpcy5yb290PW4/ZS5yZXBsYWNlKC9cXC8kLyxcIi9cIit0aGlzLl9oYXNoKTplLnJlcGxhY2UoL1xcLyQvLFwiXCIpOm4mJih0aGlzLnJvb3Q9dGhpcy5fY0xvYygpLnNwbGl0KHRoaXMuX2hhc2gpWzBdLnJlcGxhY2UoL1xcLyQvLFwiL1wiK3RoaXMuX2hhc2gpKSx0aGlzLl9saXN0ZW4oKSx0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBSZWdFeHA/ZTplLnJlcGxhY2UoL1xcLyskLyxcIlwiKS5yZXBsYWNlKC9eXFwvKy8sXCJeL1wiKX1mdW5jdGlvbiBpKGUpe3JldHVybiBlLnJlcGxhY2UoL1xcLyQvLFwiXCIpLnNwbGl0KFwiL1wiKS5sZW5ndGh9ZnVuY3Rpb24gcyhlLHQpe3JldHVybiBpKHQpLWkoZSl9ZnVuY3Rpb24gcihlLHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4oYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOltdKS5tYXAoZnVuY3Rpb24odCl7dmFyIGk9ZnVuY3Rpb24oZSl7dmFyIHQ9W107cmV0dXJue3JlZ2V4cDplIGluc3RhbmNlb2YgUmVnRXhwP2U6bmV3IFJlZ0V4cChlLnJlcGxhY2Uobi5QQVJBTUVURVJfUkVHRVhQLGZ1bmN0aW9uKGUsbyxpKXtyZXR1cm4gdC5wdXNoKGkpLG4uUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFB9KS5yZXBsYWNlKG4uV0lMRENBUkRfUkVHRVhQLG4uUkVQTEFDRV9XSUxEQ0FSRCkrbi5GT0xMT1dFRF9CWV9TTEFTSF9SRUdFWFAsbi5NQVRDSF9SRUdFWFBfRkxBR1MpLHBhcmFtTmFtZXM6dH19KG8odC5yb3V0ZSkpLHM9aS5yZWdleHAscj1pLnBhcmFtTmFtZXMsYT1lLnJlcGxhY2UoL15cXC8rLyxcIi9cIikubWF0Y2gocyksaD1mdW5jdGlvbihlLHQpe3JldHVybiAwPT09dC5sZW5ndGg/bnVsbDplP2Uuc2xpY2UoMSxlLmxlbmd0aCkucmVkdWNlKGZ1bmN0aW9uKGUsbixvKXtyZXR1cm4gbnVsbD09PWUmJihlPXt9KSxlW3Rbb11dPWRlY29kZVVSSUNvbXBvbmVudChuKSxlfSxudWxsKTpudWxsfShhLHIpO3JldHVybiEhYSYme21hdGNoOmEscm91dGU6dCxwYXJhbXM6aH19KS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGV9KX0oZSx0KVswXXx8ITF9ZnVuY3Rpb24gYShlLHQpe3ZhciBuPXQubWFwKGZ1bmN0aW9uKHQpe3JldHVyblwiXCI9PT10LnJvdXRlfHxcIipcIj09PXQucm91dGU/ZTplLnNwbGl0KG5ldyBSZWdFeHAodC5yb3V0ZStcIigkfC8pXCIpKVswXX0pLGk9byhlKTtyZXR1cm4gbi5sZW5ndGg+MT9uLnJlZHVjZShmdW5jdGlvbihlLHQpe3JldHVybiBlLmxlbmd0aD50Lmxlbmd0aCYmKGU9dCksZX0sblswXSk6MT09PW4ubGVuZ3RoP25bMF06aX1mdW5jdGlvbiBoKGUsbixvKXt2YXIgaSxzPWZ1bmN0aW9uKGUpe3JldHVybiBlLnNwbGl0KC9cXD8oLiopPyQvKVswXX07cmV0dXJuIHZvaWQgMD09PW8mJihvPVwiI1wiKSx0KCkmJiFuP3MoZSkuc3BsaXQobylbMF06KGk9ZS5zcGxpdChvKSkubGVuZ3RoPjE/cyhpWzFdKTpzKGlbMF0pfWZ1bmN0aW9uIHUodCxuLG8pe2lmKG4mJlwib2JqZWN0XCI9PT0odm9pZCAwPT09bj9cInVuZGVmaW5lZFwiOmUobikpKXtpZihuLmJlZm9yZSlyZXR1cm4gdm9pZCBuLmJlZm9yZShmdW5jdGlvbigpeyghKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKXx8YXJndW1lbnRzWzBdKSYmKHQoKSxuLmFmdGVyJiZuLmFmdGVyKG8pKX0sbyk7aWYobi5hZnRlcilyZXR1cm4gdCgpLHZvaWQobi5hZnRlciYmbi5hZnRlcihvKSl9dCgpfXJldHVybiBuLnByb3RvdHlwZT17aGVscGVyczp7bWF0Y2g6cixyb290OmEsY2xlYW46byxnZXRPbmx5VVJMOmh9LG5hdmlnYXRlOmZ1bmN0aW9uKGUsdCl7dmFyIG47cmV0dXJuIGU9ZXx8XCJcIix0aGlzLl91c2VQdXNoU3RhdGU/KG49KG49KHQ/XCJcIjp0aGlzLl9nZXRSb290KCkrXCIvXCIpK2UucmVwbGFjZSgvXlxcLysvLFwiL1wiKSkucmVwbGFjZSgvKFteOl0pKFxcL3syLH0pL2csXCIkMS9cIiksaGlzdG9yeVt0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kXSh7fSxcIlwiLG4pLHRoaXMucmVzb2x2ZSgpKTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYoZT1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIit0aGlzLl9oYXNoKSxcIlwiKSx3aW5kb3cubG9jYXRpb24uaHJlZj13aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jJC8sXCJcIikucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuX2hhc2grXCIuKiRcIiksXCJcIikrdGhpcy5faGFzaCtlKSx0aGlzfSxvbjpmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aCxvPUFycmF5KG4pLGk9MDtpPG47aSsrKW9baV09YXJndW1lbnRzW2ldO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG9bMF0pdGhpcy5fZGVmYXVsdEhhbmRsZXI9e2hhbmRsZXI6b1swXSxob29rczpvWzFdfTtlbHNlIGlmKG8ubGVuZ3RoPj0yKWlmKFwiL1wiPT09b1swXSl7dmFyIHI9b1sxXTtcIm9iamVjdFwiPT09ZShvWzFdKSYmKHI9b1sxXS51c2VzKSx0aGlzLl9kZWZhdWx0SGFuZGxlcj17aGFuZGxlcjpyLGhvb2tzOm9bMl19fWVsc2UgdGhpcy5fYWRkKG9bMF0sb1sxXSxvWzJdKTtlbHNlXCJvYmplY3RcIj09PWUob1swXSkmJk9iamVjdC5rZXlzKG9bMF0pLnNvcnQocykuZm9yRWFjaChmdW5jdGlvbihlKXt0Lm9uKGUsb1swXVtlXSl9KTtyZXR1cm4gdGhpc30sb2ZmOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT09dGhpcy5fZGVmYXVsdEhhbmRsZXImJmU9PT10aGlzLl9kZWZhdWx0SGFuZGxlci5oYW5kbGVyP3RoaXMuX2RlZmF1bHRIYW5kbGVyPW51bGw6bnVsbCE9PXRoaXMuX25vdEZvdW5kSGFuZGxlciYmZT09PXRoaXMuX25vdEZvdW5kSGFuZGxlci5oYW5kbGVyJiYodGhpcy5fbm90Rm91bmRIYW5kbGVyPW51bGwpLHRoaXMuX3JvdXRlcz10aGlzLl9yb3V0ZXMucmVkdWNlKGZ1bmN0aW9uKHQsbil7cmV0dXJuIG4uaGFuZGxlciE9PWUmJnQucHVzaChuKSx0fSxbXSksdGhpc30sbm90Rm91bmQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5fbm90Rm91bmRIYW5kbGVyPXtoYW5kbGVyOmUsaG9va3M6dH0sdGhpc30scmVzb2x2ZTpmdW5jdGlvbihlKXt2YXIgbixvLGk9dGhpcyxzPShlfHx0aGlzLl9jTG9jKCkpLnJlcGxhY2UodGhpcy5fZ2V0Um9vdCgpLFwiXCIpO3RoaXMuX3VzZUhhc2gmJihzPXMucmVwbGFjZShuZXcgUmVnRXhwKFwiXi9cIit0aGlzLl9oYXNoKSxcIi9cIikpO3ZhciBhPWZ1bmN0aW9uKGUpe3JldHVybiBlLnNwbGl0KC9cXD8oLiopPyQvKS5zbGljZSgxKS5qb2luKFwiXCIpfShlfHx0aGlzLl9jTG9jKCkpLGw9aChzLHRoaXMuX3VzZUhhc2gsdGhpcy5faGFzaCk7cmV0dXJuIXRoaXMuX3BhdXNlZCYmKHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkJiZsPT09dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQudXJsJiZhPT09dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQucXVlcnk/KHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLmhvb2tzJiZ0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcy5hbHJlYWR5JiZ0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcy5hbHJlYWR5KHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnBhcmFtcyksITEpOihvPXIobCx0aGlzLl9yb3V0ZXMpKT8odGhpcy5fY2FsbExlYXZlKCksdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6by5yb3V0ZS5ob29rcyxwYXJhbXM6by5wYXJhbXMsbmFtZTpvLnJvdXRlLm5hbWV9LG49by5yb3V0ZS5oYW5kbGVyLHUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7by5yb3V0ZS5yb3V0ZSBpbnN0YW5jZW9mIFJlZ0V4cD9uLmFwcGx5KHZvaWQgMCxvLm1hdGNoLnNsaWNlKDEsby5tYXRjaC5sZW5ndGgpKTpuKG8ucGFyYW1zLGEpfSxvLnJvdXRlLmhvb2tzLG8ucGFyYW1zLGkuX2dlbmVyaWNIb29rcyl9LHRoaXMuX2dlbmVyaWNIb29rcyxvLnBhcmFtcyksbyk6dGhpcy5fZGVmYXVsdEhhbmRsZXImJihcIlwiPT09bHx8XCIvXCI9PT1sfHxsPT09dGhpcy5faGFzaHx8ZnVuY3Rpb24oZSxuLG8pe2lmKHQoKSYmIW4pcmV0dXJuITE7aWYoIWUubWF0Y2gobykpcmV0dXJuITE7dmFyIGk9ZS5zcGxpdChvKTtyZXR1cm4gaS5sZW5ndGg8Mnx8XCJcIj09PWlbMV19KGwsdGhpcy5fdXNlSGFzaCx0aGlzLl9oYXNoKSk/KHUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7aS5fY2FsbExlYXZlKCksaS5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6aS5fZGVmYXVsdEhhbmRsZXIuaG9va3N9LGkuX2RlZmF1bHRIYW5kbGVyLmhhbmRsZXIoYSl9LGkuX2RlZmF1bHRIYW5kbGVyLmhvb2tzKX0sdGhpcy5fZ2VuZXJpY0hvb2tzKSwhMCk6KHRoaXMuX25vdEZvdW5kSGFuZGxlciYmdShmdW5jdGlvbigpe3UoZnVuY3Rpb24oKXtpLl9jYWxsTGVhdmUoKSxpLl9sYXN0Um91dGVSZXNvbHZlZD17dXJsOmwscXVlcnk6YSxob29rczppLl9ub3RGb3VuZEhhbmRsZXIuaG9va3N9LGkuX25vdEZvdW5kSGFuZGxlci5oYW5kbGVyKGEpfSxpLl9ub3RGb3VuZEhhbmRsZXIuaG9va3MpfSx0aGlzLl9nZW5lcmljSG9va3MpLCExKSl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLl9yb3V0ZXM9W10sdGhpcy5fZGVzdHJveWVkPSEwLHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkPW51bGwsdGhpcy5fZ2VuZXJpY0hvb2tzPW51bGwsY2xlYXJUaW1lb3V0KHRoaXMuX2xpc3RlbmluZ0ludGVydmFsKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpKX0sdXBkYXRlUGFnZUxpbmtzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJnRoaXMuX2ZpbmRMaW5rcygpLmZvckVhY2goZnVuY3Rpb24odCl7dC5oYXNMaXN0ZW5lckF0dGFjaGVkfHwodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihuKXtpZigobi5jdHJsS2V5fHxuLm1ldGFLZXkpJiZcImFcIj09bi50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKXJldHVybiExO3ZhciBvPWUuZ2V0TGlua1BhdGgodCk7ZS5fZGVzdHJveWVkfHwobi5wcmV2ZW50RGVmYXVsdCgpLGUubmF2aWdhdGUoby5yZXBsYWNlKC9cXC8rJC8sXCJcIikucmVwbGFjZSgvXlxcLysvLFwiL1wiKSkpfSksdC5oYXNMaXN0ZW5lckF0dGFjaGVkPSEwKX0pfSxnZW5lcmF0ZTpmdW5jdGlvbihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sbj10aGlzLl9yb3V0ZXMucmVkdWNlKGZ1bmN0aW9uKG4sbyl7dmFyIGk7aWYoby5uYW1lPT09ZSlmb3IoaSBpbiBuPW8ucm91dGUsdCluPW4udG9TdHJpbmcoKS5yZXBsYWNlKFwiOlwiK2ksdFtpXSk7cmV0dXJuIG59LFwiXCIpO3JldHVybiB0aGlzLl91c2VIYXNoP3RoaXMuX2hhc2grbjpufSxsaW5rOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9nZXRSb290KCkrZX0scGF1c2U6ZnVuY3Rpb24oKXt2YXIgZT0hKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKXx8YXJndW1lbnRzWzBdO3RoaXMuX3BhdXNlZD1lLHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9ZT9cInJlcGxhY2VTdGF0ZVwiOlwicHVzaFN0YXRlXCJ9LHJlc3VtZTpmdW5jdGlvbigpe3RoaXMucGF1c2UoITEpfSxoaXN0b3J5QVBJVXBkYXRlTWV0aG9kOmZ1bmN0aW9uKGUpe3JldHVybiB2b2lkIDA9PT1lP3RoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q6KHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9ZSxlKX0sZGlzYWJsZUlmQVBJTm90QXZhaWxhYmxlOmZ1bmN0aW9uKCl7dCgpfHx0aGlzLmRlc3Ryb3koKX0sbGFzdFJvdXRlUmVzb2x2ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWR9LGdldExpbmtQYXRoOmZ1bmN0aW9uKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZShcImhyZWZcIil9LGhvb2tzOmZ1bmN0aW9uKGUpe3RoaXMuX2dlbmVyaWNIb29rcz1lfSxfYWRkOmZ1bmN0aW9uKHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpudWxsLG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOm51bGw7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PWVuY29kZVVSSSh0KSksdGhpcy5fcm91dGVzLnB1c2goXCJvYmplY3RcIj09PSh2b2lkIDA9PT1uP1widW5kZWZpbmVkXCI6ZShuKSk/e3JvdXRlOnQsaGFuZGxlcjpuLnVzZXMsbmFtZTpuLmFzLGhvb2tzOm98fG4uaG9va3N9Ontyb3V0ZTp0LGhhbmRsZXI6bixob29rczpvfSksdGhpcy5fYWRkfSxfZ2V0Um9vdDpmdW5jdGlvbigpe3JldHVybiBudWxsIT09dGhpcy5yb290P3RoaXMucm9vdDoodGhpcy5yb290PWEodGhpcy5fY0xvYygpLnNwbGl0KFwiP1wiKVswXSx0aGlzLl9yb3V0ZXMpLHRoaXMucm9vdCl9LF9saXN0ZW46ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKHRoaXMuX3VzZVB1c2hTdGF0ZSl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsdGhpcy5fb25Mb2NhdGlvbkNoYW5nZSk7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZcIm9uaGFzaGNoYW5nZVwiaW4gd2luZG93KXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpO2Vsc2V7dmFyIHQ9dGhpcy5fY0xvYygpLG49dm9pZCAwLG89dm9pZCAwOyhvPWZ1bmN0aW9uKCl7bj1lLl9jTG9jKCksdCE9PW4mJih0PW4sZS5yZXNvbHZlKCkpLGUuX2xpc3RlbmluZ0ludGVydmFsPXNldFRpbWVvdXQobywyMDApfSkoKX19LF9jTG9jOmZ1bmN0aW9uKCl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz92b2lkIDAhPT13aW5kb3cuX19OQVZJR09fV0lORE9XX0xPQ0FUSU9OX01PQ0tfXz93aW5kb3cuX19OQVZJR09fV0lORE9XX0xPQ0FUSU9OX01PQ0tfXzpvKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTpcIlwifSxfZmluZExpbmtzOmZ1bmN0aW9uKCl7cmV0dXJuW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbmF2aWdvXVwiKSl9LF9vbkxvY2F0aW9uQ2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy5yZXNvbHZlKCl9LF9jYWxsTGVhdmU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9sYXN0Um91dGVSZXNvbHZlZDtlJiZlLmhvb2tzJiZlLmhvb2tzLmxlYXZlJiZlLmhvb2tzLmxlYXZlKGUucGFyYW1zKX19LG4uUEFSQU1FVEVSX1JFR0VYUD0vKFs6Kl0pKFxcdyspL2csbi5XSUxEQ0FSRF9SRUdFWFA9L1xcKi9nLG4uUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFA9XCIoW14vXSspXCIsbi5SRVBMQUNFX1dJTERDQVJEPVwiKD86LiopXCIsbi5GT0xMT1dFRF9CWV9TTEFTSF9SRUdFWFA9XCIoPzovJHwkKVwiLG4uTUFUQ0hfUkVHRVhQX0ZMQUdTPVwiXCIsbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2aWdvLm1pbi5qcy5tYXBcbiIsIlxyXG4gICB2YXIgaW5pdFBob3RvU3dpcGVGcm9tRE9NID0gZnVuY3Rpb24oZ2FsbGVyeVNlbGVjdG9yKSB7XHJcblxyXG4gICAgICAvLyBwYXJzZSBzbGlkZSBkYXRhICh1cmwsIHRpdGxlLCBzaXplIC4uLikgZnJvbSBET00gZWxlbWVudHMgXHJcbiAgICAgIC8vIChjaGlsZHJlbiBvZiBnYWxsZXJ5U2VsZWN0b3IpXHJcbiAgICAgIHZhciBwYXJzZVRodW1ibmFpbEVsZW1lbnRzID0gZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgdmFyIHRodW1iRWxlbWVudHMgPSBlbC5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICBudW1Ob2RlcyA9IHRodW1iRWxlbWVudHMubGVuZ3RoLFxyXG4gICAgICAgICAgICBpdGVtcyA9IFtdLFxyXG4gICAgICAgICAgICBmaWd1cmVFbCxcclxuICAgICAgICAgICAgbGlua0VsLFxyXG4gICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICBpdGVtO1xyXG5cclxuICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG51bU5vZGVzOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGZpZ3VyZUVsID0gdGh1bWJFbGVtZW50c1tpXTsgLy8gPGZpZ3VyZT4gZWxlbWVudFxyXG5cclxuICAgICAgICAgICAgLy8gaW5jbHVkZSBvbmx5IGVsZW1lbnQgbm9kZXMgXHJcbiAgICAgICAgICAgIGlmKGZpZ3VyZUVsLm5vZGVUeXBlICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5rRWwgPSBmaWd1cmVFbC5jaGlsZHJlblswXTsgLy8gPGE+IGVsZW1lbnRcclxuXHJcbiAgICAgICAgICAgIHNpemUgPSBsaW5rRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemUnKS5zcGxpdCgneCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHNsaWRlIG9iamVjdFxyXG4gICAgICAgICAgICBpdGVtID0ge1xyXG4gICAgICAgICAgICAgICAgICBzcmM6IGxpbmtFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcclxuICAgICAgICAgICAgICAgICAgdzogcGFyc2VJbnQoc2l6ZVswXSwgMTApLFxyXG4gICAgICAgICAgICAgICAgICBoOiBwYXJzZUludChzaXplWzFdLCAxMClcclxuICAgICAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYoZmlndXJlRWwuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAvLyA8ZmlnY2FwdGlvbj4gY29udGVudFxyXG4gICAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gZmlndXJlRWwuY2hpbGRyZW5bMV0uaW5uZXJIVE1MOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYobGlua0VsLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgLy8gPGltZz4gdGh1bWJuYWlsIGVsZW1lbnQsIHJldHJpZXZpbmcgdGh1bWJuYWlsIHVybFxyXG4gICAgICAgICAgICAgICAgICBpdGVtLm1zcmMgPSBsaW5rRWwuY2hpbGRyZW5bMF0uZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uZWwgPSBmaWd1cmVFbDsgLy8gc2F2ZSBsaW5rIHRvIGVsZW1lbnQgZm9yIGdldFRodW1iQm91bmRzRm5cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gZmluZCBuZWFyZXN0IHBhcmVudCBlbGVtZW50XHJcbiAgICAgIHZhciBjbG9zZXN0ID0gZnVuY3Rpb24gY2xvc2VzdChlbCwgZm4pIHtcclxuICAgICAgICAgcmV0dXJuIGVsICYmICggZm4oZWwpID8gZWwgOiBjbG9zZXN0KGVsLnBhcmVudE5vZGUsIGZuKSApO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gdHJpZ2dlcnMgd2hlbiB1c2VyIGNsaWNrcyBvbiB0aHVtYm5haWxcclxuICAgICAgdmFyIG9uVGh1bWJuYWlsc0NsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgIGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICB2YXIgZVRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcbiAgICAgICAgIC8vIGZpbmQgcm9vdCBlbGVtZW50IG9mIHNsaWRlXHJcbiAgICAgICAgIHZhciBjbGlja2VkTGlzdEl0ZW0gPSBjbG9zZXN0KGVUYXJnZXQsIGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdGSUdVUkUnKTtcclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICBpZighY2xpY2tlZExpc3RJdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gZmluZCBpbmRleCBvZiBjbGlja2VkIGl0ZW0gYnkgbG9vcGluZyB0aHJvdWdoIGFsbCBjaGlsZCBub2Rlc1xyXG4gICAgICAgICAvLyBhbHRlcm5hdGl2ZWx5LCB5b3UgbWF5IGRlZmluZSBpbmRleCB2aWEgZGF0YS0gYXR0cmlidXRlXHJcbiAgICAgICAgIHZhciBjbGlja2VkR2FsbGVyeSA9IGNsaWNrZWRMaXN0SXRlbS5wYXJlbnROb2RlLFxyXG4gICAgICAgICAgICBjaGlsZE5vZGVzID0gY2xpY2tlZExpc3RJdGVtLnBhcmVudE5vZGUuY2hpbGROb2RlcyxcclxuICAgICAgICAgICAgbnVtQ2hpbGROb2RlcyA9IGNoaWxkTm9kZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBub2RlSW5kZXggPSAwLFxyXG4gICAgICAgICAgICBpbmRleDtcclxuXHJcbiAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQ2hpbGROb2RlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgIT09IDEpIHsgXHJcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY2hpbGROb2Rlc1tpXSA9PT0gY2xpY2tlZExpc3RJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgIGluZGV4ID0gbm9kZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlSW5kZXgrKztcclxuICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICBpZihpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIG9wZW4gUGhvdG9Td2lwZSBpZiB2YWxpZCBpbmRleCBmb3VuZFxyXG4gICAgICAgICAgICBvcGVuUGhvdG9Td2lwZSggaW5kZXgsIGNsaWNrZWRHYWxsZXJ5ICk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gcGFyc2UgcGljdHVyZSBpbmRleCBhbmQgZ2FsbGVyeSBpbmRleCBmcm9tIFVSTCAoIyZwaWQ9MSZnaWQ9MilcclxuICAgICAgdmFyIHBob3Rvc3dpcGVQYXJzZUhhc2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSksXHJcbiAgICAgICAgIHBhcmFtcyA9IHt9O1xyXG5cclxuICAgICAgICAgaWYoaGFzaC5sZW5ndGggPCA1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHZhciB2YXJzID0gaGFzaC5zcGxpdCgnJicpO1xyXG4gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoIXZhcnNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7ICBcclxuICAgICAgICAgICAgaWYocGFpci5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgcGFyYW1zW3BhaXJbMF1dID0gcGFpclsxXTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYocGFyYW1zLmdpZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMuZ2lkID0gcGFyc2VJbnQocGFyYW1zLmdpZCwgMTApO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdmFyIG9wZW5QaG90b1N3aXBlID0gZnVuY3Rpb24oaW5kZXgsIGdhbGxlcnlFbGVtZW50LCBkaXNhYmxlQW5pbWF0aW9uLCBmcm9tVVJMKSB7XHJcbiAgICAgICAgIHZhciBwc3dwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wc3dwJylbMF0sXHJcbiAgICAgICAgICAgIGdhbGxlcnksXHJcbiAgICAgICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgICAgIGl0ZW1zO1xyXG5cclxuICAgICAgICAgaXRlbXMgPSBwYXJzZVRodW1ibmFpbEVsZW1lbnRzKGdhbGxlcnlFbGVtZW50KTtcclxuXHJcbiAgICAgICAgIC8vIGRlZmluZSBvcHRpb25zIChpZiBuZWVkZWQpXHJcbiAgICAgICAgIG9wdGlvbnMgPSB7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgZ2FsbGVyeSBpbmRleCAoZm9yIFVSTClcclxuICAgICAgICAgICAgZ2FsbGVyeVVJRDogZ2FsbGVyeUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXBzd3AtdWlkJyksXHJcblxyXG4gICAgICAgICAgICBnZXRUaHVtYkJvdW5kc0ZuOiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBTZWUgT3B0aW9ucyAtPiBnZXRUaHVtYkJvdW5kc0ZuIHNlY3Rpb24gb2YgZG9jdW1lbnRhdGlvbiBmb3IgbW9yZSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgIHZhciB0aHVtYm5haWwgPSBpdGVtc1tpbmRleF0uZWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLCAvLyBmaW5kIHRodW1ibmFpbFxyXG4gICAgICAgICAgICAgICAgICAgICBwYWdlWVNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICByZWN0ID0gdGh1bWJuYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyBcclxuXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7eDpyZWN0LmxlZnQsIHk6cmVjdC50b3AgKyBwYWdlWVNjcm9sbCwgdzpyZWN0LndpZHRofTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgIC8vIFBob3RvU3dpcGUgb3BlbmVkIGZyb20gVVJMXHJcbiAgICAgICAgIGlmKGZyb21VUkwpIHtcclxuICAgICAgICAgICAgaWYob3B0aW9ucy5nYWxsZXJ5UElEcykge1xyXG4gICAgICAgICAgICAgICAgICAvLyBwYXJzZSByZWFsIGluZGV4IHdoZW4gY3VzdG9tIFBJRHMgYXJlIHVzZWQgXHJcbiAgICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9waG90b3N3aXBlLmNvbS9kb2N1bWVudGF0aW9uL2ZhcS5odG1sI2N1c3RvbS1waWQtaW4tdXJsXHJcbiAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBpdGVtcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICBpZihpdGVtc1tqXS5waWQgPT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleCA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgLy8gaW4gVVJMIGluZGV4ZXMgc3RhcnQgZnJvbSAxXHJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvcHRpb25zLmluZGV4ID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gZXhpdCBpZiBpbmRleCBub3QgZm91bmRcclxuICAgICAgICAgaWYoIGlzTmFOKG9wdGlvbnMuaW5kZXgpICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmKGRpc2FibGVBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5zaG93QW5pbWF0aW9uRHVyYXRpb24gPSAwO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBQYXNzIGRhdGEgdG8gUGhvdG9Td2lwZSBhbmQgaW5pdGlhbGl6ZSBpdFxyXG4gICAgICAgICBnYWxsZXJ5ID0gbmV3IFBob3RvU3dpcGUoIHBzd3BFbGVtZW50LCBQaG90b1N3aXBlVUlfRGVmYXVsdCwgaXRlbXMsIG9wdGlvbnMpO1xyXG4gICAgICAgICBnYWxsZXJ5LmluaXQoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgZ2FsbGVyeSBlbGVtZW50cyBhbmQgYmluZCBldmVudHNcclxuICAgICAgdmFyIGdhbGxlcnlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGdhbGxlcnlTZWxlY3RvciApO1xyXG5cclxuICAgICAgZm9yKHZhciBpID0gMCwgbCA9IGdhbGxlcnlFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgZ2FsbGVyeUVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1wc3dwLXVpZCcsIGkrMSk7XHJcbiAgICAgICAgIGdhbGxlcnlFbGVtZW50c1tpXS5vbmNsaWNrID0gb25UaHVtYm5haWxzQ2xpY2s7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFBhcnNlIFVSTCBhbmQgb3BlbiBnYWxsZXJ5IGlmIGl0IGNvbnRhaW5zICMmcGlkPTMmZ2lkPTFcclxuICAgICAgdmFyIGhhc2hEYXRhID0gcGhvdG9zd2lwZVBhcnNlSGFzaCgpO1xyXG4gICAgICBpZihoYXNoRGF0YS5waWQgJiYgaGFzaERhdGEuZ2lkKSB7XHJcbiAgICAgICAgIG9wZW5QaG90b1N3aXBlKCBoYXNoRGF0YS5waWQgLCAgZ2FsbGVyeUVsZW1lbnRzWyBoYXNoRGF0YS5naWQgLSAxIF0sIHRydWUsIHRydWUgKTtcclxuICAgICAgfVxyXG4gICB9O1xyXG5cclxuICAgLy8gc2Nyb2xsIHN1YXZlXHJcbiAgIGZ1bmN0aW9uIHNtb290aFNjcm9sbChsb2NhdGlvbil7XHJcbiAgICAgIGlmKGxvY2F0aW9uKXtcclxuICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBsb2NhdGlvbik7XHJcbiAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcInN0YXJ0XCIsIGlubGluZTogXCJuZWFyZXN0XCJ9KTtcclxuICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcihcIlZhcmnDoXZlbCAnbG9jYXRpb24nIG7Do28gcGFzc2FkYSBubyBldmVudG8gZGUgJ2NsaWNrJ1wiKTtcclxuICAgfVxyXG5cclxuICAgLy8gaW5pdCBzY3JvbGwgcmV2ZWFsXHJcbiAgIGZ1bmN0aW9uIGluaXRDb21wb25lbnRzKCl7XHJcbiAgICAgIHdpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpO1xyXG5cclxuICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFuaW1hdGVkJykubGVuZ3RoID4gMClcclxuICAgICAgICAgc3IucmV2ZWFsKCcuYW5pbWF0ZWQnLCB7ZHVyYXRpb246IDE1MDB9KTtcclxuICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLiBhbmltYXRpb24tY29tb0Z1bmNpb25hJykubGVuZ3RoID4gMClcclxuICAgICAgICAgc3IucmV2ZWFsKCcuIGFuaW1hdGlvbi1jb21vRnVuY2lvbmEnLCB7ZHVyYXRpb246IDEwMDB9LCA1MDApO1xyXG4gICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5pbWF0aW9uLW1vZHVsb3NTZXJ2aWNvcycpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgIHNyLnJldmVhbCgnLmFuaW1hdGlvbi1tb2R1bG9zU2Vydmljb3MnLCB7ZHVyYXRpb246IDEwMDB9LCA1MDApO1xyXG4gICAgICBcclxuICAgICAgLy8gaW5pdCBnYWxlcmlhXHJcbiAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5JykubGVuZ3RoID4gMClcclxuICAgICAgICAgaW5pdFBob3RvU3dpcGVGcm9tRE9NKCcuZ2FsbGVyeScpO1xyXG4gICB9XHJcbiAgICIsImZ1bmN0aW9uICRpZChpZCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuXG5mdW5jdGlvbiBnZXROYXZCYXIodmlldyl7XG4gICB2YXIgbmF2QmFyX2NvbG9yO1xuXG4gICBzd2l0Y2ggKHZpZXcpIHtcbiAgICAgIGNhc2UgXCJob21lXCI6XG4gICAgICAgICBuYXZCYXJfY29sb3IgPSBcIiNlYjU2MDA3ZVwiO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGVzaWduXCI6XG4gICAgICAgICBuYXZCYXJfY29sb3IgPSBcInJnYig3NiwgMjE3LCAxMDApXCI7XG4gICAgICBicmVhaztcbiAgIH1cblxuICAgcmV0dXJuIGBcbiAgICAgIDxuYXYgY2xhc3M9XCJuYXYgc3Ryb2tlRWZmZWN0XCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiR7bmF2QmFyX2NvbG9yfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm5hdi1oZWFkZXJcIj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXYtaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvMTFBcnRfV2hpdGUucG5nXCIgd2lkdGg9XCI1MFwiIGhlaWdodD1cIjgwXCIgYWx0PVwiXCI+IDwvYT5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibmF2LW1vYmlsZUJ0blwiPlxuICAgICAgICAgPGxhYmVsIGZvcj1cIm5hdi1tb2JpbGVCdG5Ub29nbGVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwibmF2LW1vYmlsZUJ0bi10b29nbGVUZXh0XCI+TWVudTwvcD5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIm5hdi1tb2JpbGVCdG5Ub29nbGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuYXYtbGlua3NcIj5cbiAgICAgICAgIDxpbWcgY2xhc3M9XCJuYXYtbGlua3MtbG9nb1wiIHNyYz1cImltZy8xMUFydF9XaGl0ZS5wbmdcIiB3aWR0aD1cIjUwXCIgaGVpZ2h0PVwiODBcIiBhbHQ9XCJcIj5cbiAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXYtbGlua3MtYnRuRmVjaGFyXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibmF2LW1vYmlsZUJ0blRvb2dsZVwiPkZlY2hhciBYPC9sYWJlbD5cbiAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPGhyPlxuICAgICAgICAgPGEgaHJlZj1cIiMhaG9tZVwiPkhPTUU8L2E+XG4gICAgICAgICA8YSBocmVmPVwiIyFzZXJ2aWNvc1wiPlNFUlZJw4dPUzwvYT5cbiAgICAgICAgIDxhIGhyZWY9XCIjIXBvcnRmb2xpb1wiPlBPUlRGT0xJTzwvYT5cbiAgICAgICAgIDxhIGhyZWY9XCIjIXNvYnJlbm9zXCI+U09CUkUgTsOTUzwvYT5cbiAgICAgICAgIDxhIGNsYXNzPVwibXRuLTRcIiBocmVmPVwiIyFjb250YXRvXCI+Q09OVEFUTzwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9uYXY+XG4gICBgO1xufVxuXG5mdW5jdGlvbiBsb2FkSFRNTCh1cmwsIGlkLCB2aWV3KSB7XG4gICByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgIHJlcS5vcGVuKCdHRVQnLCB1cmwpO1xuICAgcmVxLnNlbmQoKTtcbiAgIHJlcS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICB2YXIgbmF2YmFyID0gZ2V0TmF2QmFyKHZpZXcpO1xuICAgJGlkKGlkKS5pbm5lckhUTUwgPSBuYXZiYXIgKyByZXEucmVzcG9uc2VUZXh0OyAvLyBJbnNlcmUgbm8gSFRNTFxuICAgaW5pdENvbXBvbmVudHMoKTsgLy8gSW5pY2lhciBHYWxlcmlhIGUgQW5pbWHDp8O1ZXMgZGUgU21vb3Roc2Nyb2xsXG4gIH07XG59XG5cbi8vIHVzZSAjISB0byBoYXNoXG5yb3V0ZXIgPSBuZXcgTmF2aWdvKG51bGwsIHRydWUsICcjIScpO1xucm91dGVyLm9uKHtcbiAgLy8gJ3ZpZXcnIGlzIHRoZSBpZCBvZiB0aGUgZGl2IGVsZW1lbnQgaW5zaWRlIHdoaWNoIHdlIHJlbmRlciB0aGUgSFRNTFxuICAnaG9tZSc6IGZ1bmN0aW9uIGhvbWUoKSB7XG4gICBsb2FkSFRNTCgnLi9ob21lLmh0bWwnLCAndmlldycsIFwiaG9tZVwiKTtcbiAgfSxcbiAgJ2Rlc2lnbic6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgIGxvYWRIVE1MKCcuL2Rlc2lnbi5odG1sJywgJ3ZpZXcnLCBcImRlc2lnblwiKTtcbiAgfVxufSk7XG5cbi8vIHNldCB0aGUgZGVmYXVsdCByb3V0ZVxucm91dGVyLm9uKGZ1bmN0aW9uICgpIHtcbiAgJGlkKCd2aWV3JykuaW5uZXJIVE1MID0gbG9hZEhUTUwoJy4vaG9tZS5odG1sJywgJ3ZpZXcnLCBcImhvbWVcIik7XG59KTtcblxuLy8gc2V0IHRoZSA0MDQgcm91dGVcbnJvdXRlci5ub3RGb3VuZChmdW5jdGlvbiAocXVlcnkpIHtcbiAgJGlkKCd2aWV3JykuaW5uZXJIVE1MID0gJzxoMT5OT1RGT1VORDwvaDE+Jztcbn0pO1xuXG5yb3V0ZXIucmVzb2x2ZSgpOyJdfQ==
