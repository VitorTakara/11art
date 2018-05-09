// init scroll reveal e galeria
function initComponents() {
   window.sr = ScrollReveal();

   if (document.querySelectorAll('.animation-default').length > 0)
      sr.reveal('.animation-default', {
         duration: 1500
      });
   if (document.querySelectorAll('.animation-comoFunciona').length > 0)
      sr.reveal('.animation-comoFunciona', {
         duration: 1000
      }, 500);
   if (document.querySelectorAll('.animation-modulosServicos').length > 0)
      sr.reveal('.animation-modulosServicos', {
         duration: 1000
      }, 500);

   if (document.querySelectorAll('.gallery').length > 0)
      initPhotoSwipeFromDOM('.gallery');
}