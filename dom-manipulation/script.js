// Initial quotes array
let quotes = [
    { text: "Be the change you wish to see in the world.", category: "Inspiration" },
    { text: "The only way to do great work is to love what you do.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", category: "Wisdom" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Function to get a quote using current time as seed
function getQuote() {
    if (quotes.length === 0) {
        return null;
    }
    const index = Date.now() % quotes.length;
    return quotes[index];
}

// Function to display a quote
function displayQuote() {
    // Clear current content
    while (quoteDisplay.firstChild) {
        quoteDisplay.removeChild(quoteDisplay.firstChild);
    }
    
    const quote = getQuote();
    
    if (!quote) {
        const noQuoteMessage = document.createElement('p');
        noQuoteMessage.textContent = 'No quotes available. Add some quotes!';
        quoteDisplay.appendChild(noQuoteMessage);
        return;
    }

    // Create and populate quote elements
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;
    
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = quote.category;
    quoteCategory.className = 'quote-category';

    // Update display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    // Validate inputs
    if (!text || !category) {
        alert('Please enter both quote text and category');
        return;
    }

    // Add new quote to array
    quotes.push({ text, category });

    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';

    // Show success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Quote added successfully!';
    successMessage.style.color = 'green';
    document.querySelector('.quote-form').appendChild(successMessage);

    // Remove success message after 2 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 2000);

    // Show the newly added quote
    displayQuote();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show initial quote
    displayQuote();
    
    // Add click event for new quote button
    newQuoteBtn.addEventListener('click', displayQuote);
});

// Add keypress event listeners for input fields
newQuoteText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        newQuoteCategory.focus();
    }
});

newQuoteCategory.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addQuote();
    }
});
