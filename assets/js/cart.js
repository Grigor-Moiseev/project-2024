let cartBtns = document.querySelectorAll('.process-btn');
let totalSum = document.querySelector('.total-price');

function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
};

function removeFromCart(itemIndex) {
    let cartItems = getCartItems();
    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartProducts();
};

function renderCartProducts() {
    let cartItems = getCartItems();
    let tableBody = document.querySelector('.cart-data table tbody');
    let total = 0;
    tableBody.innerHTML = '';
    cartItems.forEach((item, index) => {
        let row = document.createElement('tr');
        let imageCell = document.createElement('td');
        let itemCell = document.createElement('td');
        let priceCell = document.createElement('td');
        let quantityCell = document.createElement('td');
        let removeCell = document.createElement('td');
        let totalItemPrice = item.price * item.quantity;
        imageCell.innerHTML = `<img class="table-img" src="${item.img}" alt="item">`;
        itemCell.textContent = item.title;
        priceCell.textContent = totalItemPrice;
        quantityCell.textContent = item.quantity;
        removeCell.innerHTML = `<button class="remove-item-btn" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>`;
        row.appendChild(imageCell);
        row.appendChild(itemCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(removeCell);
        tableBody.appendChild(row);
        removeCell.querySelector('.remove-item-btn').addEventListener('click', function() {
            removeFromCart(index);
            cartItemsCount();
        });
        total += totalItemPrice;
    });
    totalSum.innerHTML = `Total: ${total} GEL`;
};

cartBtns.forEach((button, index) => {
    button.addEventListener('click', function() {
        let cartItems = getCartItems();
        if (cartItems.length === 0) {
            alert('Cart is empty!!!');
            return;
        };
        if (index === 0) {
            localStorage.removeItem('cartItems');
            window.location.href = 'index.html';
        } else if (index === 1) {
            localStorage.removeItem('cartItems');
            renderCartProducts();
            cartItemsCount();
        };
    });
});

renderCartProducts();
