const searchForm = document.querySelector('.form')
const movieContainer = document.querySelector('.movie-container')
const inputBox = document.querySelector('.inputBox')


// function to fetch movie details from omdb api

    const getMovieInfo = async (movie)=>{
        try {
        myApiKey = "397609e"
        const url  = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`
        const  response = await fetch(url);

        if(!response.ok){
            throw new Error('unable to fetch the movie data')
        }
        const data = await response.json()
        console.log(data);
        
        showMovieData(data)
    }
 catch (error) {
    showError('Movie not found!!!')
}
    }

// function to show movie data on screen 
 
const showMovieData = (data) =>{
    movieContainer.innerHTML = ''
    movieContainer.classList.remove('noBackground')
    // use destructure to extract the properties of the object
    const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data
    const movieElement = document.createElement('div')
    movieElement.classList.add('movieInfo')
    movieElement.innerHTML = `<h2><span>Movie :</span>${Title}</h2>
                              <p><span>Imdb Ratings : &#11088</span>${imdbRating}</p>`
   
   const  movieGenerElement = document.createElement('div')
    movieGenerElement.classList.add('movieGenre') 

    Genre.split(",").forEach(element =>{
        const p = document.createElement('p')
        p.innerHTML = element
        movieGenerElement.appendChild(p)
    })

    movieElement.appendChild(movieGenerElement)                         
    movieElement.innerHTML += `<p><span>Released : </span>${Released}</p>
                              <p><span>Duration : </span>${Runtime}</p>
                              <p><span>Cast : </span>${Actors}</p>
                              <p><span>Plot : </span>${Plot}</p>`

// creating a div for the poster of the movie

const moviePoster = document.createElement('div')
moviePoster.classList.add('moviePoster')
moviePoster.innerHTML = `<img src = "${Poster}"/>`
                              
    movieContainer.appendChild(moviePoster)  
    movieContainer.appendChild(movieElement)                          
                             
}

// create a error message 

const showError = (message) =>{
    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add('noBackground')
}

// adding event listener to the searchForm
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
  const movieName =   inputBox.value.trim()
  if(movieName != ''){
    getMovieInfo(movieName)
  }else{
    showError("Enter The Movie Name To Get Details")
  }
    
})