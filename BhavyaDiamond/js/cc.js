function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = getCart();
  const summary = document.getElementById("items");
  const totalSpan = document.getElementById("total");

  let total = 0;

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>₹ ${numberWithCommas(item.price * item.qty)}</span>
    `;

    summary.appendChild(div);
  });

  totalSpan.innerText = numberWithCommas(total);
});
