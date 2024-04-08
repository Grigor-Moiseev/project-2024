let cartBtns = document.querySelectorAll('.process-btn');
let totalSum = document.querySelector('.total-price')

function removeFromCart(itemIndex) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartProducts();
};

function renderCartProducts() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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
        imageCell.innerHTML = `<img class="table-img" src="${item.img}" alt="item">`;
        itemCell.innerHTML = item.title;
        priceCell.innerHTML = item.price;
        quantityCell.innerHTML = item.quantity;
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
        total += item.price;
    });
    totalSum.innerHTML = `Total: ${total} GEL`;
};

cartBtns.forEach((button, index) => {
    button.addEventListener('click', function() {
        if (index === 0) {
            localStorage.removeItem('cartItems');
            window.location.href = 'index.html';
        }
        if (index === 1) {
            localStorage.removeItem('cartItems');
            renderCartProducts();
            cartItemsCount();
        }
    });
});

renderCartProducts();
