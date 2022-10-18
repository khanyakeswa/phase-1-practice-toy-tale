let addToy = false

document.addEventListener('DOMContentLoaded', () => {
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

  function createCard(toy) { // create a function that creates a card from toy data and  puts it in the DOM
    console.log(toy)

    // create the container for the toy data and set its class to 'card' so that CSS can style it
    const toyCard = document.createElement('div')
    toyCard.classList.add('card')

    const toyName = document.createElement('h2')
    toyName.textContent = toy.name

    const toyImage = document.createElement('img')
    toyImage.classList.add('toy-avatar')
    toyImage.src = toy.image

    let toyLikes = document.createElement('p')
    toyLikes.textContent = `Likes: ${toy.likes}`

    const likeButton = document.createElement('button')
    likeButton.textContent = 'like'
    likeButton.addEventListener('click', () => {
      console.log('liked')
      toy.likes += 1
      toyLikes.textContent = `Likes: ${toy.likes}`
      updateLikes(toy)
    })

    toyCard.append(toyName, toyImage, toyLikes, likeButton)

    toyCollection.appendChild(toyCard)
  }

  function updateLikes(toy) {
    console.log(toy.likes)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: toy.likes,
      }),
    })
      .then((res) => res.json())
      .then((toy) => console.log(toy.likes))
  }

  function getToys() {
    fetch('http://localhost:3000/toys')
      .then((res) => res.json())
      .then((toys) => {
        console.log(toys)
        toys.forEach(createCard)
      })
  }

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const toyName = toyForm.elements['name'].value
    const toyURL = toyForm.elements['image'].value
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 0,
        name: toyName,
        image: toyURL,
        likes: 0,
      }),
    })
      .then((res) => res.json())
      .then((newToy) => createCard(newToy))
  })

  getToys()
})
