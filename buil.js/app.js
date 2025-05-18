document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
    navegacionFija();
    resaltarEnlace();
    scrollNav();
});

function scrollNav(){
    const navLink = document.querySelectorAll('.navegacion-principal a');

    navLink.forEach(link =>{
        link.addEventListener('click', e=>{
            e.preventDefault();

           const sectionScroll = e.target.getAttribute('href')
           const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}

function navegacionFija(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function(){
       if(sobreFestival.getBoundingClientRect().bottom <1){
            header.classList.add('fixed');
       }
       else{
        header.classList.remove('fixed');
       }
    })
}
function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    const cantidadImagenes = 16;

    for (let i = 1; i <= cantidadImagenes; i++) {
        const imagen = document.createElement('IMG');

        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = "Imagen galeria";

        // Evento para mostrar la imagen en modal
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}
function mostrarImagen(i) {
    const modal = document.createElement('DIV');
    modal.classList.add('modal');

    // Crear la imagen que se mostrará en el modal
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen galeria ampliada";
    imagen.classList.add('imagen-modal');

    // Evitar que el clic en la imagen cierre el modal
    imagen.onclick = function(event) {
        event.stopPropagation();
    }

    //cerrar modal 
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal; 

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);
    // Cerrar modal al hacer clic fuera de la imagen
    modal.onclick = cerrarModal;

    const body = document.querySelector('body');
    body.classList.add('overflow-hidden')
    body.appendChild(modal);

    // Opcional: evitar scroll mientras el modal está abierto
    body.classList.add('no-scroll');
}
function cerrarModal() {
    const modal = document.querySelector('.modal');
   modal.classList.add('fade-out')

    setTimeout(() => {
         modal?.remove();
         const body = document.querySelector('body');
         body.classList.remove('overflow-hidden')
    }, 500);
    // Restaurar scroll del body
    document.body.classList.remove('no-scroll');
}
function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= (sectionTop-sectionHeight /3)){
                actual = section.id;
            }
        })
        navLinks.forEach(link =>{
             link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('active')
            }
        })
    })
}
