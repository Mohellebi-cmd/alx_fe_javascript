// Load quotes from local storage or use default quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Be the change you wish to see in the world.", category: "Inspiration" },
    { text: "The only way to do great work is to love what you do.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available</p>';
        return;
    }
    
    const index = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[index];
    
    // Save last viewed quote to session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(selectedQuote));
    
    // Update display
    quoteDisplay.innerHTML = `
        <p>${selectedQuote.text}</p>
        <p class='quote-category'>Category: ${selectedQuote.category}</p>
    `;
}

// Restore last viewed quote from session storage
window.addEventListener('load', () => {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
        quoteDisplay.innerHTML = `
            <p>${lastQuote.text}</p>
            <p class='quote-category'>Category: ${lastQuote.category}</p>
        `;
    } else {
        showRandomQuote();
    }
});

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText');
    const quoteCategory = document.getElementById('newQuoteCategory');
    
    if (quoteText.value && quoteCategory.value) {
        quotes.push({ text: quoteText.value, category: quoteCategory.value });
        localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to local storage
        
        quoteText.value = '';
        quoteCategory.value = '';
        showRandomQuote();
    } else {
        alert('Please enter both quote and category');
    }
}

// Function to export quotes as JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                localStorage.setItem('quotes', JSON.stringify(quotes));
                alert('Quotes imported successfully!');
                showRandomQuote();
            } else {
                alert('Invalid JSON format');
            }
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    newQuoteBtn.addEventListener('click', showRandomQuote);
});
