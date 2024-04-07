let cartBtns = document.querySelectorAll('.process-btn');

function removeFromCart(itemIndex) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartProducts();
}

function renderCartProducts() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let tableBody = document.querySelector('.cart-data table tbody');
    tableBody.innerHTML = '';
    cartItems.forEach((item, index) => {
        let row = document.createElement('tr');
        let imageCell = document.createElement('td');
        let itemCell = document.createElement('td');
        let priceCell = document.createElement('td');
        let quantityCell = document.createElement('td');
        let removeCell = document.createElement('td');
        imageCell.innerHTML = `<img class="table-img" src="${item.img}" alt="item">`;
        itemCell.textContent = item.title;
        priceCell.textContent = `${item.price} ${item.currency}`;
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
    });
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
