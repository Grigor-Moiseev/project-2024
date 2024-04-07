let url = `https://grigor-moiseev.github.io/dataTest/data.json`;
let cardSection = document.querySelector('.cards');
let totalLap = document.querySelector('.total-lap');
let totalMob = document.querySelector('.total-mob');
let totalMon = document.querySelector('.total-monitor');
let totalPrin = document.querySelector('.total-printer');
let minPrice = document.querySelector('#min');
let maxPrice = document.querySelector('#max');
let searchForm = document.querySelector('.search-all');
let search = document.querySelector('#searchid');
let searchByPrice = document.querySelector('.search-by-price');
let btns = document.querySelectorAll('#brands-btns');
let brandsHeader = document.querySelector('.catalog-all');
let category = document.querySelectorAll('.category');
let slider = document.querySelector('#slider');
let slides = document.querySelectorAll('.slide');
let indicatorsContainer = document.querySelector('#indicators');
let currentIndex = 0;
let intervalId;

function callApi() {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            pushProductTotal(resp.products);
            callProducts(resp.products);
            pushProductTotal(resp.products);
        });
};

callApi();
cartItemsCount();

function saveToLocalStorage(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        product.quantity = 1;
        cartItems.push(product);
    };
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

function cartItemsCount() {
    let cartTotal = JSON.parse(localStorage.getItem('cartItems')) || [];
    let nums = 0;
    cartTotal.forEach(item => {
        nums += item.quantity;
    });
    let cartNumDisp = document.querySelector('.cart-num')

    cartNumDisp.innerHTML = nums;
};

function renderProduct(product) {
    let discountDisplayStyle = (product.discountPercentage === 0) ? 'style="display: none;"' : '';
    cardSection.innerHTML +=
        `<div class="card">
            <img src="${product.img}" alt="Photo">
            <p>${product.title}</p>
            <div class="priceStock">
                <p>${product.price} ${product.currency}</p>
                <p ${discountDisplayStyle}>${product.beforeDiscount} ${product.currency}</p>
            </div>
            <p>In Stock: ${product.stock}</p>
            <button class="add-to-cart-btn" data-product='${JSON.stringify(product)}'>Add to Cart</button>
        </div>`;

    let addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let productData = JSON.parse(button.dataset.product);
            saveToLocalStorage(productData);
            cartItemsCount();
        });
    });
};

function callBySearch(brand) {
    fetch(url)
        .then(resp => resp.json())
        .then(resp => renderBy(resp.products, brand));
};

function searchByBrand(brand) {
    fetch(url)
    .then(resp => resp.json())
    .then(resp => pushDataSearch(resp.products, brand));
};

function renderBy(apiData, brand) {
    cardSection.innerHTML = "";
    let filteredProducts = apiData.filter(item => item.brand === brand && item.price >= minPrice.value && item.price <= maxPrice.value);
    if (filteredProducts.length !== 0) {
        filteredProducts.forEach(item => {
            renderProduct(item);
        });
    } else {
        alert('Product not found!!!');
    }
};

function renderByPrice(apiData) {
    cardSection.innerHTML = "";
    let filteredProducts = apiData.filter(item =>item.price >= minPrice.value && item.price <= maxPrice.value);
    if (filteredProducts.length !== 0) {
        filteredProducts.forEach(item => {
            renderProduct(item);
        });
    } else {
        alert('Product not found!!!');
    }
};

function renderByCategory(apiData, categoryValue) {
    cardSection.innerHTML = "";
    let filteredProducts = apiData.filter(item => item.category === categoryValue);
    if (filteredProducts.length !== 0) {
        filteredProducts.forEach(item => {
            renderProduct(item);
        });
    } else {
        alert('Product not found!!!');
    }
};

function callProducts(products) {
    cardSection.innerHTML = '';
        renderMainPage(products);
        renderCatalogPage(products);
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            brandsHeader.innerHTML = 'Search All';
            searchByBrand(search.value);
        });
        searchByPrice.addEventListener('submit', function(event) {
            event.preventDefault();
            renderByPrice(products);
            brandsHeader.innerHTML = 'Search By Price';
        });
        category.forEach(call => {
            call.addEventListener('click', function () {
                let categoryValue = call.getAttribute('value');
                brandsHeader.innerHTML = call.innerHTML;
                renderByCategory(products, categoryValue);
            });
        });
        products.forEach(product => {
            renderProduct(product);
        });
    };

function renderMainPage(products) {

    products.forEach(product => {
        if (product.discountPercentage > 0) {
            renderProduct(product);
        };
    });
};

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
};

function updateIndicators() {
    while (indicatorsContainer.firstChild) {
        indicatorsContainer.removeChild(indicatorsContainer.firstChild);
    }
    slides.forEach((slide, index) => {
        let indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentIndex) {
            indicator.classList.add('active-slide');
        }
        indicator.onclick = () => {
            currentIndex = index;
            clearInterval(intervalId);
            updateSlider();
            startInterval();
        };
        indicatorsContainer.appendChild(indicator);
    });
};

function startInterval() {
    intervalId = setInterval(() => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateSlider();
    }, 7000);
};

updateIndicators();
startInterval();

function renderCatalogPage(products) {
    maxPrice.value = Math.max(...products.map(product => product.price));
    minPrice.value = Math.min(...products.map(product => product.price));
    btns.forEach(call => {
        call.addEventListener('click', function () {
            let brand = call.value;
            if (brand !== 'all') {
                brandsHeader.innerHTML = call.innerHTML;
                callBySearch(brand);
            } else {
                brandsHeader.innerHTML = 'All Products'
                callApi();
            }
        });
    });
    products.forEach(product => {
        renderProduct(product);
    });
};

function pushDataSearch(apiData, brand) {
    cardSection.innerHTML = '';
    let filteredData = apiData.filter(obj => 
        obj.brand.toLowerCase().trim() === brand.toLowerCase().trim() || 
        obj.title.toLowerCase().trim().includes(brand.toLowerCase().trim())
    );
    if (filteredData.length !== 0) {
        filteredData.forEach(obj => {
            renderProduct(obj)
        });
    } else {
        alert('Product not found!!!');
        callApi();
    };
};

function pushProductTotal(total) {
    let lapTotal = 0, mobTotal = 0, monitorTotal = 0, printerTotal = 0;
    total.forEach(calc => {
        switch (calc.category) {
            case 'laptops':
                lapTotal++;
                break;
            case 'phones':
                mobTotal++;
                break;
            case 'monitor':
                monitorTotal++;
                break;
            case 'printer':
                printerTotal++;
                break;
        }
    });
    totalLap.innerHTML = `Available: ${lapTotal}`;
    totalMob.innerHTML = `Available: ${mobTotal}`;
    totalMon.innerHTML = `Available: ${monitorTotal}`;
    totalPrin.innerHTML = `Available: ${printerTotal}`;
};
