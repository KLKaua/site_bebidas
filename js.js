// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update navigation links to use smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const drinkCards = document.querySelectorAll('.drink-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        drinkCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Order button functionality
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        const drinkName = this.closest('.drink-card').querySelector('h3').textContent;
        const price = this.closest('.drink-card').querySelector('.price').textContent;
        
        // Create WhatsApp message
        const message = `Olá! Tenho interesse em encomendar: ${drinkName} - ${price}`;
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp or show alert
        if (confirm(`Deseja encomendar ${drinkName}?`)) {
            window.open(whatsappUrl, '_blank');
        }
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Create WhatsApp message
    const whatsappMessage = `Olá! Meu nome é ${name}.
Email: ${email}
Telefone: ${phone}
Mensagem: ${message}`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.reset();
    
    alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(114, 47, 55, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all drink cards and sections
document.querySelectorAll('.drink-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Price formatting
document.querySelectorAll('.price').forEach(priceElement => {
    const price = priceElement.textContent;
    priceElement.textContent = price.replace('R$', 'R$ ');
});

// Add to cart functionality (for future implementation)
let cart = [];

function addToCart(drinkName, price) {
    cart.push({ name: drinkName, price: price });
    updateCartDisplay();
}

function updateCartDisplay() {
    // This function can be expanded for cart functionality
    console.log('Cart items:', cart);
}

// Search functionality (for future implementation)
function searchDrinks(query) {
    const cards = document.querySelectorAll('.drink-card');
    const searchQuery = query.toLowerCase();
    
    cards.forEach(card => {
        const drinkName = card.querySelector('h3').textContent.toLowerCase();
        const drinkDescription = card.querySelector('p').textContent.toLowerCase();
        
        if (drinkName.includes(searchQuery) || drinkDescription.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial animations
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Set initial filter
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    console.log('Premium Drinks website loaded successfully!');
});