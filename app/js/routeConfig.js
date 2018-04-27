// getElementById wrapper
function $id(id) {
  return document.getElementById(id);
}

// asyncrhonously fetch the html template partial from the file directory,
// then set its contents to the html of the parent element
function loadHTML(url, id) {
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = function () {
    $id(id).innerHTML = req.responseText;
  };
}

// use #! to hash
router = new Navigo(null, true, '#!');
router.on({
  // 'view' is the id of the div element inside which we render the HTML
  'home': function home() {
   loadHTML('https://vitortkr.github.io/11art/dist/home.html', 'view');
   loadHTML('https://vitortkr.github.io/11art/dist/design.html', 'view');
  }
});

// set the default route
router.on(function () {
  $id('view').innerHTML = '<h5></h5>';
});

// set the 404 route
router.notFound(function (query) {
  $id('view').innerHTML = '<h1></h1>';
});

router.resolve();