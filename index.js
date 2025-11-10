// Altera menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// fecha o menu ao clicar no link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// scroll da pagina "deixa a pagina mais suave / leve"
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// // Atualizar links de navegação para usar rolagem suave
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const targetId = this.getAttribute('href').substring(1);
//         scrollToSection(targetId);
//     });
// });

// filtros e funcoes
const filterButtons = document.querySelectorAll('.filter-btn');
const drinkCards = document.querySelectorAll('.drink-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe ativa de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // // Adicionar classe ativa ao botão clicado
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

// Funcionalidade do botão de pedido
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        const drinkName = this.closest('.drink-card').querySelector('h3').textContent;
        const price = this.closest('.drink-card').querySelector('.price').textContent;
        
// Criar mensagem do WhatsApp
        const message = `Olá! Tenho interesse em encomendar: ${drinkName} - ${price}`;
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        
        // // Abra o WhatsApp ou mostre o alerta

        if (confirm(`Deseja encomendar ${drinkName}?`)) {
            window.open(whatsappUrl, '_blank');
        }
    });
});

// // Envio do formulário de contato
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // // Criar mensagem do WhatsApp
    const whatsappMessage = `Olá! Meu nome é ${name}.
Email: ${email}
Telefone: ${phone}
Mensagem: ${message}`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
    
    // abre wpp
    window.open(whatsappUrl, '_blank');
    
    // Reseta forms
    this.reset();
    
    alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
});

// Adicionar efeito de rolagem ao cabeçalho
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

// Observador de interseção para animações
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

// Observe todos os cartões de bebidas e seções
document.querySelectorAll('.drink-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Adicionar animação de carregamento
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// // Formatação de preços
document.querySelectorAll('.price').forEach(priceElement => {
    const price = priceElement.textContent;
    priceElement.textContent = price.replace('R$', 'R$ ');
});

// // Funcionalidade de adicionar ao carrinho (para implementação futura)
let cart = [];

function addToCart(drinkName, price) {
    cart.push({ name: drinkName, price: price });
    updateCartDisplay();
}

function updateCartDisplay() {
    // Esta função pode ser expandida para funcionalidade de carrinho
    console.log('Cart items:', cart);
}

// Funcionalidade de pesquisa (para implementação futura)
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

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    // Definir animações iniciais
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // // Definir filtro inicial
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    console.log('Premium Drinks website loaded successfully!');
});