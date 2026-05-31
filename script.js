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
function changeSlide(button, direction) {
    var gallery = button.closest('.product-gallery');
    if (!gallery) return;

    var slides = gallery.querySelectorAll('img.slide');
    if (slides.length <= 1) return; 

    var activeIndex = Array.from(slides).findIndex(function(slide) {
        return slide.classList.contains('active');
    });
    if (activeIndex === -1) activeIndex = 0;

    slides[activeIndex].classList.remove('active');

    var newIndex = activeIndex + direction;
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }

    slides[newIndex].classList.add('active');
}
// Автоматичне фокусування на секції товарів при відкритті сайту
document.addEventListener("DOMContentLoaded", function() {
    var productsSection = document.getElementById("products");
    if (productsSection) {
        // Плавно прокручуємо екран до товарів через 300 мілісекунд після завантаження
        setTimeout(function() {
            productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
    }
});




