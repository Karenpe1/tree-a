window.addEventListener('load',()=>{
    const poolItems=document.querySelectorAll(".pool-card");
    const carousel= document.querySelector(".testimonio-carrusel")
    const carouselItem= document.querySelector(".testimonio-item")
    const nuevoButton= document.querySelector(".indicators")
    const form= document.querySelector(".formulario")
    const alertContainer = document.getElementById('alert-container');
    let currentIndex=0;

    // funcion para las imagenes del trabajo de la empresa
    poolItems.forEach((item) =>{
        item.addEventListener('mouseenter', ()=>{
            poolItems.forEach((item)=> {
                item.classList.remove('active')
            });
            item.classList.add('active')
        });
    });

    //funcion para actualizar el carousel de los testimonios
    function updateCarousel(index){
        const width= carouselItem.offsetWidth;
        carousel.style.transform=`translateX(${-index * width}px)`;
        const indicators = document.querySelectorAll(".indicators button");
        indicators.forEach((indicator)=>{
            indicator.classList.remove('active')
        });
        indicators[index].classList.add('active');
        currentIndex=index;
    }

    //ajustar tamaño de carousel al redimensionarse la ventana
    function checkScreenSize() {
        const indicatorsCount = document.querySelectorAll(".indicators button").length;

        if (window.innerWidth <= 992 && indicatorsCount < 4) {
            nuevoButton.insertAdjacentHTML('beforeend', `<button data-slide="3"></button>`);
        }

        // Añadir un quinto botón cuando la pantalla es menor o igual a 517px (solo una vez)
        if (window.innerWidth <= 576 && indicatorsCount < 5) {
            nuevoButton.insertAdjacentHTML('beforeend', `<button data-slide="4"></button>`);
        }
        asignarEventos();
        updateCarousel(currentIndex); // Mantener la posición actual del carrusel
    }
    // Asignar eventos a los botones del carrusel
    function asignarEventos() {
        const indicators = document.querySelectorAll(".indicators button");
        indicators.forEach((button, index) => {
            button.addEventListener('click', () => updateCarousel(index));
        });
    }

    window.addEventListener('resize', checkScreenSize());
    checkScreenSize();

    //validaciones del form

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        const nombre= document.getElementById('input-nombre').value.trim();
        const apellido= document.getElementById('input-apellido').value.trim();
        const correo =document.getElementById('input-correo').value.trim();
        const asunto= document.getElementById('input-asunto').value.trim();
        const mensaje=document.getElementById('input-area').value.trim();
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if(nombre.length < 3){
            showAlert('El nombre debe tener al menos 3 caracteres.','error')
            return;
        }
        if(apellido.length < 3){
            showAlert('El apellido debe tener al menos 3 caracteres.','error')
            return;
        }
        if(!emailRegex.test(correo)){
            showAlert('Por favor, ingresa un correo valido.','error')
            return;
        }
        if(!asunto){
            showAlert('Por favor, ingresa un asunto','error')
            return;
        }
        if(!mensaje){
            showAlert('Por favor, ingresa tu mensaje','error')
            return;
        }
        else{
            showAlert('formulario enviado con exito ','success');
            form.reset();
        }
    });
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alertContainer.appendChild(alert);
    
        // Remover alerta después de 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
});

