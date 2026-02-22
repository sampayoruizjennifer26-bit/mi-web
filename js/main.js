function setLanguage(lang) {
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}
let cart = [];
let total = 0;
let cartCount = 0;

function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
  updateCartCount();
  saveCart();
  animateCart();
  showToast();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  total = 0; // 👈 USAMOS LA GLOBAL

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      <span>${item.name}</span>
      <div>
         <button onclick="changeCartQty(${index}, -1)">−</button>
         <span>${item.qty}</span>
         <button onclick="changeCartQty(${index}, 1)">+</button>
      </div>
      <strong>$${(item.price * item.qty).toLocaleString()} COP</strong>
      <button class="remove-item" onclick="removeItem(${index})">x</button>
    `;

    

    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: $${total.toLocaleString()} COP`;
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  updateCartCount();
  saveCart();
}
function checkout() {
  let message = "Hola 👋✨\n";
  message += "Me interesa realizar la siguiente compra en *EJBAGS*:\n\n";

  cart.forEach(item => {
    message += `👜 ${item.name} — $${item.price.toLocaleString()} COP\n`;
  });

  message += `\n💰 *Total:* $${total.toLocaleString()} COP\n\n`;
  message += "Quedo atento(a) para confirmar disponibilidad y envío. 🤍";

  window.open(`https://wa.me/573218094980?text=${encodeURIComponent(message)}`);
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


function animateCart() {
  const cart = document.querySelector(".cart-float");
  if (!cart) return;

  cart.classList.add("bounce");

  setTimeout(() => {
    cart.classList.remove("bounce");
  }, 400);
}
function openCart() {
  document.getElementById("cart-panel").classList.add("open");
  document.getElementById("cart-overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cart-panel").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("show");
}
function changeCartQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
  updateCartCount();
  saveCart();
}
function updateCartCount() {
  const cartCountEl = document.getElementById("cart-count");
  if (!cartCountEl) return;

  let count = 0;

  cart.forEach(item => {
    count += item.qty;
  });

  cartCountEl.textContent = count;
}
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
  updateCartCount();
  saveCart();
}
function saveCart() {
  localStorage.setItem("ejbags_cart", JSON.stringify(cart));
}
function loadCart() {
  const savedCart = localStorage.getItem("ejbags_cart");

  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
    updateCartCount();
  }
}
loadCart();

function acceptCookies() {
  localStorage.setItem("ejbags_cookies", "accepted");
  document.getElementById("cookie-banner").style.display = "none";
}

function declineCookies() {
  localStorage.setItem("ejbags_cookies", "declined");
  document.getElementById("cookie-banner").style.display = "none";
}

function checkCookies() {
  const choice = localStorage.getItem("ejbags_cookies");

  if (!choice) {
    document.getElementById("cookie-banner").style.display = "flex";
  }
}

// Ejecutar al cargar la página
checkCookies();



const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", closeMenu);

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// CERRAR MENÚ AL HACER CLICK EN UN LINK
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {

  let lastScrollTop = 0;
  const header = document.querySelector(".header");

  if (!header) return;

  window.addEventListener("scroll", () => {

    let currentScroll = window.pageYOffset;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

  });

});





const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".brand-slider .dot");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = (current + 1) % slides.length;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
}, 4000);

function toggleBolsos() {
  const bolsos = document.getElementById("listaBolsos");
  const boton = document.getElementById("btnBolsos");

  if (bolsos.style.display === "none") {
    bolsos.style.display = "grid";
    boton.textContent = "Ocultar Bolsos";
  } else {
    bolsos.style.display = "none";
    boton.textContent = "Ver Bolsos";
  }
}

const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalQty = document.getElementById("modalQty");

let quantity = 1;

let currentProduct = {
    title: "",
    price: 0
};


function openModal(image, title, price, colors = []) {

  modal.style.display = "flex";
  modalImage.src = image;
  modalTitle.textContent = title;
  modalPrice.textContent = price;

  /* 🔥 PUNTOS DE COLOR */
  const modalDots = document.getElementById("modalDots");
  modalDots.innerHTML = "";

  colors.forEach(color=>{
    const dot = document.createElement("span");
    dot.style.background = color.trim();
    modalDots.appendChild(dot);
  });

  currentProduct.title = title;
  currentProduct.price = parseInt(price.replace(/[^0-9]/g, ""));

  quantity = 1;
  modalQty.textContent = quantity;
}

function changeQty(amount) {
  quantity += amount;
  if (quantity < 1) quantity = 1;
  modalQty.textContent = quantity;
}



window.onclick = function(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

function closeModal() {
    modal.style.display = "none";
}

function addToCartFromModal() {
    addToCart(currentProduct.title, currentProduct.price * quantity);
    closeModal();
}

function buyNow() {

  const telefono = "573218094980"; // ← AQUÍ pon tu número real con código país (57 Colombia)
  
  const mensaje = `Hola, quiero comprar:
Producto: ${currentProduct.title}
Cantidad: ${quantity}
Total: $${currentProduct.price * quantity} COP`;

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");

}

/* ===== SLIDER DESTACADOS AUTOMÁTICO ===== */

const featuredSlides = document.querySelectorAll(".featured-slide");
let indexFeatured = 0;

function changeFeaturedSlide(){
  featuredSlides.forEach(slide => slide.classList.remove("active"));

  indexFeatured++;
  if(indexFeatured >= featuredSlides.length){
    indexFeatured = 0;
  }

  featuredSlides[indexFeatured].classList.add("active");
  updateFeaturedInfo(indexFeatured);
}

let featuredInterval = setInterval(changeFeaturedSlide, 3500);



/* ===== DATOS PRODUCTOS ===== */

const products = {
  1:{img:"assets/images/destacados/destacado1.jpg", title:"Bolso Elegance Cruzado Verde", price:65000},
  2:{img:"assets/images/destacados/destacado2.jpg", title:"Bolso Elegante Cruzado Blanco", price:65000},
  3:{img:"assets/images/destacados/destacado3.jpg", title:"Bolso Elegante Leopardo", price:30000},
};


function openFeatured(el){

  const src = el.getAttribute("src");
  const title = el.getAttribute("data-title");
  const price = parseInt(el.getAttribute("data-price"));
  const colors = el.dataset.colors ? el.dataset.colors.split(",") : [];

  openModal(src, title, "$" + price.toLocaleString() + " COP", colors);

  currentProduct.title = title;
  currentProduct.price = price;

  const index = [...featuredSlides].indexOf(el);
  updateFeaturedInfo(index);
}

const featuredTitle = document.getElementById("featuredTitle");
const featuredPrice = document.getElementById("featuredPrice");
const featuredDots = document.getElementById("featuredDots");

function updateFeaturedInfo(index){

  const slide = featuredSlides[index];

  const title = slide.dataset.title;
  const price = slide.dataset.price;
  const colors = slide.dataset.colors.split(",");

  featuredTitle.textContent = title;
  featuredPrice.textContent = "$" + Number(price).toLocaleString() + " COP";

  featuredDots.innerHTML = "";

  colors.forEach(color=>{
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.background = color;
    featuredDots.appendChild(dot);
  });

}
updateFeaturedInfo(0);

function openCollection(el){

  const src = el.src;
  const title = el.dataset.title;
  const price = parseInt(el.dataset.price);
  const colors = el.dataset.colors ? el.dataset.colors.split(",") : [];

  openModal(src, title, "$" + price.toLocaleString() + " COP", colors);

  currentProduct.title = title;
  currentProduct.price = price;
}

function closeMenu(){
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
}