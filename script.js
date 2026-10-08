/* ============================================
   PORTFOLIO JAVASCRIPT
   Part 1
============================================ */

// ============================================
// LOADER
// ============================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 1200);

});

// ============================================
// TYPEWRITER EFFECT
// ============================================

const words = [

    "Data Analyst",
    "Data Scientist ",
    "Web-Developer",
    "Power BI Developer"

];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeWriter() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent =
            currentWord.substring(0, charIndex);

        charIndex++;

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typeWriter, 1500);

            return;

        }

    }

    else {

        typing.textContent =
            currentWord.substring(0, charIndex);

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeWriter, deleting ? 50 : 120);

}

typeWriter();


// ============================================
// SMOOTH SCROLL
// ============================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click",

            function (e) {

                e.preventDefault();

                document.querySelector(

                    this.getAttribute("href")

                ).scrollIntoView({

                    behavior: "smooth"

                });

            });

    });


// ============================================
// STICKY HEADER
// ============================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(5,8,22,.95)";

        header.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

    }

    else {

        header.style.background =
            "rgba(5,8,22,.45)";

        header.style.boxShadow = "none";

    }

});


// ============================================
// ACTIVE MENU
// ============================================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") == "#" + current) {

            link.classList.add("active");

        }

    });

});


// ============================================
// SCROLL REVEAL
// ============================================

const revealElements = document.querySelectorAll(

    ".hero-left,.hero-right,.about-image,.about-content,.skill-card,.project-card,.timeline-item,.certificate-card,.contact-form"

);

function reveal() {

    const windowHeight =

        window.innerHeight;

    revealElements.forEach(item => {

        const top =

            item.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            item.style.opacity = "1";

            item.style.transform =

                "translateY(0px)";

        }

    });

}

revealElements.forEach(item => {

    item.style.opacity = "0";

    item.style.transform =

        "translateY(60px)";

    item.style.transition =

        ".8s ease";

});

window.addEventListener(

    "scroll",

    reveal

);

reveal();


// ============================================
// BUTTON HOVER EFFECT
// ============================================

const buttons = document.querySelectorAll(

    ".btn"

);

buttons.forEach(btn => {

    btn.addEventListener(

        "mouseenter",

        () => {

            btn.style.transform =

                "translateY(-6px) scale(1.04)";

        });

    btn.addEventListener(

        "mouseleave",

        () => {

            btn.style.transform =

                "translateY(0) scale(1)";

        });

});


// ============================================
// END OF PART 1
// ============================================
/* ============================================
   THREE.JS HERO - PART 2A
============================================ */

const container = document.getElementById("three-container");

if (container) {

    // Scene

    const scene = new THREE.Scene();

    // Camera

    const camera = new THREE.PerspectiveCamera(

        45,

        container.clientWidth / container.clientHeight,

        0.1,

        1000

    );

    camera.position.set(0, 0, 5);

    // Renderer

    const renderer = new THREE.WebGLRenderer({

        alpha: true,

        antialias: true

    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(

        container.clientWidth,

        container.clientHeight

    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // ============================================
    // LIGHTS
    // ============================================

    const ambientLight = new THREE.AmbientLight(

        0xffffff,

        1.5

    );

    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(

        0xA855F7,

        20

    );

    pointLight.position.set(

        4,

        4,

        6

    );

    scene.add(pointLight);

    const fillLight = new THREE.PointLight(

        0xffffff,

        5

    );

    fillLight.position.set(

        -4,

        -2,

        4

    );

    scene.add(fillLight);

    // ============================================
    // GEOMETRY
    // ============================================

    const geometry = new THREE.IcosahedronGeometry(

        1.2,

        2

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x8B5CF6,

        metalness: 1,

        roughness: 0.15,

        clearcoat: 1,

        clearcoatRoughness: 0,

        reflectivity: 1,

        transmission: .15

    });

    const crystal = new THREE.Mesh(

        geometry,

        material

    );

    scene.add(crystal);

    // ============================================
    // ANIMATION
    // ============================================

    function animate() {

        requestAnimationFrame(animate);

        crystal.rotation.x += 0.003;

        crystal.rotation.y += 0.005;

        renderer.render(

            scene,

            camera

        );

    }

    animate();

    // ============================================
    // RESPONSIVE
    // ============================================

    window.addEventListener("resize", () => {

        camera.aspect =

            container.clientWidth /

            container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            container.clientWidth,

            container.clientHeight

        );

    });

}
/* ============================================
   THREE.JS HERO - PART 2B
   Mouse Parallax + Floating Animation
============================================ */

let mouseX = 0;
let mouseY = 0;

container.addEventListener("mousemove", (event) => {

    const rect = container.getBoundingClientRect();

    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

});

container.addEventListener("mouseleave", () => {

    mouseX = 0;
    mouseY = 0;

});


/* ============================================
   UPDATE ANIMATION
============================================ */

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Rotation
    crystal.rotation.x += 0.003;
    crystal.rotation.y += 0.005;

    // Floating Effect
    crystal.position.y = Math.sin(time * 1.5) * 0.2;

    // Mouse Parallax
    crystal.rotation.y += (mouseX * 0.3 - crystal.rotation.y) * 0.02;
    crystal.rotation.x += (-mouseY * 0.3 - crystal.rotation.x) * 0.02;

    renderer.render(scene, camera);

}

animate();