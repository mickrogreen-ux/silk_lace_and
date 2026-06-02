// Словник розмірів товарів (усі назви переведені у нижній регістр для точного збігу)
const productSizes = {
    "шовковий комплект нічна сорочка з халатом": ["42", "44", "46", "48", "50", "52", "54", "56", "58", "60"],
    "нічна сорочка трикотажна з мереживом": ["XS", "S", "M", "L", "XL", "2XL"],
    "шовкова піжама принтована з шортами": ["42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62", "64", "66", "68"],
    "жіночий халат міді з рукавом кімоно": ["42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62", "64", "66", "68"]
};

// Змінні для керування станом лайтбоксу (збільшення photo)
let currentLightboxImages = [];
let currentLightboxIndex = 0;

// Оновлення списку розмірів у формі
function updateSizes(productName) {
    const sizeSelect = document.getElementById("sizeSelect");
    if (!sizeSelect) return;

    // Очищаємо старі розміри перед додаванням нових
    sizeSelect.innerHTML = '<option value="" disabled selected>Оберіть розмір</option>';
    
    const cleanName = productName.trim().toLowerCase();
    
    // Якщо товар знайдено в базі — беремо його масив розмірів, якщо ні — ставимо стандартні
    const sizes = productSizes[cleanName] || ["XS", "S", "M", "L", "XL"];

    sizes.forEach(size => {
        const option = document.createElement("option");
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
}

// Відкриття модального вікна замовлення
function openModal(button) {
    let detectedName = "Не вказано";
    
    // Шукаємо батьківську картку товару (.card)
    const card = button.closest(".card");

    if (card) {
        // Витягуємо назву товару із заголовка h3 всередині текстового блоку
        const title = card.querySelector(".card-content-overlay h3");
        if (title) {
            detectedName = title.textContent.trim();
        }
    }

    // Записуємо назву у приховане поле форми Web3Forms
    const productInput = document.getElementById("productNameInput");
    if (productInput) {
        productInput.value = detectedName;
    }

    // Запускаємо генерацію правильних розмірів для цього товару
    updateSizes(detectedName);

    // Відображаємо модальне вікно та ЗАМОРОЖУЄМО сторінку, щоб вона не плавала
    const modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; 
    }
}

// Закриття модального вікна замовлення
function closeModal() {
    const modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Повертаємо прокрутку
    }
}

// Логіка звичайного слайдера перемикання фото в картці
function changeSlide(button, direction) {
    const gallery = button.closest(".product-gallery");
    if (!gallery) return;

    const slides = gallery.querySelectorAll(".slide");
    let activeIndex = 0;

    slides.forEach((slide, index) => {
        if (slide.classList.contains("active")) {
            activeIndex = index;
        }
    });

    slides[activeIndex].classList.remove("active");

    let newIndex = activeIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    slides[newIndex].classList.add("active");
}

// ЛАЙТБОКС: Відкриття збільшеного фото всередині сайту
function openLightbox(clickedImage) {
    const gallery = clickedImage.closest(".product-gallery");
    if (!gallery) return;

    const slides = gallery.querySelectorAll(".slide");
    currentLightboxImages = Array.from(slides).map(img => img.src);
    currentLightboxIndex = currentLightboxImages.indexOf(clickedImage.src);

    const lightbox = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");

    if (lightbox && lightboxImg) {
        lightboxImg.src = currentLightboxImages[currentLightboxIndex];
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden"; // ЗАМОРОЖУЄМО тло на смартфонах
    }
}

// Перемикання фото всередині лайтбоксу (вліво / вправо)
function lightboxNavigate(direction) {
    if (currentLightboxImages.length === 0) return;

    currentLightboxIndex += direction;
    if (currentLightboxIndex >= currentLightboxImages.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = currentLightboxImages.length - 1;

    const lightboxImg = document.getElementById("lightboxImg");
    if (lightboxImg) {
        lightboxImg.src = currentLightboxImages[currentLightboxIndex];
    }
}

// Закриття лайтбоксу
function closeLightbox() {
    const lightbox = document.getElementById("lightboxModal");
    if (lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = ""; // Звільняємо прокрутку сторінки
    }
}

// Кліки на затемнений фон для закриття вікон (супер-зручно для пальців на мобільних)
window.addEventListener("click", function(event) {
    const orderModal = document.getElementById("orderModal");
    const lightboxModal = document.getElementById("lightboxModal");

    if (event.target === orderModal) closeModal();
    if (event.target === lightboxModal) closeLightbox();
});

// Керування лайтбоксом за допомогою клавіатури (для ноутбуків та ПК)
window.addEventListener("keydown", function(event) {
    const lightboxModal = document.getElementById("lightboxModal");
    if (lightboxModal && lightboxModal.style.display === "flex") {
        if (event.key === "ArrowLeft") lightboxNavigate(-1);
        if (event.key === "ArrowRight") lightboxNavigate(1);
        if (event.key === "Escape") closeLightbox();
    }
});

// Обробка відправки форми на сервери Web3Forms
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("orderForm");
    if (!form) return;

    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const submitButton = form.querySelector(".btn-submit");

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Відправка...";
            }

            const formData = new FormData(form);
            const response = await fetch("https://web3forms.com", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert("Дякуємо! Ваше замовлення успішно прийнято.");
                form.reset();
                closeModal();
            } else {
                alert(result.message || "Помилка відправки форми");
            }
        } catch (error) {
            console.error(error);
            alert("Помилка мережі. Спробуйте пізніше.");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Підтвердити замовлення";
            }
        }
    });
});




