// Thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    // Lấy giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1; // Tăng số lượng nếu đã có
    } else {
        cart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Thông báo thêm thành công
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

// Lắng nghe sự kiện click vào nút "Thêm vào giỏ hàng"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Tìm phần tử cha chứa thông tin sản phẩm
        const productCard = button.closest('.card-body');

        // Lấy tên sản phẩm
        const name = productCard.querySelector('h5.card-title > a').textContent;

        // Lấy giá sản phẩm và chuyển thành số
        const priceText = productCard.querySelector('p.product-price').textContent;
        const price = parseFloat(priceText.replace(/[^\d]/g, ''));

        // Tạo đối tượng sản phẩm
        const product = { name, price };

        // Thêm sản phẩm vào giỏ hàng
        addToCart(product);
    });
});