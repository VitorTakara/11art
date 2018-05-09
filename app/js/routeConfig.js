function loadHTML(url, view) {
  fetch(url)
   .then(function(response) { return response.text(); })
   .then(function(data){
      var navbar = getNavBar(view);
      var vamosConversar = getVamosConversar(view);
      var footer = getFooter(view);

      document.getElementById("view").innerHTML = navbar + data + vamosConversar + footer; // Insere no HTML

      initComponents(); // Iniciar Galeria e Animações suaves
      smoothScroll("view"); // Vá para o topo
      view == "home" ? initParticulasBG() : destroyParticulasBG(); // Constrói/Destrói particulas baseado se é "home" ou não
      if (view == "portfolio") document.getElementById("11art").click(); // Clica no "Todos" se for a tela de portfolio
   })
   .catch(function(data) {
      throw new Error(`Erro no Fetch: ${data}`)
   });
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
   $id('view').innerHTML = loadHTML('./home.html', 'view', "home");
});

// set the 404 route
router.notFound(function (query) {
   $id('view').innerHTML = '<h1>TODO - NOTFOUND</h1>';
});

router.resolve();