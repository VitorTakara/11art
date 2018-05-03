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