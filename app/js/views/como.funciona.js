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
               <h2 class="boxComoFunciona-title animation-default pb-8">Como funciona? <span class="text-mark text-mark-${viewClass}">É bem simples!</span></h2>
            </div>

            <div class="col-lg-3 col-md-4 boxComoFunciona-ml animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-smile-o"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">1 - Conta pra gente!</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">Primeiro você vai dizer do que precisa! Banner, cartão, facebook, panfleto (...)</p>   
               </div>
            </div>

            <div class="col-lg-3 col-md-4 animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-pencil"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">2 - Primeiro esboço</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">Vamos preparar e apresentar um esboço do que planejamos fazer, <span class="fw-700">sem pagamento inicial.</span></p>   
               </div>
            </div>

            <div class="col-lg-3 col-md-4 animation-comoFunciona">
               <div class="boxComoFunciona-circle boxComoFunciona-circle-${viewClass}">
                  <i class="boxComoFunciona-circle-${viewClass}-img fa fa-5x fa-star-o"></i>
               </div>
               <div class="boxComoFunciona-description">
                  <h4 class="boxComoFunciona-description-title mb-0">3 - Aprovado!</h4>
                  <p class="boxComoFunciona-description-subtitle mt-0">Com o esboço aprovado, iremos dar continuidade ao projeto ....... </p>   
               </div>
            </div>
         </article>
         </div>
      </div>`;
   }
   else
      return '';
};