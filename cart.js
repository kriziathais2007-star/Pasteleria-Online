// ==== CARRITO COMPLETO ====
const cart = [];
const cartButton = document.getElementById('cart-button');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout');

// Mostrar/Ocultar carrito
cartButton.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});
closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

// Seleccionar todos los botones de "Comprar"
const buyButtons = document.querySelectorAll('.btn-2');

buyButtons.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const product = button.closest('.product1');
    const name = product.querySelector('h3').textContent;
    const priceText = product.querySelector('.price p').textContent.replace('S/', '').trim();
    const price = parseFloat(priceText);

    addToCart(name, price);
  });
});

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCart();
}

function removeFromCart(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty">No hay productos en tu carrito.</p>';
    cartTotal.textContent = 'S/0.00';
    cartCount.textContent = '0';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>S/${item.price.toFixed(2)} x ${item.qty}</p>
      </div>
      <button data-name="${item.name}">Eliminar</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `S/${total.toFixed(2)}`;
  cartCount.textContent = cart.length;

  // Evento de eliminar producto
  document.querySelectorAll('.cart-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      removeFromCart(name);
    });
  });
}

// === BOTÓN DE PAGAR: MOSTRAR MODAL CON QR ===
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  // Calcular total
  let total = 0;
  cart.forEach(item => total += item.price * item.qty);

  // Mostrar modal
  const modal = document.getElementById('modalPago');
  const textoMonto = document.getElementById('textoMonto');
  const imgQR = document.getElementById('imgQR');
  const cerrarModal = document.getElementById('cerrarModal');

  // Mostrar tu imagen QR
  imgQR.src = 'Image/pago_qr.jpg'; // 👈 cambia si tu QR tiene otro nombre o carpeta

  // Mostrar el monto total
  textoMonto.textContent = `Monto a pagar: S/${total.toFixed(2)}`;

  // Mostrar modal
  modal.style.display = 'block';

  // Cerrar modal
  cerrarModal.onclick = () => {
    modal.style.display = 'none';
  };
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
  };

  // Vaciar carrito
  cart.length = 0;
  updateCart();
});




document.getElementById("form-suscripcion").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("mensaje").classList.remove("oculto");
});

const estrellas = document.querySelectorAll(".estrella");
const resultado = document.getElementById("resultado");

estrellas.forEach(estrella => {
  estrella.addEventListener("click", () => {
    const valor = estrella.getAttribute("data-valor");

    estrellas.forEach(e => {
      e.classList.toggle("seleccionada", e.getAttribute("data-valor") <= valor);
    });

    resultado.textContent = `Gracias por calificarnos con ${valor} ${valor == 1 ? "estrella" : "estrellas"} ⭐`;
  });
});
