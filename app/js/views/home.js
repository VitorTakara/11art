function getHome(view){
      return `
      <div class="container-fluid">
         <section>
            <article class="container">
               <h1 class="text-center text-white tituloBoasVindas animation-modulosServicos">
                  <span class="font-weight-bold">Bem vindo!</span> Conta pra gente, do que você precisa?
                  <span class="font-weight-bold">;)</span>
               </h1>
      
               <div class="row">
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-design text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/design.svg">
                        <h3>Design Gráfico</h3>
                        <p>BANNER, FYLER, MIDIAS SOCIAIS, IMPRESSOS...</p>
                        <a class="no-textDecoration" href="#!design">
                           <button type="button" class="button-11art button-11art-design">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-web text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/web.svg">
                        <h3>Website</h3>
                        <p>COMPLETO, REPONSIVO, RÁPIDO, SEO, ACESSÍVEL...</p>
                        <a class="no-textDecoration" href="#!web">
                           <button type="button" class="button-11art button-11art-web">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-video text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/video.svg">
                        <h3>Produção Vídeo</h3>
                        <p>EDIÇÃO, MONTAGEM, CLIP, FINALIZAÇÃO, EFEITOS...</p>
                        <a class="no-textDecoration" href="#!video">
                           <button type="button" class="button-11art button-11art-video">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
      
                  <div class="col-lg-3 col-md-6 modulo animation-modulosServicos">
                     <div class="modulo-3d text-center">
                        <img class="modulo-img mt-10 mb-7" src="img/3d.svg">
                        <h3 class="titulo">Modelagem 3D</h3>
                        <p>PERSONAGEM, CENÁRIO, AMBIENTE, OBJETOS...</p>
                        <a class="no-textDecoration" href="#!3d">
                           <button type="button" class="button-11art button-11art-3d">CONTINUAR</button>
                        </a>
                     </div>
                  </div>
               </div>
            </article>
         </section>
      </div>
      `;
}