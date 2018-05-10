function getNossosTrabalhos(view) {
   var viewColor = getViewColor(view);
   var colorClass = view;
   var galeriaFotos = [];

   if (viewColor == "#fb8c00")
      viewColor = "11art";
   else
      viewColor = view;

   // [ 3D ]
   if (view == "3d")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];


   // [ VIDEO ]
   else if (view == "video")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1005/1005",
         img_placeholder_alt: "aa",
         source: "https://www.youtube-nocookie.com/embed/iP2JGliTdvw?rel=0",
         type: "video",
         title: "Teste",
         description: "Teste des"
      }];


   // [ DESIGN ]
   else if (view == "design")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];


   // [ WEB ]
   else if (view == "web")
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];

      // [ SERVIÇOS ]
      else if (view == "servicos"){
      colorClass = "11art"; // Fazer a classe ficar laranja
      galeriaFotos = [{
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }, {
         img_placeholder: "https://placekitten.com/1010/1010",
         img_placeholder_alt: "aa",
         source: "https://placekitten.com/1010/1010",
         type: "img",
         title: "Teste",
         description: "Teste des"
      }];
   }

   else galeriaFotos = []; // Deixa vazio
   if (galeriaFotos.length == 4)
      return `
      <hr id="container_nossosTrabalhos">
      <div class="row animation-default">
         <div class="col-md-12 pb-6 pt-5">
            <article class="boxNossosTrabalhos">
               <div class="text-center">
                  <h2 class="boxNossosTrabalhos-title">Alguns de <span class="text-mark text-mark-${colorClass}">nossos trabalhos!</span></h2>
               </div>

               <div class="gallery">
                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[0].source}" data-size="1000x1000" data-type="${galeriaFotos[0].type}">
                     <img src="${galeriaFotos[0].img_placeholder}" alt="${galeriaFotos[0].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[0].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[0].description}</figcaption>                                    
                  </figure>
            
                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[1].source}" data-size="1000x1000" data-type="${galeriaFotos[1].type}">
                     <img src="${galeriaFotos[1].img_placeholder}" alt="${galeriaFotos[1].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[1].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[1].description}</figcaption>                                    
                  </figure>

                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[2].source}" data-size="1000x1000" data-type="${galeriaFotos[2].type}">
                     <img src="${galeriaFotos[2].img_placeholder}" alt="${galeriaFotos[2].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[2].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[2].description}</figcaption>                                    
                  </figure>

                  <figure class="col-lg-3 col-md-3 col-xs-6"> 
                  <a href="${galeriaFotos[3].source}" data-size="1000x1000" data-type="${galeriaFotos[3].type}">
                     <img src="${galeriaFotos[3].img_placeholder}" alt="${galeriaFotos[3].img_placeholder_alt}" />
                     <div class="gallery-overlay">
                        <div class="gallery-overlay-text">${galeriaFotos[3].title}</div>
                     </div>
                  </a>
                  <figcaption>${galeriaFotos[3].description}</figcaption>                                    
                  </figure>
               </div>
               <div class="col-md-12 col-xs-12 text-center mt-6 pl-2 pr-2">
                     <a href="#!portfolio"><button type="button" class="btn btn-outline-${colorClass} float-none_i">Ver mais!</button></a>
                  </div>
            </article>
         </div>
      </div>`;
   else
      return '';
}