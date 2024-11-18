document.addEventListener("DOMContentLoaded", () => {
    const carModelSelect = document.getElementById("car-model");
    const selectedCarTitle = document.getElementById("selected-car-title");
    const slides = document.querySelector('.slides');
    const thumbnails = document.querySelector('.thumbnails');
    const calculateButton = document.getElementById("calculate-button");
    const resultPrice = document.getElementById("result-price");

    const carPrices = {
        BMW: 650000,
        Megane: 120000,
        Mercedes: 700000,
        Twingo: 100000,
        Chevrolet: 150000,
    };

    const carBackgrounds = {
        BMW: "",
        Megane: "",
        Mercedes: "",
        Twingo: "",
        Chevrolet: "",
    };

    const carImages = {
        BMW: [
            'img/bmw/bmw1.webp',
            'img/bmw/bmw2.webp',
            'img/bmw/bmw3.webp',
            'img/bmw/bmw4.webp',
            'img/bmw/bmw5.webp'
        ],
        Megane: [
            'img/megane/1.webp',
            'img/megane/2.webp',
            'img/megane/3.webp',
            'img/megane/4.webp',
            'img/megane/5.webp'
        ],
        Mercedes: [
            'img/mercedes/1.webp',
            'img/mercedes/2.webp',
            'img/mercedes/3.webp',
            'img/mercedes/4.webp',
            'img/mercedes/5.webp'
        ],
        Twingo: [
            'img/twingo/1.webp',
            'img/twingo/2.webp',
            'img/twingo/3.webp',
            'img/twingo/4.webp',
            'img/twingo/5.webp'
        ],
        Chevrolet: [
            'img/Chevrolet/1.webp',
            'img/Chevrolet/2.webp',
            'img/Chevrolet/3.webp',
            'img/Chevrolet/4.webp',
            'img/Chevrolet/5.webp'
        ]
    };
    
    function updateSliderImages(carModel) {
        const images = carImages[carModel] || carImages['BMW'];
        slides.innerHTML = images.map((img, index) => `
            <li id="slide${index + 1}">
                <img src="${img}" alt="${carModel} ${index + 1}" />
            </li>
        `).join('');

        thumbnails.innerHTML = images.map((img, index) => `
            <li>
                <a href="#slide${index + 1}">
                    <img src="${img}" alt="${carModel} thumbnail ${index + 1}" />
                </a>
            </li>
        `).join('');

        window.location.hash = '#slide1';
    }

    carModelSelect.addEventListener("change", () => {
        const selectedCar = carModelSelect.value;
        selectedCarTitle.textContent = `${selectedCar || "Seleccione un vehículo"} ${carBackgrounds[selectedCar] || ""}`;
        if (selectedCar) {
            updateSliderImages(selectedCar);
        }
    });

    function setBackgroundColor(days) {
        resultPrice.classList.remove(
            'price-1-2-days',
            'price-3-5-days',
            'price-6-10-days',
            'price-more-than-10-days'
        );

        if (days <= 2) {
            resultPrice.classList.add('price-1-2-days');
        } else if (days <= 5) {
            resultPrice.classList.add('price-3-5-days');
        } else if (days <= 10) {
            resultPrice.classList.add('price-6-10-days');
        } else {
            resultPrice.classList.add('price-more-than-10-days');
        }
    }

    calculateButton.addEventListener("click", () => {
        const clientName = document.getElementById("client-name").value;
        const model = document.getElementById("car-model").value;
        const days = parseInt(document.getElementById("rental-days").value, 10);
        const insurance = document.getElementById("insurance").value;

        if (!clientName || !model || !days) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const basePrice = carPrices[model];
        let discount = 0;

        if (days > 10) {
            discount = 0.2;
        } else if (days >= 6) {
            discount = 0.15;
        } else if (days >= 3) {
            discount = 0.1;
        }

        const insuranceCost = insurance === "yes" ? 0.05 * basePrice : 0;
        const totalPrice = (basePrice * days * (1 - discount)) + insuranceCost;

        document.getElementById("result-client-name").value = clientName;
        document.getElementById("result-car-model").value = `${model} ${carBackgrounds[model]}`;
        document.getElementById("result-days").value = days;
        document.getElementById("result-insurance").value = insurance === "yes" ? "Sí" : "No";
        document.getElementById("result-price").value = `$${totalPrice.toFixed(2)}`;

        setBackgroundColor(days);
    });

    updateSliderImages("BMW");

    
});
