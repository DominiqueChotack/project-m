

let state = [];

async function getData() {
    const response = await fetch('https://api.tvmaze.com/shows');
    const data = await response.json();
    return data.slice(0,250); 
}

async function showAllGames() {
    state = await getData();
    drawCards(state);
}

function drawCards(records) {
    const container = document.getElementById('container');
    container.innerHTML = ''; 

    for (let rec of records) {
        const card = document.createElement('div');
        card.classList.add('card');

        // Image
        const image = document.createElement('img');
        image.src = rec.image.medium;
        card.appendChild(image);

        // Title
        const title = document.createElement('h3');
        title.textContent = rec.name;
        card.appendChild(title);

        // Genres
        const genres = document.createElement('p');
        genres.textContent = 'Genres: ' + rec.genres.join(', ');
        card.appendChild(genres);

        // Rating
        const rating = document.createElement('p');
        rating.textContent = 'Rating: ';
        card.appendChild(rating);
        generateStars(rating, rec.rating.average);

        // Play button
        const playButton = document.createElement('button');
        playButton.textContent = 'View Details';
        playButton.addEventListener('click', () => {
            window.open(rec.url, '_blank');
        });
        card.appendChild(playButton);

        container.appendChild(card);
    }
}



function generateStars(parent, rating) {
    const roundedRating = Math.round(rating);
    for (let i = 0; i < roundedRating; i++) {
        const star = document.createElement('span');
        star.textContent = '★'; 
        star.style.color = 'orange'; 
        parent.appendChild(star);
    }
    for (let i = roundedRating; i < 10; i++) {
        const star = document.createElement('span');
        star.textContent = '☆'; 
        star.style.color = 'orange'; 
        parent.appendChild(star);
    }
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        search();
    }
}


function search() {
    let searchKey = document.querySelector('#searchKey').value.trim().toUpperCase();
    let results = [];

    for (let rec of state) {
        let searchText = rec.name.toUpperCase();

        if (searchText.includes(searchKey)) {
            results.push(rec);
        }
    }

    drawCards(results);
}

function filterByGenre() {
    let genre = document.querySelector('#genreFilter').value;
    let filteredShows = [];

    if (genre === '') {
        filteredShows = state;
    } else {
        for (let rec of state) {
            if (rec.genres.includes(genre)) {
                filteredShows.push(rec);
            }
        }
    }

    drawCards(filteredShows);
}

function sortByName() {
    let sortedShows = [...state];
    sortedShows.sort((a, b) => a.name.localeCompare(b.name));
    drawCards(sortedShows);
}

function showAllMovies() {
    drawCards(state); 
    document.getElementById('genreFilter').value = ''; 
}

showAllGames();
