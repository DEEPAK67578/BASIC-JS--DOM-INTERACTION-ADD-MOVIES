const modal = document.querySelector('.modal')
const addMovieBtn = document.querySelector('header button')

const modalActions = document.querySelector('.modal__actions')

const backDropEle = document.getElementById('backdrop')

const inputs = document.querySelectorAll('input')

const addInputBtn = modalActions.firstElementChild.nextElementSibling


const movies = []

const backdrop = () => {
    backDropEle.classList.toggle('visible')
}

const clearMovieInputs = () => {
    for(const userInput of inputs) {
        userInput.value = ''
    }
}

const validateInput = () => {
    const titleValue = inputs[0].value
    const imageUrl = inputs[1].value
    const rating = inputs[2].value
    if(titleValue.trim() === '' || imageUrl.trim() === '' || rating.trim() === '' || +rating< 1 || +rating > 5) {
        alert('Please Give A valid input')
        return
    } 

    const newMovie = {title:titleValue,image:imageUrl,rating:rating}
    movies.push(newMovie)
    modal.classList.remove('visible')
    backDropEle.classList.remove('visible')
    console.log(movies);
    clearMovieInputs()

}


addMovieBtn.addEventListener('click',() => {
    modal.classList.toggle('visible')
    backdrop()
})

modalActions.firstElementChild.addEventListener('click', () => {
    modal.classList.remove('visible')
    backDropEle.classList.remove('visible')
    clearMovieInputs()
})

backDropEle.addEventListener('click', () => {
    modal.classList.remove('visible')
    backDropEle.classList.remove('visible')
})


addInputBtn.addEventListener('click', validateInput)