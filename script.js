// Variables globales
// (Sin variables específicas de música ya que es automática)

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    startMessageAnimation();
    createConfetti();
    forceGifLoop();
    ensureGifLoop();
    startBackgroundMusic();
    addSpecialEffects();
});

// Método adicional para asegurar bucle infinito del GIF
function ensureGifLoop() {
    const gif = document.getElementById('birthdayGif');
    if (gif) {
        // Método 1: Reiniciar el GIF cada cierto tiempo
        let originalSrc = gif.src;
        
        function restartGif() {
            gif.src = '';
            setTimeout(() => {
                gif.src = originalSrc;
            }, 100);
        }
        
        // Reiniciar cada 8 segundos para asegurar bucle infinito
        setInterval(restartGif, 8000);
        
        // Método 2: Crear múltiples instancias del GIF
        function createGifClone() {
            const clone = gif.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.opacity = '0';
            gif.parentNode.appendChild(clone);
            
            setTimeout(() => {
                if (clone.parentNode) {
                    clone.parentNode.removeChild(clone);
                }
            }, 1000);
        }
        
        // Crear clon cada 6 segundos
        setInterval(createGifClone, 6000);
        
        // Método 3: Verificar y reiniciar si es necesario
        setInterval(() => {
            if (gif.complete && gif.naturalHeight > 0) {
                // El GIF está cargado, verificar si se está reproduciendo
                if (gif.style.animationPlayState === 'paused') {
                    gif.style.animationPlayState = 'running';
                }
            }
        }, 3000);
        
        // Evento de clic para reiniciar manualmente
        gif.addEventListener('click', function() {
            restartGif();
            addMoreConfetti();
        });
        
        // Verificar carga del GIF
        gif.addEventListener('load', function() {
            console.log('🎉 GIF cargado y configurado para bucle infinito');
        });
    }
}

// Forzar bucle infinito del GIF
function forceGifLoop() {
    const gif = document.querySelector('.birthday-gif');
    if (gif) {
        // Método 1: Forzar bucle con JavaScript
        gif.style.animationIterationCount = 'infinite';
        gif.style.animationPlayState = 'running';
        
        // Método 2: Reiniciar el GIF cada cierto tiempo para asegurar bucle
        let gifSrc = gif.src;
        
        // Función para reiniciar el GIF
        function restartGif() {
            gif.src = '';
            setTimeout(() => {
                gif.src = gifSrc;
            }, 100);
        }
        
        // Reiniciar cada 10 segundos para asegurar bucle infinito
        setInterval(restartGif, 10000);
        
        // Método 3: Verificar y reiniciar si se detiene
        setInterval(() => {
            if (gif.style.animationPlayState === 'paused') {
                gif.style.animationPlayState = 'running';
            }
        }, 3000);
        
        // Método 4: Evento de carga para asegurar reproducción
        gif.addEventListener('load', function() {
            gif.style.animationPlayState = 'running';
        });
        
        // Método 5: Forzar reproducción al hacer clic
        gif.addEventListener('click', function() {
            restartGif();
        });
    }
}

// Crear partículas de fondo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15; // Reducido aún más
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animación de mensajes secuenciales con sustitución automática
function startMessageAnimation() {
    const messages = document.querySelectorAll('.message');
    let currentIndex = 0;
    
    // Ocultar todos los mensajes inicialmente
    messages.forEach(msg => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(20px)';
    });
    
    function showNextMessage() {
        if (currentIndex < messages.length) {
            // Ocultar todos los mensajes
            messages.forEach(msg => {
                msg.style.opacity = '0';
                msg.style.transform = 'translateY(20px)';
            });
            
            // Mostrar solo el mensaje actual
            messages[currentIndex].style.opacity = '1';
            messages[currentIndex].style.transform = 'translateY(0)';
            
            currentIndex++;
            setTimeout(showNextMessage, 3000); // 3 segundos por mensaje
        } else {
            // Cuando terminan los mensajes, mostrar la galería automática
            setTimeout(showAutoGallery, 1000);
        }
    }
    
    // Iniciar después de 1 segundo
    setTimeout(showNextMessage, 1000);
}

// Función para mostrar la galería automática
function showAutoGallery() {
    const autoGallery = document.getElementById('autoGallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Ocultar el área de mensajes
    document.querySelector('.message-container').style.display = 'none';
    
    // Mostrar la galería
    autoGallery.style.display = 'block';
    
    // Mostrar todas las imágenes de una vez sin animaciones
    galleryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
    
    // Iniciar presentación automática después de 2 segundos
    setTimeout(startAutoPresentation, 2000);
}

// Función para presentación automática de imágenes
function startAutoPresentation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    function showNextImage() {
        if (currentIndex < galleryItems.length) {
            const item = galleryItems[currentIndex];
            const img = item.querySelector('.gallery-image');
            const caption = item.getAttribute('data-caption');
            
            // Mostrar imagen en modal
            showImageInModal(img.src, caption);
            
            currentIndex++;
            setTimeout(showNextImage, 4000); // 4 segundos por imagen
        }
    }
    
    showNextImage();
}

// Función para mostrar imagen en modal
function showImageInModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Precargar la imagen para evitar parpadeos
    const tempImg = new Image();
    tempImg.onload = function() {
        modalImage.src = imageSrc;
        modalCaption.textContent = caption;
        modal.style.display = 'block';
        
        // Agregar clase para animación suave
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Cerrar modal automáticamente después de 3.5 segundos
        setTimeout(() => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
        }, 3500);
    };
    tempImg.src = imageSrc;
}

// Cerrar modal al hacer clic en X
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Crear confeti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiCount = 30; // Reducido aún más
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 6 + 's';
        confetti.style.animationDuration = (Math.random() * 4 + 4) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Control de música automático
function startBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3; // Volumen bajo para música de fondo
    
    // Intentar reproducir automáticamente
    bgMusic.play().catch(error => {
        console.log('La música se reproducirá cuando el usuario interactúe con la página');
    });
    
    // Reproducir música cuando el usuario haga clic en cualquier parte
    document.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log('Error al reproducir música:', error);
            });
        }
    }, { once: true }); // Solo una vez
}





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
    
    // Agregar efecto de clic al GIF
    const gif = document.querySelector('.birthday-gif');
    gif.addEventListener('click', () => {
        gif.style.animation = 'none';
        setTimeout(() => {
            gif.style.animation = 'floatGif 3s ease-in-out infinite';
        }, 10);
        addMoreConfetti();
    });
}

// Inicializar elementos interactivos
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveElements();
});

// Función para compartir en WhatsApp (removida para GitHub Pages)
// Ya no necesitamos el botón porque la URL se puede compartir directamente

// Función para agregar un mensaje especial cuando se comparte
// REMOVIDA - Ya no se muestra el mensaje de compartir

// Efectos especiales
function addSpecialEffects() {
    // Efectos al hacer clic en cualquier parte
    document.addEventListener('click', function(e) {
        createFloatingHearts(e.clientX, e.clientY);
        createSparkles(e.clientX, e.clientY);
        createFireworks(e.clientX, e.clientY);
    });
    
    // Efectos automáticos cada cierto tiempo
    setInterval(createRandomHearts, 3000);
    setInterval(createRandomSparkles, 2000);
    
    // Efecto de pulso en el título
    const title = document.querySelector('.title');
    if (title) {
        title.classList.add('pulse-glow');
    }
    

}

function createFloatingHearts(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'floating-hearts';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '24px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

function createSparkles(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (x + Math.random() * 40 - 20) + 'px';
        sparkle.style.top = (y + Math.random() * 40 - 20) + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

function createFireworks(x, y) {
    const colors = ['#d50000', '#ffe082', '#b39ddb', '#f7cac9', '#fbc02d'];
    
    for (let i = 0; i < 8; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        firework.style.left = (x + Math.random() * 60 - 30) + 'px';
        firework.style.top = (y + Math.random() * 60 - 30) + 'px';
        document.body.appendChild(firework);
        
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1500);
    }
}

function createRandomHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'floating-hearts';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '20px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

function createRandomSparkles() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
} 