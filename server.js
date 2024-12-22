const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

const DEFAULT_EMAIL = "admin@admin.com";
const DEFAULT_PASSWORD = "adminadmin";

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
    res.status(200).json({ status: "success", message: "Login successful!" });
  } else {
    res.status(401).json({ status: "error", message: "Invalid email or password" });
  }
});

// Sample card data
let cards = [
  { id: 1, title: 'MacBook Pro', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g6ZWExP8t8Xl2bG0E4cM4mxjJYZ525ZrLQ&s' },
  { id: 2, title: 'MacBook Pro', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g6ZWExP8t8Xl2bG0E4cM4mxjJYZ525ZrLQ&s' },
  { id: 3, title: 'MacBook Pro', text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-g6ZWExP8t8Xl2bG0E4cM4mxjJYZ525ZrLQ&s' }
];

// Route to get all cards
app.get('/cards', (req, res) => {
  res.status(200).json(cards);
});

// Route to add a new card
app.post('/cards', (req, res) => {
  const { title, text, imageUrl } = req.body;
  const newCard = { 
    id: cards.length + 1, 
    title, 
    text, 
    imageUrl 
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// Route to update a card
app.put('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10);
  const { title, text, imageUrl } = req.body;
  
  const cardIndex = cards.findIndex(card => card.id === cardId);
  
  if (cardIndex !== -1) {
    cards[cardIndex] = { id: cardId, title, text, imageUrl };
    res.status(200).json(cards[cardIndex]);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

// Route to delete a card
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10);
  
  const cardIndex = cards.findIndex(card => card.id === cardId);
  
  if (cardIndex !== -1) {
    cards.splice(cardIndex, 1);
    res.status(200).json({ message: 'Card deleted' });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
