// Находим все контейнеры для блюд
const containers = document.querySelectorAll('.dishes');

// Перебираем каждый контейнер
containers.forEach(container => {
    const category = container.dataset.category;  // soup, main, drink

    // Фильтруем блюда по категории
    const filtered = dishes.filter(dish => dish.category === category);

    // Сортируем по названию (алфавитный порядок)
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    // Создаём карточку для каждого блюда
    filtered.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish';
        card.dataset.dish = dish.keyword;  // data-dish="gaspacho"

        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price}₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button>Добавить</button>
        `;

        container.appendChild(card);
    });
});