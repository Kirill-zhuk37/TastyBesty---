// Объект для хранения выбранных блюд
const selected = {
    soup: null,
    main: null,
    drink: null
};

// Находим элементы
const orderList = document.getElementById('order-list');
const orderEmpty = document.getElementById('order-empty');
const orderTotal = document.getElementById('order-total');
const totalPrice = document.getElementById('total-price');
const totalInput = document.getElementById('total-input');

// Названия категорий для отображения
const categoryNames = {
    soup: "Суп",
    main: "Главное блюдо",
    drink: "Напиток"
};

// Находим все карточки блюд
const dishCards = document.querySelectorAll('.dish');

// Добавляем обработчик клика на каждую карточку
dishCards.forEach(card => {
    card.addEventListener('click', () => {
        const keyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === keyword);

        if (dish) {
            selected[dish.category] = dish;
            updateOrder();
        }
    });
});

// Функция обновления блока "Ваш заказ"
function updateOrder() {
    // Проверяем, есть ли выбранные блюда
    const hasSelected = selected.soup || selected.main || selected.drink;

    if (!hasSelected) {
        orderEmpty.style.display = 'block';
        orderTotal.classList.add('hidden');
        return;
    }

    orderEmpty.style.display = 'none';
    orderList.innerHTML = '';

    let total = 0;

    // Перебираем категории
    ['soup', 'main', 'drink'].forEach(category => {
        const dish = selected[category];

        if (dish) {
            // Добавляем блюдо
            const item = document.createElement('div');
            item.className = 'order-item';
            item.innerHTML = `
                <p class="order-category">${categoryNames[category]}</p>
                <p class="order-name">${dish.name} — ${dish.price}₽</p>
            `;
            orderList.appendChild(item);

            total += dish.price;
        } else {
            // Блюдо не выбрано — выводим сообщение
            const item = document.createElement('div');
            item.className = 'order-item';
            item.innerHTML = `
                <p class="order-category">${categoryNames[category]}</p>
                <p class="order-empty-text">Блюдо не выбрано</p>
            `;
            orderList.appendChild(item);
        }
    });

    // Показываем итоговую стоимость
    totalPrice.textContent = total;
    totalInput.value = total;
    orderTotal.classList.remove('hidden');
}