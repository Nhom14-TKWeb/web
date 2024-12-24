document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.querySelector('.btn.btn-default i.fa-cart-plus')?.parentElement;

    if (cartButton) {
        cartButton.addEventListener('click', function () {
            try {
                // Lấy thông tin sản phẩm từ giao diện
                const productNameElement = document.querySelector('.card-title');
                const productPriceElement = document.querySelector('.card-title + h5');
                const quantitySelect = document.querySelector('#inlineFormSelectPref');
                const productImageElement = document.querySelector('.card-img-top');

                if (!productNameElement || !productPriceElement || !quantitySelect || !productImageElement) {
                    alert('Không tìm thấy thông tin sản phẩm trên giao diện!');
                    return;
                }

                const productName = productNameElement.textContent.trim();
                const productPrice = parseFloat(
                    productPriceElement.textContent.trim().replace('Giá:', '').replace('VND', '').replace(/,/g, '')
                );
                const quantity = parseInt(quantitySelect.value, 10);
                const productImage = productImageElement.src;

                // Kiểm tra thông tin hợp lệ
                if (isNaN(productPrice) || isNaN(quantity) || quantity <= 0 || !productName || !productImage) {
                    alert('Thông tin sản phẩm không hợp lệ!');
                    return;
                }

                // Lấy giỏ hàng từ localStorage
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
                const existingProductIndex = cart.findIndex(item => item.name === productName);

                if (existingProductIndex !== -1) {
                    cart[existingProductIndex].quantity += quantity; // Cộng dồn số lượng
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        quantity: quantity,
                        image: productImage
                    });
                }

                // Lưu giỏ hàng vào localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`Đã thêm ${quantity} x ${productName} vào giỏ hàng!`);
            } catch (error) {
                console.error('Lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:', error);
                alert('Đã xảy ra lỗi. Vui lòng thử lại!');
            }
        });
    } else {
        console.error('Không tìm thấy nút thêm vào giỏ hàng.');
    }
});
