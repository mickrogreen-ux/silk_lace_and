// 1. Словник товарів та їхніх розмірів (змініть під свої товари)
const productSizes = {
    "Шовкова піжама": ["XS", "S", "M", "L"],
    "Мереживний халат": ["S/M", "L/XL"],
    "Трусики Silk": ["S", "M", "L"],
    "Не вказано": ["Універсальний"] // Варіант за замовчуванням
};

// Функція оновлення випадаючого списку розмірів
function updateSizes(productName) {
    const sizeSelect = document.getElementById("sizeSelect");
    if (!sizeSelect) return;

    sizeSelect.innerHTML = '<option value="" disabled selected>Оберіть розмір</option>';

    // Беремо розміри для товару або стандартний набір, якщо товару немає в списку
    const sizes = productSizes[productName] || ["XS", "S", "M", "L", "XL"];

    sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
}

// 2. Відкриття модального вікна та збір імені товару
function openModal(button) {
    try {
        if (button && button.closest) {
            var card = button.closest('.product-gallery');
            if (card) {
                var h3 = card.querySelector('h3');
                var input = document.getElementById('productNameInput');
                if (h3 && input) {
                    var currentProductName = h3.innerText.trim();
                    input.value = currentProductName;
                    
                    // Одразу оновлюємо розміри під конкретний товар при відкритті
                    updateSizes(currentProductName);
                }
            }
        }
    } catch (e) {
        console.warn("Помилка запису назви товару:", e);
    }

    var modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// 3. Закриття модального вікна
function closeModal() {
    var modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// 4. Закриття при кліку на темне тло навколо форми
window.onclick = function(event) {
    var modal = document.getElementById("orderModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 5. Безпечне фонове відправлення через Fetch API та ініціалізація
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("orderForm");
    
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Блокуємо перезавантаження сторінки

            var formData = new FormData(form);

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(function(response) {
                if (response.ok) {
                    alert("Дякуємо! Ваше замовлення успішно прийнято.");
                    closeModal();
                    form.reset(); // Очищуємо поля форми
                    updateSizes("Не вказано"); // Скидаємо розміри
                } else {
                    alert("Сервер Web3Forms відхилив запит. Перевірте статус ключа.");
                }
            })
            .catch(function(error) {
                alert("Сталася помилка відправки. На GitHub Pages все працюватиме стабільно.");
                console.error("Помилка:", error);
            });
        });
    }

    // Первинне налаштування розмірів за замовчуванням
    updateSizes("Не вказано");

    // --- Автоматичний перехід до товарів через 2 секунди ---
    var productsSection = document.getElementById("products");
    if (productsSection) {
        setTimeout(function() {
            productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 2000);
    }
});

// 6. Функція слайдера картинок (горталка)
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


