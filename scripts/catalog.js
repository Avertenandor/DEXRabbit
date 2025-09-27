// Task 9 & 17: Catalog with filters and 12 realistic animals
document.addEventListener('DOMContentLoaded', function() {
    // Task 17: 12 realistic animal data
    const rabbitsData = [
        {
            id: 1,
            breed: 'white-giant',
            breedName: 'Белый великан',
            gender: 'female',
            genderSymbol: '♀',
            age: 5,
            status: 'available',
            price: 8500,
            weight: 3.8,
            title: 'Белый великан #001',
            image: '/images/photo_2025-09-15_13-17-50.jpg',
            description: 'Крупная самка с отличными племенными качествами. Спокойный характер, хорошая упитанность.'
        },
        {
            id: 2,
            breed: 'california',
            breedName: 'Калифорнийский',
            gender: 'male',
            genderSymbol: '♂',
            age: 4,
            status: 'available',
            price: 7500,
            weight: 3.2,
            title: 'Калифорнийский #002',
            image: '/images/photo_2025-09-15_13-17-51.jpg',
            description: 'Молодой самец с яркой калифорнийской окраской. Активный, здоровый, от титулованных родителей.'
        },
        {
            id: 3,
            breed: 'soviet-chinchilla',
            breedName: 'Советская шиншилла',
            gender: 'female',
            genderSymbol: '♀',
            age: 6,
            status: 'reserved',
            price: 9000,
            weight: 4.1,
            title: 'Советская шиншилла #003',
            image: '/images/photo_2025-09-15_13-17-52.jpg',
            description: 'Великолепная самка шиншилловой окраски. Отличные мясные и пуховые качества.'
        },
        {
            id: 4,
            breed: 'gray-giant',
            breedName: 'Серый великан',
            gender: 'male',
            genderSymbol: '♂',
            age: 7,
            status: 'available',
            price: 8000,
            weight: 4.5,
            title: 'Серый великан #004',
            image: '/images/photo_2025-09-15_13-17-50.jpg',
            description: 'Крупный самец серого великана. Отличные показатели веса и роста. Подходит для разведения.'
        },
        {
            id: 5,
            breed: 'vienna-blue',
            breedName: 'Венский голубой',
            gender: 'female',
            genderSymbol: '♀',
            age: 3,
            status: 'available',
            price: 7000,
            weight: 2.8,
            title: 'Венский голубой #005',
            image: '/images/photo_2025-09-15_13-17-51.jpg',
            description: 'Молодая самка венского голубого. Красивая голубая окраска, хорошие перспективы роста.'
        },
        {
            id: 6,
            breed: 'white-giant',
            breedName: 'Белый великан',
            gender: 'male',
            genderSymbol: '♂',
            age: 6,
            status: 'available',
            price: 8200,
            weight: 4.0,
            title: 'Белый великан #006',
            image: '/images/photo_2025-09-15_13-17-52.jpg',
            description: 'Крепкий самец белого великана с отличными показателями. Подходит для племенного разведения.'
        },
        {
            id: 7,
            breed: 'california',
            breedName: 'Калифорнийский',
            gender: 'female',
            genderSymbol: '♀',
            age: 5,
            status: 'reserved',
            price: 7800,
            weight: 3.5,
            title: 'Калифорнийский #007',
            image: '/images/photo_2025-09-15_13-17-50.jpg',
            description: 'Самка с отличной калифорнийской окраской. Хорошие мясные качества, активная.'
        },
        {
            id: 8,
            breed: 'soviet-chinchilla',
            breedName: 'Советская шиншилла',
            gender: 'male',
            genderSymbol: '♂',
            age: 4,
            status: 'available',
            price: 8500,
            weight: 3.6,
            title: 'Советская шиншилла #008',
            image: '/images/photo_2025-09-15_13-17-51.jpg',
            description: 'Молодой самец шиншилла с отличными показателями роста. Перспективный для разведения.'
        },
        {
            id: 9,
            breed: 'gray-giant',
            breedName: 'Серый великан',
            gender: 'female',
            genderSymbol: '♀',
            age: 8,
            status: 'available',
            price: 9500,
            weight: 4.8,
            title: 'Серый великан #009',
            image: '/images/photo_2025-09-15_13-17-52.jpg',
            description: 'Взрослая самка серого великана. Готова к разведению, отличные материнские качества.'
        },
        {
            id: 10,
            breed: 'vienna-blue',
            breedName: 'Венский голубой',
            gender: 'male',
            genderSymbol: '♂',
            age: 6,
            status: 'available',
            price: 7700,
            weight: 3.9,
            title: 'Венский голубой #010',
            image: '/images/photo_2025-09-15_13-17-50.jpg',
            description: 'Самец венского голубого с красивой окраской и хорошим экстерьером. Племенной класс.'
        },
        {
            id: 11,
            breed: 'white-giant',
            breedName: 'Белый великан',
            gender: 'female',
            genderSymbol: '♀',
            age: 7,
            status: 'available',
            price: 8800,
            weight: 4.3,
            title: 'Белый великан #011',
            image: '/images/photo_2025-09-15_13-17-51.jpg',
            description: 'Крупная самка белого великана. Отличные показатели роста и развития. Готова к разведению.'
        },
        {
            id: 12,
            breed: 'california',
            breedName: 'Калифорнийский',
            gender: 'male',
            genderSymbol: '♂',
            age: 3,
            status: 'available',
            price: 7200,
            weight: 2.9,
            title: 'Калифорнийский #012',
            image: '/images/photo_2025-09-15_13-17-52.jpg',
            description: 'Молодой самец калифорнийской породы. Хорошие перспективы роста, здоровый и активный.'
        }
    ];

    let filteredRabbits = [...rabbitsData];

    // DOM elements
    const productGrid = document.getElementById('product-grid');
    const productsCount = document.getElementById('products-count');
    const loadingPlaceholder = document.getElementById('loading-placeholder');
    const noResults = document.getElementById('no-results');
    
    // Filter elements
    const breedFilter = document.getElementById('breed-filter');
    const genderFilter = document.getElementById('gender-filter');
    const ageFilter = document.getElementById('age-filter');
    const statusFilter = document.getElementById('status-filter');
    const sortFilter = document.getElementById('sort-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');

    // Task 42: Show loading state
    function showLoading() {
        productGrid.style.display = 'none';
        noResults.style.display = 'none';
        loadingPlaceholder.style.display = 'block';
    }

    function hideLoading() {
        loadingPlaceholder.style.display = 'none';
        productGrid.style.display = 'grid';
    }

    // Create product card HTML
    function createProductCard(rabbit) {
        const statusClass = rabbit.status === 'available' ? 'status-available' : 'status-reserved';
        const statusText = rabbit.status === 'available' ? 'Свободен' : 'Забронирован';
        const buttonHtml = rabbit.status === 'available' 
            ? `<a href="/contacts" class="btn btn-primary btn-small" data-rabbit-id="${rabbit.id}">Забронировать</a>`
            : `<span class="btn btn-secondary btn-small disabled">Забронирован</span>`;

        return `
            <article class="product-card" data-breed="${rabbit.breed}" data-gender="${rabbit.gender}" data-age="${rabbit.age}" data-status="${rabbit.status}" data-price="${rabbit.price}" data-weight="${rabbit.weight}">
                <div class="product-image">
                    <img src="${rabbit.image}" alt="${rabbit.breedName}" loading="lazy" width="300" height="200">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${rabbit.title}</h3>
                    <div class="product-specs">
                        <span>${rabbit.breedName}</span> · <span>${rabbit.genderSymbol}</span> · <span>${rabbit.age} мес</span> · <span>${rabbit.weight} кг</span>
                    </div>
                    <div class="product-description">
                        <p>${rabbit.description}</p>
                    </div>
                    <div class="product-actions">
                        <strong class="product-price">${rabbit.price.toLocaleString('ru-RU')} ₽</strong>
                        ${buttonHtml}
                    </div>
                </div>
            </article>
        `;
    }

    // Task 41: Sort rabbits
    function sortRabbits(rabbits, sortBy) {
        const sorted = [...rabbits];
        
        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'age-asc':
                return sorted.sort((a, b) => a.age - b.age);
            case 'age-desc':
                return sorted.sort((a, b) => b.age - a.age);
            case 'weight-desc':
                return sorted.sort((a, b) => b.weight - a.weight);
            default:
                return sorted;
        }
    }

    // Task 9: Filter rabbits
    function filterRabbits() {
        showLoading();
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            const breed = breedFilter.value;
            const gender = genderFilter.value;
            const age = ageFilter.value;
            const status = statusFilter.value;
            const sort = sortFilter.value;

            filteredRabbits = rabbitsData.filter(rabbit => {
                const breedMatch = !breed || rabbit.breed === breed;
                const genderMatch = !gender || rabbit.gender === gender;
                const ageMatch = !age || (age === 'young' ? rabbit.age < 6 : rabbit.age >= 6);
                const statusMatch = !status || rabbit.status === status;

                return breedMatch && genderMatch && ageMatch && statusMatch;
            });

            // Apply sorting
            filteredRabbits = sortRabbits(filteredRabbits, sort);

            renderRabbits();
            hideLoading();

            // Task 32: Track filter usage
            if (breed || gender || age || status || sort !== 'default') {
                trackEvent('catalog_filter', {
                    breed: breed || 'all',
                    gender: gender || 'all',
                    age: age || 'all',
                    status: status || 'all',
                    sort: sort
                });
            }
        }, 300);
    }

    // Render rabbits
    function renderRabbits() {
        if (filteredRabbits.length === 0) {
            productGrid.style.display = 'none';
            noResults.style.display = 'block';
            productsCount.innerHTML = 'Показано <strong>0</strong> из <strong>0</strong> кроликов';
            return;
        }

        noResults.style.display = 'none';
        productGrid.style.display = 'grid';
        
        productGrid.innerHTML = filteredRabbits.map(createProductCard).join('');
        productsCount.innerHTML = `Показано <strong>${filteredRabbits.length}</strong> из <strong>${rabbitsData.length}</strong> кроликов`;

        // Add event listeners to booking buttons
        const bookingButtons = productGrid.querySelectorAll('[data-rabbit-id]');
        bookingButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rabbitId = this.getAttribute('data-rabbit-id');
                const rabbit = rabbitsData.find(r => r.id == rabbitId);
                if (rabbit) {
                    trackEvent('product_book_click', {
                        product: rabbit.title,
                        price: rabbit.price,
                        breed: rabbit.breedName
                    });
                }
            });
        });
    }

    // Clear all filters
    function clearAllFilters() {
        breedFilter.value = '';
        genderFilter.value = '';
        ageFilter.value = '';
        statusFilter.value = '';
        sortFilter.value = 'default';
        filterRabbits();
    }

    // Make clearAllFilters global for inline onclick
    window.clearAllFilters = clearAllFilters;

    // Event listeners
    breedFilter.addEventListener('change', filterRabbits);
    genderFilter.addEventListener('change', filterRabbits);
    ageFilter.addEventListener('change', filterRabbits);
    statusFilter.addEventListener('change', filterRabbits);
    sortFilter.addEventListener('change', filterRabbits);
    clearFiltersBtn.addEventListener('click', clearAllFilters);

    // Track analytics event (from main.js)
    function trackEvent(eventName, properties = {}) {
        console.log('Event tracked:', eventName, properties);
        // Integration with analytics would go here
    }

    // Initial render
    renderRabbits();
});