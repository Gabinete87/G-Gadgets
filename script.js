let cart = [];
let total = 0;

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

function addToCart(name, price) {
    // Buscar si el producto ya existe en el carrito
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalVal = document.getElementById('cart-total-val');
    
    // Si está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">El carrito está vacío.</p>';
        cartCount.innerText = '0';
        cartTotalVal.innerText = '$0';
        total = 0;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    total = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;
        
        cartItemsContainer.innerHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px;">
                <div>
                    <h4 style="font-size: 0.95rem;">${item.name}</h4>
                    <p style="color: var(--text-muted); font-size: 0.85rem;">${item.quantity}x - $${item.price}</p>
                </div>
                <span style="font-weight: bold; color: var(--orange);">$${itemTotal}</span>
            </div>
        `;
    });
    
    cartCount.innerText = totalItems;
    cartTotalVal.innerText = `$${total}`;
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert('¡Tu carrito está vacío!');
    
    // Configura acá tu número de teléfono (código de país + área + número sin el 15)
    // Ejemplo Argentina, Rosario: 549341XXXXXXX
    const phoneNumber = "5493412345678"; 
    
    let message = `¡Hola G-Gadgets! 👋 Quiero realizar un pedido:\n\n`;
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} ($${item.price} c/u)\n`;
    });
    
    message += `\n💰 *Total:* $${total}\n`;
    message += `🛵 *Envío:* Gratis dentro de Rosario.\n\n`;
    message += `¿Me podrían pasar los datos para la transferencia o coordinar un Plan de Compra? Gracias!`;
    
    // Codificar mensaje para URL
    const urlMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${urlMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
}
