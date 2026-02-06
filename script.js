document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById('menuSearch');
    const menuCards = document.querySelectorAll('.menu-card');

        if(!searchInput) return;

    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'searchResults';
    resultsDiv.className = 'search-results';
    searchInput.parentNode.appendChild(resultsDiv);

    const scrollButtons = document.querySelectorAll('[data-target]');
    scrollButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                resultsDiv.style.display = 'none';
            }
        });
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = '';

        if (query.length > 0) {
            let foundCount = 0;
            menuCards.forEach(card => {
                const title = card.querySelector('h3').textContent;
                const imgSrc = card.querySelector('img').src;

                if (title.toLowerCase().includes(query)) {
                    foundCount++;

                    const item = document.createElement('div');
                    item.className = 'result-item';
                    item.innerHTML = `
                        <img src="${imgSrc}">
                        <span class="title">${title}</span>
                    `;

                    item.addEventListener('click', () => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.style.outline = "2px solid black";
                        setTimeout(() => card.style.outline = "none", 2500);
                        resultsDiv.style.display = 'none';
                        searchInput.value = '';
                    });
                    resultsDiv.appendChild(item);
                }
            });
            resultsDiv.style.display = foundCount > 0 ? 'block' : 'none';
        } else {
            resultsDiv.style.display = 'none';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('main, section, footer').forEach(el => observer.observe(el));

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsDiv.contains(e.target)) {
            resultsDiv.style.display = 'none';
        }
    });
});
