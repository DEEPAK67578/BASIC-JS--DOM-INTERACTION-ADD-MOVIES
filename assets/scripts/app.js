const modal = document.querySelector(".modal");
const addMovieBtn = document.querySelector("header button");

const modalActions = document.querySelector(".modal__actions");

const backDropEle = document.getElementById("backdrop");

const inputs = document.querySelectorAll("input");

const addInputBtn = modalActions.firstElementChild.nextElementSibling;

const movieUl = document.getElementById("movie-list");

const entryText = document.getElementById("entry-text");

const deleteModal = document.getElementById("delete-modal");

const cancelbutton = document.getElementById("cancel");

const confirmButton = document.getElementById("yes");

const movies = [];

const deleteMovie = (id) => {
  let identifiedIndex = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    identifiedIndex++;
  }
  movies.splice(identifiedIndex, 1);
  movieUl.children[identifiedIndex].remove();
  deleteModal.classList.remove("visible");
  backDropEle.classList.remove("visible");
};

const cancelMovieDeletion = () => {
  deleteModal.classList.remove("visible");
  backDropEle.classList.remove("visible");
};

const deleteEvent = (id) => {
  deleteModal.classList.add("visible");
  backDropEle.classList.toggle("visible");
  confirmButton.addEventListener("click", deleteMovie.bind(null, id));
};

const createMovies = (imageUrl, title, rating, id) => {
  const newLi = document.createElement("li");
  newLi.innerHTML = `
      <div class="movie-element__image">
          <img src="${imageUrl}" alt="image">
     </div>
     <div class="movie-element__info">
        <h2>${title}</h2> <p>${rating}/5 stars</p>
     </div> `;
  newLi.className = "movie-element";
  newLi.addEventListener("click", deleteEvent.bind(null, id));
  movieUl.append(newLi);
};

const updateUi = () => {
  if (movies.length > 0) {
    entryText.style.display = "none";
  } else {
    entryText.style.display = "block";
  }
};
const backdrop = () => {
  backDropEle.classList.toggle("visible");
};

const clearMovieInputs = () => {
  for (const userInput of inputs) {
    userInput.value = "";
  }
};

const validateInput = () => {
  const titleValue = inputs[0].value;
  const imageUrl = inputs[1].value;
  const rating = inputs[2].value;
  if (
    titleValue.trim() === "" ||
    imageUrl.trim() === "" ||
    rating.trim() === "" ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert("Please Give A valid input");
    return;
  }

  const newMovie = {
    title: titleValue,
    image: imageUrl,
    rating: rating,
    id: Math.random().toString(),
  };
  movies.push(newMovie);
  modal.classList.remove("visible");
  backDropEle.classList.remove("visible");
  console.log(movies);
  clearMovieInputs();
  updateUi();
  createMovies(newMovie.image, newMovie.title, newMovie.rating, newMovie.id);
};

addMovieBtn.addEventListener("click", () => {
  modal.classList.toggle("visible");
  backdrop();
});

modalActions.firstElementChild.addEventListener("click", () => {
  modal.classList.remove("visible");
  backDropEle.classList.remove("visible");
  clearMovieInputs();
});

backDropEle.addEventListener("click", () => {
  modal.classList.remove("visible");
  backDropEle.classList.remove("visible");
});

addInputBtn.addEventListener("click", validateInput);

cancelbutton.addEventListener("click", cancelMovieDeletion);
