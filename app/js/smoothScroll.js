function smoothScroll(location) {
   if (location) {
      var container = document.querySelector("#" + location);
      container.scrollIntoView({
         behavior: "smooth",
         block: "start",
         inline: "nearest"
      });
   } else throw new Error("Variável 'location' não passada no evento de 'click'");
}