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
    let url = `https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=50`;
    fetch(url)
    .then(resp => resp.json())
    .then(resp => allProducts(resp.products) || pushProductTotal(resp.products))
};
callApi();

let dataMon = {
    products: [
        {
            id : 1,
            category : 'monitor',
            brand : 'samsung',
            price : 999,
            currency : 'GEL',
            title : 'Samsung 27 Curved Gaming Odyssey G5 (LS27AG550EIXCI) - Black',
            stock : 22,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/254/132142_1.png.jpg',
        },
        {
            id : 2,
            category : 'monitor',
            brand : 'lg',
            price : 599,
            currency : 'GEL',
            title : 'LG 27" Ultragear 27GQ50F-B',
            stock : 25,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/279/1_1k7r-cf.png.jpg',
        },
        {
            id : 3,
            category : 'monitor',
            brand : 'samsung',
            price : 949,
            currency : 'GEL',
            title : 'LG 27" Ultragear 27GQ50F-B',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/262/1_7vxw-88_jf9j-sb.png.jpg',
        },
        {
            id : 4,
            category : 'monitor',
            brand : 'samsung',
            price : 5499,
            currency : 'GEL',
            title : 'Samsung 55 Gaming Odyssey Ark (LS55BG970NIXCI)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/272/1_ai72-bw.png.jpg',
        },
        {
            id : 5,
            category : 'monitor',
            brand : 'samsung',
            price : 599,
            currency : 'GEL',
            title : 'Samsung 24 Odyssey G3 (LS24AG320NIXCI) - Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/272/1_ai72-bw.png.jpg',
        },
        {
            id : 6,
            category : 'monitor',
            brand : 'lenovo',
            price : 479,
            currency : 'GEL',
            title : 'Lenovo 27 Monitor C27-40 (63DDKAT6EU) - Raven Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/283/1_akad-rb.png.jpg',
        },
        {
            id : 7,
            category : 'monitor',
            brand : 'samsung',
            price : 1699,
            currency : 'GEL',
            title : 'Samsung 28 Odyssey G7 (LS28BG700EIXCI)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/300/1_j4rn-gg.png.jpg',
        },
        {
            id : 8,
            category : 'monitor',
            brand : 'samsung',
            price : 899,
            currency : 'GEL',
            title : 'Samsung 25 Odyssey G4 (LS25BG400EIXCI)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/262/1_7vxw-88.png.jpg',
        },
        {
            id : 9,
            category : 'monitor',
            brand : 'samsung',
            price : 429,
            currency : 'GEL',
            title : 'Samsung 27 LS27C310EAIXCI',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/290/11_byij-oh.png.jpg',
        },
        {
            id : 10,
            category : 'monitor',
            brand : 'lenovo',
            price : 499,
            currency : 'GEL',
            title : 'Lenovo 23.8 G24e-20 - Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/273/1_0eqy-v4.png.jpg',
        },
        {
            id : 11,
            category : 'monitor',
            brand : 'samsung',
            price : 1499,
            currency : 'GEL',
            title : 'Samsung 32 Odyssey G5 LS32AG524PIXCI - Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/258/1_y0ys-q4.png.jpg',
        },
        {
            id : 12,
            category : 'monitor',
            brand : 'samsung',
            price : 699,
            currency : 'GEL',
            title : 'Samsung 27 Odyssey G3 (LS27AG320NIXCI) - Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/300/1_61xt-af_9fpe-2o.png.jpg',
        },
        {
            id : 13,
            category : 'monitor',
            brand : 'samsung',
            price : 499,
            currency : 'GEL',
            title : 'Samsung 27 Curved (LC27R500FHIXCI)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/213/109178_1.png.jpg',
        },
        {
            id : 14,
            category : 'monitor',
            brand : 'lenovo',
            price : 899,
            currency : 'GEL',
            title : 'Lenovo 27 G27q-30 (66E8GAC2EU) - Raven Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/286/1_h10a-bb.png.jpg',
        },
        {
            id : 15,
            category : 'monitor',
            brand : 'asus',
            price : 799,
            currency : 'GEL',
            title : 'Asus TUF Gaming 23.6 VG24VQE Curved - Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/239/123673_1.png.jpg',
        },
        {
            id : 16,
            category : 'monitor',
            brand : 'samsung',
            price : 3199,
            currency : 'GEL',
            title : 'Samsung 32 Curved Odyssey Neo G75B (LS32BG752NIXCI)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/262/1_yloy-d1.png.jpg',
        },
        
    ] 
};
let dataPrin = {
    products: [
        {
            id : 1,
            category : 'printer',
            brand : 'canon',
            price : 239,
            currency : 'GEL',
            title : 'Canon PIXMA E414',
            stock : 22,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/179/86509_1.jpg.jpg',
        },
        {
            id : 2,
            category : 'printer',
            brand : 'canon',
            price : 999,
            currency : 'GEL',
            title : 'Canon PIXMA iX6840 (8747B007A)',
            stock : 22,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/266/7253_Terra__1_.png.jpg',
        },
        {
            id : 3,
            category : 'printer',
            brand : 'hp',
            price : 249,
            currency : 'GEL',
            title : 'HP DeskJet 2320 (7WN42B)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/237/123037_1.png.jpg',
        },
        {
            id : 4,
            category : 'printer',
            brand : 'hp',
            price : 599,
            currency : 'GEL',
            title : 'HP MFP Laser 135a (4ZB82A)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/225/116024_1.png.jpg',
        },
        {
            id : 5,
            category : 'printer',
            brand : 'hp',
            price : 719,
            currency : 'GEL',
            title : 'HP MFP Laser 135w (4ZB83A)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/225/116024_1_zp8i-4e.png.jpg',
        },
        {
            id : 6,
            category : 'printer',
            brand : 'canon',
            price : 299,
            currency : 'GEL',
            title : 'Canon PIXMA MG3640S Black',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/213/108496_1.png.jpg',
        },
        {
            id : 7,
            category : 'printer',
            brand : 'canon',
            price : 669,
            currency : 'GEL',
            title : 'Canon PIXMA G3420',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/227/116706_1.png.jpg',
        },
        {
            id : 8,
            category : 'printer',
            brand : 'epson',
            price : 2239,
            currency : 'GEL',
            title : 'Epson L1300 (C11CD81402)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/148/65520_1.jpg.jpg',
        },
        {
            id : 9,
            category : 'printer',
            brand : 'hp',
            price : 869,
            currency : 'GEL',
            title : 'HP Laser MFP 137fnw (4ZB84A)',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/206/105441_1.jpg.jpg',
        },
        {
            id : 10,
            category : 'printer',
            brand : 'xerox',
            price : 339,
            currency : 'GEL',
            title : 'Xerox Phaser 3020BI',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/224/114245_1.jpg.jpg',
        },
        {
            id : 11,
            category : 'printer',
            brand : 'xerox',
            price : 599,
            currency : 'GEL',
            title : 'Xerox WorkCentre 3025BI',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/229/118247.jpg.jpg',
        },
        {
            id : 12,
            category : 'printer',
            brand : 'xerox',
            price : 599,
            currency : 'GEL',
            title : 'Xerox WorkCentre 3025V/NI',
            stock : 21,
            img : 'https://alta.ge/images/thumbnails/270/250/detailed/224/114246_2.jpg.jpg',
        },
        
    ] 
};

function allProducts(products) {
    cardSection.innerHTML = '';
    products.forEach(obj => {
        let discountDisplayStyle = '';
        if (obj.price.discountPercentage === 0) {
            discountDisplayStyle = 'style="display: none;"';
        };  
        cardSection.innerHTML +=
            `
            <div class="card">
            <img src="${obj.thumbnail}" alt="Photo">
            <p>${obj.title}</p>
            <div class="priceStock">
            <p>${obj.price.current} ${obj.price.currency}</p>
            <p ${discountDisplayStyle}>${obj.price.beforeDiscount} ${obj.price.currency}</p>
            </div>
            <p>In Stock: ${obj.stock}</p>
            <button>Add to Cart</button>
            </div>
            `;
    });

    dataMon.products.forEach(obj => {
        cardSection.innerHTML +=
            `
            <div class="card">
            <img src="${obj.img}" alt="Photo">
            <p>${obj.title}</p>
            <div class="priceStock">
            <p>${obj.price} ${obj.currency}</p>
            </div>
            <p>In Stock: ${obj.stock}</p>
            <button>Add to Cart</button>
            </div>
            `;
    });

    dataPrin.products.forEach(obj => {
        cardSection.innerHTML +=
            `
            <div class="card">
            <img src="${obj.img}" alt="Photo">
            <p>${obj.title}</p>
            <div class="priceStock">
            <p>${obj.price} ${obj.currency}</p>
            </div>
            <p>In Stock: ${obj.stock}</p>
            <button>Add to Cart</button>
            </div>
            `;
    });
};

function pushProductTotal(total) {
    lapTotal = 0;
    mobTotal = 0;
    monitorTotal = 0;
    printerTotal = 0;
    total.forEach(calc => {
        if (calc.category.id == 1) {
            lapTotal++;
        };
        if (calc.category.id == 2) {
            mobTotal++;
        };
    });
    totalLap.innerHTML = `Available:${lapTotal}`;
    totalMob.innerHTML = `Available:${mobTotal}`;
    dataMon.products.forEach(calc => {
        calc = monitorTotal++;
    });
    totalMon.innerHTML = `Available:${monitorTotal}`;
    dataPrin.products.forEach(calc => {
        calc = printerTotal++;
    });
    totalPrin.innerHTML = `Available:${printerTotal}`;
};