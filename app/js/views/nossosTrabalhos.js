function getNossosTrabalhos(view) {
   var viewColor = getViewColor(view);
   var galeriaFotos = [];

   if (viewColor == "#fb8c00")
      viewColor = "11art";
   else
      viewColor = view;

   if(view == "3d")
      galeriaFotos = [];
   else if (view == "video")
      galeriaFotos = [];
   else if (view == "design")
      galeriaFotos = [];
   else if (view == "web")
      galeriaFotos = [];
   else
      galeriaFotos = []; // Deixa vazio

   if (galeriaFotos.length > 0)
      return `
      <hr id="container_nossosTrabalhos">
      <div class="row animation-default">
         <div class="col-md-12 pb-6 pt-5">
            <article class="boxNossosTrabalhos">
               <div class="text-center">
                  <h2 class="boxNossosTrabalhos-title">Alguns de <span class="text-mark text-mark-design">nossos trabalhos!</span></h2>
               </div>

               <div class="gallery">
                  <figure class="col-lg-3 col-md-3 col-xs-6">
                  <a href="https://placekitten.com/1000/1001" data-size="1000x1000">
                        <img src="https://placekitten.com/1000/1001" alt="Image description" />
                        <div class="gallery-overlay">
                           <div class="gallery-overlay-text">Cat 1</div>
                        </div>
                  </a>
                  <figcaption>Cat  1</figcaption>                                    
                  </figure>
            
                  <figure class="col-lg-3 col-md-3 col-xs-6">
                  <a href="https://placekitten.com/1000/1002" data-size="1000x1000">
                        <img src="https://placekitten.com/1000/1002" alt="Image description" />
                        <div class="gallery-overlay">
                              <div class="gallery-overlay-text">Cat 2</div>
                        </div>
                  </a>
                  <figcaption>Cat 2</figcaption>
                  </figure>

                  <figure class="col-lg-3 col-md-3 col-xs-6">
                        <a href="https://placekitten.com/1000/1003" data-size="1000x1000">
                           <img src="https://placekitten.com/1000/1003" alt="Image description" />
                           <div class="gallery-overlay">
                                 <div class="gallery-overlay-text">Cat 3</div>
                           </div>
                        </a>
                        <figcaption>Cat 3</figcaption>
                  </figure>

                  <figure class="col-lg-3 col-md-3 col-xs-6">
                        <a href="https://placekitten.com/1000/1005" data-size="1000x1000">
                           <img src="https://placekitten.com/1000/1005" alt="Image description" />
                           <div class="gallery-overlay">
                                 <div class="gallery-overlay-text">Cat 4</div>
                           </div>
                        </a>
                        <figcaption>Cat 4</figcaption>
                  </figure> 
               </div>
               <div class="col-md-12 col-xs-12 text-center mt-6 pl-2 pr-2">
                     <a href="#!portfolio"><button type="button" class="btn btn-outline-design float-none_i">Ver mais!</button></a>
                  </div>
            </article>
         </div>
      </div>`;
   else
      return '';
}