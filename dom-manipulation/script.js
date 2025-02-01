// Load quotes from local storage or use default quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Be the change you wish to see in the world.", category: "Inspiration" },
    { text: "The only way to do great work is to love what you do.", category: "Success" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Simulated server URL (using JSONPlaceholder or mock API)
const serverUrl = "https://jsonplaceholder.typicode.com/posts";

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');

// Function to populate category dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '';
    
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
    
    const lastFilter = localStorage.getItem('selectedCategory');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
        filterQuotes();
    }
}

// Function to display a random quote based on filter
function showRandomQuote() {
    let filteredQuotes = quotes;
    const selectedCategory = categoryFilter.value;
    
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = 'No quotes available';
        return;
    }
    
    const index = Math.floor(Math.random() * filteredQuotes.length);
    const selectedQuote = filteredQuotes[index];
    
    sessionStorage.setItem('lastQuote', JSON.stringify(selectedQuote));
    
    quoteDisplay.textContent = `${selectedQuote.text}\nCategory: ${selectedQuote.category}`;
}

// Restore last viewed quote from session storage
window.addEventListener('load', () => {
    populateCategories();
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
        quoteDisplay.textContent = `${lastQuote.text}\nCategory: ${lastQuote.category}`;
    } else {
        showRandomQuote();
    }
    syncWithServer();
});

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById('newQuoteText');
    const quoteCategory = document.getElementById('newQuoteCategory');
    
    if (quoteText.value && quoteCategory.value) {
        const newQuote = { text: quoteText.value, category: quoteCategory.value };
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        localStorage.setItem('selectedCategory', categoryFilter.value);
        
        quoteText.value = '';
        quoteCategory.value = '';
        populateCategories();
        showRandomQuote();
        syncWithServer();
    } else {
        alert('Please enter both quote and category');
    }
}

// Function to filter quotes based on selected category
function filterQuotes() {
    localStorage.setItem('selectedCategory', categoryFilter.value);
    showRandomQuote();
}

// Function to sync with server
async function syncWithServer() {
    try {
        const response = await fetch(serverUrl);
        const serverQuotes = await response.json();
        
        if (serverQuotes.length > 0) {
            const mergedQuotes = [...quotes, ...serverQuotes.map(q => ({ text: q.title, category: 'Imported' }))];
            localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
            quotes.length = 0;
            quotes.push(...mergedQuotes);
            populateCategories();
            showRandomQuote();
        }
    } catch (error) {
        console.error('Error syncing with server:', error);
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
                populateCategories();
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
    categoryFilter.addEventListener('change', filterQuotes);
});
