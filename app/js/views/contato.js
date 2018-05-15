function getContato(view){
   if(view == "contato")
      return `      
      <div class="pageTitle animation-default">
         <h1 class="pageTitle-h1"><span class="text-mark text-mark-11art pr-5 pl-5 pageTitle-span">${global.contato.titulo}</span></h1>
         <p class="pageTitle-p">${global.contato.desc}</p>
      </div>
      `;
   else
      return '';
}