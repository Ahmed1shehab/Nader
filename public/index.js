async function loadCards() {
    try {
      // Fetch cards from the server
      const response = await fetch('http://localhost:5000/api/cards');
      const cards = await response.json();

      // Get the container where cards will be displayed
      const container = document.getElementById('cards-container');

      // Clear any existing content
      container.innerHTML = '';

      // Loop through the cards and create the card elements dynamically
      cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('col-md-4', 'mb-4');
        cardElement.innerHTML = `
          <div class="card h-100">
            <img src="${card.imageUrl}" class="card-img-top" alt="${card.title}">
            <div class="card-body">
              <h5 class="card-title">${card.title}</h5>
              <p class="card-text">${card.description}</p>
              <a href="${card.link}" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        `;
        container.appendChild(cardElement);
      });
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  }

  // Call the function to load cards when the page is loaded
  window.onload = loadCards;