document.addEventListener('DOMContentLoaded', function() {
    const productElement = document.querySelector('.product-detail');
    const product = {
        name: productElement.getAttribute('data-name'),
        category: productElement.getAttribute('data-category'),
        url: productElement.getAttribute('data-url'),
        img: productElement.getAttribute('data-img'),
        price: parseFloat(productElement.getAttribute('data-price')),
        onSale: productElement.getAttribute('data-onSale') === 'true',
        salePrice: parseFloat(productElement.getAttribute('data-salePrice'))
    };

    const productPriceElement = document.getElementById('product-price');
    const addToCartButton = document.getElementById('add-to-cart-btn');
    const bagCountElement = document.getElementById('bag-count');

    // 세일 가격 표시
    if (product.onSale) {
        productPriceElement.innerHTML = `<del>${product.price}</del> ${product.salePrice}`;
    } else {
        productPriceElement.textContent = product.price;
    }

    // 장바구니에 제품 추가
    addToCartButton.addEventListener('click', function() {
        let bag = JSON.parse(localStorage.getItem('bag')) || [];
        bag.push(product);
        localStorage.setItem('bag', JSON.stringify(bag));
        updateBagCount();
        alert(`${product.name} has been added to your bag.`);
    });

    // 장바구니 아이템 개수 업데이트
    function updateBagCount() {
        const bag = JSON.parse(localStorage.getItem('bag')) || [];
        bagCountElement.textContent = bag.length;
    }

    updateBagCount();
});
