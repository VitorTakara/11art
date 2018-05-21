function loadHTML(view, type) {
   document.body.style.backgroundImage = "";
   var containers = initView(view, type); // Pega os containers

   // Insere no HTML
   document.getElementById("navbar").innerHTML = containers.navbar;
   document.getElementById("main").innerHTML = containers.main;

   initComponents(); // Iniciar Galeria e Animações suaves
   smoothScroll("navbar"); // Vá para o topo
   if (view == "home") initParticulasBG(); else destroyParticulasBG(); // Constrói/Destrói particulas baseado se é "home" ou não
   if (view == "portfolio") document.getElementById("11art").click(); // Clica no "Todos" se for a tela de portfolio
}
// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
   'home': function(){ loadHTML("home", "home"); },
   'design': function(){ loadHTML("design", "modulos"); },
   '3d': function(){ loadHTML("3d", "modulos"); },
   'web': function(){ loadHTML("web", "modulos"); },
   'video': function(){ loadHTML("video", "modulos"); },
   'sobrenos': function(){ loadHTML("sobrenos", "menu"); },
   'contato': function(){ loadHTML("contato", "menu"); },
   'portfolio': function(){ loadHTML("portfolio", "menu"); },
   'servicos': function(){ loadHTML("servicos", "menu"); }
});

// set the default route
router.on(function () {
   loadHTML("home", "home");
});

// set the 404 route
router.notFound(function (query) {
   document.getElementById('main').innerHTML = '<h1>TODO - NOTFOUND</h1>';
});

router.resolve();