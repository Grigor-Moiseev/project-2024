let slider = document.querySelector('#slider');
let slides = document.querySelectorAll('.slide');
let indicatorsContainer = document.querySelector('#indicators');
let currentIndex = 0;
let intervalId;
let cardSection = document.querySelector('.cards');
let totalLap = document.querySelector('.total-lap');
let totalMob = document.querySelector('.total-mob');
let totalMon = document.querySelector('.total-monitor');
let totalPrin = document.querySelector('.total-printer');

function callApi() {
    let url = `https://grigor-moiseev.github.io/dataTest/data.json`;
    fetch(url)
    .then(resp => resp.json())
    .then(resp => callDiscountedProducts(resp.products) || pushProductTotal(resp.products))
};
callApi();


function callDiscountedProducts(products) {
    products.forEach(obj => {
        if (obj.discountPercentage > 0 ) {
            cardSection.innerHTML +=
            `
            <div class="card">
            <img src="${obj.img}" alt="Photo">
            <p>${obj.title}</p>
            <div class="priceStock">
            <p>${obj.price} ${obj.currency}</p>
            <p>${obj.beforeDiscount} ${obj.currency}</p>
            </div>
            <p>In Stock:${obj.stock}</p>
            <button>Add to Cart</button>
            </div>
            `
        };
    }) 
};

function pushProductTotal(total) {
    lapTotal = 0;
    mobTotal = 0;
    monitorTotal = 0;
    printerTotal = 0;
    total.forEach(calc => {
        if (calc.category === 'monitor') {
            monitorTotal++;
        };
        if (calc.category === 'printer') {
            printerTotal++;
        };
        if (calc.category === 'laptops') {
            lapTotal++;
        };
        if (calc.category === 'phones') {
            mobTotal++;
        };
    });
    if (lapTotal !== 0 || mobTotal !== 0 || monitorTotal !== 0 || printerTotal !== 0) {
        totalLap.innerHTML = `Available:${lapTotal}`;
        totalMob.innerHTML = `Available:${mobTotal}`;
        totalMon.innerHTML = `Available:${monitorTotal}`;
        totalPrin.innerHTML = `Available:${printerTotal}`;
    } else {
        totalLap.innerHTML = `Not Available`;
        totalMob.innerHTML = `Not Available`;
        totalMon.innerHTML = `Not Available`;
        totalPrin.innerHTML = `Not Available`;
    };
};

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
};

function updateIndicators() {
    while (indicatorsContainer.firstChild) {
        indicatorsContainer.removeChild(indicatorsContainer.firstChild);
    };
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


