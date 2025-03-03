const answers_no = {
    spanish: [
        "orita no grcs",
        "segura?",
        "pq no?",
        "segurisima?",
        "respuesta incorrecta",
        "sigue intentando",
        "cobarde",
        "tipica mujer",
        "ok, ultima vez que pregunto",
        "bueno ya ponle que si",
        "se me estan acabando las opciones",
        "ya no se que poner aqui",
        "lo hice con mis propias manos ahi dice abajito",
        "deja de picarle aqui",
        "carajo",
        "es en el verde, esta gigante miralo",
        "ok ahora si despues de esta ya rip",
        "bueno se intentó 😾"
    ]
};

const answers_yes = {
    spanish:[ "ok ya te estabas tardando","tgp","bueno", "ok esta bien"]
}

let language = "spanish"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        
        if(i<=3){
            yes_button.innerHTML = answers_yes[language][i];
        }else{yes_button.innerHTML = answers_yes[language][3];}
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        location.reload(); 
    }
});

yes_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();

    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";

    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";

    startHeartsAnimation(); // Llamar la animación de corazones
});

function startHeartsAnimation() {
    const container = document.getElementById('hearts-container');

    for (let i = 0; i < 40; i++) { // Crea 40 corazones
        let heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '🧡';
        heart.style.color = "orange"; // Corazones naranjas
        container.appendChild(heart);

        let size = Math.random() * 30 + 10; // Tamaño aleatorio entre 10px y 40px
        heart.style.fontSize = `${size}px`;

        // Posición inicial aleatoria dentro del viewport
        let x = Math.random() * (window.innerWidth - size);
        let y = Math.random() * (window.innerHeight - size);

        // Velocidad aleatoria (positivo o negativo para moverse en cualquier dirección)
        let dx = (Math.random() - 0.5) * 4; // Movimiento horizontal aleatorio
        let dy = (Math.random() - 0.5) * 4; // Movimiento vertical aleatorio

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        function moveHeart() {
            x += dx;
            y += dy;

            // Rebote al llegar al borde izquierdo
            if (x <= 0) {
                x = 0; // Ajustar la posición al borde izquierdo
                dx = Math.abs(dx); // Cambiar la dirección a la derecha
            }

            // Rebote al llegar al borde derecho
            if (x + size >= window.innerWidth) {
                x = window.innerWidth - size; // Ajustar la posición al borde derecho
                dx = -Math.abs(dx); // Cambiar la dirección a la izquierda
            }

            // Rebote al llegar al borde superior
            if (y <= 0) {
                y = 0; // Ajustar la posición al borde superior
                dy = Math.abs(dy); // Cambiar la dirección hacia abajo
            }

            // Rebote al llegar al borde inferior
            if (y + size >= window.innerHeight) {
                y = window.innerHeight - size; // Ajustar la posición al borde inferior
                dy = -Math.abs(dy); // Cambiar la dirección hacia arriba
            }

            // Establecer la nueva posición de los corazones
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;

            requestAnimationFrame(moveHeart); // Continuar el movimiento
        }

        moveHeart(); // Inicia el movimiento de los corazones
    }
}

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;


    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
        successMessage.textContent = "Yepppie, see you sooonnn :3";
}
