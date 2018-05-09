function getVamosConversar(view) {
   var viewColor = getViewColor(view);
   if (viewColor == "#fb8c00")
      viewColor = "11art";
   else
      viewColor = view;

   if (view != 'home')
      return `
   <div class="row animation-default">
      <div class="col-md-12 pb-8">
         <article class="boxVamosConversar">
            <div class="text-center">
               <h2 class="boxVamosConversar-title">Vamos
                  <span class="text-mark text-mark-${viewColor}">Conversar?</span> ;)</h2>
            </div>
            <form class="boxVamosConversar-form" role="form">
               <div class="col-lg-offset-1 col-lg-3 col-md-5 text-center">
                  <img class="boxVamosConversar-img mb-7" src="./img/postbox.svg">
               </div>
               <div class="col-lg-7 col-md-7 col-xs-12">
                  <div class="formControl">
                     <label class="formControl-label">Nome</label>
                     <input required class="formControl-input formControl-input-${viewColor}" placeholder="Ex: Joãozinho" />
                  </div>
                  <div class="formControl">
                     <label class="formControl-label">Email</label>
                     <input required type="email" class="formControl-input formControl-input-${viewColor}" placeholder="seuemail@email.com" />
                  </div>
                  <div class="formControl">
                     <label class="formControl-label">Mensagem</label>
                     <textarea rows="3" required class="formControl-input formControl-input-${viewColor}" placeholder="(00) 00000-0000"></textarea>
                  </div>
                  <button class="boxVamosConversar-form-btnEnviar btn btn-fill-${viewColor}" type="button">Enviar</button>
                  <button class="boxVamosConversar-form-btnEnviar btn btn-outline-reset" type="reset">Limpar</button>
               </div>
            </form>
         </article>
      </div>
   </div>`;
   else
      return '';
}