document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categories = [
        { name: 'Adventure', link: 'Categories/cat1.html' },
        { name: 'Clicking/Button', link: 'Categories/cat2.html' },
        { name: 'Shooting', link: 'Categories/cat3.html' },
        { name: 'WASD', link: 'Categories/cat4.html' },
        { name: 'Sports', link: 'Categories/cat5.html' }
    ];

    const games = [
        { name: '1v1.lol', link: 'Games/1v1.lol.html' },
        { name: 'Snowrider 3D', link: 'Games/Snowrider 3d.html' },
        { name: 'Basket Random', link: 'Games/basketrandom.html' },
        { name: 'Chatbot', link: 'Games/chatbot.html' },
        { name: 'Delaford', link: 'Games/delaford.html' },
        { name: 'Eaglercraft', link: 'Games/eaglercraft1.8.8.html' },
        { name: 'Geometry Dash', link: 'Games/geometrydash.html' },
        { name: 'GunSpin', link: 'Games/gunspin.html' },
        { name: 'Image Generator', link: 'Games/imagegen.html' },
        { name: 'PolyTrack', link: 'Games/polytrack.html' },
        { name: 'ShellShockers', link: 'Games/shellshockersio.html' },
        { name: 'MAKEITOUT', link: 'Games/MAKEITOUT.html' }
    ];

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchInput));
    const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchInput));
    const searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerHTML = '';

    if (filteredCategories.length > 0 || filteredGames.length > 0) {
        if (filteredCategories.length > 0) {
            const categoryHeader = document.createElement('h3');
            categoryHeader.textContent = 'Categories';
            searchResultsDiv.appendChild(categoryHeader);

            filteredCategories.forEach(category => {
                const resultItem = document.createElement('a');
                resultItem.href = category.link;
                resultItem.className = 'custom-button';
                resultItem.textContent = category.name;
                searchResultsDiv.appendChild(resultItem);
            });
        }

        if (filteredGames.length > 0) {
            const gamesHeader = document.createElement('h3');
            gamesHeader.textContent = 'Games';
            searchResultsDiv.appendChild(gamesHeader);

            filteredGames.forEach(game => {
                const resultItem = document.createElement('a');
                resultItem.href = game.link;
                resultItem.className = 'custom-button';
                resultItem.textContent = game.name;
                searchResultsDiv.appendChild(resultItem);
            });
        }
    } else {
        searchResultsDiv.textContent = 'No results found';
    }
    // Store the search term in local storage
    let pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    if (!pastSearches.includes(searchInput) && searchInput.trim() !== '') {
        pastSearches.push(searchInput);
        localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
    }
});

document.getElementById('search-input').addEventListener('input', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    let pastSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    const filteredSuggestions = pastSearches.filter(search => search.includes(searchInput));

    filteredSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', function() {
            document.getElementById('search-input').value = suggestion;
            suggestionsDiv.innerHTML = '';
        });
        suggestionsDiv.appendChild(suggestionItem);
    });
});
