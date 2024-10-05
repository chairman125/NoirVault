document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const bagCountElement = document.getElementById('bag-count');

    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('bag')) || [];
        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            // 각 속성이 undefined일 경우 기본값 설정
            const img = item.img || 'default.jpg'; // 기본 이미지
            const name = item.name || 'No Name';
            const description = item.description || '';
            const quantity = item.quantity || 1;
            const price = item.onSale ? item.salePrice : item.price;

            row.innerHTML = `
                <td><input type="checkbox" checked></td>
                <td>
                    <img src="${img}" alt="${name}" class="cart-product-img">
                    <div class="product-details">
                        <p>${name}</p>
                        <p>${description}</p>
                    </div>
                </td>
                <td>
                    <div class="quantity-control">
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <input type="text" value="${quantity}" data-index="${index}" class="quantity-input">
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                </td>
                <td>$${price}</td>
                <td>Free Shipping</td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        updateBagCount();
    }

    function updateBagCount() {
        const cart = JSON.parse(localStorage.getItem('bag')) || [];
        bagCountElement.textContent = cart.length;
    }

    function updateQuantity(index, newQuantity) {
        const cart = JSON.parse(localStorage.getItem('bag')) || [];
        cart[index].quantity = newQuantity;
        localStorage.setItem('bag', JSON.stringify(cart));
        loadCartItems();
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('bag')) || [];
        cart.splice(index, 1);
        localStorage.setItem('bag', JSON.stringify(cart));
        loadCartItems();
    }

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('decrease-quantity')) {
            const index = event.target.getAttribute('data-index');
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let quantity = parseInt(input.value);
            if (quantity > 1) {
                quantity -= 1;
                input.value = quantity;
                updateQuantity(index, quantity);
            }
        }

        if (event.target.classList.contains('increase-quantity')) {
            const index = event.target.getAttribute('data-index');
            const input = document.querySelector(`.quantity-input[data-index="${index}"]`);
            let quantity = parseInt(input.value);
            quantity += 1;
            input.value = quantity;
            updateQuantity(index, quantity);
        }

        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            removeItem(index);
        }
    });

    cartItemsContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const index = event.target.getAttribute('data-index');
            let quantity = parseInt(event.target.value);
            if (quantity < 1) {
                quantity = 1;
            }
            event.target.value = quantity;
            updateQuantity(index, quantity);
        }
    });

    loadCartItems();
});
