function $id(id) {
   return document.getElementById(id);
}

function loadHTML(url, id, view) {
   req = new XMLHttpRequest();
   req.open('GET', url);
   req.send();
   req.onload = function () {
      var navbar = getNavBar(view);
      var vamosConversar = getVamosConversar(view);
      var footer = getFooter(view);

      $id(id).innerHTML = navbar + req.responseText + vamosConversar + footer; // Insere no HTML
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

function getVamosConversar(view){
   if(view != 'home')
      return `
   <div class="row animation-default">
      <div class="col-md-12 pb-8">
         <article class="boxVamosConversar">
            <div class="text-center">
               <h2 class="boxVamosConversar-title">Vamos
                  <span class="text-mark text-mark-${view}">Conversar?</span> ;)</h2>
            </div>
            <form class="boxVamosConversar-form" role="form">
               <div class="col-lg-offset-1 col-lg-3 col-md-5 text-center">
                  <img class="boxVamosConversar-img mb-7" src="./img/postbox.svg">
               </div>
               <div class="col-lg-7 col-md-7 col-xs-12">
                  <div class="formControl">
                     <label class="formControl-label">Nome</label>
                     <input required class="formControl-input formControl-input-${view}" placeholder="Ex: Joãozinho" />
                  </div>
                  <div class="formControl">
                     <label class="formControl-label">Email</label>
                     <input required type="email" class="formControl-input formControl-input-${view}" placeholder="seuemail@email.com" />
                  </div>
                  <div class="formControl">
                     <label class="formControl-label">Mensagem</label>
                     <textarea rows="3" required class="formControl-input formControl-input-${view}" placeholder="(00) 00000-0000"></textarea>
                  </div>
                  <button class="boxVamosConversar-form-btnEnviar btn btn-fill-${view}" type="button">Enviar</button>
                  <button class="boxVamosConversar-form-btnEnviar btn btn-outline-reset" type="reset">Limpar</button>
               </div>
            </form>
         </article>
      </div>
   </div>`;
   else 
      return '';
}

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

function getViewColor(view){
   if(view == "home")
      return "#fb8c00ba";
   else if(view == "web")
      return "rgb(0, 122, 250)";
   else if(view == "video")
      return "rgb(255, 59, 48)";
   else if(view == "3d")
      return "rgb(88, 86, 214)";
   else if(view == "design")
      return "rgb(76, 217, 100)";
   else
      return "#fb8c00";
}