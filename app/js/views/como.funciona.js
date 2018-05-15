function getComoFunciona(view) {
   if (view != 'portfolio' && view != 'sobrenos' && view != 'contato'){
      var viewClass = getViewColor(view);
      if (viewClass == "#fb8c00")
         viewClass = "11art";
      else
         viewClass = view;

      return `
      <hr id="container_comoFunciona">
      <div class="row pb-8 pt-5">
         <div class="col-md-12">
         <article class="boxComoFunciona">
            <div class="text-center">
               <h2 class="boxComoFunciona-title animation-default pb-8">${global.como_funciona.titulo[0]} <span class="text-mark text-mark-${viewClass}">${global.como_funciona.titulo[1]}</span></h2>
            </div>

            <div class="col-lg-3 col-md-4 boxComoFunciona-ml animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-smile-o"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">${global.como_funciona.passo1_titulo}</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">${global.como_funciona.passo1_desc}</p>   
               </div>
            </div>

            <div class="col-lg-3 col-md-4 animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-pencil"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">${global.como_funciona.passo2_titulo}</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">${global.como_funciona.passo2_desc[0]} <span class="fw-700">${global.como_funciona.passo2_desc[1]}</span></p>   
               </div>
            </div>

            <div class="col-lg-3 col-md-4 animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-star-o"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">${global.como_funciona.passo3_titulo}</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">${global.como_funciona.passo3_desc} </p>   
               </div>
            </div>
         </article>
         </div>
      </div>`;
   }
   else
      return '';
};