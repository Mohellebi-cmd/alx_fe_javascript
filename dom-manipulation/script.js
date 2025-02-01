// Array of quote objects
const quotes = [
    { text: "Be the change you wish to see in the world.", category: "Inspiration" },
    { text: "The only way to do great work is to love what you do.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Function to display a random quote as specified in Step 2
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available</p>';
        return;
    }
    
    const index = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[index];
    
    // Update display using innerHTML
    quoteDisplay.innerHTML = `
        <p>${selectedQuote.text}</p>
        <p>Category: ${selectedQuote.category}</p>
    `;
}

// Function to create add quote form as specified in Step 2
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    
    document.body.appendChild(formDiv);
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText');
    const quoteCategory = document.getElementById('newQuoteCategory');
    
    if (quoteText.value && quoteCategory.value) {
        quotes.push({
            text: quoteText.value,
            category: quoteCategory.value
        });
        
        quoteText.value = '';
        quoteCategory.value = '';
        
        showRandomQuote();
    } else {
        alert('Please enter both quote and category');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
    newQuoteBtn.addEventListener('click', showRandomQuote);
});
