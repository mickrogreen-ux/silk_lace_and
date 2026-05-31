// 1. Функция открытия формы заказа (считывает название товара из карточки)
function openModal(button) {
    try {
        if (button && button.closest) {
            var card = button.closest('.product-gallery');
            if (card) {
                var h3 = card.querySelector('h3');
                var input = document.getElementById('productNameInput');
                if (h3 && input) {
                    input.value = h3.innerText; // Записываем имя товара в скрытое поле
                }
            }
        }
    } catch (e) {
        console.warn("Ошибка записи названия товара:", e);
    }

    var modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// 2. Функция закрытия формы заказа
function closeModal() {
    var modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// 3. Закрытие окна при клике на темную область вокруг формы
window.onclick = function(event) {
    var modal = document.getElementById("orderModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 4. Функция уведомления перед отправкой
function handleFormSubmit() {
    alert("Дякуємо! Ваше замовлення прийнято. Зараз відбудеться надсилання даних.");
}

// 5. Функция слайдера картинок (листалка)
// Автоматичне фокусування на секції товарів через 2 секунди
document.addEventListener("DOMContentLoaded", function() {
    var productsSection = document.getElementById("products");
    if (productsSection) {
        // Затримка 2000 мілісекунд (рівно 2 секунди) перед плавною прокруткою
        setTimeout(function() {
            productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 2000);
    }
});



