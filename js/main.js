
let elMovieTemplate = document.querySelector('.movie-template').content;
let elMovieItem = document.querySelector('.card');
let elMovieResult = document.querySelector('.movie-result');
let movieFragment = new DocumentFragment()

let API_KEY = '310c3424'

let API = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`

let renderMovies = (search = 'iron') => {

    elMovieResult.innerHTML = null
    
    fetch(API + `&s=${search}`)
    .then(res => res.json())
    .then(data => data.Search.forEach((movie) => {

        console.log(data);
        let cloneMovies = elMovieTemplate.cloneNode(true)

        cloneMovies.querySelector('.movie-img').src = movie.Poster
        cloneMovies.querySelector('.movie-title').textContent = movie.Title
        cloneMovies.querySelector('.movie-type').textContent = movie.Type
        cloneMovies.querySelector('.movie-year').textContent = movie.Year

        movieFragment.appendChild(cloneMovies)
        
        elMovieResult.appendChild(movieFragment)
    }))

}

renderMovies()

let elSearchInput = document.querySelector('.search-input')
let elSearchForm = document.querySelector('.search-form')

elSearchForm.addEventListener('submit', (evt) => {
evt.preventDefault();

let inputValue = elSearchInput.value.trim();

renderMovies(inputValue)

})


