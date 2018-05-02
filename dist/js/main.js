!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Navigo=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(e,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&t(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=n?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(e){return e.replace(/\/$/,"").split("/").length}function s(e,t){return i(t)-i(e)}function r(e,t){return function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(t){var i=function(e){var t=[];return{regexp:e instanceof RegExp?e:new RegExp(e.replace(n.PARAMETER_REGEXP,function(e,o,i){return t.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:t}}(o(t.route)),s=i.regexp,r=i.paramNames,a=e.replace(/^\/+/,"/").match(s),h=function(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce(function(e,n,o){return null===e&&(e={}),e[t[o]]=decodeURIComponent(n),e},null):null}(a,r);return!!a&&{match:a,route:t,params:h}}).filter(function(e){return e})}(e,t)[0]||!1}function a(e,t){var n=t.map(function(t){return""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]}),i=o(e);return n.length>1?n.reduce(function(e,t){return e.length>t.length&&(e=t),e},n[0]):1===n.length?n[0]:i}function h(e,n,o){var i,s=function(e){return e.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),t()&&!n?s(e).split(o)[0]:(i=e.split(o)).length>1?s(i[1]):s(i[0])}function u(t,n,o){if(n&&"object"===(void 0===n?"undefined":e(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(t(),n.after&&n.after(o))},o);if(n.after)return t(),void(n.after&&n.after(o))}t()}return n.prototype={helpers:{match:r,root:a,clean:o,getOnlyURL:h},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var t=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===e(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else"object"===e(o[0])&&Object.keys(o[0]).sort(s).forEach(function(e){t.on(e,o[0][e])});return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(t,n){return n.handler!==e&&t.push(n),t},[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var n,o,i=this,s=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var a=function(e){return e.split(/\?(.*)?$/).slice(1).join("")}(e||this._cLoc()),l=h(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&l===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=r(l,this._routes))?(this._callLeave(),this._lastRouteResolved={url:l,query:a,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,u(function(){u(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,a)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===l||"/"===l||l===this._hash||function(e,n,o){if(t()&&!n)return!1;if(!e.match(o))return!1;var i=e.split(o);return i.length<2||""===i[1]}(l,this._useHash,this._hash))?(u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(a)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(a)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach(function(t){t.hasListenerAttached||(t.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),t.hasListenerAttached=!0)})},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===e)for(i in n=o.route,t)n=n.toString().replace(":"+i,t[i]);return n},"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,this._historyAPIUpdateMethod=e?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(e){return void 0===e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){t()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e},_add:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof t&&(t=encodeURI(t)),this._routes.push("object"===(void 0===n?"undefined":e(n))?{route:t,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:t,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=a(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var t=this._cLoc(),n=void 0,o=void 0;(o=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var e=this._lastRouteResolved;e&&e.hooks&&e.hooks.leave&&e.hooks.leave(e.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="",n});
//# sourceMappingURL=navigo.min.js.map
function $id(id) {
  return document.getElementById(id);
}

function loadHTML(url, id, view) {
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = function () {
    var color;

   switch (view) {
      case "home":
         color = "#eb56007e";
      break;
      case "design":
         color = "rgb(76, 217, 100)";
      break;
   }

    var navbar = `
    <nav class="nav strokeEffect" style="background:${color}">
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
   </nav>`;

   $id(id).innerHTML = navbar + req.responseText;
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

   window.sr = ScrollReveal();
   sr.reveal('.animated', {duration: 1500});
   sr.reveal('.comoFunciona', {duration: 1000}, 500);

   // init galeria
   initPhotoSwipeFromDOM('.gallery');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnby5taW4uanMiLCJyb3V0ZUNvbmZpZy5qcyIsInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTplLk5hdmlnbz10KCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtmdW5jdGlvbiB0KCl7cmV0dXJuIShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHwhd2luZG93Lmhpc3Rvcnl8fCF3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpfWZ1bmN0aW9uIG4oZSxuLG8pe3RoaXMucm9vdD1udWxsLHRoaXMuX3JvdXRlcz1bXSx0aGlzLl91c2VIYXNoPW4sdGhpcy5faGFzaD12b2lkIDA9PT1vP1wiI1wiOm8sdGhpcy5fcGF1c2VkPSExLHRoaXMuX2Rlc3Ryb3llZD0hMSx0aGlzLl9sYXN0Um91dGVSZXNvbHZlZD1udWxsLHRoaXMuX25vdEZvdW5kSGFuZGxlcj1udWxsLHRoaXMuX2RlZmF1bHRIYW5kbGVyPW51bGwsdGhpcy5fdXNlUHVzaFN0YXRlPSFuJiZ0KCksdGhpcy5fb25Mb2NhdGlvbkNoYW5nZT10aGlzLl9vbkxvY2F0aW9uQ2hhbmdlLmJpbmQodGhpcyksdGhpcy5fZ2VuZXJpY0hvb2tzPW51bGwsdGhpcy5faGlzdG9yeUFQSVVwZGF0ZU1ldGhvZD1cInB1c2hTdGF0ZVwiLGU/dGhpcy5yb290PW4/ZS5yZXBsYWNlKC9cXC8kLyxcIi9cIit0aGlzLl9oYXNoKTplLnJlcGxhY2UoL1xcLyQvLFwiXCIpOm4mJih0aGlzLnJvb3Q9dGhpcy5fY0xvYygpLnNwbGl0KHRoaXMuX2hhc2gpWzBdLnJlcGxhY2UoL1xcLyQvLFwiL1wiK3RoaXMuX2hhc2gpKSx0aGlzLl9saXN0ZW4oKSx0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBSZWdFeHA/ZTplLnJlcGxhY2UoL1xcLyskLyxcIlwiKS5yZXBsYWNlKC9eXFwvKy8sXCJeL1wiKX1mdW5jdGlvbiBpKGUpe3JldHVybiBlLnJlcGxhY2UoL1xcLyQvLFwiXCIpLnNwbGl0KFwiL1wiKS5sZW5ndGh9ZnVuY3Rpb24gcyhlLHQpe3JldHVybiBpKHQpLWkoZSl9ZnVuY3Rpb24gcihlLHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4oYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOltdKS5tYXAoZnVuY3Rpb24odCl7dmFyIGk9ZnVuY3Rpb24oZSl7dmFyIHQ9W107cmV0dXJue3JlZ2V4cDplIGluc3RhbmNlb2YgUmVnRXhwP2U6bmV3IFJlZ0V4cChlLnJlcGxhY2Uobi5QQVJBTUVURVJfUkVHRVhQLGZ1bmN0aW9uKGUsbyxpKXtyZXR1cm4gdC5wdXNoKGkpLG4uUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFB9KS5yZXBsYWNlKG4uV0lMRENBUkRfUkVHRVhQLG4uUkVQTEFDRV9XSUxEQ0FSRCkrbi5GT0xMT1dFRF9CWV9TTEFTSF9SRUdFWFAsbi5NQVRDSF9SRUdFWFBfRkxBR1MpLHBhcmFtTmFtZXM6dH19KG8odC5yb3V0ZSkpLHM9aS5yZWdleHAscj1pLnBhcmFtTmFtZXMsYT1lLnJlcGxhY2UoL15cXC8rLyxcIi9cIikubWF0Y2gocyksaD1mdW5jdGlvbihlLHQpe3JldHVybiAwPT09dC5sZW5ndGg/bnVsbDplP2Uuc2xpY2UoMSxlLmxlbmd0aCkucmVkdWNlKGZ1bmN0aW9uKGUsbixvKXtyZXR1cm4gbnVsbD09PWUmJihlPXt9KSxlW3Rbb11dPWRlY29kZVVSSUNvbXBvbmVudChuKSxlfSxudWxsKTpudWxsfShhLHIpO3JldHVybiEhYSYme21hdGNoOmEscm91dGU6dCxwYXJhbXM6aH19KS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGV9KX0oZSx0KVswXXx8ITF9ZnVuY3Rpb24gYShlLHQpe3ZhciBuPXQubWFwKGZ1bmN0aW9uKHQpe3JldHVyblwiXCI9PT10LnJvdXRlfHxcIipcIj09PXQucm91dGU/ZTplLnNwbGl0KG5ldyBSZWdFeHAodC5yb3V0ZStcIigkfC8pXCIpKVswXX0pLGk9byhlKTtyZXR1cm4gbi5sZW5ndGg+MT9uLnJlZHVjZShmdW5jdGlvbihlLHQpe3JldHVybiBlLmxlbmd0aD50Lmxlbmd0aCYmKGU9dCksZX0sblswXSk6MT09PW4ubGVuZ3RoP25bMF06aX1mdW5jdGlvbiBoKGUsbixvKXt2YXIgaSxzPWZ1bmN0aW9uKGUpe3JldHVybiBlLnNwbGl0KC9cXD8oLiopPyQvKVswXX07cmV0dXJuIHZvaWQgMD09PW8mJihvPVwiI1wiKSx0KCkmJiFuP3MoZSkuc3BsaXQobylbMF06KGk9ZS5zcGxpdChvKSkubGVuZ3RoPjE/cyhpWzFdKTpzKGlbMF0pfWZ1bmN0aW9uIHUodCxuLG8pe2lmKG4mJlwib2JqZWN0XCI9PT0odm9pZCAwPT09bj9cInVuZGVmaW5lZFwiOmUobikpKXtpZihuLmJlZm9yZSlyZXR1cm4gdm9pZCBuLmJlZm9yZShmdW5jdGlvbigpeyghKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKXx8YXJndW1lbnRzWzBdKSYmKHQoKSxuLmFmdGVyJiZuLmFmdGVyKG8pKX0sbyk7aWYobi5hZnRlcilyZXR1cm4gdCgpLHZvaWQobi5hZnRlciYmbi5hZnRlcihvKSl9dCgpfXJldHVybiBuLnByb3RvdHlwZT17aGVscGVyczp7bWF0Y2g6cixyb290OmEsY2xlYW46byxnZXRPbmx5VVJMOmh9LG5hdmlnYXRlOmZ1bmN0aW9uKGUsdCl7dmFyIG47cmV0dXJuIGU9ZXx8XCJcIix0aGlzLl91c2VQdXNoU3RhdGU/KG49KG49KHQ/XCJcIjp0aGlzLl9nZXRSb290KCkrXCIvXCIpK2UucmVwbGFjZSgvXlxcLysvLFwiL1wiKSkucmVwbGFjZSgvKFteOl0pKFxcL3syLH0pL2csXCIkMS9cIiksaGlzdG9yeVt0aGlzLl9oaXN0b3J5QVBJVXBkYXRlTWV0aG9kXSh7fSxcIlwiLG4pLHRoaXMucmVzb2x2ZSgpKTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYoZT1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIit0aGlzLl9oYXNoKSxcIlwiKSx3aW5kb3cubG9jYXRpb24uaHJlZj13aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jJC8sXCJcIikucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuX2hhc2grXCIuKiRcIiksXCJcIikrdGhpcy5faGFzaCtlKSx0aGlzfSxvbjpmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aCxvPUFycmF5KG4pLGk9MDtpPG47aSsrKW9baV09YXJndW1lbnRzW2ldO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG9bMF0pdGhpcy5fZGVmYXVsdEhhbmRsZXI9e2hhbmRsZXI6b1swXSxob29rczpvWzFdfTtlbHNlIGlmKG8ubGVuZ3RoPj0yKWlmKFwiL1wiPT09b1swXSl7dmFyIHI9b1sxXTtcIm9iamVjdFwiPT09ZShvWzFdKSYmKHI9b1sxXS51c2VzKSx0aGlzLl9kZWZhdWx0SGFuZGxlcj17aGFuZGxlcjpyLGhvb2tzOm9bMl19fWVsc2UgdGhpcy5fYWRkKG9bMF0sb1sxXSxvWzJdKTtlbHNlXCJvYmplY3RcIj09PWUob1swXSkmJk9iamVjdC5rZXlzKG9bMF0pLnNvcnQocykuZm9yRWFjaChmdW5jdGlvbihlKXt0Lm9uKGUsb1swXVtlXSl9KTtyZXR1cm4gdGhpc30sb2ZmOmZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT09dGhpcy5fZGVmYXVsdEhhbmRsZXImJmU9PT10aGlzLl9kZWZhdWx0SGFuZGxlci5oYW5kbGVyP3RoaXMuX2RlZmF1bHRIYW5kbGVyPW51bGw6bnVsbCE9PXRoaXMuX25vdEZvdW5kSGFuZGxlciYmZT09PXRoaXMuX25vdEZvdW5kSGFuZGxlci5oYW5kbGVyJiYodGhpcy5fbm90Rm91bmRIYW5kbGVyPW51bGwpLHRoaXMuX3JvdXRlcz10aGlzLl9yb3V0ZXMucmVkdWNlKGZ1bmN0aW9uKHQsbil7cmV0dXJuIG4uaGFuZGxlciE9PWUmJnQucHVzaChuKSx0fSxbXSksdGhpc30sbm90Rm91bmQ6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5fbm90Rm91bmRIYW5kbGVyPXtoYW5kbGVyOmUsaG9va3M6dH0sdGhpc30scmVzb2x2ZTpmdW5jdGlvbihlKXt2YXIgbixvLGk9dGhpcyxzPShlfHx0aGlzLl9jTG9jKCkpLnJlcGxhY2UodGhpcy5fZ2V0Um9vdCgpLFwiXCIpO3RoaXMuX3VzZUhhc2gmJihzPXMucmVwbGFjZShuZXcgUmVnRXhwKFwiXi9cIit0aGlzLl9oYXNoKSxcIi9cIikpO3ZhciBhPWZ1bmN0aW9uKGUpe3JldHVybiBlLnNwbGl0KC9cXD8oLiopPyQvKS5zbGljZSgxKS5qb2luKFwiXCIpfShlfHx0aGlzLl9jTG9jKCkpLGw9aChzLHRoaXMuX3VzZUhhc2gsdGhpcy5faGFzaCk7cmV0dXJuIXRoaXMuX3BhdXNlZCYmKHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkJiZsPT09dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQudXJsJiZhPT09dGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQucXVlcnk/KHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLmhvb2tzJiZ0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcy5hbHJlYWR5JiZ0aGlzLl9sYXN0Um91dGVSZXNvbHZlZC5ob29rcy5hbHJlYWR5KHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkLnBhcmFtcyksITEpOihvPXIobCx0aGlzLl9yb3V0ZXMpKT8odGhpcy5fY2FsbExlYXZlKCksdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6by5yb3V0ZS5ob29rcyxwYXJhbXM6by5wYXJhbXMsbmFtZTpvLnJvdXRlLm5hbWV9LG49by5yb3V0ZS5oYW5kbGVyLHUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7by5yb3V0ZS5yb3V0ZSBpbnN0YW5jZW9mIFJlZ0V4cD9uLmFwcGx5KHZvaWQgMCxvLm1hdGNoLnNsaWNlKDEsby5tYXRjaC5sZW5ndGgpKTpuKG8ucGFyYW1zLGEpfSxvLnJvdXRlLmhvb2tzLG8ucGFyYW1zLGkuX2dlbmVyaWNIb29rcyl9LHRoaXMuX2dlbmVyaWNIb29rcyxvLnBhcmFtcyksbyk6dGhpcy5fZGVmYXVsdEhhbmRsZXImJihcIlwiPT09bHx8XCIvXCI9PT1sfHxsPT09dGhpcy5faGFzaHx8ZnVuY3Rpb24oZSxuLG8pe2lmKHQoKSYmIW4pcmV0dXJuITE7aWYoIWUubWF0Y2gobykpcmV0dXJuITE7dmFyIGk9ZS5zcGxpdChvKTtyZXR1cm4gaS5sZW5ndGg8Mnx8XCJcIj09PWlbMV19KGwsdGhpcy5fdXNlSGFzaCx0aGlzLl9oYXNoKSk/KHUoZnVuY3Rpb24oKXt1KGZ1bmN0aW9uKCl7aS5fY2FsbExlYXZlKCksaS5fbGFzdFJvdXRlUmVzb2x2ZWQ9e3VybDpsLHF1ZXJ5OmEsaG9va3M6aS5fZGVmYXVsdEhhbmRsZXIuaG9va3N9LGkuX2RlZmF1bHRIYW5kbGVyLmhhbmRsZXIoYSl9LGkuX2RlZmF1bHRIYW5kbGVyLmhvb2tzKX0sdGhpcy5fZ2VuZXJpY0hvb2tzKSwhMCk6KHRoaXMuX25vdEZvdW5kSGFuZGxlciYmdShmdW5jdGlvbigpe3UoZnVuY3Rpb24oKXtpLl9jYWxsTGVhdmUoKSxpLl9sYXN0Um91dGVSZXNvbHZlZD17dXJsOmwscXVlcnk6YSxob29rczppLl9ub3RGb3VuZEhhbmRsZXIuaG9va3N9LGkuX25vdEZvdW5kSGFuZGxlci5oYW5kbGVyKGEpfSxpLl9ub3RGb3VuZEhhbmRsZXIuaG9va3MpfSx0aGlzLl9nZW5lcmljSG9va3MpLCExKSl9LGRlc3Ryb3k6ZnVuY3Rpb24oKXt0aGlzLl9yb3V0ZXM9W10sdGhpcy5fZGVzdHJveWVkPSEwLHRoaXMuX2xhc3RSb3V0ZVJlc29sdmVkPW51bGwsdGhpcy5fZ2VuZXJpY0hvb2tzPW51bGwsY2xlYXJUaW1lb3V0KHRoaXMuX2xpc3RlbmluZ0ludGVydmFsKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpKX0sdXBkYXRlUGFnZUxpbmtzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztcInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJnRoaXMuX2ZpbmRMaW5rcygpLmZvckVhY2goZnVuY3Rpb24odCl7dC5oYXNMaXN0ZW5lckF0dGFjaGVkfHwodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihuKXtpZigobi5jdHJsS2V5fHxuLm1ldGFLZXkpJiZcImFcIj09bi50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKXJldHVybiExO3ZhciBvPWUuZ2V0TGlua1BhdGgodCk7ZS5fZGVzdHJveWVkfHwobi5wcmV2ZW50RGVmYXVsdCgpLGUubmF2aWdhdGUoby5yZXBsYWNlKC9cXC8rJC8sXCJcIikucmVwbGFjZSgvXlxcLysvLFwiL1wiKSkpfSksdC5oYXNMaXN0ZW5lckF0dGFjaGVkPSEwKX0pfSxnZW5lcmF0ZTpmdW5jdGlvbihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sbj10aGlzLl9yb3V0ZXMucmVkdWNlKGZ1bmN0aW9uKG4sbyl7dmFyIGk7aWYoby5uYW1lPT09ZSlmb3IoaSBpbiBuPW8ucm91dGUsdCluPW4udG9TdHJpbmcoKS5yZXBsYWNlKFwiOlwiK2ksdFtpXSk7cmV0dXJuIG59LFwiXCIpO3JldHVybiB0aGlzLl91c2VIYXNoP3RoaXMuX2hhc2grbjpufSxsaW5rOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9nZXRSb290KCkrZX0scGF1c2U6ZnVuY3Rpb24oKXt2YXIgZT0hKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKXx8YXJndW1lbnRzWzBdO3RoaXMuX3BhdXNlZD1lLHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9ZT9cInJlcGxhY2VTdGF0ZVwiOlwicHVzaFN0YXRlXCJ9LHJlc3VtZTpmdW5jdGlvbigpe3RoaXMucGF1c2UoITEpfSxoaXN0b3J5QVBJVXBkYXRlTWV0aG9kOmZ1bmN0aW9uKGUpe3JldHVybiB2b2lkIDA9PT1lP3RoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q6KHRoaXMuX2hpc3RvcnlBUElVcGRhdGVNZXRob2Q9ZSxlKX0sZGlzYWJsZUlmQVBJTm90QXZhaWxhYmxlOmZ1bmN0aW9uKCl7dCgpfHx0aGlzLmRlc3Ryb3koKX0sbGFzdFJvdXRlUmVzb2x2ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fbGFzdFJvdXRlUmVzb2x2ZWR9LGdldExpbmtQYXRoOmZ1bmN0aW9uKGUpe3JldHVybiBlLmdldEF0dHJpYnV0ZShcImhyZWZcIil9LGhvb2tzOmZ1bmN0aW9uKGUpe3RoaXMuX2dlbmVyaWNIb29rcz1lfSxfYWRkOmZ1bmN0aW9uKHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpudWxsLG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOm51bGw7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PWVuY29kZVVSSSh0KSksdGhpcy5fcm91dGVzLnB1c2goXCJvYmplY3RcIj09PSh2b2lkIDA9PT1uP1widW5kZWZpbmVkXCI6ZShuKSk/e3JvdXRlOnQsaGFuZGxlcjpuLnVzZXMsbmFtZTpuLmFzLGhvb2tzOm98fG4uaG9va3N9Ontyb3V0ZTp0LGhhbmRsZXI6bixob29rczpvfSksdGhpcy5fYWRkfSxfZ2V0Um9vdDpmdW5jdGlvbigpe3JldHVybiBudWxsIT09dGhpcy5yb290P3RoaXMucm9vdDoodGhpcy5yb290PWEodGhpcy5fY0xvYygpLnNwbGl0KFwiP1wiKVswXSx0aGlzLl9yb3V0ZXMpLHRoaXMucm9vdCl9LF9saXN0ZW46ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKHRoaXMuX3VzZVB1c2hTdGF0ZSl3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsdGhpcy5fb25Mb2NhdGlvbkNoYW5nZSk7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZcIm9uaGFzaGNoYW5nZVwiaW4gd2luZG93KXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLHRoaXMuX29uTG9jYXRpb25DaGFuZ2UpO2Vsc2V7dmFyIHQ9dGhpcy5fY0xvYygpLG49dm9pZCAwLG89dm9pZCAwOyhvPWZ1bmN0aW9uKCl7bj1lLl9jTG9jKCksdCE9PW4mJih0PW4sZS5yZXNvbHZlKCkpLGUuX2xpc3RlbmluZ0ludGVydmFsPXNldFRpbWVvdXQobywyMDApfSkoKX19LF9jTG9jOmZ1bmN0aW9uKCl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz92b2lkIDAhPT13aW5kb3cuX19OQVZJR09fV0lORE9XX0xPQ0FUSU9OX01PQ0tfXz93aW5kb3cuX19OQVZJR09fV0lORE9XX0xPQ0FUSU9OX01PQ0tfXzpvKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTpcIlwifSxfZmluZExpbmtzOmZ1bmN0aW9uKCl7cmV0dXJuW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtbmF2aWdvXVwiKSl9LF9vbkxvY2F0aW9uQ2hhbmdlOmZ1bmN0aW9uKCl7dGhpcy5yZXNvbHZlKCl9LF9jYWxsTGVhdmU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9sYXN0Um91dGVSZXNvbHZlZDtlJiZlLmhvb2tzJiZlLmhvb2tzLmxlYXZlJiZlLmhvb2tzLmxlYXZlKGUucGFyYW1zKX19LG4uUEFSQU1FVEVSX1JFR0VYUD0vKFs6Kl0pKFxcdyspL2csbi5XSUxEQ0FSRF9SRUdFWFA9L1xcKi9nLG4uUkVQTEFDRV9WQVJJQUJMRV9SRUdFWFA9XCIoW14vXSspXCIsbi5SRVBMQUNFX1dJTERDQVJEPVwiKD86LiopXCIsbi5GT0xMT1dFRF9CWV9TTEFTSF9SRUdFWFA9XCIoPzovJHwkKVwiLG4uTUFUQ0hfUkVHRVhQX0ZMQUdTPVwiXCIsbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmF2aWdvLm1pbi5qcy5tYXBcbiIsImZ1bmN0aW9uICRpZChpZCkge1xuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xufVxuXG5mdW5jdGlvbiBsb2FkSFRNTCh1cmwsIGlkLCB2aWV3KSB7XG4gIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXEub3BlbignR0VUJywgdXJsKTtcbiAgcmVxLnNlbmQoKTtcbiAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29sb3I7XG5cbiAgIHN3aXRjaCAodmlldykge1xuICAgICAgY2FzZSBcImhvbWVcIjpcbiAgICAgICAgIGNvbG9yID0gXCIjZWI1NjAwN2VcIjtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlc2lnblwiOlxuICAgICAgICAgY29sb3IgPSBcInJnYig3NiwgMjE3LCAxMDApXCI7XG4gICAgICBicmVhaztcbiAgIH1cblxuICAgIHZhciBuYXZiYXIgPSBgXG4gICAgPG5hdiBjbGFzcz1cIm5hdiBzdHJva2VFZmZlY3RcIiBzdHlsZT1cImJhY2tncm91bmQ6JHtjb2xvcn1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJuYXYtaGVhZGVyXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWhlYWRlci10aXRsZVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nLzExQXJ0X1doaXRlLnBuZ1wiIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI4MFwiIGFsdD1cIlwiPiA8L2E+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm5hdi1tb2JpbGVCdG5cIj5cbiAgICAgICAgIDxsYWJlbCBmb3I9XCJuYXYtbW9iaWxlQnRuVG9vZ2xlXCI+XG4gICAgICAgICAgICA8cCBjbGFzcz1cIm5hdi1tb2JpbGVCdG4tdG9vZ2xlVGV4dFwiPk1lbnU8L3A+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJuYXYtbW9iaWxlQnRuVG9vZ2xlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzXCI+XG4gICAgICAgICA8aW1nIGNsYXNzPVwibmF2LWxpbmtzLWxvZ29cIiBzcmM9XCJpbWcvMTFBcnRfV2hpdGUucG5nXCIgd2lkdGg9XCI1MFwiIGhlaWdodD1cIjgwXCIgYWx0PVwiXCI+XG4gICAgICAgICA8ZGl2IGNsYXNzPVwibmF2LWxpbmtzLWJ0bkZlY2hhclwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm5hdi1tb2JpbGVCdG5Ub29nbGVcIj5GZWNoYXIgWDwvbGFiZWw+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgICAgIDxocj5cbiAgICAgICAgIDxhIGhyZWY9XCIjIWhvbWVcIj5IT01FPC9hPlxuICAgICAgICAgPGEgaHJlZj1cIiMhc2Vydmljb3NcIj5TRVJWScOHT1M8L2E+XG4gICAgICAgICA8YSBocmVmPVwiIyFwb3J0Zm9saW9cIj5QT1JURk9MSU88L2E+XG4gICAgICAgICA8YSBocmVmPVwiIyFzb2JyZW5vc1wiPlNPQlJFIE7Dk1M8L2E+XG4gICAgICAgICA8YSBjbGFzcz1cIm10bi00XCIgaHJlZj1cIiMhY29udGF0b1wiPkNPTlRBVE88L2E+XG4gICAgICA8L2Rpdj5cbiAgIDwvbmF2PmA7XG5cbiAgICRpZChpZCkuaW5uZXJIVE1MID0gbmF2YmFyICsgcmVxLnJlc3BvbnNlVGV4dDtcbiAgfTtcbn1cblxuLy8gdXNlICMhIHRvIGhhc2hcbnJvdXRlciA9IG5ldyBOYXZpZ28obnVsbCwgdHJ1ZSwgJyMhJyk7XG5yb3V0ZXIub24oe1xuICAvLyAndmlldycgaXMgdGhlIGlkIG9mIHRoZSBkaXYgZWxlbWVudCBpbnNpZGUgd2hpY2ggd2UgcmVuZGVyIHRoZSBIVE1MXG4gICdob21lJzogZnVuY3Rpb24gaG9tZSgpIHtcbiAgIGxvYWRIVE1MKCcuLi9ob21lLmh0bWwnLCAndmlldycsIFwiaG9tZVwiKTtcbiAgfSxcbiAgJ2Rlc2lnbic6IGZ1bmN0aW9uIGRlc2lnbigpIHtcbiAgIGxvYWRIVE1MKCcuLi9kZXNpZ24uaHRtbCcsICd2aWV3JywgXCJkZXNpZ25cIik7XG4gIH1cbn0pO1xuXG4vLyBzZXQgdGhlIGRlZmF1bHQgcm91dGVcbnJvdXRlci5vbihmdW5jdGlvbiAoKSB7XG4gICRpZCgndmlldycpLmlubmVySFRNTCA9IGxvYWRIVE1MKCcuLi9ob21lLmh0bWwnLCAndmlldycsIFwiaG9tZVwiKTtcbn0pO1xuXG4vLyBzZXQgdGhlIDQwNCByb3V0ZVxucm91dGVyLm5vdEZvdW5kKGZ1bmN0aW9uIChxdWVyeSkge1xuICAkaWQoJ3ZpZXcnKS5pbm5lckhUTUwgPSAnPGgxPk5PVEZPVU5EPC9oMT4nO1xufSk7XG5cbnJvdXRlci5yZXNvbHZlKCk7IiwiXHJcbiAgIHZhciBpbml0UGhvdG9Td2lwZUZyb21ET00gPSBmdW5jdGlvbihnYWxsZXJ5U2VsZWN0b3IpIHtcclxuXHJcbiAgICAgIC8vIHBhcnNlIHNsaWRlIGRhdGEgKHVybCwgdGl0bGUsIHNpemUgLi4uKSBmcm9tIERPTSBlbGVtZW50cyBcclxuICAgICAgLy8gKGNoaWxkcmVuIG9mIGdhbGxlcnlTZWxlY3RvcilcclxuICAgICAgdmFyIHBhcnNlVGh1bWJuYWlsRWxlbWVudHMgPSBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICB2YXIgdGh1bWJFbGVtZW50cyA9IGVsLmNoaWxkTm9kZXMsXHJcbiAgICAgICAgICAgIG51bU5vZGVzID0gdGh1bWJFbGVtZW50cy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGl0ZW1zID0gW10sXHJcbiAgICAgICAgICAgIGZpZ3VyZUVsLFxyXG4gICAgICAgICAgICBsaW5rRWwsXHJcbiAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgIGl0ZW07XHJcblxyXG4gICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbnVtTm9kZXM7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZmlndXJlRWwgPSB0aHVtYkVsZW1lbnRzW2ldOyAvLyA8ZmlndXJlPiBlbGVtZW50XHJcblxyXG4gICAgICAgICAgICAvLyBpbmNsdWRlIG9ubHkgZWxlbWVudCBub2RlcyBcclxuICAgICAgICAgICAgaWYoZmlndXJlRWwubm9kZVR5cGUgIT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpbmtFbCA9IGZpZ3VyZUVsLmNoaWxkcmVuWzBdOyAvLyA8YT4gZWxlbWVudFxyXG5cclxuICAgICAgICAgICAgc2l6ZSA9IGxpbmtFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2l6ZScpLnNwbGl0KCd4Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgc2xpZGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgIHNyYzogbGlua0VsLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxyXG4gICAgICAgICAgICAgICAgICB3OiBwYXJzZUludChzaXplWzBdLCAxMCksXHJcbiAgICAgICAgICAgICAgICAgIGg6IHBhcnNlSW50KHNpemVbMV0sIDEwKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZihmaWd1cmVFbC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIDxmaWdjYXB0aW9uPiBjb250ZW50XHJcbiAgICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBmaWd1cmVFbC5jaGlsZHJlblsxXS5pbm5lckhUTUw7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihsaW5rRWwuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAvLyA8aW1nPiB0aHVtYm5haWwgZWxlbWVudCwgcmV0cmlldmluZyB0aHVtYm5haWwgdXJsXHJcbiAgICAgICAgICAgICAgICAgIGl0ZW0ubXNyYyA9IGxpbmtFbC5jaGlsZHJlblswXS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgaXRlbS5lbCA9IGZpZ3VyZUVsOyAvLyBzYXZlIGxpbmsgdG8gZWxlbWVudCBmb3IgZ2V0VGh1bWJCb3VuZHNGblxyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBmaW5kIG5lYXJlc3QgcGFyZW50IGVsZW1lbnRcclxuICAgICAgdmFyIGNsb3Nlc3QgPSBmdW5jdGlvbiBjbG9zZXN0KGVsLCBmbikge1xyXG4gICAgICAgICByZXR1cm4gZWwgJiYgKCBmbihlbCkgPyBlbCA6IGNsb3Nlc3QoZWwucGFyZW50Tm9kZSwgZm4pICk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyB0cmlnZ2VycyB3aGVuIHVzZXIgY2xpY2tzIG9uIHRodW1ibmFpbFxyXG4gICAgICB2YXIgb25UaHVtYm5haWxzQ2xpY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCA/IGUucHJldmVudERlZmF1bHQoKSA6IGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgIHZhciBlVGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cclxuICAgICAgICAgLy8gZmluZCByb290IGVsZW1lbnQgb2Ygc2xpZGVcclxuICAgICAgICAgdmFyIGNsaWNrZWRMaXN0SXRlbSA9IGNsb3Nlc3QoZVRhcmdldCwgZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChlbC50YWdOYW1lICYmIGVsLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0ZJR1VSRScpO1xyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIGlmKCFjbGlja2VkTGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBmaW5kIGluZGV4IG9mIGNsaWNrZWQgaXRlbSBieSBsb29waW5nIHRocm91Z2ggYWxsIGNoaWxkIG5vZGVzXHJcbiAgICAgICAgIC8vIGFsdGVybmF0aXZlbHksIHlvdSBtYXkgZGVmaW5lIGluZGV4IHZpYSBkYXRhLSBhdHRyaWJ1dGVcclxuICAgICAgICAgdmFyIGNsaWNrZWRHYWxsZXJ5ID0gY2xpY2tlZExpc3RJdGVtLnBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgIGNoaWxkTm9kZXMgPSBjbGlja2VkTGlzdEl0ZW0ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLFxyXG4gICAgICAgICAgICBudW1DaGlsZE5vZGVzID0gY2hpbGROb2Rlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIG5vZGVJbmRleCA9IDAsXHJcbiAgICAgICAgICAgIGluZGV4O1xyXG5cclxuICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1DaGlsZE5vZGVzOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSAhPT0gMSkgeyBcclxuICAgICAgICAgICAgICAgICAgY29udGludWU7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihjaGlsZE5vZGVzW2ldID09PSBjbGlja2VkTGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgaW5kZXggPSBub2RlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGVJbmRleCsrO1xyXG4gICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgIGlmKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgLy8gb3BlbiBQaG90b1N3aXBlIGlmIHZhbGlkIGluZGV4IGZvdW5kXHJcbiAgICAgICAgICAgIG9wZW5QaG90b1N3aXBlKCBpbmRleCwgY2xpY2tlZEdhbGxlcnkgKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBwYXJzZSBwaWN0dXJlIGluZGV4IGFuZCBnYWxsZXJ5IGluZGV4IGZyb20gVVJMICgjJnBpZD0xJmdpZD0yKVxyXG4gICAgICB2YXIgcGhvdG9zd2lwZVBhcnNlSGFzaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSxcclxuICAgICAgICAgcGFyYW1zID0ge307XHJcblxyXG4gICAgICAgICBpZihoYXNoLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgdmFyIHZhcnMgPSBoYXNoLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZighdmFyc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTsgIFxyXG4gICAgICAgICAgICBpZihwYWlyLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICBwYXJhbXNbcGFpclswXV0gPSBwYWlyWzFdO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZihwYXJhbXMuZ2lkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5naWQgPSBwYXJzZUludChwYXJhbXMuZ2lkLCAxMCk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgb3BlblBob3RvU3dpcGUgPSBmdW5jdGlvbihpbmRleCwgZ2FsbGVyeUVsZW1lbnQsIGRpc2FibGVBbmltYXRpb24sIGZyb21VUkwpIHtcclxuICAgICAgICAgdmFyIHBzd3BFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBzd3AnKVswXSxcclxuICAgICAgICAgICAgZ2FsbGVyeSxcclxuICAgICAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICAgICAgaXRlbXM7XHJcblxyXG4gICAgICAgICBpdGVtcyA9IHBhcnNlVGh1bWJuYWlsRWxlbWVudHMoZ2FsbGVyeUVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgLy8gZGVmaW5lIG9wdGlvbnMgKGlmIG5lZWRlZClcclxuICAgICAgICAgb3B0aW9ucyA9IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBnYWxsZXJ5IGluZGV4IChmb3IgVVJMKVxyXG4gICAgICAgICAgICBnYWxsZXJ5VUlEOiBnYWxsZXJ5RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHN3cC11aWQnKSxcclxuXHJcbiAgICAgICAgICAgIGdldFRodW1iQm91bmRzRm46IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFNlZSBPcHRpb25zIC0+IGdldFRodW1iQm91bmRzRm4gc2VjdGlvbiBvZiBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGluZm9cclxuICAgICAgICAgICAgICAgICAgdmFyIHRodW1ibmFpbCA9IGl0ZW1zW2luZGV4XS5lbC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0sIC8vIGZpbmQgdGh1bWJuYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgIHBhZ2VZU2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgIHJlY3QgPSB0aHVtYm5haWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHt4OnJlY3QubGVmdCwgeTpyZWN0LnRvcCArIHBhZ2VZU2Nyb2xsLCB3OnJlY3Qud2lkdGh9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICB9O1xyXG5cclxuICAgICAgICAgLy8gUGhvdG9Td2lwZSBvcGVuZWQgZnJvbSBVUkxcclxuICAgICAgICAgaWYoZnJvbVVSTCkge1xyXG4gICAgICAgICAgICBpZihvcHRpb25zLmdhbGxlcnlQSURzKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIHBhcnNlIHJlYWwgaW5kZXggd2hlbiBjdXN0b20gUElEcyBhcmUgdXNlZCBcclxuICAgICAgICAgICAgICAgICAgLy8gaHR0cDovL3Bob3Rvc3dpcGUuY29tL2RvY3VtZW50YXRpb24vZmFxLmh0bWwjY3VzdG9tLXBpZC1pbi11cmxcclxuICAgICAgICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGl0ZW1zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW1zW2pdLnBpZCA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmluZGV4ID0gajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAvLyBpbiBVUkwgaW5kZXhlcyBzdGFydCBmcm9tIDFcclxuICAgICAgICAgICAgICAgICAgb3B0aW9ucy5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCkgLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBleGl0IGlmIGluZGV4IG5vdCBmb3VuZFxyXG4gICAgICAgICBpZiggaXNOYU4ob3B0aW9ucy5pbmRleCkgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYoZGlzYWJsZUFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICBvcHRpb25zLnNob3dBbmltYXRpb25EdXJhdGlvbiA9IDA7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8vIFBhc3MgZGF0YSB0byBQaG90b1N3aXBlIGFuZCBpbml0aWFsaXplIGl0XHJcbiAgICAgICAgIGdhbGxlcnkgPSBuZXcgUGhvdG9Td2lwZSggcHN3cEVsZW1lbnQsIFBob3RvU3dpcGVVSV9EZWZhdWx0LCBpdGVtcywgb3B0aW9ucyk7XHJcbiAgICAgICAgIGdhbGxlcnkuaW5pdCgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBnYWxsZXJ5IGVsZW1lbnRzIGFuZCBiaW5kIGV2ZW50c1xyXG4gICAgICB2YXIgZ2FsbGVyeUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggZ2FsbGVyeVNlbGVjdG9yICk7XHJcblxyXG4gICAgICBmb3IodmFyIGkgPSAwLCBsID0gZ2FsbGVyeUVsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICBnYWxsZXJ5RWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKCdkYXRhLXBzd3AtdWlkJywgaSsxKTtcclxuICAgICAgICAgZ2FsbGVyeUVsZW1lbnRzW2ldLm9uY2xpY2sgPSBvblRodW1ibmFpbHNDbGljaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUGFyc2UgVVJMIGFuZCBvcGVuIGdhbGxlcnkgaWYgaXQgY29udGFpbnMgIyZwaWQ9MyZnaWQ9MVxyXG4gICAgICB2YXIgaGFzaERhdGEgPSBwaG90b3N3aXBlUGFyc2VIYXNoKCk7XHJcbiAgICAgIGlmKGhhc2hEYXRhLnBpZCAmJiBoYXNoRGF0YS5naWQpIHtcclxuICAgICAgICAgb3BlblBob3RvU3dpcGUoIGhhc2hEYXRhLnBpZCAsICBnYWxsZXJ5RWxlbWVudHNbIGhhc2hEYXRhLmdpZCAtIDEgXSwgdHJ1ZSwgdHJ1ZSApO1xyXG4gICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAvLyBzY3JvbGwgc3VhdmVcclxuICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsKGxvY2F0aW9uKXtcclxuICAgICAgaWYobG9jYXRpb24pe1xyXG4gICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGxvY2F0aW9uKTtcclxuICAgICAgICAgY29udGFpbmVyLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwic3RhcnRcIiwgaW5saW5lOiBcIm5lYXJlc3RcIn0pO1xyXG4gICAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKFwiVmFyacOhdmVsICdsb2NhdGlvbicgbsOjbyBwYXNzYWRhIG5vIGV2ZW50byBkZSAnY2xpY2snXCIpO1xyXG4gICB9XHJcblxyXG4gICAvLyBpbml0IHNjcm9sbCByZXZlYWxcclxuXHJcbiAgIHdpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpO1xyXG4gICBzci5yZXZlYWwoJy5hbmltYXRlZCcsIHtkdXJhdGlvbjogMTUwMH0pO1xyXG4gICBzci5yZXZlYWwoJy5jb21vRnVuY2lvbmEnLCB7ZHVyYXRpb246IDEwMDB9LCA1MDApO1xyXG5cclxuICAgLy8gaW5pdCBnYWxlcmlhXHJcbiAgIGluaXRQaG90b1N3aXBlRnJvbURPTSgnLmdhbGxlcnknKTsiXX0=
