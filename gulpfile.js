/*

GULPFILE 11ART - COMANDOS

1) gulp build - compila o projeto e serve pelo browserSync para o autoreload

*/

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  prefix = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  concat = require("gulp-concat"),
  imagemin = require("gulp-imagemin"),
  browserSync = require("browser-sync"),
  notify = require("gulp-notify"),
  runSequence = require("run-sequence"),
  rigger = require("gulp-rigger"),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify-es').default,
  rimraf = require("rimraf");

// BROWSERSYNC
gulp.task("browser-sync", function() {
  browserSync.init({server: {baseDir: "dist",index:"index.html"}});
  //Vai dar reload na tela a cada mudança que ele encontrar
  gulp.watch("app/**/*").on("change", browserSync.reload);
  gulp.watch("app/*.html", ["html"]);
  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/js/**/*.js", ["js"]);
  gulp.watch("app/img/**/*.*", ["img"]);
});

// HTML
gulp.task("html", function() {
  return gulp.src("app/*.html").pipe(gulp.dest("dist"));
});

// SASS
gulp.task("sass", function() {
  return gulp
    .src(["app/scss/main.scss"])
    .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
    .pipe(prefix(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
    .pipe(cssnano({ zindex: false }))
    .pipe(gulp.dest("dist/css"));
});

// JS

gulp.task("js", function() {
  return gulp
    .src(["app/js/locales/pt-br.js", "app/js/plugins/navigo.min.js", "app/js/plugins/particles.min.js", "app/js/gallery.js", 
    "app/js/smoothScroll.js", "app/js/particles.js", "app/js/initialization.js", "app/js/views/footer.js", 
    "app/js/views/contato.js", "app/js/views/home.js", "app/js/views/portfolio.js", "app/js/views/servicos.js", 
    "app/js/views/sobrenos.js", "app/js/views/navbar.js", "app/js/views/vamos.conversar.js",
    "app/js/views/como.funciona.js", "app/js/views/modulo.js", "app/js/views/nossos.trabalhos.js",
    "app/js/views/viewColor.js", "app/js/routeConfig.js", "app/js/portfolioFiltro.js"])
    //.pipe(sourcemaps.init()) ATIVAR SE QUISER SOURCEMAP
    .pipe(rigger())
    .pipe(concat("main.js"))
    .pipe(uglify(/* options */))
    //.pipe(sourcemaps.write()) ATIVAR SE QUISER SOURCEMAP
    .pipe(gulp.dest("dist/js"));
});

// IMAGES
gulp.task("img", function() {
  return gulp
    .src("app/img/**/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));
});

// CLEAR dist
gulp.task("clear", function(cb) {
  rimraf("./dist", cb);
});

// WATCH
gulp.task("watch", function() {
  gulp.watch("app/*.html", ["html"]);
  gulp.watch("app/scss/**/*.scss", ["sass"]);
  gulp.watch("app/js/**/*.js", ["js"]);
  gulp.watch("app/img/**/*.*", ["img"]);
  console.log(
    "\n\n\n11Art - GulpFile\n(~O3O')~ ASSISTINDO MUDANCAS! (~O3O')~\n\n\n"
  );
});

// BUILD

gulp.task("finish", function() {
  console.log(
    "\n\n\n11Art - GulpFile\n(~‾3‾)~ BUILD FINALIZADO! (~‾3‾)~\n\n\n"
  );
});

gulp.task("build", function() {
  runSequence(
    "clear",
    "html",
    "sass",
    "js",
    "img",
    "browser-sync",
    "finish"
  );
});
