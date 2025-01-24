const menuItems = {
    bebidas: [
        {
            id: 1,
            nome: "Café Espresso",
            preco: 5.50,
            imagem: "IMAGENS/CAFÉ EXPRESSO.jpg",
            descricao: "Café espresso tradicional"
        },
        {
            id: 2,
            nome: "Café com Leite",
            preco: 6.90,
            imagem: "IMAGENS/CAFÉ COM LEITE.jpg",
            descricao: "Café com leite cremoso"
        },
        {
            id: 3,
            nome: "Cappuccino",
            preco: 8.90,
            imagem: "IMAGENS/CAPUCCINO.jpg",
            descricao: "Café com leite vaporizado e espuma"
        },
        {
            id: 4,
            nome: "Latte",
            preco: 9.90,
            imagem: "IMAGENS/LATTE.jpg",
            descricao: "Café com leite e arte latte"
        },
        {
            id: 5,
            nome: "Mocha",
            preco: 10.90,
            imagem: "IMAGENS/MOCHA.jpg",
            descricao: "Café com chocolate e leite vaporizado"
        },
        {
            id: 6,
            nome: "Café Pingado",
            preco: 5.90,
            imagem: "IMAGENS/CAFE PINGADO.jpg",
            descricao: "Café com um toque de leite"
        },
        {
            id: 7,
            nome: "Espresso Italiano",
            preco: 6.50,
            imagem: "IMAGENS/EXPRESSO ITALIANO.jpg",
            descricao: "Café espresso estilo italiano"
        },
        {
            id: 8,
            nome: "Café Gelado",
            preco: 11.90,
            imagem: "IMAGENS/CAFÉ GELADO.jpg",
            descricao: "Café gelado com cubos de gelo"
        },
        {
            id: 9,
            nome: "Chá Gelado",
            preco: 8.90,
            imagem: "IMAGENS/CHÁ GELADO.jpg",
            descricao: "Chá gelado da casa"
        },
        {
            id: 10,
            nome: "Chá Quente",
            preco: 7.90,
            imagem: "IMAGENS/CHÁ QUENTE.jpg",
            descricao: "Chá quente (diversos sabores)"
        },
        {
            id: 11,
            nome: "Mocha Branco",
            preco: 11.90,
            imagem: "IMAGENS/MOCHA BRANCO.jpg",
            descricao: "Café com chocolate branco e leite vaporizado"
        }
    ],
    cookies: [
        {
            id: 12,
            nome: "Cookie de Chocolate",
            preco: 6.50,
            imagem: "IMAGENS/COOKIE DE CHOCOLATE.jpg",
            descricao: "Cookie com gotas de chocolate"
        },
        {
            id: 13,
            nome: "Cookie Red Velvet",
            preco: 7.50,
            imagem: "IMAGENS/COOKIE REDVELVET.jpg",
            descricao: "Cookie vermelho com gotas brancas"
        },
        {
            id: 14,
            nome: "Brownie Tradicional",
            preco: 8.50,
            imagem: "IMAGENS/BROUWNIE.jpg",
            descricao: "Brownie tradicional com chocolate"
        },
        {
            id: 15,
            nome: "Brownie Recheado",
            preco: 9.50,
            imagem: "IMAGENS/BROUWNIE RECHEADO.jpg",
            descricao: "Brownie recheado com Nutella"
        },
        {
            id: 16,
            nome: "Brownie Caramelo",
            preco: 9.50,
            imagem: "IMAGENS/BROUWNIE CARAMELO.jpg",
            descricao: "Brownie com cobertura de caramelo"
        },
        {
            id: 17,
            nome: "Brownie Caramelo Salgado",
            preco: 10.50,
            imagem: "IMAGENS/BROUWNIE CARAMELO SALGADO.jpg",
            descricao: "Brownie com caramelo salgado e flor de sal"
        }
    ]
};

let carrinho = [];

// Função para renderizar os itens do menu
function renderizarMenu() {
    const bebidasGrid = document.querySelector('#bebidas .items-grid');
    const cookieGrid = document.querySelector('#cookies .items-grid');

    menuItems.bebidas.forEach(item => {
        bebidasGrid.innerHTML += criarCardItem(item);
    });

    menuItems.cookies.forEach(item => {
        cookieGrid.innerHTML += criarCardItem(item);
    });
}

function criarCardItem(item) {
    return `
        <div class="item-card">
            <img src="${item.imagem}" alt="${item.nome}">
            <h4>${item.nome}</h4>
            <p>${item.descricao}</p>
            <p class="preco">R$ ${item.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${item.id})">Adicionar ao Carrinho</button>
        </div>
    `;
}

function adicionarAoCarrinho(id) {
    const item = [...menuItems.bebidas, ...menuItems.cookies].find(item => item.id === id);
    if (item) {
        carrinho.push(item);
        atualizarContadorCarrinho();
    }
}

function atualizarContadorCarrinho() {
    document.getElementById('cart-count').textContent = carrinho.length;
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + item.preco, 0);
}

// Eventos
document.querySelector('.cart-icon').addEventListener('click', () => {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = carrinho.map(item => `
        <div class="cart-item">
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
        </div>
    `).join('');

    cartTotal.innerHTML = `<h4>Total: R$ ${calcularTotal().toFixed(2)}</h4>`;
    modal.style.display = 'block';
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    const paymentMethod = document.getElementById('payment-method').value;
    const total = calcularTotal();
    
    if (paymentMethod === 'pix') {
        // Aqui você deve integrar com uma API real de pagamento
        // Este é apenas um exemplo simulado
        const pixModal = document.getElementById('pix-modal');
        const qrCode = document.getElementById('qr-code');
        
        // Simular geração de QR Code
        qrCode.innerHTML = `
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX${total}" 
                 alt="QR Code PIX" 
                 style="width: 100%; height: 100%;">
        `;
        
        document.getElementById('cart-modal').style.display = 'none';
        pixModal.style.display = 'block';
    } else {
        alert(`Pedido finalizado! Forma de pagamento: ${paymentMethod}`);
        document.getElementById('cart-modal').style.display = 'none';
    }
    
    carrinho = [];
    atualizarContadorCarrinho();
});

// Adicionar função para fechar o modal quando clicar fora
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    const pixModal = document.getElementById('pix-modal');
    
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target === pixModal) {
        pixModal.style.display = 'none';
    }
}

// Inicializar
window.onload = () => {
    renderizarMenu();
}; 