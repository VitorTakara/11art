function getHome(view){
      return `
         <section>
            <article>
               <h1 class="text-center text-white tituloBoasVindas animation-modulosServicos">
                  <span class="font-weight-bold">${global.home.titulo[0]}</span> ${global.home.titulo[1]} 
                  <span class="font-weight-bold">${global.home.titulo[2]}</span>
               </h1>
      
               <div class="row">
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-design text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/design.svg">
                        <h3>${global.home.design_titulo}</h3>
                        <p>${global.home.design_desc}</p>
                        <a class="no-textDecoration" href="#!design">
                           <button type="button" class="button-11art button-11art-design">${global.home.btn_continuar}</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-web text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/web.svg">
                        <h3>${global.home.web_titulo}</h3>
                        <p>${global.home.web_desc}</p>
                        <a class="no-textDecoration" href="#!web">
                           <button type="button" class="button-11art button-11art-web">${global.home.btn_continuar}</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-video text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/video.svg">
                        <h3>${global.home.video_titulo}</h3>
                        <p>${global.home.video_desc}</p>
                        <a class="no-textDecoration" href="#!video">
                           <button type="button" class="button-11art button-11art-video">${global.home.btn_continuar}</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-3d text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/3d.svg">
                        <h3>${global.home.model3d_titulo}</h3>
                        <p>${global.home.model3d_desc}</p>
                        <a class="no-textDecoration" href="#!3d">
                           <button type="button" class="button-11art button-11art-3d">${global.home.btn_continuar}</button>
                        </a>
                     </div>
                  </div>
               </div>
            </article>
         </section>
      `;
}