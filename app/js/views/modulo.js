function getModuloView (view) {
   if (view == '3d' || view == 'design' || view == 'video' || view == 'web'){
      
      var data = {
         title: '',
         description: '',
         img: '',
      }

      // [ DESIGN ]
      if(view == "design"){
         data = {
            title: 'Design Gráfico',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/design_c.svg',
         }
      }

      // [ WEB ]
      else if(view == "web"){
         data = {
            title: 'Website',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/web_c.svg',
         }
      }

      // [ VIDEO ]
      else if(view == "video"){
         data = {
            title: 'Produção Vídeo',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/video_c.svg',
         }
      }

      // [ 3D ]
      else if(view == "3d"){
         data = {
            title: 'Modelagem 3D',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ratione reiciendis totam odio, quo deleniti beatae eaque expedita vero ea, odit est officiis temporibus ad.',
            img: './img/3d_c.svg',
         }
      }

      else throw new Error("Erro ao inserir Módulo.")


      return `
      <article class="row">
         <div class="col-md-12 col-xs-12 panel animation-default">
            <div class="panel-left col-md-5 col-lg-3 col-lg-offset-1 col-xs-12 col-sm-12 text-center ">
               <img class="panel-left-img" src="${data.img}">
               <h1 class="panel-left-title mb-0">${data.title}</h1>
            </div>
            <div class="panel-right col-md-7 col-lg-7 col-xs-12 col-sm-12">
               <p class="panel-right-description mt-0">${data.description}</p>
               <div class="row">
                  <div class="col-md-12 animation-default">
                     <button class="btn btn-outline-${view}" role="button" onclick="smoothScroll('container_comoFunciona')" type="button">Como funciona</button>
                     <button class="btn btn-outline-${view} ml-2" role="button" onclick="smoothScroll('container_nossosTrabalhos')" type="button">Nossos trabalhos</button>
                     <button class="btn btn-fill-${view} ml-2" role="button" onclick="smoothScroll('container_vamosConversar')" type="button">Vamos conversar?</button>
                  </div>
               </div>
            </div>
         </div>
      </article>`;
   }
   else
      return '';
};