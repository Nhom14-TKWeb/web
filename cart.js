// Lấy dữ liệu giỏ hàng từ LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Lưu giỏ hàng vào LocalStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Hiển thị giỏ hàng
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = ''; // Làm sạch giỏ hàng trước khi hiển thị lại

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>
                    <button class="decrease-quantity" data-id="${item.name}">-</button>
                    ${item.quantity}
                    <button class="increase-quantity" data-id="${item.name}">+</button>
                </td>
                <td>${item.price.toLocaleString()} VND</td>
                <td>${itemTotal.toLocaleString()} VND</td>
                <td><button class="remove-item" data-id="${item.name}">Xóa</button></td>
            </tr>
        `;
        cartItemsContainer.innerHTML += row;
    });

    cartTotalElement.textContent = totalPrice.toLocaleString();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(id, change) {
    const cart = getCart();
    const product = cart.find(item => item.name === id);

    if (product) {
        product.quantity += change;

        if (product.quantity <= 0) {
            const index = cart.indexOf(product);
            cart.splice(index, 1);
        }

        saveCart(cart);
        renderCart();
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(id) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.name !== id);
    saveCart(updatedCart);
    renderCart();
}

// Gắn sự kiện cho các nút
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('increase-quantity')) {
        const id = event.target.getAttribute('data-id');
        updateQuantity(id, 1);
    }

    if (event.target.classList.contains('decrease-quantity')) {
        const id = event.target.getAttribute('data-id');
        updateQuantity(id, -1);
    }

    if (event.target.classList.contains('remove-item')) {
        const id = event.target.getAttribute('data-id');
        removeItem(id);
    }
});

// Hiển thị giỏ hàng khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});