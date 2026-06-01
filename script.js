// 1. Відкриття модального вікна та збір імені товару
function openModal(button) {
    try {
        if (button && button.closest) {
            var card = button.closest('.product-gallery');
            if (card) {
                var h3 = card.querySelector('h3');
                var input = document.getElementById('productNameInput');
                if (h3 && input) {
                    input.value = h3.innerText;
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

// 2. Закриття модального вікна
function closeModal() {
    var modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "none";
    }
}

// 3. Закриття при кліку на темне тло навколо форми
window.onclick = function(event) {
    var modal = document.getElementById("orderModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 4. Безпечне фонове відправлення через Fetch API (Рятує від помилки 405)
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("orderForm");
    
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Повністю блокуємо перезавантаження та помилку 405

            var formData = new FormData(form);

            // Відправляємо дані як чистий фоновий JSON-запит
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(function(response) {
                if (response.ok) {
                    alert("Дякуємо! Ваше замовлення успішно прийнято.");
                    closeModal();
                    form.reset(); // Очищуємо поля форми
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

    // --- Автоматичний перехід до товарів через 2 секунди ---
    var productsSection = document.getElementById("products");
    if (productsSection) {
        setTimeout(function() {
            productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 2000);
    }
});

// 5. Функція слайдера картинок (горталка)
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



