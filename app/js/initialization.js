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

function initView(view, type){
   if(type == "home"){
      return {
         navbar: getNavBar(view),
         main: getHome()
      };
   } else {

      var vamosConversar = '', 
         nossosTrabalhos = '',
         comoFunciona = '',
         footer = '',
         modulo = '',
         portfolio = '',
         servicos = '',
         sobrenos = '',
         contato = '',
         navbar = '';

      navbar = getNavBar(view);
      comoFunciona = getComoFunciona(view);
      nossosTrabalhos = getNossosTrabalhos(view);
      vamosConversar = getVamosConversar(view);
      footer = getFooter(view);

      if(type == "modulos")
         modulo = getModuloView(view);

      if(type == "menu") {
         portfolio = getPortfolio(view);
         servicos = getServicos(view);
         sobrenos = getSobrenos(view);
         contato = getContato(view);
      }

      return {
         navbar: navbar,
         main: modulo + portfolio + servicos + sobrenos + contato + comoFunciona + nossosTrabalhos + vamosConversar + footer
      };
   }
}