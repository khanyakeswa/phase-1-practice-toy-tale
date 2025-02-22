let addToy = false

// document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.add-toy-form')
const toyFormContainer = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
  } else {
    toyFormContainer.style.display = 'none'
  }
})

function getToys() {
  fetch('http://localhost:3000/toys')
    .then((res) => res.json())
    .then((toys) => {
      console.log(toys)

      toys.forEach((toy) => {
        const toyCard = document.createElement('div')
        toyCard.classList.add('card')

        const toyName = document.createElement('h2')
        toyName.innerText = toy.name
        
        const toyImage = document.createElement('img')
        toyImage.classList.add('toy-avatar')
        toyImage.src = toy.image

        const toyLikes = document.createElement('p')
        toyLikes.innerText = `Likes: ${toy.likes}`

        const likeButton = document.createElement('button')
        likeButton.innerText = 'like'

        toyCard.append(toyName, toyImage, toyLikes, likeButton)

        toyCollection.appendChild(toyCard)
      })
    })
}

toyForm.addEventListener('submit', () => {
  
})

getToys()

// });
