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
        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
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
function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('active');
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
function changeQty(index, change) {
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

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("introVideo");
  const videoContainer = document.querySelector(".hero-video");

  if (!video || !videoContainer) return;

  // Cuando el video termina
  video.addEventListener("ended", () => {
    videoContainer.classList.add("hide");
  });

  // Asegurar autoplay real
  video.play().catch(() => {
    // Si el navegador bloquea el autoplay
    setTimeout(() => {
      videoContainer.classList.add("hide");
    }, 5000);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  overlay.classList.remove("active");
});