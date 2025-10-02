

// Initialize GSAP
gsap.registerPlugin();

// Create floating orbs
function createFloatingOrbs() {
    const orbsContainer = document.querySelector('.floating-orbs');
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        const size = gsap.utils.random(20, 80);
        orb.style.width = size + 'px';
        orb.style.height = size + 'px';
        orb.style.left = gsap.utils.random(0, 100) + '%';
        orb.style.top = gsap.utils.random(0, 100) + '%';
        orbsContainer.appendChild(orb);

        // Animate orbs
        gsap.to(orb, {
            x: gsap.utils.random(-200, 200),
            y: gsap.utils.random(-200, 200),
            duration: gsap.utils.random(15, 25),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(orb, {
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Create particles around profile image
function createProfileParticles() {
    const particlesContainer = document.querySelector('.profile-particles');
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);

        const angle = (i / 12) * 360;
        const radius = 80;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;

        gsap.set(particle, {
            x: x,
            y: y,
        });

        // Animate particles
        gsap.to(particle, {
            opacity: 1,
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(1, 2),
            repeat: -1,
            yoyo: true,
            delay: i * 0.1,
            ease: "sine.inOut"
        });

        gsap.to(particle, {
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "none"
        });
    }
}

// Cursor trail effect
let cursorDots = [];
function createCursorTrail() {
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        cursorDots.push(dot);
    }
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursorTrail() {
    cursorDots.forEach((dot, index) => {
        gsap.to(dot, {
            x: mouseX,
            y: mouseY,
            duration: 0.3 + index * 0.1,
            opacity: 1 - index * 0.2,
            scale: 1 - index * 0.15,
            ease: "power2.out"
        });
    });
    requestAnimationFrame(animateCursorTrail);
}

// Main animation timeline
function initAnimations() {
    const tl = gsap.timeline();

    // Animate profile section
    tl.from('.profile-image', {
        scale: 0,
        rotation: 180,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
    })
        .from('.profile-name', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")
        .from('.profile-bio, .profile-location', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.3");

    // Animate links with stagger
    gsap.to('.link-item', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5
    });

    // Animate footer
    gsap.from('.footer', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.5,
        ease: "power2.out"
    });
}

// Profile image click effect
document.getElementById('profileImage').addEventListener('click', () => {
    gsap.to('.profile-image', {
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: "back.out(1.7)"
    });

    gsap.to('.profile-image', {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "power2.out"
    });

    // Burst particles effect
    gsap.to('.particle', {
        scale: 2,
        opacity: 1,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out"
    });

    gsap.to('.particle', {
        scale: 0.5,
        opacity: 0.3,
        duration: 0.5,
        delay: 0.3,
        stagger: 0.05,
        ease: "power2.out"
    });
});

// Link hover animations
document.querySelectorAll('.link-item').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            scale: 1.05,
            y: -10,
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.to(link.querySelector('.link-icon-wrapper'), {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        gsap.to(link.querySelector('.link-title'), {
            x: 10,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.to(link.querySelector('.link-icon-wrapper'), {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
        });

        gsap.to(link.querySelector('.link-title'), {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    link.addEventListener('click', () => {
        gsap.to(link, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
    });
});

// Text typing effect for name
function typeWriter() {
    const nameElement = document.querySelector('.profile-name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';

    let i = 0;
    function type() {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 1000);
}

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    gsap.to('.floating-orbs', {
        y: -parallax,
        duration: 0.1,
        ease: "none"
    });

    gsap.to('.profile-ring', {
        rotation: scrolled * 0.5,
        duration: 0.1,
        ease: "none"
    });
});

// Background gradient animation
function animateBackground() {
    gsap.to('.bg-animation', {
        background: `
                    radial-gradient(circle at ${gsap.utils.random(10, 90)}% ${gsap.utils.random(10, 90)}%, #667eea 0%, transparent 50%),
                    radial-gradient(circle at ${gsap.utils.random(10, 90)}% ${gsap.utils.random(10, 90)}%, #764ba2 0%, transparent 50%),
                    radial-gradient(circle at ${gsap.utils.random(10, 90)}% ${gsap.utils.random(10, 90)}%, #f093fb 0%, transparent 50%),
                    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)
                `,
        duration: 5,
        ease: "sine.inOut",
        onComplete: animateBackground
    });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    createFloatingOrbs();
    createProfileParticles();
    createCursorTrail();
    animateCursorTrail();
    initAnimations();
    // typeWriter();
    setTimeout(animateBackground, 2000);
});

// Add some easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10) {
        gsap.to('.container', {
            scale: 1.1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            yoyo: true,
            repeat: 1
        });

        // Create explosion effect
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = `hsl(${gsap.utils.random(0, 360)}, 100%, 50%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.left = '50%';
            particle.style.top = '50%';
            document.body.appendChild(particle);

            gsap.to(particle, {
                x: gsap.utils.random(-200, 200),
                y: gsap.utils.random(-200, 200),
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
        clickCount = 0;
    }
});

// Performance optimization
gsap.set('.link-item', {
    willChange: 'transform',
    backfaceVisibility: 'hidden'
});

gsap.set('.profile-image', {
    willChange: 'transform',
    backfaceVisibility: 'hidden'
});

// Debug mode (press 'D' key)
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd') {
        const debugInfo = document.createElement('div');
        debugInfo.style.position = 'fixed';
        debugInfo.style.top = '10px';
        debugInfo.style.right = '10px';
        debugInfo.style.background = 'rgba(0,0,0,0.8)';
        debugInfo.style.color = 'white';
        debugInfo.style.padding = '10px';
        debugInfo.style.borderRadius = '5px';
        debugInfo.style.fontSize = '12px';
        debugInfo.style.zIndex = '9999';
        debugInfo.innerHTML = `
    <strong>Debug Info:</strong><br>
        Screen: ${window.innerWidth}x${window.innerHeight}<br>
            Mouse: ${mouseX}, ${mouseY}<br>
                Clicks: ${clickCount}<br>
                    GSAP Version: ${gsap.version}
                    `;
        document.body.appendChild(debugInfo);

        setTimeout(() => debugInfo.remove(), 3000);
    }
});

console.log('🎨 Creative Bio Page Loaded with GSAP!');
console.log('💡 Try clicking the profile image!');
console.log('🎯 Click anywhere 10 times for a surprise!');
console.log('🔧 Press "D" for debug info');





// saluyt js

const profileImg = document.querySelector(".profile-image");
const sound = document.getElementById("clickSound");

profileImg.addEventListener("click", () => {
    // 1. tovush chalish
    sound.currentTime = 0;
    sound.play();

    // 2. chap va o‘ng chetdan salyut chiqarish
    createFirework(0, window.innerHeight / 2); // chap
    createFirework(window.innerWidth, window.innerHeight / 2); // o‘ng
});

// Firework yaratish
function createFirework(x, y) {
    for (let i = 0; i < 12; i++) {
        let fw = document.createElement("div");
        fw.classList.add("firework");
        document.body.appendChild(fw);

        fw.style.left = x + "px";
        fw.style.top = y + "px";

        let angle = (i / 12) * (Math.PI * 2);
        let dx = Math.cos(angle) * (Math.random() * 150 + 50);
        let dy = Math.sin(angle) * (Math.random() * 150 + 50);

        fw.animate([
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.5)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: "ease-out",
            fill: "forwards"
        });

        setTimeout(() => fw.remove(), 1000);
    }
}
