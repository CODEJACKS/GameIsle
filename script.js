document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categories = [
        { name: 'Adventure', link: 'Categories/cat1.html' },
        { name: 'Clicking/Button', link: 'Categories/cat2.html' },
        { name: 'Shooting', link: 'Categories/cat3.html' }
    ];

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchInput));
    const searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerHTML = '';

    if (filteredCategories.length > 0) {
        filteredCategories.forEach(category => {
            const resultItem = document.createElement('a');
            resultItem.href = category.link;
            resultItem.className = 'custom-button';
            resultItem.textContent = category.name;
            searchResultsDiv.appendChild(resultItem);
        });
    } else {
        searchResultsDiv.textContent = 'No results found';
    }
});