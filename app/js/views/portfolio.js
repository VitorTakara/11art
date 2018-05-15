function getPortfolio(view){
   if(view == "portfolio")
      return `      
      <div class="pageTitle animation-default">
      <h1 class="pageTitle-h1"><span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">${global.portfolio.title}</span></h1>
      <p class="pageTitle-p">${global.portfolio.desc}</p>
      </div>
      <div class="text-center animation-default row">
         <div class="col-md-12">
            <button id="11art" onclick="portfolioFiltrar('11art')" class="btn btn-outline-11art btn-portfolio">${global.portfolio.btn_todos}</button>
            <button id="design" onclick="portfolioFiltrar('design')" class="btn btn-outline-design btn-portfolio">${global.portfolio.btn_design}</button>
            <button id="3d" onclick="portfolioFiltrar('3d')" class="btn btn-outline-3d btn-portfolio">${global.portfolio.btn_3d}</button>
            <button id="web" onclick="portfolioFiltrar('web')" class="btn btn-outline-web btn-portfolio">${global.portfolio.btn_web}</button>
            <button id="video" onclick="portfolioFiltrar('video')" class="btn btn-outline-video btn-portfolio">${global.portfolio.btn_video}</button>
         </div>
      </div>
      <div class="row animation-default">
         <div class="col-md-12 pb-6 pt-5">
            <article class="boxPortfolio">
               <div class="gallery">
               </div>
            </article>
         </div>
      </div>
      `;
   else
      return '';
}