document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const categories = [
        { name: 'Adventure', link: 'main/Categories/cat1.html' },
        { name: 'Clicking/Button', link: 'main/Categories/cat2.html' },
        { name: 'Shooting', link: 'main/Categories/cat3.html' },
        { name: 'WASD', link: 'main/Categories/cat4.html' },
        { name: 'Sports', link: 'main/Categories/cat5.html' }
    ];

    const games = [
        { name: '1v1.lol', link: 'main/Games/1v1.lol.html' },
        { name: 'Snowrider 3D', link: 'main/Games/Snowrider 3d.html' },
        { name: 'Basket Random', link: 'main/Games/basketrandom.html' },
        { name: 'Chatbot', link: 'main/Games/chatbot.html' },
        { name: 'Delaford', link: 'main/Games/delaford.html' },
        { name: 'Eaglercraft', link: 'main/Games/eaglercraft1.8.8.html' },
        { name: 'Geometry Dash', link: 'main/Games/geometrydash.html' },
        { name: 'GunSpin', link: 'main/Games/gunspin.html' },
        { name: 'Image Generator', link: 'main/Games/imagegen.html' },
        { name: 'PolyTrack', link: 'main/Games/polytrack.html' },
        { name: 'ShellShockers', link: 'main/Games/shellshockersio.html' },
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
});