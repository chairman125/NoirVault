document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { name: "Alexander Mcqueen Comme des Garcons", category: "clothing", url: "product1.html", img: "images/Alexander Mcqueen Comme des Garcons.jpg", onSale: true, newArrival: false },
        { name: "Comme des Garcons Homme Plus Nike Air Force 1", category: "shoes", url: "product2.html", img: "images/Comme des Garcons Homme Plus Nike Air Force 1.jpg", onSale: false, newArrival: true },
        { name: "Balenciage Comme des Garcons", category: "clothing", url: "product3.html", img: "images/Balenciage Comme des Garcons.jpg", onSale: true, newArrival: false },
        { name: "Maison Margiela Adidas Samba", category: "shoes", url: "product4.html", img: "images/Maison Margiela Adidas Samba.jpg", onSale: false, newArrival: true },
        { name: "Yohji Yamamoto Pour Homme Nike Air Force 1", category: "shoes", url: "product5.html", img: "images/Yohji Yamamoto Pour Homme Nike Air Force 1.jpg", onSale: true, newArrival: false },
        { name: "Maison Margiela Nike Air Force 1", category: "shoes", url: "product6.html", img: "images/Maison Margiela Nike Air Force 1.jpg", onSale: false, newArrival: true },
    ];

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('searchResults');
    const filterOptions = document.querySelectorAll('.filter-options input[type="checkbox"]');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        const selectedCategories = getSelectedCategories();
        const results = filterProducts(products, query, selectedCategories);

        displayResults(results);
    });

    filterOptions.forEach(option => {
        option.addEventListener('change', function() {
            const query = searchInput.value.toLowerCase();
            const selectedCategories = getSelectedCategories();
            const results = filterProducts(products, query, selectedCategories);

            displayResults(results);
        });
    });

    function getSelectedCategories() {
        const selectedCategories = [];
        filterOptions.forEach(option => {
            if (option.checked) {
                selectedCategories.push(option.value);
            }
        });
        return selectedCategories;
    }

    function filterProducts(products, query, selectedCategories) {
        return products.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category) ||
                                    (selectedCategories.includes('sale') && product.onSale) ||
                                    (selectedCategories.includes('new') && product.newArrival);
            return matchesQuery && matchesCategory;
        });
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length > 0) {
            const ul = document.createElement('ul');
            ul.style.listStyle = 'none';
            ul.style.padding = '0';
            ul.style.display = 'flex';
            ul.style.flexWrap = 'wrap';
            ul.style.gap = '20px';

            results.forEach(product => {
                const li = document.createElement('li');
                li.style.width = 'calc(33.333% - 20px)';
                li.style.boxSizing = 'border-box';
                li.style.border = '1px solid #ddd';
                li.style.borderRadius = '8px';
                li.style.overflow = 'hidden';
                li.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                li.style.transition = 'transform 0.3s';

                const a = document.createElement('a');
                a.href = product.url;
                a.style.display = 'block';
                a.style.textDecoration = 'none';
                a.style.color = '#333';

                const img = document.createElement('img');
                img.src = product.img;
                img.alt = product.name;
                img.style.width = '100%';
                img.style.height = 'auto';

                const p = document.createElement('p');
                p.textContent = product.name;
                p.style.textAlign = 'center';
                p.style.padding = '10px';
                p.style.fontSize = '16px';

                a.appendChild(img);
                a.appendChild(p);
                li.appendChild(a);
                ul.appendChild(li);
            });
            searchResults.appendChild(ul);
        } else {
            searchResults.innerHTML = '<p>No results found. Please try a different search.</p>';
        }
    }
});
