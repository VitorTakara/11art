function getServicos(view){
   if(view == "servicos")
      return `      
      <div class="pageTitle animation-default">
         <h1 class="pageTitle-h1"><span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">${global.nossos_servicos.title}</span></h1>
      </div>
      <article class="row">
            <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
               <div class="panel-left col-md-5 col-lg-3 col-lg-offset-1 col-xs-12 col-sm-12 text-center ">
                  <img class="panel-left-img" src="./img/design_c.svg">
                  <h1 class="panel-left-title mb-0">${global.home.design_titulo}</h1>
               </div>
               <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12">
                  <p class="panel-right-description mt-0">${global.modulos.design_desc}</p>
                  <div class="row">
                     <div class="col-md-12 animation-default">
                        <button class="btn btn-outline-design btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">${global.modulos.btn_como_funciona}</button>
                        <button class="btn btn-outline-design btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">${global.modulos.btn_nossos_trabalhos}</button>
                        <button class="btn btn-fill-design btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">${global.modulos.btn_vamos_conversar}</button>
                     </div>
                  </div>
               </div>
            </div>
         </article>
         <hr>
         <article class="row">
            <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
               <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_max600">
                  <img class="panel-left-img" src="./img/web_c.svg">
                  <h1 class="panel-left-title mb-0">${global.home.web_titulo}</h1>
               </div>
               <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12 col-lg-offset-1">
                  <p class="panel-right-description mt-0">${global.modulos.web_desc}</p>
                  <div class="row">
                     <div class="col-md-12 animation-default">
                        <button class="btn btn-outline-web btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">${global.modulos.btn_como_funciona}</button>
                        <button class="btn btn-outline-web btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">${global.modulos.btn_nossos_trabalhos}</button>
                        <button class="btn btn-fill-web btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">${global.modulos.btn_vamos_conversar}</button>
                     </div>
                  </div>
               </div>
               <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_min600">
                  <img class="panel-left-img" src="./img/web_c.svg">
                  <h1 class="panel-left-title mb-0">${global.home.web_titulo}</h1>
               </div>
            </div>
         </article>
         <hr>
         <article class="row">
            <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
               <div class="panel-left col-md-5 col-lg-3 col-lg-offset-1 col-xs-12 col-sm-12 text-center ">
                  <img class="panel-left-img" src="./img/3d_c.svg">
                  <h1 class="panel-left-title mb-0">${global.home.model3d_titulo}</h1>
               </div>
               <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12">
                  <p class="panel-right-description mt-0">${global.modulos.model3d_desc}</p>
                  <div class="row">
                     <div class="col-md-12 animation-default">
                        <button class="btn btn-outline-3d btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">${global.modulos.btn_como_funciona}</button>
                        <button class="btn btn-outline-3d btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">${global.modulos.btn_nossos_trabalhos}</button>
                        <button class="btn btn-fill-3d btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">${global.modulos.btn_vamos_conversar}</button>
                     </div>
                  </div>
               </div>
            </div>
         </article>
         <hr>
         <article class="row">
               <div class="col-md-12 col-xs-12 panel panel-servicos animation-default">
                  <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_max600">
                     <img class="panel-left-img" src="./img/video_c.svg">
                     <h1 class="panel-left-title mb-0">${global.home.video_titulo}</h1>
                  </div>
                  <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12 col-lg-offset-1">
                     <p class="panel-right-description mt-0">${global.modulos.video_desc}</p>
                     <div class="row">
                        <div class="col-md-12 animation-default">
                           <button class="btn btn-outline-video btn-actions" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">${global.modulos.btn_como_funciona}</button>
                           <button class="btn btn-outline-video btn-actions ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">${global.modulos.btn_nossos_trabalhos}</button>
                           <button class="btn btn-fill-video btn-actions ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">${global.modulos.btn_vamos_conversar}</button>
                        </div>
                     </div>
                  </div>
                  <div class="panel-left col-md-5 col-lg-3 col-xs-12 col-sm-12 text-center show_min600">
                     <img class="panel-left-img" src="./img/video_c.svg">
                     <h1 class="panel-left-title mb-0">${global.home.video_titulo}</h1>
                  </div>
               </div>
         </article>
      `;
   else
      return '';
}