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
    // Clear previous content
    while (quoteDisplay.firstChild) {
        quoteDisplay.removeChild(quoteDisplay.firstChild);
    }

    if (quotes.length === 0) {
        const noQuotesMessage = document.createElement('p');
        noQuotesMessage.textContent = 'No quotes available';
        quoteDisplay.appendChild(noQuotesMessage);
        return;
    }
    
    const index = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[index];
    
    // Create quote elements
    const quoteText = document.createElement('p');
    quoteText.textContent = selectedQuote.text;
    
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `Category: ${selectedQuote.category}`;
    
    // Append new elements
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to create add quote form as specified in Step 2
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
    
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
