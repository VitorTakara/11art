function getSobrenos(view){
   if(view == "sobrenos")
      return `      
      <div class="container sobrenos">
      <section class="animation-default">
         <div class="row">
            <arcticle class="col-md-12">
               <div class="pageTitle">
                  <h1 class="pageTitle-h1">
                     <span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">${global.sobre_nos.title_11art}</span>
                  </h1>
               </div>
               <div class="sobrenos-11art">
                  <p> ${global.sobre_nos.desc_11art} </p>
               </div>
            </arcticle>
         </div>
         <hr>
         <div class="row mb-12 mt-8">
            <article class="col-md-12">
               <div class="pageTitle mt-6">
                  <h1 class="pageTitle-h1">
                     <span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">${global.sobre_nos.title_otime}</span>
                  </h1>
               </div>
               <div class="sobrenos-oTime">
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="${global.sobre_nos.membro_1.foto}" alt="${global.sobre_nos.membro_1.foto_alt}">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                           <h4 class="sobrenos-oTime-card-info-name">${global.sobre_nos.membro_1.nome}</h4>
                           <p class="sobrenos-oTime-card-info-function">${global.sobre_nos.membro_1.funcao}</p>
                           <p class="sobrenos-oTime-card-info-bio">${global.sobre_nos.membro_1.bio}</p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_1.facebook}">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_1.linkedin}">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                          <img src="${global.sobre_nos.membro_2.foto}" alt="${global.sobre_nos.membro_2.foto_alt}">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                        <h4 class="sobrenos-oTime-card-info-name">${global.sobre_nos.membro_2.nome}</h4>
                        <p class="sobrenos-oTime-card-info-function">${global.sobre_nos.membro_2.funcao}</p>
                        <p class="sobrenos-oTime-card-info-bio">${global.sobre_nos.membro_2.bio}</p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_2.facebook}">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_2.linkedin}">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="${global.sobre_nos.membro_3.foto}" alt="${global.sobre_nos.membro_3.foto_alt}">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                        <h4 class="sobrenos-oTime-card-info-name">${global.sobre_nos.membro_3.nome}</h4>
                        <p class="sobrenos-oTime-card-info-function">${global.sobre_nos.membro_3.funcao}</p>
                        <p class="sobrenos-oTime-card-info-bio">${global.sobre_nos.membro_3.bio}</p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_3.facebook}">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_3.linkedin}">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="sobrenos-oTime-card">
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-img">
                           <img src="${global.sobre_nos.membro_4.foto}" alt="${global.sobre_nos.membro_4.foto_alt}">
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-12 sobrenos-oTime-card-info">
                        <h4 class="sobrenos-oTime-card-info-name">${global.sobre_nos.membro_4.nome}</h4>
                        <p class="sobrenos-oTime-card-info-function">${global.sobre_nos.membro_4.funcao}</p>
                        <p class="sobrenos-oTime-card-info-bio">${global.sobre_nos.membro_4.bio}</p>
                           <div class="sobrenos-oTime-card-contact">
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_4.facebook}">
                                 <i class="fa fa-facebook-official fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" target="_blank" href="${global.sobre_nos.membro_4.linkedin}">
                                 <i class="fa fa-linkedin fa-2x"></i>
                              </a>
                              <a class="sobrenos-oTime-card-contact-a" onclick="smoothScroll('container_vamosConversar')">
                                 <i class="fa fa-envelope fa-2x"></i>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </article>
      </section>
      </div>
      `;
   else
      return '';
}