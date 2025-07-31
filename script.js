// Variables globales
let currentSlide = 0;
let isMusicPlaying = false;
let musicInterval;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    startMessageAnimation();
    createConfetti();
    
    // Agregar eventos para las fotos
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach((placeholder, index) => {
        placeholder.addEventListener('click', () => {
            uploadPhoto(index);
        });
    });
});

// Crear partículas de fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animación de mensajes secuenciales
function startMessageAnimation() {
    const messages = document.querySelectorAll('.message');
    let currentIndex = 0;
    
    function showNextMessage() {
        if (currentIndex < messages.length) {
            messages[currentIndex].classList.add('show');
            currentIndex++;
            setTimeout(showNextMessage, 2000);
        }
    }
    
    // Iniciar después de 1 segundo
    setTimeout(showNextMessage, 1000);
}

// Crear confeti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Control de música
function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    const bgMusic = document.getElementById('bgMusic');
    
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🎵';
        musicText.textContent = 'Reproducir Música';
        isMusicPlaying = false;
    } else {
        bgMusic.play().then(() => {
            musicIcon.textContent = '⏸️';
            musicText.textContent = 'Pausar Música';
            isMusicPlaying = true;
        }).catch(error => {
            console.log('Error reproduciendo música:', error);
            alert('Para reproducir música, haz clic en la página primero');
        });
    }
}

// Navegación de galería
function changeSlide(direction) {
    const slides = document.querySelectorAll('.photo-slide');
    const totalSlides = slides.length;
    
    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    
    // Calcular nuevo índice
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    // Agregar clase active al nuevo slide
    slides[currentSlide].classList.add('active');
}

// Función para subir fotos (simulada)
function uploadPhoto(index) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoPlaceholder = document.querySelectorAll('.photo-placeholder')[index];
                photoPlaceholder.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
                
                // Mostrar mensaje de éxito
                showNotification('¡Foto agregada exitosamente! 💖');
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// Mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Agregar estilos CSS para las notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Efectos especiales al hacer clic
document.addEventListener('click', function(e) {
    if (e.target.closest('.birthday-card')) {
        createClickEffect(e.clientX, e.clientY);
    }
});

function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        left: ${x - 10}px;
        top: ${y - 10}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ff6b6b, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: clickEffect 0.6s ease-out;
    `;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 600);
}

// Agregar estilos para el efecto de clic
const clickEffectStyles = document.createElement('style');
clickEffectStyles.textContent = `
    @keyframes clickEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickEffectStyles);

// Función para personalizar mensajes
function customizeMessages() {
    const messages = [
        "Mi amor, en este día tan especial...",
        "Quiero recordarte lo mucho que te amo",
        "Cada día a tu lado es un regalo",
        "Gracias por ser la luz de mi vida",
        "¡Que este año esté lleno de amor y felicidad!"
    ];
    
    // PERSONALIZA AQUÍ TUS MENSAJES:
    // messages[0] = "Tu mensaje personalizado aquí";
    // messages[1] = "Otro mensaje romántico";
    // messages[2] = "Algo especial de tu relación";
    // messages[3] = "Un recuerdo bonito";
    // messages[4] = "Tu deseo para su cumpleaños";
    
    // Aquí puedes personalizar los mensajes
    // messages[0] = "Tu mensaje personalizado aquí";
    
    const messageElements = document.querySelectorAll('.message p');
    messageElements.forEach((element, index) => {
        if (messages[index]) {
            element.textContent = messages[index];
        }
    });
}

// Función para cambiar la música
function changeMusic(newMusicUrl) {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.src = newMusicUrl;
    
    if (isMusicPlaying) {
        bgMusic.play();
    }
}

// Función para agregar más confeti
function addMoreConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const additionalConfetti = 50;
    
    for (let i = 0; i < additionalConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = '0s';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// Función para hacer la tarjeta más interactiva
function addInteractiveElements() {
    // Agregar efecto de hover a la tarjeta
    const card = document.querySelector('.birthday-card');
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
    
    // Agregar efecto de clic al corazón
    const heart = document.querySelector('.heart');
    heart.addEventListener('click', () => {
        heart.style.animation = 'none';
        setTimeout(() => {
            heart.style.animation = 'heartbeat 1.5s ease-in-out infinite';
        }, 10);
        addMoreConfetti();
    });
}

// Inicializar elementos interactivos
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveElements();
    customizeMessages();
});

// Función para compartir en WhatsApp
function shareToWhatsApp() {
    const url = window.location.href;
    const text = "¡Mira esta tarjeta de cumpleaños especial que hice para ti! 💖";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
}

// Agregar botón de compartir
function addShareButton() {
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📱 Compartir en WhatsApp';
    shareBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #25d366;
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    shareBtn.addEventListener('click', shareToWhatsApp);
    shareBtn.addEventListener('mouseenter', () => {
        shareBtn.style.transform = 'scale(1.05)';
    });
    shareBtn.addEventListener('mouseleave', () => {
        shareBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(shareBtn);
}

// Agregar botón de compartir cuando se carga la página
document.addEventListener('DOMContentLoaded', addShareButton); 