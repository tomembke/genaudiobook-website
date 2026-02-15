/* ============================================
   GenAudioBook — Website Scripts
   Language toggle, FAQ accordion, scroll animations
   ============================================ */

// --- LANGUAGE TOGGLE ---
let currentLang = 'de';

function setLang(lang) {
    currentLang = lang;

    // Update toggle buttons
    document.getElementById('langDe').classList.toggle('active', lang === 'de');
    document.getElementById('langEn').classList.toggle('active', lang === 'en');

    // Update html lang attribute
    document.documentElement.lang = lang === 'de' ? 'de' : 'en';

    // Update all translatable elements
    document.querySelectorAll('[data-de][data-en]').forEach(el => {
        const text = lang === 'de' ? el.getAttribute('data-de') : el.getAttribute('data-en');
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update page title
    document.title = lang === 'de'
        ? 'GenAudioBook — KI Hörbuch Generator für Mac | EPUB zu Audiobook'
        : 'GenAudioBook — AI Audiobook Generator for Mac | EPUB to Audiobook';

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = lang === 'de'
            ? 'Verwandle jedes EPUB, PDF oder Textdokument in ein professionelles Hörbuch — 100% lokal auf deinem Mac. 6 KI-Stimmen, 17+ Sprachen, Voice Cloning. 24h kostenlos testen.'
            : 'Turn any EPUB, PDF or text document into a professional audiobook — 100% local on your Mac. 6 AI voices, 17+ languages, voice cloning. 24h free trial.';
    }

    // Update pricing badge
    const featuredCard = document.querySelector('.pricing-card.featured');
    if (featuredCard) {
        featuredCard.setAttribute('data-badge', lang === 'de' ? 'EMPFOHLEN' : 'RECOMMENDED');
    }

    // Save preference
    try { localStorage.setItem('gab-lang', lang); } catch(e) {}
}

// Restore saved language on load
(function() {
    try {
        const saved = localStorage.getItem('gab-lang');
        if (saved === 'en') {
            setLang('en');
        }
    } catch(e) {}

    // Auto-detect browser language
    if (!localStorage.getItem('gab-lang')) {
        const browserLang = navigator.language || navigator.userLanguage || 'de';
        if (!browserLang.startsWith('de')) {
            setLang('en');
        }
    }
})();


// --- FAQ ACCORDION ---
function toggleFaq(button) {
    const item = button.parentElement;
    const wasOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
    });

    // Toggle clicked
    if (!wasOpen) {
        item.classList.add('open');
    }
}


// --- MOBILE NAV ---
function toggleMobileNav() {
    document.getElementById('navLinks').classList.toggle('open');
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
    });
});


// --- SCROLL FADE-IN ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


// --- NAVBAR SCROLL EFFECT ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        navbar.style.borderBottomColor = 'var(--border)';
    } else {
        navbar.style.borderBottomColor = 'transparent';
    }

    lastScroll = scrollY;
}, { passive: true });
