const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('no-results');
const searchQueryElement = document.getElementById('searchQuery');
const categoryContainer = document.querySelector('.categories');
const clearFiltersDiv = document.querySelector('.clear-filters');
const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');
const slider = document.getElementById('image-slider');
const gallerySection = document.getElementById('gallery-section'); // Seção da galeria
const categoriesMain = document.querySelector('.categories-main'); // Seção das categorias principais
const cartButton = document.getElementById('cart-button');
const closeCartButton = document.getElementById('close-cart-button');
const cartModal = document.getElementById('cart');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCounter = document.getElementById('cart-counter');
const aboutSections = document.querySelectorAll('.about'); // Seções sobre

let selectedCategory = null;
const cart = []; // Array para armazenar os produtos no carrinho

// Função para renderizar os produtos na tela
function renderProducts(products) {
  productGrid.innerHTML = '';

  if (products.length > 0) {
    noResults.style.display = 'none';
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <div class="icon">
          <img src="${product.image}" alt="${product.name}">
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
        </div>
        <h3 class="ProductName">${product.name}</h3>
        <p class="ProductPrice">R$ ${product.price.toFixed(2)}</p>
      `;
      productGrid.appendChild(productCard);
    });
  } else {
    noResults.style.display = 'block';
    searchQueryElement.textContent = searchInput.value;
  }
}

// Função para atualizar a visibilidade dos elementos
function updateVisibility(query) {
  const hasSearchQuery = query.trim() !== '';

  // Ocultando/mostrando os elementos conforme a busca
  slider.classList.toggle('hidden', hasSearchQuery);
  categoriesMain.classList.toggle('hidden', hasSearchQuery);
  gallerySection.classList.toggle('hidden', hasSearchQuery);
  aboutSections.forEach(element => {
    element.classList.toggle('hidden', hasSearchQuery);
  });
}

// Função de busca
function searchProducts(query) {
  const searchQuery = query.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery) &&
    (selectedCategory ? product.categoryId === selectedCategory : true)
  );

  renderProducts(filteredProducts);
  updateVisibility(query);

  // Mostrar a mensagem de "Nenhum resultado encontrado" se não houver produtos filtrados
  noResults.style.display = filteredProducts.length === 0 ? 'block' : 'none';
}

// Função de filtro
function filterProducts() {
  searchProducts(searchInput.value);
}

// Adiciona o evento de busca
searchInput.addEventListener('input', filterProducts);

// Função para selecionar uma categoria
function selectCategory(categoryId, element) {
  document.querySelectorAll('.category-card').forEach(card => card.classList.remove('active'));
  element.classList.add('active');
  selectedCategory = categoryId;
  filterProducts();
  clearFiltersDiv.style.display = 'flex';
}

// Função para limpar a seleção de categoria e a busca
function clearCategory() {
  selectedCategory = null;
  document.querySelectorAll('.category-card').forEach(card => card.classList.remove('active'));
  
  // Limpar o campo de pesquisa e a exibição de resultados
  searchInput.value = ''; // Limpa o campo de pesquisa
  searchProducts(''); // Reexecuta a busca com uma string vazia para mostrar todos os produtos
  
  // Esconde a mensagem de "Nenhum resultado encontrado" e a exibição de filtros
  clearFiltersDiv.style.display = 'none';
  
  // Limpa a query exibida
  searchQueryElement.textContent = '';
}

// Função para adicionar produto ao carrinho
function addToCart(productId) {
  const productToAdd = products.find(product => product.id === productId);

  if (!productToAdd) return;

  // Verifica se o produto já está no carrinho
  const productInCart = cart.find(item => item.id === productId);

  if (productInCart) {
    // Se já existir, aumenta a quantidade
    productInCart.quantity += 1;
  } else {
    // Caso contrário, adiciona o produto com quantidade inicial de 1
    cart.push({ ...productToAdd, quantity: 1 });
  }

  updateCartDisplay();
  animateCart();
}

// Função para atualizar o display do carrinho
function updateCartDisplay() {
  cartItemsElement.innerHTML = ''; // Limpa o conteúdo do carrinho
  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image">
      <div class="item-details">
        <h4>${item.name}</h4>
        <p class="item-price">R$ ${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    cartItemsElement.appendChild(listItem);

    // Atualiza o total
    total += item.price * item.quantity;
  });

  // Atualiza o valor total do carrinho
  cartTotalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

  // Atualiza o contador de itens no botão do carrinho
  cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.classList.add('bounce');
  setTimeout(() => cartCounter.classList.remove('bounce'), 600);
}

// Função para mudar a quantidade de um item no carrinho
function changeQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
    }
  }
}

// Função para remover produto do carrinho
function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1); // Remove o produto do carrinho
  }

  updateCartDisplay();
}

// Função para animar a abertura do modal do carrinho
function animateCart() {
  cartModal.classList.add('cart-slide-enter');
  setTimeout(() => cartModal.classList.remove('cart-slide-enter'), 300);
}

// Função para abrir o modal do carrinho
function openCart() {
  cartModal.classList.remove('hidden');
  animateCart();
}

// Função para fechar o modal do carrinho
function closeCart() {
  cartModal.classList.add('cart-slide-leave-to');
  setTimeout(() => {
    cartModal.classList.remove('cart-slide-leave-to');
    cartModal.classList.add('hidden');
  }, 300);
}

// Abrir o modal do carrinho ao clicar no botão do carrinho
cartButton.addEventListener('click', openCart);

// Fechar o modal do carrinho ao clicar no botão de fechar
closeCartButton.addEventListener('click', closeCart);

// Renderiza os produtos inicialmente
renderProducts(products);

// Função para rolar para a seção correspondente ao clicar no item do menu de navegação
document.querySelectorAll('.nav-container .pag ul li').forEach((item, index) => {
  item.addEventListener('click', () => {
    const sections = ['.image-slider', '.gal', '.about', 'footer'];
    const targetSection = document.querySelector(sections[index]);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
