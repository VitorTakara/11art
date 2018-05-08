function portfolioFiltrar(modulo){
   preencheBotao(modulo);
   switch (modulo) {
      case "3d":
         montaGaleria("3d", getModulo("3d"));
      break;

      case "video":
         montaGaleria("video", getModulo("video"));
      break;

      case "web":
        montaGaleria("web", getModulo("web"));
      break;

      case "design":
         montaGaleria("design", getModulo("design"));
      break;
   
      default:
         var linksModulosTODOS = [getModulo("3d"), getModulo("video"), getModulo("web"), getModulo("design")];
         montaGaleriaTodos(linksModulosTODOS);
      break;
   }
}

function montaGaleria(modulo, links){
   var template_final = '';
   
   links.forEach(function(item){
      template_final += 
      `
      <figure class="col-lg-3 col-md-3 col-xs-6 gallery-${modulo} animated fadeIn">
         <a href="${item.img}" data-size="1000x1000">
            <img class="gallery-${modulo}-img" src="${item.miniImg}" alt="${item.alt}" />
            <div class="gallery-overlay">
               <div class="gallery-overlay-text">${item.title}</div>
            </div>
         </a>
         <figcaption>${item.description}</figcaption>                                    
      </figure>
      `;
   });

   document.querySelector('.gallery').innerHTML = template_final;
}

function montaGaleriaTodos(links){
   var template_final = '';

   links.forEach(function(el, index){
      var modulo = '';
      if(index == 0) modulo = "3d";
      else if(index == 1) modulo = "video";
      else if(index == 2) modulo = "web";
      else modulo = "design";

      el.forEach(function(item){
         template_final += 
         `
         <figure class="col-lg-3 col-md-3 col-xs-6 gallery-${modulo} animated fadeIn">
            <a href="${item.img}" data-size="1000x1000">
               <img class="gallery-${modulo}-img" src="${item.miniImg}" alt="${item.alt}" />
               <div class="gallery-overlay">
                  <div class="gallery-overlay-text">${item.title}</div>
               </div>
            </a>
            <figcaption>${item.description}</figcaption>                                    
         </figure>
         `;
      });
   });

   document.querySelector('.gallery').innerHTML = template_final;
}

function getModulo(modulo){
   // 3D
   if(modulo == "3d")
      return [{
         img: "https://placekitten.com/1000/1003",
         miniImg: "https://placekitten.com/1000/1003",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];

   // VÍDEO
   if(modulo == "video")
      return [{
         img: "https://placekitten.com/1000/1005",
         miniImg: "https://placekitten.com/1000/1005",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];

   // WEB
   if(modulo == "web")
      return [{
         img: "https://placekitten.com/1000/1004",
         miniImg: "https://placekitten.com/1000/1004",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];

   // DESIGN
   if(modulo == "design")
      return [{
         img: "https://placekitten.com/1000/1001",
         miniImg: "https://placekitten.com/1000/1001",
         alt: "teste",
         title: "titulo",
         description: "description"
      },
      {
         img: "https://placekitten.com/1000/1002",
         miniImg: "https://placekitten.com/1000/1002",
         alt: "teste",
         title: "titulo",
         description: "description"
      }];
}

function preencheBotao(modulo){
   // Remove a classe de todos os botões
   ["3d", "design", "web", "video", "11art"].forEach(function(item){
      document.getElementById(`${item}`).classList.remove(`btn-fill-${item}`);
      document.getElementById(`${item}`).classList.remove(`btn-outline-${item}`);
   });



   // Adiciona a classe no módulo clicado
   ["3d", "design", "web", "video", "11art"].forEach(function(item){
      if(item == modulo)
         document.getElementById(`${item}`).classList.add(`btn-fill-${item}`);
      else
         document.getElementById(`${item}`).classList.add(`btn-outline-${item}`);
   });
}