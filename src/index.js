let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection")
  const toyUrl = 'http://localhost:3000/toys'
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
const parseJSON = resp => resp.json()
function putToysOnPage(toys) {
  toys.forEach(function (toy) {
    toyCollectionDiv.innerHTML += `
			<div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img style="width: 100%" src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn">Like <3</button>
			</div>
		`
  })

}
fetch(toyUrl)
  .then(parseJSON)
  .then(putToysOnPage)

const addToyForm = document.querySelector('.add-toy-form')
addToyForm.addEventListener('submit', function (event) {
  fetch(toyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": `${event.target.name.value}`,
      "image": `${event.target.image.value}`,
      "likes": 0
    })
  })
    .then(parseJSON)
    .then(putToysOnPage)
})

toyCollectionDiv.addEventListener('click', function (event) {
  let likeButtonIsPressed = event.target.className === "like-btn"


  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`

    fetch(toyUrl + '/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "likes": likeCount
      })

    })
      .then(response => response.json())
      .then(console.log)
  }
})
});
