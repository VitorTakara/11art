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