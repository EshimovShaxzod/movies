
let elMovieTemplate = document.querySelector('.movie-template').content;
let elMovieItem = document.querySelector('.card');
let elMovieResult = document.querySelector('.movie-result');
let movieFragment = new DocumentFragment()

let API_KEY = '310c3424'

let API = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`

// IMDBId   movie function
function generateMovieImdbLink(imdbId){
    return `https://www.imdb.com/title/${imdbId}/`
}

function generateYoutubeLink(FoundMovieYtId){
    return `https://www.youtube.com/embed/${FoundMovieYtId}`
 }

// *************************************************************

let elModal = document.querySelector('.modal')
let elMovieImg = document.querySelector('.movie-img')
let elModalTitle = document.querySelector('.modal-movie-title');
let elModalIframe = document.querySelector('.modal-movie-iframe');
let elModalRating = document.querySelector('.modal-movie-rating');
let elModalYear = document.querySelector('.modal-movie-year');
let elModalLink = document.querySelector('.modal-movie-link');

let renderMovies = (search = 'iron') => {

    elMovieResult.innerHTML = null
    
    fetch(API + `&s=${search}`)
    .then(res => res.json())
    .then(data => data.Search.forEach((movie) => {
    //  console.log(data);
        // console.log(data);
        let cloneMovies = elMovieTemplate.cloneNode(true)

        cloneMovies.querySelector('.movie-img').src = movie.Poster
        cloneMovies.querySelector('.movie-title').textContent = movie.Title
        cloneMovies.querySelector('.movie-type').textContent = movie.Type
        cloneMovies.querySelector('.movie-year').textContent = movie.Year
        cloneMovies.querySelector('.info-btn').dataset.movieId = movie.imdbID

        movieFragment.appendChild(cloneMovies)
        
        elMovieResult.appendChild(movieFragment)

       

    },  showMovie(data.Search)))

}

renderMovies()

let elSearchInput = document.querySelector('.search-input')
let elSearchForm = document.querySelector('.search-form')

elSearchForm.addEventListener('submit', (evt) => {
evt.preventDefault();

let inputValue = elSearchInput.value.trim();

renderMovies(inputValue)

})

function showMovie(movie) {

elMovieResult.addEventListener('click', (evt) => {

    let clickId =evt.target.dataset.movieId;
    
    
        if(evt.target.matches('.info-btn')){
            
            let movieFilter = movie.filter((movie) => {
                return clickId === movie.imdbID
            })

            movieFilter.forEach((m) => {

             elModalTitle.textContent = m.Title;
             elMovieImg.src = m.Poster;
             elModalLink.href = generateMovieImdbLink(m.imdbID);
             elModalYear.textContent = m.Year;
             elModalRating.textContent = m.Type

                
            })
            

        }
});
}



