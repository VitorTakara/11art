function $id(id) {
   return document.getElementById(id);
}

function loadHTML(url, id, view) {
   req = new XMLHttpRequest();
   req.open('GET', url);
   req.send();
   req.onload = function () {
      var navbar = getNavBar(view);
      var footer = getFooter(view);

      $id(id).innerHTML = navbar + req.responseText + footer; // Insere no HTML
      initComponents(); // Iniciar Galeria e Animações suaves
      smoothScroll("view"); // Vá para o topo
      view == "home" ? initParticulasBG() : destroyParticulasBG(); // Constrói/Destrói particulas baseado na view
      if (view == "portfolio") document.getElementById("11art").click(); // Clica no "Todos" na tela de portfolio
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
   },
   '3d': function design() {
      loadHTML('./3d.html', 'view', "3d");
   },
   'web': function design() {
      loadHTML('./web.html', 'view', "web");
   },
   'video': function design() {
      loadHTML('./video.html', 'view', "video");
   },
   'sobrenos': function design() {
      loadHTML('./sobrenos.html', 'view', "sobrenos");
   },
   'contato': function design() {
      loadHTML('./contato.html', 'view', "contato");
   },
   'portfolio': function design() {
      loadHTML('./portfolio.html', 'view', "portfolio");
   },
   'servicos': function design() {
      loadHTML('./servicos.html', 'view', "servicos");
   },
});

// set the default route
router.on(function () {
   $id('view').innerHTML = loadHTML('./home.html', 'view', "home");
});

// set the 404 route
router.notFound(function (query) {
   $id('view').innerHTML = '<h1>TODO - NOTFOUND</h1>';
});

router.resolve();


function getNavBar(view) {
   var navBar_color;

   switch (view) {
      case "home":
         navBar_color = "#fb8c00ba";
         break;
      case "web":
         navBar_color = "rgb(0, 122, 250)";
         break;
      case "3d":
         navBar_color = "rgb(88, 86, 214)";
         break;
      case "video":
         navBar_color = "rgb(255, 59, 48)";
         break;
      case "design":
         navBar_color = "rgb(76, 217, 100)";
         break;
      default:
         navBar_color = "#fb8c00";
         break;
   }

   return `
      <nav class="nav strokeEffect" style="background:${navBar_color}">
      <div class="nav-header">
         <div class="nav-header-title">
            <a href="#">
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
         <hr>
         <a href="#!home">HOME</a>
         <a href="#!servicos">SERVIÇOS</a>
         <a href="#!portfolio">PORTFOLIO</a>
         <a href="#!sobrenos">SOBRE NÓS</a>
         <a class="mtn-4" href="#!contato">CONTATO</a>
      </div>
      </nav>
   `;
};

function getFooter(view){
   if(view != 'home')
      return `
      <div class="container">
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
         </footer>
      </div>`;
   else
      return '';
};