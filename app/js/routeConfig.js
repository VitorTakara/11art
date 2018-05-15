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