function getNavBar(view) {
   var viewColor = getViewColor(view);

   return `
      <nav class="nav strokeEffect" style="background:${viewColor}">
      <div class="nav-header">
         <div class="nav-header-title">
            <a href="#!home">
               <img src="img/11Art_White.svg" width="50" height="80" alt="Logo da agência de publicidade 11Art"> </a>
         </div>
      </div>
      <div class="nav-mobileBtn">
         <label for="nav-mobileBtnToogle">
            <p class="nav-mobileBtn-toogleText">${global.navbar.btn_menu}</p>
            <span></span>
            <span></span>
            <span></span>
         </label>
      </div>
      <input type="checkbox" id="nav-mobileBtnToogle">
      <div class="nav-links">
         <img class="nav-links-logo" src="img/11Art_White.svg" width="50" height="80" alt="Logo da agência de publicidade 11Art">
         <div class="nav-links-btnFechar">
            <label for="nav-mobileBtnToogle">${global.navbar.btn_fechar}</label>
         </div>
         <a href="#!home">${global.navbar.home}</a>
         <a href="#!servicos">${global.navbar.servicos}</a>
         <a href="#!portfolio">${global.navbar.portfolio}</a>
         <a href="#!sobrenos">${global.navbar.sobrenos}</a>
         <a class="mtn-4 mb-10" href="#!contato">${global.navbar.contato}</a>
      </div>
      </nav>
   `;
};