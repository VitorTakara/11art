function getVamosConversar(view) {
   var viewColor = getViewColor(view);
   if (viewColor == "#fb8c00")
      viewColor = "11art";
   else
      viewColor = view;

      return `
      <hr id="container_vamosConversar">  <!-- Anchor -->
      <div class="row animation-default">
         <div class="col-md-12 pb-8">
            <article class="boxVamosConversar">
               <div class="text-center">
                  <h2 class="boxVamosConversar-title">${global.vamos_conversar.title[0]} <span class="text-mark text-mark-${viewColor}">${global.vamos_conversar.title[1]}</span> ${global.vamos_conversar.title[2]}</h2>
               </div>
               <form class="boxVamosConversar-form" role="form">
                  <div class="col-lg-offset-1 col-lg-3 col-md-5 text-center">
                     <img class="boxVamosConversar-img mb-7" src="./img/postbox.svg" alt="Imagem de uma caixa de correios e ao lado um formulário para enviar uma mensagem para nossa equipe, a 11art">
                  </div>
                  <div class="col-lg-7 col-md-7 col-xs-12">
                     <div class="formControl">
                        <label class="formControl-label">${global.vamos_conversar.form.input_nome}</label>
                        <input required class="formControl-input formControl-input-${viewColor}" placeholder="${global.vamos_conversar.form.placeholder_nome}" />
                     </div>
                     <div class="formControl">
                        <label class="formControl-label">${global.vamos_conversar.form.input_email}</label>
                        <input required type="email" class="formControl-input formControl-input-${viewColor}" placeholder="${global.vamos_conversar.form.placeholder_email}" />
                     </div>
                     <div class="formControl">
                        <label class="formControl-label">${global.vamos_conversar.form.input_mensagem}</label>
                        <textarea rows="3" required class="formControl-input formControl-input-${viewColor}" placeholder="${global.vamos_conversar.form.placeholder_mensagem}"></textarea>
                     </div>
                     <button class="boxVamosConversar-form-btnEnviar btn btn-fill-${viewColor}" type="button">${global.vamos_conversar.form.btn_enviar}</button>
                     <button class="boxVamosConversar-form-btnEnviar btn btn-outline-reset" type="reset">${global.vamos_conversar.form.btn_limpar}</button>
                  </div>
               </form>
            </article>
         </div>
      </div>`;
}