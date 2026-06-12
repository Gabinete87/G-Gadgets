let cart = [];
let total = 0;

// Base de datos interna con ambos valores comerciales claros
const productDetails = {
    notebook: {
        title: "Soporte Ergonómico para Notebook",
        price: 22000,
        transferPrice: 24200,
        img: "soporte.jpg",
        desc: "Este soporte estructural está diseñado mecánicamente para elevar tu laptop a la altura ideal de los ojos, reduciendo drásticamente la tensión en el cuello y la espalda. Fabricado con materiales altamente duraderos, su diseño abierto permite un flujo de aire óptimo, evitando que el equipo junte calor y ayudando a prolongar la vida útil de los componentes internos de tu computadora."
    },
    celular: {
        title: "Soporte Celular Aluminio",
        price: 22000,
        transferPrice: 24200,
        img: "soporteCal.jpg",
        desc: "Construido enteramente en aleación de aluminio pulido de grado premium, este soporte ofrece una estabilidad inigualable para tu smartphone. Cuenta con almohadillas de silicona antideslizantes para proteger el dispositivo de cualquier raya y un ángulo de inclinación perfectamente balanceado para facilitar videollamadas fluidas, ver contenido en streaming o mantener tus notificaciones siempre bajo control en el escritorio."
    },
    tablet: {
        title: "Soporte Tablet Aluminio",
        price: 20000,
        transferPrice: 22000,
        img: "soporteTal.jpg",
        desc: "La solución definitiva para organizar tu espacio de estudio o trabajo con dispositivos más grandes. Su base pesada garantiza que tanto tablets como iPads de cualquier tamaño se mantengan firmes en posición vertical u horizontal. Ideal para diseñadores, estudiantes que siguen apuntes digitales o para usar tu tablet como pantalla secundaria de manera segura y profesional."
    }
};

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

function addToCart(name, price) {
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
                    <p style="color: var(--text-muted); font-size: 0.85rem;">${item.quantity}x - $${item.price.toLocaleString('es-AR')}</p>
                </div>
                <span style="font-weight: bold; color: var(--orange);">$${itemTotal.toLocaleString('es-AR')}</span>
            </div>
        `;
    });
    
    cartCount.innerText = totalItems;
    cartTotalVal.innerText = `$${total.toLocaleString('es-AR')}`;
}

function openModal(productId) {
    const product = productDetails[productId];
    if (!product) return;

    document.getElementById('modal-title').innerText = product.title;
    document.getElementById('modal-price').innerText = `$${product.price.toLocaleString('es-AR')}`;
    document.getElementById('modal-transfer-price').innerText = `o Transferencia: $${product.transferPrice.toLocaleString('es-AR')}`;
    document.getElementById('modal-img').src = product.img;
    document.getElementById('modal-desc').innerText = product.desc;

    const actionContainer = document.getElementById('modal-action-container');
    actionContainer.innerHTML = `
        <button class="btn-add-cart" style="background-color: var(--blue-light); color: white; padding: 12px; font-size: 1rem;" onclick="addToCart('${product.title}', ${product.price}); closeModal(); toggleCart();">
            <i class="fas fa-cart-plus"></i> Añadir al Carrito
        </button>
    `;

    document.getElementById('product-modal').style.display = "flex";
}

function closeModal() {
    document.getElementById('product-modal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert('¡Tu carrito está vacío!');
    
    const phoneNumber = "5493412015514"; 
    
    let message = `¡Hola G-Gadgets! 👋 Quiero realizar un pedido:\n\n`;
    
    cart.forEach(item => {
        message += `• ${item.quantity}x ${item.name} ($${item.price.toLocaleString('es-AR')} c/u efectivo)\n`;
    });
    
    message += `\n💰 *Total estimado (Efectivo):* $${total.toLocaleString('es-AR')}\n`;
    message += `🛵 *Envío:* Gratis dentro de Rosario.\n\n`;
    message += `¿Coordinamos el horario de entrega para abonar en efectivo, o prefieren que les pase datos de transferencia?`;
    
    const urlMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${urlMessage}`;
    
    window.open(whatsappUrl, '_blank');
}
