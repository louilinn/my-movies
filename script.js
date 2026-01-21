const movieList = document.getElementById('movieList');
const movieDetails = document.getElementById('movieDetails');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTU0MGI1NTM0N2RlZjRkY2QyY2ZmM2E4YzU4MTVmNyIsIm5iZiI6MTczNjg4ODM4NS4wNzYsInN1YiI6IjY3ODZkMDQxOGMyMzA5Y2VhZmJiOGQwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.esg6b46b_2m6RNKBBMRu82QUER1prlQ4URIMyqpp4Po'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(res => res.json())
  .then(res => addMovies(res))
  .catch(err => console.error(err));


function addMovies(data) {
    console.log(data.results);

    data.results.forEach((entry) => addSingleMovie(entry))
}

function addSingleMovie(entry) {
    const movieEl = document.createElement('li');
    movieEl.innerText = entry.title;

    movieEl.addEventListener('click', () => {
        showMovieDetails(entry);
    });

    movieList.appendChild(movieEl);
}

function showMovieDetails(entry) {
    movieDetails.innerHTML = '';

    const title = document.createElement('h2');
    title.innerText = entry.title;

    const desc = document.createElement('p');
    desc.innerText = entry.overview;

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${entry.poster_path}`;

    movieDetails.append(title, desc, img);
}