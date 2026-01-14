// js/cart.js
// Robust Cart System: add, render, update qty, remove, total, checkout

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price, img = "", meta = {}) {
  let cart = getCart();
  // Check if item already exists (same name + price)
  let existing = cart.find(item => item.name === name && item.price === Number(price));
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: Date.now() + Math.floor(Math.random() * 999), // unique id
      name,
      price: Number(price),
      img,
      meta,
      qty: 1
    });
  }
  saveCart(cart);
  alert(`${name} added to cart`);
  updateCartCount();
}

// Update cart count badge
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count-badge");
  if (badge) badge.innerText = count;
}

// Format item meta data (carat, color, metal)
function formatMeta(meta) {
  if (!meta) return "";
  const parts = [];
  if (meta.carat) parts.push(`${meta.carat} CT`);
  if (meta.color) parts.push(`${meta.color}`);
  if (meta.metal) parts.push(`${meta.metal}`);
  return parts.join(" • ");
}

// Format numbers with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Render cart on cart.html
function renderCart(containerId = "cartItems", totalId = "totalAmount") {
  const cart = getCart();
  const container = document.getElementById(containerId);
  const totalEl = document.getElementById(totalId);
  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    if (totalEl) totalEl.innerText = "0";
    updateCartCount();
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-row";
    div.style.borderBottom = "1px solid #ffffff40";
    div.style.padding = "12px 0";
    div.innerHTML = `
      <div style="display:flex; gap:12px; align-items:center;">
        <img src="${item.img}" alt="${item.name}" style="width:110px;height:80px;object-fit:cover;border-radius:8px;">
        <div style="flex:1">
          <div style="font-weight:700">${item.name}</div>
          <div style="font-size:0.95rem;color:#cfcfcf">${formatMeta(item.meta)}</div>
          <div style="margin-top:8px">₹ ${numberWithCommas(item.price)} each</div>
        </div>
        <div style="width:160px;text-align:center">
          <button onclick="changeQty(${item.id}, -1)" style="padding:6px 8px;margin-right:6px">-</button>
          <span id="qty-${item.id}" style="font-weight:700">${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)" style="padding:6px 8px;margin-left:6px">+</button>
        </div>
        <div style="width:140px;text-align:right">
          <div style="font-weight:700">₹ ${numberWithCommas(item.price * item.qty)}</div>
          <div style="margin-top:8px">
            <button onclick="removeItem(${item.id})" style="padding:6px 8px;background:#ff4d4d;color:#fff;border:none;border-radius:6px;cursor:pointer">Remove</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  if (totalEl) totalEl.innerText = numberWithCommas(total);
  updateCartCount();
}

// Change quantity of a cart item
function changeQty(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty < 1) cart[idx].qty = 1; // optional: remove instead if qty=0
  saveCart(cart);
  renderCart();
}

// Remove an item from cart
function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

// Clear cart completely
function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
}

// Handle checkout form submission
function checkoutFinish(event) {
  event.preventDefault();
  const form = document.getElementById("checkout-form");
  const name = form.elements["name"].value.trim();
  const phone = form.elements["phone"].value.trim();
  const address = form.elements["address"].value.trim();
  if (!name || !phone || !address) {
    alert("Please fill the required fields.");
    return;
  }

  alert(`Thank you, ${name}. Your order has been placed.`);
  clearCart();
  window.location.href = "index.html";
}

// Update cart count badge on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
