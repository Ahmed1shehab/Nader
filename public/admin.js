document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.getElementById('cards-container');
    const cardForm = document.getElementById('cardForm');
    const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));
    const modalTitle = document.getElementById('cardModalLabel');
    const submitButton = cardForm.querySelector('button[type="submit"]');
    let editingCardId = null;

    // Flag to avoid multiple fetches happening at the same time
    let isFetching = false;

    // Fetch cards from the server
    async function fetchCards() {
        if (isFetching) return;  // Prevent multiple fetches from running concurrently
        isFetching = true;
        
        try {
            const response = await fetch('http://localhost:3000/cards');
            const cards = await response.json();
            cardsContainer.innerHTML = ''; // Clear current cards
            cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('col-md-4', 'mb-4');
                cardElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${card.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${card.title}</h5>
                            <p class="card-text">${card.text}</p>
                            <button class="btn btn-danger" onclick="deleteCard(${card.id})">Delete</button>
                        </div>
                    </div>
                `;
                cardsContainer.appendChild(cardElement);
            });
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            isFetching = false;
        }
    }

    // Add a new card
    cardForm.addEventListener('submit', async (e) => {
        e.preventDefault();  // Prevent default form submission

        const title = document.getElementById('cardTitle').value;
        const text = document.getElementById('cardText').value;
        const imageUrl = document.getElementById('cardImage').value;

        submitButton.disabled = true;  // Disable the button to prevent double submission

        try {
            // Create a new card
            await fetch('http://localhost:3000/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, text, imageUrl })
            });

            // Close the modal and reset the form
            cardModal.hide();
            fetchCards();  // Refresh the cards list to include the new card
            cardForm.reset();  // Clear the form
            editingCardId = null;  // Reset the editing card id
            modalTitle.textContent = 'Add New Card'; // Reset modal title
        } catch (error) {
            console.error('Error saving card:', error);
        } finally {
            submitButton.disabled = false;  // Re-enable the button
        }
    });

    // Delete card
    window.deleteCard = function (id) {
        fetch(`http://localhost:3000/cards/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchCards();  // Refresh the list of cards after deletion
            });
    };

    // Open modal for adding a new card (reset all fields)
    document.getElementById('addCardBtn').addEventListener('click', function () {
        editingCardId = null;  // Reset editingCardId to indicate new card
        cardForm.reset();  // Clear the form
        modalTitle.textContent = 'Add New Card'; // Reset modal title
        cardModal.show(); // Open the modal
    });

    // Initial fetch of cards
    fetchCards();

    // Sign-out functionality
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function () {
            // Clear session or token if you're using authentication
            // sessionStorage.clear(); // Uncomment if you're storing session data
            // localStorage.clear();  // Uncomment if you're using localStorage

            // Redirect to login page or home page
            window.location.href = '/'; // Redirect to login page
        });
    }
});
